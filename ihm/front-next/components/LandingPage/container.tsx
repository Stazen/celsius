import classNames from "classnames";

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={classNames("w-[80%] mx-auto", className)}>{children}</div>
    );
};