// Site-wide configuration - single source of truth for all global metadata

export const siteConfig = {
  // Basic Info
  name: "Manohar Gupta",
  title: "Manohar Gupta — Renewable Energy Professional & Builder",
  description:
    "Portfolio of Manohar Gupta — Manager at ReNew, IIT Roorkee engineer, IIM Rohtak gold medalist. Specializing in renewable energy project finance, solar design, and building technology solutions.",
  url: "https://manohargupta.com",

  // Professional
  role: "Manager at ReNew",
  company: "ReNew",
  education: {
    iit: "IIT Roorkee",
    iim: "IIM Rohtak",
  },

  // Contact
  email: "pgp09manoharg@iimrohtak.ac.in",

  // Social Links
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/connectmanohar/",
    github: "https://github.com/manohar6839",
    twitter: "https://x.com/hiemanohar",
  },

  // Navigation
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/journal", label: "Journal" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],

  // Footer
  copyrightYear: 2026,
}

export type SiteConfig = typeof siteConfig
