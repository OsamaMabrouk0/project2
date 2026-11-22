/*
 Search service — no DOM access. Handles:
  - Arabic normalisation (أ/إ/آ→ا, ة→ه, ى→ي, diacritics, tatweel, "ال", Arabic-Indic digits)
  - typo tolerance (Damerau–Levenshtein), partial words, mixed Arabic/English fields
  - wrong keyboard layout (e.g. "ملا" typed instead of "lab")
  - "did you mean" suggestions and missing-number detection
*/
(()=>{const Guide=window.Guide=window.Guide||{};
const norm=s=>String(s??'').toLowerCase()
 .replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d))
 .replace(/[\u064B-\u065F\u0670\u0640]/g,'')
 .replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/ء/g,'')
 .replace(/(\p{L})(\p{N})/gu,'$1 $2').replace(/(\p{N})(\p{L})/gu,'$1 $2')
 .replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
const tokens=s=>norm(s).split(' ').filter(Boolean).map(t=>t.length>3&&t.startsWith('ال')?t.slice(2):t);
const isNum=s=>/^\d+$/.test(s);
const AR=[...'ضصثقفغعهخحجدشسيبلاتنمكطئءؤرىةوزظ'],EN=[...`qwertyuiop[]asdfghjkl;'zxcvnm,./`];
const A2E=Object.fromEntries(AR.map((c,i)=>[c,EN[i]])),E2A=Object.fromEntries(EN.map((c,i)=>[c,AR[i]]));
const swap=(s,m)=>[...String(s).toLowerCase()].map(c=>m[c]??c).join('');
function dist(a,b,max){if(Math.abs(a.length-b.length)>max)return max+1;let p2=null,p1=Array.from({length:b.length+1},(_,j)=>j);
 for(let i=1;i<=a.length;i++){const c=[i];for(let j=1;j<=b.length;j++){let v=Math.min(p1[j]+1,c[j-1]+1,p1[j-1]+(a[i-1]===b[j-1]?0:1));
  if(p2&&i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])v=Math.min(v,p2[j-2]+1);c[j]=v}p2=p1;p1=c}return p1[b.length]}
function ts(q,t){if(q===t)return 1;
 if(isNum(q)||isNum(t))return isNum(q)&&isNum(t)&&q.length>=2&&t.startsWith(q)?.7:0;
 if(q.length>=2&&t.startsWith(q))return .9;
 if(q.length>=3&&t.includes(q))return .6;
 const mx=q.length<=3?0:q.length<=5?1:2;
 if(mx){const d=dist(q,t,mx);if(d<=mx)return .8-.12*d;
  if(q.length>=4&&dist(q,t.slice(0,q.length),mx)<=mx)return .6}
 return 0}
const rank=r=>({ok:2000,approx:1000,none:0}[r.status]+(r.top||0)*100);

Guide.SearchEngine=class{
 constructor(d){const bm=new Map(d.buildings.map(b=>[b.id,b])),tm=new Map(d.types.map(t=>[t.id,t]));this.vocab=new Map();
  this.docs=d.spaces.map((s,i)=>{const b=bm.get(s.b),f=d.floors[s.l]||{ar:'',en:''},t=tm.get(s.t);
   [s.ar,s.en,t.ar,t.en,b.ar,b.en].join(' ').split(/\s+/).forEach(w=>{const n=tokens(w)[0];if(n&&!isNum(n)&&!this.vocab.has(n))this.vocab.set(n,w)});
   return{s,i,name:[...new Set(tokens(s.ar+' '+s.en))],tok:[...new Set(tokens([s.ar,s.en,t.syn,b.ar,b.en,b.al,f.ar,f.en].join(' ')))]}})}
 search(raw,f={}){
  const pool=this.docs.filter(d=>(!f.type||f.type==='all'||d.s.t===f.type)&&(!f.b||f.b==='all'||d.s.b===f.b)),q=norm(raw);
  if(!q)return{status:'empty',results:pool.map(d=>d.s)};
  if(q.length<2&&!isNum(q))return{status:'short',results:[]};
  const cands=[q];[swap(raw,A2E),swap(raw,E2A)].forEach(c=>{c=norm(c);if(c&&!cands.includes(c))cands.push(c)});
  let best=null;cands.forEach((c,i)=>{const r=this.run(c,pool);r.converted=i?c:null;if(!best||rank(r)>rank(best))best=r});
  return best}
 run(qs,pool){const qt=tokens(qs);if(!qt.length)return{status:'none',results:[]};
  const sc=pool.map(d=>{const per=qt.map(t=>d.tok.reduce((m,x)=>Math.max(m,ts(t,x)),0));
   return{d,min:Math.min(...per),score:per.reduce((a,b)=>a+b,0)/per.length+(qt.every(t=>d.name.some(x=>ts(t,x)>=.9))?.2:0)}});
  const by=(a,b)=>b.score-a.score||a.d.i-b.d.i,strict=sc.filter(x=>x.min>=.5).sort(by);
  const missingNum=qt.find(t=>isNum(t)&&!this.docs.some(d=>d.tok.some(x=>isNum(x)&&x.startsWith(t))))||null;
  if(strict.length&&!missingNum)return{status:'ok',top:strict[0].score,results:strict.map(x=>x.d.s),missingNum:null};
  const sug=this.suggest(qt),loose=sc.filter(x=>x.score>=.4).sort(by).slice(0,8);
  if(loose.length)return{status:'approx',top:loose[0].score,results:loose.map(x=>x.d.s),missingNum,suggestion:sug};
  return{status:'none',top:0,results:[],missingNum,suggestion:sug}}
 suggest(qt){let changed=false;
  const out=qt.map(t=>{if(isNum(t)||this.vocab.has(t)||[...this.vocab.keys()].some(v=>v.startsWith(t)))return t;
   const mx=t.length<=4?1:2;let best=null,bd=9;
   for(const [v,disp] of this.vocab){const d=dist(t,v,mx);if(d<bd){bd=d;best=disp}}
   if(best&&bd<=mx){changed=true;return best}return t});
  return changed?out.join(' '):null}
};
Guide.normalize=norm;
})();
