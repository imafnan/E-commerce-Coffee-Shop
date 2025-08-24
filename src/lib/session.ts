'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'cafe_street_session';

export async function createSession() {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  cookies().set(SESSION_COOKIE_NAME, 'authenticated', { expires, httpOnly: true });
}

export async function getSession() {
  const session = cookies().get(SESSION_COOKIE_NAME);
  return session ? session.value : null;
}

export async function deleteSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}
