import { TBlogs } from "@/types/TBlog";
import { IBaseResponse } from "./IBaseResponse";
import { TPublishArticles } from "@/types/TPublishArticle";

export interface IBlogResponse extends IBaseResponse {
  blog: TBlogs;
  blogs: TBlogs[];
  publishArticle: TPublishArticles;
  publishArticles: TPublishArticles[];
  total: number;
}
