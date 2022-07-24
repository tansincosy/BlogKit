import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "@/components";
import { NextSeo } from "next-seo";
import { getCategoryPosts, getTagPosts } from "@/utils/read_file";
import { arrayIsEmpty } from "@/utils";

const Tag: NextPage<{
  posts: Blog.Post[];
  category: Blog.CategoryPost;
  title: string;
}> = ({ posts, category, title }) => {
  return (
    <>
      <NextSeo title="标签" description="标签"></NextSeo>
      <Layout category={category}>
        <div className="overflow-hidden w-full h-40 md:h-60 relative mt-16">
          <div className="w-full h-full bg-center bg-cover bg-inverse-on-surface"></div>
          <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-primary">
            <h1 className="display-small md:display-large"># {title}</h1>
          </div>
        </div>
        <main className="container mx-auto flex space-y-10 flex-col items-stretch mt-8 md:md-16 prose lg:prose-xl px-4">
          {!arrayIsEmpty(posts) &&
            posts.map(({ content: { title }, id }) => {
              return (
                <div key={title}>
                  <div className="mt-4 md:mt-8">
                    <div key={id}>
                      <Link href={"/blog/" + id} passHref>
                        <a className="title-medium md:title-large mt-2">
                          {title}
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
  const tagPost = await getTagPosts();
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
  const tagPostAll = await getTagPosts();
  const allPostCategory = await getCategoryPosts();
  return {
    props: {
      title: id || "没有相关标签",
      posts: tagPostAll[id] || [],
      category: allPostCategory,
    },
  };
};

export default Tag;
