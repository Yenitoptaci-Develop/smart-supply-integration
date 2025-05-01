
import { MessageCircle, Clock, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Messages from "@/components/Messages";
import PastOrders from "@/components/PastOrders";
import Support from "@/components/Support";
import { CartSheet } from "@/components/cart/CartSheet";
import { Product } from "@/types/product";

interface HeaderProps {
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
  isMobile: boolean;
}

export const Header = ({
  cart,
  cartTotalQuantity,
  updateCartQuantity,
  removeFromCart,
  cartTotal,
  calculateShippingCost,
  billingInfo,
  setBillingInfo,
  setShowPayment,
  isMobile,
}: HeaderProps) => {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col">
          <div className="flex items-center">
            <img 
              src="https://s.tmimgcdn.com/scr/800x500/300400/yaratici-restoran-logo-tasarimi_300465-original.jpg" 
              alt="Logo" 
              className="h-12 w-auto object-contain" 
            />
            <h1 className="ml-4 text-2xl font-bold text-gray-900">Zeynep's Butique</h1>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            {isMobile ? (
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <MessageCircle className="h-6 w-6 cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Mesajlarım</DialogTitle>
                    </DialogHeader>
                    <Messages />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Clock className="h-6 w-6 cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Geçmiş Siparişlerim</DialogTitle>
                    </DialogHeader>
                    <PastOrders />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <HelpCircle className="h-6 w-6 cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Yardım Merkezi</DialogTitle>
                    </DialogHeader>
                    <Support />
                  </DialogContent>
                </Dialog>

                <CartSheet 
                  cart={cart}
                  cartTotalQuantity={cartTotalQuantity}
                  updateCartQuantity={updateCartQuantity}
                  removeFromCart={removeFromCart}
                  cartTotal={cartTotal}
                  calculateShippingCost={calculateShippingCost}
                  billingInfo={billingInfo}
                  setBillingInfo={setBillingInfo}
                  setShowPayment={setShowPayment}
                />
              </div>
            ) : (
              <>
                <Messages />
                <PastOrders />
                <Support />
                <CartSheet 
                  cart={cart}
                  cartTotalQuantity={cartTotalQuantity}
                  updateCartQuantity={updateCartQuantity}
                  removeFromCart={removeFromCart}
                  cartTotal={cartTotal}
                  calculateShippingCost={calculateShippingCost}
                  billingInfo={billingInfo}
                  setBillingInfo={setBillingInfo}
                  setShowPayment={setShowPayment}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
