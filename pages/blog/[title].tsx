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

const PostDetail: NextPage<any> = ({ content, thumbnail, title, emoji }) => {
  return (
    <Layout>
      <div className="overflow-hidden w-full h-72 md:h-96 rounded-b-xl md:rounded-b-2xl">
        <img src={thumbnail} alt={title} className="w-full" />
      </div>
      <div className="text-on-surface mx-auto prose lg:prose-xl px-4 md:px-0 relative mt-8">
        {emoji && (
          <div className="w-16 h-16 leading-none absolute -top-16">
            <span className="text-[64px]">{emoji}</span>
          </div>
        )}
        <h1 className="display-large text-on-surface mx-auto mt-6">{title}</h1>
        <article
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></article>
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
  console.log("paths", paths);
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<any, any, any> = async ({
  params: { title },
}) => {
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
    },
  };
};

export default PostDetail;
