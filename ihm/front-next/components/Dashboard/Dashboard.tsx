"use client";

import { getData } from "@/app/home/dashboard/action";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import MultiLineChart from "../Charts/MultiLineChart";
import SmallStackedList from "../Lists/SmallStackedList";

// THE RESPONSE SENT FROM THE SERVER ACTION
type Response = {
  success: boolean;
  data?: undefined | any;
  message?: undefined | string;
};

type Data = {
  id: string;
  co2: number;
  temperature: number;
  sensorId: number;
  heating: boolean;
  presence: boolean;
  date: string;
  incident: boolean;
};

export default function Dashboard({
  dataResponse, dataBuilding
}: {
  dataResponse: Response;
  dataBuilding: Response;
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [sensorID, setSensorID] = useState<string>("3");
  const [sensorsAndColors, setSensorsAndColors] = useState<any>([]);

  const setActiveItem = index => {
    setActiveIndex(index === activeIndex ? null : index);
  };


  const { data, error, isLoading } = useQuery({
    queryKey: ["dataResponse", sensorID],
    queryFn: async () => {
      const response = await getData(sensorID);
      return response.data;
    },
    initialData: dataResponse.data,
  });

  const stackedListData = dataBuilding.data.building;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getData(building);
  //     setData(response.data);
  //   };
  //   fetchData();
  // }, [building]);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  if (isLoading) {
    return <div className="bg-black text-4xl">JE CHARGE</div>;
  }

  if (!dataResponse.success) {
    return toast.error(dataResponse.message);
  }

  if (error) {
    toast.error("Quelque chose s'est mal passé");
    return <></>;
  }

  return (
    <div className="w-full py-2 px-2">
      <div className="flex w-full gap-2">
        <div className="flex max-w-9/12 w-full">
          <MultiLineChart fetchedData={data} colors={sensorsAndColors} />
        </div>
        <div className="w-3/12">
          <div className="flex flex-col w-full">
            <p className="text-black mb-2">Choix du capteur :</p>
            <div className="rounded-t-lg">
              {stackedListData.map((building: any, i) => (
                <SmallStackedList key={i}
                  buildingsInfo={building}
                  hanleSensorId={(id: string) => {
                    setSensorID(id);
                  }}
                  isActive={i === activeIndex}
                  setActive={() => setActiveItem(i)}
                  setSensorsAndColors={setSensorsAndColors}
                  sensorsAndColors={sensorsAndColors}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
