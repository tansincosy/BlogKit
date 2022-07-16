import { Contact } from "./types/post";

export const config = {
  siteURL: "http://localhost:3000",
};

//个人全局配置
export const profile = {
  title: "sample",
  subtitle: "subtitle",
  thumbnail: "/imgs/index.jpg",
  themeColor: "#fff",
};

//链接配置
export const contact: Contact = {
  github: {
    name: "GitHub",
    icon: "github",
    url: "https://github.com/tansincosy",
  },
  rss: {
    name: "RSS",
    icon: "rss",
    url: "/rss/feed.xml",
  },
  gmail: {
    name: "Gmail",
    icon: "mail",
    url: "mailto:charlesmaxwellyoung@gmail.com",
  },
};
