import isEmpty from "lodash/isEmpty";

class CacheManager {
  private cache: { [key: string]: any } = {};

  public get(key: string): any {
    const value = this.cache[key];
    return value;
  }

  public set(key: string, value: any): void {
    this.cache[key] = value;
  }
}

const cacheManager = new CacheManager();
const cacheFlag = 1;
export const cacheFunction = <K, T>(
  cacheKey: string,
  callback: (p?: K) => T
) => {
  return async (params?: K) => {
    if (!isEmpty(cacheManager.get(cacheKey)) && cacheFlag) {
      return cacheManager.get(cacheKey) as T;
    }
    const result = await callback(params);
    cacheManager.set(cacheKey, result);
    return result as T;
  };
};
