// THIS IS WHERE WE WILL INTERACT WITH OUR EXPRESS API
// ACTIONS FILES ARE IN EACH FEATURE CONTAINING ONLY API CALLS FOR THIS FEATURE

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const BackendUrl = process.env.BACKEND_URL;

// fonction qui permet de récupérer les données sur le mois actuel d'un capteur donné
export async function getData(sensorId: string) {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(`${BackendUrl}/data?sensorId=${sensorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.tokens.access.token}`,
      },
    });

    if (res.status === 200) {
      const response = await res.json();
      return { success: true, data: response.data };
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


export async function getCalendar(sensorId: string) {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await fetch(`${BackendUrl}/data/calendar?sensorId=${sensorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.tokens.access.token}`,
      },
    });

    if (res.status === 200) {
      const response = await res.json();
      return { success: true, data: response.data };
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
// Fonction qui permet de récupérer un calendrier pour un capteur donné sur le mois courant

// Fonc
