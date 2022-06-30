import { readdirSync, readFileSync } from "fs";
import type { GetStaticProps, NextPage } from "next";
import { join } from "path";
import { marked } from "marked";
import matter from "gray-matter";

const PostDetail: NextPage<any> = ({ content }) => {
  return (
    <div>
      <main>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </main>
    </div>
  );
};

export const getStaticPaths = async () => {
  const files = readdirSync("posts");
  const paths = files.map((filename) => {
    return {
      params: {
        title: filename.replace(".md", ""),
      },
    };
  });
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<any, any, any> = async ({
  params: { title },
}) => {
  const filename = title + ".md";
  const fileContent = readFileSync(join("posts", filename));
  const contentStr = fileContent.toString("utf-8");
  const { content } = matter(contentStr);
  const htmlContent = marked.parse(content);

  return {
    props: {
      content: htmlContent,
    },
  };
};

export default PostDetail;
