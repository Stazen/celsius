import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { createUser } from '@/app/home/settings/action';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Collapse } from 'react-collapse';

export default function CreateUserForm({ reloadUsersList }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [isExpanded, setIsExpanded] = useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const result = await createUser(username, email, password, role);
            if (result.success) {
                reloadUsersList();
                toast.success("L'utilisateur a été créé avec succès.");
                setUsername('');
                setEmail('');
                setPassword('');
                setRole('user');
            } else {
                toast.error("La création de l'utilisateur a échoué : " + result.message);
            }
        } catch (error) {
            toast.error("La création de l'utilisateur a échoué, veuillez réessayer.");
        }
    }

    return (
        <div className="rounded-md bg-white dark:bg-opacity-[0.08] border border-black-a12 dark:border-white-a08 mb-14 overflow-hidden">
            <div className={classNames('flex items-center justify-between p-[2rem] transition-all cursor-pointer', isExpanded && "border-b border-black-a12 dark:border-white-a08")} onClick={() => setIsExpanded((curr) => !curr)}>
                <h3 className="text-md">Ajouter un utilisateur</h3>
                {isExpanded ? <XMarkIcon className={classNames("w-5 h-5 transition-all", isExpanded ? "" : "transform rotate-180 w-0")} /> : <ChevronDoubleDownIcon className={classNames("w-5 h-5 transition-all", isExpanded ? "transform rotate-180 w-0" : "")} />}
            </div>
            <Collapse isOpened={isExpanded}>
                <form className={classNames("bg-white dark:bg-darkBackground transition-all h-auto p-[2rem]")} onSubmit={onSubmit}>
                    <input
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4")} type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4")} type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4")} type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select
                    id="role-select"
                        className={classNames("border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4")} value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option className="dark:bg-darkBackground" value="admin">Admin</option>
                        <option className="dark:bg-darkBackground" value="user">User</option>
                    </select>
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
