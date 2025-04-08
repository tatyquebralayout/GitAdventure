export interface ProjectConfig {
  name: string;
  version: string;
  repository: string;
  author: {
    name: string;
    email: string;
    website: string;
  };
  social: {
    github: string;
    twitter: string;
    linkedin: string;
  };
}