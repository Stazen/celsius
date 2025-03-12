"use client";

import Calendar from "@/components/Calendar/Calendar";
import { HeroInfo } from "@/components/Home/HeroInfo";
import OpenableList from "@/components/Lists/OpenableList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLogs } from "./action";
import { getBuilding, getCalendar } from "./dashboard/action";
export default function Home() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);
  const [stackedListData, setStackedListData] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [logs, setLogs] = useState<any[]>([]);

  const setActiveItem = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const getBuildingData = async () => {
    const logs = await getLogs();
    const data = await getBuilding();

    // if (!logs || !data) {
    //   return router.push("/signin");
    // } else {
    setLogs(logs.data.emails);
    setStackedListData(data.data.building);
    // }
    // console.log(logs, data);
  };
  const getCalendarData = async () => {
    const data = await getCalendar('all');
    setCalendarData(data.data);
  }

  useEffect(() => {
    getBuildingData();
    getCalendarData();
  }, []);

  return (
    <div className="flex flex-row w-full min-h-full p-14">
      <div className="flex w-full flex-col">
        <div className="flex md:flex-row flex-col w-full h-full">
          <div className="flex flex-col w-full">
            <HeroInfo />
            <div className="rounded-lg overflow-hidden bg-white dark:bg-opacity-[0.08] border border-black-a12 dark:border-white-a08">
              <h3 className="p-[2rem] text-md border-b border-black-a12 dark:border-white-a08">
                Liste de vos installations
              </h3>
              <div className="bg-white dark:bg-darkBackground">
                {stackedListData.map((building, i) => (
                  <OpenableList
                    key={i}
                    className=""
                    buildingsInfo={building}
                    isActive={i === activeIndex}
                    setActive={() => setActiveItem(i)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-2/6 pl-14">
            <Calendar data={calendarData} />

            <div className="flex flex-col bg-white dark:bg-opacity-[0.08] w-full min-h-48 rounded-md border border-black-a12 dark:border-white-a08 mb-14 max-h-[250px] mt-14">
              <div className="border-b border-black-a12 dark:border-white-a08 p-4">
                <p className="text-md">Logs</p>
              </div>
              <div className="overflow-auto scrollbar-gutter-stable scrollbar-gutter-both-edges">
                {logs &&
                  logs.map((log) => {
                    return (
                      <div
                        key={log.createdAt}
                        className="border-b border-black-a12 dark:border-white-a08 p-4 bg-white dark:bg-darkBackground"
                      >
                        <p className="text-xs flex flex-col text-justify">
                          <div className="flex mb-2">
                            <span className="p-1 bg-blue-celsius/30 rounded-md text-xxs text-blue-celsius mr-1">
                              {new Date(log.createdAt).toLocaleDateString()}
                            </span>
                            <span className="p-1 bg-orange-500/30 rounded-md text-xxs text-orange-500 mr-2">
                              {log.data.room.building.name} - Etage{" "}
                              {log.data.room.floor.number} -{" "}
                              {log.data.room.name}
                            </span>
                          </div>
                          Le capteur situé dans cette pièce a détecté que la
                          température était trop élevée par rapport au nombre de
                          personnes présentes
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
