import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    revalidatePath("/");
    revalidatePath("/product/[id]");
    revalidatePath("/shop");
    revalidatePath("/shop/[category]");
    revalidatePath("/shop/[subCategory]");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (ex) {
    return NextResponse.json({ revalidated: false, error: ex });
  }
}
