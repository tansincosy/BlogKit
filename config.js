/** @type {Blog.Config} */
const Config = {
  siteURL: "https://tansincosy.github.io/BlogKit/",
  buildBasePath: "/BlogKit",
  profile: {
    title: "sample",
    subtitle: "subtitle",
    thumbnail: "/imgs/index.jpg",
    themeColor: "#fff",
  },
  comment: {
    repo: "tansincosy/Blog-Comment",
  },

  contact: {
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
  },
};

module.exports = Config;
