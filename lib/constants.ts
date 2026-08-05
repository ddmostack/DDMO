import {
  BarChart3,
  Blocks,
  BrainCircuit,
  Clock3,
  Code2,
  Eye,
  Gauge,
  Globe2,
  Layers3,
  Megaphone,
  MessageSquareText,
  Palette,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type IconContent = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#why-us", label: "Why Us" },
  { href: "#contact", label: "Contact" },
] as const;

export const values: IconContent[] = [
  {
    icon: Target,
    title: "Clarity",
    description: "Strategy that gives every creative decision a purpose.",
  },
  {
    icon: PenTool,
    title: "Craft",
    description: "Considered details that make the whole brand feel stronger.",
  },
  {
    icon: Sparkles,
    title: "Momentum",
    description: "Practical systems designed to keep improving after launch.",
  },
  {
    icon: UsersRound,
    title: "Partnership",
    description: "A direct, collaborative process with no layers in between.",
  },
  {
    icon: Eye,
    title: "Openness",
    description: "Clear decisions, clear reporting, and no hidden surprises.",
  },
];

// TODO: confirm public-facing company statistics with Adnan before launch.
export const stats = [
  { value: 6, suffix: "+", label: "Years of combined experience" },
  { value: 48, suffix: "+", label: "Projects shaped and shipped" },
  { value: 12, suffix: "", label: "Markets reached worldwide" },
  { value: 94, suffix: "%", label: "Work delivered through referrals" },
] as const;

// TODO: confirm the final services list and copy with Adnan.
export const services: IconContent[] = [
  {
    icon: Search,
    title: "Search Strategy",
    description: "Technical SEO and content systems built to earn durable visibility.",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Fast, accessible websites engineered around real business goals.",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Distinctive visual systems that stay coherent across every channel.",
  },
  {
    icon: MessageSquareText,
    title: "Content & Social",
    description: "Clear stories and practical publishing systems that build trust.",
  },
  {
    icon: Megaphone,
    title: "Paid Growth",
    description: "Focused campaigns with stronger creative and transparent learning loops.",
  },
  {
    icon: Layers3,
    title: "UI & UX Design",
    description: "Useful digital experiences that feel simple from the first interaction.",
  },
];

export const projects = [
  {
    title: "Northline Studio",
    category: "Brand identity",
    description: "A sharper visual system for a circular fashion label.",
    image: "/images/work/northline.png",
    alt: "Cobalt fabric arranged on a steel garment rail in a daylight studio",
  },
  {
    title: "Daymark Coffee",
    category: "Campaign & packaging",
    description: "A bright launch platform built around everyday energy.",
    image: "/images/work/daymark.png",
    alt: "Black coffee packaging with a cobalt cup in sharp morning light",
  },
  {
    title: "Relay Health",
    category: "Web design & development",
    description: "A calmer, clearer digital experience for modern care teams.",
    image: "/images/work/relay.png",
    alt: "Blue glass forms and a green stem arranged on a steel medical tray",
  },
  {
    title: "Fieldwork Homes",
    category: "SEO & content",
    description: "A search-led content system for design-conscious buyers.",
    image: "/images/work/fieldwork.png",
    alt: "Modern concrete home with cobalt seating and sculptural landscaping",
  },
] as const;

export const differentiators: IconContent[] = [
  {
    icon: Blocks,
    title: "One connected team",
    description: "Strategy, design, content, and development move together from day one.",
  },
  {
    icon: BarChart3,
    title: "Data meets design",
    description: "Evidence guides the work without flattening the creative idea.",
  },
  {
    icon: BrainCircuit,
    title: "AI-native workflow",
    description: "Modern tools accelerate exploration while experienced judgment stays in control.",
  },
  {
    icon: Gauge,
    title: "Useful speed",
    description: "Short feedback loops keep momentum high and decisions easy to track.",
  },
  {
    icon: ShieldCheck,
    title: "Open reporting",
    description: "You can see what changed, why it changed, and what happens next.",
  },
  {
    icon: Globe2,
    title: "Local insight, global craft",
    description: "Pakistan-rooted perspective with standards built for international teams.",
  },
];

export const projectTypes = [
  "Brand identity",
  "Website design & development",
  "SEO & content",
  "Paid growth",
  "Something else",
] as const;

export const footerServices = ["Search strategy", "Web development", "Brand identity", "UI & UX"];

export const socialLinks = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://www.behance.net", label: "Behance" },
] as const;

export const footerDetails = {
  city: "Lahore, Pakistan",
  email: "hello@doodledynamo.com",
  // TODO: replace with Doodle Dynamo's confirmed business phone number.
  phone: "+92 300 123 4567",
} as const;

export const accentIcons = [Clock3, Globe2, Target] as const;
