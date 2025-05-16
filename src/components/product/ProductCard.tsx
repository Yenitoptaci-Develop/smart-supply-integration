
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Plus, Minus, ShoppingCart, Quote } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
}: ProductCardProps) => {
  const [quoteQuantity, setQuoteQuantity] = useState(1);
  const { toast } = useToast();

  const handleQuoteRequest = () => {
    // Add quote item to the cart
    onAddToCart(product, quoteQuantity);
    
    toast({
      title: "Teklif talebiniz sepete eklendi",
      description: "Siparişi tamamla sayfasından satıcıya gönderebilirsiniz",
    });
    
    setQuoteQuantity(1);
  };

  return (
    <Card className="flex flex-col h-full">
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <div className="aspect-square relative bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://www.tacev.com/image/cache/catalog/image/cache/catalog/TENCERELER/tt-1508_dekube-1200x1200.webp";
                }}
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-sm h-[40px] line-clamp-2 overflow-hidden">{product.name}</CardTitle>
            </CardHeader>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>
              {product.quoteOnly 
                ? "Ürün detaylarını inceleyin ve teklif talep edin" 
                : "Ürün detaylarını inceleyin ve sepete ekleyin"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://www.tacev.com/image/cache/catalog/image/cache/catalog/TENCERELER/tt-1508_dekube-1200x1200.webp";
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.additionalImages?.map((img, index) => (
                  <div key={index} className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://www.tacev.com/image/cache/catalog/image/cache/catalog/TENCERELER/tt-1508_dekube-1200x1200.webp";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Ürün Detayları</h3>
                <p className="text-sm text-gray-500">Kategori: {product.category}</p>
                <p className="text-sm text-gray-500">Tedarikçi: {product.supplier}</p>
                <p className="text-sm text-gray-500">Birim: {product.unit}</p>
                {!product.quoteOnly && (
                  <p className="font-semibold text-lg mt-2">{product.price} TL</p>
                )}
                {product.quoteOnly && (
                  <p className="font-semibold text-lg mt-2 text-primary">Fiyat için teklif alın</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {!product.quoteOnly ? (
                  <>
                    <div className="flex items-center gap-1 justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onQuantityChange(product.id, quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">
                        {quantity}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onQuantityChange(product.id, quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      size="sm"
                      className="w-full"
                      onClick={() => onAddToCart(product, quantity)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Sepete Ekle
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setQuoteQuantity(Math.max(1, quoteQuantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">
                        {quoteQuantity}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setQuoteQuantity(quoteQuantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      size="sm"
                      className="w-full"
                      onClick={handleQuoteRequest}
                    >
                      <Quote className="h-4 w-4 mr-2" />
                      Teklif İste
                    </Button>
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Ürün Açıklaması</h3>
                  <p className="text-sm text-gray-600">
                    {product.description || "Ürün açıklaması bulunmamaktadır."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CardContent className="p-4 pt-0 flex flex-col flex-grow">
        <div className="flex flex-col h-full">
          <Badge variant="secondary" className="w-fit mb-2">
            {product.category}
          </Badge>
          <div className="flex justify-between items-center mb-2">
            {!product.quoteOnly ? (
              <p className="font-medium">{product.price} TL</p>
            ) : (
              <p className="font-medium text-primary">Fiyat için teklif alın</p>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tedarikçi ile Mesajlaş</DialogTitle>
                  <DialogDescription>
                    {product.supplier} ile iletişime geçin
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <Input placeholder="Mesajınızı yazın..." />
                    <Button className="mt-4 w-full">Gönder</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-auto">
            {!product.quoteOnly ? (
              <>
                <div className="flex items-center gap-1 justify-end mb-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onQuantityChange(product.id, quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">
                    {quantity}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onQuantityChange(product.id, quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button 
                  size="sm"
                  className="w-full"
                  onClick={() => onAddToCart(product, quantity)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Sepete Ekle
                </Button>
              </>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="sm"
                    className="w-full"
                    variant="outline"
                  >
                    <Quote className="h-4 w-4 mr-2" />
                    Teklif Al
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Teklif Talebi</DialogTitle>
                    <DialogDescription>
                      "{product.name}" ürünü için teklif talebinizi iletebilirsiniz.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-2 mb-4">
                      <label className="text-sm font-medium">Adet:</label>
                      <div className="flex items-center gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setQuoteQuantity(Math.max(1, quoteQuantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">
                          {quoteQuantity}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setQuoteQuantity(quoteQuantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      className="w-full"
                      onClick={handleQuoteRequest}
                    >
                      Teklif İste
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
