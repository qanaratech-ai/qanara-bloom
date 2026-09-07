<?php
/**
 * Bilingual copy for the Qanara Tech theme.
 * Language is chosen with ?lang=ar / ?lang=en and remembered in a cookie.
 */

function qanara_lang() {
    static $lang = null;
    if ( $lang !== null ) {
        return $lang;
    }
    $lang = 'en';
    if ( isset( $_GET['lang'] ) && in_array( $_GET['lang'], array( 'en', 'ar' ), true ) ) {
        $lang = sanitize_key( $_GET['lang'] );
        setcookie( 'qanara_lang', $lang, time() + YEAR_IN_SECONDS, '/' );
    } elseif ( isset( $_COOKIE['qanara_lang'] ) && in_array( $_COOKIE['qanara_lang'], array( 'en', 'ar' ), true ) ) {
        $lang = sanitize_key( $_COOKIE['qanara_lang'] );
    }
    return $lang;
}

function qanara_is_rtl() {
    return qanara_lang() === 'ar';
}

function qanara_strings() {
    $en = array(
        'nav.home'        => 'Home',
        'nav.about'       => 'About',
        'nav.features'    => 'Features',
        'nav.pricing'     => 'Pricing',
        'nav.contact'     => 'Contact',
        'nav.app'         => 'Open the platform',
        'lang.switch'     => 'العربية',

        'hero.badge'      => 'AI-Powered Greenhouse Intelligence',
        'hero.title.1'    => 'Detect pests',
        'hero.title.hl'   => '7-14 days earlier',
        'hero.title.2'    => 'with computer vision',
        'hero.subtitle'   => 'Qanara Tech gives greenhouse growers early pest detection, integrated pest management, and blockchain-verified sustainability — for a fraction of the cost of legacy systems.',
        'hero.cta.1'      => 'Talk to us',
        'hero.cta.2'      => 'See what we do',

        'stats.chemical'  => 'Chemical Reduction',
        'stats.earlier'   => 'Days Earlier Detection',
        'stats.afford'    => 'More Affordable',
        'stats.chain'     => 'Blockchain Verified',

        'about.eyebrow'   => 'About us',
        'about.title'     => 'We help growers protect their crops before damage is visible',
        'about.p1'        => 'Qanara Tech is an agricultural technology company building an AI-powered pest detection and integrated pest management platform for greenhouse farming. Our cameras and models watch the crop continuously and flag whitefly, thrips and mites long before the human eye can see the damage.',
        'about.p2'        => 'We were founded to make world-class greenhouse intelligence affordable for growers across Palestine and the wider MENA region — with a fully Arabic, right-to-left experience and biological control as the first line of defence, never chemicals by default.',
        'about.v1.t'      => 'Biocontrol first',
        'about.v1.d'      => 'Every treatment plan starts with biological and cultural options before any chemical is considered.',
        'about.v2.t'      => 'Built for the region',
        'about.v2.d'      => 'Arabic and English throughout, tuned to local crops, climates and export requirements.',
        'about.v3.t'      => 'Proof, not promises',
        'about.v3.d'      => 'Treatments, harvests and export events are recorded so retailers and auditors can verify them.',

        'features.title'      => 'Everything you need to run a resilient greenhouse',
        'features.subtitle'   => 'From early pest detection to biocontrol logistics — an end-to-end IPM operating system.',
        'features.1.t'        => 'Early Pest Detection',
        'features.1.d'        => 'Computer-vision cameras identify whitefly, thrips and mites 7–14 days before the human eye can spot damage.',
        'features.2.t'        => 'IPM Recommendations',
        'features.2.d'        => 'AI-generated biological and cultural treatment plans — no chemical-first defaults, ever.',
        'features.3.t'        => 'Biocontrol Marketplace',
        'features.3.d'        => 'Order beneficial insects and organic inputs with next-day fulfillment across MENA.',
        'features.4.t'        => 'Blockchain Tracking',
        'features.4.d'        => 'Every treatment, harvest and export event notarized on-chain for retailer trust.',
        'features.5.t'        => 'Analytics & Reports',
        'features.5.d'        => 'Yield, environmental and sustainability dashboards ready for EU / GAP audits.',
        'features.6.t'        => 'Global Coverage',
        'features.6.d'        => 'Deployed worldwide with specialized support and Arabic UX for growers across the MENA region.',

        'pricing.title'   => '10× more affordable than legacy systems',
        'pricing.c.name'  => 'Legacy Ag-Tech',
        'pricing.c.price' => '$15,000',
        'pricing.suffix'  => 'per hectare / year',
        'pricing.c.f1'    => 'Hardware-heavy install',
        'pricing.c.f2'    => 'Chemical-first advisory',
        'pricing.c.f3'    => '6-month deployment',
        'pricing.c.f4'    => 'No Arabic support',
        'pricing.u.name'  => 'Qanara Tech',
        'pricing.u.price' => '$2,500',
        'pricing.u.f1'    => 'Camera-only, plug & play',
        'pricing.u.f2'    => 'Biocontrol-first IPM engine',
        'pricing.u.f3'    => '48-hour deployment',
        'pricing.u.f4'    => 'Full Arabic + RTL platform',
        'pricing.u.f5'    => 'Blockchain sustainability ledger',
        'pricing.badge'   => 'Recommended',

        'cta.title'       => 'Ready to future-proof your greenhouse?',
        'cta.subtitle'    => 'Join growers in Palestine, the UAE, Saudi Arabia, Egypt and beyond running Qanara Tech in production today.',
        'cta.button'      => 'Get in touch',

        'footer.tagline'  => 'AI-powered IPM for greenhouse farming.',
        'footer.rights'   => 'All rights reserved.',
    );

    $ar = array(
        'nav.home'        => 'الرئيسية',
        'nav.about'       => 'من نحن',
        'nav.features'    => 'المزايا',
        'nav.pricing'     => 'الأسعار',
        'nav.contact'     => 'اتصل بنا',
        'nav.app'         => 'الدخول إلى المنصة',
        'lang.switch'     => 'English',

        'hero.badge'      => 'ذكاء اصطناعي لبيوت الزراعة المحمية',
        'hero.title.1'    => 'اكتشف الآفات',
        'hero.title.hl'   => 'قبل ٧-١٤ يوماً',
        'hero.title.2'    => 'بتقنية الرؤية الحاسوبية',
        'hero.subtitle'   => 'توفر قنارة تك للمزارعين الكشف المبكر عن الآفات، وإدارة متكاملة للآفات، وتتبع استدامة موثق بتقنية البلوكشين — بجزء بسيط من تكلفة الأنظمة التقليدية.',
        'hero.cta.1'      => 'تواصل معنا',
        'hero.cta.2'      => 'تعرّف على خدماتنا',

        'stats.chemical'  => 'تقليل المبيدات',
        'stats.earlier'   => 'أيام كشف مبكر',
        'stats.afford'    => 'أقل تكلفة',
        'stats.chain'     => 'موثق بالبلوكشين',

        'about.eyebrow'   => 'من نحن',
        'about.title'     => 'نساعد المزارعين على حماية محاصيلهم قبل ظهور الأضرار',
        'about.p1'        => 'قنارة تك شركة تقنية زراعية تبني منصة مدعومة بالذكاء الاصطناعي للكشف عن الآفات وإدارتها المتكاملة في البيوت المحمية. كاميراتنا ونماذجنا تراقب المحصول باستمرار وترصد الذبابة البيضاء والتربس والعناكب قبل أن تُرى الأضرار بالعين المجردة.',
        'about.p2'        => 'تأسسنا لجعل تقنيات المراقبة الزراعية المتقدمة في متناول المزارعين في فلسطين ومنطقة الشرق الأوسط وشمال أفريقيا — بواجهة عربية كاملة من اليمين إلى اليسار، وبالمكافحة الحيوية كخيار أول قبل أي مبيد كيميائي.',
        'about.v1.t'      => 'المكافحة الحيوية أولاً',
        'about.v1.d'      => 'كل خطة علاج تبدأ بالحلول الحيوية والزراعية قبل التفكير في أي مبيد كيميائي.',
        'about.v2.t'      => 'مصمّمة للمنطقة',
        'about.v2.d'      => 'عربي وإنجليزي بالكامل، مهيّأة للمحاصيل والمناخ ومتطلبات التصدير المحلية.',
        'about.v3.t'      => 'إثبات لا وعود',
        'about.v3.d'      => 'تُسجَّل العلاجات وعمليات الحصاد والتصدير ليتحقق منها التجار والمدققون.',

        'features.title'      => 'كل ما تحتاجه لإدارة بيت زراعي متكامل',
        'features.subtitle'   => 'من الكشف المبكر إلى لوجستيات المكافحة الحيوية — نظام تشغيل شامل لإدارة الآفات.',
        'features.1.t'        => 'كشف مبكر للآفات',
        'features.1.d'        => 'كاميرات ذكية تكتشف الذبابة البيضاء والتربس والعناكب قبل ٧-١٤ يوماً من ظهور الأعراض.',
        'features.2.t'        => 'توصيات إدارة متكاملة',
        'features.2.d'        => 'خطط علاج حيوية وزراعية يولّدها الذكاء الاصطناعي — دون اللجوء للمبيدات كخيار أول.',
        'features.3.t'        => 'سوق المكافحة الحيوية',
        'features.3.d'        => 'اطلب الحشرات النافعة والمدخلات العضوية بتسليم سريع في المنطقة.',
        'features.4.t'        => 'تتبّع بالبلوكشين',
        'features.4.d'        => 'كل عملية علاج وحصاد وتصدير موثقة على السلسلة لبناء ثقة المشترين.',
        'features.5.t'        => 'تحليلات وتقارير',
        'features.5.d'        => 'لوحات للإنتاجية والبيئة والاستدامة جاهزة لتدقيق الاتحاد الأوروبي و GAP.',
        'features.6.t'        => 'تغطية عالمية',
        'features.6.d'        => 'منتشرة عالمياً مع دعم متخصص وتجربة عربية للمزارعين في المنطقة.',

        'pricing.title'   => 'أقل تكلفة ١٠ مرات من الأنظمة التقليدية',
        'pricing.c.name'  => 'الأنظمة التقليدية',
        'pricing.c.price' => '١٥٠٠٠$',
        'pricing.suffix'  => 'للهكتار / سنوياً',
        'pricing.c.f1'    => 'تركيب معدات ثقيل',
        'pricing.c.f2'    => 'إرشاد كيميائي أولاً',
        'pricing.c.f3'    => 'تشغيل خلال ٦ أشهر',
        'pricing.c.f4'    => 'لا يوجد دعم عربي',
        'pricing.u.name'  => 'قنارة تك',
        'pricing.u.price' => '٢٥٠٠$',
        'pricing.u.f1'    => 'كاميرا فقط، جاهزة للتشغيل',
        'pricing.u.f2'    => 'محرك إدارة يبدأ بالمكافحة الحيوية',
        'pricing.u.f3'    => 'تشغيل خلال ٤٨ ساعة',
        'pricing.u.f4'    => 'منصة عربية كاملة',
        'pricing.u.f5'    => 'سجل استدامة على البلوكشين',
        'pricing.badge'   => 'الأفضل',

        'cta.title'       => 'جاهز لحماية بيتك الزراعي للمستقبل؟',
        'cta.subtitle'    => 'انضم إلى المزارعين في فلسطين والإمارات والسعودية ومصر وغيرها الذين يستخدمون قنارة تك اليوم.',
        'cta.button'      => 'تواصل معنا',

        'footer.tagline'  => 'إدارة متكاملة للآفات مدعومة بالذكاء الاصطناعي.',
        'footer.rights'   => 'جميع الحقوق محفوظة.',
    );

    return qanara_lang() === 'ar' ? array_merge( $en, $ar ) : $en;
}

function qanara_t( $key ) {
    $strings = qanara_strings();
    return isset( $strings[ $key ] ) ? $strings[ $key ] : $key;
}

function qanara_e( $key ) {
    echo esc_html( qanara_t( $key ) );
}

/** URL that flips the language. */
function qanara_lang_toggle_url() {
    $target = qanara_lang() === 'ar' ? 'en' : 'ar';
    return esc_url( add_query_arg( 'lang', $target, home_url( add_query_arg( array() ) ) ) );
}
