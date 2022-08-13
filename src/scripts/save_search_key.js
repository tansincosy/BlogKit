const algoliasearch = require("algoliasearch");
const { structurePostDir } = require("./all_post");
async function generateSearchResult({
  appKey = "",
  adminKey = "",
  searchNameSpace = "",
}) {
  const client = algoliasearch(
    appKey,
    adminKey //admin key 执行自己运行部署时，其他情况使用search key,
  );
  const index = client.initIndex(searchNameSpace);
  const allPosts = await structurePostDir("posts", []);
  index.replaceAllObjects(
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

module.exports = { generateSearchResult };
