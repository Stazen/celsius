import classNames from "classnames";

interface HeroProps {
    children: React.ReactNode;
}

interface HeroElementProps {
    children: React.ReactNode;
    className?: string;
}

export const HeroTitle = ({ children, className }: HeroElementProps) => {
    return <h1 className={classNames("lg:text-5xl text-3xl my-8 dark:text-gradient text-black dark:text-white", className)}>{children}</h1>
};

export const HeroSubtitle = ({ children, className }: HeroElementProps) => {
    return <p className={classNames("text-lg mb-12 dark:text-primary-grey font-thin", className)}>{children}</p>
};


export const Hero = ({ children }: HeroProps) => {
    return (
        <div className="text-center">
            {children}
        </div>
    )
};