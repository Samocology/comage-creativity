import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Business info, contact details, and site copy</p>
      </div>

      <Section title="Business Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Business Name"><Input defaultValue="Comage Adini Creativity" /></Field>
          <Field label="Tagline"><Input defaultValue="Crafted With Purpose. Delivered With Pride." /></Field>
          <Field label="Address" className="md:col-span-2"><Input defaultValue="Isolo, Lagos State, Nigeria" /></Field>
          <Field label="Primary Phone"><Input defaultValue="+234 800 000 0000" /></Field>
          <Field label="Secondary Phone"><Input defaultValue="+234 801 111 1111" /></Field>
          <Field label="Email"><Input defaultValue="hello@comageadini.com" /></Field>
          <Field label="Orders Email"><Input defaultValue="orders@comageadini.com" /></Field>
        </div>
      </Section>

      <Section title="WhatsApp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Primary WhatsApp Number"><Input defaultValue="+234 800 000 0000" /></Field>
          <Field label="Default Message"><Input defaultValue="Hello Comage Adini, I'd like to place an order." /></Field>
        </div>
      </Section>

      <Section title="Hero Copy">
        <div className="grid grid-cols-1 gap-4">
          <Field label="Headline"><Input defaultValue="Crafted With Purpose. Delivered With Pride." /></Field>
          <Field label="Sub-headline"><Textarea rows={2} defaultValue="Custom frames, artworks, gifts and printing services for individuals and businesses across Nigeria." /></Field>
        </div>
      </Section>

      <Section title="Social Links">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Instagram"><Input defaultValue="https://instagram.com/comageadini" /></Field>
          <Field label="Facebook"><Input defaultValue="https://facebook.com/comageadini" /></Field>
          <Field label="Twitter / X"><Input defaultValue="https://x.com/comageadini" /></Field>
        </div>
      </Section>

      <Section title="Working Hours">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Weekdays"><Input defaultValue="Mon – Sat: 8am – 7pm" /></Field>
          <Field label="Weekends"><Input defaultValue="Sunday: 10am – 4pm" /></Field>
        </div>
      </Section>

      <div className="flex justify-end gap-3 sticky bottom-4">
        <Button variant="outline" size="lg">Cancel</Button>
        <Button variant="ink" size="lg"><Save /> Save Changes</Button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <div className="font-semibold text-lg mb-1">{title}</div>
      <div className="text-xs text-muted-foreground mb-5">Update your {title.toLowerCase()}</div>
      {children}
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
