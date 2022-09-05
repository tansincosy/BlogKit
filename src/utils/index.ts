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

export const arrayIsEmpty = (value: any): boolean => {
  if (value === null || value === undefined || !Array.isArray(value)) {
    return true;
  }
  return Array.isArray(value) && value.length === 0;
};

const colorToHex = (color: number) => {
  var hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
};

//rgb to hex
export const rgbToHex = ([r, g, b]: [r: number, g: number, g: number]) => {
  return `#${colorToHex(r)}${colorToHex(g)}${colorToHex(b)}`;
};

export const timeToString = (time: number): string => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

// fork from vue-router@3.0.2
// src/util/scroll.js
export function getElementPosition(el: Element): {
  x: number;
  y: number;
} {
  const docEl = document.documentElement;
  const docRect = docEl.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top,
  };
}
