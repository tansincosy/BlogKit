import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import { NavBar } from "../components/header";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { Post } from "../types/post";
import Image from "next/image";
import Link from "next/link";
const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar></NavBar>
      <main>
        {posts.map((post) => {
          return (
            <div key={post.title}>
              <Link href={`/blog/${post.pathName}`}>
                <a>
                  <div className="title">{post.title}</div>
                  <div>
                    {post.thumbnail && (
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        height={200}
                        width={200}
                      ></Image>
                    )}
                    <div>{post.abstract}</div>
                    <div>
                      {Array.isArray(post.tags) &&
                        post.tags.map((tag) => {
                          return <div key={tag}>{tag}</div>;
                        })}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </main>

      <footer>footer</footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps<any, any, Post[]> = async () => {
  const fileNames = readdirSync("posts");
  const posts = fileNames.map((filename) => {
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
  console.log("posts", posts);
  return {
    props: {
      posts: posts,
    },
  };
};

export default Home;
