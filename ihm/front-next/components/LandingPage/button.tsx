import Link from "next/link";
import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";

interface ButtonProps extends VariantProps<typeof ButtonClasses>, React.AnchorHTMLAttributes<HTMLAnchorElement>{
    children: React.ReactNode;
    href: string;
}

const ButtonClasses = cva("rounded-full inline-flex items-center", {
    variants: {
        variant: {
            primary: "bg-primary-gradient hover:text-shadow hover:shadow-primary transition-[shadow, text-shadow] transition-colors ease-in text-white",
            secondary: "text-white dark:bg-white bg-black bg-opacity-20 dark:bg-opacity-10 border border-white-a08 backdrop-filter-[12px] dark:hover:bg-opacity-20 hover:bg-opacity-30 dark:transition-colors transition-colors dark:ease-in ease-in",
        },
        size: {
            small: "text-xs px-3 h-7",
            medium: "text-sm px-4 h-8",
            large: "text-md px-6 h-12",
        },
        defaultVariant: {
            variant: "primary",
            size: "medium",
        }
    },
});


export const Button = ({ children, href, variant, size, ...props}: ButtonProps) => {
    const classes = ButtonClasses({ variant, size, className: props.className });

    return <Link {...props} href={href} className={classes}>{children}</Link>;
};