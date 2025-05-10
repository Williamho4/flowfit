import { User } from "@prisma/client";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { Payload, UserInfo } from "./types";

const key = new TextEncoder().encode(process.env.SECRET_KEY);

export async function createSession(user: User) {
  const { id, email, username } = user;
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  const payload: Payload = {
    user: {
      id,
      email,
      username,
    },
    expires,
  };

  const session = await encrypt(payload);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires,
  });
}

export async function encrypt(payload: Payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(payload.expires.getTime() / 1000))
    .sign(key);
}

export async function decrypt(input: string): Promise<Payload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });

    if (!payload) return null;

    return {
      user: payload.user as UserInfo,
      expires: new Date(payload.expires as string),
    };
  } catch (err) {
    console.error("Failed to verify JWT:", err);
    return null;
  }
}

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  try {
    return await decrypt(cookie);
  } catch (err) {
    console.error("Falied to get session:", err);
    return null;
  }
}
