"use client";

import { HeaderApp } from "@/components/Globals/headerApp";
import Sidebar, { SidebarItem } from "@/components/Globals/sidebarApp";
import { Cog8ToothIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { getCompany, getUser } from "./action";

// const companyName = "Aerow SAS";
// const user = {
//   name: "Timothée",
//   surname: "Doudon",
//   email: "doudon_t@etna-alternance.net",
// };

// DEFAULT LAYOUT SHARED ACROSS ALL DASHBOARD PAGES
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [expanded, setExpanded] = useState(true);
  const [isloading, setIsLoading] = useState(true);

  const getInfo = async () => {
    const user = await getUser();
    const company = await getCompany();

    // if (!user || !company) {
    //   router.push("/signin");
    // }

    setUser(user.data?.user);
    setCompany(company.data?.company[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    getInfo();
  }, [isloading]);

  return (
    <div className="min-w-screen min-h-screen">
      {isloading ? (
        <div></div>
      ) : (
        <>
          <HeaderApp company={company.name} />
          <div className="min-w-full min-h-full flex flex-row transition-all">
            <Sidebar
              user={user}
              setter={(expanded: boolean) => {
                setExpanded(expanded);
              }}
            >
              <SidebarItem
                text="Home"
                icon={<IoHomeOutline className="w-6 h-5" />}
                link="/home"
                alert={undefined}
              />
              {/* <SidebarItem text="Dashboard" icon={<ChartBarIcon className="w-6 h-5" />} link="/home/dashboard" alert={undefined} /> */}
              <SidebarItem
                text="Paramètres"
                icon={<Cog8ToothIcon className="w-6 h-5" />}
                link="/home/settings"
                alert={undefined}
              />
              <SidebarItem
                text="Données"
                icon={<SquaresPlusIcon className="w-6 h-5" />}
                link="/home/data-details"
                alert={undefined}
              />
            </Sidebar>
            <div
              className={classNames(
                "dark:bg-darkBackground min-h-[calc(100vh-69.59px)] w-full mt-[69.59px] transition-all bg-slate-100",
                expanded ? "pl-[16.5%]" : "ml-[7rem]",
              )}
            >
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
