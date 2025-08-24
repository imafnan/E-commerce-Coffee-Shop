import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProducts } from '@/lib/products';
import AdminProductsTable from '@/components/AdminProductsTable';
import { PlusCircle } from 'lucide-react';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <AdminProductsTable products={products} />
    </div>
  );
}
