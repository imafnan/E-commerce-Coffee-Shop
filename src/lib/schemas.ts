import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  stock: z.coerce.number().int().min(0, 'Stock must be a non-negative integer'),
  imageUrl: z.string().min(1, 'Image URL or uploaded image is required'),
  category: z.string().min(1, 'Category is required'),
  isPopular: z.boolean().default(false).optional(),
  aiHint: z.string().optional(),
});

export const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  deliveryType: z.enum(['home-delivery', 'in-store']),
  email: z.string().optional(),
  address: z.string().optional(),
  seatNumber: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.deliveryType === 'home-delivery') {
        if (!data.email || !z.string().email().safeParse(data.email).success) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please enter a valid email.",
                path: ['email'],
            });
        }
        if (!data.address || data.address.length < 5) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Address must be at least 5 characters.",
                path: ['address'],
            });
        }
    }
    if (data.deliveryType === 'in-store') {
        if (!data.seatNumber || data.seatNumber.length < 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Seat number is required.",
                path: ['seatNumber'],
            });
        }
    }
});
