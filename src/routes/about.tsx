import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Clock, Heart, MapPin, MessageCircle, ShoppingBag, Send, Sparkles, Star, Quote, Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, WhatsAppBanner, FloatingWhatsApp, Eyebrow } from "@/components/site/SiteFooter";
import { timeline, stats, waLink, PHONE_DISPLAY, PHONE_TEL, INSTAGRAM_URL } from "@/lib/data";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Comage Adini Creativity" },
      { name: "description", content: "Born in Lagos, built for Nigeria. A decade of crafting premium frames, gifts and creative work — by Adewale Adini." },
      { property: "og:title", content: "About — Comage Adini Creativity" },
      { property: "og:description", content: "Born in Lagos, built for Nigeria. A decade of premium creative craftsmanship by Adewale Adini." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Award, title: "Uncompromising Quality", body: "Every project that leaves our workshop is inspected to meet exacting standards. Premium materials only." },
  { icon: Clock, title: "Fast Turnaround", body: "We understand urgency. Streamlined production means faster delivery without sacrificing craft." },
  { icon: Heart, title: "Made with Care", body: "Every frame, print and gift is handled personally — from initial concept to final delivery." },
  { icon: MapPin, title: "Nationwide Reach", body: "Based in Lagos — serving customers in 36 states with reliable logistics partners." },
];

const brands = ["First Bank Nigeria", "Access Bank", "MoonPie Nigeria", "Wasse Fashion Africa", "Unilag", "Lagos State Government"];

function AboutPage() {
  return (
    <>
      <SiteHeader dark />

      {/* Story hero — reduced */}
      <section className="bg-ink text-ink-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.13_82/0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-14 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none w-full rounded-lg overflow-hidden shadow-elegant">
            <img src={founderImg} alt="Adewale Adini, founder of Comage Adini Creativity" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-gold/95 text-ink p-4 rounded-md shadow-elegant">
              <Quote className="h-5 w-5 mb-2 opacity-60" />
              <p className="text-sm italic font-display leading-snug">"We don't just make products — we make moments people remember forever."</p>
              <div className="text-xs font-semibold mt-2 tracking-wider">— ADEWALE ADINI</div>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">Our Story</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-[1.05]">
              Born in Lagos. <span className="gold-shimmer">Built by Hand.</span>
            </h1>
            <p className="text-white/75 mt-4 max-w-xl">
              Comage Adini Creativity was founded in 2014 in Isolo, Lagos by <strong className="text-gold">Adewale Adini</strong> — a one-man workshop fuelled by a love for craft and a vision to bring premium creative services to everyday Nigerians.
            </p>
            <p className="text-white/65 mt-3 max-w-xl text-sm">
              Over a decade later, it's still a deeply personal operation. Every order is touched by Adewale himself — frames, prints, gifts and signage delivered to hundreds of satisfied clients across 36 states.
            </p>
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="stat-number text-3xl md:text-4xl text-gold">{s.value}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase opacity-70 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the founder */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Eyebrow>The Craftsman</Eyebrow>
            <h2 className="font-display text-2xl md:text-4xl font-bold">Meet Adewale Adini</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm">
              Founder, designer, master framer and the personal hand behind every Comage Adini piece.
            </p>
          </div>

          <div className="mt-10 bg-card rounded-2xl shadow-elegant overflow-hidden grid grid-cols-1 md:grid-cols-[260px_1fr]">
            <div className="aspect-square md:aspect-auto bg-muted relative overflow-hidden">
              <img src={founderImg} alt="Adewale Adini" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold">Owner & Founder</div>
              <div className="font-display text-2xl md:text-3xl font-bold mt-1">Adewale Adini</div>
              <div className="text-sm text-muted-foreground mt-0.5">Creative Director · Master Framer · Lagos, NG</div>

              <div className="flex gap-1 text-gold mt-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                <span className="text-xs text-muted-foreground ml-2">12+ years building Comage Adini</span>
              </div>

              <p className="text-sm text-foreground/80 mt-4 leading-relaxed">
                What started as a one-man press in Isolo has grown into a trusted name in custom framing,
                creative gifts and bespoke print across Nigeria. Adewale still personally oversees every order — because
                quality, to him, is a signature, not a promise.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild variant="whatsapp" size="sm">
                  <a href={waLink("Hi Adewale, I'd like to discuss a project.")} target="_blank" rel="noreferrer">
                    <MessageCircle /> WhatsApp Adewale
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={`tel:${PHONE_TEL}`}><Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}</a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram className="h-3.5 w-3.5" /> Instagram</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>Why Choose Us</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold">Our Core Values</h2>
          <p className="text-muted-foreground mt-2 text-sm">The principles that guide every project we take on</p>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-lg p-5 shadow-card hover:shadow-elegant transition-shadow">
              <div className="h-10 w-10 rounded-md bg-gold/15 text-gold grid place-items-center mb-3"><v.icon className="h-5 w-5" /></div>
              <div className="font-semibold">{v.title}</div>
              <p className="text-sm text-muted-foreground mt-2">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>Our Journey</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold">A Decade of Creativity</h2>
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-10 relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-white/15 sm:-translate-x-1/2" />
          {timeline.map((t, i) => (
            <div key={t.year} className="relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8 mb-6">
              <div className={`${i % 2 ? "sm:col-start-2" : "sm:text-right"}`}>
                <div className="bg-card text-foreground rounded-md p-4 shadow-card">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-1 tabular-nums">{t.year}</div>
                  <div className="font-semibold">{t.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{t.body}</p>
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 top-5 sm:-translate-x-1/2 h-3 w-3 bg-gold rounded-sm shadow-elegant" />
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="bg-cream py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow>Trusted By</Eyebrow>
          <h2 className="font-display text-xl md:text-2xl font-bold">Brands & Organisations We've Worked With</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {brands.map((b) => (
              <div key={b} className="px-4 py-2 bg-card border border-border rounded text-xs font-semibold tracking-wider uppercase shadow-card">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="bg-emerald text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-2 opacity-80 flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Our Mission
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold max-w-2xl">To make premium creative services accessible to every Nigerian — one beautiful piece at a time.</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/shop"><ShoppingBag /> Shop Products</Link></Button>
            <Button asChild variant="outline-light" size="lg">
              <a href={waLink()} target="_blank" rel="noreferrer"><Send /> Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>

      <WhatsAppBanner />
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
