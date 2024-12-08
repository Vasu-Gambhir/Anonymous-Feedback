"use client";
import { Mail } from "lucide-react"; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 pt-0 pb-20 bg-gray-50 text-white">
        <section className="text-center mb-12 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-4 md:mt-4 text-lg md:text-xl text-gray-600">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-3xl md:max-w-4xl flex justify-center"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem
                key={index}
                className="p-4 flex justify-center items-center"
              >
                <Card className="w-full max-w-lg bg-white shadow-lg border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-800">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row items-start space-x-3">
                    <Mail className="w-6 h-6 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600">{message.content}</p>
                      <p className="text-sm text-gray-400 mt-1 text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white text-center py-6">
        <p className="text-sm">
          © 2024 <span className="font-bold">True Feedback</span>. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}
