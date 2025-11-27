export { renderers } from '../../renderers.mjs';

const prerender = false;
const MAILERLITE_ENDPOINT = "https://connect.mailerlite.com/api/subscribers";
const isValidEmail = (value) => /.+@.+\..+/.test(value);
const POST = async ({ request, url }) => {
  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMTA2ZWFlZTg0MjMzMGY1ZDYyMmUwYTIxNmU5NGYwYjBkNGMyYTk3OTY0MWQzMGMwYzIzZWFjMDBhYmFkNTkyMGU4ZmU4YWMzMmQ2ZmQ1ZTIiLCJpYXQiOjE3NjQxOTMxNjkuODkxMzM3LCJuYmYiOjE3NjQxOTMxNjkuODkxMzM5LCJleHAiOjQ5MTk4NjY3NjkuODg1OTA1LCJzdWIiOiIxOTY0MDY2Iiwic2NvcGVzIjpbXX0.RKEUKQ41mFhQJIicn4GASFQNHEfKWUXCNr885LIvSiv2nqBORUmWCIWBDyYwfT5vr3jymAxPVY2Ox5ybsfeJWRLfjjf6A4A0dF6TlmNCPm3bmvDSLCzIi_NPvmoSNJ1MEYF4JtpXZ-ZOXDIxol3_QD2u1RpEZfpDc5TDrKWlS2PPMjfgrsm8YG2bWL5F70IzEbtJdqU_qlVX7sKqLBkcrQ3W0zsbPQYp3tBoLPotM5Jdj24LZeWEcQlr-awwcD-ROFBTit-ykh_j2Jd3k-QETlSrl6xUsVeZQDBa_2uNf8cfjZWhBG3Lj9t9YKkxyvuFVJkFLyICk_WHGNJ_CEP2hzRwFajLuhqCsuatLl3LosBGUIO18RskSRVyTFrvEgEauXKYvn1hAR6r_IIpGZAX4gmN3DZKIvWDCi0zdZx6Wep15cdHtRRK_U1X1TFCrESY65dhZibS5TxthBX-8iKP2_yrziIjJVV2dNFaRuprPCCUnyqN-lV3hBPTus22DF_obVfm-uDz7LnAQYUFirGSuzw4a5gPTiMLNd17HSUF_T2tFFQGpGXM2YUWXPHDAaGoyTsBIGLZsV14kh8p3QYiq0xqw7XiT_nmG8Bz8SiXP-pVkE1HDpdFNcFCFUkkWjDJH6qUvi4D6RxMMg6B1Ec8qxRx5rYZw2JzeAfk5B5rH8M";
  const contentType = request.headers.get("content-type") || "";
  let email = "";
  let botcheck = "";
  let redirect = "";
  if (contentType.includes("application/json")) {
    const payload2 = await request.json().catch(() => ({}));
    email = (payload2.email || "").trim();
    botcheck = (payload2.botcheck || "").trim();
    redirect = (payload2.redirect || "").trim();
  } else {
    const formData = await request.formData();
    email = String(formData.get("email") || "").trim();
    botcheck = String(formData.get("botcheck") || "").trim();
    redirect = String(formData.get("redirect") || "").trim();
  }
  if (botcheck) {
    return new Response(JSON.stringify({ message: "Spam detected." }), { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return new Response(JSON.stringify({ message: "A valid email is required." }), { status: 400 });
  }
  const payload = {
    email,
    ...{}
  };
  const response = await fetch(MAILERLITE_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const message = error?.message || "Unable to save subscriber right now.";
    return new Response(JSON.stringify({ message }), { status: 502 });
  }
  const acceptsHtml = (request.headers.get("accept") || "").includes("text/html");
  const isNavigate = request.headers.get("sec-fetch-mode") === "navigate";
  if (acceptsHtml || isNavigate) {
    return new Response(null, {
      status: 303,
      headers: { Location: redirect || "/?subscribed=1" }
    });
  }
  return new Response(JSON.stringify({ message: "Subscription saved." }), { status: 201 });
};
const GET = async () => new Response(null, {
  status: 303,
  headers: { Location: "/?subscribed=1" }
});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
