import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { products } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/categories")({
  component: CategoriesPage,
});

type Category = { id: string; name: string; description: string };

const initial: Category[] = [
  { id: "c1", name: "Frames", description: "Wood, metal and collage frames" },
  { id: "c2", name: "Gifts", description: "Hampers, mugs, keychains and gift sets" },
  { id: "c3", name: "Artworks", description: "Portraits, canvases and art prints" },
  { id: "c4", name: "Printing", description: "Business cards, flyers, booklets" },
  { id: "c5", name: "Signage", description: "Banners, plaques, LED signage" },
  { id: "c6", name: "Custom", description: "Bespoke and personalised orders" },
];

function CategoriesPage() {
  const [cats, setCats] = useState<Category[]>(initial);
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  function openNew() { setEditing(null); setOpen(true); }
  function openEdit(c: Category) { setEditing(c); setOpen(true); }
  function save(c: Category) {
    setCats((curr) => {
      const exists = curr.find((x) => x.id === c.id);
      if (exists) {
        toast.success(`${c.name} updated`);
        return curr.map((x) => (x.id === c.id ? c : x));
      }
      toast.success(`${c.name} created`);
      return [...curr, c];
    });
    setOpen(false);
  }
  function remove(c: Category) {
    if (!confirm(`Delete category "${c.name}"?`)) return;
    setCats((curr) => curr.filter((x) => x.id !== c.id));
    toast.success(`${c.name} deleted`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">Organise your product taxonomy</p>
        </div>
        <Button variant="ink" size="lg" onClick={openNew}><Plus /> Add Category</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map((c) => {
          const count = products.filter((p) => p.category === c.name).length;
          return (
            <div key={c.id} className="bg-card rounded-xl p-5 shadow-card border border-border/60 hover:shadow-elegant transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-lg">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{c.description}</div>
                  <div className="text-[10px] font-semibold tracking-wider uppercase text-gold mt-2 tabular-nums">{count} products</div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="outline" size="icon" onClick={() => openEdit(c)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => remove(c)} aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${Math.min(100, count * 15)}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <CategoryDialog open={open} onOpenChange={setOpen} editing={editing} onSave={save} />
    </div>
  );
}

function CategoryDialog({ open, onOpenChange, editing, onSave }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: Category | null;
  onSave: (c: Category) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{editing ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <CategoryForm key={editing?.id ?? "new"} editing={editing} onSubmit={onSave} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

function CategoryForm({ editing, onSubmit, onCancel }: { editing: Category | null; onSubmit: (c: Category) => void; onCancel: () => void }) {
  const [name, setName] = useState(editing?.name ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    onSubmit({
      id: editing?.id ?? `c${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4 mt-2">
      <label className="block">
        <div className="text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-1.5">Name</div>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Custom Frames" autoFocus />
      </label>
      <label className="block">
        <div className="text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-1.5">Description</div>
        <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description for this category" />
      </label>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="ink">{editing ? "Save Changes" : "Create Category"}</Button>
      </DialogFooter>
    </form>
  );
}
