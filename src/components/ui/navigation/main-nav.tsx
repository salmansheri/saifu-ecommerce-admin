"use client";
import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../button";

interface MainNavProps {
  storeId: string;
  user: {
    id: string | undefined;
    name: string | undefined;
    email: string | undefined;
    image: string | undefined;
  };
}

const MainNav: React.FC<MainNavProps> = ({ storeId, user }) => {
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
    <div className="hidden md:flex gap-x-5">
      {routes.map((route) => (
        <Link
          className={cn(pathname === route.href && "font-bold")}
          href={route.href}
          key={route.id}
        >
          {route.title}
        </Link>
      ))}
      {user ? <Button>Sign out</Button> : <Button>Sign in</Button>}
    </div>
  );
};

export default MainNav;
