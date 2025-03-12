import { deleteFloor, editFloor } from "@/app/home/settings/action";
import { ChevronDoubleDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";
import { Collapse } from "react-collapse";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsArrow90DegLeft } from "react-icons/bs";
import { toast } from "sonner";
import EditablelistRoom from "./EditableListRoom";

export default function EditablelistFloor({ building, expandedBuildingId }) {
  // const [expandedFloor, setExpandedFloor] = useState(false);
  const [updatedFloorList, setUpdatedFloorList] = useState(building.floor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedFloor, setEditedFloor] = useState(null);
  const [editedFloorData, setEditedFloorData] = useState({
    number: "",
    companyId: building.companyId,
    buildingId: building.id,
  });
  // const [expanded, setExpanded] = useState(false);
  const [expandedFloorId, setExpandedFloorId] = useState(null);

  const handleDeleteFloor = async (id) => {
    try {
      const result = await deleteFloor(id);
      if (result.success) {
        setUpdatedFloorList((prevList) =>
          prevList.filter((floor) => floor.id !== id),
        );
        toast.success("L'étage a été supprimé avec succès.");
      } else {
        toast.error("La suppression de l'étage a échoué : " + result.message);
      }
    } catch {
      toast.error("La suppression de l'étage a échoué, veuillez réessayer.");
    } finally {
      //setEditedFloor(null);
    }
  };

  const handleEditFloor = (floor) => {
    setEditedFloor(floor);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFloorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (id) => {
    setIsModalOpen(false);
    //console.log(editedFloorData);
    try {
      const result = await editFloor(id, editedFloorData);
      if (result.success) {
        setUpdatedFloorList((prevList) =>
          prevList.map((floor) =>
            floor.id === id ? { ...floor, ...editedFloorData } : floor,
          ),
        );
        toast.success("L'étage a été modifié avec succès.");
      } else {
        toast.error("La mise à jour de l'étage a échoué : " + result.message);
      }
    } catch {
      toast.error("La mise à jour de l'étage a échoué, veuillez réessayer.");
    } finally {
      setEditedFloor(null);
    }
  };

  const handleExpandFloor = (id) => {
    if (id === expandedFloorId) {
      setExpandedFloorId(null);
      return;
    }
    setExpandedFloorId(id);
  };

  return (
    <Collapse
      className={classNames("dark:bg-darkBackground transition-all")}
      isOpened={expandedBuildingId === building.id}
    >
      {updatedFloorList.map((floor) => (
        <div key={floor.id}>
          <div
            className={classNames(
              "flex transition-all border-t border-black-a12 dark:border-white-a08 text-xxs py-3 px-5 items-center justify-between",
            )}
          >
            <div className="flex">
              <BsArrow90DegLeft className="w-4 h-5 rotate-180 mr-4" />
              <p id="number-floor" className="mt-[4px] text-xs"> Etage {floor.number}</p>
            </div>
            <div className="w-[33%] flex justify-end space-x-4">
              <div
                id="expand-floor"
                className="p-2 rounded-lg text-grey hover:cursor-pointer hover:bg-white-a08 transition-colors hover:text-white"
                onClick={() => handleExpandFloor(floor.id)}
              >
                {expandedFloorId === floor.id ? (
                  <XMarkIcon className="w-5 h-6" />
                ) : (
                  <ChevronDoubleDownIcon className="w-5 h-6" />
                )}
              </div>
              <div
                id="edit-floor"
                className="p-2 rounded-lg text-grey hover:cursor-pointer hover:bg-white-a08 transition-colors hover:text-white"
                onClick={() => handleEditFloor(floor.id)}
              >
                <AiOutlineEdit className="w-5 h-6" />
              </div>
              <div
                id="delete-floor"
                className="p-2 rounded-lg hover:bg-red-500/30 text-grey hover:cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => handleDeleteFloor(floor.id)}
              >
                <AiOutlineDelete className="w-5 h-6" />
              </div>
            </div>

            {isModalOpen && editedFloor === floor.id && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditedFloor(null);
                }}
              >
                <div
                  className="bg-white dark:bg-[#000212] border border-black-a12 dark:border-white-a08 rounded-md p-[2rem] max-w-[30%]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-md">Modifier l'étage</h2>
                    <XMarkIcon
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        setEditedFloor(null);
                      }}
                    />
                  </div>
                  <form onSubmit={() => handleSaveClick(floor.id)}>
                    <label className="text-sm">Numéro d'étage</label>
                    <input
                      type="number"
                      name="number"
                      defaultValue={floor.number}
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
          <EditablelistRoom floor={floor} expandedFloorId={expandedFloorId} />
        </div>
      ))}
    </Collapse>
  );
}
