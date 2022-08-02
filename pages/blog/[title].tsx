import type { GetStaticProps, NextPage } from "next";
import matter from "gray-matter";
import { Layout, Comment } from "@/components";
import { renderMarkdown } from "@/utils/md";
import { NextSeo } from "next-seo";
import { getBlogPosts, getCategoryPosts } from "@/utils/read_file";
import { getThemeColor } from "@/utils/getThemeColor";
import { getActuallyImagePath } from "@/utils/path";
import { readFile } from "fs/promises";
import { getElementPosition } from "@/utils";
import { useEffect } from "react";
import { useRef } from "react";
const PIN_DISTANCE = 400;

const PostDetail: NextPage<Blog.ArticleBody> = ({
  articleBody,
  category,
  themeColor,
  content,
}) => {
  const endMarkRef = useRef(null);
  let tocDom: Element | null;
  const showMaxTocDis = () => {
    if (endMarkRef.current) {
      return getElementPosition(endMarkRef.current).y;
    }
    return 0;
  };

  const getTocDom = () => {
    if (!tocDom) {
      tocDom = document.querySelector(".table-of-contents");
    }
    return tocDom;
  };

  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      0;
    const $tocDom = getTocDom();
    if (scrollTop > PIN_DISTANCE) {
      if ($tocDom) {
        $tocDom.className = "table-of-contents table-of-contents-static";
      }
    } else {
      if ($tocDom) {
        $tocDom.className = "table-of-contents";
      }
    }
  };

  useEffect(() => {
    // 在 React 中使用 addEventListener 监听事件
    document.addEventListener("scroll", handleScroll, true);
    // 组件卸载时移除事件监听
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

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
                className="w-full h-full bg-center bg-cover dark:brightness-50"
                style={{
                  backgroundImage: `url(${getActuallyImagePath(
                    content.thumbnail
                  )})`,
                }}
              ></div>
              <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-inverse-primary">
                <h1 className="display-small md:display-large">
                  {content.title}
                </h1>
                <h4 className="title-large md:headline-medium mt-2">
                  {content.abstract}
                </h4>
              </div>
            </div>
            <div className="text-on-surface mx-auto prose px-4 md:px-0 relative mt-8">
              <article
                dangerouslySetInnerHTML={{
                  __html: articleBody,
                }}
              ></article>
            </div>
            <div className="prose mx-auto">
              <hr id="end-mark" ref={endMarkRef}></hr>
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

  const fileContent = await readFile(
    curBlogPost.pathname + "/" + curBlogPost.filename,
    "utf8"
  );
  const contentStr = fileContent.toString();

  const body = matter(contentStr).content;
  let articleBody = body ? renderMarkdown(body) : ("" as string);
  console.log("articleBody", articleBody.match(/<(h[1-6])>([\S\s]*?)<\/\1>/));
  const themeColor = await getThemeColor(curBlogPost.content.thumbnail);
  return {
    props: {
      ...curBlogPost,
      articleBody,
      category: allPostCategory,
      themeColor,
    },
  };
};

export default PostDetail;
