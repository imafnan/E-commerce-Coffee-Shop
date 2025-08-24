'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { deleteProductAction } from '@/app/admin/products/actions';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface AdminProductsTableProps {
  products: Product[];
}

export default function AdminProductsTable({ products }: AdminProductsTableProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    startTransition(async () => {
      const result = await deleteProductAction(id);
      if (result.success) {
        toast({ title: 'Success', description: 'Product deleted successfully.' });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={50}
                height={50}
                className="rounded-md"
              />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
