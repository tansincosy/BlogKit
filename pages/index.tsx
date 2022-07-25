import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { Card, Chips, Layout } from "@/components";
import { NextSeo } from "next-seo";
import { generateRss } from "@/utils/generta_rss";
import { profile } from "@/config";
import { useRouter } from "next/router";
import { getActuallyImagePath } from "@/utils/path";
import { getBlogPosts, getCategoryPosts } from "@/utils/read_file";
import sortBy from "lodash/sortBy";
import { arrayIsEmpty } from "@/utils";
import { getThemeColor } from "@/utils/getThemeColor";

const Home: NextPage<{
  posts: Blog.Post[];
  profile: Blog.Profile;
  category: Blog.CategoryPost;
  themeColor: string;
}> = ({ posts, profile, category, themeColor }) => {
  const { push } = useRouter();
  return (
    <>
      <NextSeo title={profile.title} description={profile.subtitle}></NextSeo>
      <Layout category={category} themeColor={themeColor}>
        <div className="overflow-hidden w-full h-80 md:h-96 relative mt-16">
          <div
            className="w-full h-full bg-center bg-local dark:brightness-50"
            style={{
              backgroundImage: `url(${getActuallyImagePath(
                profile.thumbnail
              )})`,
            }}
          ></div>
          <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center ">
            <h1 className="display-small md:display-large text-inverse-primary">
              {profile.title}
            </h1>
            <h4 className="title-large md:headline-medium mt-2 text-inverse-primary">
              {profile.subtitle}
            </h4>
          </div>
        </div>
        <main className="container mx-auto flex flex-wrap items-stretch mt-8">
          {!arrayIsEmpty(posts) &&
            posts.map((post) => {
              return (
                <Card
                  key={post.id}
                  type="filled"
                  className="flex w-full md:w-auto md:basis-80 m-4 z-10 overflow-hidden flex-col shrink md:pb-5 cursor-pointer"
                >
                  <div
                    className="flex md:block"
                    onClick={() => {
                      push(`blog/${post.id}`);
                    }}
                  >
                    {post.content.thumbnail && (
                      <div className="h-24 w-24 overflow-hidden rounded-xl md:w-full md:h-48">
                        <img
                          src={post.content.thumbnail}
                          alt={post.content.title}
                          className="w-full "
                        ></img>
                      </div>
                    )}
                    <div className="box-border px-6 flex flex-col justify-center">
                      <h1 className="title-medium md:headline-medium text-primary mt-1 md:mt-5">
                        {post.content.title}
                      </h1>
                      <h2 className="label-medium md:label-large text-secondary md:mt-2">
                        {post.content.abstract}
                      </h2>
                      <div className="md:mt-2">
                        {Array.isArray(post.content.tags) &&
                          !arrayIsEmpty(post.content.tags) &&
                          post.content.tags.map((tag) => {
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

export const getStaticProps: GetStaticProps<
  any,
  any,
  Blog.Post[]
> = async () => {
  const blogPosts = await getBlogPosts();
  const showBlogPosts = sortBy(blogPosts, (post) => post.content.date).filter(
    (_, index: number) => {
      //首页发布支持显示20页
      return index < 20;
    }
  );
  const category = await getCategoryPosts();
  const imagePath = getActuallyImagePath(profile.thumbnail);
  const colorImg = imagePath.startsWith("/") ? `public${imagePath}` : imagePath;
  const themeColor = await getThemeColor(colorImg);
  // rss 订阅
  await generateRss();
  return {
    props: {
      posts: showBlogPosts,
      profile: profile,
      category: category,
      themeColor,
    },
  };
};

export default Home;
