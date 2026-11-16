const LINKS = {
  instagram: "https://instagram.com/g_active_fitness",
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
