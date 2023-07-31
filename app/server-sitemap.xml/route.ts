import { getAllPaths } from "@/lib/sitemapHelper";
import { getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
  const urls = await getAllPaths();
  return getServerSideSitemap(urls);
}
