'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { logout } from '@/app/login/actions';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Package, LogOut, Home, ShoppingCart, BarChart } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/reports', label: 'Reports', icon: BarChart },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 flex-shrink-0 bg-card p-4 shadow-md flex flex-col">
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold text-primary font-headline">
          Cafe Street
        </Link>
        <p className="text-sm text-muted-foreground">Admin Panel</p>
      </div>

      <div className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Button
                variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                className="w-full justify-start mb-2"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start mb-2" asChild>
          <Link href="/">
             <Home className="mr-2 h-4 w-4" />
             Back to Site
          </Link>
        </Button>
        <form action={logout}>
          <Button variant="outline" className="w-full justify-start">
             <LogOut className="mr-2 h-4 w-4" />
             Logout
          </Button>
        </form>
      </div>
    </nav>
  );
}
