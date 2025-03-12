import { createFloor } from "@/app/home/settings/action";
import { ChevronDoubleDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { FormEvent, useState } from "react";
import { Collapse } from "react-collapse";
import { toast } from "sonner";

export default function CreateFloorForm({ buildingList, reloadBuildingsList }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [number, setNumber] = useState(0);
  const [buildingId, setBuildingId] = useState("default");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // setIsExpanded(false);
    try {
      const result = await createFloor(number, buildingId);
      if (result.success) {
        reloadBuildingsList();
        toast.success("L'étage à bien été créé.");
        setNumber(0);
        // setBuildingId("default");
      } else {
        toast.error("La création de l'étage a échoué : " + result.message);
      }
      setBuildingId("default");
    } catch (error) {
      toast.error("La création de l'étage a échoué, veuillez réessayer.");
    }
  }

  return (
    <div className="rounded-md bg-white dark:bg-opacity-[0.08] border border-black-a12 dark:border-white-a08 mb-14 overflow-hidden">
      <div
        className={classNames(
          "flex items-center justify-between p-[2rem] transition-all cursor-pointer",
          isExpanded && "border-b border-black-a12 dark:border-white-a08",
        )}
        onClick={() => setIsExpanded((curr) => !curr)}
      >
        <h3 className="text-md">Ajouter un étage</h3>
        {isExpanded ? (
          <XMarkIcon
            className={classNames(
              "w-5 h-5 transition-all",
              isExpanded ? "" : "transform rotate-180 w-0",
            )}
          />
        ) : (
          <ChevronDoubleDownIcon
            className={classNames(
              "w-5 h-5 transition-all",
              isExpanded ? "transform rotate-180 w-0" : "",
            )}
          />
        )}
      </div>
      <Collapse isOpened={isExpanded}>
        <form
          className={classNames(
            "bg-white dark:bg-darkBackground transition-all h-auto p-[2rem]",
          )}
          onSubmit={onSubmit}
        >
          <select
            className={classNames(
              "border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4",
            )}
            onChange={(e) => setBuildingId(e.target.value)}
            required
            defaultValue={"default"}
            value={buildingId}
          >
            <option
              value={"default"}
              className="dark:bg-darkBackground text-grey"
              disabled
            >
              -- Choix du building --
            </option>
            {buildingList.map((building) => {
              return (
                <option
                  key={building.id}
                  className="dark:bg-darkBackground"
                  value={building.id}
                >
                  {building.name}
                </option>
              );
            })}
          </select>
          <input
            className={classNames(
              "border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4",
            )}
            type="number"
            placeholder="Numéro de l'étage"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            required
          />
          <div
            className={classNames(
              "flex items-center justify-center dark:bg-darkBackground",
            )}
          >
            <button
              className="rounded-full inline-flex items-center text-xs px-3 h-7 text-white dark:bg-white bg-black bg-opacity-20 dark:bg-opacity-10 border border-white-a08 backdrop-filter-[12px] dark:hover:bg-opacity-20 hover:bg-opacity-30 dark:transition-colors transition-colors dark:ease-in ease-in"
              type="submit"
            >
              Ajouter
            </button>
          </div>
        </form>
      </Collapse>
    </div>
  );
}
