import { deleteBuilding, editBuilding } from "@/app/home/settings/action";
import { ChevronDoubleDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "sonner";
import EditablelistFloor from "./EditableListFloor";

export default function EditablelistBuilding({ buildingList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedBuildingList, setUpdatedBuildingList] = useState(buildingList);
  const [expanded, setExpanded] = useState(false);
  //   const [expandedFloor, setExpandedFloor] = useState(false);
  const [expandedBuildingId, setExpandedBuildingId] = useState(null);
  const [editedBuildingData, setEditedBuildingData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [editedBuilding, setEditedBuilding] = useState(null);

  useEffect(() => {
    setUpdatedBuildingList(buildingList);
  }, [buildingList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBuildingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (id) => {
    setIsModalOpen(false);
    try {
      const result = await editBuilding(id, editedBuildingData);
      if (result.success) {
        setUpdatedBuildingList((prevList) =>
          prevList.map((building) =>
            building.id === id
              ? { ...building, ...editedBuildingData }
              : building,
          ),
        );
        toast.success("Le bâtiment a été modifié avec succès.");
      } else {
        toast.error("La mise à jour du bâtiment a échoué : " + result.message);
      }
    } catch {
      toast.error("La mise à jour du bâtiment a échoué, veuillez réessayer.");
    } finally {
      setEditedBuilding(null);
    }
  };

  const openModalWithBuildingData = (building) => {
    setIsModalOpen(true);
    setEditedBuilding(building.id);
    setEditedBuildingData({
      name: building.name,
      address: building.address,
      city: building.city,
      postalCode: building.postalCode,
      country: building.country,
    });
  };
  const handleExpandBuilding = (id) => {
    setExpanded((curr) => !curr);
    if (expandedBuildingId === id) {
      setExpandedBuildingId(null);
      return;
    }
    setExpandedBuildingId(id);
  };

  const handleDeleteBuilding = async (id) => {
    try {
      const result = await deleteBuilding(id);
      if (result.success) {
        setUpdatedBuildingList((prevList) =>
          prevList.filter((building) => building.id !== id),
        );
        toast.success("Le bâtiment a été supprimé avec succès.");
      } else {
        toast.error("La suppression du bâtiment a échoué : " + result.message);
      }
    } catch {
      toast.error("La suppression du bâtiment a échoué, veuillez réessayer.");
    } finally {
      setEditedBuilding(null);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden bg-white dark:bg-opacity-[0.08] border border-black-a12 dark:border-white-a08">
      <h3 className="p-[2rem] text-md border-b border-black-a12 dark:border-white-a08">
        Gérez vos installations
      </h3>
      <div className="bg-white dark:bg-darkBackground ">
        {updatedBuildingList.map((building, i) => (
          <div key={i}>
            <div
              className={classNames(
                "flex w-full justify-between items-center py-3 px-5 border-t border-black-a12 dark:border-white-a08",
                editedBuilding === building.id
                  ? ""
                  : "dark:hover:text-white transition-colors",
              )}
            >
              <div className="w-[33%] flex justify-start">
                <p id="name-building" className="text-xs cursor-pointer">{building.name}</p>
              </div>
              <div className="w-[33%] flex justify-center">
                {building.generalState === "Active" ? (
                  <div className="">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-emerald-500">{building.generalState}</p>
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-center">
                    <div className="flex-none rounded-full bg-green-500/20 p-[2px]">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <p className="text-green-500 text-xs ml-2">
                      {building.generalState}Active
                    </p>
                  </div>
                )}
              </div>
              <div className="w-[33%] flex justify-end space-x-4">
                <button
                  id="expand-building"
                  className="p-2 rounded-lg text-grey hover:cursor-pointer hover:bg-white-a08 transition-colors hover:text-white"
                  onClick={() => handleExpandBuilding(building.id)}
                >
                  {expanded && building.id === expandedBuildingId ? (
                    <XMarkIcon className="w-5 h-6" />
                  ) : (
                    <ChevronDoubleDownIcon className="w-5 h-6" />
                  )}
                </button>
                <div
                  id="update-building"
                  className="p-2 rounded-lg text-grey hover:cursor-pointer hover:bg-white-a08 transition-colors hover:text-white"
                  onClick={() => openModalWithBuildingData(building)}
                >
                  <AiOutlineEdit className="w-5 h-6" />
                </div>
                <div
                  id="delete-building"
                  className="p-2 rounded-lg hover:bg-red-500/30 text-grey hover:cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => handleDeleteBuilding(building.id)}
                >
                  <AiOutlineDelete className="w-5 h-6" />
                </div>
              </div>
            </div>
            <EditablelistFloor
              building={building}
              expandedBuildingId={expandedBuildingId}
            />
            {isModalOpen && editedBuilding === building.id && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditedBuilding(null);
                }}
              >
                <div
                  className="bg-white dark:bg-[#000212] border border-black-a12 dark:border-white-a08 rounded-md p-[2rem] max-w-[30%]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-md">Modifier le bâtiment</h2>
                    <XMarkIcon
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        setEditedBuilding(null);
                      }}
                    />
                  </div>
                  <form onSubmit={() => handleSaveClick(building.id)}>
                    <label className="text-sm">Nom</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={building.name}
                      onChange={handleChange}
                      className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-xs placeholder-grey mb-3"
                    />
                    <label className="text-sm">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={building.address}
                      onChange={handleChange}
                      className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-xs placeholder-grey mb-3"
                    />
                    <label className="text-sm">Ville</label>
                    <input
                      type="text"
                      name="city"
                      defaultValue={building.city}
                      onChange={handleChange}
                      className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-xs placeholder-grey mb-3"
                    />
                    <label className="text-sm">Code postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      defaultValue={building.postalCode}
                      onChange={handleChange}
                      className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-xs placeholder-grey mb-3"
                    />
                    <label className="text-sm">Pays</label>
                    <input
                      type="text"
                      name="country"
                      defaultValue={building.country}
                      onChange={handleChange}
                      className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-xs placeholder-grey mb-3"
                    />
                    <div className="p-2 rounded-lg hover:bg-green-500/30 hover:text-green-500 transition-colors text-center mt-2">
                      <button className="text-xs" type="submit">
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
