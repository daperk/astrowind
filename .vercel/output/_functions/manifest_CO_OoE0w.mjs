import 'kleur/colors';
import { l as decodeKey } from './chunks/astro/server_rEIgojF6.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DWGGY85q.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/06123/OneDrive/Documents/GitHub/astrowind/","cacheDir":"file:///C:/Users/06123/OneDrive/Documents/GitHub/astrowind/node_modules/.astro/","outDir":"file:///C:/Users/06123/OneDrive/Documents/GitHub/astrowind/dist/","srcDir":"file:///C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/","publicDir":"file:///C:/Users/06123/OneDrive/Documents/GitHub/astrowind/public/","buildClientDir":"file:///C:/Users/06123/OneDrive/Documents/GitHub/astrowind/dist/client/","buildServerDir":"file:///C:/Users/06123/OneDrive/Documents/GitHub/astrowind/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"habits/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/habits","isIndex":false,"type":"page","pattern":"^\\/habits$","segments":[[{"content":"habits","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/habits.astro","pathname":"/habits","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"terms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"tools/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tools","isIndex":false,"type":"page","pattern":"^\\/tools$","segments":[[{"content":"tools","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tools.astro","pathname":"/tools","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/subscribe","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/subscribe$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"subscribe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/subscribe.ts","pathname":"/api/subscribe","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}}],"site":"https://sleepupgradehub.com","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/utils/blog.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/components/widgets/BlogLatestPosts.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/habits.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/habits@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/tools.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/tools@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/components/widgets/LatestPostsGrid.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/components/widgets/PopularArticles.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/[...blog]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/[...blog]/[category]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/[...blog]/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/[...blog]/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/terms.astro",{"propagation":"none","containsHead":true}],["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/pages/404.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/subscribe@_@ts":"pages/api/subscribe.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/habits@_@astro":"pages/habits.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/terms@_@astro":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/tools@_@astro":"pages/tools.astro.mjs","\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro":"pages/_---blog_/_category_/_---page_.astro.mjs","\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro":"pages/_---blog_/_tag_/_---page_.astro.mjs","\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro":"pages/_---blog_/_---page_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/[...blog]/index@_@astro":"pages/_---blog_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CO_OoE0w.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_GpMDxr2Z.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/2.jpg":"chunks/2_aNijfCUp.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/4.jpg":"chunks/4_RoHN_koa.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/app-store.png":"chunks/app-store_C_5C3D38.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/environment.webp":"chunks/environment_Db3ukhmT.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/google-play.png":"chunks/google-play_MIFisnRn.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/habits-routines.webp":"chunks/habits-routines_Wd3x-dbN.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/hero-sleep.webp":"chunks/hero-sleep_DhO2eo19.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/steps.webp":"chunks/steps_D6izD2yu.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/supplements-cup-tea.jpg":"chunks/supplements-cup-tea_CQUnRUlu.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/tools-supplements.webp":"chunks/tools-supplements_Dkj_UPB1.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/assets/images/tracker.jpg":"chunks/tracker_DxzF0Dbp.mjs","C:\\Users\\06123\\OneDrive\\Documents\\GitHub\\astrowind\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\06123\\OneDrive\\Documents\\GitHub\\astrowind\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_SLI77Zaz.mjs","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/components/blog/SearchExperience.astro?astro&type=script&index=0&lang.ts":"_astro/SearchExperience.astro_astro_type_script_index_0_lang.GGY7uPqK.js","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.DZnDNxNb.js","C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/components/common/NewsletterForm.astro?astro&type=script&index=0&lang.ts":"_astro/NewsletterForm.astro_astro_type_script_index_0_lang.dmnfuYEY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/06123/OneDrive/Documents/GitHub/astrowind/src/components/common/NewsletterForm.astro?astro&type=script&index=0&lang.ts","const r=()=>{document.querySelectorAll(\"[data-newsletter-form]\").forEach(c=>{const t=c;if(t.dataset.enhanced===\"true\")return;t.dataset.enhanced=\"true\";const a=t.querySelector(\"[data-submit-button]\"),e=t.querySelector(\"[data-submit-feedback]\");!a||!e||t.addEventListener(\"submit\",async i=>{i.preventDefault(),e.classList.add(\"hidden\"),e.textContent=\"\",e.classList.remove(\"text-green-700\",\"text-red-700\");const o=new FormData(t),d={email:o.get(\"email\"),redirect:o.get(\"redirect\"),botcheck:o.get(\"botcheck\")};a.disabled=!0,a.textContent=\"Sending...\";let n=!1;try{const s=await fetch(t.getAttribute(\"action\")||\"/api/subscribe\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\",Accept:\"application/json\"},body:JSON.stringify(d)}),l=await s.json().catch(()=>({}));n=s.ok,e.textContent=n?\"Thank you! You are now subscribed.\":l?.message||\"Unable to subscribe right now. Please try again.\",e.classList.remove(\"hidden\"),e.classList.toggle(\"text-green-700\",n),e.classList.toggle(\"text-red-700\",!n)}catch(s){console.error(\"Newsletter submit error\",s),e.textContent=\"Something went wrong. Please try again.\",e.classList.remove(\"hidden\"),e.classList.add(\"text-red-700\"),n=!1}finally{n&&t.reset(),a.disabled=n,a.textContent=n?\"Subscribed\":\"Subscribe\"}})})};typeof window<\"u\"&&(document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",r,{once:!0}):r());"]],"assets":["/_astro/favicon.CJlsr0Ge.ico","/_astro/apple-touch-icon.DxEzzN2W.png","/_astro/favicon.DEjLnSgm.svg","/_astro/inter-cyrillic-ext-wght-normal.B2xhLi22.woff2","/_astro/inter-greek-ext-wght-normal.CGAr0uHJ.woff2","/_astro/inter-cyrillic-wght-normal.CMZtQduZ.woff2","/_astro/inter-greek-wght-normal.CaVNZxsx.woff2","/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/inter-latin-wght-normal.Dx4kXJAl.woff2","/_astro/inter-latin-ext-wght-normal.DO1Apj_S.woff2","/_astro/4.DRhhWzUa.jpg","/_astro/app-store.t3tG4Jz3.png","/_astro/2.CQIS-FYw.jpg","/_astro/steps.C_VybKfr.webp","/_astro/environment.DiKKFdC9.webp","/_astro/supplements-cup-tea.C62cxwZd.jpg","/_astro/habits-routines.ByPa97kI.webp","/_astro/hero-sleep.DtwDoh3x.webp","/_astro/google-play.ISTMcpLO.png","/_astro/tracker.CJSQ2MUH.jpg","/_astro/tools-supplements.BaTR_xsP.webp","/_astro/_page_.BFCfJDHk.css","/robots.txt","/_headers","/decapcms/config.yml","/decapcms/index.html","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.DZnDNxNb.js","/_astro/SearchExperience.astro_astro_type_script_index_0_lang.GGY7uPqK.js","/404.html","/about/index.html","/contact/index.html","/habits/index.html","/privacy/index.html","/rss.xml","/terms/index.html","/tools/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"5Npr3cibOU16znXKfdt4C8QwSwddAnngxtNJm9w9UMY="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
