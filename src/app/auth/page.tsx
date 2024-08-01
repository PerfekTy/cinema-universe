import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UserAuthForm } from "@/app/auth/user-auth-form";

export const metadata: Metadata = {
  title: "Zaloguj się",
  description: "Zaloguj się i dowoli korzystaj z serwisu Cinema Universe",
};

export default function Login() {
  return (
    <>
      <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Carousel className="relative hidden h-screen border-r lg:flex lg:justify-center">
          <CarouselContent>
            <CarouselItem>
              <Image
                src="/images/auth-poster.png"
                width={1280}
                height={843}
                alt="Authentication"
                className="h-full w-full object-fill"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-5" />
          <CarouselNext className="absolute right-5" />
        </Carousel>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Stwórz konto | Zaloguj się
              </h1>
              <p className="text-sm text-muted-foreground">
                Wprowadź swój adres e-mail, aby kontynuować.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-4 text-center text-sm text-muted-foreground">
              Kontynuując, akceptujesz nasze{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Warunki usługi{" "}
              </Link>
              oraz{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Polityke prywatności
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
