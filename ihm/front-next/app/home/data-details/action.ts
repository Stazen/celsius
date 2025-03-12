// THIS IS WHERE WE WILL INTERACT WITH OUR EXPRESS API
// ACTIONS FILES ARE IN EACH FEATURE CONTAINING ONLY API CALLS FOR THIS FEATURE
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const BackendUrl = process.env.BACKEND_URL;

//fonction qui permet de récupérer la liste des batiments, des étages et des salles
export async function getBuilding() {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(`${BackendUrl}/building`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.tokens.access.token}`,
      },
    });

    if (res.status === 200) {
      const response = await res.json();
      return { success: true, data: response };
    }
    return {
      success: false,
      message: "Il semblerait qu'un problème ai eu lieu",
    };
  }
  return {
    success: false,
    message: "Vous devez vous connecter pour accéder à ces données",
  };
}

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

//fonction qui permet de récupérer les données d'un capteur sur une plage de temps donnée
export async function getDataDetails(sensorId: string, interval: string) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + `/data/details?interval=${interval}&sensorId=${sensorId}`, {
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

//fonction qui permet de récupérer les logs des capteurs
export async function getLogs() {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(BackendUrl + `/email`, {
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