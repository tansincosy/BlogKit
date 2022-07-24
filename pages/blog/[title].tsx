import type { GetStaticProps, NextPage } from "next";
import matter from "gray-matter";
import { Layout, Comment } from "@/components";
import { renderMarkdown } from "@/utils/md";
import { NextSeo } from "next-seo";
import { getBlogPosts, getCategoryPosts } from "@/utils/read_file";
import { getThemeColor } from "@/utils/getThemeColor";
import { getActuallyImagePath } from "@/utils/path";
import { readFile } from "fs/promises";

const PostDetail: NextPage<Blog.ArticleBody> = ({
  articleBody,
  category,
  themeColor,
  content,
}) => {
  return (
    <>
      {content && (
        <>
          <NextSeo
            title={content.title}
            description={content.abstract}
          ></NextSeo>
          <Layout category={category} themeColor={themeColor}>
            <div className="overflow-hidden w-full h-72 md:h-96 relative mt-16 before:contents">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage: `url(${getActuallyImagePath(
                    content.thumbnail
                  )})`,
                }}
              ></div>
              <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-secondary">
                <h1 className="display-small md:display-large">
                  {content.title}
                </h1>
                <h4 className="title-large md:headline-medium mt-2">
                  {content.abstract}
                </h4>
              </div>
            </div>
            <div className="text-on-surface mx-auto prose lg:prose-xl px-4 md:px-0 relative mt-8">
              <article
                dangerouslySetInnerHTML={{
                  __html: articleBody,
                }}
              ></article>
            </div>
            <Comment />
          </Layout>
        </>
      )}
    </>
  );
};

export const getStaticPaths = async () => {
  const blogPosts = await getBlogPosts();
  const paths = blogPosts.map((post) => {
    return {
      params: {
        title: post.id,
      },
    };
  });
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<
  any,
  any,
  Blog.ArticleBody
> = async ({ params: { title } }) => {
  const blogPosts = await getBlogPosts();
  const allPostCategory = await getCategoryPosts();
  const curBlogPost = blogPosts.find((blogPost) => {
    return blogPost.id === title;
  });

  if (!curBlogPost) {
    return {
      props: {
        id: "",
        filename: "",
        pathname: "",
        content: {
          title: "",
          thumbnail: "",
          abstract: "",
          tags: [],
          date: "",
        },
        articleBody: "",
        category: allPostCategory,
        themeColor: "",
      },
    };
  }
  let articleBody = "";
  const fileContent = await readFile(
    curBlogPost.pathname + "/" + curBlogPost.filename,
    "utf8"
  );
  const contentStr = fileContent.toString();
  articleBody = matter(contentStr).content;
  const themeColor = await getThemeColor(curBlogPost.content.thumbnail);
  return {
    props: {
      ...curBlogPost,
      articleBody: articleBody ? renderMarkdown(articleBody) : "",
      category: allPostCategory,
      themeColor,
    },
  };
};

export default PostDetail;
