"use client";

import classNames from "classnames";
import { BsClipboardData } from "react-icons/bs";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { TbReport } from "react-icons/tb";
import { useInView } from "react-intersection-observer";


export const Features = () => {
    const { ref, inView } = useInView({ threshold: 0.8, triggerOnce: true });
    return (
        <div className="md:py-[3rem]">
            <div className="flex lg:[&_div]:w-[38rem] flex-wrap gap-x-2 gap-y-8 justify-around">
                <div ref={ref} className={classNames("border dark:border-white-a08 border-black-a12 p-[2.2rem] rounded-lg opacity-0 bg-white bg-opacity-[0.02]",
                    inView && "animate-fade-in [--animation-delay:0ms] opacity-0 translate-y-[-1rem]"
                )}>
                    <div className="flex">
                        <BsClipboardData fontSize="2em" className="mr-3 dark:text-white text-black" />
                        <h2 className="text-center dark:text-white text-sm md:text-md mb-[1.8rem]">Informations en temps réel</h2>
                    </div>

                    <p className="text-center dark:text-primary-grey text-xs md:text-sm text-justify">Surveillez votre consomation de chauffage en temps réel grâce au dasboard. Vous avez la possibilité de séléctionner jusqu'à 5 salles en même temps. Pour des informations détaillées, la page "données" est faite pour vous.</p>
                </div>
                <div ref={ref} className={classNames("border dark:border-white-a08 border-black-a12 p-[2.2rem] rounded-lg opacity-0 bg-white bg-opacity-[0.02]",
                    inView && "animate-fade-in [--animation-delay:200ms] opacity-0 translate-y-[-1rem]"
                )}>
                    <div className="flex">
                        <PiBellSimpleRingingBold fontSize="2em" className="mr-3 dark:text-white text-black" />
                        <h2 className="text-center dark:text-white text-sm md:text-md mb-[1.8rem]">Alertes instantanées</h2>
                    </div>
                    <p className="text-center dark:text-primary-grey text-xs md:text-sm text-justify">Surveillez votre consomation de chauffage en temps réel et soyez alerté dès qu'un soucis est détecté</p>
                </div>
                <div ref={ref} className={classNames("border dark:border-white-a08 border-black-a12 p-[2.2rem] rounded-lg opacity-0 bg-white bg-opacity-[0.02]",
                    inView && "animate-fade-in [--animation-delay:400ms] opacity-0 translate-y-[-1rem]"
                )}>
                    <div className="flex">
                        <TbReport fontSize="2em" className="mr-3 dark:text-white text-black" />
                        <h2 className="text-center dark:text-white text-sm md:text-md mb-[1.8rem]">Génération de rapport</h2>
                    </div>
                    <p className="text-center dark:text-primary-grey text-xs md:text-sm text-justify">Surveillez votre consomation de chauffage en temps réel et soyez alerté dès qu'un soucis est détecté</p>
                </div>
                {/* <div ref={ref} className={classNames("border dark:border-white-a08 border-black-a12 p-[2.2rem] rounded-lg opacity-0 bg-white bg-opacity-[0.02]",
                    inView && "animate-fade-in [--animation-delay:600ms] opacity-0 translate-y-[-1rem]"
                )}>
                    <div className="flex">
                        <TbReport fontSize="2em" className="mr-3 dark:text-white text-black" />
                        <h2 className="text-center dark:text-white text-md mb-[1.8rem]">Génération de rapport</h2>
                    </div>
                    <p className="text-center dark:text-primary-grey text-sm text-justify">Surveillez votre consomation de chauffage en temps réel et soyez alerté dès qu'un soucis est détecté</p>
                </div>
                <div ref={ref} className={classNames("border dark:border-white-a08 border-black-a12 p-[2.2rem] rounded-lg opacity-0 bg-white bg-opacity-[0.02]",
                    inView && "animate-fade-in [--animation-delay:800ms] opacity-0 translate-y-[-1rem]"
                )}>
                    <div className="flex">
                        <TbReport fontSize="2em" className="mr-3 dark:text-white text-black" />
                        <h2 className="text-center dark:text-white text-md mb-[1.8rem]">Génération de rapport</h2>
                    </div>
                    <p className="text-center dark:text-primary-grey text-sm text-justify">Surveillez votre consomation de chauffage en temps réel et soyez alerté dès qu'un soucis est détecté</p>
                </div>
                <div ref={ref} className={classNames("border dark:border-white-a08 border-black-a12 p-[2.2rem] rounded-lg opacity-0 bg-white bg-opacity-[0.02]",
                    inView && "animate-fade-in [--animation-delay:1000ms] opacity-0 translate-y-[-1rem]"
                )}>
                    <div className="flex">
                        <TbReport fontSize="2em" className="mr-3 dark:text-white text-black" />
                        <h2 className="text-center dark:text-white text-md mb-[1.8rem]">Génération de rapport</h2>
                    </div>
                    <p className="text-center dark:text-primary-grey text-sm text-justify">Surveillez votre consomation de chauffage en temps réel et soyez alerté dès qu'un soucis est détecté</p>
                </div> */}

            </div>
        </div>
    )
};