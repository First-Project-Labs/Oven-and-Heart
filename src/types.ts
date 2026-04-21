export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  anchor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
}

export interface CartItem extends Cake {
  quantity: number;
}
