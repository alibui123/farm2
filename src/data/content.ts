/**
 * Swap image URLs, copy, prices, and contact details here.
 * Commercial numbers marked as placeholders are synthetic until confirmed.
 */

export const site = {
  name: "Al Shukr Dairy",
  tagline: "Purity Promised",
  // Placeholder founding year — replace with real year
  foundedYear: 2018,
  whatsapp: "+923001234567", // Placeholder — replace with real number
  phone: "+92 300 1234567", // Placeholder
  address: "Farm Road, Lahore outskirts", // Placeholder
  hours: "Daily · 5:00 AM – 8:00 PM", // Placeholder
  deliveryAreas: "Lahore · Gulberg · DHA · Model Town · Johar Town", // Placeholder
  deliveryTiming: "Doorstep before 7:00 AM", // Placeholder
  logo: "/images/logo.jpg",
  // motionsites.ai hero background slot — replace with real asset
  heroBackground:
    "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=2400&q=80",
  heroVideo: null as string | null,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Products", href: "#products" },
  { label: "Delivery", href: "#delivery" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "Farm Fresh · Delivered Daily",
  lines: ["Pure Milk.", "Straight From Our Farm", "To Your Door."],
  goldLineIndex: 0,
  subtext:
    "Heritage dairy, delivered fresh every morning. No additives. No compromise. Just the milk nature intended — from our farm to your doorstep.",
  primaryCta: { label: "Request Free Sample", href: "#contact" },
  secondaryCta: { label: "See Our Process", href: "#process" },
  chips: ["No Additives", "Farm Direct", "Daily Delivery"],
};

export const marqueeItems = [
  "100% PURE",
  "FARM FRESH",
  "NO ADULTERATION",
  "HYGIENIC MILKING",
  "DAILY DELIVERY",
];

export const about = {
  eyebrow: "Our Story",
  statement:
    "Milk should be simple. Fresh, honest, and exactly what nature intended.",
  body: "At Al Shukr Dairy, every litre begins with healthy animals, calm milking, and a hygiene standard we would trust for our own family. We chill, check, and deliver the same morning — so what reaches your door still tastes like the farm.",
  signature: "— The Al Shukr Family",
  // Placeholder images — warm golden-hour farm photography
  images: [
    {
      src: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=900&q=80",
      alt: "Dairy cow at golden hour",
      shape: "arch" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=700&q=80",
      alt: "Fresh milk pour",
      shape: "circle" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
      alt: "Glass milk bottles",
      shape: "rounded" as const,
    },
  ],
  stats: [
    { label: "Healthy herd" },
    { label: "Hygienic process" },
    { label: "Daily fresh" },
  ],
};

export const processSteps = [
  {
    number: "01",
    title: "Healthy Herd",
    description:
      "Our cows and buffaloes graze and rest in clean conditions. Healthy animals make honest milk.",
    image:
      "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "02",
    title: "Hygienic Milking",
    description:
      "Milking is calm, clean, and careful — every surface sanitized, every litre handled with care.",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "03",
    title: "Lab-Checked & Chilled",
    description:
      "Each batch is checked for purity, then chilled immediately to lock in freshness.",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "04",
    title: "Doorstep Delivery",
    description:
      "Before breakfast, fresh milk arrives at your door — sealed, cold, and ready for your family.",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80",
  },
];

export const products = {
  eyebrow: "Our Milk",
  heading: "Fresh from the farm, every single day.",
  items: [
    {
      id: "cow",
      name: "Fresh Cow Milk",
      description:
        "Light, clean, and everyday-perfect — the milk your chai and cereal deserve.",
      tags: ["Everyday Fresh", "Best for Chai"],
      // Placeholder price
      price: "Rs. ___ / litre",
      image:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
      comingSoon: false,
    },
    {
      id: "buffalo",
      name: "Fresh Buffalo Milk",
      description:
        "Richer, creamier, naturally fuller — for desserts, lassi, and pure indulgence.",
      tags: ["Rich & Creamy", "Full Body"],
      // Placeholder price
      price: "Rs. ___ / litre",
      image:
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80",
      comingSoon: false,
    },
    {
      id: "extras",
      name: "Coming Soon",
      description:
        "Yogurt, butter, and desi ghee — the farm extras, still on the way.",
      tags: ["Yogurt", "Butter", "Desi Ghee"],
      price: "Soon",
      image: null,
      comingSoon: true,
    },
  ],
};

export const audiences = [
  {
    number: "01",
    title: "Households",
    description: "Daily fresh subscription — milk at your door before breakfast.",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    href: "#contact",
  },
  {
    number: "02",
    title: "Distributors",
    description: "Bulk supply for Gawalay & shops who need reliable farm milk.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
    href: "#contact",
  },
  {
    number: "03",
    title: "Try Us",
    description: "Request a free sample and taste the difference yourself.",
    image:
      "https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1000&q=80",
    href: "#contact",
  },
];

export const purityStats = [
  // All numbers are placeholders — replace with real figures
  { value: 500, suffix: "+", label: "Litres/day" },
  { value: 1000, suffix: "+", label: "Households" },
  { value: 365, suffix: "", label: "Days delivered" },
  { value: 0, suffix: "", label: "Additives" },
];

export const delivery = {
  eyebrow: "Simple as 1-2-3",
  heading: "Fresh milk at your door before breakfast.",
  steps: [
    {
      title: "Request a free sample",
      description: "Tell us your area and preferred time. We handle the rest.",
    },
    {
      title: "Taste the difference",
      description: "One morning of real farm milk is usually enough.",
    },
    {
      title: "Subscribe for daily delivery",
      description: "Set your schedule. Wake up to fresh milk at the door.",
    },
  ],
};

export const testimonials = [
  // Synthetic testimonials — replace with real customer quotes
  {
    quote:
      "We switched three months ago. The chai tastes richer, and the kids actually finish their milk.",
    name: "Sara Khan",
    area: "Gulberg, Lahore",
    rating: 5,
  },
  {
    quote:
      "As a shop owner, consistency matters. Al Shukr delivers cold, clean milk every single day.",
    name: "Imran Ali",
    area: "Johar Town",
    rating: 5,
  },
  {
    quote:
      "Finally milk that tastes like the farm. No watery aftertaste, no doubt about purity.",
    name: "Ayesha Malik",
    area: "DHA Phase 5",
    rating: 5,
  },
];

export const contact = {
  eyebrow: "Get in Touch",
  heading: "Try our milk. Free.",
  copy: "Request a complimentary sample. We'll confirm your area and delivery window on WhatsApp.",
  formSuccess: "Thank you! We'll contact you shortly.",
};
