import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import { Layout } from "@/components";
import { NextSeo } from "next-seo";
import { renderMarkdown } from "@/utils/md";
import { existsSync } from "fs";
import { getCategoryPosts } from "@/utils/read_file";

const Tag: NextPage<{ content: string; category: Blog.CategoryPost }> = ({
  content,
  category,
}) => {
  return (
    <>
      <NextSeo title="关于" description="关于"></NextSeo>
      <Layout category={category}>
        <div className="overflow-hidden w-full h-40 md:h-60 relative mt-16">
          <div className="w-full h-full bg-center bg-cover bg-inverse-on-surface"></div>
          <div className="absolute z-10 w-full h-full top-0 flex flex-col justify-center items-center text-primary">
            <h1 className="display-small md:display-large">关于</h1>
          </div>
        </div>
        <main className="container mx-auto flex flex-wrap items-stretch mt-8 md:md-16 text-on-surface prose lg:prose-xl px-4 md:px-0">
          {content ? (
            <article
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></article>
          ) : (
            <p>没有相关内容</p>
          )}
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
  let aboutContentMd = "";
  if (existsSync("posts/_about.md")) {
    aboutContentMd = readFileSync("posts/_about.md", {
      encoding: "utf8",
    });
  }
  const allPostCategory = await getCategoryPosts();
  return {
    props: {
      content: aboutContentMd ? renderMarkdown(aboutContentMd) : "",
      category: allPostCategory,
    },
  };
};

export default Tag;
