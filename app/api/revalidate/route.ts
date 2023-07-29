import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") || "";
  if (secret !== process.env.NEXT_PUBLIC_API_SECRET_TOKEN) {
    return NextResponse.json({ message: "Invalid token", revalidate: false });
  }
  revalidatePath("/");
  revalidatePath("/product/[slug]");
  return NextResponse.json({ revalidate: true });
}
