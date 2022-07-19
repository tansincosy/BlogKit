import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Card, Chips, Layout } from "@/components";
import { Category, Post } from "@/types/post";
import { getAllCategory, getCategoryPosts } from "@/utils/read_file";
import { arrayIsEmpty } from "@/utils";
import { getThemeColor } from "@/utils/getThemeColor";
import { getActuallyImagePath } from "@/utils/path";

const Category: NextPage<{
  posts: Post[];
  categories: Category[];
  categoryTitle: string;
  themeColor: string;
}> = ({ posts, categories, categoryTitle, themeColor }) => {
  return (
    <>
      <Layout categories={categories} themeColor={themeColor}>
        <div className="overflow-hidden w-full h-80 md:h-96 relative mt-16">
          <div
            className="w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${getActuallyImagePath("/imgs/work.jpg")})`,
            }}
          ></div>
          <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-primary">
            <h1 className="display-small md:display-large">{categoryTitle}</h1>
          </div>
        </div>
        <main className="container mx-auto flex flex-wrap items-stretch mt-8">
          {!arrayIsEmpty(posts) &&
            posts.map((post) => {
              return (
                <Card
                  key={post.title}
                  type="filled"
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
                          {!arrayIsEmpty(post.tags) &&
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

export const getStaticPaths = async () => {
  const allPostCategory = await getCategoryPosts();
  const paths = Object.keys(allPostCategory).map((pathKey) => {
    return {
      params: {
        name: pathKey,
      },
    };
  });
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<any, any, Post[]> = async ({
  params: { name },
}) => {
  const allPostCategory = await getCategoryPosts();
  const posts = allPostCategory[name];
  return {
    props: {
      posts: posts || [],
      categoryTitle: name,
      categories: getAllCategory(allPostCategory) || [],
      themeColor: await getThemeColor("public/imgs/work.jpg"),
    },
  };
};

export default Category;
