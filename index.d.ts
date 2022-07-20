declare module "markdown-it-task-lists";
declare module "markdown-it-footnote";
declare module "markdown-it-abbr";
declare module "markdown-it-deflist";
declare module "markdown-it-ins";
declare module "markdown-it-mark";
declare module "markdown-it-sub";
declare module "markdown-it-sup";
declare module "colorthief";

declare module Blog {
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

  export type Comment = {
    repo?: string;
  };

  export type Config = {
    siteURL: string;
    profile: Profile;
    contact: Contact;
    comment: Comment;
    buildBasePath?: string;
  };

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
}
