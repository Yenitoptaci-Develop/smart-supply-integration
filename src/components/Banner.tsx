
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface BannerProps {
  className?: string;
}

export const Banner = ({ className }: BannerProps) => {
  const bannerImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1582978087598-088c059ea414",
      alt: "El örgüsü koleksiyonu",
      title: "El Yapımı Özel Koleksiyon",
      subtitle: "Birbirinden özel el örgüsü ürünleri keşfedin"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1579724138975-1308fc0c50fd",
      alt: "Yeni sezon ürünleri",
      title: "Yeni Sezon Ürünleri",
      subtitle: "En son el örgüsü tasarımlarımızı inceleyin"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1624593911234-94fc11d1d214",
      alt: "Özel indirimler",
      title: "Özel İndirimler",
      subtitle: "Sınırlı süre için özel fiyatları kaçırmayın"
    }
  ];

  return (
    <div className={cn("w-full", className)}>
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {bannerImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative">
                <AspectRatio ratio={16 / 5}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </AspectRatio>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                  <h2 className="text-2xl md:text-4xl font-bold text-white">{image.title}</h2>
                  <p className="text-sm md:text-xl text-white/90 mt-2">{image.subtitle}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-4 bg-white/80 hover:bg-white" />
          <CarouselNext className="-right-4 bg-white/80 hover:bg-white" />
        </div>
      </Carousel>
    </div>
  );
};
