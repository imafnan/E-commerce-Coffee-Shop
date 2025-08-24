'use server';

import { createOrder } from '@/lib/orders';
import { checkoutSchema } from '@/lib/schemas';
import type { CartItem } from '@/lib/types';
import { redirect } from 'next/navigation';

export async function placeOrderAction(
  cartItems: CartItem[],
  cartTotal: number,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());
  
  const parseResult = checkoutSchema.safeParse(rawFormData);

  if (!parseResult.success) {
    // This should ideally return detailed errors to the form
    console.error(parseResult.error.flatten().fieldErrors);
    return { error: 'Invalid form data. Please check your entries.' };
  }

  const { name, phone, deliveryType, email, address, seatNumber } = parseResult.data;

  try {
    await createOrder(
        { 
            customerName: name, 
            phone, 
            deliveryType,
            email,
            address,
            seatNumber,
        }, 
        cartItems, 
        cartTotal
    );
    
    // In a real app, you would also handle payment processing here.

  } catch (error) {
    console.error("Failed to create order:", error);
    return { error: 'There was a problem placing your order. Please try again.' };
  }

  // Redirect to a success page or home
  // Not redirecting immediately from action, will let client handle it
  return { success: true };
}
