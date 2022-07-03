import { readdirSync, readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import { join } from "path";
import matter from "gray-matter";
import { Layout } from "@/components";
import hljs from "highlight.js";
import Markdown from "markdown-it";
import "highlight.js/styles/atom-one-dark.css";

const PostDetail: NextPage<any> = ({ content }) => {
  return (
    <Layout>
      <main className="container text-on-surface mx-auto prose lg:prose-xl">
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
  const md = Markdown({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
      const mkit = new Markdown();
      return (
        '<pre class="hljs"><code>' +
        mkit.utils.escapeHtml(str) +
        "</code></pre>"
      ); // use external default escaping
    },
    langPrefix: "hljs language-",
  }).render(content);

  return {
    props: {
      content: md,
    },
  };
};

export default PostDetail;
