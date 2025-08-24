import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import { ReactNode } from 'react';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 bg-muted/40 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
