import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
  sku?: string;
  tags?: string[];
  benefits?: string[];
  usage?: string;
  ingredients?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PromoCode {
  code: string;
  discount: number;
}

interface CartContextType {
  cartItems: CartItem[];
  promoCode: PromoCode | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getDiscountAmount: () => number;
  getDiscountedTotal: () => number;
  applyPromoCode: (code: string) => "success" | "already_applied" | "invalid";
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [promoCode, setPromoCode] = useState<PromoCode | null>(() => {
    // Load promo code from localStorage on initial render
    const savedPromo = localStorage.getItem("promoCode");
    return savedPromo ? JSON.parse(savedPromo) : null;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save promo code to localStorage whenever it changes
  useEffect(() => {
    if (promoCode) {
      localStorage.setItem("promoCode", JSON.stringify(promoCode));
    } else {
      localStorage.removeItem("promoCode");
    }
  }, [promoCode]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
  };

  const getDiscountAmount = () => {
    if (!promoCode) return 0;
    const subtotal = getCartTotal();
    return subtotal * promoCode.discount;
  };

  const getDiscountedTotal = () => {
    const subtotal = getCartTotal();
    const discount = getDiscountAmount();
    return subtotal - discount;
  };

  const applyPromoCode = (code: string): "success" | "already_applied" | "invalid" => {
    const upperCode = code.toUpperCase();
    
    // Check if the same promo code is already applied
    if (promoCode && promoCode.code === upperCode) {
      return "already_applied";
    }
    
    if (upperCode === "LENUTA10") {
      setPromoCode({ code: "LENUTA10", discount: 0.1 });
      return "success";
    }
    return "invalid";
  };

  const removePromoCode = () => {
    setPromoCode(null);
  };

  return (
    <CartContext.Provider 
      value={{
        cartItems,
        promoCode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getDiscountAmount,
        getDiscountedTotal,
        applyPromoCode,
        removePromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};