import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Eye, MessageCircle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { orders, formatNaira, waLink } from "@/lib/data";
import { StatusBadge } from "./admin.index";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersPage,
});

const statuses = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"] as const;

function OrdersPage() {
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [q, setQ] = useState("");
  const filtered = orders.filter((o) =>
    (status === "All" || o.status === status) &&
    (!q || o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Orders</h1>
          <p className="text-sm text-muted-foreground">Manage and track customer orders</p>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-card">
        <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by order ID or customer…" className="pl-9" />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {statuses.map((s) => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-3 h-9 rounded text-xs font-semibold tracking-wider uppercase whitespace-nowrap ${status === s ? "bg-ink text-ink-foreground" : "hover:bg-muted text-foreground/70"}`}>
                {s}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Export</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              <tr>
                <Th>Order</Th><Th>Customer</Th><Th>Date</Th><Th>Items</Th><Th>Total</Th><Th>Status</Th><Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30">
                  <Td><span className="font-semibold">{o.id}</span></Td>
                  <Td>
                    <div className="font-semibold">{o.customer}</div>
                    <div className="text-xs text-muted-foreground">{o.email}</div>
                  </Td>
                  <Td className="text-muted-foreground">{o.date}</Td>
                  <Td>{o.items}</Td>
                  <Td className="font-semibold">{formatNaira(o.total)}</Td>
                  <Td><StatusBadge status={o.status} /></Td>
                  <Td>
                    <div className="flex gap-1.5">
                      <Button variant="outline" size="icon" title="View"><Eye className="h-4 w-4" /></Button>
                      <Button asChild variant="whatsapp" size="icon" title="WhatsApp">
                        <a href={waLink(`Order ${o.id}`)} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /></a>
                      </Button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between border-t border-border text-xs text-muted-foreground">
          <div>Showing {filtered.length} of {orders.length} orders</div>
          <div className="flex gap-1">
            <button className="h-8 px-3 rounded border border-border hover:bg-muted">Previous</button>
            <button className="h-8 px-3 rounded bg-ink text-ink-foreground">1</button>
            <button className="h-8 px-3 rounded border border-border hover:bg-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) { return <th className="text-left px-4 py-3">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <td className={`px-4 py-3 ${className}`}>{children}</td>; }
