import { readdirSync, readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import { join } from "path";
import { marked } from "marked";
import matter from "gray-matter";
import { Layout } from "@/components";
import hljs from "highlight.js";
import Markdown from "markdown-it";

const PostDetail: NextPage<any> = ({ content }) => {
  return (
    <Layout>
      <main className="container body-large text-on-surface">
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
  //   marked.setOptions({
  //     highlight: function (code, lang) {
  //       const language = hljs.getLanguage(lang) ? lang : "plaintext";
  //       return hljs.highlight(code, { language }).value;
  //     },
  //     langPrefix: "hljs language-",
  //   });
  const htmlContent = Markdown({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ""; // use external default escaping
    },
    langPrefix: "hljs language-",
  }).render(content);

  return {
    props: {
      content: htmlContent,
    },
  };
};

export default PostDetail;
