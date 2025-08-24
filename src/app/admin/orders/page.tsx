'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Order } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useEffect, useState, useTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { updateOrderStatusAction, getOrdersAction, deleteOrderAction } from './actions';
import { useToast } from '@/hooks/use-toast';


const OrdersTable = ({ orders: initialOrders, onStatusUpdate, onOrderDelete }: { orders: Order[], onStatusUpdate: (updatedOrder: Order) => void, onOrderDelete: (orderId: string) => void }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    startTransition(async () => {
        const result = await updateOrderStatusAction(orderId, status);
        if (result?.success && result.updatedOrder) {
            onStatusUpdate(result.updatedOrder);
            if (status === 'Accepted' || status === 'Rejected') {
              toast({
                  title: "Status Updated",
                  description: `Order #${orderId.substring(0,8)} has been marked as ${status}.`,
              });
            }
        } else {
            toast({
                variant: 'destructive',
                title: 'Update Failed',
                description: result?.error || 'An unknown error occurred.',
            });
        }
    });
  }
  
  const handleDelete = (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) {
        return;
    }
    startTransition(async () => {
        const result = await deleteOrderAction(orderId);
        if(result?.success) {
            onOrderDelete(orderId);
            toast({
                title: 'Order Deleted',
                description: `Order #${orderId.substring(0,8)} has been deleted.`,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Delete Failed',
                description: result?.error || 'An unknown error occurred.',
            });
        }
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
            <TableCell>
              <div>{order.customerName}</div>
              <div className="text-muted-foreground text-sm">{order.phone}</div>
            </TableCell>
            <TableCell>
              {order.deliveryType === 'home-delivery' ? (
                  <div>
                      <div className="font-medium">Home Delivery</div>
                      <div>{order.email}</div>
                      <div className="text-muted-foreground text-sm">{order.address}</div>
                  </div>
              ) : (
                  <div>
                    <div className="font-medium">Dine In</div>
                    <div>Seat: {order.seatNumber}</div>
                  </div>
              )}
            </TableCell>
            <TableCell>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</TableCell>
            <TableCell>${order.total.toFixed(2)}</TableCell>
            <TableCell>{format(new Date(order.createdAt), "PPP p")}</TableCell>
            <TableCell><Badge variant={order.status === 'Accepted' ? 'default' : order.status === 'Rejected' ? 'destructive' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}>{order.status}</Badge></TableCell>
            <TableCell>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Accepted')} disabled={isPending}>
                        Accept
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Rejected')} disabled={isPending}>
                        Reject
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Pending')} disabled={isPending}>
                        Mark as Pending
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Cancelled')} disabled={isPending}>
                        Cancel
                      </DropdownMenuItem>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(order.id)} disabled={isPending}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const fetchedOrders = await getOrdersAction();
            setOrders(fetchedOrders);
        }
        fetchOrders();
    }, []);

    const handleOrderUpdate = (updatedOrder: Order) => {
        setOrders(currentOrders =>
            currentOrders.map(o => o.id === updatedOrder.id ? updatedOrder : o)
        );
    };

    const handleOrderDelete = (orderId: string) => {
        setOrders(currentOrders => currentOrders.filter(o => o.id !== orderId));
    }

    const homeDeliveryOrders = orders.filter(o => o.deliveryType === 'home-delivery');
    const dineInOrders = orders.filter(o => o.deliveryType === 'in-store');

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Orders</h1>
      <Tabs defaultValue="home-delivery">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="home-delivery">Home Delivery ({homeDeliveryOrders.length})</TabsTrigger>
          <TabsTrigger value="dine-in">Dine In ({dineInOrders.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="home-delivery">
          <Card>
            <CardHeader>
              <CardTitle>Home Delivery Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {homeDeliveryOrders.length > 0 ? (
                <OrdersTable orders={homeDeliveryOrders} onStatusUpdate={handleOrderUpdate} onOrderDelete={handleOrderDelete} />
              ) : (
                <p>No home delivery orders yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dine-in">
          <Card>
            <CardHeader>
              <CardTitle>Dine-in Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {dineInOrders.length > 0 ? (
                <OrdersTable orders={dineInOrders} onStatusUpdate={handleOrderUpdate} onOrderDelete={handleOrderDelete}/>
              ) : (
                <p>No dine-in orders yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
