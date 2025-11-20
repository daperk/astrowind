import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Sleep Guides',
      links: [
        { text: 'All Guides', href: getBlogPermalink() },
        { text: 'Sleep Environment', href: getPermalink('sleep-environment', 'category') },
        { text: 'Sleep Tools', href: getPermalink('sleep-tools', 'category') },
        { text: 'Habits & Routines', href: getPermalink('habits', 'category') },
        { text: 'Supplements', href: getPermalink('supplements', 'category') },
      ],
    },
    {
      text: 'Topics',
      links: [
        { text: 'Fall Asleep Faster', href: getPermalink('fall-asleep', 'tag') },
        { text: 'Deep Sleep', href: getPermalink('deep-sleep', 'tag') },
        { text: 'Morning Energy', href: getPermalink('energy', 'tag') },
        { text: 'Bedroom Setup', href: getPermalink('bedroom', 'tag') },
        { text: 'Sleep for Busy People', href: getPermalink('busy', 'tag') },
      ],
    },
    {
      text: 'Tools',
      links: [
        { text: 'Sleep Trackers', href: getPermalink('sleep-trackers', 'category') },
        { text: 'White Noise Machines', href: getPermalink('white-noise', 'category') },
        { text: 'Lighting & Lamps', href: getPermalink('lighting', 'category') },
        { text: 'Mattresses & Bedding', href: getPermalink('bedding', 'category') },
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],

  actions: [], // no more Download nonsense
};

export const footerData = {
  links: [
    {
      title: 'Sleep Guides',
      links: [
        { text: 'All Guides', href: getBlogPermalink() },
        { text: 'Sleep Environment', href: getPermalink('sleep-environment', 'category') },
        { text: 'Sleep Tools', href: getPermalink('sleep-tools', 'category') },
        { text: 'Habits & Routines', href: getPermalink('habits', 'category') },
      ],
    },
    {
      title: 'Tools & Products',
      links: [
        { text: 'Sleep Trackers', href: getPermalink('sleep-trackers', 'category') },
        { text: 'White Noise Machines', href: getPermalink('white-noise', 'category') },
        { text: 'Lighting & Lamps', href: getPermalink('lighting', 'category') },
        { text: 'Mattresses & Bedding', href: getPermalink('bedding', 'category') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
        { text: 'Terms & Conditions', href: getPermalink('/terms') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: 'Terms', href: getPermalink('/terms') },
  ],
  socialLinks: [
    // Add when real social profiles are available
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
    © ${new Date().getFullYear()} SleepUpgradeHub. All rights reserved.
  `,
};
