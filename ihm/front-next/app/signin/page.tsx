"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Container } from "@/components/LandingPage/container";
import ThemeSwitch from "@/components/Theme/theme-switch";
import { Logo } from "@/public/images/landingPage/logo";
import { LogoDark } from "@/public/images/landingPage/logoDark";
import { useTheme } from "next-themes";


type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const signinPage = (props: Props) => {
  const { setTheme, resolvedTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const email = useRef("");
  const pass = useRef("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (session) {
    router.push("/home");
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: false,
    });
    if (!res?.error) {
      router.push(props.searchParams?.callbackUrl ?? "/home");
    } else {
      if (res.error === "Please verify your email to login") {
        toast.error("Veuillez verifier votre email pour vous connecter");
      } else {
        toast.error("Email ou mot de passe incorrect");
      }
    }
  };

  return (
    <div className="w-screen h-screen dark:bg-darkBackground">
      <div className="relative">
        <Link href="/" className="absolute top-4 left-4">
          {resolvedTheme === "dark" ? <LogoDark /> : <Logo />}
        </Link>
        <ThemeSwitch className="absolute top-4 right-4 cursor-pointer" />
      </div>
      <main className="pt-[var(--nav-height)] bg-page-gradient md:pb-[25.6rem] h-full justify-center items-center">
        
        <div className="h-full flex flex-col justify-center items-center max-w-screen">
        <h2 className="pb-[8rem] md:text-5xl text-center font-bold mb-4 text-3xl">Connexion</h2>
          <form
            // action="/api/auth/callback/credentials"
            onSubmit={onSubmit}
            className="flex flex-col gap-6 min-w-[22rem] md:min-w-[30rem]"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Email"
                className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey"
                onChange={(e) => (email.current = e.target.value)}
              />
            </div>
            <div className="relative">
              {/* <Image
                src={passwordSvg}
                width={20}
                alt="Mot de passe"
                className="absolute top-1/2 transform -translate-y-1/2 left-3"
              /> */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey"
                onChange={(e) => (pass.current = e.target.value)}
              />
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {!showPassword ? (
                  <EyeIcon
                    className="h-4 w-4 text-grey"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeSlashIcon
                    className="h-4 w-4 text-grey"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            <Link href="/forgor-password" className="text-black dark:text-white text-center text-xs">
              Mot de passe oublié ?
            </Link>
            <div className="flex w-full justify-center items-center mt-4">
              <button
                type="submit"
                className="bg-primary-gradient hover:text-shadow text-white hover:shadow-primary transition-[shadow, text-shadow] text-sm transition-colors ease-in px-4 h-8 rounded-full"
              >
                SE CONNECTER
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default signinPage;
