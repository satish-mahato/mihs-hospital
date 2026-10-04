import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await revalidateTag("departments", {});
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 }
    );
  }
}
