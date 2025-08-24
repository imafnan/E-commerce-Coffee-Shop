'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartSummary() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Your cart is empty.</p>
            <Button asChild>
                <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  data-ai-hint={item.aiHint}
                />
                <div className="flex-grow">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                    className="w-16 text-center"
                    aria-label={`Quantity for ${item.name}`}
                  />
                  <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {cartItems.length > 0 && (
         <CardFooter className="flex justify-end text-xl font-bold">
            Total: ${cartTotal.toFixed(2)}
        </CardFooter>
      )}
    </Card>
  );
}
