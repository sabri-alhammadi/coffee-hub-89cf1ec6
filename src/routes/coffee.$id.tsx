import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { COFFEES } from "@/data/coffees";

export const Route = createFileRoute("/coffee/$id")({
  loader: ({ params }) => {
    const coffee = COFFEES.find((c) => c.id === params.id);
    if (!coffee) throw notFound();
    return coffee;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — حكاية فنجان` },
          { name: "description", content: loaderData.desc },
          { property: "og:title", content: `${loaderData.name} — حكاية فنجان` },
          { property: "og:description", content: loaderData.desc },
          { property: "og:image", content: loaderData.img },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-3">حدث خطأ</h1>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Link to="/" className="text-primary underline">العودة للرئيسية</Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center" dir="rtl">
      <div>
        <h1 className="text-4xl font-bold mb-3">المشروب غير موجود</h1>
        <p className="text-muted-foreground mb-6">لم نعثر على هذا المشروب في قائمتنا.</p>
        <Link to="/" className="px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-bold">العودة للقائمة</Link>
      </div>
    </div>
  ),
  component: CoffeeDetail,
});

function CoffeeDetail() {
  const coffee = Route.useLoaderData();
  const related = COFFEES.filter((c) => c.id !== coffee.id && c.category === coffee.category).slice(0, 3);

  return (
    <div dir="rtl" className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-xl text-gradient-gold">حكاية فنجان</Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition flex items-center gap-2">
            <span>→</span> العودة للقائمة
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 opacity-20">
          <img src={coffee.img} alt="" className="w-full h-full object-cover blur-3xl scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative animate-fade-up">
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-warm relative">
              <img src={coffee.img} alt={coffee.name} className="w-full h-full object-cover" />
              {coffee.badge && (
                <span className="absolute top-6 right-6 bg-gradient-gold text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-warm">
                  {coffee.badge}
                </span>
              )}
            </div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="text-primary text-xs tracking-[0.4em] mb-4">— {coffee.nameEn.toUpperCase()} —</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{coffee.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{coffee.desc}</p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-gradient-gold">{coffee.price}</span>
              <span className="text-muted-foreground">ر.س</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <Spec label="المنشأ" value={coffee.origin} />
              <Spec label="التحميص" value={coffee.roast} />
              <Spec label="الكافيين" value={coffee.caffeine} />
              <Spec label="الحجم" value={coffee.volume} />
            </div>

            <Link
              to="/"
              className="inline-block px-8 py-4 bg-gradient-gold text-primary-foreground font-bold rounded-full shadow-warm hover:scale-105 transition-transform"
            >
              اطلب الآن من القائمة
            </Link>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <div className="animate-fade-up">
          <div className="text-primary text-sm tracking-[0.4em] mb-3">— المكوّنات —</div>
          <h2 className="text-3xl font-bold mb-6">ما الذي يصنع هذا الفنجان؟</h2>
          <ul className="space-y-3">
            {coffee.ingredients.map((ing) => (
              <li key={ing} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition">
                <span className="w-2 h-2 rounded-full bg-gradient-gold shrink-0" />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="text-primary text-sm tracking-[0.4em] mb-3">— القصة —</div>
          <h2 className="text-3xl font-bold mb-6">حكاية {coffee.name}</h2>
          <p className="text-muted-foreground leading-loose text-lg">{coffee.story}</p>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-secondary/30 border-t border-border/50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-bold mb-8 text-center">قد يعجبك أيضاً</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((c) => (
                <Link
                  key={c.id}
                  to="/coffee/$id"
                  params={{ id: c.id }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-warm hover:-translate-y-1 transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <div className="font-bold">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.nameEn}</div>
                    </div>
                    <div className="text-xl font-bold text-gradient-gold">{c.price} <span className="text-xs text-muted-foreground">ر.س</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        © ٢٠٢٦ حكاية فنجان — صُنع بشغفٍ وحبّ القهوة.
      </footer>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card/60 backdrop-blur border border-border rounded-xl p-3">
      <div className="text-[10px] text-muted-foreground tracking-widest mb-1">{label}</div>
      <div className="font-bold text-sm">{value}</div>
    </div>
  );
}