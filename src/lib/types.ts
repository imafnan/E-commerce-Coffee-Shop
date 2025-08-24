export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  aiHint: string;
  category: string;
  isPopular?: boolean;
};

export type CartItem = Product & {
  quantity: number;
};

export type Order = {
    id: string;
    customerName: string;
    phone: string;
    deliveryType: 'home-delivery' | 'in-store';
    email?: string;
    address?: string;
    seatNumber?: string;
    items: CartItem[];
    total: number;
    status: 'Pending' | 'Accepted' | 'Rejected' | 'Cancelled';
    createdAt: string;
}
