const LINKS = {
  instagram: "https://www.instagram.com/g_active_fitness?utm_source=ig_web_button_share_sheet&;stkn=ZDNlZDc0MzIxNw==",
  facebook: "https://www.facebook.com/profile.php?id=61584638510250",
};

export async function onRequest(context) {
  const { env, params } = context;
  const slug = params.slug;

  const destination = LINKS[slug];

  if (!destination) {
    return new Response("Link not found", { status: 404 });
  }

  const currentCount = parseInt((await env.LINK_CLICKS.get(slug)) || "0", 10);
  await env.LINK_CLICKS.put(slug, String(currentCount + 1));

  return Response.redirect(destination, 302);
}
