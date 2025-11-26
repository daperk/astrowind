import type { APIRoute } from 'astro';

export const prerender = false;

const BUTTONDOWN_ENDPOINT = 'https://api.buttondown.email/v1/subscribers';

const isValidEmail = (value: string) => /.+@.+\..+/.test(value);

export const POST: APIRoute = async ({ request, url }) => {
  const apiKey = import.meta.env.BUTTONDOWN_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ message: 'Newsletter not configured. Add BUTTONDOWN_API_KEY.' }),
      { status: 500 }
    );
  }

  const contentType = request.headers.get('content-type') || '';
  let email = '';
  let source = '';
  let tags: string[] = [];
  let botcheck = '';
  let redirect = '';

  if (contentType.includes('application/json')) {
    const payload = await request.json().catch(() => ({}));
    email = (payload.email || '').trim();
    source = (payload.source || '').trim();
    tags = Array.isArray(payload.tags) ? payload.tags : [];
    botcheck = (payload.botcheck || '').trim();
    redirect = (payload.redirect || '').trim();
  } else {
    const formData = await request.formData();
    email = String(formData.get('email') || '').trim();
    source = String(formData.get('source') || '').trim();
    botcheck = String(formData.get('botcheck') || '').trim();
    redirect = String(formData.get('redirect') || '').trim();
    const tagField = formData.getAll('tags');
    tags = tagField.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (botcheck) {
    return new Response(JSON.stringify({ message: 'Spam detected.' }), { status: 400 });
  }

  if (!email || !isValidEmail(email)) {
    return new Response(JSON.stringify({ message: 'A valid email is required.' }), { status: 400 });
  }

  const payload = {
    email,
    tags,
    metadata: {
      source: source || 'newsletter',
      referrer: url.pathname,
    },
  };

  const response = await fetch(BUTTONDOWN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const message = error?.detail || 'Unable to save subscriber right now.';
    return new Response(JSON.stringify({ message }), { status: 502 });
  }

  const acceptsHtml = (request.headers.get('accept') || '').includes('text/html');
  if (acceptsHtml) {
    return new Response(null, {
      status: 303,
      headers: { Location: redirect || '/?subscribed=1' },
    });
  }

  return new Response(JSON.stringify({ message: 'Subscription saved.' }), { status: 201 });
};

export const GET: APIRoute = async () =>
  new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
    status: 405,
    headers: { Allow: 'POST' },
  });
