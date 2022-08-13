// 配置文件
export const siteURL = "https://tansincosy.github.io/BlogKit/";
export const profile: Blog.Profile = {
  title: "sample",
  subtitle: "subtitle",
  thumbnail: "/imgs/index.jpg",
};
export const comment: Blog.Comment = {
  repo: "tansincosy/Blog-Comment",
};
export const contact: Blog.Contact = {
  github: {
    name: "GitHub",
    icon: "github",
    url: "https://github.com/tansincosy",
  },
  rss: {
    name: "RSS",
    icon: "rss",
    url: "https://tansincosy.github.io/BlogKit/rss/feed.xml",
  },
  gmail: {
    name: "Gmail",
    icon: "mail",
    url: "mailto:xxxx@xxx.com",
  },
};
export const algolia = {
  searchNameSpace: "blog",
  appId: "8M6OVN93T7",
  adminKey: "94db0de8ad6ab305ba60487981ffa5fc",
  searchKey: "53c3c2bf132c85a0711774abc6052a65",
};
