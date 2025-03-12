// THIS IS WHERE WE WILL INTERACT WITH OUR EXPRESS API
// ACTIONS FILES ARE IN EACH FEATURE CONTAINING ONLY API CALLS FOR THIS FEATURE
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
const BackendUrl = process.env.BACKEND_URL;


//Fonction qui permet de récupérer le role du user connecté

//Fonction qui permet de récupérer le role du user connecté
export async function getUserRole() {
  const session = await getServerSession(authOptions);
  if (session) {
    return session.user.role;
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
}

//Fonction qui permet de récupérer les capteurs d'une companie
export async function getBuilding() {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + "/building", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.tokens.access.token}`,
      },
    });

    if (res.status === 200) {
      const response = await res.json();
      return { success: true, data: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
}

//fonction qui permet de créer un batiment
export async function createBuilding(name, address, city, postalCode, country) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + '/building', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
      body: JSON.stringify({ name, address, city, postalCode, country })
    });
    if (res.status === 201) {
      const response = await res.json();
      return { success: true, building: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};

//fonction qui permet de modifier un batiment
export async function editBuilding(buildingId: number, data: any) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + '/building/' + buildingId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      const response = await res.json();
      return { success: true, building: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};

//fonction qui permet de supprimer un batiment
export async function deleteBuilding(buildingId: number) {
  const session = await getServerSession(authOptions);
  if (session) {

    const res = await fetch(BackendUrl + '/building/' + buildingId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
    });

    if (res.status === 200) {
      return { success: true, response: "building deleted successfuly" };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};


//Fonction qui permet de récupérer les users d'une companie
export async function getUser() {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + "/company/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.tokens.access.token}`,
      },
    });

    if (res.status === 200) {
      const response = await res.json();
      return { success: true, data: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
}

//fonction qui permet de créer un user
export async function createUser(name, email,  password, role ) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
      body: JSON.stringify({ name, email, password, role })
    });
    if (res.status === 201) {
      const response = await res.json();
      return { success: true, user: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};

//Fonction qui permet de supprimer un user
export async function deleteUser(userId: number) {
  const session = await getServerSession(authOptions);
  if (session) {

    const res = await fetch(BackendUrl + '/user/' + userId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
    });

    if (res.status === 200) {
      return { success: true, response: "user deleted successfuly" };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};

//fonction qui permet d'éditer un user
export async function editUser(userId: number, data: any) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + '/user/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      const response = await res.json();
      return { success: true, user: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};

// Methode ajout des floors
export async function createFloor(number, buildingId) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + '/floor/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
      body: JSON.stringify({number, buildingId})
    });
    if (res.status === 201) {
      const response = await res.json();
      return { success: true, floor: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};

//fonction qui permet de créer une room
export async function createRoom(name, floor,  building) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + '/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
      body: JSON.stringify({ name, floor, building })
    });
    if (res.status === 201) {
      const response = await res.json();
      return { success: true, room: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
}; 

//fonction qui permet de supprimer un etage
export async function deleteFloor(floorId: number) {
  const session = await getServerSession(authOptions);
  if (session) {

    const res = await fetch(BackendUrl + '/floor/' + floorId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
    });

    if (res.status === 200) {
      return { success: true, response: "floor deleted successfuly" };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};

//fonction qui permet de modifier un etage
export async function editFloor(floorId: number, data: any) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + '/floor/' + floorId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      const response = await res.json();
      return { success: true, floor: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};

//fonction qui permet de supprimer une room
export async function deleteRoom(roomId: number) {
  const session = await getServerSession(authOptions);
  if (session) {

    const res = await fetch(BackendUrl + '/room/' + roomId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
    });

    if (res.status === 200) {
      return { success: true, response: "room deleted successfuly" };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};

//fonction qui permet de modifier une room
export async function editRoom(roomId: number, data: any) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + '/room/' + roomId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.tokens.access.token}`,
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      const response = await res.json();
      return { success: true, room: response };
    } else {
      return {
        success: false,
        message: "Il semblerait qu'un problème ai eu lieu",
      };
    }
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
};
