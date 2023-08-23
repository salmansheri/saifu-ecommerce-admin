"use client";

import React from "react";
import MobileNav from "./mobile-nav";
import MainNav from "./main-nav";
import { useParams } from "next/navigation";
import { Store } from "@prisma/client";
import Switcher from "./switcher";

interface NavbarProps {
  data: Store[] | null;
  store: Store | null;
}

const Navbar: React.FC<NavbarProps> = ({ data, store }) => {
  const params = useParams();

  return (
    <header className="flex flex-row h-20 justify-between items-center px-5 md:px-10 lg:px-20">
      <div className="flex flex-row gap-x-5">
        <Switcher stores={data} storeName={store?.name} />
      </div>
      <nav>
        <MobileNav />
        <MainNav storeId={params.storeId as string} />
      </nav>
    </header>
  );
};

export default Navbar;
