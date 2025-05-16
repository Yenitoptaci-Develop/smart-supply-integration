
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { Header } from "@/components/header/Header";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductFilter } from "@/components/product/ProductFilter";
import { useProducts } from "@/hooks/use-products";

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit-card">("credit-card");
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    taxId: "",
    address: "",
    city: "",
    phone: ""
  });
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const isMobile = useIsMobile();

  const { products, filteredProducts } = useProducts(searchTerm, selectedCategory);

  const cartTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  
  const calculateShippingCost = (cart: Array<{ product: Product; quantity: number }>): number => {
    const totalDesi = cart.reduce((total, item) => {
      return total + (item.product.desi * item.quantity);
    }, 0);
    
    const desiRate = 50; // Her desi için 50 TL
    return totalDesi * desiRate;
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentCart, { product, quantity }];
    });
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(currentCart =>
      currentCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        cart={cart}
        cartTotalQuantity={cartTotalQuantity}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        calculateShippingCost={(totalQuantity: number) => calculateShippingCost(cart)}
        billingInfo={billingInfo}
        setBillingInfo={setBillingInfo}
        setShowPayment={setShowPayment}
        isMobile={isMobile}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <Banner className="mb-8" />
        
        <ProductFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 1}
              onQuantityChange={(productId, newQuantity) => {
                if (newQuantity > 0) {
                  setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
                }
              }}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductCatalog;
