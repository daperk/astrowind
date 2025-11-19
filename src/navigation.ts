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
