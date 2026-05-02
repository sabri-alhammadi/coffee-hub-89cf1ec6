import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { COFFEES, FILTERS, HERO_IMG, type Coffee } from "@/data/coffees";
import arabic from "@/assets/arabic.jpg";
import turkish from "@/assets/turkish.jpg";
import latte from "@/assets/latte.jpg";
import cappuccino from "@/assets/cappuccino.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type CartItem = { id: string; qty: number };

function Index() {
  const [filter, setFilter] = useState<"all" | Coffee["category"]>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const visible = useMemo(
    () => (filter === "all" ? COFFEES : COFFEES.filter((c) => c.category === filter)),
    [filter],
  );

  const addToCart = (id: string, name: string) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === id);
      return found
        ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { id, qty: 1 }];
    });
    setToast(`✓ أُضيف "${name}" إلى السلة`);
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id: string, delta: number) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => {
    const c = COFFEES.find((c) => c.id === i.id);
    return s + (c ? c.price * i.qty : 0);
  }, 0);

  const orderNow = (name: string) => {
    setToast(`☕ جاري تجهيز طلبك من "${name}"...`);
  };

  return (
    <div dir="rtl" className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <BeanLogo />
            <div>
              <div className="font-display text-xl text-gradient-gold leading-none">حكاية فنجان</div>
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground mt-1">HEKAYET FUNJAN</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#menu" className="hover:text-primary transition">القائمة</a>
            <a href="#story" className="hover:text-primary transition">حكايتنا</a>
            <a href="#visit" className="hover:text-primary transition">زورونا</a>
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            aria-label="فتح السلة"
            className="relative p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-gradient-gold text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="فنجان قهوة بُنّي ساخن"
            className="w-full h-full object-cover opacity-40"
            width={1600}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/60 to-background/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-1 rounded-full border border-primary/40 text-primary text-xs tracking-widest mb-6">
              ☕ منذ ٢٠١٢
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
              في كل فنجانٍ
              <br />
              <span className="text-gradient-gold">حكاية تُروى</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              من حبوب مختارة بعناية، إلى يدِ بارِيستا متمرّس… نقدّم لك تجربة قهوة لا تُنسى — من المشرق إلى أقاصي العالم.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#menu"
                className="px-8 py-4 bg-gradient-gold text-primary-foreground font-bold rounded-full shadow-warm hover:scale-105 transition-transform"
              >
                تصفّح القائمة
              </a>
              <a
                href="#story"
                className="px-8 py-4 border border-border rounded-full hover:bg-secondary transition"
              >
                اكتشف حكايتنا
              </a>
            </div>
            <div className="flex gap-8 mt-12 pt-8 border-t border-border/50">
              <Stat n="١٢+" l="نوع قهوة" />
              <Stat n="٥٠ك" l="عميل سعيد" />
              <Stat n="٤.٩★" l="تقييم" />
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-primary text-sm tracking-[0.4em] mb-3">— القائمة —</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">قهوتنا المميّزة</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            مجموعة مختارة من أرقى أنواع القهوة، محضّرة بشغف وحرفية عالية.
          </p>
        </div>

        {/* filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.id
                  ? "bg-gradient-gold text-primary-foreground shadow-warm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {visible.map((c, i) => (
            <CoffeeCard
              key={c.id}
              coffee={c}
              onAdd={() => addToCart(c.id, c.name)}
              onOrder={() => orderNow(c.name)}
              delay={i * 60}
            />
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="bg-secondary/30 border-y border-border/50 py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-primary text-sm tracking-[0.4em] mb-3">— حكايتنا —</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              من حبّةٍ خضراء…
              <br />
              <span className="text-gradient-gold">إلى فنجانٍ يُحكى</span>
            </h2>
            <p className="text-muted-foreground leading-loose mb-4">
              بدأت حكايتنا في زاويةٍ صغيرة من المدينة القديمة، بحلمٍ بسيط: أن نُقدّم القهوة كما يجب أن تكون — صادقة، دافئة، وتُحاكي الذكريات.
            </p>
            <p className="text-muted-foreground leading-loose">
              اليوم، نختار حبوبنا من أفضل المزارع حول العالم، ونحمّصها يدوياً في مقهانا، لنمنحك في كل رشفة قصةً مختلفة.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={turkish} alt="" className="rounded-2xl shadow-card aspect-square object-cover translate-y-6" loading="lazy" width={400} height={400} />
            <img src={cappuccino} alt="" className="rounded-2xl shadow-card aspect-square object-cover" loading="lazy" width={400} height={400} />
            <img src={arabic} alt="" className="rounded-2xl shadow-card aspect-square object-cover" loading="lazy" width={400} height={400} />
            <img src={latte} alt="" className="rounded-2xl shadow-card aspect-square object-cover translate-y-6" loading="lazy" width={400} height={400} />
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="text-primary text-sm tracking-[0.4em] mb-3">— زورونا —</div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">باب القهوة مفتوح دائماً</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          تعالَ، خذ كرسيّك المفضّل، ودعنا نروي لك حكاية اليوم بفنجانك المختار.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <InfoCard icon="📍" title="العنوان" lines={["شارع الزهور", "حي البلد القديم"]} />
          <InfoCard icon="🕐" title="ساعات العمل" lines={["يومياً", "٧ ص — ١٢ م"]} />
          <InfoCard icon="📞" title="تواصل معنا" lines={["+٩٦٦ ٥٥ ١٢٣ ٤٥٦٧", "hello@hekayet.cafe"]} />
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        © ٢٠٢٦ حكاية فنجان — صُنع بشغفٍ وحبّ القهوة.
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setCartOpen(false)}>
          <div className="flex-1 bg-black/60 backdrop-blur-sm" />
          <aside
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card h-full flex flex-col shadow-2xl animate-fade-up"
          >
            <div className="p-6 flex items-center justify-between border-b border-border">
              <h3 className="text-2xl font-bold">سلتك</h3>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-secondary rounded-full" aria-label="إغلاق">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 && (
                <p className="text-center text-muted-foreground py-20">السلة فارغة... اختر مشروبك المفضل ☕</p>
              )}
              {cart.map((i) => {
                const c = COFFEES.find((c) => c.id === i.id)!;
                return (
                  <div key={i.id} className="flex gap-4 items-center bg-secondary/50 p-3 rounded-xl">
                    <img src={c.img} alt="" className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-bold">{c.name}</div>
                      <div className="text-primary text-sm">{(c.price * i.qty).toFixed(2)} ر.س</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(i.id, -1)} className="w-7 h-7 rounded-full bg-background hover:bg-primary hover:text-primary-foreground">-</button>
                      <span className="w-6 text-center font-bold">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, 1)} className="w-7 h-7 rounded-full bg-background hover:bg-primary hover:text-primary-foreground">+</button>
                    </div>
                    <button onClick={() => removeFromCart(i.id)} className="text-muted-foreground hover:text-destructive p-1" aria-label="حذف">🗑</button>
                  </div>
                );
              })}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between text-lg">
                  <span>الإجمالي</span>
                  <span className="font-bold text-gradient-gold text-2xl">{cartTotal.toFixed(2)} ر.س</span>
                </div>
                <button
                  onClick={() => { setToast("✓ تم استلام طلبك! شكراً لك."); setCart([]); setCartOpen(false); }}
                  className="w-full py-4 bg-gradient-gold text-primary-foreground font-bold rounded-full shadow-warm hover:scale-[1.02] transition"
                >
                  إتمام الطلب
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-card border border-primary/40 px-6 py-3 rounded-full shadow-warm animate-fade-up">
          {toast}
        </div>
      )}
    </div>
  );
}

function CoffeeCard({ coffee, onAdd, onOrder, delay }: { coffee: Coffee; onAdd: () => void; onOrder: () => void; delay: number }) {
  return (
    <article
      className="group relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-warm transition-all duration-500 hover:-translate-y-2 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={coffee.img}
          alt={coffee.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          width={800}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        {coffee.badge && (
          <span className="absolute top-4 right-4 bg-gradient-gold text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-warm">
            {coffee.badge}
          </span>
        )}
        <button
          onClick={onAdd}
          aria-label={`أضف ${coffee.name} إلى السلة`}
          className="absolute top-4 left-4 w-11 h-11 rounded-full bg-background/80 backdrop-blur-md border border-border hover:bg-gradient-gold hover:text-primary-foreground hover:scale-110 transition-all flex items-center justify-center"
        >
          <CartIcon />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <Link to="/coffee/$id" params={{ id: coffee.id }} className="group/link">
            <h3 className="text-xl font-bold group-hover/link:text-primary transition-colors">{coffee.name}</h3>
            <p className="text-xs text-muted-foreground tracking-wider">{coffee.nameEn}</p>
          </Link>
          <div className="text-left">
            <div className="text-2xl font-bold text-gradient-gold">{coffee.price}</div>
            <div className="text-[10px] text-muted-foreground">ر.س</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[2.5rem]">
          {coffee.desc}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onOrder}
            className="flex-1 py-3 bg-secondary hover:bg-gradient-gold hover:text-primary-foreground rounded-full font-bold text-sm transition-all"
          >
            اطلب الآن
          </button>
          <Link
            to="/coffee/$id"
            params={{ id: coffee.id }}
            className="px-4 py-3 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all flex items-center"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </article>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-gradient-gold">{n}</div>
      <div className="text-xs text-muted-foreground mt-1">{l}</div>
    </div>
  );
}

function InfoCard({ icon, title, lines }: { icon: string; title: string; lines: string[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition">
      <div className="text-3xl mb-3">{icon}</div>
      <div className="font-bold mb-2">{title}</div>
      {lines.map((l) => (
        <div key={l} className="text-sm text-muted-foreground">{l}</div>
      ))}
    </div>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  );
}

function BeanLogo() {
  return (
    <div className="w-11 h-11 rounded-full bg-gradient-gold flex items-center justify-center shadow-warm">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
        <path d="M12 2c-3 4-3 8 0 12s3 8 0 12" />
        <ellipse cx="12" cy="12" rx="6" ry="10" />
      </svg>
    </div>
  );
}
