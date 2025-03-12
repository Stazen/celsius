import { useState } from "react";
import ThemeSwitch from "../Theme/theme-switch";
import Link from "next/link";
import { Container } from "./container";
import { Button } from "./button";
import { Logo } from "@/public/images/landingPage/logo";
import { LogoDark } from "@/public/images/landingPage/logoDark";
import { useTheme } from "next-themes";

export const Header = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-screen z-20 border-b border-black-a12 dark:border-white-a08 bg-white dark:bg-darkBackground dark:lg:bg-transparent lg:bg-transparent lg:backdrop-blur-[12px]">
            <Container className="flex h-[var(--nav-height)] items-center justify-between">
                <Link href="/" className="flex items-center text-md">
                    {resolvedTheme === "dark" ? <LogoDark /> : <Logo />}
                </Link>
                <nav className="hidden lg:flex h-full">
                    <ul className="flex items-center h-full [&_a]:text-sm [&_a]:transition-colors [&_a:hover]:text-grey [&_li]:ml-6">
                        <li><Link href="#Preview" scroll={true}>Preview</Link></li>
                        <li><Link href="#Clients" scroll={true}>Clients</Link></li>
                        <li><Link href="#Features" scroll={true}>Features</Link></li>
                        <li><Link href="#Tarifs" scroll={true}>Tarifs</Link></li>
                        <li><Link href="#Questions" scroll={true}>Questions</Link></li>
                    </ul>
                </nav>
                <div className="hidden lg:flex ml-auto h-full items-center">
                    <Link href="/signin" className="text-sm mr-6">Connexion</Link>
                    <Button href="/signin" variant="primary" size="medium">Inscription</Button>
                    <ThemeSwitch />
                </div>
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className={`text-black dark:text-white focus:outline-none transition-transform duration-300 text-md ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
                    >
                        {isMenuOpen ? "✖" : "☰"}
                    </button>
                </div>
            </Container>
            <div
                className={`lg:hidden transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "translate-y-0" : "-translate-y-full"} absolute top-[var(--nav-height)] left-0 w-full bg-white dark:bg-darkBackground  z-10`}
            >
                {isMenuOpen && (
                    <nav className="border-t border-black-a12 dark:border-white-a08">
                        <ul className="flex flex-col items-center justify-center [&_a]:text-sm [&_a]:transition-colors [&_a:hover]:text-grey py-4 min-h-screen">
                            <li className="py-2"><Link href="#Preview" scroll={true} onClick={toggleMenu}>Preview</Link></li>
                            <li className="py-2"><Link href="#Clients" scroll={true} onClick={toggleMenu}>Clients</Link></li>
                            <li className="py-2"><Link href="#Features" scroll={true} onClick={toggleMenu}>Features</Link></li>
                            <li className="py-2"><Link href="#Tarifs" scroll={true} onClick={toggleMenu}>Tarifs</Link></li>
                            <li className="py-2"><Link href="#Questions" scroll={true} onClick={toggleMenu}>Questions</Link></li>
                            <li className="py-2"><Link href="/signin" className="text-sm" onClick={toggleMenu}>Connexion</Link></li>
                            <li className="py-2"><Button href="/signin" variant="primary" size="medium">Inscription</Button></li>
                            <li className="py-2"><ThemeSwitch  className="mr-5"/></li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};
