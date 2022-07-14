import { isEmpty } from "./index";
import { readdir, readFile, readFileSync } from "fs";
import { promisify } from "util";
import { Category, CateGoryPost, Post } from "@/types/post";
import matter from "gray-matter";
import Cache from "./cache";
import { AppConfig } from "@/types/config";
import { parse } from "yaml";

const readDirAsync = promisify(readdir);
export const getCategoryPosts = async (): Promise<CateGoryPost> => {
  if (!isEmpty(Cache.get("categoryPosts"))) {
    return Cache.get("categoryPosts");
  }
  const posts = await getAllPosts();
  let categoryPostCache = {};
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
    Cache.set("categoryPosts", {});
    Cache.set("categoryPosts", categoryPostCache);
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

export const getAllPosts = async (): Promise<string[]> => {
  if (!isEmpty(Cache.get("allPosts"))) {
    return Cache.get("allPosts");
  }

  let allPostCache: string[] = [];
  const files = (await readDirAsync("posts", "utf8")) || [];
  if (files.length > 0) {
    allPostCache = files.filter((filename) => {
      return filename.includes(".md") && !filename.startsWith("_");
    });
    Cache.set("allPosts", allPostCache);
  }
  return allPostCache;
};

export const getAppConfig = (): AppConfig => {
  if (!isEmpty(Cache.get("appConfig"))) {
    return Cache.get("appConfig") as AppConfig;
  }
  const appConfigYaml = readFileSync("app.yaml", {
    encoding: "utf-8",
  });
  const appConfig = parse(appConfigYaml) as AppConfig;
  Cache.set("appConfig", appConfig);
  return appConfig;
};
