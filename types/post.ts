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

export type TagPost = {
  [key: string]: Post[];
};

export type FootLink = {
  name: string;
  id?: string;
  url: string;
  icon: string;
};

export interface Contact {
  [key: string]: FootLink;
}

export interface Profile {
  title: string;
  subtitle: string;
  thumbnail: string;
  themeColor?: string;
}
