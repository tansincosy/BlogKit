import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Chips, Layout } from "@/components";
import { NextSeo } from "next-seo";
import { getCategoryPosts, getTagPosts } from "@/utils/read_file";
import { useRouter } from "next/router";

const Tag: NextPage<{
  tagPosts: Record<string, Blog.Post[]>;
  category: Blog.CategoryPost;
}> = ({ tagPosts, category }) => {
  const { push } = useRouter();
  return (
    <>
      <NextSeo title="标签" description="标签"></NextSeo>
      <Layout category={category}>
        <div className="overflow-hidden w-full h-40 md:h-60 relative mt-16">
          <div className="w-full h-full bg-center bg-cover bg-inverse-on-surface"></div>
          <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-primary">
            <h1 className="display-small md:display-large">标签</h1>
            <h4 className="title-large md:headline-medium mt-2">分类</h4>
          </div>
        </div>
        <main className="container mx-auto flex space-y-10 flex-col items-stretch mt-8 md:md-16 prose lg:prose-xl px-4">
          {Object.keys(tagPosts).map((tag) => {
            const currentPosts = tagPosts[tag];
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
                  {currentPosts.map(({ id, content: { title } }) => {
                    return (
                      <div
                        key={id}
                        className="title-medium md:title-large mt-2"
                      >
                        <Link href={`/blog/${id}`} passHref>
                          <a>{title}</a>
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
  const tagPosts = await getTagPosts();
  const allPostCategory = await getCategoryPosts();
  return {
    props: {
      tagPosts,
      category: allPostCategory,
    },
  };
};

export default Tag;
