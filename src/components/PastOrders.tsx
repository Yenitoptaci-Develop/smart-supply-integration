
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { History, Truck, RefreshCw, CreditCard } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const pastOrders = [
  {
    id: "ORD001",
    date: "2024-02-05",
    total: 48750,
    status: "Teslim Edildi",
    trackingCode: "1234567890",
    trackingUrl: "https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=1234567890",
    invoice: "INV001",
    items: [
      { name: "Endüstriyel Bulaşık Makinesi", quantity: 1, price: 45000, returnEligible: true },
      { name: "Profesyonel Bıçak Seti", quantity: 1, price: 2500, returnEligible: true },
      { name: "Servis Tabakları (6'lı)", quantity: 1, price: 1200, returnEligible: false }
    ]
  },
  {
    id: "ORD002",
    date: "2024-02-03",
    total: 9600,
    status: "Teslim Edildi",
    trackingCode: "9876543210",
    trackingUrl: "https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=9876543210",
    invoice: "INV002",
    items: [
      { name: "Endüstriyel Mikser", quantity: 1, price: 8500, returnEligible: true },
      { name: "Garson Önlüğü", quantity: 3, price: 350, returnEligible: false }
    ]
  },
  {
    id: "QUOTE001",
    date: "2024-05-10",
    total: null,
    status: "Teklif Bekleniyor",
    isQuote: true,
    items: [
      { name: "Özel Tasarım Masa Örtüsü", quantity: 2, price: null, returnEligible: false }
    ]
  },
  {
    id: "QUOTE002",
    date: "2024-05-12",
    total: 8500,
    status: "Teklif Hazır",
    isQuote: true,
    quoteExpires: "2024-05-25",
    items: [
      { name: "Özel Tasarım El Örgüsü Örtü", quantity: 1, price: 8500, returnEligible: false }
    ]
  }
];

const PastOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePaymentComplete = (quoteId: string) => {
    toast({
      title: "Ödeme işlemi tamamlandı",
      description: "Siparişiniz hazırlanmak üzere işleme alındı.",
    });
    setShowPaymentDialog(false);
    setSelectedQuoteId(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Geçmiş Siparişler
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Geçmiş Siparişlerim</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {pastOrders.map((order) => (
            <div key={order.id} className="mb-6 border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{order.isQuote ? "Teklif No:" : "Sipariş No:"} {order.id}</p>
                    {order.isQuote && (
                      <Badge variant={order.total ? "outline" : "secondary"}>
                        Teklif
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Tarih: {order.date}</p>
                </div>
                <div className="text-right">
                  {order.total !== null ? (
                    <p className="font-semibold">Toplam: {order.total} TL</p>
                  ) : (
                    <p className="font-semibold text-muted-foreground">Fiyat bekleniyor</p>
                  )}
                  <p className={`text-sm ${order.status === 'Teklif Hazır' ? 'text-primary' : 'text-green-600'}`}>{order.status}</p>
                  {!order.isQuote && order.trackingCode && (
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <a
                        href={order.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Truck className="h-4 w-4" />
                        Kargo Takip: {order.trackingCode}
                      </a>
                      <a
                        href={`/invoices/${order.invoice}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Fatura
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ürün</TableHead>
                    <TableHead className="text-right">Adet</TableHead>
                    <TableHead className="text-right">Fiyat</TableHead>
                    <TableHead className="text-right">Toplam</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.price !== null ? `${item.price} TL` : '-'}</TableCell>
                      <TableCell className="text-right">
                        {item.price !== null ? `${item.quantity * item.price} TL` : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.returnEligible && !order.isQuote && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => {
                              setSelectedOrder(order.id);
                              setShowReturnDialog(true);
                            }}
                          >
                            <RefreshCw className="h-4 w-4" />
                            İade/Değişim
                          </Button>
                        )}
                        {order.isQuote && order.status === "Teklif Hazır" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => {
                              setSelectedQuoteId(order.id);
                              setShowPaymentDialog(true);
                            }}
                          >
                            <CreditCard className="h-4 w-4" />
                            Ödeme Yap
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {order.isQuote && order.quoteExpires && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Teklif geçerlilik süresi: {order.quoteExpires} tarihine kadar
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>

      {/* Return Dialog */}
      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>İade/Değişim Talebi</DialogTitle>
            <DialogDescription>
              İade veya değişim talebinizi oluşturun. Talebiniz incelendikten sonra size dönüş yapılacaktır.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">İade/Değişim Nedeni</label>
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder="Lütfen iade veya değişim talebinizin nedenini açıklayın..."
              />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setShowReturnDialog(false);
                setSelectedOrder(null);
              }}
            >
              Talebi Gönder
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quote Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Teklif Ödeme</DialogTitle>
            <DialogDescription>
              Teklif için ödeme bilgilerinizi giriniz
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Fatura Bilgileri</h3>
              <Input placeholder="Firma Adı" className="mb-2" />
              <Input placeholder="Vergi No" className="mb-2" />
              <Input placeholder="Adres" className="mb-2" />
              <Input placeholder="Şehir" className="mb-2" />
              <Input placeholder="Telefon" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Ödeme Bilgileri</h3>
              <Input placeholder="Kart Numarası" className="mb-2" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Son Kullanma Tarihi" />
                <Input placeholder="CVV" />
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                handlePaymentComplete(selectedQuoteId || "");
              }}
            >
              Ödemeyi Tamamla
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default PastOrders;
