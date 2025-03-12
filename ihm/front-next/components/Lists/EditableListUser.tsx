import { deleteUser, editUser } from "@/app/home/settings/action";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

export default function EditableListUser({ usersList }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [updatedUsersList, setUpdatedUsersList] = useState(usersList);
  const [editingUserId, setEditingUserId] = useState(null);

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
  };

  useEffect(() => {
    setUpdatedUsersList(usersList);
  }, [usersList]);

  const handleDeleteUser = async (id) => {
    try {
      const result = await deleteUser(id);
      if (result.success) {
        setUpdatedUsersList((prevUsers) =>
          prevUsers.filter((user) => user.id !== id),
        );
        toast.success("L'utilisateur a été supprimé avec succès.");
      } else {
        toast.error("La suppression a échoué : " + result.message);
      }
    } catch (error) {
      toast.error("La suppression a échoué, veuillez réessayer.");
    } finally {
      setEditingUserId(null);
    }
  };

  const handleSaveClick = async (id) => {
    setIsEditing(false);
    console.log(editedUser);
    try {
      const result = await editUser(id, editedUser);
      if (result.success) {
        setUpdatedUsersList((prevUsers) => {
          const updatedUsers = prevUsers.map((prevUser) => {
            if (prevUser.id === id) {
              return result.user.user;
            } else {
              return prevUser;
            }
          });
          return updatedUsers;
        });
        toast.success("L'utilisateur a été modifié avec succès.");
      } else {
        toast.error("La mise à jour a échoué : " + result.message);
      }
    } catch (error) {
      toast.error("La mise à jour a échoué, veuillez réessayer.");
    } finally {
      setEditingUserId(null);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, name: e.target.value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, role: e.target.value });
  };

  return (
    <div className="rounded-md overflow-hidden bg-white dark:bg-opacity-[0.08] border border-black-a12 dark:border-white-a08 mt-14">
      <h3 className="p-[2rem] text-md border-b border-black-a12 dark:border-white-a08">
        Gérez votre équipe
      </h3>
      <div className="bg-white dark:bg-darkBackground">
        {updatedUsersList.map((user, i) => (
          <div key={i} role="list">
            <div
              className={classNames(
                "flex justify-between py-4 px-5 border-t dark:border-white-a08 border-black-a12 flex items-center justify-center transition-colors",
                editingUserId === user.id
                  ? ""
                  : "dark:bg-darkBackground hover:bg-blue-celsius/30 dark:hover:bg-blue-celsius/30 dark:hover:text-white hover:cursor-pointer transition-colors",
              )}
              onClick={() => handleEditClick(user.id)}
            >
              <div className="flex w-1/3">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    onChange={handleNameChange}
                    className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey"
                  />
                ) : (
                  <p className="text-xs">{user.name}</p>
                )}
              </div>
              <div className="flex w-1/3">
                {editingUserId === user.id ? (
                  <select
                    name="role"
                    defaultValue={user.role}
                    onChange={() => handleRoleChange}
                    className="w-full border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] text-sm placeholder-grey"
                  >
                    <option className="dark:bg-darkBackground" value="admin">
                      Admin
                    </option>
                    <option className="dark:bg-darkBackground" value="user">
                      User
                    </option>
                  </select>
                ) : (
                  <span
                    className="bg-blue-celsius/30 rounded-md text-xs text-blue-celsius h-[25px] min-w-[60px] flex items-center justify-center"
                    onClick={handleEditClick}
                  >
                    {user.role}
                  </span>
                )}
              </div>
              <div>
                {editingUserId === user.id ? (
                  <div
                    className="p-2 rounded-lg hover:bg-green-500/30 hover:text-green-500 transition-colors"
                    onClick={() => handleSaveClick(user.id)}
                  >
                    <button className="text-xs">Enregistrer</button>
                  </div>
                ) : (
                  <div
                    id={`delete-user-${user.name}`}
                    className="p-2 rounded-lg hover:bg-red-500/30 text-grey hover:cursor-pointer hover:text-red-500 transition-colors"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <AiOutlineDelete className="w-5 h-6" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
