
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // If no consent record found, show the banner
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    // Save consent to localStorage
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
    toast({
      title: "Çerezler kabul edildi",
      description: "Tercihleriniz kaydedildi. Teşekkür ederiz!",
    });
  };

  const handleDecline = () => {
    // Save that user declined cookies
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
    toast({
      title: "Çerezler reddedildi",
      description: "Sadece gerekli çerezler kullanılacak.",
      variant: "destructive",
    });
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-6 z-50 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-start">
        <Cookie className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-gray-900">Çerez Bildirimi</h3>
          <p className="text-sm text-gray-500 mt-1">
            Bu web sitesi, size en iyi deneyimi sunmak için çerezleri kullanır. 
            Çerezleri kabul ederek web sitemizi kullanmaya devam edebilirsiniz.
          </p>
          <div className="flex space-x-2 mt-4">
            <Button variant="default" size="sm" onClick={handleAccept}>
              Kabul Et
            </Button>
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Reddet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
