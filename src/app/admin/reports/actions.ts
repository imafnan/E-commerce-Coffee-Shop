'use server';

import { getOrders } from '@/lib/orders';
import type { Order } from '@/lib/types';

export interface SalesReport {
  totalRevenue: number;
  totalOrders: number;
  totalItemsSold: number;
  productSales: {
    [productName: string]: {
      quantity: number;
      totalSales: number;
    };
  };
}

export async function getSalesReportAction(): Promise<SalesReport> {
  const orders = await getOrders();
  
  const report: SalesReport = {
    totalRevenue: 0,
    totalOrders: orders.length, // Total orders including all statuses
    totalItemsSold: 0,
    productSales: {},
  };

  const acceptedOrders = orders.filter(order => order.status === 'Accepted');

  report.totalRevenue = acceptedOrders.reduce((sum, order) => sum + order.total, 0);

  for (const order of acceptedOrders) {
    for (const item of order.items) {
      report.totalItemsSold += item.quantity;
      if (!report.productSales[item.name]) {
        report.productSales[item.name] = {
          quantity: 0,
          totalSales: 0,
        };
      }
      report.productSales[item.name].quantity += item.quantity;
      report.productSales[item.name].totalSales += item.price * item.quantity;
    }
  }

  return report;
}
