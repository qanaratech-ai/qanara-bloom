export type Language = "en" | "ar";

export const translations = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.signIn": "Sign In",
    "nav.getStarted": "Get Started",
    "nav.demo": "Live Demo",

    // Hero
    "hero.badge": "AI-Powered Greenhouse Intelligence",
    "hero.title.1": "Detect pests",
    "hero.title.highlight": "7-14 days earlier",
    "hero.title.2": "with computer vision",
    "hero.subtitle":
      "Qanara Tech gives greenhouse growers early pest detection, integrated pest management, and blockchain-verified sustainability — for a fraction of the cost of legacy systems.",
    "hero.cta.trial": "Start Free Trial",
    "hero.cta.demo": "Watch Demo",

    // Stats
    "stats.chemical": "Chemical Reduction",
    "stats.earlier": "Days Earlier Detection",
    "stats.affordable": "More Affordable",
    "stats.blockchain": "Blockchain Verified",

    // Features
    "features.title": "Everything you need to run a resilient greenhouse",
    "features.subtitle":
      "From early pest detection to biocontrol logistics — an end-to-end IPM operating system.",
    "features.detection.title": "Early Pest Detection",
    "features.detection.desc":
      "Computer-vision cameras identify whitefly, thrips and mites 7–14 days before the human eye can spot damage.",
    "features.ipm.title": "IPM Recommendations",
    "features.ipm.desc":
      "AI-generated biological and cultural treatment plans — no chemical-first defaults, ever.",
    "features.marketplace.title": "Biocontrol Marketplace",
    "features.marketplace.desc":
      "Order beneficial insects and organic inputs with next-day fulfillment across MENA.",
    "features.blockchain.title": "Blockchain Tracking",
    "features.blockchain.desc":
      "Every treatment, harvest and export event notarized on-chain for retailer trust.",
    "features.analytics.title": "Analytics & Reports",
    "features.analytics.desc":
      "Yield, environmental and sustainability dashboards ready for EU / GAP audits.",
    "features.global.title": "Global Coverage",
    "features.global.desc":
      "Deployed worldwide with specialized support and Arabic UX for growers across the MENA region.",

    // Pricing
    "pricing.title": "10× more affordable than legacy systems",
    "pricing.competitors.name": "Legacy Ag-Tech",
    "pricing.competitors.price": "$15,000",
    "pricing.competitors.suffix": "per hectare / year",
    "pricing.us.name": "Qanara Tech",
    "pricing.us.price": "$2,500",
    "pricing.us.suffix": "per hectare / year",
    "pricing.competitors.f1": "Hardware-heavy install",
    "pricing.competitors.f2": "Chemical-first advisory",
    "pricing.competitors.f3": "6-month deployment",
    "pricing.competitors.f4": "No Arabic support",
    "pricing.us.f1": "Camera-only, plug & play",
    "pricing.us.f2": "Biocontrol-first IPM engine",
    "pricing.us.f3": "48-hour deployment",
    "pricing.us.f4": "Full Arabic + RTL platform",
    "pricing.us.f5": "Blockchain sustainability ledger",

    // CTA
    "cta.title": "Ready to future-proof your greenhouse?",
    "cta.subtitle":
      "Join growers in Palestine, the UAE, Saudi Arabia, Egypt and beyond running Qanara Tech in production today.",
    "cta.button": "Start Free 30-Day Trial",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.tagline": "AI-powered IPM for greenhouse farming.",

    // Language
    "lang.switch": "العربية",

    // Auth
    "auth.signIn.title": "Welcome back",
    "auth.signIn.subtitle": "Sign in to your Qanara Tech dashboard.",
    "auth.signUp.title": "Create your account",
    "auth.signUp.subtitle": "Start your 30-day free trial. No credit card required.",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Full name",
    "auth.phone": "Phone number",
    "auth.country": "Country",
    "auth.submitIn": "Sign In",
    "auth.submitUp": "Create account",
    "auth.noAccount": "Don't have an account?",
    "auth.haveAccount": "Already have an account?",
    "auth.signUp": "Sign up",
    "auth.signIn": "Sign in",

    // Dashboard
    "dash.nav.dashboard": "Dashboard",
    "dash.nav.detections": "Detections",
    "dash.nav.recommendations": "IPM Recommendations",
    "dash.nav.marketplace": "Biocontrol",
    "dash.nav.sustainability": "Sustainability",
    "dash.nav.analytics": "Analytics",
    "dash.nav.settings": "Settings",
    "dash.nav.signOut": "Sign Out",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.features": "المزايا",
    "nav.pricing": "الأسعار",
    "nav.about": "من نحن",
    "nav.signIn": "تسجيل الدخول",
    "nav.getStarted": "ابدأ الآن",
    "nav.demo": "عرض حي",

    "hero.badge": "ذكاء اصطناعي لبيوت الزراعة المحمية",
    "hero.title.1": "اكتشف الآفات",
    "hero.title.highlight": "قبل ٧-١٤ يوماً",
    "hero.title.2": "بتقنية الرؤية الحاسوبية",
    "hero.subtitle":
      "توفر قنارة تك للمزارعين الكشف المبكر عن الآفات، وإدارة متكاملة للآفات، وتتبع استدامة موثق بتقنية البلوكشين — بجزء بسيط من تكلفة الأنظمة التقليدية.",
    "hero.cta.trial": "ابدأ التجربة المجانية",
    "hero.cta.demo": "شاهد العرض",

    "stats.chemical": "تقليل المبيدات",
    "stats.earlier": "أيام كشف مبكر",
    "stats.affordable": "أقل تكلفة",
    "stats.blockchain": "موثق بالبلوكشين",

    "features.title": "كل ما تحتاجه لإدارة بيت زراعي متكامل",
    "features.subtitle":
      "من الكشف المبكر إلى لوجستيات المكافحة الحيوية — نظام تشغيل شامل لإدارة الآفات.",
    "features.detection.title": "كشف مبكر للآفات",
    "features.detection.desc":
      "كاميرات ذكية تكتشف الذبابة البيضاء والتربس والعناكب قبل ٧-١٤ يوماً من ظهور الأعراض.",
    "features.ipm.title": "توصيات IPM",
    "features.ipm.desc":
      "خطط علاج بيولوجية وثقافية مولّدة بالذكاء الاصطناعي — بدون الاعتماد على الكيماويات.",
    "features.marketplace.title": "متجر المكافحة الحيوية",
    "features.marketplace.desc":
      "اطلب حشرات نافعة ومدخلات عضوية مع توصيل خلال ٤٨ ساعة عبر منطقة الشرق الأوسط.",
    "features.blockchain.title": "تتبع بلوكشين",
    "features.blockchain.desc":
      "كل معاملة علاج وحصاد وتصدير موثقة على البلوكشين لثقة تجار التجزئة.",
    "features.analytics.title": "تحليلات وتقارير",
    "features.analytics.desc":
      "لوحات معلومات جاهزة لتدقيقات GAP والاتحاد الأوروبي.",
    "features.global.title": "تغطية عالمية",
    "features.global.desc":
      "منتشرة عالمياً مع دعم متخصص وواجهة عربية RTL كاملة للمزارعين في الشرق الأوسط.",

    "pricing.title": "أقل تكلفة بعشرة أضعاف من الأنظمة التقليدية",
    "pricing.competitors.name": "الأنظمة التقليدية",
    "pricing.competitors.price": "١٥٬٠٠٠ $",
    "pricing.competitors.suffix": "لكل هكتار / سنة",
    "pricing.us.name": "قنارة تك",
    "pricing.us.price": "٢٬٥٠٠ $",
    "pricing.us.suffix": "لكل هكتار / سنة",
    "pricing.competitors.f1": "تركيبات معدات ثقيلة",
    "pricing.competitors.f2": "توصيات كيميائية أولاً",
    "pricing.competitors.f3": "تركيب خلال ٦ أشهر",
    "pricing.competitors.f4": "لا يدعم العربية",
    "pricing.us.f1": "كاميرات فقط، تركيب فوري",
    "pricing.us.f2": "محرك مكافحة حيوية أولاً",
    "pricing.us.f3": "جاهز خلال ٤٨ ساعة",
    "pricing.us.f4": "منصة عربية وRTL كاملة",
    "pricing.us.f5": "سجل استدامة بلوكشين",

    "cta.title": "جاهز لتطوير بيتك الزراعي؟",
    "cta.subtitle":
      "انضم إلى المزارعين في فلسطين والإمارات والسعودية ومصر الذين يشغلون قنارة تك اليوم.",
    "cta.button": "ابدأ التجربة المجانية ٣٠ يوم",

    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.tagline": "ذكاء اصطناعي لإدارة الآفات في البيوت الزراعية.",

    "lang.switch": "English",

    "auth.signIn.title": "أهلاً بعودتك",
    "auth.signIn.subtitle": "سجّل الدخول إلى لوحة قنارة تك.",
    "auth.signUp.title": "أنشئ حسابك",
    "auth.signUp.subtitle": "ابدأ تجربة مجانية لمدة ٣٠ يوم بدون بطاقة ائتمان.",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.name": "الاسم الكامل",
    "auth.phone": "رقم الهاتف",
    "auth.country": "الدولة",
    "auth.submitIn": "تسجيل الدخول",
    "auth.submitUp": "إنشاء حساب",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.haveAccount": "لديك حساب بالفعل؟",
    "auth.signUp": "سجّل",
    "auth.signIn": "ادخل",

    "dash.nav.dashboard": "لوحة التحكم",
    "dash.nav.detections": "الاكتشافات",
    "dash.nav.recommendations": "توصيات IPM",
    "dash.nav.marketplace": "المكافحة الحيوية",
    "dash.nav.sustainability": "الاستدامة",
    "dash.nav.analytics": "التحليلات",
    "dash.nav.settings": "الإعدادات",
    "dash.nav.signOut": "تسجيل خروج",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
