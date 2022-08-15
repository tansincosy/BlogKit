const { readdir, stat, readFile } = require("fs/promises");
const matter = require("gray-matter");

const structurePostDir = async (dirName, posts) => {
  const files = await readdir(dirName);
  const filePromiseSequence = files.map(async (file) => {
    const fileStat = await stat(`${dirName}/${file}`);
    if (fileStat.isDirectory()) {
      return await structurePostDir(`${dirName}/${file}`, posts);
    } else {
      //不以下划线开头
      if (!file.startsWith("_")) {
        const fileContent = await readFile(`${dirName}/${file}`);

        const { data } = matter(fileContent) || {};
        if (data) {
          posts.push({
            id: file.replace(".md", ""),
            filename: file,
            pathname: dirName,
            content: {
              title: data.title,
              thumbnail: data.thumbnail,
              abstract: data.abstract,
              tags: data.tags,
              date: data.date ? data.date : new Date(fileStat.mtime),
            },
          });
        }
        return posts;
      }
    }
  });
  // 确保async 执行顺序正确
  await Promise.all(filePromiseSequence);
  return posts;
};

module.exports = { structurePostDir };
