import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { Card, Chips, Layout } from "@/components";
import { Post, BasicInfo } from "@/types/post";
import { NextSeo } from "next-seo";

const Tag: NextPage<{ posts: Post[]; basicInfo: BasicInfo }> = ({
  posts,
  basicInfo,
}) => {
  return (
    <>
      <NextSeo title="标签" description="标签"></NextSeo>
      <Layout>
        <div className="overflow-hidden w-full h-40 md:h-60 relative mt-16">
          <div className="w-full h-full bg-center bg-cover bg-on-primary"></div>
          <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-primary">
            <h1 className="display-small md:display-large">标签</h1>
            <h4 className="title-large md:headline-medium mt-2">分类</h4>
          </div>
        </div>
        <main className="container mx-auto flex flex-wrap items-stretch mt-8 md:md-16">
          {posts.map((post) => {
            return (
              <Card
                key={post.title}
                type="elevated"
                className="flex w-full md:w-auto md:basis-80 m-4 z-10 overflow-hidden flex-col shrink md:pb-5 cursor-pointer"
              >
                <Link href={`/blog/${post.pathName}`} passHref>
                  <a className="flex md:block">
                    {post.thumbnail && (
                      <div className="h-24 w-24 overflow-hidden rounded-xl md:w-full md:h-48">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full "
                        ></img>
                      </div>
                    )}
                    <div className="box-border px-6 flex flex-col justify-center">
                      <h1 className="title-medium md:headline-medium text-primary mt-1 md:mt-5">
                        {post.title}
                      </h1>
                      <h2 className="label-medium md:label-large text-secondary md:mt-2">
                        {post.abstract}
                      </h2>
                      <div className="md:mt-2">
                        {Array.isArray(post.tags) &&
                          post.tags.map((tag) => {
                            return (
                              <Chips
                                className="m-1"
                                icon="price-tag-3"
                                key={tag}
                                type="suggestion"
                              >
                                {tag}
                              </Chips>
                            );
                          })}
                      </div>
                    </div>
                  </a>
                </Link>
              </Card>
            );
          })}
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<any, any, Post[]> = async () => {
  const fileNames = readdirSync("posts");
  const posts = fileNames
    .filter((filename) => {
      const fileContent = readFileSync(`posts/${filename}`).toString();
      const { data } = matter(fileContent) || {};
      return (
        data.visible !== false &&
        filename.includes(".md") &&
        !filename.startsWith("_")
      );
    })
    .map((filename) => {
      const fileContent = readFileSync(`posts/${filename}`).toString();
      let pathName = filename.replace(".md", "");
      const { data } = matter(fileContent) || {};
      return {
        title: data.title || "",
        thumbnail: data.thumbnail || "",
        abstract: data.abstract || "",
        tags: data.tags || [],
        pathName,
      };
    }) as Post[];

  const basicInfo = {
    title: "SPD Blog",
    introduce: "life working with SPD",
  };
  return {
    props: {
      posts: posts,
      basicInfo,
    },
  };
};

export default Tag;
