/* ==========================================================================
   UI strings — every visible text lives here in Arabic (ar) and English (en).
   Use *word* to wrap a word in a highlighter mark inside headlines.
   ========================================================================== */
window.Guide = window.Guide || {};
Guide.dict = {};
const D = (key, ar, en) => { Guide.dict[key] = { ar, en }; };

/* ── Site & shell ──────────────────────────────────────────────── */
D('site.title', "مرشدك في كلية الأعمال", "Your Guide to the Faculty of Business");
D('site.faculty', "كلية الأعمال — جامعة الإسكندرية", "Faculty of Business — Alexandria University");
D('lang.aria', "تغيير اللغة", "Change language");
D('nav.home', "الرئيسية", "Home");
D('nav.halls', "القاعات", "Halls");
D('nav.map', "الخريطة", "Map");
D('nav.about', "نبذة", "About");
D('nav.team', "الفريق", "Team");
D('footer.txt', "كلية الأعمال — جامعة الإسكندرية © 2026", "Faculty of Business — Alexandria University © 2026");
D('site.short', "مرشد الكلية", "Faculty Guide");
D('a11y.skip', "تخطَّ إلى المحتوى", "Skip to content");
D('theme.aria', "تبديل المظهر (فاتح / داكن)", "Toggle theme (light / dark)");
D('nav.aria', "التنقل الرئيسي", "Main navigation");
D('footer.built', "صُنع بعناية بواسطة فريق المشروع", "Crafted with care by the project team");
D('footer.top', "للأعلى", "Back to top");
D('nf.title', "الصفحة دي مش موجودة", "This page doesn’t exist");
D('nf.sub', "يبدو أنك وصلت لمكان ليس على الخريطة. ارجع للبداية وجرّب مرة أخرى.", "Looks like you’ve wandered off the map. Head back to the start and try again.");
D('nf.go', "العودة للرئيسية", "Back to home");

/* ── Home ──────────────────────────────────────────────────────── */
D('home.title', "كل ما تحتاجه في كليتك، *في مكان واحد*", "Everything about your faculty, *in one place*");
D('home.sub', "اكتشف المباني والقاعات والأقسام الدراسية بسهولة، وصِل إلى أي مكان في الحرم الجامعي بضغطة واحدة.", "Discover buildings, halls and academic departments — and find your way around campus in a single tap.");
D('home.cta', "ابدأ رحلتك، واكتشف كل ما تحتاج معرفته عن كليتك من مكان واحد!", "Start exploring and find everything you need to know about your faculty in one place!");
D('home.ph', "ابحث عن قاعة: مدرج 3، حجرة 202…", "Find a hall: Amphitheater 3, Room 202…");
D('home.go', "بحث", "Search");
D('home.btnMap', "استكشف الخريطة", "Explore the map");
D('home.btnHalls', "ابحث عن قاعة", "Find a hall");
D('home.preview', "افتح الخريطة التفاعلية", "Open the interactive map");
D('tile.halls', "ابحث عن أي قاعة أو معمل وتعرّف على مكانها فورًا.", "Find any hall or lab and see exactly where it is.");
D('tile.map', "اسحب وقرّب على الخريطة واعرف تفاصيل كل مبنى.", "Pan and zoom the map to see every building in detail.");
D('tile.about', "الأقسام الخمسة، وما تدرسه، وأين يعمل الخريجون.", "The five departments, what you study, and where graduates work.");
D('tile.team', "الأشخاص وراء المشروع.", "The people behind the project.");
D('stat.b', "مبنى ومرفق", "buildings & facilities");
D('stat.s', "قاعة ومعمل", "halls & labs");
D('stat.d', "شعب دراسية", "study programs");
D('home.try', "جرّب:", "Try:");
D('home.sticker', "افتح الخريطة", "Open the map");
D('home.explore', "ابدأ من هنا", "Start here");
D('home.exploreSub', "أربع أدوات تغنيك عن السؤال في الممرات.", "Four tools so you never have to ask in the corridors.");
D('tile.map.btn', "استكشف الخريطة", "Explore the map");
D('tile.halls.btn', "ابحث عن قاعة", "Find a hall");
D('tile.open', "افتح", "Open");
D('home.howT', "كيف يعمل المرشد؟", "How does the guide work?");
D('home.how1', "ابحث", "Search");
D('home.how1d', "اكتب اسم القاعة أو رقمها، حتى لو أخطأت في الإملاء أو كانت لوحة المفاتيح على لغة أخرى.", "Type a hall name or number — even with typos or the wrong keyboard layout.");
D('home.how2', "حدِّد المكان", "Locate it");
D('home.how2d', "افتح الخريطة وشاهد المبنى والدور الذي تبحث عنه مع تفاصيله.", "Open the map to see the building and the floor, with all its details.");
D('home.how3', "اذهب بثقة", "Walk in");
D('home.how3d', "ابدأ يومك الدراسي من غير ما تتوه بين المباني.", "Start your day without wandering between buildings.");
D('home.cta2', "مستعد تكتشف الحرم الجامعي؟", "Ready to explore the campus?");
D('stat.dsub', "عربي · إنجليزي · فرنسي", "Arabic · English · French");

/* ── Halls ─────────────────────────────────────────────────────── */
D('halls.title', "القاعات والمعامل", "Halls & Labs");
D('halls.sub', "اكتب اسم المكان أو رقمه وسنخبرك أين يوجد، في أي مبنى وأي دور.", "Type a place name or number and we’ll tell you the building and the floor.");
D('halls.ph', "مدرج 3، حجرة 202، Lab 4…", "Amphitheater 3, Room 202, Lab 4…");
D('halls.aria', "ابحث عن قاعة", "Search for a hall");
D('halls.all', "الكل", "All");
D('halls.allB', "كل المباني", "All buildings");
D('halls.count', "{n} نتيجة", "{n} results");
D('halls.in', "في {b}، {f}", "In {b}, {f}");
D('halls.onMap', "على الخريطة", "Show on map");
D('halls.approx', "لم نجد تطابقًا تامًا. هذه أقرب النتائج:", "No exact match. Closest results:");
D('halls.noNum', "لا توجد قاعة بالرقم {n}. هذه أقرب النتائج:", "There is no hall numbered {n}. Closest results:");
D('halls.noneT', "لا توجد نتائج", "No results");
D('halls.none', "لم نجد “{q}”. راجع الاسم أو الرقم، أو جرّب كلمة أقصر مثل “مدرج” أو “Lab”.", "We couldn’t find “{q}”. Check the name or number, or try a shorter word like “Amphitheater” or “Lab”.");
D('halls.shortT', "اكتب أكثر قليلًا", "Keep typing");
D('halls.short', "اكتب حرفين على الأقل لبدء البحث.", "Type at least two characters to start searching.");
D('halls.did', "هل تقصد", "Did you mean");
D('halls.conv', "عرضنا نتائج “{q}” لأن لوحة المفاتيح كانت على لغة مختلفة.", "Showing results for “{q}” — your keyboard layout looked switched.");
D('halls.type', "النوع", "Type");
D('halls.building', "المبنى", "Building");
D('halls.floor', "الدور", "Floor");
D('halls.places', "{n} مكان", "{n} places");
D('halls.reset', "مسح التصفية", "Clear filters");
D('halls.clear', "مسح البحث", "Clear search");

/* ── Map ───────────────────────────────────────────────────────── */
D('map.title', "خريطة الكلية", "Faculty Map");
D('map.floors', "أدوار", "floors");
D('map.spaces', "قاعة ومعمل", "halls & labs");
D('map.view', "عرض قاعات المبنى", "Browse this building’s halls");
D('map.approx', "موقع هذا المبنى على الخريطة تقريبي.", "This building’s position on the map is approximate.");
D('map.list', "المباني والمرافق", "Buildings & facilities");
D('map.alt', "صورة جوية لحرم كلية الأعمال مع تحديد المباني", "Aerial view of the Faculty of Business campus with labeled buildings");
D('map.errT', "تعذّر تحميل الخريطة", "Couldn’t load the map");
D('map.err', "تأكد من اتصالك بالإنترنت ثم أعد المحاولة.", "Check your connection and try again.");
D('kind.building', "مبنى", "Building");
D('kind.gate', "بوابة", "Gate");
D('kind.facility', "مرفق", "Facility");
D('card.close', "إغلاق", "Close");
D('map.sub', "اسحب الخريطة وقرّب على أي مبنى، أو اختر من الفهرس لتنتقل إليه مباشرة.", "Pan and zoom the map, or pick a building from the index to fly straight to it.");
D('map.index', "فهرس المباني", "Building index");
D('map.zin', "تكبير", "Zoom in");
D('map.zout', "تصغير", "Zoom out");
D('map.reset', "إعادة الضبط", "Reset view");
D('map.tip', "اسحب للتحريك · Ctrl + عجلة الماوس للتكبير", "Drag to pan · Ctrl + scroll to zoom");
D('map.tipTouch', "اسحب للتحريك · قرّب بإصبعين للتكبير", "Drag to pan · pinch to zoom");
D('map.byFloor', "توزيع القاعات على الأدوار", "Halls by floor");
D('map.noSpaces', "لا توجد قاعات مسجّلة في هذا المكان.", "No halls are listed for this place.");
D('map.n', "{n} قاعة", "{n} halls");

/* ── About ─────────────────────────────────────────────────────── */
D('about.title', "نبذة عن الكلية", "About the Faculty");
D('about.depts', "الأقسام الأكاديمية", "Academic departments");
D('about.jump', "انتقل إلى قسم", "Jump to a department");
D('about.adv', "المميزات", "Advantages");
D('about.jobs', "مجالات العمل", "Career opportunities");
D('about.areas', "ماذا ستدرس؟", "What will you study?");
D('about.plan', "الخطة الدراسية", "Study plan");
D('about.planNote', "المواد التخصصية وغير التخصصية في المستويين الثالث والرابع.", "Specialization and non-specialization courses in Levels 3 and 4.");
D('about.core', "مواد التخصص", "Specialization courses");
D('about.other', "مواد خارج التخصص", "Non-specialization courses");
D('about.hours', "{n} ساعة معتمدة", "{n} credit hours");
D('about.f1', "أقسام علمية", "academic departments");
D('about.f2', "سنوات دراسية", "years of study");
D('about.f3', "مسمى وظيفي يعمل به الخريجون", "career roles your degree can lead to");
D('about.f4', "شعب: عربي · إنجليزي · فرنسي", "programs: Arabic · English · French");
D('about.note', "المعلومات الواردة هنا للتعريف العام، وقد تتغير الخطط الدراسية؛ راجع الكلية للحصول على أحدث لائحة.", "This information is a general overview and study plans may change; check with the faculty for the latest bylaws.");
D('about.sub', "خمسة أقسام علمية تؤهّل الطلاب لسوق العمل في المحاسبة والإدارة والمالية والبيانات والتكنولوجيا. تعرّف على كل قسم: ماذا ستدرس فيه، وما مميزاته، وأين يعمل خريجوه.", "Five academic departments prepare students for careers in accounting, management, finance, data and technology. Explore what you will study in each, its advantages, and where graduates work.");
D('about.index', "فهرس الأقسام", "Departments");
D('about.dept', "القسم {n}", "Department {n}");

/* ── Team ──────────────────────────────────────────────────────── */
D('team.title', "فريق العمل", "The Team");
D('team.sub', "الأشخاص وراء المشروع.", "The people behind the project.");
D('team.note', "ملحوظة: يتغيّر ترتيب الأسماء بشكل عشوائي في كل مرة تفتح فيها الصفحة، ولا يعكس أي أفضلية بين أعضاء الفريق.", "Note: the order of names is randomized every time you open this page and does not reflect any ranking among team members.");
D('team.role', "عضو فريق المشروع", "Project team member");
D('team.count', "{n} عضوًا", "{n} members");
D('team.badge', "بطاقة الفريق", "Team badge");

/* ── Errors ────────────────────────────────────────────────────── */
D('err.loadT', "تعذّر تحميل البيانات", "Couldn’t load the data");
D('err.load', "حدث خطأ أثناء تحميل بيانات القاعات. حاول مرة أخرى.", "Something went wrong while loading the hall data. Please try again.");
D('err.retry', "إعادة المحاولة", "Try again");
