import heroImg from "@/assets/hero-coffee.jpg";
import espresso from "@/assets/espresso.jpg";
import cappuccino from "@/assets/cappuccino.jpg";
import latte from "@/assets/latte.jpg";
import iced from "@/assets/iced.jpg";
import arabic from "@/assets/arabic.jpg";
import turkish from "@/assets/turkish.jpg";
import mocha from "@/assets/mocha.jpg";
import macchiato from "@/assets/macchiato.jpg";

export type Coffee = {
  id: string;
  name: string;
  nameEn: string;
  desc: string;
  price: number;
  category: "hot" | "cold" | "specialty";
  img: string;
  badge?: string;
  ingredients: string[];
  story: string;
  origin: string;
  roast: "فاتح" | "متوسط" | "داكن";
  caffeine: string;
  volume: string;
};

export const HERO_IMG = heroImg;

export const COFFEES: Coffee[] = [
  {
    id: "arabic",
    name: "قهوة عربية",
    nameEn: "Arabic Coffee",
    desc: "هيل، زعفران، وحبوب محمصة على الطريقة الأصيلة.",
    price: 18,
    category: "specialty",
    img: arabic,
    badge: "الأكثر طلباً",
    ingredients: ["حبوب عربيكا مختارة", "هيل أخضر طازج", "زعفران إيراني", "قرنفل", "ماء نقي"],
    story:
      "تُعدّ القهوة العربية رمزاً للكرم والضيافة في الجزيرة العربية منذ قرون. تُحمّص حبوبها تحميصاً فاتحاً يحفظ نكهتها الذهبية، ثم تُطحن وتُغلى على نار هادئة مع الهيل والزعفران، لتُقدَّم في دلّةٍ نحاسية وفناجين صغيرة كرمز للترحاب الأصيل.",
    origin: "اليمن وجبال الحجاز",
    roast: "فاتح",
    caffeine: "منخفض",
    volume: "60 مل",
  },
  {
    id: "turkish",
    name: "قهوة تركية",
    nameEn: "Turkish Coffee",
    desc: "مطحونة ناعمة، رغوة كثيفة، ونكهة عميقة.",
    price: 16,
    category: "specialty",
    img: turkish,
    ingredients: ["حبوب عربيكا مطحونة ناعماً", "سكر حسب الرغبة", "ماء بارد"],
    story:
      "وُلدت في إسطنبول في القرن السادس عشر، ولا تزال تُحضّر بنفس الطريقة العثمانية: في إبريق نحاسي صغير يُسمى \"جذوة\"، فوق رمل ساخن. رغوتها سرّ نكهتها، وقاع فنجانها يحكي قصصاً يتفاءل بها العاشقون.",
    origin: "تركيا — البرازيل",
    roast: "داكن",
    caffeine: "متوسط",
    volume: "75 مل",
  },
  {
    id: "espresso",
    name: "إسبريسو",
    nameEn: "Espresso",
    desc: "جرعة مركّزة من حبوب عربيكا مختارة.",
    price: 12,
    category: "hot",
    img: espresso,
    ingredients: ["18غ من حبوب العربيكا", "ماء بدرجة 93°م", "ضغط 9 بار"],
    story:
      "إيطاليا، مطلع القرن العشرين: أراد الناس قهوةً سريعة دون التضحية بالنكهة. فوُلد الإسبريسو — جرعة مكثّفة من 25 ثانية فقط، تحمل عبق الأرض كاملاً في 30 مليلتراً. هو الأساس الذي تُبنى عليه كل مشروبات القهوة الحديثة.",
    origin: "إثيوبيا — كولومبيا",
    roast: "متوسط",
    caffeine: "عالي",
    volume: "30 مل",
  },
  {
    id: "cappuccino",
    name: "كابتشينو",
    nameEn: "Cappuccino",
    desc: "إسبريسو، حليب مبخّر، ورغوة حريرية.",
    price: 20,
    category: "hot",
    img: cappuccino,
    badge: "كلاسيكي",
    ingredients: ["جرعة إسبريسو", "حليب طازج كامل الدسم مبخّر", "رغوة حليب كثيفة", "رشة كاكاو (اختياري)"],
    story:
      "سُمّي نسبةً إلى لون عباءة الرهبان الكبوشيين البنية. التوازن المثالي: ثلث إسبريسو، ثلث حليب، ثلث رغوة. يُقدَّم تقليدياً قبل الحادية عشرة صباحاً في إيطاليا، رفيقاً للحظات الهدوء الأولى من اليوم.",
    origin: "إيطاليا",
    roast: "متوسط",
    caffeine: "متوسط",
    volume: "180 مل",
  },
  {
    id: "latte",
    name: "لاتيه",
    nameEn: "Caffè Latte",
    desc: "حليب ناعم يلتقي بإسبريسو دافئ.",
    price: 22,
    category: "hot",
    img: latte,
    ingredients: ["جرعة إسبريسو", "حليب مبخّر بنعومة", "طبقة خفيفة من الرغوة", "نقش لاتيه آرت"],
    story:
      "في صباحات شمال إيطاليا، اعتاد الناس تخفيف الإسبريسو بحليب دافئ ليكون أكثر لطفاً. اليوم، صار اللاتيه لوحةً فنية يرسم فيها البارِيستا قلوباً وأوراقاً، فيصبح كل فنجان توقيعاً شخصياً.",
    origin: "إيطاليا",
    roast: "متوسط",
    caffeine: "متوسط",
    volume: "240 مل",
  },
  {
    id: "mocha",
    name: "موكا",
    nameEn: "Mocha",
    desc: "شوكولاتة بلجيكية، إسبريسو، وكريمة مخفوقة.",
    price: 25,
    category: "hot",
    img: mocha,
    ingredients: ["جرعة إسبريسو", "صوص شوكولاتة بلجيكية فاخرة", "حليب مبخّر", "كريمة مخفوقة", "رشة كاكاو"],
    story:
      "اسمها يعود إلى ميناء المخا اليمني، مهد تجارة البن. تزاوج طويل بين مرارة القهوة وحلاوة الكاكاو، يُذكّرك بأن أحلى الأشياء تأتي من توازن الأضداد.",
    origin: "اليمن — بلجيكا",
    roast: "داكن",
    caffeine: "متوسط",
    volume: "300 مل",
  },
  {
    id: "macchiato",
    name: "ماكياتو كراميل",
    nameEn: "Caramel Macchiato",
    desc: "طبقات من الحليب والكراميل وإسبريسو غني.",
    price: 24,
    category: "hot",
    img: macchiato,
    ingredients: ["شراب الفانيلا", "حليب مبخّر", "جرعتا إسبريسو", "صوص كراميل بحري"],
    story:
      "كلمة \"ماكياتو\" تعني \"موسوم\" بالإيطالية. هنا، يُوسم الحليب الناعم بقطرة إسبريسو غامقة، فينساب الكراميل ليصنع مذاقاً متعدد الطبقات يشبه قراءة قصيدةٍ سطراً سطراً.",
    origin: "إيطاليا — أمريكا",
    roast: "متوسط",
    caffeine: "متوسط",
    volume: "300 مل",
  },
  {
    id: "iced",
    name: "آيس كولد برو",
    nameEn: "Iced Cold Brew",
    desc: "منقوع 18 ساعة، نكهة سلسة ومنعشة.",
    price: 23,
    category: "cold",
    img: iced,
    badge: "صيفي",
    ingredients: ["حبوب مطحونة خشن", "ماء بارد مرشّح", "نقع 18 ساعة", "مكعبات ثلج", "شريحة برتقال (اختياري)"],
    story:
      "بدأت في اليابان منذ 400 عام تحت اسم \"كيوتو كوفي\". الماء البارد يستخرج النكهات الحلوة دون المرارة، فتولد قهوة سلسة كالحرير، منعشة كنسيم الفجر، تُغازل أيام الصيف الحارّة.",
    origin: "اليابان — البرازيل",
    roast: "متوسط",
    caffeine: "عالي",
    volume: "350 مل",
  },
];

export const FILTERS: { id: "all" | Coffee["category"]; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "hot", label: "ساخنة" },
  { id: "cold", label: "باردة" },
  { id: "specialty", label: "اختيارات الشيف" },
];