
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import heroc from '../Image/HEROCO.png'
import abouti from '../Image/Abouti.png'
import anan from '../Image/image.png'
import foo from '../Image/unsplash_ftA71vetxuo.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Coffee, Search, ShoppingCart, Star, Plus } from 'lucide-react';
import { CoffeeCup } from '@/components/CoffeeCup';
import { getProducts } from '@/lib/products';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/lib/types';
import { useEffect, useState } from 'react';

const testimonials = [
  { name: 'Naura', review: 'I really love the cappuccino, the coffee was very smooth.',    images: anan },
  { name: 'John', review: 'This coffee shop is very convenient and the delivery is fast.' ,images:anan },
  { name: 'Azura', review: 'The coffee here is the best in town, I highly recommend it.'  ,images: anan},
  { name: 'Naura', review: 'I really love the cappuccino, the coffee was very smooth.',    images: anan },
  { name: 'John', review: 'This coffee shop is very convenient and the delivery is fast.' ,images:anan },
  { name: 'Azura', review: 'The coffee here is the best in town, I highly recommend it.'  ,images: anan},
];

export default function CoffeeShopLandingPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setAllProducts(products);
    }
    fetchProducts();
  }, []);

  const popularProducts = allProducts.filter(p => p.isPopular);
  // const specialMenu = allProducts.filter(p => !p.isPopular).slice(0, 6);
  
  return (
    <div className="bg-background font-sans">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-no-repeat bg-contain bg-right-top" style={{backgroundImage: "url('/beans.svg')"}}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground">
                Enjoy your <span className="text-primary">coffee</span> before your activity
              </h1>
              <p className="text-muted-foreground text-lg">
                Boost your productivity and build your mood with a glass of coffee in the morning
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/80 rounded-full" asChild>
                  <Link href="/products">Order Now</Link>
                </Button>
                <Button size="lg" variant="link" className="text-primary" asChild>
                   <Link href="/products">View Menu</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative">
                <Image src={heroc} alt="Cappuccino" width={500} height={500} className="rounded-full" data-ai-hint="cappuccino coffee" />
                <div className="absolute top-8 left-3 bg-card p-3 rounded-full shadow-lg">
                  <p className="font-bold">Cappuccino</p>
                </div>
                <div className="absolute top-24 -right-4 bg-card p-3 rounded-full shadow-lg flex items-center gap-2">
                  <p className="font-bold">4.8</p>
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="absolute bottom-8 left-10  bg-card p-3 rounded-full shadow-lg">
                  <p className="font-bold">$4.50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular <span className="text-primary">Now</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {popularProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden shadow-lg rounded-3xl">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image src={product.imageUrl} alt={product.name} width={300} height={300} className="w-full" data-ai-hint={product.aiHint}/>
                    <Badge className="absolute top-4 left-4 bg-card/80 text-foreground">
                      4.8 <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
                    </Badge>
                  </div>
                  <div className="p-6 bg-card">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-bold">{product.name}</h3>
                      <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <Badge variant="outline" className="rounded-full">Hot</Badge>
                            <Badge variant="outline" className="rounded-full">Cold</Badge>
                        </div>
                        <Button size="icon" className="rounded-full bg-primary text-primary-foreground" onClick={() => addToCart(product)}><Plus/></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="delivery" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">How to use delivery <span className="text-primary">service</span></h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-accent rounded-2xl flex items-center justify-center">
                    <CoffeeCup className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Choose your coffee</h3>
                <p className="text-muted-foreground">There are 20+ coffees for you</p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-accent rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16.5V13H8V5.5l6-3 6 3V13h-2"/><path d="M20.94 13.06L18 14.5l-2.94-1.44"/><path d="M12 18H2.5L2 15h10z"/><path d="M4.5 18H2v-3h2.5z"/><path d="M18.5 18h2v-3h-2.5z"/><path d="M12 18v3h-3v-3z"/><circle cx="5" cy="21" r="1"/><circle cx="15" cy="21" r="1"/></svg>
                </div>
                <h3 className="text-xl font-bold">We deliver it to you</h3>
                <p className="text-muted-foreground">Choose delivery service</p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-accent rounded-2xl flex items-center justify-center">
                    <Coffee className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Enjoy your coffee</h3>
                <p className="text-muted-foreground">Choose delivery service</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Us */}
      <section id="about-us" className="py-16 md:py-24 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image src={abouti} alt="About Us" width={500} height={500} className="rounded-2xl" data-ai-hint="coffee latte"/>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">We provide quality <span className="text-primary">coffee</span>, and ready to deliver.</h2>
              <p className="text-muted-foreground">We are a company that makes and distributes delicious drinks. our main product is made with a secret recipe and available in stores worldwide.</p>
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/80" asChild>
                <Link href="/products">Get Your Coffee</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Menu */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Special menu <span className="text-primary">for you</span></h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {popularProducts.map((item, index) => (
              <Card key={index} className="overflow-hidden shadow-lg rounded-3xl">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Image src={item.imageUrl} alt={item.name} width={200} height={200} className="w-full rounded-2xl" data-ai-hint={item.aiHint}/>
                    <Badge className="absolute top-2 left-2 bg-card/80 text-foreground">
                      4.8 <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
                    </Badge>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Hot {item.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                        <Button size="icon" className="rounded-full w-8 h-8 mt-1 bg-primary text-primary-foreground" onClick={() => addToCart(item)}><Plus className="w-5 h-5"/></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-accent/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What they say <span className="text-primary">about us</span></h2>
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 rounded-2xl shadow-lg">
                    <CardContent className="p-0">
                      <p className="text-muted-foreground mb-4">{`"${testimonial.review}"`}</p>
                      <div className="flex items-center gap-4">
                        <Image src={testimonial.images} alt={testimonial.name} width={48} height={48} className="rounded-full" data-ai-hint="person"/>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2"/>
            <CarouselNext className="right-0 translate-x-1/2"/>
          </Carousel>
        </div>
      </section>

      {/* Subscription */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative bg-foreground text-background p-8 md:p-16 rounded-3xl overflow-hidden">
            <Image src={foo} alt="Coffee machine" layout="fill" objectFit="cover" className="opacity-20" data-ai-hint="coffee machine"/>
            <div className="relative z-10 text-center space-y-4">
              <h2 className="text-4xl font-bold">Subscribe to get 50% discount price</h2>
              <div className="flex justify-center">
                <div className="flex w-full max-w-md items-center space-x-2">
                  <Input type="email" placeholder="Email address" className="bg-background/80 text-foreground border-none rounded-full" />
                  <Button type="submit" className="bg-primary text-primary-foreground rounded-full">Subscribe </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
