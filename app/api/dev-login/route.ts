import { NextResponse } from "next/server";

// Temporary dev-only allowlist
const ALLOWED_EMAILS = [
	"deven@dudester.xyz",
	"michael@dudester.xyz",
	"sean@dudester.xyz",
	"david@dudester.xyz"
];

export async function POST(req: Request) {
	try {
		const { email, password } = (await req.json().catch(() => ({}))) as {
			email?: string;
			password?: string;
		};

		const DEV_PASSWORD = process.env.DEV_PASSWORD || "DudesterDev2025!";

		if (!email || !password) {
			return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
		}

		if (!ALLOWED_EMAILS.includes(email) || password !== DEV_PASSWORD) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		// Create a simple opaque session token (base64 json). In production use a signed JWT.
		const sessionPayload = { email, ts: Date.now() };
		const session = Buffer.from(JSON.stringify(sessionPayload)).toString("base64");

		const res = NextResponse.json({ ok: true });
		res.cookies.set("session", session, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7,
			path: "/"
		});
		return res;
	} catch (err) {
		return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
	}
}

import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("session", "dev", { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}

export const runtime = "nodejs";


