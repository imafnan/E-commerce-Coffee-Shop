'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addProduct, updateProduct, deleteProduct } from '@/lib/products';
import { productSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function addProductAction(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    imageUrl: formData.get('imageUrl'),
    category: formData.get('category'),
    isPopular: formData.get('isPopular') === 'true',
    aiHint: formData.get('aiHint'),
  };

  const parseResult = productSchema.safeParse(rawFormData);

  if (!parseResult.success) {
    console.error(parseResult.error.flatten().fieldErrors);
    return { error: 'Invalid form data' };
  }

  await addProduct(parseResult.data);
  revalidatePath('/admin/products');
  revalidatePath('/');
  redirect('/admin/products');
}

export async function updateProductAction(id: string, formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    imageUrl: formData.get('imageUrl'),
    category: formData.get('category'),
    isPopular: formData.get('isPopular') === 'true',
    aiHint: formData.get('aiHint'),
  };
  const parseResult = productSchema.safeParse(rawFormData);
  
  if (!parseResult.success) {
    console.error(parseResult.error.flatten().fieldErrors);
    return { error: 'Invalid form data' };
  }

  await updateProduct(id, parseResult.data);
  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/edit/${id}`);
  revalidatePath('/');
  redirect('/admin/products');
}

export async function deleteProductAction(id: string) {
  try {
    const success = await deleteProduct(id);
    if (success) {
      revalidatePath('/admin/products');
      revalidatePath('/');
      return { success: true };
    }
    return { error: 'Failed to delete product.' };
  } catch (error) {
    return { error: 'An unexpected error occurred.' };
  }
}
