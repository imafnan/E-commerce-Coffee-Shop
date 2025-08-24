'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getSalesReportAction } from './actions';
import type { SalesReport } from './actions';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export default function ReportsPage() {
  const [report, setReport] = useState<SalesReport | null>(null);

  useEffect(() => {
    async function fetchReport() {
      const salesReport = await getSalesReportAction();
      setReport(salesReport);
    }
    fetchReport();
  }, []);

  if (!report) {
    return <div>Loading reports...</div>;
  }
  
  const chartConfig = {
    sales: {
      label: 'Sales',
      color: 'hsl(var(--primary))',
    },
  };

  const productSalesData = Object.entries(report.productSales).map(([name, data]) => ({
      name,
      sales: data.totalSales,
      quantity: data.quantity
  }));


  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Sales Reports</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${report.totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">From accepted orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{report.totalOrders}</p>
             <p className="text-xs text-muted-foreground">Across all statuses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Products Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{report.totalItemsSold}</p>
             <p className="text-xs text-muted-foreground">Sum of quantities from all accepted orders</p>
          </CardContent>
        </Card>
      </div>

       <Card className="mb-8">
          <CardHeader>
            <CardTitle>Product Sales Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <BarChart accessibilityLayer data={productSalesData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 15)}
                />
                 <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Sales Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity Sold</TableHead>
                <TableHead>Total Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(report.productSales).map(([name, data]) => (
                <TableRow key={name}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{data.quantity}</TableCell>
                  <TableCell>${data.totalSales.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
