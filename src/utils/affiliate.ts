/**
 * Central affiliate configuration.
 *
 * HOW TO TURN IT ON:
 *  1. Amazon: set PUBLIC_AMAZON_TAG in your environment (Vercel > Project >
 *     Settings > Environment Variables, and locally in .env). Example:
 *       PUBLIC_AMAZON_TAG=sleepupgrade-20
 *     Once set, every product post automatically shows a tagged "On Amazon"
 *     button (Amazon search links, so they never point at the wrong product).
 *  2. Direct brands (Saatva, Helix, Eight Sleep, etc.): once a program approves
 *     you, paste your affiliate URL into BRAND_LINKS below, keyed by a lowercase
 *     word that appears in the product name. Matching products get a brand button.
 *
 * Nothing renders until at least one of these is configured, so the site is
 * safe to ship before any program is live.
 */

export const AMAZON_TAG = (import.meta.env.PUBLIC_AMAZON_TAG || '').trim();

// rel value for outbound affiliate links (FTC + Google best practice).
export const AFFILIATE_REL = 'sponsored nofollow noopener';

// Build a tagged Amazon search link for a product name. Safe: a search link
// never resolves to the wrong product, unlike a hardcoded ASIN.
export function amazonSearchUrl(query: string): string {
  const url = new URL('https://www.amazon.com/s');
  url.searchParams.set('k', query);
  if (AMAZON_TAG) url.searchParams.set('tag', AMAZON_TAG);
  return url.toString();
}

// Direct-brand affiliate links. Fill these in as programs approve you.
// Key = a lowercase substring to match against a product name.
// Example after approval:
//   saatva: 'https://saatva.pxf.io/your-link',
//   helix: 'https://helixsleep.sjv.io/your-link',
//   'eight sleep': 'https://eightsleep.ampj.io/your-link',
export const BRAND_LINKS: Record<string, string> = {};

export function brandLinkFor(productName: string): string | null {
  const name = (productName || '').toLowerCase();
  for (const key of Object.keys(BRAND_LINKS)) {
    if (key && name.includes(key)) return BRAND_LINKS[key];
  }
  return null;
}

// True when anything is configured (used to decide whether to show buy buttons).
export const AFFILIATES_ENABLED = AMAZON_TAG !== '' || Object.keys(BRAND_LINKS).length > 0;
