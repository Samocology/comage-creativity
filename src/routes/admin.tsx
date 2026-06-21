import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, ShoppingCart, Package, Tags, Settings, Bell, Search, Menu, X, User2, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Comage Adini" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart, exact: false },
  { to: "/admin/products", label: "Products", icon: Package, exact: false },
  { to: "/admin/categories", label: "Categories", icon: Tags, exact: false },
  { to: "/admin/settings", label: "Settings", icon: Settings, exact: false },
] as const;

function AdminLayout() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="h-screen flex bg-cream overflow-hidden">
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-ink/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar — fixed, never scrolls with main */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen transform transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} lg:transform-none`}>
        <div className="px-5 h-16 border-b border-sidebar-border flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-gold to-[oklch(0.72_0.13_70)] grid place-items-center font-display font-bold text-ink shadow-elegant">C</div>
            <div>
              <div className="font-display text-sm font-bold tracking-tight text-gold leading-none">COMAGE ADINI</div>
              <div className="text-[9px] tracking-[0.3em] uppercase opacity-60 mt-1">Admin Panel</div>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden p-1 text-sidebar-foreground/70"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-sidebar-foreground/40 px-3 py-2">Main</div>
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${active ? "bg-gold text-ink font-semibold shadow-card" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
              >
                <n.icon className="h-4 w-4 shrink-0" /> {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Profile button (replaces back to site) */}
        <div className="p-3 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-sidebar-accent text-left transition-colors">
              <div className="h-9 w-9 rounded-full bg-gold text-ink grid place-items-center font-bold text-sm shrink-0">A</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">Adewale Adini</div>
                <div className="text-[10px] text-sidebar-foreground/60 truncate">Administrator</div>
              </div>
              <ChevronDown className="h-4 w-4 text-sidebar-foreground/60 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin/settings" className="cursor-pointer"><User2 className="h-4 w-4 mr-2" /> Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/settings" className="cursor-pointer"><Settings className="h-4 w-4 mr-2" /> Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/" className="cursor-pointer"><LogOut className="h-4 w-4 mr-2" /> View Site</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2"><Menu className="h-5 w-5" /></button>
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders, products, customers…" className="pl-9 bg-muted/50 border-transparent" />
          </div>
          <div className="flex items-center gap-2">
            <button className="relative h-9 w-9 rounded-md hover:bg-muted grid place-items-center">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-gold rounded-full" />
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-3 ml-1 border-l border-border">
              <div className="h-8 w-8 rounded-full bg-gold text-ink grid place-items-center text-sm font-bold">A</div>
              <div className="hidden md:block">
                <div className="text-sm font-semibold leading-tight">Adewale Adini</div>
                <div className="text-[10px] text-muted-foreground leading-tight tracking-wider uppercase">Administrator</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
