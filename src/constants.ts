import { Cake, Category, Testimonial } from './types';

export const WHATSAPP_NUMBER = "+919486123975";
export const BRAND_NAME = "Oven and Heart";

export const CATEGORIES: Category[] = [
  {
    id: 'birthday',
    title: 'Birthday Cakes',
    image: 'https://images.unsplash.com/photo-1578985543813-f89ac9d55019?q=80&w=800&auto=format&fit=crop',
    anchor: 'birthday'
  },
  {
    id: 'wedding',
    title: 'Wedding Cakes',
    image: 'https://images.unsplash.com/photo-1522661081042-4c57cf3cff08?q=80&w=800&auto=format&fit=crop',
    anchor: 'wedding'
  },
  {
    id: 'cupcakes',
    title: 'Cupcakes',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop',
    anchor: 'cupcakes'
  },
  {
    id: 'flavours',
    title: 'Flavour Specials',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop',
    anchor: 'flavours'
  },
  {
    id: 'custom',
    title: 'Custom Theme Cakes',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb8c2?q=80&w=800&auto=format&fit=crop',
    anchor: 'custom'
  }
];

export const CAKES: Cake[] = [
  // Birthday Cakes
  {
    id: 'b-1',
    name: 'Strawberry Cloud',
    description: 'A light, fluffy vanilla cake layered with fresh strawberry compote and whipped cream frost.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=800&auto=format&fit=crop',
    category: 'birthday'
  },
  {
    id: 'b-2',
    name: 'Chocolate Sprinkle',
    description: 'Rich dark chocolate cake with chocolate ganache and colorful birthday sprinkles.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop',
    category: 'birthday'
  },
  {
    id: 'b-3',
    name: 'Pastel Dream',
    description: 'Multi-layer vanilla bean cake with soft pastel buttercream finish.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=800&auto=format&fit=crop',
    category: 'birthday'
  },

  // Wedding Cakes
  {
    id: 'w-1',
    name: 'Timeless White',
    description: 'Pure white three-tiered cake with delicate handcrafted sugar flowers.',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1522661081042-4c57cf3cff08?q=80&w=800&auto=format&fit=crop',
    category: 'wedding'
  },
  {
    id: 'w-2',
    name: 'Modern Floral',
    description: 'Semi-naked tiered cake adorned with seasonal organic blooms.',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop',
    category: 'wedding'
  },
  {
    id: 'w-3',
    name: 'Pearl Elegance',
    description: 'Lustre-finished tiered cake with edible pearl detailing.',
    price: 6499,
    image: 'https://images.unsplash.com/photo-1502446654157-557343468812?q=80&w=800&auto=format&fit=crop',
    category: 'wedding'
  },

  // Cupcakes
  {
    id: 'c-1',
    name: 'Berry Cupcakes',
    description: 'A box of 6 vanilla cupcakes topped with fresh seasonal berries.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop',
    category: 'cupcakes'
  },
  {
    id: 'c-2',
    name: 'Red Velvet Box',
    description: 'Classic red velvet cupcakes with creamy cheese frosting swirl.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop',
    category: 'cupcakes'
  },
  {
    id: 'c-3',
    name: 'Chocolate Swirl',
    description: 'Double chocolate cupcakes with rich cocoa frosting.',
    price: 549,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop',
    category: 'cupcakes'
  },

  // Flavour Specials
  {
    id: 'f-1',
    name: 'Lemon Zest Special',
    description: 'Tangy lemon-infused sponge with zesty citrus glaze.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop',
    category: 'flavours'
  },
  {
    id: 'f-2',
    name: 'Pistachio Delight',
    description: 'Roasted pistachio sponge with rose water hints.',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop',
    category: 'flavours'
  },

  // Custom Theme Cakes
  {
    id: 'ct-1',
    name: 'Galaxy Theme',
    description: 'A stellar dark-themed cake with nebula-style marbling.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb8c2?q=80&w=800&auto=format&fit=crop',
    category: 'custom'
  },
  {
    id: 'ct-2',
    name: 'Botanical Garden',
    description: 'Intricate floral piping depicting a lush meadow.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop',
    category: 'custom'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Anjali Sharma',
    comment: 'The cake was absolutely breathtaking! Everyone loved the strawberry flavour.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Rohit Verma',
    comment: 'Perfect delivery and the custom design was just what I imagined.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Priya Iyer',
    comment: 'Best cupcakes I have had in a long time. Very fresh and high quality.',
    rating: 5
  }
];

export const ORDER_STEPS = [
  {
    title: 'Message on WhatsApp',
    description: 'Send us a hi and let us know your requirements.',
    icon: 'MessageCircle'
  },
  {
    title: 'Share Your Design',
    description: 'Send reference images or choose from our catalogue.',
    icon: 'Image'
  },
  {
    title: 'Confirm Details',
    description: 'Finalize flavours, size, price, and delivery date.',
    icon: 'CheckCircle'
  },
  {
    title: 'Pickup / Delivery',
    description: 'Receive your freshly baked cake at your doorstep.',
    icon: 'Truck'
  }
];
