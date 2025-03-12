"use client";

import { FaArrowCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { PieChart } from 'react-minimal-pie-chart';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    Filler,
    BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const data = [
    {
        name: "16/03",
        incident: 2,
    },
    {
        name: "17/03",
        incident: 1,
    },
    {
        name: "18/03",
        incident: 3,
    },
    {
        name: "19/03",
        incident: 6,
    },
    {
        name: "20/03",
        incident: 1,
    },
    {
        name: "21/03",
        incident: 3,
    },
    {
        name: "Aujourd'hui",
        incident: 1,
    }
];

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Filler,
    BarElement
);

export const HeroInfo = () => {
    

    return (
        <div className="bg-white flex flex-col w-full border dark:border-white-a08 dark:bg-transparent border-black-a12 mb-14 rounded-lg overflow-hidden">
            <div className="w-full bg-white dark:bg-opacity-[0.08] border-b border-black-a12 dark:border-white-a08">
                <h3 className="p-[2rem] text-md">Récapitulatif de la semaine</h3>
            </div>
            <div className="flex flex-col w-full h-full">
                <div className="flex min-h-[100px] w-full border-b border-black-a12 dark:border-white-a08">
                    <div className="h-full lg:w-2/3 w-1/2 p-[2rem] flex">
                        <div className="flex flex-col lg:justify-end lg:w-1/3">
                            <div className="flex items-baseline mb-2">
                                <span className="lg:text-3xl text-md">2,4</span><FaArrowCircleUp className="text-green-500 ml-2 lg:text-md" /><p className="ml-1 text-xxs text-green-500">+ 0.6</p>
                            </div>
                            <p className="text-grey text-xxs lg:text-xs">Nombre d'incidents moyen par jour</p>
                        </div>
                        <div className="lg:w-2/3 lg:block hidden max-h-[100px]">
                            <div className="relative min-w-full max-h-[100px] hidden lg:block">
                            <Bar
                                data={{
                                    labels: data.map(d => d.name),
                                    datasets: [
                                        {
                                            label: 'Nombre d\'incidents',
                                            data: data.map(d => d.incident),
                                            backgroundColor: 'rgb(54, 103, 196)',
                                            borderColor: 'rgb(54, 103, 196)',
                                            borderWidth: 1,
                                            barPercentage: 0.5,
                                            categoryPercentage: 0.5,
                                            borderRadius: 2,
                                        },
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    indexAxis: 'x',
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            display: false,
                                        },
                                    }
                                }}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="h-full p-[2rem] lg:w-1/3 w-1/2 border-l border-black-a12 dark:border-white-a08">
                        <div className="flex flex-col items-start justify-end h-full">
                            <div className="flex items-baseline mb-2">
                                <span className="lg:text-3xl text-md">19.7°C</span><FaArrowCircleUp className="text-green-500 ml-2 lg:text-md" /><p className="ml-1 text-xxs text-green-500">+ 0.3°C</p>
                            </div>
                            <p className="text-grey text-xxs lg:text-xs">Température moyenne dans vos locaux</p>
                        </div>
                    </div>
                </div>
                <div className="flex min-h-[100px] w-full">
                    <div className="h-full w-1/3 p-[1rem] lg:p-[2rem]">
                        <div className="flex items-start justify-center flex-col">
                            <span className="lg:text-3xl text-md mb-2">0h-8h</span>
                            <p className="text-grey text-xxs lg:text-xs">Plage horaire avec le plus d'incidents détectés</p>
                        </div>
                    </div>
                    <div className="h-full w-1/3 p-[1rem] lg:p-[2rem]  border-l border-black-a12 dark:border-white-a08">
                        <div className="flex items-start justify-center flex-col">
                            <span className="lg:text-3xl text-md mb-2">Bureau</span>
                            <p className="text-grey text-xxs lg:text-xs">Pièce dans laquelle le plus d'incidents ont été détectés</p>
                        </div>
                    </div>
                    <div className="h-full w-1/3 p-[1rem] lg:p-[2rem] border-l border-black-a12 dark:border-white-a08 flex">
                        
                        <PieChart
                            data={[
                                { title: '', value: 43, color: 'rgb(34 197 94)' },
                                { title: '', value: 57, color: '#858699' },
                            ]}
                            lineWidth={18}
                            paddingAngle={6}
                            startAngle={45}
                            className="w-[80px] h-[80px] mr-4 hidden lg:block"
                        />
                        <div className="flex items-start lg:justify-between flex-col h-full">
                            <div className="flex items-baseline mb-2 w-full">
                                <span className="lg:text-3xl text-md">43%</span><FaArrowAltCircleDown className="text-red-500 ml-2 lg:text-md" /><p className="ml-1 text-xxs text-red-500">- 7%</p>
                            </div>
                            <p className="text-grey text-xxs lg:text-xs">Taux de présence dans vos locaux</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}