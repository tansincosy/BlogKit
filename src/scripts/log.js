const chalk = require("chalk");

const LOG_INFO = (...rest) => {
  return console.log(chalk.blue("info"), " - ", ...rest);
};

const LOG_ERROR = (...rest) => {
  return console.error(chalk.red("info"), " - ", ...rest);
};

module.exports = {
  LOG_INFO,
  LOG_ERROR,
};
