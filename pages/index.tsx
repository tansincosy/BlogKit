import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { Card, Chips, Layout } from "@/components";
import { Category, Post, Profile } from "@/types/post";
import { NextSeo } from "next-seo";
import {
  getAllCategory,
  getAllPosts,
  getCategoryPosts,
} from "@/utils/read_file";
import { generateRss } from "@/utils/generta_rss";
import { profile } from "@/appConfig";
import { useRouter } from "next/router";

const Home: NextPage<{
  posts: Post[];
  profile: Profile;
  categories: Category[];
}> = ({ posts, profile, categories }) => {
  const { push } = useRouter();
  return (
    <>
      <NextSeo title={profile.title} description={profile.subtitle}></NextSeo>
      <Layout categories={categories}>
        <div className="overflow-hidden w-full h-80 md:h-96 relative mt-16">
          <div
            className="w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${profile.thumbnail})`,
            }}
          ></div>
          <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-primary">
            <h1 className="display-small md:display-large">{profile.title}</h1>
            <h4 className="title-large md:headline-medium mt-2">
              {profile.subtitle}
            </h4>
          </div>
        </div>
        <main className="container mx-auto flex flex-wrap items-stretch mt-8">
          {posts.map((post) => {
            return (
              <Card
                key={post.title}
                type="filled"
                className="flex w-full md:w-auto md:basis-80 m-4 z-10 overflow-hidden flex-col shrink md:pb-5 cursor-pointer"
              >
                <div
                  className="flex md:block"
                  onClick={() => {
                    push(`/blog/${post.pathName}`);
                  }}
                >
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
                              onClick={(event) => {
                                push(`/tags/${tag}`);
                                event.stopPropagation();
                              }}
                              className="m-1 z-10"
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
                </div>
              </Card>
            );
          })}
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<any, any, Post[]> = async () => {
  const allPosts = await getAllPosts();
  const posts = allPosts.map((filename) => {
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

  const allPostCategory = await getCategoryPosts();
  await generateRss();
  return {
    props: {
      posts: posts,
      profile: profile,
      categories: getAllCategory(allPostCategory),
    },
  };
};

export default Home;
