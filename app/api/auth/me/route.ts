import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/src/lib/jwt";

export async function GET() {
  const token = cookies().get("session")?.value || null;
  if (!token) return NextResponse.json({ email: null }, { status: 200 });
  const payload = await verifySession(token);
  return NextResponse.json({ email: payload?.email ?? null }, { status: 200 });
}


