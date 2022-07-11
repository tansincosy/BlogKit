import { readdirSync, readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import { join } from "path";
import matter from "gray-matter";
import { Layout } from "@/components";
import { renderMarkdown } from "@/utils/md";

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
import { createHash } from "crypto";
import { NextSeo } from "next-seo";

const PostDetail: NextPage<{
  id: string;
  content: string;
  thumbnail: string;
  title: string;
  appConfig: AppConfig;
  abstract: string;
}> = ({ content, thumbnail, title, appConfig, id, abstract }) => {
  appConfig.gitalk.id = id;
  return (
    <>
      <NextSeo title={title} description={abstract}></NextSeo>
      <Layout>
        <div className="overflow-hidden w-full h-72 md:h-96 relative mt-16 before:contents">
          <div
            className="w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}
          ></div>
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
    </>
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

  function md5(defaultStr = "", salt = ""): string {
    const saltStr = `${defaultStr}:${salt}`;
    const md5 = createHash("md5");
    return md5.update(saltStr).digest("hex");
  }

  const mdId = md5(filename, "md5");
  return {
    props: {
      id: mdId,
      content: renderMarkdown(content),
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
