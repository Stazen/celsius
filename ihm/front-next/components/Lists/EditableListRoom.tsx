import { deleteRoom, editRoom } from "@/app/home/settings/action";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";
import { Collapse } from "react-collapse";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsArrow90DegLeft } from "react-icons/bs";
import { toast } from "sonner";

export default function EditablelistRoom({ floor, expandedFloorId }) {
  const [updatedRoomList, setUpdatedRoomList] = useState(floor.rooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedRoom, setEditedRoom] = useState(null);
  const [editedRoomData, setEditedRoomData] = useState({
    building: floor.buildingId,
    floor: floor.id,
  });

  const handleDeleteRoom = async (id) => {
    try {
      const result = await deleteRoom(id);
      if (result.success) {
        setUpdatedRoomList((prevList) =>
          prevList.filter((room) => room.id !== id),
        );
        toast.success("La pièce a été supprimé avec succès.");
      } else {
        toast.error("La suppression de la pièce a échoué : " + result.message);
      }
    } catch {
      toast.error("La suppression de la pièce a échoué, veuillez réessayer.");
    } finally {
      //setEditedFloor(null);
    }
  };

  const handleEditFloor = (room) => {
    setEditedRoom(room);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (id) => {
    setIsModalOpen(false);
    //console.log(editedFloorData);
    try {
      const result = await editRoom(id, editedRoomData);
      if (result.success) {
        setUpdatedRoomList((prevList) =>
          prevList.map((room) =>
            room.id === id ? { ...room, ...editedRoomData } : room,
          ),
        );
        console.log("updatedRoomList", updatedRoomList);
        toast.success("La pièce a été modifié avec succès.");
      } else {
        toast.error("La modification de la pièce a échoué : " + result.message);
      }
    } catch {
      toast.error("La modification de la pièce a échoué, veuillez réessayer.");
    } finally {
      setEditedRoom(null);
    }
  };

  return (
    <Collapse
      className={classNames("dark:bg-darkBackground transition-all")}
      isOpened={expandedFloorId === floor.id}
    >
      {updatedRoomList.map((room) => (
        <div
          key={room.id}
          className={classNames(
            "flex transition-all border-t border-black-a12 dark:border-white-a08 text-xxs py-3 px-5 items-center justify-between",
          )}
        >
          <div className="flex ml-8">
            <BsArrow90DegLeft className="w-4 h-5 rotate-180 mr-4" />
            <p id="name-room" className="mt-[3px] text-xs">{room.name}</p>
          </div>
          <div className="w-[33%] flex justify-end space-x-4">
            <div
              id="edit-room"
              className="p-2 rounded-lg text-grey hover:cursor-pointer hover:bg-white-a08 transition-colors hover:text-white"
              onClick={() => handleEditFloor(room.id)}
            >
              <AiOutlineEdit className="w-5 h-6" />
            </div>
            <div
              id="delete-room"
              className="p-2 rounded-lg hover:bg-red-500/30 text-grey hover:cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => handleDeleteRoom(room.id)}
            >
              <AiOutlineDelete className="w-5 h-6" />
            </div>
          </div>

          {isModalOpen && editedRoom === room.id && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center"
              onClick={() => {
                setIsModalOpen(false);
                setEditedRoom(null);
              }}
            >
              <div
                className="bg-white dark:bg-[#000212] border border-black-a12 dark:border-white-a08 rounded-md p-[2rem] max-w-[30%]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-md">Modifier la pièce</h2>
                  <XMarkIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditedRoom(null);
                    }}
                  />
                </div>
                <form onSubmit={() => handleSaveClick(room.id)}>
                  <label className="text-sm">Nom de la pièce</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={room.name}
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
    </Collapse>
  );
}
