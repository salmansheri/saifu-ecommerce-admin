"use client";
import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MainNavProps {
  storeId: string;
}

const MainNav: React.FC<MainNavProps> = ({ storeId }) => {
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
      id: 3,
      title: "Colors",
      href: `/store/${storeId}/colors`,
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
    </div>
  );
};

export default MainNav;
