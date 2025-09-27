document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const themeToggle = document.getElementById('theme-toggle');
    const sections = document.querySelectorAll('main section');
    const usernameInput = document.getElementById('username');
    const startJourneyBtn = document.getElementById('start-journey-btn');
    const clubsGrid = document.querySelector('.clubs-grid');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const questionCounter = document.getElementById('question-counter');
    const quizClubLogo = document.getElementById('quiz-club-logo');
    const questionTitle = document.getElementById('question-title');
    const optionsContainer = document.getElementById('options-container');
    const preloader = document.getElementById('preloader');
    const typewriterElement = document.getElementById('typewriter');

    // Certificate Elements
    const certUsername = document.getElementById('cert-username');
    const certClubName = document.getElementById('cert-club-name');
    const certScore = document.getElementById('cert-score');
    const certDate = document.getElementById('cert-date');
    const certClubLogoContainer = document.getElementById('cert-club-logo-container');
    const downloadCertBtn = document.getElementById('download-cert-btn');
    const restartBtn = document.getElementById('restart-btn');

    // Social Share Buttons
    const shareWhatsappBtn = document.getElementById('share-whatsapp');
    const shareTwitterBtn = document.getElementById('share-twitter');
    const shareFacebookBtn = document.getElementById('share-facebook');
    const shareLinkedinBtn = document.getElementById('share-linkedin');

    // --- STATE MANAGEMENT ---
    let currentClub = null;
    let currentQuestionIndex = 0;
    let score = 0;
    let username = '';

    // --- DATA ---
    const clubs = {
        'real_madrid': { 
            name: 'ريال مدريد', 
            logo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/5/56/Real_Madrid_CF.svg/800px-Real_Madrid_CF.svg.png' 
        },
        'barcelona': { 
            name: 'برشلونة', 
            logo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/4/47/FC_Barcelona_%28crest%29.svg/800px-FC_Barcelona_%28crest%29.svg.png' 
        },
        'bayern_munich': { 
            name: 'بايرن ميونخ', 
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg/800px-Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg.png' 
        },
        'liverpool': { 
            name: 'ليفربول', 
            logo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/0/0c/Liverpool_FC.svg/800px-Liverpool_FC.svg.png' 
        },
        'psg': { 
            name: 'باريس سان جيرمان', 
            logo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/a/a7/Paris_Saint-Germain_F.C..svg/800px-Paris_Saint-Germain_F.C..svg.png' 
        },
        'man_city': { 
            name: 'مانشستر سيتي', 
            logo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/e/eb/Manchester_City_FC_badge.svg/800px-Manchester_City_FC_badge.svg.png' 
        },
       
        'ac_milan': { 
            name: 'إيه سي ميلان', 
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/800px-Logo_of_AC_Milan.svg.png' 
        },
        'chelsea': { 
            name: 'تشيلسي', 
            logo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/c/cc/Chelsea_FC.svg/800px-Chelsea_FC.svg.png' 
        },
            'arsenal': {
        name: 'آرسنال',
        logo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/5/53/Arsenal_FC.svg/800px-Arsenal_FC.svg.png'
    },
  'sevilla': { 
    name: 'إشبيلية', 
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/800px-Sevilla_FC_logo.svg.png' 
}
    };

   const questions = {
    // _________________________
    // ريال مدريد (REAL MADRID)
    // _________________________
    'real_madrid': [
        { question: "من هو اللاعب الذي سجل أسرع هاتريك في تاريخ ريال مدريد بالليغا؟", options: ["كريستيانو رونالدو", "دي ستيفانو", "بوشكاش", "راؤول"], answer: "كريستيانو رونالدو" },
        { question: "في أي عام فاز ريال مدريد بأول لقب له في كأس أوروبا؟", options: ["1956", "1960", "1955", "1966"], answer: "1956" },
        { question: "من هو المدرب الذي قاد ريال مدريد للفوز بثلاثة ألقاب متتالية في دوري الأبطال؟", options: ["زين الدين زيدان", "أنشيلوتي", "ديل بوسكي", "مورينيو"], answer: "زين الدين زيدان" },
        { question: "من هو اللاعب صاحب الرقم القياسي في عدد المشاركات الرسمية مع ريال مدريد؟", options: ["راؤول غونزاليس", "كاسياس", "راموس", "سانشيز"], answer: "راؤول غونزاليس" },
        { question: "من سجل هدف التعادل القاتل في نهائي دوري الأبطال 2014 في الدقيقة 92:48؟", options: ["سيرجيو راموس", "غاريث بيل", "كريستيانو رونالدو", "كريم بنزيما"], answer: "سيرجيو راموس" },
        { question: "كم مرة فاز ريال مدريد بكأس ملك إسبانيا حتى عام 2024؟", options: ["20", "25", "19", "30"], answer: "20" },
        { question: "في أي موسم حقق ريال مدريد 'دوري الأرقام القياسية' برصيد 100 نقطة؟", options: ["2011-2012", "2016-2017", "2009-2010", "2002-2003"], answer: "2011-2012" },
        { question: "ما هو اسم الملعب القديم لريال مدريد قبل الانتقال إلى سانتياغو برنابيو؟", options: ["تشامارتن", "متروبوليتانو", "كامبو دي أودونيل", "نويفو تشامارتن"], answer: "تشامارتن" },
        { question: "من هو أول لاعب إنجليزي في تاريخ ريال مدريد؟", options: ["لوري كننغهام", "ديفيد بيكهام", "ستيف ماكمانامان", "مايكل أوين"], answer: "لوري كننغهام" },
        { question: "كم عدد ألقاب الدوري الإسباني التي فاز بها النادي حتى 2024؟", options: ["36", "34", "35", "33"], answer: "36" },
        { question: "من هو الحارس الذي حافظ على نظافة شباكه لأطول فترة دقائق متتالية؟", options: ["إيكر كاسياس", "كيلور نافاس", "تيبو كورتوا", "فرانسيسكو بويو"], answer: "إيكر كاسياس" },
        { question: "ما هو اللقب الذي أُطلق على فريق ريال مدريد في فترة الخمسينيات؟", options: ["فريق الفايكنج", "الخماسي المهيب", "النسور البيضاء", "فريق الأحلام"], answer: "الخماسي المهيب" },
        { question: "من هو اللاعب الذي سجل الهدف رقم 1000 لريال مدريد في دوري الأبطال؟", options: ["غوتي", "ديفيد بيكهام", "لويس فيغو", "زين الدين زيدان"], answer: "غوتي" },
        { question: "من اللاعب الذي انتقل مباشرة من برشلونة إلى ريال مدريد عام 2000؟", options: ["لويس فيغو", "رونالدو نازاريو", "مايكل لاودروب", "صامويل إيتو"], answer: "لويس فيغو" },
        { question: "من هو الهداف التاريخي لريال مدريد في جميع المسابقات؟", options: ["كريستيانو رونالدو", "كريم بنزيما", "راؤول", "دي ستيفانو"], answer: "كريستيانو رونالدو" }
    ],
    // _________________________
    // برشلونة (BARCELONA)
    // _________________________
    'barcelona': [
        { question: "من هو مؤسس نادي برشلونة السويسري؟", options: ["خوان غامبر", "باولو سوزا", "كارلوس بويول", "يوهان كرويف"], answer: "خوان غامبر" },
        { question: "ما هو اسم أول ملعب رسمي لنادي برشلونة؟", options: ["كامب دي لا إندوستريا", "ليس كورتس", "كامب نو", "مونتجويك"], answer: "كامب دي لا إندوستريا" },
        { question: "من هو المدرب الذي قاد برشلونة لتحقيق السداسية التاريخية عام 2009؟", options: ["بيب غوارديولا", "لويس إنريكي", "فرانك ريكارد", "يوهان كرويف"], answer: "بيب غوارديولا" },
        { question: "كم عدد الكرات الذهبية التي فاز بها ليونيل ميسي مع برشلونة؟", options: ["7", "6", "5", "8"], answer: "7" },
        { question: "ما هو الشعار المكتوب على مقاعد ملعب كامب نو؟", options: ["Més que un club", "Força Barça", "Visca el Barça", "Blaugrana"], answer: "Més que un club" },
        { question: "من هو الهداف التاريخي لبرشلونة بعد ليونيل ميسي؟", options: ["سيزار ألفاريز", "لويس سواريز", "لاديسلاو كوبالا", "ريفالدو"], answer: "سيزار ألفاريز" },
        { question: "في أي عام تم افتتاح ملعب 'كامب نو'؟", options: ["1957", "1950", "1961", "1948"], answer: "1957" },
        { question: "من هو اللاعب الهولندي الذي يعتبر 'الأب الروحي' لأسلوب لعب برشلونة؟", options: ["يوهان كرويف", "رونالد كومان", "فرانك ريكارد", "ماركو فان باستن"], answer: "يوهان كرويف" },
        { question: "ما هي النتيجة الشهيرة التي فاز بها برشلونة على ريال مدريد في سانتياغو برنابيو عام 2009؟", options: ["6-2", "5-0", "4-0", "3-0"], answer: "6-2" },
        { question: "من هو أول لاعب من برشلونة يفوز بجائزة الكرة الذهبية؟", options: ["لويس سواريز ميرامونتيس", "يوهان كرويف", "خريستو ستويشكوف", "ريفالدو"], answer: "لويس سواريز ميرامونتيس" },
        { question: "كم مرة فاز برشلونة بلقب دوري أبطال أوروبا؟", options: ["5", "6", "4", "7"], answer: "5" },
        { question: "ما هو اسم أكاديمية الشباب الشهيرة في برشلونة؟", options: ["لا ماسيا", "لا فابريكا", "ذا أكاديمي", "سنترو بورتيفو"], answer: "لا ماسيا" },
        { question: "من سجل هدف الفوز لبرشلونة في نهائي دوري أبطال أوروبا 1992 في ويمبلي؟", options: ["رونالد كومان", "خريستو ستويشكوف", "مايكل لاودروب", "روماريو"], answer: "رونالد كومان" },
        { question: "من هو الحارس الذي يمتلك الرقم القياسي لأكبر عدد من 'جوائز زامورا' مع برشلونة؟", options: ["فيكتور فالديز", "أندوني زوبيزاريتا", "تير شتيغن", "سلفادور سادورني"], answer: "فيكتور فالديز" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي لأكبر عدد من المباريات الرسمية مع برشلونة؟", options: ["ليونيل ميسي", "تشافي هيرنانديز", "أندريس إنييستا", "سيرجيو بوسكيتس"], answer: "ليونيل ميسي" }
    ],
    // _________________________
    // بايرن ميونخ (BAYERN MUNICH)
    // _________________________
    'bayern_munich': [
        { question: "من هو الهداف التاريخي لنادي بايرن ميونخ؟", options: ["جيرد مولر", "روبرت ليفاندوفسكي", "كارل هاينز رومينيجه", "توماس مولر"], answer: "جيرد مولر" },
        { question: "في أي مدينة ألمانية تأسس نادي بايرن ميونخ؟", options: ["ميونخ", "برلين", "هامبورغ", "دورتموند"], answer: "ميونخ" },
        { question: "كم مرة فاز بايرن ميونخ بالثلاثية؟", options: ["مرتين", "مرة واحدة", "ثلاث مرات", "لم يفز بها"], answer: "مرتين" },
        { question: "من هو المدرب الذي قاد بايرن ميونخ للفوز بأول ثلاثية في تاريخه عام 2013؟", options: ["يوب هاينكس", "بيب غوارديولا", "هانزي فليك", "أوتمار هيتسفيلد"], answer: "يوب هاينكس" },
        { question: "من هو 'القيصر' الذي يعتبر أسطورة بايرن ميونخ وألمانيا؟", options: ["فرانتس بكنباور", "لوثار ماتيوس", "أوليفر كان", "جيرد مولر"], answer: "فرانتس بكنباور" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي في عدد المشاركات الرسمية مع بايرن ميونخ؟", options: ["سيب ماير", "توماس مولر", "أوليفر كان", "جيرد مولر"], answer: "سيب ماير" },
        { question: "في أي عام تم افتتاح ملعب 'أليانز أرينا'؟", options: ["2005", "2002", "2006", "2000"], answer: "2005" },
        { question: "من هو الحارس الأسطوري الملقب بـ 'العملاق'؟", options: ["أوليفر كان", "سيب ماير", "مانويل نوير", "جان ماري فاف"], answer: "أوليفر كان" },
        { question: "من هو اللاعب الذي سجل أسرع خماسية في تاريخ البوندسليغا؟", options: ["روبرت ليفاندوفسكي", "جيرد مولر", "كلاوديو بيزارو", "ماريو غوميز"], answer: "روبرت ليفاندوفسكي" },
        { question: "من هو الرئيس الفخري لنادي بايرن ميونخ؟", options: ["أولي هونيس", "فرانتس بكنباور", "كارل هاينز رومينيجه", "غيرد مولر"], answer: "أولي هونيس" },
        { question: "ما هو الرقم القياسي لعدد ألقاب الدوري الألماني المتتالية التي فاز بها بايرن؟", options: ["11", "9", "10", "8"], answer: "11" },
        { question: "في نهائي دوري أبطال أوروبا 2012، خسر بايرن على أرضه أمام أي فريق؟", options: ["تشيلسي", "إنتر ميلان", "ريال مدريد", "مانشستر يونايتد"], answer: "تشيلسي" },
        { question: "ما هو اللقب الشهير لنادي بايرن ميونخ؟", options: ["البافاري", "العمالقة", "الحمر", "الديناصور"], answer: "البافاري" },
        { question: "من سجل هدف الفوز في نهائي دوري أبطال أوروبا 2020 ضد باريس سان جيرمان؟", options: ["كينغسلي كومان", "روبرت ليفاندوفسكي", "سيرج غنابري", "توماس مولر"], answer: "كينغسلي كومان" },
        { question: "من هو أول مدرب فاز بدوري أبطال أوروبا مع بايرن ميونخ؟", options: ["ديتمار كرامر", "أودو لاتيك", "أوتمار هيتسفيلد", "يوب هاينكس"], answer: "ديتمار كرامر" }
    ],
    // _________________________
    // ليفربول (LIVERPOOL)
    // _________________________
    'liverpool': [
        { question: "ما هي الأغنية التي تعتبر نشيد نادي ليفربول الرسمي؟", options: ["You'll Never Walk Alone", "Fields of Anfield Road", "Anfield Rap", "Scouser Tommy"], answer: "You'll Never Walk Alone" },
        { question: "من هو المدرب الذي قاد ليفربول للفوز بأول لقب له في عصر الدوري الإنجليزي الممتاز؟", options: ["يورغن كلوب", "رافاييل بينيتيز", "جيرارد هولييه", "بريندان رودجرز"], answer: "يورغن كلوب" },
        { question: "كم عدد ألقاب دوري أبطال أوروبا التي فاز بها ليفربول؟", options: ["6", "5", "7", "4"], answer: "6" },
        { question: "في 'معجزة إسطنبول' عام 2005، ضد أي فريق عاد ليفربول من تأخره 3-0؟", options: ["إيه سي ميلان", "يوفنتوس", "برشلونة", "ريال مدريد"], answer: "إيه سي ميلان" },
        { question: "من هو الهداف التاريخي لنادي ليفربول في جميع المسابقات؟", options: ["إيان راش", "روجر هانت", "محمد صلاح", "ستيفن جيرارد"], answer: "إيان راش" },
        { question: "ما هو الاسم الذي يطلق على بوابة ملعب أنفيلد الشهيرة؟", options: ["بوابة شانكلي", "بوابة بيزلي", "بوابة الكوب", "بوابة أنفيلد"], answer: "بوابة شانكلي" },
        { question: "من هو اللاعب الملقب بـ 'الملك كيني'؟", options: ["كيني دالغليش", "إيان راش", "ستيفن جيرارد", "جون بارنز"], answer: "كيني دالغليش" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي لأكبر عدد من المباريات مع ليفربول؟", options: ["إيان كالهان", "جيمي كاراغر", "ستيفن جيرارد", "راي كليمينس"], answer: "إيان كالهان" },
        { question: "ما هي الكارثة التي وقعت عام 1989 وأثرت بشكل كبير على النادي؟", options: ["كارثة هيلزبره", "كارثة هيسل", "كارثة برادفورد", "كارثة ميونخ الجوية"], answer: "كارثة هيلزبره" },
        { question: "من سجل أسرع هاتريك في تاريخ دوري أبطال أوروبا؟", options: ["محمد صلاح", "ساديو ماني", "روبي فاولر", "مايكل أوين"], answer: "محمد صلاح" },
        { question: "من هو المدرب الأكثر تتويجاً في تاريخ ليفربول؟", options: ["بوب بيزلي", "بيل شانكلي", "يورغن كلوب", "كيني دالغليش"], answer: "بوب بيزلي" },
        { question: "ماذا يوجد فوق شعار ليفربول ويمثل شعلتين أبديتين؟", options: ["تخليد لضحايا هيلزبره", "تخليد لضحايا هيسل", "رمز لبطولتي أوروبا", "رمز لمؤسسي النادي"], answer: "تخليد لضحايا هيلزبره" },
        { question: "من هو أول لاعب غير بريطاني يصبح كابتن لنادي ليفربول؟", options: ["سامي هيبيا", "يان مولبي", "جون آرنه ريسه", "فرناندو توريس"], answer: "سامي هيبيا" },
        { question: "في أي موسم أنهاى ليفربول الدوري الإنجليزي الممتاز بدون أي هزيمة على أرضه؟", options: ["2019-2020", "2018-2019", "2008-2009", "كل ما سبق"], answer: "2019-2020" },
        { question: "من هو اللاعب الذي سجل هدف الفوز من ركلة حرة في نصف نهائي دوري الأبطال 2005 ضد تشيلسي؟", options: ["لويس غارسيا", "ستيفن جيرارد", "تشابي ألونسو", "ديدييه دروغبا"], answer: "لويس غارسيا" }
    ],
    // _________________________
    // باريس سان جيرمان (PSG)
    // _________________________
    'psg': [
        { question: "في أي عام تأسس نادي باريس سان جيرمان؟", options: ["1970", "1960", "1980", "1950"], answer: "1970" },
        { question: "من هو الهداف التاريخي لنادي باريس سان جيرمان؟", options: ["كيليان مبابي", "إدينسون كافاني", "زلاتان إبراهيموفيتش", "نيمار جونيور"], answer: "كيليان مبابي" },
        { question: "ما هو اسم ملعب باريس سان جيرمان الرسمي؟", options: ["بارك دي برانس", "ستاد دو فرانس", "فيلودروم", "جروباما ستايديوم"], answer: "بارك دي برانس" },
        { question: "من هو أول لاعب فاز بجائزة الكرة الذهبية أثناء لعبه مع باريس سان جيرمان؟", options: ["جورج ويا", "ليونيل ميسي", "رونالدينيو", "جان بيير بابان"], answer: "جورج ويا" },
        { question: "ما هي الشركة القطرية التي استحوذت على النادي في عام 2011؟", options: ["قطر للاستثمارات الرياضية", "الخطوط الجوية القطرية", "أوريدو", "بنك قطر الوطني"], answer: "قطر للاستثمارات الرياضية" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي لأغلى صفقة انتقال في تاريخ كرة القدم وانضم إلى باريس سان جيرمان؟", options: ["نيمار جونيور", "كيليان مبابي", "أنخيل دي ماريا", "زلاتان إبراهيموفيتش"], answer: "نيمار جونيور" },
        { question: "كم مرة وصل باريس سان جيرمان إلى نهائي دوري أبطال أوروبا؟", options: ["مرة واحدة", "مرتين", "ثلاث مرات", "لم يصل أبداً"], answer: "مرة واحدة" },
        { question: "من هو المدرب الذي قاد الفريق لأول مرة إلى نهائي دوري أبطال أوروبا عام 2020؟", options: ["توماس توخيل", "كارلو أنشيلوتي", "لوران بلان", "أوناي إيمري"], answer: "توماس توخيل" },
        { question: "من هو اللاعب البرازيلي الأسطوري الذي لعب للنادي في التسعينيات وكان يلقب بـ 'Il Divino'؟", options: ["راي", "رونالدينيو", "فالدو", "ليوناردو"], answer: "راي" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي في عدد المشاركات الرسمية مع باريس سان جيرمان؟", options: ["جان مارك بيلورجيه", "ماركينيوس", "تياغو سيلفا", "ماركو فيراتي"], answer: "جان مارك بيلورجيه" },
        { question: "ما هي الألوان الثلاثة الرئيسية في شعار باريس سان جيرمان؟", options: ["الأزرق، الأحمر، الأبيض", "الأزرق، الأبيض، الذهبي", "الأحمر، الأبيض، الأسود", "الأزرق، الأحمر، الأصفر"], answer: "الأزرق، الأحمر، الأبيض" },
        { question: "من هو أول رئيس للنادي بعد الاستحواذ القطري؟", options: ["ناصر الخليفي", "روبن ليبرو", "ميشيل دينيسو", "سيباستيان بازان"], answer: "ناصر الخليفي" },
        { question: "ما هو الاسم الذي يُطلق على المباراة التي تجمع بين باريس سان جيرمان وأولمبيك مارسيليا؟", options: ["لو كلاسيك", "ديربي فرنسا", "صراع العمالقة", "مباراة القمة"], answer: "لو كلاسيك" },
        { question: "من هو اللاعب الذي سجل أول هدف لباريس سان جيرمان في دوري أبطال أوروبا؟", options: ["جورج ويا", "ديفيد جينولا", "دانييل برافو", "فالدو"], answer: "دانييل برافو" },
        { question: "كم عدد ألقاب الدوري الفرنسي التي فاز بها النادي حتى عام 2024؟", options: ["12", "10", "11", "9"], answer: "12" }
    ],
    // _________________________
    // مانشستر سيتي (MAN CITY)
    // _________________________
    'man_city': [
        { question: "من هو المدرب الذي قاد مانشستر سيتي للفوز بأول لقب له في الدوري الإنجليزي الممتاز؟", options: ["روبرتو مانشيني", "بيب غوارديولا", "مانويل بيليجريني", "مارك هيوز"], answer: "روبرتو مانشيني" },
        { question: "من سجل الهدف الشهير في الدقيقة 93:20 ليحقق السيتي لقب الدوري عام 2012؟", options: ["سيرجيو أغويرو", "إدين دجيكو", "ماريو بالوتيلي", "يايا توريه"], answer: "سيرجيو أغويرو" },
        { question: "في أي عام فاز مانشستر سيتي بالثلاثية التاريخية؟", options: ["2023", "2019", "2012", "لم يفز بها"], answer: "2023" },
        { question: "من هو الهداف التاريخي لنادي مانشستر سيتي؟", options: ["سيرجيو أغويرو", "إريك بروك", "تومي جونسون", "رحيم ستيرلينغ"], answer: "سيرجيو أغويرو" },
        { question: "ما هو اسم الملعب الحالي لمانشستر سيتي؟", options: ["ملعب الاتحاد", "ملعب ويمبلي", "ماين رود", "أولد ترافورد"], answer: "ملعب الاتحاد" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي في عدد المشاركات مع النادي؟", options: ["آلان أوكس", "جو كوريجان", "مايك دويل", "دافيد سيلفا"], answer: "آلان أوكس" },
        { question: "تحت قيادة أي مدرب حقق السيتي 100 نقطة في موسم واحد بالدوري الإنجليزي؟", options: ["بيب غوارديولا", "روبرتو مانشيني", "مانويل بيليجريني", "يورغن كلوب"], answer: "بيب غوارديولا" },
        { question: "ما هو لقب نادي مانشستر سيتي؟", options: ["المواطنون", "الشياطين الحمر", "المدفعجية", "البلوز"], answer: "المواطنون" },
        { question: "من هو أغلى لاعب تعاقد معه مانشستر سيتي في تاريخه؟", options: ["جاك غريليش", "كيفين دي بروين", "روبن دياز", "إيرلينغ هالاند"], answer: "جاك غريليش" },
        { question: "كم مرة فاز مانشستر سيتي بلقب دوري أبطال أوروبا؟", options: ["مرة واحدة", "مرتين", "ثلاث مرات", "لم يفز به"], answer: "مرة واحدة" },
        { question: "في أي عام انتقل سيرجيو أغويرو إلى مانشستر سيتي؟", options: ["2011", "2010", "2012", "2009"], answer: "2011" },
        { question: "من هو المدرب الذي قاد مانشستر سيتي للفوز بلقب الدوري الإنجليزي الممتاز في موسم 2013-2014؟", options: ["مانويل بيليجريني", "روبرتو مانشيني", "بيب غوارديولا", "مارك هيوز"], answer: "مانويل بيليجريني" },
        { question: "ما هو الرقم القياسي لعدد الأهداف التي سجلها مانشستر سيتي في موسم واحد بالدوري الإنجليزي الممتاز؟", options: ["106", "100", "102", "98"], answer: "106" },
        { question: "من هو اللاعب الذي سجل هدف الفوز في نهائي كأس الاتحاد الإنجليزي 2011 ضد ستوك سيتي؟", options: ["يايا توريه", "ماريو بالوتيلي", "ديفيد سيلفا", "كارلوس تيفيز"], answer: "يايا توريه" },
        { question: "كم عدد الألقاب المحلية التي فاز بها مانشستر سيتي في عصر الاستحواذ القطري حتى 2024؟", options: ["20", "18", "22", "16"], answer: "20" }
    ],
    // _________________________
    // إي سي ميلان (AC MILAN)
    // _________________________
    'ac_milan': [
        { question: "ما هو لقب نادي إيه سي ميلان الشهير؟", options: ["الروسونيري", "النيراتزوري", "البيانكونيري", "الجيالوروسي"], answer: "الروسونيري" },
        { question: "كم مرة فاز إيه سي ميلان بلقب دوري أبطال أوروبا؟", options: ["7", "6", "5", "8"], answer: "7" },
        { question: "من هو الهداف التاريخي لنادي إيه سي ميلان؟", options: ["غونار نوردال", "أندريه شيفتشينكو", "جياني ريفيرا", "فيليبو إنزاغي"], answer: "غونار نوردال" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي في عدد المشاركات مع ميلان؟", options: ["باولو مالديني", "فرانكو باريزي", "جياني ريفيرا", "جينارو غاتوزو"], answer: "باولو مالديني" },
        { question: "ما هو اسم الملعب الذي يتقاسمه ميلان مع غريمه إنتر؟", options: ["سان سيرو", "أليانز ستاديوم", "أولمبيكو", "ديلي ألبي"], answer: "سان سيرو" },
        { question: "من هو المدرب الذي قاد ميلان للفوز بدوري الأبطال مرتين في الثمانينيات؟", options: ["أريغو ساكي", "فابيو كابيلو", "كارلو أنشيلوتي", "نيريو روكو"], answer: "أريغو ساكي" },
        { question: "ما هي جنسية الثلاثي الهجومي الأسطوري (فان باستن، خوليت، ريكارد)؟", options: ["هولندية", "ألمانية", "برازيلية", "أرجنتينية"], answer: "هولندية" },
        { question: "من هو آخر لاعب من ميلان فاز بجائزة الكرة الذهبية؟", options: ["كاكا", "أندريه شيفتشينكو", "جورج ويا", "ماركو فان باستن"], answer: "كاكا" },
        { question: "من هو المالك الشهير الذي ترأس النادي لأكثر من 30 عامًا؟", options: ["سيلفيو برلسكوني", "ماسيمو موراتي", "أندريا أنييلي", "أوريليو دي لورينتيس"], answer: "سيلفيو برلسكوني" },
        { question: "في أي موسم فاز ميلان بالدوري الإيطالي دون أي هزيمة؟", options: ["1991-1992", "2003-2004", "1993-1994", "لم يحدث"], answer: "1991-1992" },
        { question: "من هو اللاعب الذي سجل هدف الفوز في نهائي دوري أبطال أوروبا 2003 ضد يوفنتوس؟", options: ["أندريه شيفتشينكو", "فيليبو إنزاغي", "كلارنس سيدورف", "ريكاردو كاكا"], answer: "أندريه شيفتشينكو" },
        { question: "في أي عام فاز إيه سي ميلان بكأس العالم للأندية لأول مرة؟", options: ["2007", "2003", "1990", "1989"], answer: "2007" },
        { question: "من هو المدرب الذي قاد إيه سي ميلان للفوز بلقب الدوري الإيطالي في موسم 1998-1999؟", options: ["ألبيرتو زاكيروني", "أريغو ساكي", "فابيو كابيلو", "كارلو أنشيلوتي"], answer: "ألبيرتو زاكيروني" },
        { question: "ما هو عدد الألقاب الأوروبية التي فاز بها إيه سي ميلان؟", options: ["7", "6", "5", "8"], answer: "7" },
        { question: "من هو اللاعب الذي لعب لإيه سي ميلان وبرشلونة وانتقل إلى باريس سان جيرمان؟", options: ["زلاتان إبراهيموفيتش", "ديفيد بيكهام", "رونالدينيو", "أنطونيو كاسانو"], answer: "زلاتان إبراهيموفيتش" }
    ],
    // _________________________
    // أرسنال (ARSENAL)
    // _________________________
    'arsenal': [
        { question: "ما هو لقب نادي أرسنال؟", options: ["المدفعجية", "الشياطين الحمر", "البلوز", "السيتيزنز"], answer: "المدفعجية" },
        { question: "ما هو اسم ملعب نادي أرسنال الحالي؟", options: ["الإمارات", "هايبوري", "ويمبلي", "أولد ترافورد"], answer: "الإمارات" },
        { question: "من هو المدرب الأسطوري الذي قاد أرسنال لفترة طويلة بين 1996 و 2018؟", options: ["آرسين فينجر", "جورج جراهام", "هيربرت تشابمان", "مايكل أرتيتا"], answer: "آرسين فينجر" },
        { question: "كم عدد المباريات التي خاضها أرسنال في موسم 2003-2004 دون هزيمة (موسم اللا هزيمة)؟", options: ["38", "30", "49", "45"], answer: "38" },
        { question: "من هو الهداف التاريخي لنادي أرسنال؟", options: ["تييري هنري", "إيان رايت", "دينيس بيركامب", "روبين فان بيرسي"], answer: "تييري هنري" },
        { question: "من هو المدرب الذي قاد أرسنال للفوز بآخر لقب للدوري الإنجليزي الممتاز (حتى الآن)؟", options: ["آرسين فينجر", "جورج جراهام", "مايكل أرتيتا", "أوناي إيمري"], answer: "آرسين فينجر" },
        { question: "في أي مدينة يقع نادي أرسنال؟", options: ["لندن", "مانشستر", "ليفربول", "برمنغهام"], answer: "لندن" },
        { question: "من هو القائد الأسطوري الذي يحمل الرقم القياسي في عدد المشاركات كقائد للفريق؟", options: ["توني آدامز", "باتريك فييرا", "فرانك لامبارد", "مارتن كيون"], answer: "توني آدامز" },
        { question: "ما هو لون القميص الأساسي لنادي أرسنال؟", options: ["الأحمر والأبيض", "الأزرق", "الأحمر والأزرق", "الأخضر والأبيض"], answer: "الأحمر والأبيض" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي في عدد المشاركات مع النادي؟", options: ["ديفيد أوليري", "توني آدامز", "تييري هنري", "بول ميرسون"], answer: "ديفيد أوليري" },
        { question: "في أي عام تم تغيير اسم ملعب أرسنال من 'هايبوري' إلى 'الإمارات'؟", options: ["2006", "2004", "2008", "2002"], answer: "2006" },
        { question: "أي لاعب أرسنال فاز بجائزة الكرة الذهبية لعام 1991؟", options: ["لا يوجد", "مارك أوفرمارس", "دينيس بيركامب", "آيان رايت"], answer: "لا يوجد" },
        { question: "من هو اللاعب الذي سجل هدف الفوز في نهائي كأس الاتحاد الإنجليزي 2017 ضد تشيلسي؟", options: ["أليكسيس سانشيز", "آرون رامسي", "مسعود أوزيل", "أوليفييه جيرو"], answer: "آرون رامسي" },
        { question: "كم مرة فاز أرسنال بلقب الدوري الإنجليزي الممتاز (بالمسمى الجديد)؟", options: ["3 مرات", "5 مرات", "مرتين", "4 مرات"], answer: "3 مرات" },
        { question: "من هو أول لاعب غير بريطاني يصبح قائداً لأرسنال في تاريخ النادي؟", options: ["باتريك فييرا", "تييري هنري", "سيسك فابريغاس", "بير ميرتساكر"], answer: "باتريك فييرا" }
    ],
    // _________________________
    // إشبيلية (SEVILLA)
    // _________________________
    'sevilla': [
        { question: "ما هو لقب نادي إشبيلية؟", options: ["الأندلسيون", "الروخيبلانكوس", "الخفافيش", "القديسين"], answer: "الأندلسيون" },
        { question: "ما هو الرقم القياسي الذي يحمله نادي إشبيلية في الفوز بلقب الدوري الأوروبي/كأس الاتحاد الأوروبي؟", options: ["7", "6", "5", "4"], answer: "7" },
        { question: "في أي مدينة إسبانية يقع نادي إشبيلية؟", options: ["إشبيلية", "مدريد", "برشلونة", "فالنسيا"], answer: "إشبيلية" },
        { question: "ما هو اسم ملعب نادي إشبيلية؟", options: ["رامون سانشيز بيزخوان", "سانتياغو برنابيو", "كامب نو", "ميستايا"], answer: "رامون سانشيز بيزخوان" },
        { question: "من هو الفريق الذي يخوض إشبيلية ضده ديربي المدينة الساخن؟", options: ["ريال بيتيس", "أتلتيكو مدريد", "مالاجا", "فالنسيا"], answer: "ريال بيتيس" },
        { question: "من هو الهداف التاريخي لنادي إشبيلية؟", options: ["خوان آرزا", "فريديريك كانوتيه", "أنتونيو بويرتا", "لويس فابيانو"], answer: "خوان آرزا" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي في عدد المشاركات مع إشبيلية؟", options: ["خيسوس نافاس", "بابلو بلانكو", "أندريس بالوب", "إيفان راكيتيتش"], answer: "خيسوس نافاس" },
        { question: "في أي عام فاز إشبيلية بأول لقب له في الدوري الأوروبي؟", options: ["2006", "2007", "2014", "2020"], answer: "2006" },
        { question: "من هو المدرب الذي قاد إشبيلية للفوز بأول لقبين متتاليين في الدوري الأوروبي في 2006 و 2007؟", options: ["خواندي راموس", "أوناي إيمري", "جولين لوبيتيجي", "خورخي سامباولي"], answer: "خواندي راموس" },
        { question: "من هو المدير الرياضي الشهير الذي ارتبط نجاح إشبيلية الأوروبي باسمه؟", options: ["مونشي", "فلورنتينو بيريز", "جوزيب ماريا بارتوميو", "باولو مالديني"], answer: "مونشي" },
        { question: "ما هو لون القميص الأساسي لنادي إشبيلية؟", options: ["الأبيض", "الأحمر", "الأزرق", "الأخضر"], answer: "الأبيض" },
        { question: "في أي عقد من القرن العشرين فاز إشبيلية بلقبه الوحيد في الدوري الإسباني (حتى الآن)؟", options: ["الأربعينات", "الستينات", "الثمانينات", "التسعينات"], answer: "الأربعينات" },
        { question: "ما هي المدينة التي استضافت نهائي الدوري الأوروبي 2020 الذي فاز به إشبيلية؟", options: ["كولونيا", "بازل", "تورينو", "غدانسك"], answer: "كولونيا" },
        { question: "من هو اللاعب الذي سجل الهدف الحاسم في نهائي الدوري الأوروبي 2023 ضد روما في ركلات الترجيح؟", options: ["غونزالو مونتييل", "إيفان راكيتيتش", "لوكاس أوكامبوس", "يوسف النصيري"], answer: "غونزالو مونتييل" },
        { question: "في أي عام تم تأسيس نادي إشبيلية؟", options: ["1890", "1905", "1910", "1920"], answer: "1890" }
    ],
    // _________________________
    // تشيلسي (CHELSEA)
    // _________________________
    'chelsea': [
        { question: "ما هو لقب نادي تشيلسي؟", options: ["البلوز", "المدفعجية", "الحمر", "القديسين"], answer: "البلوز" },
        { question: "في أي عام فاز تشيلسي بأول لقب له في دوري أبطال أوروبا؟", options: ["2012", "2008", "2021", "2013"], answer: "2012" },
        { question: "من هو الهداف التاريخي لنادي تشيلسي؟", options: ["فرانك لامبارد", "ديدييه دروغبا", "بوبي تامبلينغ", "كيري ديكسون"], answer: "فرانك لامبارد" },
        { question: "من سجل ركلة الترجيح الحاسمة التي منحت تشيلسي لقب دوري الأبطال 2012؟", options: ["ديدييه دروغبا", "فرانك لامبارد", "جون تيري", "أشلي كول"], answer: "ديدييه دروغبا" },
        { question: "ما هو اسم ملعب نادي تشيلسي؟", options: ["ستامفورد بريدج", "ويمبلي", "الإمارات", "وايت هارت لين"], answer: "ستامفورد بريدج" },
        { question: "من هو المالك الذي اشترى النادي عام 2003 وأحدث ثورة في تاريخه؟", options: ["رومان أبراموفيتش", "تود بويلي", "ستان كرونكي", "عائلة غليزر"], answer: "رومان أبراموفيتش" },
        { question: "من هو المدرب الذي قاد تشيلسي للفوز بأول لقب له في عصر الدوري الإنجليزي الممتاز؟", options: ["جوزيه مورينيو", "كارلو أنشيلوتي", "أنطونيو كونتي", "كلاوديو رانييري"], answer: "جوزيه مورينيو" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي في عدد المشاركات مع النادي؟", options: ["رون هاريس", "جون تيري", "فرانك لامبارد", "بيتر بونيتي"], answer: "رون هاريس" },
        { question: "ما هو الرقم الذي كان يرتديه جون تيري، قائد تشيلسي الأسطوري؟", options: ["26", "8", "10", "5"], answer: "26" },
        { question: "من هو المدرب الذي فاز بدوري أبطال أوروبا مع تشيلسي في عام 2021؟", options: ["توماس توخيل", "فرانك لامبارد", "ماوريسيو ساري", "أنطونيو كونتي"], answer: "توماس توخيل" },
        { question: "من هو المدرب الذي قاد تشيلسي للفوز بلقب الدوري الإنجليزي الممتاز في موسم 2009-2010؟", options: ["كارلو أنشيلوتي", "جوزيه مورينيو", "أفرام غرانت", "لويس فيليبي سكولاري"], answer: "كارلو أنشيلوتي" },
        { question: "في أي عام انتقل ديدييه دروغبا إلى تشيلسي؟", options: ["2004", "2005", "2003", "2006"], answer: "2004" },
        { question: "من هو اللاعب الذي سجل هدف التعادل في نهائي دوري أبطال أوروبا 2012 ضد بايرن ميونخ؟", options: ["ديدييه دروغبا", "فرانك لامبارد", "خوان ماتا", "سالمون كالو"], answer: "ديدييه دروغبا" }, // تم تعديل السؤال ليتناسب مع الإجابة
        { question: "كم عدد ألقاب دوري أبطال أوروبا التي فاز بها تشيلسي؟", options: ["2", "1", "3", "0"], answer: "2" },
        { question: "من هو اللاعب الذي يحمل الرقم القياسي لأكبر عدد من المشاركات في تشيلسي؟", options: ["رون هاريس", "فرانك لامبارد", "جون تيري", "بيتر بونيتي"], answer: "رون هاريس" }
    ]
};

    // Typewriter texts
    const typewriterTexts = [
        "اختبر معرفتك بكرة القدم مع تحديات ممتعة",
        "شارك إنجازك مع أصدقائك وتنافس معهم",
        "احصل على شهادة إنجاز شخصية بعد كل اختبار",
        "اكتشف مدى معرفتك الحقيقية بناديك المفضل"
    ];

    // --- FUNCTIONS ---

    // Typewriter effect
    const typeWriter = (text, element, speed = 100) => {
        let i = 0;
        element.innerHTML = '';
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    // Rotate through typewriter texts
    const startTypewriterRotation = () => {
        let currentTextIndex = 0;
        
        const showNextText = () => {
            typeWriter(typewriterTexts[currentTextIndex], typewriterElement, 80);
            currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
        };
        
        // Show first text immediately
        showNextText();
        
        // Rotate texts every 5 seconds
        setInterval(showNextText, 5000);
    };

    // Animate stats counters
    const animateStats = () => {
        const statElements = document.querySelectorAll('.stat-number');
        
        statElements.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateStat = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            };
            
            // Start animation with a delay for each stat
            setTimeout(updateStat, 500);
        });
    };

    // Function to switch between sections
    const showSection = (sectionId) => {
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
        
        // Animate stats when home section is shown
        if (sectionId === 'home') {
            setTimeout(animateStats, 500);
        }
    };

    // Theme Toggler
    const toggleTheme = () => {
        document.body.classList.toggle('light-mode');
       themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    };

    // Populate club selection grid
    const populateClubs = () => {
        clubsGrid.innerHTML = ''; // Clear existing cards
        let delay = 0;
        for (const clubId in clubs) {
            const club = clubs[clubId];
            const card = document.createElement('div');
            card.className = 'club-card';
            card.dataset.club = clubId;
            card.style.animationDelay = `${delay}s`;
            delay += 0.05;
            card.innerHTML = `
                <img src="${club.logo}" alt="${club.name} Logo">
                <span>${club.name}</span>
            `;
            card.addEventListener('click', () => selectClub(clubId));
            clubsGrid.appendChild(card);
        }
    };

    // Handle club selection
    const selectClub = (clubId) => {
        currentClub = clubId;
        startQuiz();
    };

    // Start the quiz
    const startQuiz = () => {
        currentQuestionIndex = 0;
        score = 0;
        showSection('quiz');
        quizClubLogo.innerHTML = `<img src="${clubs[currentClub].logo}" alt="${clubs[currentClub].name}">`;
        displayQuestion();
    };

    // Display current question
    const displayQuestion = () => {
        const questionData = questions[currentClub][currentQuestionIndex];
        questionTitle.textContent = questionData.question;
        optionsContainer.innerHTML = '';
        
        // Shuffle options for variety
        const shuffledOptions = [...questionData.options].sort(() => Math.random() - 0.5);

        shuffledOptions.forEach(optionText => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = optionText;
            optionElement.addEventListener('click', () => selectOption(optionElement, optionText, questionData.answer));
            optionsContainer.appendChild(optionElement);
        });

        updateProgress();
    };
    
    // Handle option selection
    const selectOption = (selectedElement, selectedAnswer, correctAnswer) => {
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach(opt => opt.style.pointerEvents = 'none'); // Prevent multiple clicks
        
        if (selectedAnswer === correctAnswer) {
            score++;
            selectedElement.classList.add('correct');
        } else {
            selectedElement.classList.add('wrong');
            options.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
        }
        
        setTimeout(() => {
            nextQuestion();
        }, 1200); // Wait a bit before showing next question
    };
    
    // Go to next question or finish quiz
    const nextQuestion = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions[currentClub].length) {
            displayQuestion();
        } else {
            finishQuiz();
        }
    };

    // Update progress bar
    const updateProgress = () => {
        const totalQuestions = questions[currentClub].length;
        const progressPercentage = ((currentQuestionIndex) / totalQuestions) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${Math.round(progressPercentage)}%`;
        questionCounter.textContent = `السؤال ${currentQuestionIndex + 1} / ${totalQuestions}`;
    };

    // Finish the quiz and show certificate
   const finishQuiz = () => {
    const totalQuestions = questions[currentClub].length;
    const finalScore = Math.round((score / totalQuestions) * 100);
    
    certUsername.textContent = username;
    certClubName.textContent = clubs[currentClub].name;
    certScore.textContent = `${finalScore}%`;
    
    // إضافة الإحصائيات الجديدة
    document.getElementById('cert-questions-count').textContent = totalQuestions;
    document.getElementById('cert-correct-answers').textContent = score;
    
    certDate.textContent = new Date().toLocaleDateString('ar-EG-u-nu-latn', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // تحديث شعار النادي كخلفية
    certClubLogoContainer.innerHTML = `<img src="${clubs[currentClub].logo}" alt="${clubs[currentClub].name}">`;

    updateShareLinks(finalScore);
    showSection('certificate');
};

const updateShareLinks = (finalScore) => {
    const shareText = `لقد أكملت اختبار نادي ${clubs[currentClub].name} وحققت نتيجة ${finalScore}% في منصة زهرائيات الرياضة! اختبر معرفتك الآن:`;
    const encodedText = encodeURIComponent(shareText);
    const pageUrl = encodeURIComponent(window.location.href);

    shareWhatsappBtn.href = `https://api.whatsapp.com/send?text=${encodedText} ${pageUrl}`;
    shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${pageUrl}`;
    shareFacebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${encodedText}`;
    shareLinkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
};

   // Download certificate as image
const downloadCertificate = () => {
    const certNode = document.getElementById('certificate-to-download');
    
    html2canvas(certNode, {
        scale: 2.5, // Higher resolution for better quality
        useCORS: true, // for external images like logos
        backgroundColor: document.body.classList.contains('light-mode') ? '#f8f9fa' : '#1a1f24',
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `شهادة-إنجاز-${username.replace(/\s/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
};

    // Restart the process
    const restart = () => {
        usernameInput.value = '';
        startJourneyBtn.disabled = true;
        showSection('home');
    };

    // --- EVENT LISTENERS ---
    themeToggle.addEventListener('click', toggleTheme);

    usernameInput.addEventListener('input', () => {
        username = usernameInput.value.trim();
        // A simple validation for a full name (at least two words, each with 2+ letters)
        const nameParts = username.split(' ').filter(part => part.length >= 2);
        startJourneyBtn.disabled = nameParts.length < 2;
    });

    startJourneyBtn.addEventListener('click', () => {
        username = usernameInput.value.trim();
        populateClubs();
        showSection('club-selection');
    });

    downloadCertBtn.addEventListener('click', downloadCertificate);
    restartBtn.addEventListener('click', restart);

    // --- INITIALIZATION ---
   window.addEventListener('load', () => {
    // Start typewriter effect
    startTypewriterRotation();
    
    // Animate stats
    setTimeout(animateStats, 1000);
    
    // Hide preloader
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
    
    showSection('home');
    
    // تأكيد أن زر الثيم يظهر القمر (لأن الوضع فاتح افتراضي)
    themeToggle.textContent = '🌙';
});
});
