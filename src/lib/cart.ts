export interface CartItem {
  id: string;
  width: number;
  height: number;
  profileType: string;
  profileColor: string;
  sections: number;
  glassType: string;
  price: number;
  timestamp: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

let cart: CartItem[] = [];

export const cartManager = {
  getItems: (): CartItem[] => cart,
  
  addItem: (item: Omit<CartItem, 'id' | 'timestamp'>): string => {
    const id = `wall_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newItem: CartItem = {
      ...item,
      id,
      timestamp: new Date()
    };
    cart.push(newItem);
    
    // Trigger custom event to update cart count in header
    window.dispatchEvent(new CustomEvent('cart-updated'));
    
    return id;
  },
  
  removeItem: (id: string): boolean => {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
      cart.splice(index, 1);
      
      // Trigger custom event to update cart count in header
      window.dispatchEvent(new CustomEvent('cart-updated'));
      
      return true;
    }
    return false;
  },
  
  clearCart: (): void => {
    cart = [];
    
    // Trigger custom event to update cart count in header
    window.dispatchEvent(new CustomEvent('cart-updated'));
  },
  
  getTotal: (): number => {
    return cart.reduce((total, item) => total + item.price, 0);
  }
};