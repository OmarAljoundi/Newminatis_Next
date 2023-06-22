import { SearchQuery } from "@/types/TSearchQuery";
import { http } from "./httpService";
import axios from "axios";
import { IBlogResponse } from "@/interface/IBlogResponse";

class BlogService {
  getById(id: number) {
    return http(axios.create()).get<IBlogResponse>(`/Blog/${id}`);
  }

  getArticleById(id: number) {
    return http(axios.create()).get<IBlogResponse>(
      `/Blog/GetArticleById/${id}`
    );
  }

  searchArticle(search: SearchQuery) {
    return http(axios.create()).post<IBlogResponse>(
      `/Blog/SearchArticle`,
      search
    );
  }

  searchBlogs(search: SearchQuery) {
    return http(axios.create()).post<IBlogResponse>(
      `/Blog/SearchBlogs`,
      search
    );
  }
}

export default new BlogService();
