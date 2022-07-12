export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    .replace(/^-/, "");
};

/**
 * 合并className
 * @param classNames
 * @returns
 */
export const singleLineClass = (...classNames: string[]): string =>
  classNames.reduce((total, cur) => {
    total += ` ${cur.replaceAll(/(\n|\s+)/g, " ")}`;
    return total;
  }, "");

/**
 * 判断是否为手机
 * @param userAgent
 * @returns
 */
export const isPhone = (userAgent: any): boolean => {
  const userAgentInfo = userAgent ? userAgent : navigator.userAgent;
  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone"];
  let flag = false;
  for (let v = 0; v < agents.length; v++) {
    if (userAgentInfo.indexOf(agents[v]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
};

//lodash中isEmpty方法的实现
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
};
