'use server';

import { getOrders, updateOrderStatus, deleteOrder } from "@/lib/orders";
import type { Order } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getOrdersAction() {
    return await getOrders();
}

export async function updateOrderStatusAction(orderId: string, status: Order['status']) {
    try {
        const updatedOrder = await updateOrderStatus(orderId, status);
        if (updatedOrder) {
            revalidatePath('/admin/orders');
            return { success: true, updatedOrder };
        }
        return { success: false, error: 'Order not found.' };
    } catch (error) {
        console.error('Failed to update order status:', error);
        return { success: false, error: 'Failed to update order status.' };
    }
}

export async function deleteOrderAction(orderId: string) {
    try {
        const success = await deleteOrder(orderId);
        if (success) {
            revalidatePath('/admin/orders');
            return { success: true };
        }
        return { success: false, error: 'Order not found.' };
    } catch (error) {
        console.error('Failed to delete order:', error);
        return { success: false, error: 'Failed to delete order.' };
    }
}
