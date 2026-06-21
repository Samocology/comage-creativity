import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/data";

export function CartSheet() {
  const { items, isOpen, close, setQty, remove, subtotal, count } = useCart();
  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b">
          <SheetTitle className="flex items-center gap-2 font-display text-xl">
            <ShoppingBag className="h-5 w-5 text-gold" /> Your Cart
            <span className="ml-1 text-xs font-sans font-semibold bg-gold/15 text-ink px-2 py-0.5 rounded-full">{count}</span>
          </SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="h-16 w-16 rounded-full bg-muted grid place-items-center mb-4">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="font-semibold">Your cart is empty</div>
            <p className="text-sm text-muted-foreground mt-1">Add a product from the shop to get started.</p>
            <Button asChild variant="ink" size="lg" className="mt-5" onClick={close}>
              <Link to="/shop">Browse Shop</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {items.map((it) => (
                <div key={it.id} className="p-4 flex gap-3">
                  <div className="h-20 w-20 rounded-md bg-muted overflow-hidden shrink-0">
                    <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-sm truncate">{it.name}</div>
                      <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-gold font-bold mt-1 tabular-nums">{formatNaira(it.price)}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border border-border rounded-md">
                        <button onClick={() => setQty(it.id, it.qty - 1)} className="h-8 w-8 grid place-items-center hover:bg-muted">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <div className="w-8 text-center text-sm font-semibold tabular-nums">{it.qty}</div>
                        <button onClick={() => setQty(it.id, it.qty + 1)} className="h-8 w-8 grid place-items-center hover:bg-muted">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-sm font-semibold tabular-nums">{formatNaira(it.qty * it.price)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-5 bg-cream/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-bold tabular-nums">{formatNaira(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Shipping & taxes calculated at checkout.</p>
              <Button asChild variant="ink" size="lg" className="w-full mt-4" onClick={close}>
                <Link to="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full mt-2" onClick={close}>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
