const { Feed } = require("feed");
const { mkdirSync, writeFileSync } = require("fs");
const { structurePostDir } = require("./all_post");

async function generateRss({ title = "", subtitle = "", siteURL = "" }) {
  const allPosts = await structurePostDir("posts", []);
  const date = new Date();
  const feed = new Feed({
    title: title,
    description: subtitle,
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date, // today's date
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author: {
      name: "spd",
      email: "charlesmaxwellyoung@gmail.com",
    },
  });

  allPosts.forEach(({ content: { title, abstract, date }, id }) => {
    feed.addItem({
      title: title,
      id: title,
      link: `${siteURL}/blog/${id}`,
      date: date,
      description: abstract,
      content: abstract,
    });
  });
  mkdirSync("./public/rss", { recursive: true });
  writeFileSync("./public/rss/feed.xml", feed.rss2());
  writeFileSync("./public/rss/feed.json", feed.json1());
}

module.exports = {
  generateRss,
};
