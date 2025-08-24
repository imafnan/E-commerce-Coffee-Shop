'use server';

import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function login(prevState: { error: string } | null, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === 'admin@cafestreet.com' && password === 'cafestreet@123') {
    await createSession();
    redirect('/admin');
  }

  return { error: 'Invalid email or password' };
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
