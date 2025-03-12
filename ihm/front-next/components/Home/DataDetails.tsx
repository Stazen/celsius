"use client";

import Calendar from "@/components/Calendar/Calendar";
import SingleLineChart from "@/components/Charts/singleLineChart";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
// import user2PNG from "../../../public/images/icons/user-2.png";
import {
  getBuilding,
  getLogs,
  getUser,
} from "../../app/home/data-details/action";
import { getCalendar } from "../../app/home/dashboard/action";
import user2PNG from "../../public/images/icons/user-2.png";

const period = [
  {
    name: "24 heures",
  },
  {
    name: "1 semaine",
  },
  {
    name: "2 semaines",
  },
  {
    name: "3 semaines",
  },
];

export default function DataDetails() {
  const [options, setOptions] = useState<any[]>([]);
  const [stackedListData, setStackedListData] = useState<any[]>([]);
  const [sensorId, setSensorId] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [interval, setInterval] = useState<number>(0);
  const [logs, setLogs] = useState<any[]>([]);
  const [calendarData, setCalendarData] = useState([]);


  //récupérer tout les bâtiments d'une company
  const getInfo = async () => {
    const buildings = await getBuilding();
    const users = await getUser();
    const logs = await getLogs();
    setStackedListData(buildings.data.building);
    setUsers(users.data.companyUser[0].user);
    setOptions(buildings.data.building[0].floor);
    setSensorId(buildings.data.building[0].floor[0].rooms[0].captors[0]);
    setLogs(logs.data.emails);
    setInterval(0);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const fetchData = async () => {
    const calendar = await getCalendar(sensorId);
    setCalendarData(calendar.data);
  };
  useEffect(() => {
    if (sensorId.length > 0) {
      fetchData();
    }
  }, [sensorId]);
  //récupérer les capteurs d'un building
  const handleChange = (event) => {
    const value = event.target.value;
    setOptions(stackedListData[value].floor);
  };

  //récupérer l'ID du capteur à get
  const handleSensor = (event) => {
    const value = event.target.value;
    setSensorId(value);
  };

  const handleInterval = (event) => {
    const value = event.target.value;
    setInterval(value);
  };

  return (
    <div className="flex flex-row w-full min-h-full p-14">
      <div className="flex flex-col w-4/6">
        <div className="flex flex-row justify-between w-full mb-14">
          <div className="">
            <div className="flex flex-row w-full items-end ml-1 mb-1">
              <p className="text-md">Batiment :</p>
            </div>
            <select
              id="building"
              name="building"
              className="w-64 border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white dark:bg-opacity-[0.08] text-sm placeholder-grey"
              onChange={handleChange}
              defaultValue={1}
            >
              {stackedListData.map((building, i) => {
                return (
                  <option key={i} value={i} className="dark:bg-darkBackground">
                    {building.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="">
            <div className="flex flex-row w-full items-end ml-1 mb-1">
              <p className="text-md">Pièce :</p>
            </div>
            <select
              id="sensor"
              name="sensor"
              className="w-64 border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white dark:bg-opacity-[0.08] text-sm placeholder-grey"
              onChange={handleSensor}
              defaultValue={1}
            >
              {options &&
                options.map((floors) => {
                  return (
                    <>
                      {floors.rooms.map((room: any) => {
                        return (
                          <option
                            key={room.captors[0]}
                            value={room.captors[0]}
                            className="dark:bg-darkBackground"
                          >
                            Etage {floors.number} - {room.name}
                          </option>
                        );
                      })}
                      ;
                    </>
                  );
                })}
            </select>
          </div>
          <div className="">
            <div className="flex flex-row w-full items-end ml-1 mb-1">
              <p className="text-md">Intervale :</p>
            </div>
            <select
              id="temporality"
              name="temporality"
              className="w-64 border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white dark:bg-opacity-[0.08] text-sm placeholder-grey"
              defaultValue={0}
              onChange={handleInterval}
            >
              {period.map((period, i) => {
                return (
                  <option key={i} value={i} className="dark:bg-darkBackground">
                    {period.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <SingleLineChart sensorId={sensorId} interval={interval} />
        </div>
      </div>
      <div className="flex flex-col bg-gray-bg w-2/6 pl-14">

        <Calendar data={calendarData} />


        <div className="flex flex-col bg-white dark:bg-opacity-[0.08] w-full min-h-48 rounded-md border border-black-a12 dark:border-white-a08 mb-14  max-h-[250px] mt-14">
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
                          {log.data.room.floor.number} - {log.data.room.name}
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

        <div className="flex flex-col bg-white dark:bg-opacity-[0.08] w-full min-h-48 rounded-md border border-black-a12 dark:border-white-a08 mb-14">
          <div className="border-b border-black-a12 dark:border-white-a08 p-4">
            <p className="text-md">Utilisateurs</p>
          </div>
          {users.map((user) => {
            return (
              <div
                key={user.id}
                className="border-b border-black-a12 dark:border-white-a08 p-4 bg-white dark:bg-darkBackground flex items-center"
              >
                <Image
                  src={user2PNG}
                  alt="user icon"
                  width={20}
                  className="mr-2"
                />
                <p className="text-xs">
                  {user.name}{" "}
                  <span className="p-1 bg-blue-celsius/30 rounded-md text-xxs text-blue-celsius ml-1">
                    {user.role}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
