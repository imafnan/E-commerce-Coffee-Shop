import AdminProductForm from '@/components/AdminProductForm';
import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <AdminProductForm product={product} />
    </div>
  );
}
