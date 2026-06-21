import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Send, Check, Plus, Minus, Printer, Palette, Gift, Frame, ArrowRight, Sparkles, Clock, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, WhatsAppBanner, FloatingWhatsApp, PageHero, Eyebrow } from "@/components/site/SiteFooter";
import { services, waLink } from "@/lib/data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Comage Adini Creativity" },
      { name: "description", content: "Printing, signage, custom gifts and bespoke frames — creative excellence for individuals and businesses across Nigeria." },
    ],
  }),
  component: ServicesPage,
});

const faqs = [
  { q: "How long does delivery take?", a: "Lagos orders typically take 1–2 business days. Nationwide delivery takes 3–7 days depending on location." },
  { q: "Can I send my own design?", a: "Yes — upload artwork via WhatsApp or our contact form. We accept PDF, AI, PSD and high-res images." },
  { q: "Do you offer bulk discounts?", a: "Yes. Orders above ₦100,000 or bulk corporate orders receive tiered pricing." },
  { q: "What payment methods do you accept?", a: "Bank transfer, Paystack, Flutterwave and POS on delivery within Lagos." },
  { q: "Can I see a sample before mass production?", a: "Absolutely. We provide proofs and prototypes for bulk and corporate orders before final production." },
];

const iconMap: Record<string, typeof Printer> = {
  printing: Printer,
  signage: Palette,
  gifts: Gift,
  frames: Frame,
};

function ServicesPage() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <SiteHeader dark />
      <PageHero
        eyebrow="What We Offer"
        title="Our Services"
        description="From printing to custom frames, signage to bespoke gifts — creative excellence for individuals and businesses across Nigeria."
        breadcrumb="Services"
        compact
      />

      {/* Service summary chips */}
      <section className="bg-cream border-b border-border py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((s) => {
            const Icon = iconMap[s.id] ?? Frame;
            return (
              <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-card hover:shadow-elegant transition-shadow group">
                <div className="h-10 w-10 rounded-md bg-gold/15 text-gold grid place-items-center group-hover:bg-gold group-hover:text-ink transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-gold tabular-nums">{s.number}</div>
                  <div className="font-semibold text-sm truncate">{s.title}</div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            const bg = s.accent === "emerald" ? "bg-emerald text-white" : "bg-ink text-ink-foreground";
            const Icon = iconMap[s.id] ?? Frame;
            return (
              <div key={s.id} id={s.id} className="grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden shadow-elegant scroll-mt-24">
                <div className={`${reverse ? "lg:order-2" : ""} relative aspect-[4/3] lg:aspect-auto min-h-[260px] bg-muted`}>
                  <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ink/50 via-transparent to-transparent" />
                  <div className="absolute top-5 right-5 stat-number text-5xl text-white/35 tabular-nums">{s.number}</div>
                </div>
                <div className={`${bg} p-7 md:p-9 flex flex-col justify-center relative overflow-hidden`}>
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-md bg-gold text-ink grid place-items-center"><Icon className="h-5 w-5" /></div>
                      <div className="text-[10px] font-bold tracking-[0.25em] uppercase opacity-70 tabular-nums">Service · {s.number}</div>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold">{s.title}</h3>
                    <p className="opacity-80 text-sm mt-2">{s.tag}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 text-sm">
                      {s.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 opacity-95">
                          <Check className="h-4 w-4 text-gold shrink-0" /> {f}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Button asChild variant="hero" size="lg"><Link to="/contact">Get a Quote <ArrowRight className="h-4 w-4" /></Link></Button>
                      <Button asChild variant="outline-light" size="lg">
                        <a href={waLink(`Hi, I'd like a quote for ${s.title}.`)} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp Us</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why us strip */}
      <section className="bg-cream py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Sparkles, t: "Premium Craft", s: "Hand-finished detail" },
            { icon: Clock, t: "Fast Turnaround", s: "Quotes in under 24h" },
            { icon: Shield, t: "Quality Guarantee", s: "We stand by every piece" },
            { icon: Truck, t: "Nationwide Delivery", s: "All 36 states served" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="bg-card rounded-lg p-4 shadow-card flex items-start gap-3">
              <div className="h-10 w-10 rounded-md bg-emerald/15 text-emerald-deep grid place-items-center shrink-0"><Icon className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="font-semibold text-sm">{t}</div>
                <div className="text-xs text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>Simple Process</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-1.5 text-sm">Ordering is easy — first contact to final delivery in 4 steps</p>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {[
            { title: "Reach Out", body: "Contact us via WhatsApp, call or enquiry form." },
            { title: "Get a Quote", body: "We send a detailed quote within 24 hours." },
            { title: "Approve & Pay", body: "Confirm the design and make a deposit." },
            { title: "Delivered", body: "We deliver nationwide. Lagos pickup available." },
          ].map((s, i) => (
            <div key={s.title} className="bg-card rounded-lg p-5 shadow-card relative">
              <div className="stat-number text-5xl text-gold/30 absolute top-2 right-3 tabular-nums">0{i + 1}</div>
              <div className="h-9 w-9 rounded-md bg-ink text-ink-foreground grid place-items-center font-display text-sm font-bold mb-3 tabular-nums">{i + 1}</div>
              <div className="font-semibold">{s.title}</div>
              <p className="text-sm text-muted-foreground mt-1.5">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">Common Questions</div>
            <h2 className="font-display text-2xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-3 text-sm">Can't find your answer? Reach out — we're happy to help.</p>
            <Button asChild variant="whatsapp" size="lg" className="mt-5">
              <a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle /> Ask via WhatsApp</a>
            </Button>
          </div>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={f.q} className="bg-card rounded-lg shadow-card overflow-hidden">
                <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-semibold text-sm pr-3">{f.q}</span>
                  <span className="h-7 w-7 rounded bg-gold text-ink grid place-items-center shrink-0">{open === i ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}</span>
                </button>
                {open === i && <div className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppBanner />
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
