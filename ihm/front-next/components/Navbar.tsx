// "use client";

import {
  ChartBarIcon,
  Cog8ToothIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import headsetSVG from "../public/images/headset.svg";
import celsiusSVG from "../public/images/logo.svg";
import "/app/globals.css";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const { data: session } = useSession();
  const loading = session === undefined;
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/home/dashboard",
      icon: SquaresPlusIcon,
      current: pathname === "/home/dashboard",
      role: ["admin", "user", "root"],
    },
    {
      name: "Paramètres",
      href: "/home/settings",
      icon: Cog8ToothIcon,
      current: pathname === "/home/settings",
      role: ["admin", "root"],
    },
    {
      name: "Données",
      href: "/home/data-details",
      icon: ChartBarIcon,
      current: pathname === "/home/data-details",
      role: ["admin", "user", "root"],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between items-center py-10">
      <Link href="/home">
        <Image src={celsiusSVG} alt="celcius logo" width={200} />
      </Link>
      <div className="flex min-h-fit flex-col w-full justify-around items-center">
        {navigation.map((item) => {
          if (session && item.role.includes(session?.user.role)) {
            return (
              <Link
                href={item.href}
                className="flex w-full flex-row justify-center py-5 group relative"
                key={item.name}
              >
                <item.icon
                  className={classNames(
                    item.current ? "text-custom-blue" : "text-custom-gray",
                    "h-7 shrink-0 w-1/2",
                  )}
                  aria-hidden="true"
                />
                <p
                  className={
                    item.current
                      ? "text-black font-poppins font-semibold text-base w-1/2 after:absolute after:bg-custom-blue after:w-1.5 after:h-8 after:rounded after:-right-1 after:top-[25%]"
                      : "text-custom-gray font-poppins font-semibold text-base w-1/2 group-hover:text-black"
                  }
                >
                  {item.name}
                </p>
              </Link>
            );
          }
        })}
      </div>
      <div className="w-full flex flex-col items-center relative">
        <Image
          src={headsetSVG}
          alt="celcius logo"
          className="absolute -top-24"
          width={150}
        />
        <div className="bg-custom-blue w-56 rounded h-44 flex flex-col items-center justify-end">
          <label className="font-poppins font-semibold text-base text-white">
            Un problème ?
          </label>
          <p className="font-poppins m-2 text-sm text-white text-center">
            N'hésitez pas à nous contacter
          </p>
          <button className="font-poppins rounded-full bg-white text-custom-blue p-2 px-5 my-3 text-base">
            Contactez nous
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
