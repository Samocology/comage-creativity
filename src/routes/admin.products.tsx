import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Plus, Pencil, Trash2, Search, Upload, X, Film, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { products as initial, formatNaira, type Product } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products")({
  component: ProductsPage,
});

function ProductsPage() {
  const [list, setList] = useState<Product[]>(initial);
  const [q, setQ] = useState("");
  const filtered = list.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()));

  function upsert(p: Product) {
    setList((curr) => {
      const exists = curr.find((x) => x.id === p.id);
      if (exists) {
        toast.success(`${p.name} updated`);
        return curr.map((x) => (x.id === p.id ? p : x));
      }
      toast.success(`${p.name} created`);
      return [p, ...curr];
    });
  }
  function remove(p: Product) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    setList((c) => c.filter((x) => x.id !== p.id));
    toast.success(`${p.name} deleted`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your product catalog</p>
        </div>
        <ProductDialog
          onSave={upsert}
          trigger={<Button variant="ink" size="lg"><Plus /> Add Product</Button>}
        />
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border/60">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="pl-9" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">Stock</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded bg-muted overflow-hidden shrink-0">
                        <img src={p.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">{p.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-[10px] font-semibold tracking-wider uppercase text-gold">{p.category}</span></td>
                  <td className="px-4 py-3 font-semibold tabular-nums">{formatNaira(p.price)}</td>
                  <td className="px-4 py-3 tabular-nums">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded ${p.stock > 10 ? "bg-emerald/15 text-emerald-deep" : p.stock > 0 ? "bg-gold/20 text-ink" : "bg-destructive/15 text-destructive"}`}>
                      {p.stock > 10 ? "In Stock" : p.stock > 0 ? "Low" : "Out"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <ProductDialog product={p} onSave={upsert} trigger={<Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>} />
                      <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => remove(p)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type MediaItem = { id: string; url: string; type: "image" | "video"; name: string };

function ProductDialog({ trigger, product, onSave }: { trigger: React.ReactNode; product?: Product; onSave: (p: Product) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState<Product["category"]>(product?.category ?? "Frames");
  const [price, setPrice] = useState<number>(product?.price ?? 0);
  const [stock, setStock] = useState<number>(product?.stock ?? 0);
  const [badge, setBadge] = useState<string>(product?.badge ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [media, setMedia] = useState<MediaItem[]>(
    (product?.images ?? []).map((url, i) => ({ id: `e${i}`, url, type: "image", name: `image-${i + 1}` })),
  );
  const fileRef = useRef<HTMLInputElement | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const next: MediaItem[] = Array.from(files).map((f, i) => ({
      id: `${Date.now()}-${i}`,
      url: URL.createObjectURL(f),
      type: f.type.startsWith("video") ? "video" : "image",
      name: f.name,
    }));
    setMedia((m) => [...m, ...next]);
  }

  function removeMedia(id: string) {
    setMedia((m) => m.filter((x) => x.id !== id));
  }

  function submit() {
    if (!name.trim()) return toast.error("Product name is required");
    const images = media.filter((m) => m.type === "image").map((m) => m.url);
    const p: Product = {
      id: product?.id ?? `p${Date.now()}`,
      name: name.trim(),
      category,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      badge: (badge || undefined) as Product["badge"],
      description: description.trim(),
      image: images[0] || product?.image || "",
      images: images.length ? images : product?.images ?? [],
      details: product?.details,
    };
    onSave(p);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Media upload */}
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2">Product Media (Images & Videos)</div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-gold hover:bg-gold/5 transition-colors"
            >
              <Upload className="h-7 w-7 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm font-semibold">Click to upload from your device</div>
              <div className="text-xs text-muted-foreground mt-1">Images (JPG, PNG, WebP) or videos (MP4, MOV) — up to 20MB each</div>
            </button>

            {media.length > 0 && (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {media.map((m, i) => (
                  <div key={m.id} className="relative aspect-square rounded-md overflow-hidden bg-muted border border-border group">
                    {m.type === "image" ? (
                      <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
                    ) : (
                      <video src={m.url} className="h-full w-full object-cover" muted />
                    )}
                    <div className="absolute top-1 left-1 bg-ink/70 text-white text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded flex items-center gap-1">
                      {m.type === "video" ? <Film className="h-2.5 w-2.5" /> : <ImageIcon className="h-2.5 w-2.5" />}
                      {i === 0 && "MAIN"}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMedia(m.id)}
                      className="absolute top-1 right-1 h-6 w-6 rounded-full bg-destructive text-destructive-foreground grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" /></Field>
            <Field label="Category">
              <select value={category} onChange={(e) => setCategory(e.target.value as Product["category"])} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                {["Frames", "Gifts", "Artworks", "Printing", "Signage", "Custom"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Price (₦)"><Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></Field>
            <Field label="Stock"><Input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} /></Field>
            <Field label="Badge">
              <select value={badge} onChange={(e) => setBadge(e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">None</option><option>NEW</option><option>BESTSELLER</option><option>POPULAR</option>
              </select>
            </Field>
            <Field label="Description" className="md:col-span-2"><Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="ink" onClick={submit}>{product ? "Save Changes" : "Create Product"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
