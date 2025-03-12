"use client";

import React from "react";
import { HiOutlinePencil } from "react-icons/hi2";

export default function BasicList({ usersInfo }: any) {
  return (
    <div role="list">
      <div className="flex justify-between py-5 px-5 border-b dark:border-white-a08 border-black-a12 flex items-center justify-center">
        <div className="flex w-1/3">
          <p className="text-xs">
            {usersInfo.name}
          </p>
        </div>
        <div className="flex w-1/3">
          <span className="bg-blue-celsius/30 rounded-md text-xs text-blue-celsius h-[25px] min-w-[60px] flex items-center justify-center">
            {usersInfo.role}
          </span>
        </div>
        <div className="p-2 rounded-lg hover:bg-black-a12 dark:hover:bg-white-a08 transition-colors">
          <HiOutlinePencil className="w-5 h-6 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
