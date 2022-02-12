export default async () => {
  let routes = [];
  const {$content} = require('@nuxt/content')
  let posts = await $content('articles').fetch();
  for (const post of posts) {
    routes.push(`blog/${post.slug}`);
  }
  return routes;
};
