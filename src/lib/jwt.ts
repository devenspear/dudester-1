import { SignJWT, jwtVerify } from "jose";

const DEFAULT_SECRET = "insecure-dev-secret-change-me";

export type SessionPayload = {
	email: string;
	name?: string;
};

function getSecret(): Uint8Array {
	const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
	return new TextEncoder().encode(secret);
}

export async function createSession(payload: SessionPayload): Promise<string> {
	return await new SignJWT(payload as unknown as Record<string, unknown>)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(getSecret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
	try {
		const { payload } = await jwtVerify(token, getSecret());
		return payload as unknown as SessionPayload;
	} catch {
		return null;
	}
}


