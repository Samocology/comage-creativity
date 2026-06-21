import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, Lock, Minus, Plus, ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, FloatingWhatsApp } from "@/components/site/SiteFooter";
import { formatNaira, waLink } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Comage Adini Creativity" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CheckoutPage,
});

const SHIPPING_LAGOS = 2500;
const SHIPPING_NATIONAL = 5500;

function CheckoutPage() {
  const { items, subtotal, setQty, remove, clear, count } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shipping, setShipping] = useState<"lagos" | "national">("lagos");
  const [payment, setPayment] = useState<"transfer" | "card" | "whatsapp">("transfer");
  const [placed, setPlaced] = useState<string | null>(null);
  const navigate = useNavigate();

  const shippingFee = items.length ? (shipping === "lagos" ? SHIPPING_LAGOS : SHIPPING_NATIONAL) : 0;
  const total = subtotal + shippingFee;

  function placeOrder() {
    const id = "ORD-" + Math.floor(Math.random() * 9000 + 1000);
    setPlaced(id);
    clear();
  }

  if (placed) {
    return (
      <>
        <SiteHeader />
        <section className="min-h-[70vh] grid place-items-center bg-cream py-16 px-4">
          <div className="max-w-md w-full bg-card rounded-xl shadow-elegant p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-emerald/15 text-emerald grid place-items-center mx-auto mb-5">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="font-display text-2xl font-bold">Order Confirmed!</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Your order <span className="font-semibold text-foreground tabular-nums">{placed}</span> has been received. We'll contact you on WhatsApp to confirm and arrange delivery.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <Button asChild variant="whatsapp" size="lg" className="flex-1">
                <a href={waLink(`Hi, I just placed order ${placed}.`)} target="_blank" rel="noreferrer">
                  <MessageCircle /> WhatsApp Us
                </a>
              </Button>
              <Button variant="outline-ink" size="lg" className="flex-1" onClick={() => navigate({ to: "/shop" })}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </section>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <section className="bg-cream py-8 md:py-12 min-h-[70vh]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3">
            <ChevronLeft className="h-4 w-4" /> Continue shopping
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Checkout</h1>
          <p className="text-sm text-muted-foreground mt-1">Secure checkout · {count} item{count !== 1 ? "s" : ""} in your cart</p>

          {items.length === 0 ? (
            <div className="mt-10 bg-card rounded-xl shadow-card p-10 text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto" />
              <div className="font-semibold mt-4">Your cart is empty</div>
              <p className="text-sm text-muted-foreground mt-1">Add a product to checkout.</p>
              <Button asChild variant="ink" size="lg" className="mt-5"><Link to="/shop">Browse Shop</Link></Button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
              {/* Steps */}
              <div className="space-y-4">
                {/* Stepper */}
                <div className="bg-card rounded-lg p-4 shadow-card flex items-center justify-between">
                  {[
                    { n: 1, l: "Cart" },
                    { n: 2, l: "Shipping" },
                    { n: 3, l: "Payment" },
                  ].map((s, i, arr) => (
                    <div key={s.n} className="flex-1 flex items-center">
                      <button onClick={() => setStep(s.n as 1 | 2 | 3)} className="flex items-center gap-2">
                        <div className={`h-8 w-8 grid place-items-center rounded-full text-xs font-bold ${step >= s.n ? "bg-gold text-ink" : "bg-muted text-muted-foreground"}`}>
                          {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                        </div>
                        <div className={`text-xs font-semibold tracking-wider uppercase hidden sm:block ${step >= s.n ? "text-foreground" : "text-muted-foreground"}`}>{s.l}</div>
                      </button>
                      {i < arr.length - 1 && <div className={`flex-1 h-px mx-3 ${step > s.n ? "bg-gold" : "bg-border"}`} />}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <div className="bg-card rounded-lg shadow-card">
                    <div className="p-5 border-b border-border font-semibold">Review Your Cart</div>
                    <div className="divide-y divide-border">
                      {items.map((it) => (
                        <div key={it.id} className="p-4 flex gap-3">
                          <div className="h-20 w-20 rounded bg-muted overflow-hidden shrink-0">
                            <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">{it.name}</div>
                            <div className="text-gold font-bold mt-1 tabular-nums">{formatNaira(it.price)}</div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="inline-flex items-center border border-border rounded-md">
                                <button onClick={() => setQty(it.id, it.qty - 1)} className="h-8 w-8 grid place-items-center hover:bg-muted"><Minus className="h-3 w-3" /></button>
                                <div className="w-8 text-center text-sm font-semibold tabular-nums">{it.qty}</div>
                                <button onClick={() => setQty(it.id, it.qty + 1)} className="h-8 w-8 grid place-items-center hover:bg-muted"><Plus className="h-3 w-3" /></button>
                              </div>
                              <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-5 flex justify-end">
                      <Button variant="ink" size="lg" onClick={() => setStep(2)}>Continue to Shipping</Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-card rounded-lg shadow-card">
                    <div className="p-5 border-b border-border font-semibold">Shipping Details</div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Full Name"><Input placeholder="e.g. Adaeze Okonkwo" required /></Field>
                      <Field label="Email"><Input type="email" placeholder="you@email.com" required /></Field>
                      <Field label="Phone / WhatsApp"><Input placeholder="+234 800 000 0000" required /></Field>
                      <Field label="State"><Input placeholder="Lagos" required /></Field>
                      <Field label="Address" className="md:col-span-2"><Textarea rows={2} placeholder="Street address, city" required /></Field>
                      <div className="md:col-span-2">
                        <div className="text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2">Delivery Method</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { id: "lagos", title: "Lagos Delivery", fee: SHIPPING_LAGOS, sub: "1–2 business days" },
                            { id: "national", title: "Nationwide", fee: SHIPPING_NATIONAL, sub: "3–7 business days" },
                          ].map((o) => (
                            <button key={o.id} type="button" onClick={() => setShipping(o.id as "lagos" | "national")}
                              className={`text-left p-4 rounded-md border-2 transition-colors ${shipping === o.id ? "border-gold bg-gold/5" : "border-border hover:border-foreground/30"}`}>
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-semibold text-sm">{o.title}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">{o.sub}</div>
                                </div>
                                <div className="text-sm font-bold text-gold tabular-nums">{formatNaira(o.fee)}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex justify-between border-t border-border">
                      <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
                      <Button variant="ink" size="lg" onClick={() => setStep(3)}>Continue to Payment</Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="bg-card rounded-lg shadow-card">
                    <div className="p-5 border-b border-border font-semibold flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald" /> Secure Payment
                    </div>
                    <div className="p-5 space-y-3">
                      {[
                        { id: "transfer", title: "Bank Transfer", sub: "Pay directly to our Nigerian bank account." },
                        { id: "card", title: "Debit / Credit Card", sub: "Pay securely with Paystack or Flutterwave." },
                        { id: "whatsapp", title: "Confirm via WhatsApp", sub: "We'll contact you to confirm payment & details." },
                      ].map((o) => (
                        <button key={o.id} type="button" onClick={() => setPayment(o.id as "transfer" | "card" | "whatsapp")}
                          className={`w-full text-left p-4 rounded-md border-2 transition-colors ${payment === o.id ? "border-gold bg-gold/5" : "border-border hover:border-foreground/30"}`}>
                          <div className="font-semibold text-sm">{o.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{o.sub}</div>
                        </button>
                      ))}
                    </div>
                    <div className="p-5 flex justify-between border-t border-border">
                      <Button variant="outline" size="lg" onClick={() => setStep(2)}>Back</Button>
                      <Button variant="ink" size="lg" onClick={() => { toast.success("Placing your order…"); setTimeout(placeOrder, 600); }}>
                        Place Order · {formatNaira(total)}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary */}
              <aside className="bg-card rounded-lg shadow-card p-5 h-fit lg:sticky lg:top-24">
                <div className="font-semibold mb-4">Order Summary</div>
                <div className="space-y-2.5 text-sm">
                  <Row label={`Subtotal (${count} items)`} value={formatNaira(subtotal)} />
                  <Row label="Shipping" value={formatNaira(shippingFee)} />
                  <div className="border-t border-border pt-3 mt-3 flex items-baseline justify-between">
                    <div className="font-semibold">Total</div>
                    <div className="font-display text-2xl font-bold text-gold tabular-nums">{formatNaira(total)}</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-emerald/10 text-emerald-deep rounded-md text-xs flex gap-2">
                  <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>Your information is encrypted and secure. We never share customer data.</span>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
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
