import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST() {
  // TODO: Replace with Lucia-based login
  return NextResponse.json({ user: { id: "stub", email: "stub@example.com" } })
}


