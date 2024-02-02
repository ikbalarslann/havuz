import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function Slider({ array }: any) {
  return (
    <Carousel className="w-auto min-w-full">
      <CarouselContent className="lg:flex-row md:flex-row sm:flex-col">
        {array.map((item, index) => (
          <CarouselItem
            key={index}
            className="w-full lg:w-1/3 md:w-1/2 sm:w-full"
          >
            <Card>
              <CardContent className="flex aspect-square items-center justify-center w-full">
                <Image
                  src={`${item}`}
                  alt="pool image"
                  layout="fill"
                  objectFit="cover"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
