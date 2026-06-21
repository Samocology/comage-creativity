import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink, PHONE_DISPLAY, PHONE_TEL, INSTAGRAM_URL, EMAIL } from "@/lib/data";

export function WhatsAppBanner() {
  return (
    <section className="bg-emerald text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-9 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-80">Quick & Easy</div>
          <p className="font-display text-xl md:text-2xl mt-2 max-w-2xl">
            Prefer to order directly? Chat with us on WhatsApp for instant quotes and custom orders.
          </p>
        </div>
        <Button asChild variant="hero" size="lg">
          <a href={waLink()} target="_blank" rel="noreferrer">
            <MessageCircle /> Chat on WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-xl font-bold tracking-tight text-gold">COMAGE ADINI</div>
          <div className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-4">Creativity</div>
          <p className="text-sm text-white/70 mb-6 max-w-xs">
            Premium gifts, frames, artworks, and creative services. Based in Lagos, serving Nigeria nationwide.
          </p>
          <div className="flex gap-3">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-md bg-white/5 hover:bg-gold hover:text-ink grid place-items-center transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-9 w-9 rounded-md bg-white/5 hover:bg-emerald hover:text-white grid place-items-center transition-colors">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={`tel:${PHONE_TEL}`} aria-label="Phone" className="h-9 w-9 rounded-md bg-white/5 hover:bg-gold hover:text-ink grid place-items-center transition-colors">
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Quick Links</div>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Shop</Link></li>
            <li><Link to="/portfolio" className="hover:text-gold">Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Shop Categories</div>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><Link to="/shop" className="hover:text-gold">Picture Frames</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Gift Items</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Artworks</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Printing Services</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Signage</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Custom Orders</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Contact Us</div>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" /> Isolo, Lagos State, Nigeria</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold mt-0.5 shrink-0" /> <a href={`tel:${PHONE_TEL}`} className="hover:text-gold tabular-nums">{PHONE_DISPLAY}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold mt-0.5 shrink-0" /> <a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a></li>
            <li className="flex gap-2"><Instagram className="h-4 w-4 text-gold mt-0.5 shrink-0" /> <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-gold">@ceehay_creativity</a></li>
          </ul>
          <Button asChild variant="hero" size="default" className="mt-5">
            <a href={waLink()} target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Comage Adini Creativity. All rights reserved.</div>
          <div>Isolo, Lagos · Nigeria</div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-emerald text-white shadow-elegant grid place-items-center hover:bg-emerald-deep transition-colors"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase ${light ? "text-gold" : "text-gold"} mb-3`}>
      <span className="h-px w-8 bg-gold/50" /> {children} <span className="h-px w-8 bg-gold/50" />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  breadcrumb?: string;
  compact?: boolean;
}) {
  return (
    <section className="bg-ink text-ink-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.13_82/0.12),transparent_60%)]" />
      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${compact ? "py-10 md:py-12" : "py-12 md:py-16"}`}>
        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
              <span className="h-px w-8 bg-gold/60" /> {eyebrow}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-[1.05]">{title}</h1>
            {description && <p className="mt-3 text-white/70 max-w-2xl text-sm md:text-base">{description}</p>}
          </div>
          {breadcrumb && (
            <div className="text-xs text-white/60 mt-2">
              <Link to="/" className="hover:text-gold">Home</Link>
              <span className="mx-2 text-gold">›</span>
              <span className="text-gold">{breadcrumb}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
