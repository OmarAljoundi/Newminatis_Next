import { InstagramSectionClient } from "./InstagramSectionClient";
import { getInstagramData } from "@/lib/serverActions";

export default async function InstagramSection() {
  const instagramFees = await getInstagramData();
  return (
    <>
      <InstagramSectionClient instagramFeeds={instagramFees.instagram} />
    </>
  );
}
