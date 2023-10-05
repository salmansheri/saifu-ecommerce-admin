"use client";

import { Menu } from "lucide-react";
import React from "react";
import { Button } from "../button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../separator";
import { signOut } from "next-auth/react";

interface MobileNavProps {
  storeId: string;
  user: {
    id: string | undefined;
    name: string | undefined;
    email: string | undefined;
    image: string | undefined;
  };
}

const MobileNav: React.FC<MobileNavProps> = ({ storeId, user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      id: 1,
      title: "Overview",
      href: "/store",
    },
    {
      id: 2,
      title: "Billboard",
      href: `/store/${storeId}/billboard`,
    },
    {
      id: 3,
      title: "Categories",
      href: `/store/${storeId}/categories`,
    },
    {
      id: 4,
      title: "Colors",
      href: `/store/${storeId}/colors`,
    },
    {
      id: 5,
      title: "Sizes",
      href: `/store/${storeId}/sizes`,
    },
    {
      id: 6,
      title: "Products",
      href: `/store/${storeId}/products`,
    },
    {
      id: 7,
      title: "Orders",
      href: `/store/${storeId}/orders`,
    },
  ];
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigation Menus Here!</SheetDescription>
          <div className="flex flex-col space-y-5 mt-4">
            {routes.map((route) => (
              <Link
                className={cn(pathname === route.href && "font-bold")}
                href={route.href}
                key={route.id}
              >
                {route.title}
              </Link>
            ))}
          </div>
          <Separator className="my-5" />
          <SheetFooter>
            {user ? (
              <Button onClick={() => signOut()}>Sign out</Button>
            ) : (
              <Button onClick={() => router.push("/sign-in")}>Sign in</Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
