import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Upload, Instagram, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, FloatingWhatsApp, PageHero } from "@/components/site/SiteFooter";
import { waLink, PHONE_DISPLAY, PHONE_TEL, INSTAGRAM_URL, INSTAGRAM_HANDLE, EMAIL } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Comage Adini Creativity" },
      { name: "description", content: "Call or WhatsApp +234 806 240 6073. Have a question, want to place an order, or need a custom quote? We'd love to hear from you." },
      { property: "og:title", content: "Contact — Comage Adini Creativity" },
      { property: "og:description", content: "Reach out for orders, quotes and custom enquiries." },
    ],
  }),
  component: ContactPage,
});

const interests = ["Printing", "Signage", "Custom Gifts", "Frames & Art", "Custom Order", "Other"] as const;

function ContactPage() {
  const [interest, setInterest] = useState<string>("Printing");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
  }

  return (
    <>
      <SiteHeader dark />
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Talk"
        description="Have a question, want to place an order, or need a custom quote? We'd love to hear from you."
        breadcrumb="Contact"
        compact
      />

      {/* Quick contact strip */}
      <section className="bg-gold text-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center sm:justify-start gap-3 group">
            <div className="h-10 w-10 rounded-full bg-ink text-gold grid place-items-center shrink-0"><Phone className="h-4 w-4" /></div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">Call Now</div>
              <div className="font-semibold tabular-nums group-hover:underline">{PHONE_DISPLAY}</div>
            </div>
          </a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center justify-center sm:justify-start gap-3 group">
            <div className="h-10 w-10 rounded-full bg-emerald text-white grid place-items-center shrink-0"><MessageCircle className="h-4 w-4" /></div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">WhatsApp</div>
              <div className="font-semibold tabular-nums group-hover:underline">{PHONE_DISPLAY}</div>
            </div>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center sm:justify-start gap-3 group">
            <div className="h-10 w-10 rounded-full bg-ink text-gold grid place-items-center shrink-0"><Instagram className="h-4 w-4" /></div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">Instagram</div>
              <div className="font-semibold group-hover:underline">{INSTAGRAM_HANDLE}</div>
            </div>
          </a>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, title: "Our Location", body: "Isolo, Lagos State, Nigeria" },
                { icon: Clock, title: "Working Hours", body: "Mon – Sat: 8am – 7pm\nSunday: 10am – 4pm" },
              ].map((c) => (
                <div key={c.title} className="bg-card rounded-lg p-4 shadow-card">
                  <div className="h-9 w-9 rounded bg-gold text-ink grid place-items-center mb-3"><c.icon className="h-4 w-4" /></div>
                  <div className="font-semibold text-sm">{c.title}</div>
                  <div className="text-xs text-muted-foreground whitespace-pre-line mt-1">{c.body}</div>
                </div>
              ))}
            </div>

            <a href={`tel:${PHONE_TEL}`} className="block bg-card rounded-lg p-4 shadow-card hover:shadow-elegant transition-shadow">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded bg-gold text-ink grid place-items-center shrink-0"><Phone className="h-4 w-4" /></div>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold tracking-wider uppercase text-foreground/60">Call us directly</div>
                  <div className="font-semibold text-sm tabular-nums mt-0.5 truncate">{PHONE_DISPLAY}</div>
                </div>
              </div>
            </a>

            <a href={`mailto:${EMAIL}`} className="block bg-card rounded-lg p-4 shadow-card hover:shadow-elegant transition-shadow">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded bg-gold text-ink grid place-items-center shrink-0"><Mail className="h-4 w-4" /></div>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold tracking-wider uppercase text-foreground/60">Email us</div>
                  <div className="font-semibold text-sm mt-0.5 truncate">{EMAIL}</div>
                </div>
              </div>
            </a>

            <div className="bg-emerald text-white rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded bg-gold text-ink grid place-items-center"><MessageCircle className="h-4 w-4" /></div>
                <div className="font-semibold">Fastest Response</div>
              </div>
              <div className="text-xs opacity-80 mb-3">Usually replies within minutes</div>
              <p className="text-sm opacity-90">For quick orders, quotes and enquiries, WhatsApp is the fastest way to reach us.</p>
              <Button asChild variant="hero" size="lg" className="mt-4 w-full">
                <a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle /> Chat on WhatsApp</a>
              </Button>
            </div>

            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="block rounded-lg p-5 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white">
              <div className="flex items-center gap-2 mb-2">
                <Instagram className="h-5 w-5" />
                <div className="font-semibold">Follow on Instagram</div>
              </div>
              <p className="text-sm opacity-95">{INSTAGRAM_HANDLE} — see our latest work, behind-the-scenes and customer features.</p>
            </a>
          </aside>

          {/* Form */}
          <form onSubmit={submit} className="bg-card rounded-lg p-6 md:p-8 shadow-card">
            <h2 className="font-display text-2xl md:text-3xl font-bold">Send Us a Message</h2>
            <p className="text-sm text-muted-foreground mt-1">Fill in the form below and we'll respond within 24 hours.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Field label="Full Name"><Input placeholder="e.g. Adaeze Okonkwo" required /></Field>
              <Field label="Email Address"><Input type="email" placeholder="your@email.com" required /></Field>
              <Field label="Phone / WhatsApp"><Input placeholder={PHONE_DISPLAY} /></Field>
              <Field label="Subject">
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                  <option>Select a subject…</option>
                  <option>New order</option><option>Custom quote</option><option>Existing order</option><option>General enquiry</option>
                </select>
              </Field>
            </div>
            <div className="mt-4">
              <div className="text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2">Service Interest</div>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <button key={i} type="button" onClick={() => setInterest(i)}
                    className={`px-3 h-8 rounded text-xs font-semibold tracking-wider uppercase border transition-colors ${interest === i ? "bg-ink text-ink-foreground border-ink" : "border-border hover:bg-muted"}`}>
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Message" className="mt-4">
              <Textarea rows={5} placeholder="Describe your project, order, or question in detail…" />
            </Field>
            <div className="mt-4 border border-dashed border-border rounded-md p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded bg-muted grid place-items-center"><Upload className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-semibold">Attach Design <span className="text-muted-foreground font-normal">(Optional)</span></div>
                  <div className="text-xs text-muted-foreground">JPG, PNG, PDF up to 10MB.</div>
                </div>
              </div>
              <Button type="button" variant="outline" size="sm">Browse</Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button type="submit" variant="hero" size="lg"><Send /> Send Message</Button>
              <Button asChild type="button" variant="whatsapp" size="lg">
                <a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle /> Or WhatsApp Us</a>
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Map */}
      <section className="bg-background pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-72 md:h-96 rounded-lg overflow-hidden bg-muted">
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.30%2C6.53%2C3.36%2C6.56&amp;layer=mapnik"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-ink px-4 py-2 rounded-md font-semibold text-sm shadow-elegant pointer-events-none">
              <MapPinned className="inline h-4 w-4 mr-1" /> Comage Adini Creativity · Isolo, Lagos
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 bg-white text-ink px-4 py-2 rounded-md text-xs font-semibold shadow-card hover:bg-gold">
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-1.5">{label}</div>
      {children}
    </label>
  );
}
