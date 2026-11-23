window.Guide=window.Guide||{};
(()=>{const Guide=window.Guide;
/* The faculty's three study programs (shown in the home-page stats). */
Guide.programs=[{ar:'عربي',en:'Arabic'},{ar:'إنجليزي',en:'English'},{ar:'فرنسي',en:'French'}];

/* Helpers: T = bilingual text, J = career role (name + description), C = course */
const T=(ar,en)=>({ar,en});
const J=(ar,en,dar,den)=>({n:T(ar,en),d:T(dar,den)});

/* Academic departments of the Faculty of Commerce (per Alexandria University's official list of departments).
   Economics and Political Science are part of a separate faculty, so they are not listed here. */
Guide.departments=[

/* 1 ─ Management Information Systems */
{id:'mis',icon:'database',accent:'#8cc8e8',
 name:T('نظم المعلومات الإدارية','Management Information Systems'),short:T('نظم المعلومات','MIS'),
 tag:T('حلقة الوصل بين الأعمال والتكنولوجيا','The bridge between business and technology'),
 about:T('برنامج بكالوريوس متعدد التخصصات يدمج مجالين أكاديميين: الإدارة وتكنولوجيا المعلومات. يؤدي طلاب القسم دورًا مهمًا في مساعدة المؤسسات على تحقيق أقصى استفادة من إمكانات التكنولوجيا في أعمالها. (اسمه الرسمي في الجامعة: نظم المعلومات والحاسبات الآلية.)','An interdisciplinary bachelor’s program that combines two fields: management and information technology. MIS students play an important role in helping organizations get the most out of technology in their business. (Official university name: Information Systems & Computers.)'),
 areas:[T('البرمجة (Java)','Programming (Java)'),T('قواعد البيانات','Databases'),T('تحليل وتصميم النظم','Systems analysis & design'),T('ذكاء الأعمال وتنقيب البيانات','Business intelligence & data mining'),T('نظم دعم القرار','Decision support systems'),T('التجارة الإلكترونية','E-commerce'),T('مراجعة النظم الإلكترونية','Information systems auditing')],
 benefits:[T('يجمع بين مهارات الإدارة ومهارات البرمجة والبيانات في تخصص واحد.','Combines management, programming and data skills in one specialization.'),T('خريجوه مطلوبون في أحدث المجالات: البيانات والذكاء الاصطناعي وأتمتة الأعمال.','Graduates are sought after in the newest fields: data, AI and business automation.'),T('مجالات عمل واسعة، من تحليل الأعمال إلى التطوير والإدارة والاستشارات.','Wide career range, from business analysis to development, management and consulting.'),T('مشروع تخرج عملي يُناقش في نهاية الفصل الدراسي الثاني من المستوى الرابع.','A hands-on graduation project defended at the end of the second semester of Level 4.')],
 careers:[
  {title:T('تحليل الأعمال والنظم','Business & systems analysis'),items:[
   J('محلل أعمال','Business Analyst','دراسة احتياجات الشركات وتحويلها إلى متطلبات تقنية واضحة ينفذها المطورون.','Studying company needs and turning them into clear technical requirements for developers.'),
   J('محلل نظم','Systems Analyst','تصميم وتطوير أنظمة المعلومات وتقييم كفاءتها وضمان توافقها مع أهداف المؤسسة.','Designing and developing information systems, evaluating them and aligning them with company goals.'),
   J('محلل منتجات','Product Analyst','تتبع سلوك المستخدمين داخل التطبيقات والمواقع وتحليل مؤشرات التفاعل لدعم قرارات التطوير.','Tracking user behavior in apps and websites and analyzing engagement metrics to guide development.')]},
  {title:T('البيانات وذكاء الأعمال','Data, BI & AI'),items:[
   J('محلل بيانات','Data Analyst','جمع البيانات وتنظيفها وتحليلها لاستخراج تقارير ومؤشرات تدعم القرار.','Collecting, cleaning and analyzing data to produce reports and indicators for decisions.'),
   J('أخصائي ذكاء الأعمال (BI)','Business Intelligence Specialist','بناء لوحات المعلومات التفاعلية وتقارير ذكاء الأعمال باستخدام Power BI أو Tableau.','Building interactive dashboards and BI reports using Power BI or Tableau.'),
   J('مصمم / مدير قواعد بيانات','Database Administrator / Designer','تصميم قواعد البيانات وإدارتها وضمان أمنها وسرعة الوصول إليها.','Designing and managing databases while ensuring security and fast access.'),
   J('مهندس بيانات','Data Engineer','بناء خطوط نقل وتجهيز البيانات ومستودعات البيانات لتكون جاهزة للتحليل.','Building data pipelines and warehouses so data is ready for analysis.'),
   J('أخصائي الذكاء الاصطناعي وأتمتة العمليات','AI & Automation Workflow Specialist','ربط أدوات الذكاء الاصطناعي وأتمتة العمليات بسيناريوهات العمل داخل الشركة.','Connecting AI tools and automating processes within company workflows.')]},
  {title:T('إدارة المشاريع والمنتجات','Project & product management'),items:[
   J('مدير مشاريع','Project Manager','تخطيط المشاريع التقنية والإدارية ومتابعة التنفيذ والالتزام بالوقت والميزانية.','Planning technical and business projects and tracking time and budget.'),
   J('مدير / مالك منتج','Product Manager / Product Owner','تحديد رؤية المنتج الرقمي وأولويات الميزات والتنسيق بين الفرق التقنية والتجارية.','Defining the digital product vision, feature priorities and coordinating tech and business teams.'),
   J('Scrum Master / مدرب Agile','Scrum Master / Agile Coach','تسهيل تطبيق منهجيات العمل الرشيقة داخل فرق التطوير وحل المعوقات.','Facilitating Agile/Scrum practices in development teams and removing blockers.')]},
  {title:T('الأنظمة المؤسسية والاستشارات','ERP, SaaS & consulting'),items:[
   J('مستشار / أخصائي ERP','ERP Consultant / Specialist','العمل على أنظمة تخطيط موارد المؤسسات (مثل SAP وOracle وOdoo) وتخصيصها لاحتياجات الشركات.','Working on enterprise resource planning systems (e.g. SAP, Oracle, Odoo) and tailoring them to company needs.'),
   J('أخصائي تطبيق الأنظمة','Implementation Specialist','تهيئة الأنظمة أو منصات SaaS للعملاء وتدريب فرقهم على استخدامها.','Setting up software or SaaS platforms for clients and training their teams.'),
   J('مستشار تقني / إداري','IT Consultant','تقديم حلول تقنية وإدارية لتحسين كفاءة التشغيل داخل المؤسسات.','Providing technical and management solutions to improve operational efficiency.')]},
  {title:T('الجودة والتشغيل والرقابة','QA, operations & governance'),items:[
   J('مختبر برمجيات / ضمان الجودة','Quality Assurance / Software Tester','اختبار الأنظمة والتأكد من خلوها من الأخطاء ومطابقتها للمواصفات.','Testing systems to make sure they are error-free and meet specifications.'),
   J('محلل عمليات وسلاسل إمداد','Operations / Supply Chain Analyst','تحليل كفاءة التشغيل والمخزون وسلاسل الإمداد باستخدام البيانات والأنظمة.','Analyzing operations, inventory and supply chains using data and systems.'),
   J('إدارة خدمات تقنية المعلومات والدعم (ITSM)','IT Service Management (ITSM) / Support','إدارة خدمات تقنية المعلومات وحل المشكلات التشغيلية للأنظمة الداخلية.','Managing IT services and solving operational problems in internal systems.'),
   J('تدقيق تقنية المعلومات والمخاطر والحوكمة','IT Audit / Risk & Governance','تقييم المخاطر التقنية والرقابة على الأنظمة والالتزام بالمعايير (في البنوك والشركات الكبرى).','Assessing technology risks, system controls and standards compliance (in banks and large companies).'),
   J('تطوير الأعمال / ما قبل البيع','Business Development / Pre-Sales','فهم احتياجات العملاء التقنية والتجارية وتقديم الحلول المناسبة لهم.','Understanding clients’ technical and business needs and proposing the right solutions.')]},
  {title:T('التطوير التقني الأساسي','Core technical development'),items:[
   J('مطوّر ويب (Front-End / Back-End)','Web Developer (Front-End / Back-End)','تطوير المواقع وتطبيقات الويب، خاصة مع خلفية قواعد البيانات والبرمجة في القسم.','Building websites and web apps, drawing on the department’s database and programming background.'),
   J('أخصائي شبكات وبنية تحتية','Network / Infrastructure Specialist','إدارة الشبكات والبنية التحتية التقنية وأمن المعلومات الأساسي.','Managing networks, technical infrastructure and basic information security.')]}
 ],
 plan:[
  {level:T('المستوى الثالث','Level 3'),terms:[
   {title:T('الفصل الدراسي الأول','First semester'),hours:17,
    core:[T('البنية التحتية لتكنولوجيا المعلومات (ITI)','IT Infrastructure (ITI)'),T('مقدمة في برمجة الحاسب (Java)','Introduction to Computer Programming (Java)'),T('التحليل الكمي باستخدام البرمجيات','Quantitative Analysis using Software')],
    other:[T('إدارة الإنتاج والعمليات','Production & Operations Management'),T('مبادئ محاسبة التكاليف','Principles of Cost Accounting'),T('التفكير الناقد (مقرر جامعي)','Critical Thinking (university requirement)')]},
   {title:T('الفصل الدراسي الثاني','Second semester'),hours:17,
    core:[T('البرامج الإحصائية الجاهزة','Statistical Software Packages'),T('تطبيقات في برمجة الحاسب','Computer Programming Applications'),T('إدارة التكنولوجيا','Technology Management'),T('تحليل وتصميم نظم المعلومات (SAD)','Systems Analysis & Design (SAD)'),T('تصميم وإدارة قواعد البيانات','Database Design & Management')],
    other:[T('الابتكار وريادة الأعمال (مقرر جامعي)','Innovation & Entrepreneurship (university requirement)')]}]},
  {level:T('المستوى الرابع','Level 4'),terms:[
   {title:T('الفصل الدراسي الأول','First semester'),
    core:[T('استخبارات وتنقيب البيانات','Data Mining & Business Intelligence'),T('مراجعة النظم الإلكترونية','Electronic Systems Auditing'),T('نظم المعلومات المتقدمة وتطبيقاتها','Advanced Information Systems & Applications'),T('نظم دعم القرار (DSS)','Decision Support Systems (DSS)'),T('الإدارة الاستراتيجية','Strategic Management')],
    other:[T('اللياقة والثقافة الصحية (مقرر جامعي)','Fitness & Health Culture (university requirement)')]},
   {title:T('الفصل الدراسي الثاني','Second semester'),
    core:[T('نظم المعلومات المتكاملة','Integrated Information Systems'),T('النظم الذكية لدعم القرار (IDSS)','Intelligent Decision Support Systems (IDSS)'),T('مشروع التخرج','Graduation Project'),T('التجارة والأعمال الإلكترونية','E-Commerce & E-Business'),T('نظم المعلومات المحاسبية المتقدمة (AAIS)','Advanced Accounting Information Systems (AAIS)')],
    other:[T('الإسعافات الأولية (مقرر جامعي)','First Aid (university requirement)')],
    note:T('يُناقش مشروع التخرج مع نهاية الفصل الدراسي الثاني.','The graduation project is defended at the end of the second semester.')}]}
 ]},

/* 2 ─ Business Administration */
{id:'business',icon:'briefcase',accent:'#f2552c',
 name:T('إدارة الأعمال','Business Administration'),short:T('إدارة الأعمال','Business Admin'),
 tag:T('قيادة المؤسسات وصناعة القرار','Leading organizations and making decisions'),
 about:T('يدرس القسم كيف تُخطَّط المؤسسات وتُدار وتُسوَّق منتجاتها وتُموَّل أنشطتها. ويتيح للطالب التخصص في أحد أربعة مسارات: المسار العام، والتسويق، والتمويل والاستثمار، والموارد البشرية.','The department studies how organizations are planned, managed, marketed and financed. Students can specialize in one of four paths: General Business, Marketing, Finance & Investment, or Human Resources.'),
 areas:[T('مبادئ الإدارة','Principles of management'),T('السلوك التنظيمي','Organizational behavior'),T('التسويق','Marketing'),T('التمويل والاستثمار','Finance & investment'),T('إدارة الموارد البشرية','Human resource management'),T('إدارة الإنتاج والعمليات','Production & operations management'),T('الإدارة الاستراتيجية','Strategic management'),T('ريادة الأعمال','Entrepreneurship')],
 benefits:[T('أوسع الأقسام من حيث تنوع المسارات والفرص الوظيفية.','The broadest department in terms of paths and job opportunities.'),T('تنمية مهارات القيادة والتواصل والتفكير الاستراتيجي واتخاذ القرار.','Builds leadership, communication, strategic thinking and decision-making skills.'),T('أساس مناسب لبدء مشروعك الخاص أو إدارة نشاط عائلي.','A solid base for starting your own business or running a family one.'),T('إمكانية التخصص مبكرًا في مجال تحبه: تسويق أو تمويل أو موارد بشرية.','You can specialize early in a field you enjoy: marketing, finance or HR.')],
 careers:[
  {title:T('المسار العام','General Business path'),items:[
   J('مساعد مدير / منسق إداري','Assistant manager / administrative coordinator','المشاركة في تنظيم العمل اليومي ومتابعة الأقسام داخل الشركات.','Helping organize daily work and follow up across company departments.'),
   J('أخصائي عمليات وجودة','Operations & quality specialist','متابعة سير العمليات وتحسين كفاءتها وجودة المنتج أو الخدمة.','Monitoring processes and improving efficiency and quality of products or services.'),
   J('رائد أعمال','Entrepreneur','تأسيس مشروع خاص وإدارته من الفكرة حتى التشغيل.','Launching and running your own business from idea to operation.')]},
  {title:T('مسار التسويق','Marketing path'),items:[
   J('أخصائي تسويق','Marketing specialist','التخطيط للحملات التسويقية وتحليل احتياجات العملاء.','Planning marketing campaigns and analyzing customer needs.'),
   J('التسويق الرقمي','Digital marketing','إدارة الإعلانات ومنصات التواصل ومحركات البحث.','Managing ads, social media and search engine channels.'),
   J('أبحاث السوق','Market research','جمع وتحليل بيانات السوق والمنافسين لدعم قرارات الشركة.','Collecting and analyzing market and competitor data to support decisions.'),
   J('مندوب / مدير مبيعات','Sales representative / manager','بناء علاقات العملاء وتحقيق مستهدفات المبيعات.','Building client relationships and reaching sales targets.')]},
  {title:T('مسار التمويل والاستثمار','Finance & Investment path'),items:[
   J('محلل مالي','Financial analyst','تحليل الأداء المالي للشركات وإعداد التوصيات الاستثمارية.','Analyzing company financial performance and preparing investment recommendations.'),
   J('موظف بنوك وائتمان','Banking & credit officer','دراسة الجدارة الائتمانية للعملاء وتقديم الخدمات المصرفية.','Assessing clients’ creditworthiness and providing banking services.'),
   J('شركات الأوراق المالية وإدارة المحافظ','Securities firms & portfolio management','التعامل مع البورصة وإدارة استثمارات الأفراد والشركات.','Working with the stock market and managing investments for individuals and companies.')]},
  {title:T('مسار الموارد البشرية','Human Resources path'),items:[
   J('أخصائي استقطاب وتعيين','Recruitment specialist','البحث عن الكفاءات واختيار المرشحين المناسبين للوظائف.','Sourcing talent and selecting the right candidates.'),
   J('التدريب والتطوير','Training & development','تصميم برامج تدريب ترفع مهارات العاملين.','Designing training programs that raise employee skills.'),
   J('الأجور والمزايا وعلاقات العمل','Compensation, benefits & labor relations','إدارة الرواتب والحوافز وشؤون العاملين.','Managing payroll, incentives and employee affairs.')]}
 ]},

/* 3 ─ Accounting & Auditing */
{id:'accounting',icon:'calculator',accent:'#ffc23c',showEn:true,
 name:T('المحاسبة والمراجعة','Accounting & Auditing'),short:T('المحاسبة','Accounting'),
 tag:T('لغة الأعمال: أرقام دقيقة وقرارات سليمة','The language of business: accurate numbers, sound decisions'),
 about:T('يُعد برنامج البكالوريوس في قسم المحاسبة الركيزة الأساسية لفهم وإدارة الجوانب المالية للمؤسسات، حيث يجمع بين القواعد والمعايير المحاسبية والتحليل المالي والرقابة. ويؤهل البرنامج الطلاب لإعداد القوائم والتقارير المالية، وتحليل التكاليف والربحية، وتقديم المعلومات الدقيقة التي تساعد الإدارة والمستثمرين على تقييم الأداء واتخاذ القرارات الاقتصادية السليمة.','The bachelor’s program in Accounting is the cornerstone for understanding and managing an organization’s financial affairs, combining accounting rules and standards with financial analysis and control. It prepares students to produce financial statements and reports, analyze costs and profitability, and provide the accurate information that helps management and investors assess performance and make sound economic decisions.'),
 areas:[T('محاسبة الشركات','Corporate accounting'),T('محاسبة التكاليف','Cost accounting'),T('المحاسبة الإدارية','Management accounting'),T('المحاسبة المالية المتقدمة','Advanced financial accounting'),T('تحليل القوائم المالية','Financial statement analysis'),T('المراجعة والرقابة الداخلية','Auditing & internal control'),T('المحاسبة الضريبية','Tax accounting'),T('نظم المعلومات المحاسبية','Accounting information systems'),T('الاستثمار','Investment')],
 benefits:[T('طلب مستمر في سوق العمل: كل مؤسسة تحتاج محاسبًا.','Steady demand: every organization needs accountants.'),T('قاعدة قوية للحصول على شهادات مهنية دولية مثل ACCA وCMA وCPA وCIA.','A strong base for international professional certificates such as ACCA, CMA, CPA and CIA.'),T('مسار مهني واضح من محاسب إلى مراقب مالي ثم مدير مالي.','A clear career ladder from accountant to financial controller to CFO.'),T('دقة وتفكير منظم ومهارات تحليل الأرقام.','Precision, structured thinking and strong number-analysis skills.')],
 careers:[
  {title:T('المحاسبة المالية وإعداد التقارير','Financial Accounting & Reporting'),items:[
   J('محاسب مالي','Financial Accountant','تسجيل القيود والمعاملات المالية اليومية وإعداد القوائم المالية (قائمة الدخل، المركز المالي، التدفقات النقدية) وفق المعايير المحاسبية.','Recording daily journal entries and transactions and preparing financial statements (income statement, balance sheet, cash flows) in line with accounting standards.'),
   J('محاسب أستاذ عام','General Ledger Accountant','متابعة حسابات الأستاذ العام ومطابقة الأرصدة وإغلاق الحسابات الشهرية والسنوية.','Maintaining general ledger accounts, reconciling balances and closing the books monthly and yearly.'),
   J('أخصائي تقارير مالية','Financial Reporting Specialist','إعداد التقارير المالية الدورية الداخلية والخارجية وتحليل بنود القوائم المالية.','Preparing periodic internal and external financial reports and analyzing financial statement items.')]},
  {title:T('المحاسبة الإدارية والتكاليف','Management & Cost Accounting'),items:[
   J('محاسب تكاليف','Cost Accountant','حساب تكلفة إنتاج السلع أو تقديم الخدمات، وتحليل الانحرافات، وتحديد نقاط التعادل والتسعير.','Calculating the cost of producing goods or delivering services, analyzing variances, and setting break-even points and prices.'),
   J('محاسب إداري','Management Accountant','إعداد الموازنات التقديرية وتحليل الأداء التشغيلي والمالي لمساعدة الإدارة في التخطيط واتخاذ القرار.','Preparing budgets and analyzing operational and financial performance to help management plan and decide.'),
   J('محلل موازنات وتخطيط وتحليل مالي','Budget / FP&A Analyst','التنبؤ المالي، ومتابعة الموازنات مقابل الفعلي، وتحليل الربحية والانحرافات.','Financial forecasting, tracking budgets against actuals, and analyzing profitability and variances.')]},
  {title:T('المراجعة والرقابة والحوكمة','Audit, Assurance & Internal Control'),items:[
   J('مراجع خارجي','External Auditor','فحص القوائم المالية للشركات من جهة مستقلة للتأكد من صحتها وعدالتها وتوافقها مع المعايير.','Independently examining company financial statements to confirm they are accurate, fair and compliant with standards.'),
   J('مراجع داخلي','Internal Auditor','تقييم كفاءة أنظمة الرقابة الداخلية وإدارة المخاطر والالتزام بالسياسات والإجراءات داخل المؤسسة.','Evaluating the effectiveness of internal controls and risk management, and compliance with policies and procedures inside the organization.'),
   J('أخصائي التزام ومخاطر','Compliance / Risk Specialist','متابعة الالتزام باللوائح والضوابط الرقابية والحد من المخاطر المالية والتشغيلية.','Monitoring compliance with regulations and controls and reducing financial and operational risks.')]},
  {title:T('الضرائب والتمويل والبنوك','Taxation, Finance & Banking'),items:[
   J('محاسب / أخصائي ضرائب','Tax Accountant / Specialist','إعداد الإقرارات الضريبية ومتابعة الالتزام الضريبي وفهم القوانين والتشريعات الضريبية.','Preparing tax returns, following up on tax compliance and understanding tax laws and legislation.'),
   J('محلل ائتمان أو محلل مالي','Credit / Financial Analyst','تقييم الجدارة الائتمانية للعملاء أو الشركات وتحليل القوائم المالية والمؤشرات لدعم قرارات التمويل والاستثمار.','Assessing the creditworthiness of clients or companies and analyzing statements and indicators to support financing and investment decisions.'),
   J('أخصائي خزينة وإدارة نقدية','Treasury / Cash Management Specialist','متابعة السيولة النقدية والتدفقات اليومية وحسابات البنوك والالتزامات قصيرة الأجل.','Tracking cash liquidity, daily cash flows, bank accounts and short-term obligations.')]},
  {title:T('الأنظمة المحاسبية والـ ERP','Accounting Systems & ERP'),items:[
   J('أخصائي أنظمة محاسبية / ERP','ERP / Accounting System Specialist','العمل على أنظمة إدارة الموارد والمحاسبة (مثل SAP أو Oracle أو Odoo أو برامج المحاسبة المتخصصة) وضبط الدورة المستندية والحسابية عليها.','Working on resource-planning and accounting systems (such as SAP, Oracle, Odoo or specialized accounting software) and setting up the document and accounting cycle on them.'),
   J('محلل أنظمة أو بيانات مالية','Financial Systems / Data Analyst','ربط البيانات المالية بالتقارير والتحليلات وتحسين دقة تدفق المعلومات المحاسبية.','Linking financial data to reports and analytics and improving the accuracy of accounting information flow.')]}
 ],
 plan:[
  {level:T('المستوى الثالث','Level 3'),terms:[
   {title:T('الفصل الدراسي الأول','First semester'),hours:17,
    core:[T('محاسبة الشركات (1)','Corporate Accounting (1)'),T('مبادئ محاسبة التكاليف','Principles of Cost Accounting'),T('تحليل القوائم المالية','Financial Statement Analysis')],
    other:[T('إدارة الإنتاج والعمليات','Production & Operations Management'),T('التفكير الناقد (مقرر جامعي)','Critical Thinking (university requirement)'),T('أصول النظم الضريبية','Fundamentals of Tax Systems')]},
   {title:T('الفصل الدراسي الثاني','Second semester'),
    core:[T('محاسبة الشركات (2)','Corporate Accounting (2)'),T('نظم محاسبية متخصصة','Specialized Accounting Systems'),T('رقابة ومراجعة داخلية','Internal Control & Auditing'),T('نظم المعلومات المحاسبية','Accounting Information Systems'),T('بحوث العمليات في المحاسبة','Operations Research in Accounting')],
    other:[T('الابتكار وريادة الأعمال (مقرر جامعي)','Innovation & Entrepreneurship (university requirement)')]}]},
  {level:T('المستوى الرابع','Level 4'),terms:[
   {title:T('الفصل الدراسي الأول','First semester'),
    core:[T('نظم قياس التكاليف','Cost Measurement Systems'),T('محاسبة ضريبية (1)','Tax Accounting (1)'),T('مراجعة','Auditing'),T('محاسبة مالية متقدمة','Advanced Financial Accounting'),T('استثمار','Investment')],
    other:[T('اللياقة والثقافة الصحية (مقرر جامعي)','Fitness & Health Culture (university requirement)')]},
   {title:T('الفصل الدراسي الثاني','Second semester'),
    core:[T('محاسبة ضريبية (2)','Tax Accounting (2)'),T('الإدارة الاستراتيجية','Strategic Management'),T('محاسبة إدارية متقدمة','Advanced Management Accounting'),T('مراجعة النظم المحاسبية الإلكترونية','Auditing of Electronic Accounting Systems'),T('محاسبة التكاليف المتقدمة','Advanced Cost Accounting')],
    other:[T('الإسعافات الأولية (مقرر جامعي)','First Aid (university requirement)')]}]}
 ]},

/* 4 ─ Public Finance & Customs */
{id:'public-finance',icon:'landmark',accent:'#7fd1a5',
 name:T('المالية العامة والدراسات المالية والجمركية','Public Finance, Financial & Customs Studies'),short:T('المالية العامة','Public Finance'),
 tag:T('أموال الدولة، والضرائب، والجمارك، والتجارة الدولية','State finances, taxes, customs and international trade'),
 about:T('يدرس القسم الموازنة العامة للدولة وإيراداتها ونفقاتها، والنظم الضريبية، والتشريعات والإجراءات الجمركية، وما يرتبط بها من عمليات الاستيراد والتصدير والتخليص الجمركي.','The department studies the state budget, public revenues and expenditure, tax systems, customs legislation and procedures, and the related import, export and clearance operations.'),
 areas:[T('المالية العامة والموازنة','Public finance & budgeting'),T('النظم الضريبية','Tax systems'),T('التشريعات والإجراءات الجمركية','Customs legislation & procedures'),T('الاقتصاد والتجارة الخارجية','Economics & foreign trade'),T('القانون التجاري','Commercial law'),T('الاستيراد والتصدير','Import & export')],
 benefits:[T('تخصص نادر يربط بين المال والقانون والتجارة الدولية.','A distinctive field linking finance, law and international trade.'),T('فهم عميق لإجراءات التخليص الجمركي ودورة الاستيراد والتصدير.','In-depth understanding of customs clearance and the import-export cycle.'),T('فرص في الجهات الحكومية وكذلك في القطاع الخاص والشحن.','Opportunities in government bodies as well as the private and shipping sectors.')],
 careers:[
  {title:T('الجهات الحكومية','Government bodies'),items:[
   J('مصلحة الضرائب','Tax Authority','تقدير الضرائب وفحص الإقرارات ومتابعة التحصيل.','Assessing taxes, reviewing returns and following up on collection.'),
   J('مصلحة الجمارك','Customs Authority','تطبيق القوانين الجمركية وفحص البضائع وتقدير الرسوم.','Enforcing customs laws, inspecting goods and assessing duties.'),
   J('وزارة المالية والجهات الحكومية','Ministry of Finance & public bodies','العمل في الموازنة والحسابات والأجهزة المالية للدولة.','Working in budgeting, accounts and the state’s financial bodies.')]},
  {title:T('القطاع الخاص','Private sector'),items:[
   J('شركات التخليص الجمركي','Customs clearance companies','إنهاء الإجراءات الجمركية للبضائع المستوردة والمصدّرة.','Completing customs procedures for imported and exported goods.'),
   J('شركات الاستيراد والتصدير','Import & export companies','إدارة عمليات التجارة الدولية والمستندات والتراخيص.','Managing international trade operations, documents and licenses.'),
   J('شركات الشحن والخدمات اللوجستية','Shipping & logistics companies','تنظيم حركة البضائع من الميناء إلى العميل.','Organizing the movement of goods from port to customer.'),
   J('البنوك والمؤسسات المالية','Banks & financial institutions','التعامل مع الاعتمادات المستندية وتمويل التجارة الخارجية.','Handling letters of credit and foreign-trade financing.')]}
 ]},

/* 5 ─ Statistics, Mathematics & Insurance */
{id:'statistics',icon:'sigma',accent:'#b9a7f5',
 name:T('الإحصاء والرياضة والتأمين','Statistics, Mathematics & Insurance'),short:T('الإحصاء والتأمين','Statistics & Insurance'),
 tag:T('تحويل البيانات إلى معرفة، وقياس المخاطر','Turning data into knowledge, and measuring risk'),
 about:T('يهتم القسم بجمع البيانات وتنظيمها وتحليلها وتفسير نتائجها بالأساليب الإحصائية والرياضية، إضافة إلى علوم التأمين وإدارة المخاطر وبحوث العمليات.','The department focuses on collecting, organizing, analyzing and interpreting data with statistical and mathematical methods, along with insurance, risk management and operations research.'),
 areas:[T('الإحصاء التطبيقي','Applied statistics'),T('الاحتمالات والاستدلال الإحصائي','Probability & statistical inference'),T('بحوث العمليات','Operations research'),T('الرياضيات المالية والتأمينية','Financial & actuarial mathematics'),T('التأمين وإدارة المخاطر','Insurance & risk management'),T('البرامج الإحصائية والحاسب','Statistical software & computing')],
 benefits:[T('تنمية التفكير التحليلي والقدرة على اتخاذ قرارات مبنية على البيانات.','Develops analytical thinking and data-driven decision making.'),T('مهارات مطلوبة بقوة في تحليل البيانات وعلم البيانات.','Skills in high demand in data analysis and data science.'),T('بوابة للعمل في شركات التأمين وإدارة المخاطر.','A gateway to insurance companies and risk management.')],
 careers:[
  {title:T('تحليل البيانات والبحوث','Data analysis & research'),items:[
   J('محلل إحصائي / محلل بيانات','Statistical / data analyst','استخراج المؤشرات والتقارير من البيانات لدعم قرارات الإدارة.','Extracting indicators and reports from data to support management decisions.'),
   J('باحث بحوث عمليات','Operations research analyst','بناء نماذج رياضية لتحسين الإنتاج والتوزيع وتقليل التكلفة.','Building mathematical models to optimize production and distribution and cut costs.'),
   J('مراكز الإحصاء والبحوث واستطلاعات الرأي','Statistics, research & polling centers','تصميم المسوح الميدانية وتحليل نتائجها، مثل الجهات الإحصائية الرسمية.','Designing field surveys and analyzing results, as in official statistical agencies.')]},
  {title:T('التأمين والمخاطر','Insurance & risk'),items:[
   J('شركات التأمين','Insurance companies','العمل في الإنتاج والتسعير والاكتتاب والتعويضات.','Working in sales, pricing, underwriting and claims.'),
   J('محلل مخاطر','Risk analyst','قياس المخاطر المالية والتشغيلية في البنوك والشركات.','Measuring financial and operational risks in banks and companies.'),
   J('خبير اكتواري','Actuary','تقدير الالتزامات المستقبلية للتأمين والمعاشات (يتطلب اجتياز اختبارات مهنية).','Estimating future insurance and pension liabilities (requires professional exams).')]}
 ]},
];
})();
