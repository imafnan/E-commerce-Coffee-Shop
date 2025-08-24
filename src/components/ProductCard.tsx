
'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from './ui/card';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
       <CardContent className="p-0">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.aiHint}
          />
        </div>
      </CardContent>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
            <CardTitle className="text-base font-medium text-foreground">{product.name}</CardTitle>
            <CardDescription className="mt-1 text-xs text-muted-foreground line-clamp-2 h-8">{product.description}</CardDescription>
        </div>
        <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
        </div>
      </div>
       <CardFooter className="p-3 pt-0">
            <Button className="w-full" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
            </Button>
       </CardFooter>
    </Card>
  );
};

export default ProductCard;
