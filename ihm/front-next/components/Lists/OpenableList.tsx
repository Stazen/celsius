"use client";

import { Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { ChevronDoubleDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Collapse } from "react-collapse";

export default function OpenableList({ buildingsInfo, isActive, setActive }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="flex w-full justify-between items-center py-3 px-5">
        <div className="w-[33%] flex justify-start"><p className="text-xs">{buildingsInfo.name}</p></div>
        <div className="w-[33%] flex justify-center"> 
        {buildingsInfo.generalState === "Active" ? (
          <div className="">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-emerald-500">
              {buildingsInfo.generalState}
            </p>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            <div className="flex-none rounded-full bg-green-500/20 p-[2px]">
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <p className="text-green-500 text-xs ml-2">
              {buildingsInfo.generalState }Active
            </p>
          </div>
        )}
        </div>
        <div className="w-[33%] flex justify-end">
          <button className="p-2 rounded-lg hover:bg-black-a12 dark:hover:bg-white-a08 transition-colors" onClick={() => setExpanded((curr) => !curr)}>
            {expanded ? <XMarkIcon className="w-6 h-6" /> : <ChevronDoubleDownIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
        {buildingsInfo.floor.map((floor) => (
          <Collapse key={floor.number} className={classNames("dark:bg-darkBackground transition-all")} isOpened={expanded}>
            {floor.rooms.map((room, roomIndex) => (
              <div key={room.number}>
                <div className={classNames("transition-all border-t border-black-a12 dark:border-white-a08 text-xxs py-3 px-5")}>
                  Etage {floor.number} - {room.name}
                </div>
              </div>
            ))}
          </Collapse>
        ))}
    </div>
  );
}
