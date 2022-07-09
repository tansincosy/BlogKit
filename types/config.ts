import Gitalk from "gitalk";
export interface AppConfig {
  gitalk: Gitalk.GitalkOptions;
  profile: {
    name: string;
    description: string;
    github: string;
    email: string;
  };
}
