import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const Slider = ({ array }: { array: string[] }) => {
  return (
    <Carousel
      className="w-full max-w-[400px]  "
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {array?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="py-1">
              <Card>
                <CardContent className="flex items-center justify-center   ">
                  <Image
                    src={item}
                    alt="Pool Image"
                    width={450}
                    height={500}
                    loading="eager"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Slider;
