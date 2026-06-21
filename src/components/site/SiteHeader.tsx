import { Link } from "@tanstack/react-router";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { CartSheet } from "@/components/site/CartSheet";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = dark;
  const surface = isDark
    ? `${scrolled ? "bg-ink/85 backdrop-blur-md" : "bg-ink"} border-b border-white/10 text-ink-foreground`
    : `${scrolled ? "bg-background/90 backdrop-blur-md" : "bg-background"} border-b border-border text-foreground`;
  const linkBase = isDark ? "text-white/75 hover:text-gold" : "text-foreground/70 hover:text-gold";
  const iconBtn = isDark
    ? "text-white/85 hover:text-gold hover:bg-white/5"
    : "text-foreground/80 hover:text-gold hover:bg-muted";

  return (
    <header className={`${surface} sticky top-0 z-40 transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 md:h-[68px] flex items-center justify-between gap-4">
        <Link to="/" className="leading-tight flex items-center gap-2.5 shrink-0">
          <div className="h-9 w-9 rounded-md bg-gradient-to-br from-gold to-[oklch(0.72_0.13_70)] grid place-items-center font-display font-bold text-ink text-base shadow-elegant">
            C
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-[15px] font-bold tracking-tight text-gold leading-none">COMAGE ADINI</div>
            <div className="text-[9px] tracking-[0.35em] uppercase opacity-60 mt-1">Creativity</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-[12px] font-medium tracking-[0.15em] uppercase">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`${linkBase} px-3 py-2 rounded-md transition-colors`}
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className={`relative h-10 w-10 grid place-items-center rounded-md transition-colors ${iconBtn}`}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center text-[10px] font-bold rounded-full bg-gold text-ink tabular-nums">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden h-10 w-10 grid place-items-center rounded-md ${iconBtn}`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`lg:hidden ${isDark ? "bg-ink" : "bg-background"} border-t ${isDark ? "border-white/10" : "border-border/40"}`}>
          <div className="px-4 py-3 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`${linkBase} text-sm font-medium tracking-wider uppercase py-3 border-b ${isDark ? "border-white/5" : "border-border/40"} last:border-0`}
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <CartSheet />
    </header>
  );
}
