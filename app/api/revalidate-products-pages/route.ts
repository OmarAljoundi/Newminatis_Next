import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET() {
  try {
    revalidatePath("/product/[slug]");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (ex) {
    return NextResponse.json({ revalidated: false, error: ex });
  }
}
