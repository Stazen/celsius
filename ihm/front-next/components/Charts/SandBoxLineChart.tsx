"use client";

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
};

export default function ({
  fetchedData,
  fetchedData2,
}: {
  fetchedData: Data[];
  fetchedData2: Data[];
}) {
  const chartRef = useRef<any>(null);
  const [gradient, setGradient] = useState<any>(null);
  // console.log("sandbox", fetchedData);

  const [displayedData, setDisplayedData] = useState<any>({});

  // console.log("dis", displayedData);

  useEffect(() => {
    // console.log(fetchedData);
    setDisplayedData({
      labels: [
        ...fetchedData.map((item) =>
          dayjs(new Date(Number(item.date) * 1000).toISOString()).format(
            "DD/MM/YYYY HH:mm",
          ),
        ),
      ],
      datasets: [
        {
          label: "capteur 1",
          data: [...fetchedData.map((item) => item.temperature)],
          hidden: false,
          line: {
            tension: 0.8,
            fill: {
              target: "origin",
              above: gradient,
            },
            pointRadius: 3,
            backgroundColor: "#2CC1B2",
            borderColor: "#2CC1B2",
          },
        },
        // {
        //   label: "capteur 2",
        //   data: [...fetchedData2.map((item) => item.temperature)],
        //   hidden: false,
        //   line: {
        //     tension: 0.8,
        //     fill: {
        //       target: "origin",
        //       above: gradient,
        //     },
        //     pointRadius: 3,
        //     backgroundColor: "red",
        //     borderColor: "orange",
        //   },
        // },
      ],
    });
  }, [fetchedData]);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const gradient = chart?.ctx?.createLinearGradient(0, 0, 0, 400);
    gradient?.addColorStop(0, "rgba(44,193,178,1)");
    gradient?.addColorStop(1, "white");
    setGradient(gradient);
  }, [chartRef?.current]);

  useEffect(() => {
    // console.log(gradient);
    setDisplayedData((prev: any) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          line: { ...prev.datasets[0].line, fill: { above: gradient } },
        },
        // {
        //   ...prev.datasets[1],
        //   line: { ...prev.datasets[1].line, fill: { above: gradient } },
        // },
      ],
    }));
  }, [gradient]);

  if (!displayedData.datasets) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <button
          onClick={() =>
            setDisplayedData((prev: any) => ({
              ...prev,
              datasets: [
                { ...prev.datasets[0], hidden: !prev.datasets[0].hidden },
                prev.datasets[1],
              ],
            }))
          }
          className="bg-black"
        >
          {!displayedData.datasets[0].hidden
            ? "Masquer Dataset 1"
            : "Afficher Dataset 1"}
        </button>
        {/* <button
          onClick={() =>
            setDisplayedData((prev: any) => ({
              ...prev,
              datasets: [
                prev.datasets[0],
                { ...prev.datasets[1], hidden: !prev.datasets[1].hidden },
              ],
            }))
          }
          className="bg-black"
        >
          {!displayedData.datasets[1].hidden
            ? "Masquer Dataset 2"
            : "Afficher Dataset 2"}
        </button> */}
      </div>
      <Line
        data={displayedData}
        ref={chartRef}
        options={{
          animation: false,
          spanGaps: true,
          showLine: true,
          responsive: true,
          maintainAspectRatio: true,
          backgroundColor: "rgb(105,142,238)",
          interaction: {
            mode: "index",
            intersect: false,
          },
          scales: {
            y: {
              beginAtZero: true,
              // min: 15,
              // max: 25,
              position: "right",
              // backgroundColor: "purple",
              grid: {
                // display: false,
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              beginAtZero: true,
              stacked: true,
              min: 175,
              max: displayedData.labels.length,
              // backgroundColor: "yellow",
              grid: {
                // display: false,
                color: "rgba(0, 0, 0, 0.05)",
              },
              ticks: {
                // display: false,
              },
            },
          },
          // datasets: {
          //   line: {
          //     tension: 0.8,
          //     fill: {
          //       target: "origin",
          //       above: gradient,
          //     },
          //     pointRadius: 3,
          //     backgroundColor: "#2CC1B2",
          //     borderColor: "#2CC1B2",
          //   },
          // },
          plugins: {
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
        // width={100}
        // height={50}
      />
    </div>
  );
}
