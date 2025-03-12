import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { createBuilding } from '@/app/home/settings/action';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Collapse } from 'react-collapse';

export default function CreateBuildingForm({ reloadBuildingsList }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const result = await createBuilding(name, address, city, postalCode, country);
            if (result.success) {
                reloadBuildingsList();
                setIsExpanded(false);
                toast.success("Le building a été créé avec succès.");
                setName('');
                setAddress('');
                setCity('');
                setPostalCode('');
                setCountry('');
            } else {
                toast.error("La création du building a échoué : " + result.message);
            }
        } catch (error) {
            toast.error("La création du building a échoué, veuillez réessayer.");
        }
    }

    return (
        <div className="rounded-md bg-white dark:bg-opacity-[0.08] border border-black-a12 dark:border-white-a08 mb-14 overflow-hidden" >
            <div className={classNames('flex items-center justify-between p-[2rem] transition-all cursor-pointer', isExpanded && "border-b border-black-a12 dark:border-white-a08")} onClick={() => setIsExpanded((curr) => !curr)}>
                <h3 className="text-md ">Ajouter un building</h3>
                {isExpanded ? <XMarkIcon className={classNames("w-5 h-5 transition-all",
                    isExpanded ? "" : "transform rotate-180 w-0")} /> : <ChevronDoubleDownIcon className={classNames("w-5 h-5 transition-all",
                        isExpanded ? "transform rotate-180 w-0" : ""
                    )} />}
            </div>
            <Collapse isOpened={isExpanded}>
                <form className={classNames("bg-white dark:bg-darkBackground transition-all h-auto p-[2rem]",
                )} onSubmit={onSubmit}>
                    <input
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4", )}
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4", )} type="text"
                        placeholder="Adresse"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <input
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4", )} type="number"
                        placeholder="Code postal"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                    <input
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4", )} type="text"
                        placeholder="Ville"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <input
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4", )} type="text"
                        placeholder="Pays"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    <div className={classNames('flex items-center justify-center dark:bg-darkBackground',
                        isExpanded ? "" : "hidden"
                    )}>
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
