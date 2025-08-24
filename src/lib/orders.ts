'use server';

import type { Order, CartItem } from './types';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const ordersFilePath = path.join(process.cwd(), 'src', 'data', 'orders.json');

async function readOrdersFromFile(): Promise<Order[]> {
  try {
    const data = await fs.readFile(ordersFilePath, 'utf-8');
    return JSON.parse(data) as Order[];
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    console.error("Failed to read orders file:", error);
    throw error;
  }
}

async function writeOrdersToFile(orders: Order[]): Promise<void> {
  try {
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to write to orders file:", error);
    throw error;
  }
}


export async function getOrders(): Promise<Order[]> {
  return await readOrdersFromFile();
}

export async function createOrder(
    orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'items' | 'total'>,
    items: CartItem[],
    total: number
): Promise<Order> {
    const orders = await readOrdersFromFile();
    const newOrder: Order = {
        ...orderData,
        id: uuidv4(),
        items,
        total,
        status: 'Pending',
        createdAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    await writeOrdersToFile(orders);
    console.log("Order created and saved to file.");
    return newOrder;
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    const orders = await readOrdersFromFile();
    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
        return null;
    }
    orders[orderIndex].status = status;
    await writeOrdersToFile(orders);
    console.log(`Order status updated for ${id} and saved to file.`);
    return orders[orderIndex];
}

export async function deleteOrder(id: string): Promise<boolean> {
    let orders = await readOrdersFromFile();
    const initialLength = orders.length;
    orders = orders.filter((o) => o.id !== id);
    if (orders.length < initialLength) {
        await writeOrdersToFile(orders);
        console.log("Order deleted and saved to file.");
        return true;
    }
    return false;
}
