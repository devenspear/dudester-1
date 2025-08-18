import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("session", "dev", { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}

export const runtime = "nodejs";


