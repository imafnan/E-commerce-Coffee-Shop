'use client';

import Link from 'next/link';
import { Coffee, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { Input } from './ui/input';

const Header = () => {
  const { cartCount } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Coffee className="h-8 w-8 text-primary" />
          <Link href="/" className="text-xl font-bold text-foreground">
            Cafe Street
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#about-us" className="text-muted-foreground hover:text-primary transition-colors">About us</Link>
          <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Our Product</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Input type="search" placeholder="Cappuccino" className="rounded-full pl-10"/>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/checkout">
              <ShoppingBag className="h-6 w-6" />
              {isClient && cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
               <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-6 w-6" />
              <span className="sr-only">Admin Login</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
