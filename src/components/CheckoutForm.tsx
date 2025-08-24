'use client';

import * as React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { checkoutSchema } from '@/lib/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { DeliveryType } from '@/app/checkout/page';
import { placeOrderAction } from '@/app/checkout/actions';
import { useTransition } from 'react';

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
    deliveryType: DeliveryType;
}

export default function CheckoutForm({ deliveryType }: CheckoutFormProps) {
  const { cartItems, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
      seatNumber: '',
      deliveryType: deliveryType,
    },
    mode: 'onChange',
  });

  // Watch deliveryType to update form state
  form.watch('deliveryType');

  // Reset form when deliveryType changes
  React.useEffect(() => {
    form.reset({
      name: form.getValues('name'), // Keep common fields if you want
      phone: form.getValues('phone'),
      address: '',
      email: '',
      seatNumber: '',
      deliveryType: deliveryType,
    });
  }, [deliveryType, form]);


  const onSubmit = (data: CheckoutFormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if(value) formData.append(key, value);
      });

      const result = await placeOrderAction(cartItems, cartTotal, formData);

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Order Failed",
          description: result.error,
        });
      } else if (result?.success) {
        toast({
          title: 'Order Placed!',
          description: 'Your order has been successfully placed.',
        });
        clearCart();
        form.reset();
        router.push('/');
      }
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {deliveryType === 'home-delivery' ? 'Shipping Details' : 'Dine-in Details'}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
             <FormField
              control={form.control}
              name="deliveryType"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {deliveryType === 'home-delivery' ? (
                <>
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Shipping Address</FormLabel>
                        <FormControl>
                            <Input placeholder="123 Main St, Anytown, USA" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </>
            ) : (
                <FormField
                control={form.control}
                name="seatNumber"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Seat Number</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., A12" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={cartItems.length === 0 || isPending || !form.formState.isValid}>
              {isPending ? 'Placing Order...' : 'Place Order (Cash on Delivery)'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
