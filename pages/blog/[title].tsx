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

const PostDetail: NextPage<any> = ({ content }) => {
  return (
    <Layout>
      <main className="container text-on-surface mx-auto prose lg:prose-xl px-4">
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </main>
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
  const filename = title + ".md";
  const fileContent = readFileSync(join("posts", filename));
  const contentStr = fileContent.toString("utf-8");
  const { content } = matter(contentStr);
  const md = new MarkdownIt();
  md.set({
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
    .use(container)
    .use(deflist)
    .use(ins)
    .use(mark)
    .use(sub)
    .use(sup)
    .render(content);

  return {
    props: {
      content: md.render(content),
    },
  };
};

export default PostDetail;
