import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, DollarSign, ShoppingCart, Package, Users, ArrowUpRight, AlertCircle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { orders, products, revenueData, formatNaira } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const kpis = [
    { label: "Total Revenue", value: formatNaira(3865000), delta: "+12.5%", deltaLabel: "from last month", icon: DollarSign, accent: "from-gold/20 to-gold/5", iconBg: "bg-gold text-ink" },
    { label: "Orders", value: "284", delta: "+8.2%", deltaLabel: "from last month", icon: ShoppingCart, accent: "from-emerald/15 to-emerald/5", iconBg: "bg-emerald text-white" },
    { label: "Products", value: String(products.length), delta: "+3", deltaLabel: "this week", icon: Package, accent: "from-blue-100 to-transparent", iconBg: "bg-blue-600 text-white" },
    { label: "Customers", value: "1,248", delta: "+15.1%", deltaLabel: "from last month", icon: Users, accent: "from-purple-100 to-transparent", iconBg: "bg-purple-600 text-white" },
  ];
  const topProducts = products.slice(0, 5).map((p, i) => ({ ...p, sold: 80 - i * 12 }));
  const lowStock = products.filter((p) => p.stock < 15);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Adewale. Here's what's happening today.</p>
        </div>
        <div className="text-xs text-muted-foreground">Last updated: Just now</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className={`relative bg-card rounded-xl p-5 shadow-card overflow-hidden border border-border/60`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${k.accent} opacity-60 pointer-events-none`} />
            <div className="relative">
              <div className="flex items-start justify-between gap-2">
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">{k.label}</div>
                <div className={`h-9 w-9 rounded-lg grid place-items-center shadow-card ${k.iconBg}`}>
                  <k.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="stat-number text-3xl md:text-4xl mt-3 leading-none">{k.value}</div>
              <div className="text-xs mt-2.5 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald/15 text-emerald-deep font-semibold tabular-nums">
                  <TrendingUp className="h-3 w-3" /> {k.delta}
                </span>
                <span className="text-muted-foreground">{k.deltaLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card rounded-xl p-5 shadow-card border border-border/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">Revenue (Last 6 months)</div>
              <div className="text-xs text-muted-foreground">Monthly revenue overview</div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={revenueData}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => "₦" + (v / 1000) + "k"} />
                <Tooltip formatter={(v: number) => formatNaira(v)} contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-gold)" strokeWidth={3} dot={{ fill: "var(--color-gold)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border/60">
          <div className="font-semibold mb-1">Top Products</div>
          <div className="text-xs text-muted-foreground mb-4">By units sold this month</div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={topProducts} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={120} fontSize={11} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }} />
                <Bar dataKey="sold" fill="var(--color-gold)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card border border-border/60">
          <div className="p-5 flex items-center justify-between border-b border-border">
            <div>
              <div className="font-semibold">Recent Orders</div>
              <div className="text-xs text-muted-foreground">Latest customer orders</div>
            </div>
            <Link to="/admin/orders" className="text-xs font-semibold tracking-wider uppercase text-gold flex items-center gap-1 hover:underline">View all <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <div className="divide-y divide-border">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold text-sm tabular-nums">{o.id}</div>
                  <div className="text-xs text-muted-foreground truncate">{o.customer} · {o.items} items</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm tabular-nums">{formatNaira(o.total)}</div>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border/60">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <div className="font-semibold">Low Stock Alert</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Products running low</div>
          </div>
          <div className="divide-y divide-border">
            {lowStock.length === 0 && <div className="p-5 text-sm text-muted-foreground">All products in stock.</div>}
            {lowStock.map((p) => (
              <div key={p.id} className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-muted overflow-hidden shrink-0">
                  <img src={p.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.category}</div>
                </div>
                <div className="text-xs font-semibold text-destructive tabular-nums">{p.stock} left</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Delivered: "bg-emerald/15 text-emerald-deep",
    Processing: "bg-gold/20 text-ink",
    Shipped: "bg-blue-100 text-blue-700",
    Pending: "bg-muted text-foreground/60",
    Cancelled: "bg-destructive/15 text-destructive",
  };
  return <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded ${map[status] || "bg-muted"}`}>{status}</span>;
}
