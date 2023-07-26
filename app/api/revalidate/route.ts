import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  revalidatePath("/");
  revalidatePath("/product/[slug]");
  return NextResponse.json({ revalidate: true });
}
