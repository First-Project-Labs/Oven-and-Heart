/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  MessageCircle, 
  Instagram, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Plus, 
  Minus, 
  Trash2,
  CheckCircle,
  Truck,
  Image as ImageIcon,
  Star
} from 'lucide-react';
import { Button, SectionHeading } from './components/UI';
import { 
  CAKES, 
  CATEGORIES, 
  WHATSAPP_NUMBER, 
  BRAND_NAME, 
  TESTIMONIALS, 
  ORDER_STEPS 
} from './constants';
import { CartItem, Cake } from './types';

// --- Sub-components ---

const FloatingWhatsApp = () => (
  <motion.a
    href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
    target="_blank"
    rel="noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
  >
    <MessageCircle size={28} />
  </motion.a>
);

const CakeCard = ({ cake, onAddToCart }: { cake: Cake; onAddToCart: (cake: Cake) => void; key?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden cake-card-shadow group border border-pink-50/50 flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={cake.image} 
          alt={cake.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
           <button 
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi! I'm interested in the ${cake.name}.`)}`, '_blank');
            }}
            className="p-2 bg-white/90 backdrop-blur rounded-full text-[#25D366] shadow-lg hover:bg-[#25D366] hover:text-white transition-colors"
           >
            <MessageCircle size={20} />
           </button>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-accent transition-colors">{cake.name}</h3>
        <p className="text-brand-muted text-sm mb-4 line-clamp-2">{cake.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-brand-text">₹{cake.price}</span>
          <Button 
            variant="outline" 
            className="py-1.5 px-4 text-xs h-10"
            onClick={() => onAddToCart(cake)}
          >
            <Plus size={14} /> Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('birthday');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (cake: Cake) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === cake.id);
      if (existing) {
        return prev.map(item => item.id === cake.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...cake, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  const checkoutWhatsApp = () => {
    const items = cart.map(item => `${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join('\n');
    const message = encodeURIComponent(`Hi ${BRAND_NAME}!\n\nI'd like to place an order:\n\n${items}\n\nTotal: ₹${totalPrice}\n\nPlease confirm my order!`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const openWhatsApp = (text?: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
    window.open(url, '_blank');
  };

  const filteredCakes = useMemo(() => CAKES.filter(cake => cake.category === selectedCategory), [selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const NavLink = ({ href, children, mobile }: { href: string; children: ReactNode; mobile?: boolean }) => (
    <a 
      href={href} 
      className={`${mobile ? 'block py-4 text-2xl font-serif' : 'text-sm font-medium hover:text-brand-accent transition-colors'}`}
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </a>
  );

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-[80] transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-serif font-bold tracking-tight transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>O&H</span>
          </div>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-8 ${scrolled ? 'text-brand-text' : 'text-white'}`}>
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <NavLink href="#categories">Categories</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 transition-colors ${scrolled ? 'text-brand-text hover:text-brand-accent' : 'text-white hover:text-brand-accent'}`}
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>
            <Button 
              variant="primary" 
              className="hidden md:flex py-2 px-6"
              onClick={() => openWhatsApp()}
            >
              Order on WhatsApp
            </Button>
            <button onClick={() => setIsMenuOpen(true)} className={`md:hidden p-2 ${scrolled ? 'text-brand-text' : 'text-white'}`}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-brand-cream p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif font-bold">Oven & Heart</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-brand-pink rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <NavLink href="#home" mobile>Home</NavLink>
              <NavLink href="#about" mobile>About Us</NavLink>
              <NavLink href="#categories" mobile>Categories</NavLink>
              <NavLink href="#contact" mobile>Contact</NavLink>
            </div>
            <div className="mt-auto">
              <Button 
                variant="primary" 
                className="w-full text-lg py-4"
                onClick={() => openWhatsApp()}
              >
                Order on WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] md:h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1920&auto=format&fit=crop" 
            alt="Hero Cake - Premium Studio Lighting" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-white"
          >
            <span className="inline-block px-4 py-1.5 bg-brand-accent/20 backdrop-blur-md rounded-full text-brand-accent font-medium text-sm border border-brand-accent/30 mb-6 uppercase tracking-widest">
              Artisanal Home Bakery
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
              Baked with Love, <br />
              <span className="text-brand-accent italic font-medium">Designed for Your</span> Moments
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
              Custom cakes for birthdays, weddings, and every celebration. Premium ingredients, studio design, and handcrafted flavors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                className="text-lg py-4 px-10"
                onClick={() => document.getElementById('categories')?.scrollIntoView()}
              >
                Explore Categories
              </Button>
              <Button 
                variant="secondary" 
                className="text-lg py-4 px-10 bg-white/10 text-white backdrop-blur-md border-white/20"
                onClick={() => openWhatsApp()}
              >
                Order via WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section with Filter */}
      <section id="categories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeading 
            title="Explore Our Collections" 
            subtitle="Select a category to view our handcrafted artisanal cakes."
          />
          
          <div className="max-w-md mx-auto mb-16 px-4">
            <div className="relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-brand-cream border-2 border-brand-pink rounded-2xl py-4 px-6 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-accent/20 font-medium text-brand-text shadow-sm transition-all text-lg"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-accent">
                <ChevronRight size={24} className="rotate-90" />
              </div>
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCakes.map(cake => (
                <CakeCard key={cake.id} cake={cake} onAddToCart={addToCart} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-brand-cream/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="How Ordering Works" subtitle="A seamless 4-step process to get your perfect cake." />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {ORDER_STEPS.map((step, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2rem] text-center shadow-sm hover:shadow-md transition-all relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {idx + 1}
                </div>
                <div className="w-16 h-16 bg-brand-pink text-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {step.icon === 'MessageCircle' && <MessageCircle size={32} />}
                  {step.icon === 'Image' && <ImageIcon size={32} />}
                  {step.icon === 'CheckCircle' && <CheckCircle size={32} />}
                  {step.icon === 'Truck' && <Truck size={32} />}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-brand-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white border-t border-brand-pink">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" 
                  alt="Our Kitchen" 
                  className="rounded-[3rem] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-brand-accent font-medium uppercase tracking-widest mb-4 block">Our Story</span>
                <h2 className="text-4xl md:text-5xl mb-8 leading-tight font-serif uppercase tracking-tight">Crafting Memories</h2>
                <p className="text-lg text-brand-muted mb-6 leading-relaxed">
                  Oven and Heart is more than just a home bakery—it's a celebration of love, passion, and the joy that comes from sharing something truly special.
                </p>
                <p className="text-lg text-brand-muted mb-10 leading-relaxed">
                  Every cake that leaves our kitchen is made from scratch using premium ingredients and traditional techniques. We believe that life's biggest moments should be celebrated with flavors that dazzle.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    className="px-10"
                    onClick={() => openWhatsApp('Hi! I want to share a custom idea.')}
                  >
                    Custom Theme Inquiry
                  </Button>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* Testimonials (Merged into context) */}
      <section className="py-24 bg-brand-cream/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="From Our Happy Hearts" subtitle="Real stories from our lovely customers." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="p-8 bg-white rounded-3xl border border-brand-pink/30 relative shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="#f472b6" className="text-brand-accent" />)}
                </div>
                <p className="text-lg italic text-brand-text mb-6 leading-relaxed">"{t.comment}"</p>
                <div className="font-bold flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent text-sm">
                    {t.name[0]}
                  </div>
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-brand-pink/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Get in Touch" subtitle="We're always here to chat about your next celebration." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center shadow-sm">
                <div className="w-14 h-14 bg-brand-pink text-brand-accent rounded-full flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-brand-muted">{WHATSAPP_NUMBER}</p>
             </div>
             <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center shadow-sm border border-brand-accent/10">
                <div className="w-14 h-14 bg-brand-pink text-brand-accent rounded-full flex items-center justify-center mb-6">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-brand-muted">Instant Support</p>
                <button onClick={() => openWhatsApp()} className="text-brand-accent font-medium mt-auto hover:underline cursor-pointer">Start Chat</button>
             </div>
             <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center shadow-sm">
                <div className="w-14 h-14 bg-brand-pink text-brand-accent rounded-full flex items-center justify-center mb-6">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-brand-muted text-sm px-4">Local Home Bakery<br />Available for Delivery & Pickup</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-text text-white py-20 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                <h2 className="text-3xl font-serif font-bold mb-6">O&H</h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  Premium home-baked cakes and treats designed for your most precious moments.
                </p>
                <div className="flex gap-4">
                  <a href="https://instagram.com/im_musthafa" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-accent transition-colors"><Instagram size={20} /></a>
                  <button onClick={() => openWhatsApp()} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-accent transition-colors cursor-pointer"><MessageCircle size={20} /></button>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6">Our Menu</h4>
                <div className="flex flex-col gap-4 text-white/60">
                   <button onClick={() => handleCategoryClick('birthday')} className="hover:text-brand-accent text-left cursor-pointer">Birthday Cakes</button>
                   <button onClick={() => handleCategoryClick('wedding')} className="hover:text-brand-accent text-left cursor-pointer">Wedding Specials</button>
                   <button onClick={() => handleCategoryClick('cupcakes')} className="hover:text-brand-accent text-left cursor-pointer">Mini Cupcakes</button>
                   <button onClick={() => handleCategoryClick('flavours')} className="hover:text-brand-accent text-left cursor-pointer">Exclusive Flavours</button>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                <div className="flex flex-col gap-4 text-white/60">
                   <a href="#home" className="hover:text-brand-accent">Home</a>
                   <a href="#about" className="hover:text-brand-accent">About Us</a>
                   <button onClick={() => handleCategoryClick('custom')} className="hover:text-brand-accent text-left cursor-pointer">Custom Orders</button>
                   <a href="#contact" className="hover:text-brand-accent">Contact</a>
                </div>
              </div>
            </div>
            <div className="pt-12 border-t border-white/10 text-center text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Oven and Heart.
            </div>
         </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream z-[250] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-pink-100 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-brand-accent" />
                  <h2 className="text-2xl font-bold">Your Cart</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-brand-pink rounded-full text-brand-accent">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-24 h-24 bg-brand-pink/50 rounded-full flex items-center justify-center mb-6 text-brand-accent opacity-50">
                      <ShoppingBag size={48} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
                    <p className="text-brand-muted mb-8 text-sm">Looks like you haven't added any treats yet!</p>
                    <Button onClick={() => setIsCartOpen(false)}>Sweeten it up</Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 bg-white rounded-3xl border border-pink-50 shadow-sm">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-sm">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[10px] text-brand-muted mb-2 uppercase tracking-widest font-semibold">₹{item.price} each</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-brand-pink/50 rounded-full px-2 py-1">
                              <button onClick={() => updateQuantity(item.id, -1)} className="w-5 h-5 rounded-full flex items-center justify-center text-brand-accent hover:bg-white transition-colors">
                                <Minus size={12} />
                              </button>
                              <span className="font-bold text-xs min-w-[1rem] text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="w-5 h-5 rounded-full flex items-center justify-center text-brand-accent hover:bg-white transition-colors">
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="font-bold text-brand-accent">₹{item.price * item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-white border-t border-pink-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between mb-6">
                    <span className="text-brand-muted font-medium">Subtotal</span>
                    <span className="text-2xl font-bold">₹{totalPrice}</span>
                  </div>
                  <Button 
                    className="w-full py-5 text-lg"
                    onClick={checkoutWhatsApp}
                  >
                    Checkout via WhatsApp
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <FloatingWhatsApp />
    </div>
  );
}
