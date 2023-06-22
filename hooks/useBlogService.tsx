import BlogService from "@/service/BlogService";
import { SearchQuery } from "@/types/TSearchQuery";
import { useState } from "react";

const useBlogService = () => {
  const [BlogLoader, setBlogLoader] = useState(false);

  const GetById = (id: number) => {
    setBlogLoader(true);

    return new Promise((resolve, reject) => {
      BlogService.getById(id)
        .then((res) => {
          setBlogLoader(false);
          resolve(res.data);
        })
        .catch((err) => {
          setBlogLoader(false);
          reject(err);
        });
    });
  };

  const onGetArticle = (id: number) => {
    setBlogLoader(true);
    return new Promise((resolve, reject) => {
      BlogService.getArticleById(id)
        .then((res) => {
          setBlogLoader(false);
          resolve(res.data);
        })
        .catch((err) => {
          setBlogLoader(false);
          reject(err);
        });
    });
  };

  const onSearchArticle = (search: SearchQuery) => {
    setBlogLoader(true);
    return new Promise((resolve, reject) => {
      BlogService.searchArticle(search)
        .then((res) => {
          setBlogLoader(false);
          resolve(res.data);
        })
        .catch((err) => {
          setBlogLoader(false);
          reject(err);
        });
    });
  };

  const onSearchBlog = (search: SearchQuery) => {
    setBlogLoader(true);
    return new Promise((resolve, reject) => {
      BlogService.searchBlogs(search)
        .then((res) => {
          setBlogLoader(false);
          resolve(res.data);
        })
        .catch((err) => {
          setBlogLoader(false);
          reject(err);
        });
    });
  };

  return {
    GetById,
    onGetArticle,
    onSearchArticle,
    onSearchBlog,
    BlogLoader,
  };
};

export default useBlogService;
