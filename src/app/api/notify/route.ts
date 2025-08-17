import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST() {
  // TODO: send email via provider adapter
  return NextResponse.json({ accepted: true }, { status: 202 })
}


