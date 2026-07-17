/**
 * Navigation data for the public marketing site (header dropdowns, footer
 * columns, social links). Kept here so the header, mobile menu, and footer all
 * read from one source. Product links point at routes that land as those
 * pillars ship; the marketing pages themselves live under `(public)`.
 */

import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Code2,
  Coins,
  FileText,
  type LucideIcon,
  Newspaper,
  Palette,
  Target,
  Terminal,
  Trophy,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  /** Short supporting line shown in the header mega-menu. */
  description?: string;
  /** Glyph shown beside the label in the header mega-menu. */
  icon?: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Center dropdown menus in the marketing header. */
export const headerMenus: NavGroup[] = [
  {
    label: 'Company',
    items: [
      {
        label: 'About Us',
        href: '/about',
        description: 'Our mission and the team',
        icon: Building2,
      },
      {
        label: 'Blog',
        href: '/blog',
        description: 'Product news and updates',
        icon: Newspaper,
      },
      {
        label: 'Careers',
        href: '/careers',
        description: 'Open roles at Boundless',
        icon: Briefcase,
      },
      {
        label: 'Brand Kit',
        href: '/brand-kit',
        description: 'Logos, colors, and assets',
        icon: Palette,
      },
    ],
  },
  {
    label: 'Products',
    items: [
      {
        label: 'Hackathons',
        href: '/hackathons',
        description: 'Compete and ship projects',
        icon: Trophy,
      },
      {
        label: 'Bounties',
        href: '/bounties',
        description: 'Earn for completing tasks',
        icon: Target,
      },
      {
        label: 'Grants',
        href: '/grants',
        description: 'Funding for builders',
        icon: Award,
      },
      {
        label: 'Crowdfunding',
        href: '/crowdfunding',
        description: 'Raise from the community',
        icon: Coins,
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      {
        label: 'Documentation',
        href: '/docs',
        description: 'Guides and references',
        icon: BookOpen,
      },
      {
        label: 'API Reference',
        href: '/docs/api',
        description: 'Integrate with our API',
        icon: Code2,
      },
      {
        label: 'Whitepaper',
        href: '/whitepaper',
        description: 'How Boundless works',
        icon: FileText,
      },
      {
        label: 'GitHub',
        href: 'https://github.com/boundlessfi',
        description: 'Explore our open source',
        icon: Terminal,
      },
    ],
  },
];

/** Footer link columns, mirroring the brand kit footer. */
export const footerColumns: NavGroup[] = [
  {
    label: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Brand Kit', href: '/brand-kit' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    label: 'Product',
    items: [
      { label: 'Bounties', href: '/bounties' },
      { label: 'Hackathons', href: '/hackathons' },
      { label: 'Crowdfunding', href: '/crowdfunding' },
      { label: 'Grants', href: '/grants' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Documentation', href: 'https://docs.boundlessfi.xyz' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Whitepaper', href: '/whitepaper' },
      { label: 'GitHub', href: 'https://github.com/boundlessfi' },
    ],
  },
  {
    label: 'Legal',
    items: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Risk Disclosure', href: '/risk' },
    ],
  },
];

export type SocialKey = 'discord' | 'linkedin' | 'telegram' | 'x' | 'support';

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { key: 'discord', label: 'Discord', href: 'https://discord.gg/7zJKnpCTKE' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/boundlesshq',
  },
  { key: 'telegram', label: 'Telegram', href: 'https://t.me/boundlessfi' },
  { key: 'x', label: '(formerly twitter)', href: 'https://x.com/boundless_fi' },
  { key: 'support', label: 'Support', href: '/support' },
];
