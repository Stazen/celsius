import Link from "next/link";
import { Container } from "./container";
import { TwitterIcon } from "@/public/images/landingPage/twitter";
import { GithubIcon } from "@/public/images/landingPage/github";
import { YoutubeIcon } from "@/public/images/landingPage/youtube";
import { Logo } from "@/public/images/landingPage/logo";
import { LogoDark } from "@/public/images/landingPage/logoDark";
import { useTheme } from "next-themes";

const footerLinks = [
    {
        title: "A propos",
        links: [
            { title: "Qui sommes-nous", url: "/" },
            { title: "Notre solution", url: "/" },
            { title: "Nos clients", url: "/" },
            { title: "Nos partenaires", url: "/" },
        ]
    },
    {
        title: "Ressources",
        links: [
            { title: "Blog", url: "/" },
            { title: "Documentation", url: "/" },
            { title: "FAQ", url: "/" },
            { title: "Contact", url: "/" },
        ]
    },
    {
        title: "Legal",
        links: [
            { title: "CGU", url: "/" },
            { title: "Politique de confidentialité", url: "/" },
            { title: "Mentions légales", url: "/" },
        ]
    },
]

export const Footer = () => {
    const { setTheme, resolvedTheme } = useTheme();
    return (
        <footer className="border-t dark:border-white-a08 border-black-a12 mt-12 py-[5.6rem] text-sm">
            <Container className="flex justify-center">
                <div>
                    <div className="flex h-full flex-col">
                        <div className="text-grey flex items-center justify-center">
                            {resolvedTheme === "dark" ? <LogoDark className="mr-3" /> : <Logo className="mr-3" />}Celsius® 2024
                        </div>
                        {/* <div className="mt-auto flex space-x-4">
                            <TwitterIcon />
                            <GithubIcon />
                            <YoutubeIcon />
                        </div> */}
                    </div>
                </div>
                {/* <div className="flex">
                    {footerLinks.map((column) => (
                        <div className="min-w-[18rem]">
                            <h3 className="font-medium mb-3">{column.title}</h3>
                            <ul>
                                {column.links.map((link) => (
                                    <li className="[&_a]:last:mb-0"><Link href={link.url} className="text-grey mb-3 block hover:text-black dark:hover:text-white transition-colors">{link.title}</Link></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div> */}
            </Container>
        </footer>
    )
};