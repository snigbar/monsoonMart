import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import banner1 from "../../assets/banner1.jpg";
import banner3 from "../../assets/banner3.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function HomePageBanner() {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-h-[25vh] md:max-h-[50vh] lg:max-h-[65vh] overflow-hidden rounded-lg"
    >
      <CarouselContent className="h-fit">
        <CarouselItem className="w-full p-0 overflow-hidden">
          <img src={banner1} className="object-cover" />
        </CarouselItem>
        <CarouselItem className="w-full p-0 overflow-hidden">
          <img src={banner3} className="object-cover" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
