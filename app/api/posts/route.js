import { NextResponse } from "next/server";
import { getPosts, savePosts } from "../../../lib/blobStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json({ posts });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body.posts)) {
      return NextResponse.json(
        { error: "Se esperaba { posts: [...] }" },
        { status: 400 }
      );
    }
    const posts = await savePosts(body.posts);
    return NextResponse.json({ posts });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
