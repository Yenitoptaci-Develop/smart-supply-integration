
import React from "react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Zeynep's Butique</h3>
            <p className="text-gray-600 text-sm">
              Offering premium quality products with a personalized touch for our valued customers.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Home</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Products</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">About Us</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Contact</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">FAQ</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Shipping & Returns</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Store Policy</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Payment Methods</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@zeynepsbutique.com</li>
              <li className="text-gray-600">Phone: +90 555 123 4567</li>
              <li className="text-gray-600">Address: Istanbul, Turkey</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Zeynep's Butique. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Privacy Policy</span>
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
