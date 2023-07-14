"use client";
import useBlogService from "@/hooks/useBlogService";
import { IBlogResponse } from "@/interface/IBlogResponse";
import { SearchQuery } from "@/types/TSearchQuery";
import React from "react";
import { useQuery } from "react-query";
import { BlogView } from "./blogView";

export default function BlogClient() {
  const { onSearchBlog } = useBlogService();
  const fetchBlogs = async () => {
    let SearchQuery: SearchQuery = {
      FilterByOptions: [],
      OrderByOptions: [],
      PageIndex: 0,
      PageSize: 0,
    };
    return (await onSearchBlog(SearchQuery)) as IBlogResponse;
  };

  const { data: _response } = useQuery([], () => fetchBlogs(), {
    refetchOnWindowFocus: false,
  });
  return (
    <article className="divide-y-4 divide-stone-700 space-y-3">
      {_response?.blogs?.map((item, index) => (
        <BlogView blog={item} />
      ))}
    </article>
  );
}
