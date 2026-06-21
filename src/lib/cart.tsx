import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/data";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

const KEY = "comage_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (p, qty = 1) => {
        setItems((curr) => {
          const i = curr.find((x) => x.id === p.id);
          if (i) return curr.map((x) => (x.id === p.id ? { ...x, qty: x.qty + qty } : x));
          return [...curr, { id: p.id, name: p.name, price: p.price, image: p.image, qty }];
        });
        toast.success(`${p.name} added to cart`);
      },
      remove: (id) => setItems((c) => c.filter((x) => x.id !== id)),
      setQty: (id, qty) =>
        setItems((c) =>
          qty <= 0
            ? c.filter((x) => x.id !== id)
            : c.map((x) => (x.id === id ? { ...x, qty } : x)),
        ),
      clear: () => setItems([]),
    };
  }, [items, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
