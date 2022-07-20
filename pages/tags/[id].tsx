import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "@/components";
import { NextSeo } from "next-seo";
import {
  getAllCategory,
  getCategoryPosts,
  getTagPost,
} from "@/utils/read_file";
import { arrayIsEmpty, isEmpty } from "@/utils";

const Tag: NextPage<{
  postTags: Blog.Post[];
  categories: Blog.Category[];
  title: string;
}> = ({ postTags, categories, title }) => {
  return (
    <>
      <NextSeo title="标签" description="标签"></NextSeo>
      <Layout categories={categories}>
        <div className="overflow-hidden w-full h-40 md:h-60 relative mt-16">
          <div className="w-full h-full bg-center bg-cover bg-inverse-on-surface"></div>
          <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-primary">
            <h1 className="display-small md:display-large"># {title}</h1>
          </div>
        </div>
        <main className="container mx-auto flex space-y-10 flex-col items-stretch mt-8 md:md-16 prose lg:prose-xl px-4">
          {!arrayIsEmpty(postTags) &&
            postTags.map((currentPosts) => {
              return (
                <div key={currentPosts.title}>
                  <div className="mt-4 md:mt-8">
                    <div key={currentPosts.pathName}>
                      <Link href={"/blog/" + currentPosts.pathName} passHref>
                        <a className="title-medium md:title-large mt-2">
                          {currentPosts.title}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </main>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const tagPost = await getTagPost();
  const paths = Object.keys(tagPost).map((tag) => {
    return {
      params: {
        id: tag,
      },
    };
  });
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<any, any, Blog.Post[]> = async ({
  params: { id },
}) => {
  const tagPostAll = await getTagPost();
  const tagPost = tagPostAll[id] || [];
  const allPostCategory = await getCategoryPosts();
  return {
    props: {
      title: id || "没有相关标签",
      postTags: tagPost,
      categories: getAllCategory(allPostCategory),
    },
  };
};

export default Tag;
