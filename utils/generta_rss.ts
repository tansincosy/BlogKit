import { Feed } from "feed";
import { mkdirSync, writeFileSync } from "fs";
import { siteURL, profile } from "@/config";
import { getBlogPosts } from "./read_file";
export async function generateRss() {
  const allPosts = await getBlogPosts();
  const date = new Date();
  const feed = new Feed({
    title: profile.title,
    description: profile.subtitle,
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date, // today's date
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author: {
      name: "spd",
      email: "ddd@qqq.com",
    },
  });

  allPosts.forEach(({ content: { title, abstract }, id }) => {
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
