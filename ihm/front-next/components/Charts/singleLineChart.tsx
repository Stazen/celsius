"use client";

import { getDataDetails } from "@/app/home/data-details/action";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

dayjs.extend(utc);

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  zoomPlugin,
);

function singleLineChart({
  sensorId,
  interval,
}: {
  sensorId: string;
  interval: number;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [displayedData, setDisplayedData] = useState<any>([]);
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  const fetchData = async (sensorId, interval) => {
    const data = await getDataDetails(sensorId, interval);
    setData(data.data);
  };

  useEffect(() => {
    setIsLoading(true);
    if (sensorId != null && interval != null) {
      fetchData(sensorId, interval);
    }
  }, [sensorId, interval]);

  useEffect(() => {
    if (data == null || data.length === 0) return;

    setDisplayedData(() => {
      return {
        labels: data.data.map((sensor) => {
          console.log(sensor.date)
          if (sensor.date.split("T")[1]?.split(".")[0] === "00:00:00")
            return (
              sensor.date.split("T")[0].split("-")[2] +
              "/" +
              sensor.date.split("T")[0].split("-")[1] +
              " " +
              sensor.date.split("T")[1].split(".")[0].split(":")[0] +
              "h"
            );
          else
            return sensor.date.split("T")[1]?.split(".")[0].split(":")[0] + "h";
        }),
        datasets: [
          {
            tension: 0.4,
            fill: true,
            data: [...data.data.map((sensor) => sensor.temperature)],
            error: [...data.data.map((sensor) => sensor.incident)],
            heating: [...data.data.map((sensor) => sensor.heating)],
            presence: [...data.data.map((sensor) => sensor.presence)],
            borderColor: "rgba(76,76,76,1)",
            backgroundColor: "rgba(76,76,76,1)",
            pointRadius: 3,
          },
        ],
      };
    });
    setIsLoading(false);
  }, [data]);

  const footer = (tooltipItems: any) => {
    let temp = "";
    let presence = "";
    let heating = "";
    let incident = "";

    tooltipItems.forEach(function (tooltipItem: any) {
      temp = tooltipItem.formattedValue + "°C";
      heating = tooltipItem.dataset.heating[tooltipItem.dataIndex]
        ? "Oui"
        : "Non";
      presence = tooltipItem.dataset.presence[tooltipItem.dataIndex]
        ? "Oui"
        : "Non";
      incident = tooltipItem.dataset.error[tooltipItem.dataIndex]
        ? "Oui"
        : "Non";
    });
    return (
      "Température : " +
      temp +
      "\nIncident : " +
      incident +
      "\nPresence : " +
      presence +
      "\nChauffage : " +
      heating
    );
  };

  return (
    <div className="bg-white dark:bg-opacity-[0.08] rounded-lg border border-black-a12 dark:border-white-a08 overflow-hidden">
      {isloading ? (
        <div className="flex flex-row animate-pulse bg-gray-300 w-full min-h-[350px] dark:bg-darkBackground pt-14"></div>
      ) : (
        <div className="min-w-full bg-white bg-opacity-[0.00] min-h-[450px] p-4 overflow-hidden">
          <Line
            data={displayedData}
            options={{
              //responsive: true,
              maintainAspectRatio: false,
              datasets: {
                line: {
                  segment: {
                    borderColor: (ctx) =>
                      displayedData.datasets[0].error[ctx.p0DataIndex + 1]
                        ? "rgba(255,0,0,0.6)"
                        : "rgba(0,255,0,0.6)",
                    backgroundColor: (ctx) =>
                      displayedData.datasets[0].error[ctx.p0DataIndex + 1]
                        ? "rgba(255,0,0,0.4)"
                        : "rgba(0,255,0,0.4)",
                  },
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
                  },
                  zoom: {
                    pinch: {
                      enabled: true, // Enable pinch zooming
                    },
                    wheel: {
                      enabled: true, // Enable wheel zooming
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
              scales: {
                x: {
                  stacked: true,
                  grid: {
                    display: false,
                  },
                  min: 14,
                  max: displayedData.labels.length,
                },
                y: {
                  display: true,
                  beginAtZero: false,
                  position: "right",
                  grid: {
                    color: () =>
                      resolvedTheme === "dark"
                        ? "rgba(255, 255, 255, 0.12)"
                        : "rgba(0, 0, 0, 0.12)",
                  },
                  ticks: {
                    callback: function (value) {
                      return Number(value).toFixed(1).toString() + " °C";
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default singleLineChart;
