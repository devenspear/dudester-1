import { NextResponse } from "next/server";
import { createSession } from "@/src/lib/jwt";
import { verify as verifyPassword } from "@node-rs/argon2";

// Temporary in-memory users with hashed passwords would normally come from DB
// For now, accept the original four founder emails with a shared password
const ALLOWED_EMAILS = new Set([
	"deven@dudester.xyz",
	"michael@dudester.xyz",
	"sean@dudester.xyz",
	"david@dudester.xyz",
]);

export async function POST(req: Request) {
	try {
		const { email, password } = (await req.json()) as { email: string; password: string };
		if (!email || !password) return NextResponse.json({ error: "Missing credentials" }, { status: 400 });

		const DEV_PASSWORD = process.env.DEV_PASSWORD || "DudesterDev2025!";
		// If we later store a hash, use verifyPassword(hash, password)
		const ok = ALLOWED_EMAILS.has(email) && password === DEV_PASSWORD;
		if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

		const token = await createSession({ email });
		const res = NextResponse.json({ ok: true });
		res.cookies.set("session", token, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7,
			path: "/",
		});
		return res;
	} catch (e) {
		return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
	}
}


