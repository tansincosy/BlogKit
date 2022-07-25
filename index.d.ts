declare module "markdown-it-task-lists";
declare module "markdown-it-footnote";
declare module "markdown-it-abbr";
declare module "markdown-it-deflist";
declare module "markdown-it-ins";
declare module "markdown-it-mark";
declare module "markdown-it-sub";
declare module "markdown-it-sup";
declare module "colorthief";
declare module "markdown-it-anchor";

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
    id: string;
    filename: string;
    pathname: string;
    content: {
      title: string;
      thumbnail: string;
      abstract: string;
      tags: string[];
      date: Date;
    };
  }

  interface ArticleBody extends Post {
    articleBody: string;
    category: CategoryPost;
    themeColor: string;
  }

  export interface BasicInfo {
    title: string;
    introduce: string;
  }

  export type CategoryPost = {
    [key: string]: Post[];
  };

  export type TagPost = {
    [key: string]: Post[];
  };
}
