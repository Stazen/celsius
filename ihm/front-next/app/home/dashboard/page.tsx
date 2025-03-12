import Dashboard from "@/components/Dashboard/Dashboard";
import { getData, getBuilding } from "./action";

// LAISSER LES PAGES EN SERVER COMPONENT, DONC EVITER  D'ANNOTER CES FICHIERS AVEC "use client"
export default async function DashboardPage() {
  const dataBuilding = await getBuilding();
  // const dataResponse = await getData(dataBuilding.data.building[0].floor[0].rooms[0].captors[0]);
  const dataResponse = await getData("3");

  return (
    <>
      <div className="flex flex-col w-full p-14">
        <div className="flex w-full">
          <Dashboard dataResponse={dataResponse} dataBuilding={dataBuilding} />
        </div>
      </div>
    </>
  );
}
