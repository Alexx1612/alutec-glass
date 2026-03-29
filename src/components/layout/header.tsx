'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cartManager } from '@/lib/cart';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // Inițializare număr produse
    setCartItems(cartManager.getItems().length);

    // Event listener pentru actualizarea automată a numărului
    const updateCartCount = () => {
      setCartItems(cartManager.getItems().length);
    };

    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  const navigation = [
    { name: 'Acasă', href: '/acasa' },
    { name: 'Produse', href: '/produse' },
    { name: 'Calculator', href: '/calcul' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

        <Link href="/acasa" className="flex items-center space-x-2">
          <span className="text-3xl font-extrabold text-blue-950 tracking-tight">ALUTEC<span className="text-blue-600">GLASS</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-slate-700 font-bold hover:text-blue-600 transition-colors text-lg"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Cart Icon & Mobile Menu */}
        <div className="flex items-center gap-6">
          <Link
            href="/cos"
            className="relative p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 hover:scale-105 transition-all shadow-lg flex items-center"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="hidden sm:inline-block ml-2 font-bold">Coșul meu</span>
            {cartItems > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-600 text-white text-sm font-extrabold w-7 h-7 flex items-center justify-center rounded-full border-2 border-white shadow-xl animate-bounce">
                {cartItems}
              </span>
            )}
          </Link>

          <button className="md:hidden p-2 text-slate-800" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4 shadow-xl absolute w-full left-0">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-xl font-bold text-slate-800 hover:text-blue-600 p-3 rounded-xl hover:bg-blue-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}