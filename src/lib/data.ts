import frameImg from "@/assets/product-frame.jpg";
import hamperImg from "@/assets/product-hamper.jpg";
import portraitImg from "@/assets/product-portrait.jpg";
import cardsImg from "@/assets/product-cards.jpg";
import signageImg from "@/assets/portfolio-signage.jpg";
import collageImg from "@/assets/portfolio-collage.jpg";
import corporateImg from "@/assets/portfolio-corporate.jpg";
import printingImg from "@/assets/portfolio-printing.jpg";

// === Contact / Social ===
export const WHATSAPP_NUMBER = "2348062406073";
export const PHONE_DISPLAY = "+234 806 240 6073";
export const PHONE_TEL = "+2348062406073";
export const INSTAGRAM_URL =
  "https://www.instagram.com/ceehay_creativity?igsh=MzRlODBiNWFlZA==";
export const INSTAGRAM_HANDLE = "@ceehay_creativity";
export const EMAIL = "hello@comageadini.com";

export const waLink = (msg = "Hello Comage Adini, I'd like to place an order.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export type Product = {
  id: string;
  name: string;
  category: "Frames" | "Gifts" | "Artworks" | "Printing" | "Signage" | "Custom";
  price: number;
  image: string;
  images: string[];
  badge?: "NEW" | "BESTSELLER" | "POPULAR";
  stock: number;
  description: string;
  details?: string[];
};

const mk = (
  id: string,
  name: string,
  category: Product["category"],
  price: number,
  image: string,
  extra: string[],
  stock: number,
  description: string,
  badge?: Product["badge"],
): Product => ({
  id,
  name,
  category,
  price,
  image,
  images: [image, ...extra],
  badge,
  stock,
  description,
  details: [
    "Premium materials, hand-finished in our Lagos workshop",
    "Personalisation available — engrave names, dates, messages",
    "Nationwide delivery in 3–7 business days",
    "Free design consultation via WhatsApp",
  ],
});

export const products: Product[] = [
  mk("p1", "Custom Wedding Frame", "Frames", 8500, frameImg, [collageImg, portraitImg, corporateImg], 24, "Hand-finished hardwood frame engraved with names & date.", "BESTSELLER"),
  mk("p2", "Premium Gift Hamper", "Gifts", 12000, hamperImg, [corporateImg, cardsImg, frameImg], 18, "Curated hamper of wine, chocolates and artisan treats."),
  mk("p3", "African Portrait Art", "Artworks", 25000, portraitImg, [collageImg, frameImg, printingImg], 6, "Original gallery-quality portrait painting on canvas.", "NEW"),
  mk("p4", "Gold Foil Business Cards", "Printing", 3500, cardsImg, [printingImg, corporateImg, signageImg], 120, "Luxury matte black cards with hot-foil gold print."),
  mk("p5", "Wooden Collage Frame", "Frames", 11000, collageImg, [frameImg, portraitImg, hamperImg], 14, "6-photo collage frame, perfect for families."),
  mk("p6", "Engraved Keychain Set", "Gifts", 4200, corporateImg, [hamperImg, cardsImg, frameImg], 60, "Personalised brass keychains in a velvet pouch.", "POPULAR"),
  mk("p7", "Abstract Gold Art Print", "Artworks", 18500, portraitImg, [collageImg, printingImg, frameImg], 9, "Modern abstract print on premium matte paper."),
  mk("p8", "Event Flyer Printing", "Printing", 2800, printingImg, [cardsImg, corporateImg, signageImg], 200, "Full-colour flyers on 150gsm gloss, 24h turnaround."),
  mk("p9", "Birthday Frame Gift Box", "Gifts", 7000, hamperImg, [frameImg, corporateImg, collageImg], 22, "Beautifully boxed gift frame for birthdays.", "NEW"),
  mk("p10", "Slim Desk Photo Frame", "Frames", 5500, frameImg, [collageImg, portraitImg, corporateImg], 30, "Minimal desk frame, brushed wood finish."),
  mk("p11", "Vinyl Banner Signage", "Signage", 9500, signageImg, [printingImg, cardsImg, corporateImg], 8, "Heavy-duty outdoor banner with grommets."),
  mk("p12", "Custom Printed Mug", "Gifts", 3800, corporateImg, [hamperImg, cardsImg, frameImg], 75, "Ceramic mug with full-colour custom print."),
];

export type PortfolioItem = {
  id: string;
  title: string;
  category: "Frames" | "Signage" | "Printing" | "Artworks" | "Gifts & Souvenirs" | "Custom Orders";
  image: string;
  description: string;
  span?: "tall" | "wide" | "large";
};

export const portfolio: PortfolioItem[] = [
  { id: "f1", title: "Double Wedding Frame", category: "Frames", image: frameImg, description: "Forever & Always — Chinedu & Amaka, June 2024", span: "large" },
  { id: "s1", title: "Boutique LED Signage", category: "Signage", image: signageImg, description: "Illuminated storefront for Zuri Boutique." },
  { id: "p1", title: "Corporate Gala Booklet", category: "Printing", image: printingImg, description: "Annual gala dinner programme, 80pp saddle stitch." },
  { id: "a1", title: 'Abstract Canvas — "Heritage"', category: "Artworks", image: portraitImg, description: "Original mixed-media canvas, 36×48 in." },
  { id: "g1", title: "Corporate Gift Hampers", category: "Gifts & Souvenirs", image: hamperImg, description: "100 custom hampers for end-of-year clients." },
  { id: "f2", title: "6-Grid Collage Frame", category: "Frames", image: collageImg, description: "Solid oak collage frame, 6 prints." },
  { id: "s2", title: "Fashion Brand Rollup Banner", category: "Signage", image: signageImg, description: "Pull-up banner system for launch event." },
  { id: "g2", title: "Event Souvenir Bundle", category: "Gifts & Souvenirs", image: corporateImg, description: "Branded mugs, notebooks & lanyards." },
  { id: "p2", title: "Wedding Invitation Suite", category: "Printing", image: printingImg, description: "Gold-foil invitations with envelopes." },
  { id: "s3", title: "Office Plaques & Door Signs", category: "Signage", image: signageImg, description: "Acrylic + brass interior signage system." },
  { id: "a2", title: "Yoruba Heritage Portrait", category: "Artworks", image: portraitImg, description: "Gilded canvas, commissioned portrait.", span: "tall" },
  { id: "c1", title: "Birthday Frame Gift Box", category: "Custom Orders", image: hamperImg, description: "Custom frame + gift packaging combo." },
];

export const services = [
  { id: "printing", number: "01", title: "Printing Services", tag: "From concept to print — sharp, vibrant, professional", image: printingImg, features: ["Business Cards & Letterheads", "Flyers & Brochures", "Stickers & Labels", "Banners & Flex Prints", "Event Programmes & Booklets", "Wedding Stationery"], accent: "emerald" },
  { id: "signage", number: "02", title: "Signage & Branding", tag: "Make your brand impossible to ignore", image: signageImg, features: ["Shop Front Signage", "Acrylic & 3D Letters", "Office Plaques & Door Signs", "LED Backlit Signs", "Vehicle Branding & Wraps", "Event Backdrops & Stages"], accent: "ink" },
  { id: "gifts", number: "03", title: "Custom Gift Creation", tag: "Thoughtful gifts crafted with personal meaning", image: hamperImg, features: ["Personalised Gift Boxes", "Wedding & Bridal Items", "Celebration Packages", "Custom Hamper Curation", "Corporate Souvenir Sets", "Branded Merchandise"], accent: "emerald" },
  { id: "frames", number: "04", title: "Custom Frames & Artworks", tag: "Turn moments and visions into timeless pieces", image: collageImg, features: ["Bespoke Picture Frames", "Commissioned Portraits", "Artwork Reproductions", "Multi-Photo Collage Frames", "Canvas Prints & Mounting", "Wall Gallery Curation"], accent: "ink" },
] as const;

export const testimonials = [
  { id: 1, name: "Adaeze Okonkwo", role: "Bride, Lagos", quote: "The quality of their custom frames is outstanding. My wedding portraits look absolutely stunning. Fast delivery to Abuja too!", rating: 5 },
  { id: 2, name: "Femi Ola", role: "Founder, NaijaStack", quote: "Ordered corporate souvenirs for our company event. The team was professional, responsive on WhatsApp and delivered on time.", rating: 5 },
  { id: 3, name: "Fatima Bello", role: "Lagos Salon", quote: "Beautiful artwork and pricing work. The signage for my salon came out exactly as designed. Highly recommended!", rating: 5 },
];

export const timeline = [
  { year: "2014", title: "Founded in Isolo", body: "Started as a small frame and printing studio in Lagos with a single hand-press and a long-term vision." },
  { year: "2017", title: "Expanded to Gifting", body: "Added curated hampers and custom gifts after growing demand from corporate clients." },
  { year: "2019", title: "Signage & Branding", body: "Launched full signage division — serving businesses, shops and corporate clients." },
  { year: "2021", title: "Online Store Launch", body: "Opened our online store and started nationwide delivery to Nigerian customers." },
  { year: "2024", title: "500+ Projects Delivered", body: "Crossed 500 completed projects with a 98% client satisfaction rate, serving 36 states." },
];

export const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "12+", label: "Years of Experience" },
  { value: "36", label: "States Served" },
  { value: "98%", label: "Client Satisfaction" },
];

// Admin mock data
export const orders = [
  { id: "ORD-1042", customer: "Adaeze Okonkwo", email: "adaeze@example.com", total: 24500, status: "Delivered", date: "2026-06-18", items: 3 },
  { id: "ORD-1041", customer: "Femi Ola", email: "femi@naijastack.co", total: 158000, status: "Processing", date: "2026-06-18", items: 12 },
  { id: "ORD-1040", customer: "Fatima Bello", email: "fatima@salon.ng", total: 9500, status: "Shipped", date: "2026-06-17", items: 1 },
  { id: "ORD-1039", customer: "Chinedu Eze", email: "chinedu@example.com", total: 47000, status: "Pending", date: "2026-06-17", items: 4 },
  { id: "ORD-1038", customer: "Ngozi A.", email: "ngozi@example.com", total: 17000, status: "Delivered", date: "2026-06-16", items: 2 },
  { id: "ORD-1037", customer: "Tunde O.", email: "tunde@example.com", total: 88000, status: "Cancelled", date: "2026-06-16", items: 6 },
  { id: "ORD-1036", customer: "Aisha M.", email: "aisha@example.com", total: 22000, status: "Delivered", date: "2026-06-15", items: 2 },
];

export const messages = [
  { id: 1, name: "Kemi Adeyemi", email: "kemi@example.com", subject: "Quote for 100 hampers", body: "Hi, please send a quote for 100 corporate hampers for December.", date: "2 hours ago", read: false },
  { id: 2, name: "Mike T.", email: "mike@brand.co", subject: "Outdoor signage", body: "We need outdoor signage for 3 retail locations in Lagos.", date: "5 hours ago", read: false },
  { id: 3, name: "Zainab L.", email: "zainab@example.com", subject: "Wedding stationery", body: "Looking for invitations + thank-you cards for 200 guests.", date: "Yesterday", read: true },
  { id: 4, name: "Paul C.", email: "paul@example.com", subject: "Picture frame", body: "Can you make a 24x36 custom frame? Need by next week.", date: "2 days ago", read: true },
];

export const revenueData = [
  { month: "Jan", revenue: 420000 },
  { month: "Feb", revenue: 510000 },
  { month: "Mar", revenue: 480000 },
  { month: "Apr", revenue: 690000 },
  { month: "May", revenue: 820000 },
  { month: "Jun", revenue: 945000 },
];

export const formatNaira = (n: number) => "₦" + n.toLocaleString("en-NG");
