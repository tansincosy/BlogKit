export interface Profile {
  name: string;
  description: string;
  github: string;
  email: string;
  cover: string;
}

export interface AppConfig {
  profile: Profile;
}
