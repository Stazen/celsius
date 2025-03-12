"use client";

const buildingData = [
  { label: "Building 1", value: "1" },
  { label: "Building 2", value: "2" },
];

import CreateBuildingForm from "@/components/Forms/CreateBuildingForm";
import CreateFloorForm from "@/components/Forms/CreateFloorForm";
import CreateRoomForm from "@/components/Forms/CreateRoomForm";
import CreateUserForm from "@/components/Forms/CreateUserForm";
import EditablelistBuilding from "@/components/Lists/EditableListBuilding";
import EditableListUser from "@/components/Lists/EditableListUser";
import { useEffect, useState } from "react";
import { getCompany } from "../action";
import { getBuilding, getUser } from "./action";

export default function Settings() {
  const [buildings, setBuildingsList] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [role, setRole] = useState<string>();

  const getInfo = async () => {
    const buildings = await getBuilding();
    const users = await getUser();
    const companies = await getCompany();
    const role = companies.data.company[0].role;
    setBuildingsList(buildings.data.building);
    setUsers(users.data.companyUser[0].user);
    setCompanies(companies.data.company);
    // FAIRE DE L'AFFICHAGE CONDITIONNEL EN FONCTION DU ROLE ???
    setRole(role);
  };

  const reloadUsersList = async () => {
    const users = await getUser();
    setUsers(users.data.companyUser[0].user);
  };

  const reloadBuildingsList = async () => {
    const buildings = await getBuilding();
    setBuildingsList(buildings.data.building);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="flex flex-row w-full min-h-full p-14">
      <div className="flex flex-col w-9/12">
        <div className="">
          <EditablelistBuilding buildingList={buildings} />
          <EditableListUser usersList={users} />
        </div>
      </div>
      <div className="flex flex-col bg-gray-bg w-2/6 pl-14">
        <CreateBuildingForm reloadBuildingsList={reloadBuildingsList} />
        <CreateFloorForm
          buildingList={buildings}
          reloadBuildingsList={reloadBuildingsList}
        />
        <CreateRoomForm
          buildingList={buildings}
          reloadBuildingsList={reloadBuildingsList}
        />
        <CreateUserForm reloadUsersList={reloadUsersList} />
      </div>
    </div>
  );
}
