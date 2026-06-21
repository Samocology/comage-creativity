import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Maximize2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, WhatsAppBanner, FloatingWhatsApp, PageHero } from "@/components/site/SiteFooter";
import { portfolio, stats, waLink } from "@/lib/data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Comage Adini Creativity" },
      { name: "description", content: "Curated showcase of frames, signage, artworks and creative projects delivered across Nigeria." },
    ],
  }),
  component: PortfolioPage,
});

const filters = ["All Work", "Frames", "Signage", "Printing", "Artworks", "Gifts & Souvenirs", "Custom Orders"] as const;

function PortfolioPage() {
  const [f, setF] = useState<(typeof filters)[number]>("All Work");
  const items = f === "All Work" ? portfolio : portfolio.filter((p) => p.category === f);

  return (
    <>
      <SiteHeader dark />
      <PageHero
        eyebrow="Our Work"
        title="Portfolio"
        description="A curated showcase of frames, signage, artworks and creative projects delivered across Nigeria."
        breadcrumb="Portfolio"
        compact
      />

      {/* Stats — refined typography */}
      <section className="bg-gradient-to-r from-gold via-[oklch(0.82_0.13_75)] to-gold py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-ink">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center md:text-left md:px-6 ${i > 0 ? "md:border-l md:border-ink/15" : ""}`}>
              <div className="stat-number text-3xl sm:text-4xl md:text-5xl leading-none">{s.value}</div>
              <div className="text-[10px] font-semibold tracking-[0.25em] uppercase mt-2 opacity-75">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-b border-border bg-background sticky top-16 md:top-[68px] z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex gap-1 overflow-x-auto text-xs font-semibold tracking-wider uppercase">
          {filters.map((c) => (
            <button
              key={c}
              onClick={() => setF(c)}
              className={`whitespace-nowrap px-3 py-2 rounded-md transition-colors ${f === c ? "bg-ink text-ink-foreground" : "text-foreground/60 hover:text-foreground hover:bg-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {items.map((p) => {
            const span =
              p.span === "large" ? "col-span-2 row-span-2" :
              p.span === "tall" ? "row-span-2" :
              p.span === "wide" ? "col-span-2" : "";
            return (
              <div key={p.id} className={`group relative overflow-hidden rounded-lg bg-muted ${span}`}>
                <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                <div className="absolute top-3 left-3 bg-gold text-ink text-[9px] font-bold tracking-wider px-2 py-1 rounded uppercase">{p.category}</div>
                <button className="absolute top-3 right-3 h-7 w-7 rounded bg-white/90 text-ink grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 className="h-3.5 w-3.5" /></button>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 text-white">
                  <div className="font-semibold text-sm">{p.title}</div>
                  <div className="text-xs opacity-75 mt-0.5 line-clamp-1">{p.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-cream py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-2">Commission a Project</div>
            <h3 className="font-display text-2xl md:text-3xl font-bold">Inspired? Let's create something for you.</h3>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm">Every project in this portfolio started with a conversation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="ink" size="lg"><Link to="/contact"><Send /> Request a Quote</Link></Button>
            <Button asChild variant="hero" size="lg"><a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle /> Chat on WhatsApp</a></Button>
          </div>
        </div>
      </section>

      <WhatsAppBanner />
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
