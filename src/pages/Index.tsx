
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { Header } from "@/components/header/Header";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";

const products: Product[] = [
  {
    id: 1,
    name: "El Örgüsü Kazak - Kırmızı",
    price: 450,
    category: "Kazaklar",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1580331451062-99ff652288d7",
    supplier: "Zeynep's Handmade",
    description: "Saf yünden el örgüsü, sıcak tutan kırmızı kazak. Özel desenli, yumuşak dokulu.",
    desi: 2,
    additionalImages: [
      "https://images.unsplash.com/photo-1580331451062-99ff652288d7",
      "https://images.unsplash.com/photo-1603744038347-36bfc67ca481",
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5"
    ]
  },
  {
    id: 2,
    name: "El Örgüsü Hırka - Bej",
    price: 525,
    category: "Hırkalar",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77",
    supplier: "Zeynep's Handmade",
    description: "Doğal pamuktan örülmüş, cepli, düğmeli hırka. Dört mevsim kullanılabilir.",
    desi: 2,
    additionalImages: [
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77",
      "https://images.unsplash.com/photo-1618965348928-61a7b15c5471",
      "https://images.unsplash.com/photo-1618965348935-c5a35e9af3cb"
    ]
  },
  {
    id: 3,
    name: "El Örgüsü Bere - Gri",
    price: 120,
    category: "Aksesuarlar",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1510832842230-87253f48d74f",
    supplier: "Zeynep's Handmade",
    description: "Yumuşak dokulu, örgü desenli, sıcak tutan bere.",
    desi: 1,
    additionalImages: [
      "https://images.unsplash.com/photo-1510832842230-87253f48d74f",
      "https://images.unsplash.com/photo-1576249296566-5f547c1a1325",
      "https://images.unsplash.com/photo-1576249334324-df2519ce0f83"
    ]
  },
  {
    id: 4,
    name: "El Örgüsü Atkı - Mavi",
    price: 180,
    category: "Aksesuarlar",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9",
    supplier: "Zeynep's Handmade",
    description: "Uzun, kalın dokulu, klasik örgü desenli atkı.",
    desi: 1,
    additionalImages: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9",
      "https://images.unsplash.com/photo-1541680670548-88e8cd23c0f4",
      "https://images.unsplash.com/photo-1541680670548-88e8cd23c0f5"
    ]
  },
  {
    id: 5,
    name: "El Örgüsü Bebek Battaniyesi",
    price: 350,
    category: "Bebek",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1596443686116-1dad91cb3e61",
    supplier: "Zeynep's Handmade",
    description: "Anti-alerjik pamuktan, bebek için özel üretilmiş, yumuşak battaniye.",
    desi: 2,
    additionalImages: [
      "https://images.unsplash.com/photo-1596443686116-1dad91cb3e61",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b75"
    ]
  },
  {
    id: 6,
    name: "El Örgüsü Patik Çoraplar",
    price: 95,
    category: "Ayakkabı",
    unit: "çift",
    image: "https://images.unsplash.com/photo-1608054908114-0c4920696154",
    supplier: "Zeynep's Handmade",
    description: "Kış için sıcak tutan, evde kullanıma uygun el örgüsü patikler.",
    desi: 1,
    additionalImages: [
      "https://images.unsplash.com/photo-1608054908114-0c4920696154",
      "https://images.unsplash.com/photo-1610959670113-728c01988e88",
      "https://images.unsplash.com/photo-1610959670113-728c01988e89"
    ]
  },
  {
    id: 7,
    name: "El Örgüsü Kazak - Yeşil",
    price: 475,
    category: "Kazaklar",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1575512319219-df0ff5cb6ab1",
    supplier: "Zeynep's Handmade",
    description: "Nefes alabilen özel yün karışımı ile üretilmiş, sıcak tutan şık kazak.",
    desi: 2,
    additionalImages: [
      "https://images.unsplash.com/photo-1575512319219-df0ff5cb6ab1",
      "https://images.unsplash.com/photo-1607370890222-1cdb7a27dd08",
      "https://images.unsplash.com/photo-1607370890223-1cdb7a27dd09"
    ]
  },
  {
    id: 8,
    name: "El Örgüsü Eldiven - Kırmızı",
    price: 85,
    category: "Aksesuarlar",
    unit: "çift",
    image: "https://images.unsplash.com/photo-1607344645866-ba7cf6fd9d13",
    supplier: "Zeynep's Handmade",
    description: "Kış için ideal, sıcak tutan, şık tasarımlı el örgüsü eldivenler.",
    desi: 1,
    additionalImages: [
      "https://images.unsplash.com/photo-1607344645866-ba7cf6fd9d13",
      "https://images.unsplash.com/photo-1610972857209-7ee00672dd3c",
      "https://images.unsplash.com/photo-1610972857209-7ee00672dd3d"
    ]
  },
  {
    id: 9,
    name: "El Örgüsü Bebek Takımı",
    price: 250,
    category: "Bebek",
    unit: "set",
    image: "https://images.unsplash.com/photo-1600012967094-16ea260115be",
    supplier: "Zeynep's Handmade",
    description: "Şapka, yelek ve patikten oluşan, yumuşak pamuktan bebek takımı.",
    desi: 1,
    additionalImages: [
      "https://images.unsplash.com/photo-1600012967094-16ea260115be",
      "https://images.unsplash.com/photo-1601799544970-692b7a6dd1de",
      "https://images.unsplash.com/photo-1601799544971-692b7a6dd1df"
    ]
  },
  {
    id: 10,
    name: "El Örgüsü Yastık Kılıfı",
    price: 120,
    category: "Ev",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b",
    supplier: "Zeynep's Handmade",
    description: "Dekoratif örgü desenli, %100 pamuk yastık kılıfı.",
    desi: 1,
    additionalImages: [
      "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b",
      "https://images.unsplash.com/photo-1589710657147-ef0b93c0eeba",
      "https://images.unsplash.com/photo-1589710657147-ef0b93c0eebc"
    ]
  },
  {
    id: 11,
    name: "El Örgüsü Masa Örtüsü",
    price: 280,
    category: "Ev",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1566475955255-404134a79aed",
    supplier: "Zeynep's Handmade",
    description: "Geleneksel desenli, el işi masa örtüsü.",
    desi: 2,
    additionalImages: [
      "https://images.unsplash.com/photo-1566475955255-404134a79aed",
      "https://images.unsplash.com/photo-1586161513008-56f7ec0fe781",
      "https://images.unsplash.com/photo-1586161513008-56f7ec0fe782"
    ]
  },
  {
    id: 12,
    name: "El Örgüsü Çocuk Kazağı",
    price: 220,
    category: "Çocuk",
    unit: "adet",
    image: "https://images.unsplash.com/photo-1584051022121-6ee465f71c95",
    supplier: "Zeynep's Handmade",
    description: "Anti-alerjik pamuktan üretilmiş, şirin desenli çocuk kazağı.",
    desi: 1,
    additionalImages: [
      "https://images.unsplash.com/photo-1584051022121-6ee465f71c95",
      "https://images.unsplash.com/photo-1577881546586-4e879f01899d",
      "https://images.unsplash.com/photo-1577881546586-4e879f01899e"
    ]
  }
];

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

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const incrementQuantity = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const decrementQuantity = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  };

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
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter className="h-5 w-5" />
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

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
