import ThemeSwitch from "@/components/Theme/theme-switch";

export const HeaderApp = ({ company }: { company: string }) => {
    return (

        <div className="flex w-full bg-white dark:bg-darkBackground fixed">
            <div className="min-w-full min-h-full bg-white bg-opacity-[0.08] justify-between items-center px-[2rem] flex py-[2rem] border-b border-b-black-a12 dark:border-b-white-a08">
                <h3 className="text-lg">{company}</h3>
                <ThemeSwitch className="mr-1" />
            </div>
        </div>
    )
}