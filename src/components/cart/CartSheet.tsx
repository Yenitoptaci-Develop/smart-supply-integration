
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ShoppingCart, Plus, Minus, Quote } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface CartSheetProps {
  cart: Array<{ product: Product; quantity: number }>;
  cartTotalQuantity: number;
  updateCartQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: number;
  calculateShippingCost: (totalQuantity: number) => number;
  billingInfo: {
    name: string;
    taxId: string;
    address: string;
    city: string;
    phone: string;
  };
  setBillingInfo: (info: any) => void;
  setShowPayment: (show: boolean) => void;
}

export const CartSheet = ({
  cart,
  cartTotalQuantity,
  updateCartQuantity,
  removeFromCart,
  cartTotal,
  calculateShippingCost,
  billingInfo,
  setBillingInfo,
  setShowPayment,
}: CartSheetProps) => {
  const { toast } = useToast();
  
  // Check if cart contains only quote-only products
  const hasOnlyQuoteProducts = cart.length > 0 && cart.every(item => item.product.quoteOnly);
  
  // Check if cart has a mix of regular and quote-only products
  const hasMixedProducts = cart.some(item => item.product.quoteOnly) && cart.some(item => !item.product.quoteOnly);
  
  // Calculate shipping cost (only for regular products)
  const regularProductsCart = cart.filter(item => !item.product.quoteOnly);
  const shippingCost = regularProductsCart.length > 0 ? calculateShippingCost(cartTotalQuantity) : 0;

  // Calculate totals excluding quote-only products (which have no price)
  const regularItemsTotal = cart.reduce((total, item) => {
    if (!item.product.quoteOnly) {
      return total + (item.product.price * item.quantity);
    }
    return total;
  }, 0);

  const handleQuoteRequest = () => {
    toast({
      title: "Teklif talebiniz gönderildi",
      description: "Tedarikçi tarafından incelendikten sonra geçmiş siparişlerde görüntüleyebilirsiniz",
    });
    setShowPayment(false);
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <ShoppingCart className="h-6 w-6" />
          {cartTotalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartTotalQuantity}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Sepetim</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {hasMixedProducts && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
              <p className="text-yellow-700 text-sm">
                Sepetinizde hem normal ürünler hem de teklif ürünleri bulunuyor. 
                Bunları ayrı ayrı işleme almanız gerekiyor.
              </p>
            </div>
          )}
          
          {cart.map(item => (
            <div key={item.product.id} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                {!item.product.quoteOnly ? (
                  <p className="text-sm text-gray-500">
                    {item.product.price} TL
                  </p>
                ) : (
                  <p className="text-sm text-primary">
                    Teklif ürünü
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">
                  {item.quantity}
                </span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          {cart.length > 0 ? (
            <div className="border-t pt-4">
              {!hasOnlyQuoteProducts && (
                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Ara Toplam</span>
                    <span>{regularItemsTotal} TL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Kargo Bedeli</span>
                    <span>{shippingCost} TL</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Toplam</span>
                    <span>{regularItemsTotal + shippingCost} TL</span>
                  </div>
                </div>
              )}
              
              <Dialog>
                <DialogTrigger asChild>
                  {hasOnlyQuoteProducts ? (
                    <Button className="w-full mt-4" variant="outline">
                      <Quote className="h-4 w-4 mr-2" />
                      Teklif İste
                    </Button>
                  ) : (
                    <Button className="w-full mt-4">
                      Ödemeye Geç
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {hasOnlyQuoteProducts ? "Teklif Talebi" : "Ödeme Bilgileri"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">
                        {hasOnlyQuoteProducts ? "Teklif Bilgileri" : "Fatura Bilgileri"}
                      </h3>
                      <Input
                        placeholder="Firma Adı"
                        value={billingInfo.name}
                        onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
                      />
                      <Input
                        placeholder="Vergi No"
                        value={billingInfo.taxId}
                        onChange={(e) => setBillingInfo({ ...billingInfo, taxId: e.target.value })}
                      />
                      <Input
                        placeholder="Adres"
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                      />
                      <Input
                        placeholder="Şehir"
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                      />
                      <Input
                        placeholder="Telefon"
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                      />
                    </div>
                    {!hasOnlyQuoteProducts && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Kart Bilgileri</h3>
                        <Input placeholder="Kart Numarası" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="Son Kullanma Tarihi" />
                          <Input placeholder="CVV" />
                        </div>
                      </div>
                    )}
                    <Button 
                      className="w-full" 
                      onClick={hasOnlyQuoteProducts ? handleQuoteRequest : () => setShowPayment(false)}
                    >
                      {hasOnlyQuoteProducts ? "Teklif İste" : "Ödemeyi Tamamla"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <p className="text-center text-gray-500">Sepetiniz boş</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
