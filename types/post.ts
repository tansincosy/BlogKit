export interface Post {
  title: string;
  thumbnail: string;
  abstract: string;
  tags: string[];
  pathName: string;
}

export interface BasicInfo {
  title: string;
  introduce: string;
}

export type Category = {
  title: string;
  path: string;
  badge?: number;
};

export type CateGoryPost = {
  [key: string]: Post[];
};

export type Tag = {};

export type Theme = "light" | "dark";
