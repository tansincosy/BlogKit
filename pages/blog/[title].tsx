import { readdirSync, readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import { join } from "path";
import matter from "gray-matter";
import { Layout } from "@/components";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import "highlight.js/styles/atom-one-dark.css";
import emoji from "markdown-it-emoji";
import taskList from "markdown-it-task-lists";
import footnote from "markdown-it-footnote";
import abbr from "markdown-it-abbr";
import container from "markdown-it-container";
import deflist from "markdown-it-deflist";
import ins from "markdown-it-ins";
import mark from "markdown-it-mark";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import dynamic from "next/dynamic";
import Gitalk from "gitalk";
const GitalkComponent = dynamic<{ options: Gitalk.GitalkOptions }>(
  () => import("gitalk/dist/gitalk-component"),
  {
    ssr: false,
  }
);
import YAML from "yaml";
import { AppConfig } from "@/types/config";

const PostDetail: NextPage<{
  content: string;
  thumbnail: string;
  title: string;
  appConfig: AppConfig;
}> = ({ content, thumbnail, title, appConfig }) => {
  return (
    <Layout>
      <div className="overflow-hidden w-full h-72 md:h-96 rounded-xl md:rounded-2xl relative mt-16 before:contents">
        <img src={thumbnail} alt={title} className="w-full" />
        <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-secondary">
          <h1 className="display-small md:display-large">{title}</h1>
          <h4 className="title-large md:headline-medium mt-2">dss</h4>
        </div>
      </div>
      <div className="text-on-surface mx-auto prose lg:prose-xl px-4 md:px-0 relative mt-8">
        <article
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></article>
      </div>
      <div className="text-on-surface mx-auto prose lg:prose-xl px-4 md:px-0">
        {typeof window && <GitalkComponent options={appConfig.gitalk} />}
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const files = readdirSync("posts");
  const paths = files.map((filename) => {
    return {
      params: {
        title: filename.replace(".md", ""),
      },
    };
  });
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<any, any, any> = async ({
  params: { title },
}) => {
  const yamlFiles = readFileSync("app.yaml", "utf8");
  const appConfig = YAML.parse(yamlFiles) as AppConfig;
  const filename = title + ".md";
  const fileContent = readFileSync(join("posts", filename));
  const contentStr = fileContent.toString("utf-8");
  const { content, data } = matter(contentStr);
  const md = new MarkdownIt();
  md.set({
    typographer: true,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
      );
    },
  })
    .use(emoji)
    .use(taskList)
    .use(footnote)
    .use(abbr)
    .use(container, "warning", {
      validate: function (params: string) {
        return params.trim().match(/^warning/);
      },
    })
    .use(container, "spoiler", {
      validate: function (params: string) {
        return params.trim().match(/^spoiler\s+(.*)$/);
      },
      render: function (tokens: any, idx: any) {
        var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
          // opening tag
          return (
            "<details><summary>" + md.utils.escapeHtml(m[1]) + "</summary>\n"
          );
        } else {
          // closing tag
          return "</details>\n";
        }
      },
    })
    .use(deflist)
    .use(ins)
    .use(mark)
    .use(sub)
    .use(sup)
    .render(content);

  return {
    props: {
      content: md.render(content),
      title: data.title || "",
      thumbnail: data.thumbnail || "",
      abstract: data.abstract || "",
      tags: data.tags || [],
      emoji: data.emoji || "",
      appConfig,
    },
  };
};

export default PostDetail;
