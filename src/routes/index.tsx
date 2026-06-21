import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Truck, ShieldCheck, MessageCircle, Star, ArrowRight, Printer, Palette, Gift, Frame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, WhatsAppBanner, FloatingWhatsApp, Eyebrow } from "@/components/site/SiteFooter";
import { products, portfolio, testimonials, waLink, formatNaira, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import heroImg from "@/assets/hero-main.jpg";
import frameImg from "@/assets/product-frame.jpg";
import hamperImg from "@/assets/product-hamper.jpg";
import portraitImg from "@/assets/product-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comage Adini Creativity — Crafted With Purpose. Delivered With Pride." },
      { name: "description", content: "Premium frames, gifts, signage and printing services in Lagos, Nigeria. Delivered nationwide." },
      { property: "og:title", content: "Comage Adini Creativity" },
      { property: "og:description", content: "Premium frames, gifts, signage and printing services in Lagos, Nigeria." },
    ],
  }),
  component: Home,
});

const tabs = ["All", "Frames", "Gifts", "Artworks", "Printing"] as const;

function Hero3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setTilt({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="scene-3d relative h-[280px] sm:h-[340px] lg:h-[420px] w-full"
      style={{ transform: `rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`, transition: "transform 0.3s ease-out" }}
    >
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full border border-gold/20 spin-slow" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full border border-gold/15 spin-slow" style={{ animationDirection: "reverse", animationDuration: "40s" }} />

      {/* Floating frames */}
      <div className="absolute left-[10%] top-[12%] w-32 sm:w-40 aspect-[3/4] rounded-lg overflow-hidden shadow-elegant float-card border-4 border-gold/40">
        <img src={frameImg} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute right-[8%] top-[18%] w-28 sm:w-36 aspect-square rounded-lg overflow-hidden shadow-elegant float-card-2 border-4 border-white/30">
        <img src={hamperImg} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-40 sm:w-52 aspect-[4/5] rounded-lg overflow-hidden shadow-elegant border-4 border-gold/60"
        style={{ animation: "float-y 8s ease-in-out infinite", transformStyle: "preserve-3d" }}>
        <img src={portraitImg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
      </div>

      {/* Sparkle */}
      <Sparkles className="absolute top-[20%] right-[20%] h-5 w-5 text-gold animate-pulse" />
      <Sparkles className="absolute bottom-[25%] left-[18%] h-4 w-4 text-gold animate-pulse" style={{ animationDelay: "1s" }} />
    </div>
  );
}

function Home() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const featured = (tab === "All" ? products : products.filter((p) => p.category === tab)).slice(0, 4);
  const { add } = useCart();

  return (
    <>
      <SiteHeader dark />
      {/* HERO — reduced height with 3D */}
      <section className="relative bg-ink text-ink-foreground overflow-hidden -mt-16 md:-mt-[68px] pt-16 md:pt-[68px]">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <Eyebrow light>Premium Gifts & Creative Services · Lagos</Eyebrow>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Crafted With <span className="gold-shimmer">Purpose.</span><br />
              Delivered With <span className="text-gold">Pride.</span>
            </h1>
            <p className="mt-4 text-white/70 max-w-xl text-sm md:text-base lg:mx-0 mx-auto">
              Custom frames, artworks, gifts and printing services for individuals and businesses across Nigeria.
            </p>
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
              <Button asChild variant="hero" size="lg"><Link to="/shop">Shop Now</Link></Button>
              <Button asChild variant="outline-light" size="lg">
                <a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp Us</a>
              </Button>
            </div>
          </div>
          <div className="hidden sm:block">
            <Hero3D />
          </div>
        </div>
        {/* Trust bar */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] text-white/70">
            {[
              { icon: Truck, label: "Nationwide Delivery" },
              { icon: ShieldCheck, label: "Quality Guaranteed" },
              { icon: MessageCircle, label: "WhatsApp Orders" },
              { icon: Star, label: "5-Star Rated" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2">
                <Icon className="h-3.5 w-3.5 text-gold" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>Our Store</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold">Featured Products</h2>
          <p className="text-muted-foreground mt-1.5 text-sm">Handpicked favourites from our collection</p>
          <div className="mt-5 inline-flex flex-wrap justify-center gap-1 p-1 rounded-md bg-muted">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase rounded transition-colors ${tab === t ? "bg-ink text-ink-foreground" : "text-foreground/70 hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} onAdd={() => add(p)} />)}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline-ink" size="lg"><Link to="/shop">View All Products</Link></Button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold">Our Services</h2>
          <p className="text-muted-foreground mt-1.5 text-sm">Comprehensive creative solutions for every need</p>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Printer, title: "Printing", body: "Sharp, vibrant printing on premium materials." },
            { icon: Palette, title: "Signage", body: "Eye-catching signage built for impact." },
            { icon: Gift, title: "Custom Gifts", body: "Personalised gifts for every occasion." },
            { icon: Frame, title: "Frames & Art", body: "Bespoke frames and original artworks." },
          ].map((s) => (
            <Link to="/services" key={s.title} className="bg-card rounded-lg p-5 shadow-card hover:shadow-elegant transition-shadow group">
              <div className="h-9 w-9 rounded-md bg-gold/15 text-gold grid place-items-center mb-3 group-hover:bg-gold group-hover:text-ink transition-colors">
                <s.icon className="h-4 w-4" />
              </div>
              <div className="font-semibold text-sm">{s.title}</div>
              <p className="text-xs text-muted-foreground mt-1.5">{s.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-gold">
                Learn More <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>Our Work</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold">Portfolio Highlights</h2>
          <p className="text-muted-foreground mt-1.5 text-sm">A glimpse of the quality and creativity we deliver</p>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {portfolio.slice(0, 4).map((p) => (
            <Link to="/portfolio" key={p.id} className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[9px] font-semibold tracking-wider uppercase text-gold">{p.category}</div>
                <div className="font-semibold text-sm mt-0.5">{p.title}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="ink" size="lg"><Link to="/portfolio">View Full Portfolio</Link></Button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>Reviews</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold">What Our Customers Say</h2>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card rounded-lg p-5 shadow-card">
              <div className="flex gap-1 text-gold mb-3">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <p className="text-sm text-foreground/80">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gold/20 text-gold grid place-items-center font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WhatsAppBanner />
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}

function ProductCard({ p, onAdd }: { p: Product; onAdd: () => void }) {
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elegant transition-shadow">
      <Link to="/shop/$productId" params={{ productId: p.id }} className="block relative aspect-square overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
        {p.badge && <span className="absolute top-2.5 left-2.5 bg-gold text-ink text-[9px] font-bold tracking-wider px-2 py-0.5 rounded">{p.badge}</span>}
      </Link>
      <div className="p-3">
        <div className="text-[9px] font-semibold tracking-wider uppercase text-gold">{p.category}</div>
        <Link to="/shop/$productId" params={{ productId: p.id }} className="block font-semibold mt-0.5 text-sm hover:text-gold transition-colors line-clamp-1">{p.name}</Link>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="text-gold font-bold text-sm tabular-nums">{formatNaira(p.price)}</div>
          <Button variant="ink" size="sm" onClick={onAdd}>Add</Button>
        </div>
      </div>
    </div>
  );
}
