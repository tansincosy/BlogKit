import { arrayIsEmpty } from "./index";
import matter from "gray-matter";
import { cacheFunction } from "./cache";
import { stat, readdir, readFile } from "fs/promises";

/**
 * 结构目录所有文章
 * @param dirName  目录名
 * @param posts 文章
 * @returns {Promise<Blog.Post[]>}
 */
const structurePostDir = async (dirName: string, posts: Blog.Post[]) => {
  const files = await readdir(dirName);
  const filePromiseSequence = files.map(async (file) => {
    const fileStat = await stat(`${dirName}/${file}`);
    if (fileStat.isDirectory()) {
      return await structurePostDir(`${dirName}/${file}`, posts);
    } else {
      //不以下划线开头
      if (!file.startsWith("_")) {
        const fileContent = await readFile(`${dirName}/${file}`);

        const { data } = matter(fileContent) || {};
        if (data) {
          posts.push({
            id: file.replace(".md", ""),
            filename: file,
            pathname: dirName,
            content: {
              title: data.title,
              thumbnail: data.thumbnail,
              abstract: data.abstract,
              tags: data.tags,
              date: data.date ? data.date.getTime() : "",
            },
          });
        }
        return posts;
      }
    }
  });
  // 确保async 执行顺序正确
  await Promise.all(filePromiseSequence);
  return posts;
};

/**
 * 获取所有文章的基本信息
 */
export const getBlogPosts = cacheFunction<string, Promise<Blog.Post[]>>(
  "getBlogPosts",
  async (dirName = "posts") => {
    return await structurePostDir(dirName, []);
  }
);

/**
 * 安装类别进行分组
 * @returns
 */
export const getCategoryPosts = cacheFunction<
  number,
  Promise<Record<string, Blog.Post[]>>
>("getCategoryPosts", async (cateIndex = 1) => {
  const blogPosts = await getBlogPosts();
  return blogPosts.reduce(
    (cateCollects: Record<string, Blog.Post[]>, blogPost) => {
      //只提取地址第一位元素
      const pathnames = blogPost.pathname.split("/");
      if (pathnames[cateIndex]) {
        if (!cateCollects[pathnames[cateIndex]]) {
          cateCollects[pathnames[cateIndex]] = [];
        }
        cateCollects[pathnames[cateIndex]].push(blogPost);
      }
      return cateCollects;
    },
    {}
  );
});

/**
 * 按照tag 进行分组
 * @returns
 */
export const getTagPosts = cacheFunction("getTagPosts", async () => {
  const blogPosts = await getBlogPosts();
  return blogPosts.reduce(
    (tagCollects: Record<string, Blog.Post[]>, blogPost: Blog.Post) => {
      const tags = blogPost.content.tags;
      if (!arrayIsEmpty(tags)) {
        tags.forEach((tag: string) => {
          if (!tagCollects[tag]) {
            tagCollects[tag] = [];
          }
          tagCollects[tag].push(blogPost);
        });
      }
      return tagCollects;
    },
    {}
  );
});
