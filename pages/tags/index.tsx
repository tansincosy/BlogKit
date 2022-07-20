import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { Chips, Layout } from "@/components";
import { NextSeo } from "next-seo";
import { getAllCategory, getCategoryPosts } from "@/utils/read_file";
import { useRouter } from "next/router";

const Tag: NextPage<{
  postTags: Record<string, Blog.Post[]>;
  categories: Blog.Category[];
}> = ({ postTags, categories }) => {
  const { push } = useRouter();
  return (
    <>
      <NextSeo title="标签" description="标签"></NextSeo>
      <Layout categories={categories}>
        <div className="overflow-hidden w-full h-40 md:h-60 relative mt-16">
          <div className="w-full h-full bg-center bg-cover bg-inverse-on-surface"></div>
          <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-primary">
            <h1 className="display-small md:display-large">标签</h1>
            <h4 className="title-large md:headline-medium mt-2">分类</h4>
          </div>
        </div>
        <main className="container mx-auto flex space-y-10 flex-col items-stretch mt-8 md:md-16 prose lg:prose-xl px-4">
          {Object.keys(postTags).map((tag) => {
            const currentPosts = postTags[tag];
            return (
              <div key={tag}>
                <Chips
                  type={"input"}
                  onClick={() => {
                    push(`tags/${tag}`);
                  }}
                >
                  {tag}
                </Chips>
                <div className="mt-4 md:mt-8">
                  {currentPosts.map((post) => {
                    return (
                      <div
                        key={post.pathName}
                        className="title-medium md:title-large mt-2"
                      >
                        <Link href={post.pathName} passHref>
                          <a>{post.title}</a>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  any,
  any,
  Blog.Post[]
> = async () => {
  const fileNames = readdirSync("posts");
  const postTags = fileNames
    .filter((filename) => {
      return filename.includes(".md") && !filename.startsWith("_");
    })
    .reduce((total: Record<string, Blog.Post[]>, filename) => {
      const fileContent = readFileSync(`posts/${filename}`).toString();
      let pathName = filename.replace(".md", "");
      const { data } = matter(fileContent) || {};
      if (data.tags) {
        data.tags.forEach((tag: any) => {
          if (!total[tag]) {
            total[tag] = [];
          }
          total[tag].push({
            title: data.title,
            pathName: "blog/" + pathName,
            abstract: data.abstract,
            tags: data.tags,
            thumbnail: data.thumbnail,
          });
        });
      }
      return total;
    }, {});

  const allPostCategory = await getCategoryPosts();
  return {
    props: {
      postTags,
      categories: getAllCategory(allPostCategory),
    },
  };
};

export default Tag;
