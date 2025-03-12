import { FormEvent, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { createRoom } from '@/app/home/settings/action';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Collapse } from 'react-collapse';

export default function CreateRoomForm({ buildingList, reloadBuildingsList }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [buildingId, setBuildingId] = useState("");
    const [floorId, setFloorId] = useState("");
    const [roomName, setRoomName] = useState("");
    const [captorId, setCaptorId] = useState("");
    const [selectedBuildingId, setSelectedBuildingId] = useState("");
    const [floors, setFloors] = useState<{ id: number, number: string }[]>([]);


    useEffect(() => {
        // Rechercher le bâtiment sélectionné dans la liste
        const selectedBuilding = buildingList.find(building => building.id === selectedBuildingId);
        if (selectedBuilding) {
            // Mettre à jour la liste des étages avec les étages du bâtiment sélectionné
            setFloors(selectedBuilding.floor);
        } else {
            // Réinitialiser la liste des étages si aucun bâtiment n'est sélectionné
            setFloors([]);
        }
    }, [selectedBuildingId, buildingList]);

    function handleBuildingChange(event) {
        setSelectedBuildingId(event.target.value);
        setBuildingId(event.target.value);
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(buildingList);
        setIsExpanded(false);

        try {
            const result = await createRoom(roomName, floorId, buildingId);
            if (result.success) {
                toast.success("La pièce à bien été créé.");
                setBuildingId('');
                setFloorId('');
                setRoomName('');
                reloadBuildingsList();
            } else {
                toast.error("La création de la pièce a échoué : " + result.message);
            }
        } catch (error) {
            toast.error("La création de la pièce a échoué, veuillez réessayer.");
        }
    }

    return (
        <div className="rounded-md bg-white dark:bg-opacity-[0.08] border border-black-a12 dark:border-white-a08 mb-14 overflow-hidden">
            <div className={classNames('flex items-center justify-between p-[2rem] transition-all cursor-pointer', isExpanded && "border-b border-black-a12 dark:border-white-a08")} onClick={() => setIsExpanded((curr) => !curr)}>
                <h3 className="text-md">Ajouter une pièce</h3>
                {isExpanded ? <XMarkIcon className={classNames("w-5 h-5 transition-all", isExpanded ? "" : "transform rotate-180 w-0")} /> : <ChevronDoubleDownIcon className={classNames("w-5 h-5 transition-all", isExpanded ? "transform rotate-180 w-0" : "")} />}
            </div>
            <Collapse isOpened={isExpanded}>
                <form className={classNames("bg-white dark:bg-darkBackground transition-all h-auto p-[2rem]")} onSubmit={onSubmit}>
                    <select
                        id="building-select"
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4")}
                        onChange={handleBuildingChange}
                        required
                        defaultValue={"default"}
                    >

                        <option value={"default"} className="dark:bg-darkBackground text-grey" disabled>-- Choix du building --</option>
                        {buildingList.map((building) => {
                            return (
                                <option className="dark:bg-darkBackground" value={building.id}>{building.name}</option>
                            )
                        }
                        )}
                    </select>
                    <select
                        id="floor-select"
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4")}
                        onChange={(e) => setFloorId(e.target.value)}
                        required
                        defaultValue={"default"}
                    >

                        <option id="floor-option" value={"default"} className="dark:bg-darkBackground text-grey" disabled>-- Choix de l'étage --</option>
                        {floors.map((floor) => {
                            return <option key={floor.number} className="dark:bg-darkBackground " value={floor.id}>{floor.number}</option>
                        })}
                    </select>
                    <input
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4")} type="text"
                        placeholder="Nom de la pièce"

                        onChange={(e) => setRoomName(e.target.value)}
                        required
                    />
                    <div className={classNames('flex items-center justify-center dark:bg-darkBackground')}>
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