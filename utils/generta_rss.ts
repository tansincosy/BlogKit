import { Feed } from "feed";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import matter from "gray-matter";
import { getAllPosts } from "./read_file";
import { siteURL, profile } from "@/config";
export async function generateRss() {
  const allPosts = await getAllPosts();
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

  allPosts.forEach((post) => {
    const fileContent = readFileSync(`posts/${post}`).toString();
    const { data } = matter(fileContent) || {};
    feed.addItem({
      title: data.title,
      id: data.title,
      link: `${siteURL}/blog/${post.replace(".md", "")}`,
      date: data.date,
      description: data.abstract,
      content: data.abstract,
      category: data.category,
    });
  });
  mkdirSync("./public/rss", { recursive: true });
  writeFileSync("./public/rss/feed.xml", feed.rss2());
  writeFileSync("./public/rss/feed.json", feed.json1());
}
