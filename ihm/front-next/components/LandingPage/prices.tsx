"use client";

import classNames from "classnames";
import React from "react";
import { GrStatusGood } from "react-icons/gr";
import { useInView } from "react-intersection-observer";

const data = [
  {
    title: "Cloud",
    priceMonthly: "30€",
    priceYearly: "300€",
    description:
      "Notre offre cloud vous permet de surveiller vos locaux depuis n'importe où dans le monde. Vous bénéficiez de toutes les fonctionnalitées de Celsius sans avoir à vous soucier de l'installation.",
    features: [
      "Surveillance de 2 salles",
      "Alertes par mail",
      "Dashboard",
      "Données en temps réel",
      "Génération de rapport",
    ],
  },
  {
    title: "On premise",
    priceMonthly: "60€",
    priceYearly: "600€",
    description:
      "Notre offre on primise bénéficie de toutes les fonctionnalitées de notre offre cloud mais avec une installation sur site et la création d'un serveur dédié seulement pour vos données.",
    features: [
      "Surveillance de 5 salles",
      "Alertes par mail et SMS",
      "Dashboard",
      "Données en temps réel",
      "Génération de rapport",
      "Installation sur site",
    ],
  },
];

export const Prices = () => {
  const { ref, inView } = useInView({ threshold: 0.8, triggerOnce: true });
  const [isSelected, setIsSelected] = React.useState(true);
  const onChangeCheckBox = (e) => {
    setIsSelected(!isSelected);
  };
  return (
    <div className="py-[3rem]">
      <div className="flex mb-[2rem] justify-center mx-auto">
        <label
          htmlFor="check"
          className="flex border dark:border-white-a08 border-black-a12 cursor-pointer relative w-[13rem] h-[5rem] rounded-full bg-white bg-opacity-[0.02]"
        >
          <input
            type="checkbox"
            id="check"
            onChange={onChangeCheckBox}
            className="sr-only peer"
          />
          <span className="w-3/5 h-4/5 bg-primary-gradient absolute rounded-full left-1 top-[5px] peer-checked:left-12 transition-all duration-500 text-xs flex justify-center items-center text-white">
            {isSelected ? "Mensuel" : "Annuel"}
          </span>
        </label>
      </div>
      <div
        data-testid="Tarifs-Details"
        className="flex [&_div]:w-[42rem] flex-wrap gap-x-4 gap-y-8 justify-center"
      >
        {data.map((item, index) => {
          return (
            <div
              key={item.title}
              ref={ref}
              className={classNames(
                "border dark:border-white-a08 border-black-a12 p-[2.2rem] rounded-lg opacity-0 bg-white bg-opacity-[0.02]",
                inView &&
                  "animate-fade-in [--animation-delay:0ms] opacity-0 translate-y-[-1rem]",
              )}
            >
              <div className="flex flex-col">
                <h2 className="text-center dark:text-white text-lg mb-[1.8rem] w-[38rem] ">
                  {item.title}
                </h2>
                {isSelected ? (
                  <h2 className=" dark:text-white mb-[1.8rem] text-3xl">
                    {item.priceMonthly}/<span className="text-lg">mois</span>
                  </h2>
                ) : (
                  <h2 className="dark:text-white text-3xl mb-[1.8rem]">
                    {item.priceYearly}/<span className="text-lg">année</span>
                  </h2>
                )}
              </div>
              <p className="text-center dark:text-primary-grey text-sm text-justify border-b border-b-black-a12 dark:border-b-white-a08 pb-[2rem]">
                {item.description}
              </p>
              <ul className="flex justify-center flex-col py-[2rem]">
                {item.features.map((feature, index) => {
                  return (
                    <li
                      key={feature}
                      className="text-center dark:text-primary-grey text-sm text-justify flex items-center py-[0.5rem]"
                    >
                      <GrStatusGood className="mr-2" />
                      {feature}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
