const algoliasearch = require("algoliasearch");
const { structurePostDir } = require("./all_post");

const generateSearchResult = async ({
  NEXT_PUBLIC_ALGOLIA_APP_ID = "",
  NEXT_PUBLIC_ALGOLIA_ADMIN_KEY = "",
  NEXT_PUBLIC_ALGOLIA_INDEX_NAME = "",
}) => {
  const client = algoliasearch(
    NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_ADMIN_KEY //admin key 执行自己运行部署时，其他情况使用search key,
  );
  const index = await client.initIndex(NEXT_PUBLIC_ALGOLIA_INDEX_NAME);
  const allPosts = await structurePostDir("posts", []);
  if (index) {
    await index.replaceAllObjects(
      allPosts.map((item) => {
        return {
          objectID: item.id,
          title: item.content.title,
          tags: item.content.tags,
          abstract: item.content.abstract,
          path: "/blog/" + item.id,
        };
      })
    );
  }
};

module.exports = { generateSearchResult };
