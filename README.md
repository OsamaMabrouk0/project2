<div align="center">

# 🧭 مرشدك في كلية الأعمال
### Your Guide to the Faculty of Business — Alexandria University

دليل تفاعلي ثنائي اللغة (عربي / English) للقاعات والمباني والأقسام الدراسية.
An interactive bilingual guide to halls, buildings and academic departments.

`HTML` · `CSS` · `Vanilla JS` · `No build step` · `RTL-first` · `Light / Dark`

</div>

---

## ✨ المميزات · Features

| | |
|---|---|
| 🔎 **بحث ذكي** | يتحمل الأخطاء الإملائية، ويفهم الأرقام العربية، ويصحّح لوحة المفاتيح الخاطئة (مثل `ملا` ← `lab`). |
| 🎟️ **تذاكر القاعات** | كل قاعة بطاقة تذكرة بالمبنى والدور، مع تجميع حسب المبنى وفلاتر النوع والمبنى. |
| 🗺️ **خريطة بكاميرا** | سحب وتكبير (ماوس / لمس بإصبعين / كيبورد)، ورحلة سلسة للمبنى مع مخطط توزيع القاعات على الأدوار. |
| 🎓 **الأقسام كفصول** | فهرس جانبي حي، مجالات العمل، والخطط الدراسية بتبويبات المستويات. |
| 🪪 **بطاقات الفريق** | بطاقات هوية معلّقة بحركة تأرجح، بترتيب عشوائي في كل زيارة. |
| 🌗 **فاتح / داكن** | يتبع إعدادات الجهاز ويُحفظ اختيارك. |
| 🌍 **ثنائي اللغة** | تبديل فوري بين RTL و LTR بدون إعادة تحميل. |
| ♿ **سهولة الوصول** | تنقل بالكيبورد، `/` للبحث، احترام `prefers-reduced-motion`، رابط تخطٍّ للمحتوى. |

## 🎨 الهوية البصرية · Design language — "Campus Atlas"

ورق دافئ + حبر + ألوان مسطحة + ظلال صلبة (بدون زجاج أو blur).

- **الألوان:** `paper #f6f1e7` · `ink #14171c` · `coral #f2552c` · `sun #ffc23c` · `mint #7fd1a5` · `lilac #b9a7f5` · `sky #8cc8e8` · `sea #0e5f66`
- **الخطوط:** Cairo (عناوين) + Readex Pro (نصوص)
- **الحركة:** شاشة تحميل بعدّاد حقيقي، ستارة انتقال بين الصفحات، ظهور كلمات العناوين، عدّادات أرقام، شريط متحرك، أزرار مغناطيسية.

## 🚀 التشغيل · Getting started

لا يوجد build. أي سيرفر ملفات ثابتة يكفي:

**على Windows (الطريقة الأسهل):**

1. فك ضغط المشروع.
2. افتح مجلد `project-redesign-work`.
3. اضغط على شريط عنوان المجلد، واكتب `cmd` ثم Enter.
4. نفّذ الأمر التالي:

```cmd
py -m http.server 8080
```

5. افتح المتصفح واكتب `http://localhost:8080`.
6. لإيقاف الخادم ارجع إلى نافذة CMD واضغط `Ctrl + C`.

إذا لم يعمل الأمر `py` وكان Python مثبتًا، جرّب `python -m http.server 8080`.
لا يحتاج المشروع إلى npm أو تثبيت حزم أو عملية build. يحتاج اتصالًا بالإنترنت لتحميل الخطوط والأيقونات من Google Fonts و jsDelivr. ويمكن فتح `index.html` مباشرة، لكن تشغيله عبر الخادم المحلي هو الخيار الموصى به.

**النشر على GitHub Pages:** Settings ← Pages ← Deploy from branch ← `main` / root. ملف `404.html` جاهز.

## 🗂️ بنية المشروع · Structure

```
index.html · 404.html
pages/                    halls · map · about · team
assets/
  css/
    tokens.css            ألوان، أحجام، منحنيات الحركة، الوضع الداكن
    base.css              reset وطباعة وأدوات عامة
    layout.css            الهيدر، شريط الجوال، الفوتر، التحميل، الستارة
    components.css        أزرار، شيبس، حقول، تبويبات، حالات فارغة
    motion.css            الظهور عند التمرير، الشريط المتحرك
    responsive-fixes.css  قواعد التجاوب المشتركة لكل الصفحات
    pages/                home · halls · map · about · team
  js/
    core/runtime.js       اللغة، الثيم، دوال مشتركة (window.Guide)
    core/shell.js         الهيدر والفوتر والتحميل وانتقال الصفحات
    core/motion.js        reveal، عدّادات، أزرار مغناطيسية
    services/search-engine.js   محرك البحث (بدون DOM)
    pages/                سكربت لكل صفحة
  images/                 campus-map.png · faculty-logo.png
data/
  translations.js         كل نصوص الواجهة (ar / en)
  buildings.js            المباني وإحداثيات الدبابيس
  spaces.js               القاعات (مولّدة من Excel)
  departments.js          الأقسام والوظائف والخطط الدراسية
  team.js                 أعضاء الفريق
  source/campus-spaces.xlsx
```

## 🛠️ التعديل · Customising

| أريد أن… | عدّل |
|---|---|
| أغيّر نصًا في الواجهة | `data/translations.js` (استخدم `*كلمة*` لتمييزها في العناوين) |
| أضيف قاعة | `data/spaces.js` (`b` المبنى، `l` الدور، `t` النوع) |
| أضيف مبنى أو أحرّك دبوسًا | `data/buildings.js` — `x, y` بالبكسل على صورة `1280×720` |
| أضيف قسمًا | `data/departments.js` |
| أضيف عضوًا | `data/team.js` |
| أغيّر الألوان أو الخطوط | `assets/css/tokens.css` |

## 🔗 روابط مفيدة

- `pages/halls.html?q=مدرج` بحث جاهز · `pages/halls.html?b=nour` قاعات مبنى
- `pages/map.html#nour` فتح مبنى على الخريطة

---

<div dir="ltr">

## English summary

A static, dependency-light site (vanilla JS + [Lucide](https://lucide.dev) icons) with a fuzzy Arabic/English search engine, an interactive pan-and-zoom campus map, department chapters with study plans, light/dark themes and full RTL/LTR switching.

**Run on Windows:** open CMD in the project folder, run `py -m http.server 8080`, then visit <http://localhost:8080>. No build step or package installation is required. Deploy as-is to GitHub Pages.

**Design tokens** live in `assets/css/tokens.css`; **all copy** lives in `data/translations.js`.

</div>


## Responsive interaction fixes

The latest refinement restores the theme toggle state, stabilizes the halls type selector on mobile, uses numbered markers on the campus map, prevents the About page chapter strip from triggering vertical scroll jumps, and adds a restrained swing-in animation to team cards.
