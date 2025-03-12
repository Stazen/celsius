"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function SmallStackedList({
  buildingsInfo,
  hanleSensorId,
  isActive,
  setActive,
  setSensorsAndColors,
  sensorsAndColors,
}: {
  isActive;
  setActive;
  setSensorsAndColors;
  sensorsAndColors: any;
  buildingsInfo: any;
  hanleSensorId: any;
}) {
  const [activeSensorId, setActiveSensorId] = useState<any>(1);
  const [floorNumber, setFloorNumber] = useState<any>(1);
  const [colorsTab, setColorsTab] = useState([
    "rgba(148,163,184,1)",
    "rgba(251,146,60,1)",
    "rgba(74,222,128,1)",
    "rgba(34,211,238,1)",
    "rgba(232,121,249,1)",
  ]);
  const colorBackgroundBuilding = isActive
    ? "flex w-full text-white font-poppins font-light text-s bg-custom-blue/70 py-2 px-2"
    : "group flex w-full text-black bg-white font-poppins font-light text-s hover:bg-custom-blue/70 hover:text-white py-2 px-2 ease-out duration-300";

  const addColor = (colorsTab: string[], sensorId: number) => {
    const existingAssociation = sensorsAndColors.find(
      (association) => association.sensorId === sensorId,
    );

    if (existingAssociation) {
      const updatedSensorColors = sensorsAndColors.filter(
        (association) => association.sensorId !== sensorId,
      );
      setSensorsAndColors(updatedSensorColors);
      setColorsTab((prevColorsTab) => [
        ...prevColorsTab,
        existingAssociation.color,
      ]);
    } else {
      if (colorsTab.length === 0) {
        toast.error(
          "Vous ne pouvez consulter les informations que 5 capteurs différents",
        );
      } else {
        const lastColor = colorsTab[colorsTab.length - 1];
        const updatedColorsTab = colorsTab.slice(0, -1);
        setColorsTab(updatedColorsTab);
        setSensorsAndColors((prevColors) => [
          ...prevColors,
          { sensorId, color: lastColor },
        ]);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`${colorBackgroundBuilding}`}
        onClick={(e) => {
          e.preventDefault(), setActive();
        }}
      >
        {buildingsInfo?.name} :
      </div>
      {isActive &&
        buildingsInfo.floor.map((floor: any) => {
          return (
            <>
              <div className="font-poppins font-light text-s bg-gray-200 text-gray-500 border-b-1 py-2 px-2">
                <p className="">{`Etage ${floor.number}`}</p>
                {floor.rooms.map((room: any, index) => {
                  return (
                    <>
                      <button
                        className="font-poppins font-light text-s mt-4 flex justify-between items-center"
                        onClick={() => {
                          hanleSensorId(room.captors[0]),
                            //setActiveSensorId(room.captors[0]);
                            setFloorNumber(floor.number);
                          addColor(colorsTab, room.captors[0]);
                        }}
                      >
                        <span
                          className={`flex h-4 w-4 rounded-sm mr-4`}
                          style={{
                            backgroundColor: sensorsAndColors.some(
                              (association) =>
                                association.sensorId === room.captors[0],
                            )
                              ? sensorsAndColors.find(
                                  (association) =>
                                    association.sensorId === room.captors[0],
                                ).color
                              : "rgba(255,255,255,1)",
                          }}
                        ></span>
                        <p>{room.name}</p>
                      </button>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
    </div>
  );
}
