import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { Card, Chips, Layout } from "@/components";
import { Post } from "@/types/post";

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="container mx-auto flex flex-wrap justify-center items-stretch mt-16">
          {posts.map((post) => {
            return (
              <Card
                key={post.title}
                type="elevated"
                className="flex w-full md:w-auto md:basis-80 m-4 z-10 overflow-hidden flex-col shrink md:pb-5 cursor-pointer"
              >
                <Link href={`/blog/${post.pathName}`} passHref>
                  <a className="flex md:block ">
                    {post.thumbnail && (
                      <div className="h-24 w-24 overflow-hidden rounded-xl md:w-full md:h-48">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full "
                        ></img>
                      </div>
                    )}
                    <div className="box-border px-6">
                      <h1 className="headline-small md:headline-medium text-primary mt-1 md:mt-5">
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
      <footer>footer</footer>
    </>
  );
};

export const getStaticProps: GetStaticProps<any, any, Post[]> = async () => {
  const fileNames = readdirSync("posts");
  const posts = fileNames
    .filter((filename) => filename.includes(".md"))
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
  return {
    props: {
      posts: posts,
    },
  };
};

export default Home;
