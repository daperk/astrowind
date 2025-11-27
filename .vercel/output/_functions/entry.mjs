import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D-ttlIFC.mjs';
import { manifest } from './manifest_CO_OoE0w.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/subscribe.astro.mjs');
const _page4 = () => import('./pages/contact.astro.mjs');
const _page5 = () => import('./pages/habits.astro.mjs');
const _page6 = () => import('./pages/privacy.astro.mjs');
const _page7 = () => import('./pages/rss.xml.astro.mjs');
const _page8 = () => import('./pages/terms.astro.mjs');
const _page9 = () => import('./pages/tools.astro.mjs');
const _page10 = () => import('./pages/_---blog_/_category_/_---page_.astro.mjs');
const _page11 = () => import('./pages/_---blog_/_tag_/_---page_.astro.mjs');
const _page12 = () => import('./pages/_---blog_/_---page_.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const _page14 = () => import('./pages/_---blog_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/subscribe.ts", _page3],
    ["src/pages/contact.astro", _page4],
    ["src/pages/habits.astro", _page5],
    ["src/pages/privacy.astro", _page6],
    ["src/pages/rss.xml.ts", _page7],
    ["src/pages/terms.astro", _page8],
    ["src/pages/tools.astro", _page9],
    ["src/pages/[...blog]/[category]/[...page].astro", _page10],
    ["src/pages/[...blog]/[tag]/[...page].astro", _page11],
    ["src/pages/[...blog]/[...page].astro", _page12],
    ["src/pages/index.astro", _page13],
    ["src/pages/[...blog]/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "1efa042e-4b50-4e8e-b6be-ea0caac33116",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
