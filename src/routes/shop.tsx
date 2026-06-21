import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, MessageCircle, Grid3x3, List, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, WhatsAppBanner, FloatingWhatsApp, PageHero } from "@/components/site/SiteFooter";
import { products, formatNaira, waLink, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Comage Adini Creativity" },
      { name: "description", content: "Browse premium gifts, frames, artworks and printing services — delivered nationwide." },
    ],
  }),
  component: ShopPage,
});

const categories = ["All Products", "Frames", "Gifts", "Artworks", "Printing", "Signage", "Custom"] as const;
const priceRanges = [
  { label: "Under ₦5,000", test: (n: number) => n < 5000 },
  { label: "₦5,000 – ₦10,000", test: (n: number) => n >= 5000 && n < 10000 },
  { label: "₦10,000 – ₦25,000", test: (n: number) => n >= 10000 && n < 25000 },
  { label: "₦25,000 – ₦50,000", test: (n: number) => n >= 25000 && n < 50000 },
  { label: "Above ₦50,000", test: (n: number) => n >= 50000 },
];

function ShopPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All Products");
  const [price, setPrice] = useState<number | null>(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { add } = useCart();

  const filtered = useMemo(() => {
    let out = products;
    if (cat !== "All Products") out = out.filter((p) => p.category === cat);
    if (price !== null) out = out.filter((p) => priceRanges[price].test(p.price));
    if (q) out = out.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "high") out = [...out].sort((a, b) => b.price - a.price);
    return out;
  }, [cat, price, q, sort]);

  const FilterPanel = (
    <div className="space-y-5">
      <div>
        <div className="text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2.5">Categories</div>
        <ul className="space-y-1 text-sm">
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => { setCat(c); setFiltersOpen(false); }}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-left ${cat === c ? "bg-ink text-ink-foreground" : "hover:bg-muted"}`}
              >
                <span>{c}</span>
                <span className="text-xs opacity-70 tabular-nums">{c === "All Products" ? products.length : products.filter((p) => p.category === c).length}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2.5">Price Range</div>
        <ul className="space-y-2 text-sm">
          {priceRanges.map((r, i) => (
            <li key={r.label}>
              <label className="flex items-center gap-2.5 cursor-pointer px-3 py-1.5 rounded-md hover:bg-muted">
                <input type="radio" name="price" checked={price === i} onChange={() => setPrice(i)} className="accent-gold" />
                {r.label}
              </label>
            </li>
          ))}
          {price !== null && (
            <li>
              <button onClick={() => setPrice(null)} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 inline-flex items-center gap-1">
                <X className="h-3 w-3" /> Clear filter
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className="bg-emerald text-white rounded-lg p-4">
        <div className="text-xs font-semibold tracking-wider uppercase mb-1">Need a custom order?</div>
        <p className="text-xs opacity-90 mb-3">Chat with us directly for bespoke pieces.</p>
        <Button asChild variant="hero" size="sm" className="w-full">
          <a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <SiteHeader dark />
      <PageHero
        eyebrow="Browse & Buy"
        title="Our Shop"
        description="Premium gifts, frames, artworks & printing services — delivered nationwide."
        breadcrumb="Shop"
        compact
      />

      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block space-y-5 sticky top-24 self-start">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
            <div className="bg-card rounded-lg p-4 shadow-card">{FilterPanel}</div>
          </aside>

          <div>
            {/* Mobile controls */}
            <div className="lg:hidden mb-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ink" size="default" className="flex-1">
                      <SlidersHorizontal className="h-4 w-4" /> Filters
                      {(cat !== "All Products" || price !== null) && (
                        <span className="ml-1 h-5 min-w-5 px-1.5 grid place-items-center rounded-full bg-gold text-ink text-[10px] font-bold">
                          {(cat !== "All Products" ? 1 : 0) + (price !== null ? 1 : 0)}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[88%] sm:w-96 overflow-y-auto">
                    <SheetHeader className="mb-4">
                      <SheetTitle className="font-display text-xl">Filter Products</SheetTitle>
                    </SheetHeader>
                    {FilterPanel}
                  </SheetContent>
                </Sheet>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm bg-card border border-border rounded-md px-3 h-10 flex-1">
                  <option value="popular">Most Popular</option>
                  <option value="low">Price: Low → High</option>
                  <option value="high">Price: High → Low</option>
                </select>
              </div>
              {(cat !== "All Products" || price !== null) && (
                <div className="flex flex-wrap gap-2">
                  {cat !== "All Products" && (
                    <button onClick={() => setCat("All Products")} className="text-xs bg-ink text-ink-foreground rounded-full px-3 py-1.5 inline-flex items-center gap-1.5">
                      {cat} <X className="h-3 w-3" />
                    </button>
                  )}
                  {price !== null && (
                    <button onClick={() => setPrice(null)} className="text-xs bg-ink text-ink-foreground rounded-full px-3 py-1.5 inline-flex items-center gap-1.5">
                      {priceRanges[price].label} <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="text-sm text-muted-foreground">Showing <strong className="text-foreground tabular-nums">{filtered.length}</strong> products</div>
              <div className="hidden lg:flex items-center gap-3">
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm bg-card border border-border rounded-md px-3 h-9">
                  <option value="popular">Sort: Most Popular</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
                <div className="flex border border-border rounded-md overflow-hidden">
                  <button onClick={() => setView("grid")} className={`px-2 h-9 ${view === "grid" ? "bg-ink text-ink-foreground" : ""}`}><Grid3x3 className="h-4 w-4" /></button>
                  <button onClick={() => setView("list")} className={`px-2 h-9 ${view === "list" ? "bg-ink text-ink-foreground" : ""}`}><List className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            {view === "grid" ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((p) => <ProductCard key={p.id} p={p} onAdd={() => add(p)} />)}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((p) => (
                  <div key={p.id} className="flex gap-4 bg-card rounded-lg overflow-hidden shadow-card">
                    <Link to="/shop/$productId" params={{ productId: p.id }} className="w-32 sm:w-48 aspect-square bg-muted shrink-0">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                    </Link>
                    <div className="p-4 flex-1 min-w-0">
                      <div className="text-[10px] font-semibold tracking-wider uppercase text-gold">{p.category}</div>
                      <Link to="/shop/$productId" params={{ productId: p.id }} className="block font-semibold mt-1 hover:text-gold">{p.name}</Link>
                      <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{p.description}</p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="text-gold font-bold text-lg tabular-nums">{formatNaira(p.price)}</div>
                        <Button variant="ink" size="sm" onClick={() => add(p)}>Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-16 bg-card rounded-lg shadow-card">
                <div className="text-muted-foreground">No products match your filters.</div>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => { setCat("All Products"); setPrice(null); setQ(""); }}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
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
      <div className="p-3 sm:p-4">
        <div className="text-[9px] font-semibold tracking-wider uppercase text-gold">{p.category}</div>
        <Link to="/shop/$productId" params={{ productId: p.id }} className="block font-semibold mt-0.5 text-sm hover:text-gold line-clamp-1">{p.name}</Link>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="text-gold font-bold text-sm tabular-nums">{formatNaira(p.price)}</div>
          <Button variant="ink" size="sm" onClick={onAdd}>Add</Button>
        </div>
      </div>
    </div>
  );
}
