import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Check, MessageCircle, Truck, ShieldCheck, RotateCcw, ChevronLeft, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, FloatingWhatsApp } from "@/components/site/SiteFooter";
import { products, formatNaira, waLink } from "@/lib/data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Comage Adini Creativity` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="text-center">
        <div className="font-display text-4xl font-bold">Product not found</div>
        <Button asChild variant="ink" size="lg" className="mt-5"><Link to="/shop">Back to Shop</Link></Button>
      </div>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallback = products.filter((p) => p.id !== product.id).slice(0, 4);
  const moreLike = related.length >= 3 ? related : fallback;

  return (
    <>
      <SiteHeader dark />
      <div className="bg-cream/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 text-xs text-muted-foreground flex items-center gap-2">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>›</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>›</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>
      </div>

      <section className="bg-background py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-5">
            <ChevronLeft className="h-4 w-4" /> Back to shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted shadow-card">
                <img src={product.images[active]} alt={product.name} className="h-full w-full object-cover" />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-gold text-ink text-[10px] font-bold tracking-wider px-2.5 py-1 rounded">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                {product.images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`aspect-square rounded-md overflow-hidden bg-muted border-2 transition-all ${i === active ? "border-gold shadow-card" : "border-transparent hover:border-border opacity-70"}`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold">{product.category}</div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 leading-tight">{product.name}</h1>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl md:text-4xl font-bold text-gold tabular-nums">{formatNaira(product.price)}</span>
                <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded ${product.stock > 10 ? "bg-emerald/15 text-emerald-deep" : product.stock > 0 ? "bg-gold/20 text-ink" : "bg-destructive/15 text-destructive"}`}>
                  {product.stock > 10 ? `In Stock (${product.stock})` : product.stock > 0 ? `Only ${product.stock} left` : "Out of stock"}
                </span>
              </div>

              <p className="text-foreground/75 mt-5 leading-relaxed">{product.description}</p>

              {product.details && (
                <ul className="mt-5 space-y-2">
                  {product.details.map((d: string) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="h-4 w-4 text-emerald mt-0.5 shrink-0" /> {d}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center border border-border rounded-md bg-card">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 grid place-items-center hover:bg-muted">
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-12 text-center font-semibold tabular-nums">{qty}</div>
                  <button onClick={() => setQty(qty + 1)} className="h-11 w-11 grid place-items-center hover:bg-muted">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button variant="ink" size="lg" className="flex-1 min-w-[180px]" onClick={() => add(product, qty)}>
                  Add to Cart · {formatNaira(product.price * qty)}
                </Button>
              </div>

              <div className="mt-3 flex gap-2">
                <Button asChild variant="whatsapp" size="lg" className="flex-1">
                  <a href={waLink(`Hello, I'd like to order: ${product.name}`)} target="_blank" rel="noreferrer">
                    <MessageCircle /> Order on WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="lg" aria-label="Save"><Heart className="h-4 w-4" /></Button>
                <Button variant="outline" size="lg" aria-label="Share"><Share2 className="h-4 w-4" /></Button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-border">
                {[
                  { icon: Truck, t: "Nationwide", s: "3–7 days delivery" },
                  { icon: ShieldCheck, t: "Quality", s: "Guaranteed craft" },
                  { icon: RotateCcw, t: "Easy Returns", s: "Within 7 days" },
                ].map(({ icon: Icon, t, s }) => (
                  <div key={t} className="text-center">
                    <Icon className="h-5 w-5 text-gold mx-auto" />
                    <div className="text-xs font-semibold mt-1.5">{t}</div>
                    <div className="text-[10px] text-muted-foreground">{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More like this */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-1">You may also like</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">More Like This</h2>
            </div>
            <Link to="/shop" className="text-xs font-semibold tracking-wider uppercase text-gold hover:underline hidden sm:block">View All →</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {moreLike.map((p) => (
              <div key={p.id} className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elegant transition-shadow">
                <Link to="/shop/$productId" params={{ productId: p.id }} className="block relative aspect-square overflow-hidden bg-muted">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </Link>
                <div className="p-3">
                  <div className="text-[9px] font-semibold tracking-wider uppercase text-gold">{p.category}</div>
                  <Link to="/shop/$productId" params={{ productId: p.id }} className="block font-semibold text-sm mt-0.5 hover:text-gold line-clamp-1">{p.name}</Link>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="text-gold font-bold text-sm tabular-nums">{formatNaira(p.price)}</div>
                    <Button variant="ink" size="sm" onClick={() => add(p)}>Add</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
