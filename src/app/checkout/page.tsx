'use client';

import CartSummary from '@/components/CartSummary';
import CheckoutForm from '@/components/CheckoutForm';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type DeliveryType = 'home-delivery' | 'in-store';

export default function CheckoutPage() {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('home-delivery');

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-8">Checkout</h1>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
           <CartSummary />
        </div>
        <div className="space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Delivery Option</h2>
             <RadioGroup
              value={deliveryType}
              onValueChange={(value) => setDeliveryType(value as DeliveryType)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home-delivery" id="home-delivery" />
                <Label htmlFor="home-delivery">Home Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-store" id="in-store" />
                <Label htmlFor="in-store">Dine In</Label>
              </div>
            </RadioGroup>
          </div>
           <CheckoutForm deliveryType={deliveryType} />
        </div>
      </div>
    </div>
  );
}
