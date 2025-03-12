"use client";

import { getData } from "@/app/home/dashboard/action";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  zoomPlugin,
  Filler,
);

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

export default function ({
  fetchedData,
  colors,
}: {
  fetchedData: Data[];
  colors: any;
}) {
  const chartRef = useRef<any>(null);
  const [gradient, setGradient] = useState<any>(null);
  const [displayedData, setDisplayedData] = useState<any>([]);
  const [allData, setAllData] = useState([{}]);
  const [sensorDataList, setSensorDataList] = useState<any>(null);

  const fetchSensorData = async () => {
    setSensorDataList(
      await Promise.all(
        colors.map(async (sensor) => {
          const data = await getData(sensor.sensorId);
          console.log(data);
          return { sensorId: sensor.sensorId, data, color: sensor.color };
        }),
      ),
    );
  };

  useEffect(() => {
    fetchSensorData();
  }, [colors]);

  useEffect(() => {
    setDisplayedData((prevData) => {
      if (
        !sensorDataList ||
        sensorDataList.length === 0 ||
        !sensorDataList[0].data ||
        !sensorDataList[0].data.data
      ) {
        return prevData; // Retourne l'état précédent si les données ne sont pas disponibles
      }
      return {
        labels: [
          ...sensorDataList[0].data.data.map((row) =>
            dayjs(new Date(row.date).toISOString()).format("DD/MM/YYYY"),
          ),
        ],
        datasets: sensorDataList.map((sensor) => {
          return {
            data: [...sensor.data.data.map((row) => row.temperature)],
            heating: [...sensor.data.data.map((row) => row.heating)],
            presence: [...sensor.data.data.map((row) => row.presence)],
            incident: [...sensor.data.data.map((row) => row.incident)],
            date: [...sensor.data.data.map((row) => row.date)],
            hidden: false,
            line: {
              tension: 0.8,
              fill: {
                target: "origin",
                above: gradient,
              },
              pointRadius: 10,
            },
            borderColor: sensor.color,
            pointBackgroundColor: sensor.color,
          };
        }),
      };
    });
  }, [sensorDataList]);

  const footer = (tooltipItems: any) => {
    let temp = "";
    let date = "";
    let presence = "";
    let heating = "";
    let incident = "";

    tooltipItems.forEach(function (tooltipItem: any) {
      temp = tooltipItem.formattedValue + "°C";
      date = dayjs(
        new Date(tooltipItem.dataset.date[tooltipItem.dataIndex]).toISOString(),
      ).format("HH:mm");
      heating = tooltipItem.dataset.heating[tooltipItem.dataIndex]
        ? "Oui"
        : "Non";
      presence = tooltipItem.dataset.presence[tooltipItem.dataIndex]
        ? "Oui"
        : "Non";
      incident = tooltipItem.dataset.incident[tooltipItem.dataIndex]
        ? "Oui"
        : "Non";
    });

    return (
      "Heure : " +
      date +
      "\nTempérature : " +
      temp +
      "\nIncident : " +
      incident +
      "\nPresence : " +
      presence +
      "\nChauffage : " +
      heating
    );
  };

  if (!displayedData.datasets) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full"></div>
      <Line
        data={displayedData}
        ref={chartRef}
        options={{
          animation: false,
          spanGaps: true,
          showLine: true,
          responsive: true,
          maintainAspectRatio: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
          scales: {
            y: {
              beginAtZero: true,
              position: "right",
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              beginAtZero: true,
              stacked: true,
              min: 175,
              max: displayedData.labels.length,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
              ticks: {
                display: true,
                stepSize: 100,
              },
            },
          },
          datasets: {
            line: {
              tension: 0.3,
              pointRadius: 2,
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              displayColors: false,
              padding: 4,
              callbacks: {
                //permet de modifier le label du tooltip affiché par défaut
                label: function (context: any) {
                  return "";
                },
                //permet de modifier le footer du tooltip affiché par défaut
                footer: footer,
              },
            },
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
                modifierKey: "shift",
              },
              zoom: {
                wheel: {
                  modifierKey: "shift",
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "x",
              },
              limits: {
                x: {
                  minRange: 10,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
