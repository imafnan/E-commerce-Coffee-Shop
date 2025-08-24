
'use server';

import type { Product } from './types';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { productSchema } from './schemas';

const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

async function readProductsFromFile(): Promise<Product[]> {
  try {
    const data = await fs.readFile(productsFilePath, 'utf-8');
    return JSON.parse(data) as Product[];
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    console.error("Failed to read products file:", error);
    throw error;
  }
}

async function writeProductsToFile(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to write to products file:", error);
    throw error;
  }
}

export async function getProducts(): Promise<Product[]> {
  return await readProductsFromFile();
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await readProductsFromFile();
  return products.find((p) => p.id === id);
}

export async function addProduct(productData: z.infer<typeof productSchema>): Promise<Product> {
    const products = await readProductsFromFile();
    const newProduct: Product = {
        ...productData,
        id: uuidv4(),
        aiHint: productData.aiHint || productData.name.toLowerCase(),
    };
    products.push(newProduct);
    await writeProductsToFile(products);
    return newProduct;
}

export async function updateProduct(id: string, updates: Partial<z.infer<typeof productSchema>>): Promise<Product | null> {
    const products = await readProductsFromFile();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
        return null;
    }
    products[productIndex] = { ...products[productIndex], ...updates };
    await writeProductsToFile(products);
    return products[productIndex];
}

export async function deleteProduct(id: string): Promise<boolean> {
    let products = await readProductsFromFile();
    const initialLength = products.length;
    products = products.filter((p) => p.id !== id);
    if (products.length < initialLength) {
        await writeProductsToFile(products);
        return true;
    }
    return false;
}
