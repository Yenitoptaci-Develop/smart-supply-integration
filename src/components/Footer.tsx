
import React from "react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Zeynep'in Butiği</h3>
            <p className="text-gray-600 text-sm">
              Değerli müşterilerimize kişiselleştirilmiş dokunuşlarla premium kalitede ürünler sunuyoruz.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Anasayfa</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Ürünler</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Hakkımızda</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">İletişim</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">SSS</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Kargo ve İadeler</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Mağaza Politikası</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Ödeme Yöntemleri</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Bizimle İletişime Geçin</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">E-posta: info@zeynepsbutique.com</li>
              <li className="text-gray-600">Telefon: +90 555 123 4567</li>
              <li className="text-gray-600">Adres: İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Zeynep'in Butiği. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Gizlilik Politikası</span>
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Kullanım Koşulları</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
