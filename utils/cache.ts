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

export default new CacheManager();
