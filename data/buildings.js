/* Map positions (x,y) are pixels on assets/images/campus-map.png (1280x720). */
window.Guide=window.Guide||{};
Guide.floors=[{ar:'الدور الأرضي',en:'Ground floor'},{ar:'الدور الأول',en:'First floor'},{ar:'الدور الثاني',en:'Second floor'},{ar:'الدور الثالث',en:'Third floor'},{ar:'الدور الرابع',en:'Fourth floor'},{ar:'الدور الخامس',en:'Fifth floor'},{ar:'الدور السادس',en:'Sixth floor'}];
Guide.types=[
{id:'lecture',ar:'مدرج',en:'Amphitheater',ico:'presentation',syn:'مدرج مدرجات محاضرات amphitheater amphitheatre lecture theater'},
{id:'room',ar:'حجرة',en:'Room',ico:'door-open',syn:'حجرة غرفة فصل room classroom'},
{id:'hall',ar:'قاعة',en:'Hall',ico:'users',syn:'قاعة قاعات hall'},
{id:'lab',ar:'معمل',en:'Lab',ico:'monitor',syn:'lab لاب معمل معامل مختبر laboratory lap computer'}];
Guide.buildings=[
{id:'english',kind:'building',icon:'building-2',x:528,y:122,ar:'مبنى تجارة إنجليش',en:'English Commerce Building',al:'تجارة انجليزي تجارة انجليش english commerce',d:{ar:'مبنى برنامج تجارة إنجليش، ويضم عددًا من المدرجات والقاعات.',en:'Home of the English-language commerce program, with several amphitheaters and halls.'}},
{id:'nour',kind:'building',icon:'building-2',x:654,y:230,ar:'مبنى النور',en:'Nour Building',al:'نور النور شؤون انجليش دراسات عليا nour graduate',d:{ar:'يضم شؤون إنجليش ومقر الدراسات العليا، وفيه أكبر عدد من الحجرات والمدرجات.',en:'Houses English Affairs and the Graduate Studies HQ, with the most rooms and amphitheaters on campus.'}},
{id:'arabic',kind:'building',icon:'building-2',x:930,y:215,ar:'مبنى المدرجات / تجارة عربي',en:'Amphitheaters / Arabic Commerce Building',al:'تجارة عربي مدرجات المدرجات arabic commerce steps',d:{ar:'مبنى تجارة عربي، ويضم المدرجين ج و د.',en:'The Arabic commerce building, home to amphitheaters C and D.'}},
{id:'sections',kind:'building',icon:'building-2',x:1123,y:327,ar:'مبنى السكاشن',en:'Sections Building',al:'سكاشن السكاشن sections',d:{ar:'مخصص للسكاشن، ويضم حجرات دراسية على أربعة أدوار ومدرجًا واحدًا.',en:'Used for section classes, with study rooms on four floors and one amphitheater.'}},
{id:'computer',kind:'building',icon:'monitor',hidden:true,ar:'مبنى الحاسب الآلي',en:'Computer Building',al:'حاسب الي كمبيوتر لاب معمل computer cs',d:{ar:'يضم معامل الحاسب الآلي.',en:'Houses the computer labs.'}},
{id:'dean',kind:'building',icon:'landmark',x:746,y:287,ar:'مبنى العميد',en:"Dean's Building",al:'عميد العميد dean administration',d:{ar:'مبنى إدارة الكلية ومكتب العميد.',en:"The faculty administration building and the Dean's office."}},
{id:'arabicaffairs',kind:'building',icon:'building-2',x:523,y:308,ar:'مبنى شؤون العربي',en:'Arabic Affairs Building',al:'شؤون عربي arabic affairs',d:{ar:'مبنى شؤون الطلاب لبرنامج تجارة عربي.',en:'Student affairs building for the Arabic commerce program.'}},
{id:'tram',kind:'gate',icon:'log-in',x:755,y:100,ar:'بوابة الترام',en:'Tram Gate',al:'ترام بوابة tram gate',d:{ar:'بوابة الكلية من جهة الترام.',en:'The faculty gate on the tram side.'}},
{id:'sea',kind:'gate',icon:'log-in',x:998,y:525,ar:'بوابة البحر',en:'Sea Gate',al:'بحر بوابة sea gate',d:{ar:'بوابة الكلية من جهة البحر.',en:'The faculty gate on the sea side.'}},
{id:'yard',kind:'facility',icon:'trees',x:870,y:410,ar:'ساحة كلية الأعمال',en:'Faculty Yard',al:'ساحة yard',d:{ar:'الساحة الرئيسية ونقطة التجمع بين المباني.',en:'The main yard and meeting point between buildings.'}},
{id:'sports',kind:'facility',icon:'trophy',x:687,y:508,ar:'ملاعب الكلية والأنشطة الرياضية',en:'Sports Fields',al:'ملاعب رياضة sports',d:{ar:'ملاعب الكلية ومساحات الأنشطة الرياضية.',en:'The faculty sports fields and activity areas.'}}
];
