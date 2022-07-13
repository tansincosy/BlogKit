import { isEmpty } from "./index";
import { readdir, readFile, readFileSync } from "fs";
import { promisify } from "util";
import { Category, CateGoryPost, Post } from "@/types/post";
import matter from "gray-matter";

const readDirAsync = promisify(readdir);
let categoryPostCache: CateGoryPost = {};
export const getCategoryPosts = async (): Promise<CateGoryPost> => {
  if (!isEmpty(categoryPostCache)) {
    return categoryPostCache;
  }
  const posts = await getAllPosts();
  categoryPostCache = {};
  if (posts.length > 0) {
    categoryPostCache = posts.reduce((total: Record<string, Post[]>, posts) => {
      const fileContent = readFileSync(`posts/${posts}`).toString();
      let pathName = posts.replace(".md", "");
      const { data } = matter(fileContent) || {};
      if (!isEmpty(data.category)) {
        const category = data.category;
        if (!total[category]) {
          total[category] = [];
        }
        total[category].push({
          title: data.title,
          pathName: pathName,
          abstract: data.abstract,
          tags: data.tags,
          thumbnail: data.thumbnail,
        });
      }
      return total;
    }, {});
  }
  return categoryPostCache;
};

export const getAllCategory = (cateGoryPost: CateGoryPost): Category[] => {
  return Object.keys(cateGoryPost).map((key: string) => {
    return {
      title: key,
      path: `/category/${key}`,
      badge: cateGoryPost[key].length,
    };
  }) as Category[];
};

let allPostCache: string[] = [];
export const getAllPosts = async (): Promise<string[]> => {
  if (allPostCache.length > 0) {
    return allPostCache;
  }
  allPostCache = [];
  const files = (await readDirAsync("posts", "utf8")) || [];
  if (files.length > 0) {
    allPostCache = files.filter((filename) => {
      return filename.includes(".md") && !filename.startsWith("_");
    });
  }
  return allPostCache;
};
