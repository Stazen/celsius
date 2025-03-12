export const Notification = ({ notifications }: { notifications: any }) => {
    return (
        <div className="w-full flex flex-col border-b border-black-a12 dark:border-white-a08 px-5 py-5">
            <div className="mb-5">
                <span className="p-1 bg-blue-celsius/30 rounded-md text-xxs text-blue-celsius mr-1">{notifications.date}</span>
                {notifications.send ? <span className="p-1 bg-green-500/30 w-fit text-green-500 rounded-md text-xxs" >Envoyé</span> : <span className="text-xxs p-1 bg-red-500/30 w-fit text-red-500 rounded-md">Non envoyé</span>}
            </div>
            <div>
                <p className="text-xxs">{notifications.message}</p>
            </div> 

        </div>
    )
};