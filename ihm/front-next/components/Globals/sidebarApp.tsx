"use client";

import { Logo } from "@/public/images/landingPage/logo";
import { LogoDark } from "@/public/images/landingPage/logoDark";
import {
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface User {
  name: string;
  surname: string;
  email: string;
}

const SidebarContext = createContext<any>(null);

export default function Sidebar({
  children,
  user,
  setter,
}: {
  children: React.ReactNode;
  user: User;
  setter: any;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-[calc(100vh-69.59px)] transition-all mt-[69.59px] bg-white dark:bg-darkBackground fixed left-0 ${
        expanded ? "w-1/6" : "w-auto"
      }`}
    >
      <div className="h-[calc(100vh-69.59px)] bg-white flex flex-col items-center justify-around  border-r border-black-a12 dark:border-white-a08 bg-opacity-[0.08]">
        <div
          className={classNames(
            "pt-4 pb-12 flex justify-between items-center w-full transition-all",
            expanded ? "px-10" : " px-4",
          )}
        >
          <div className="flex items-center">
            {resolvedTheme === "dark" ? (
              <LogoDark
                className={`overflow-hidden transition-all ${
                  expanded ? "h-6 w-6 mr-2" : "w-0 ml-0"
                }`}
              />
            ) : (
              <Logo
                className={`overflow-hidden transition-all ${
                  expanded ? "h-6 w-6 mr-2" : "w-0 ml-0"
                }`}
              />
            )}
            <p
              className={`text-xs overflow-hidden transition-all ${
                expanded ? "" : "w-0 ml-0"
              }`}
            >
              Celsius® 2024
            </p>
          </div>
          <button
            className="p-2 rounded-lg"
            onClick={() => {
              setExpanded((curr) => !curr);
              setter((curr) => !curr);
            }}
          >
            {expanded ? (
              <ChevronDoubleLeftIcon className="w-6 h-6" />
            ) : (
              <ChevronRightIcon className="w-6 h-6" />
            )}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul
            className={classNames("flex-1 w-full", expanded ? "px-10" : "px-4")}
          >
            {children}
          </ul>
        </SidebarContext.Provider>
        <div
          className={classNames(
            "border-t border-black-a12 dark:border-white-a08 flex p-4 w-full flex items-center transition-all",
            expanded ? "justify-between" : "justify-center",
          )}
        >
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Timo+D"
            alt=""
            className="w-8 h-8 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-full ml-3" : ""}
          `}
          >
            <div
              className={classNames(
                "flex justify-between flex-col transition-all",
                expanded ? "" : "hidden",
              )}
            >
              <h4 className="text-xs">{user.name}</h4>
              <span className={`text-xxs text-grey`}>{user.email}</span>
            </div>
            {/* <MoreVertical size={20} /> */}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert, link }) {
  const { expanded } = useContext(SidebarContext);
  const pathname = usePathname();
  let active;
  active = pathname === link;

  return (
    <Link href={link} className="w-full">
      <li
        className={`
        relative flex items-center py-2 px-2
        font-medium rounded-md cursor-pointer
        transition-colors group mb-2
        ${
          active
            ? "text-blue-celsius bg-blue-celsius/20"
            : "hover:bg-black-a12 dark:hover:bg-white-a08 text-grey"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all text-md ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
      </li>
    </Link>
  );
}
