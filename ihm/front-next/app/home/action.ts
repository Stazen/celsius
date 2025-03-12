"use server";

// THIS IS WHERE WE WILL INTERACT WITH OUR EXPRESS API
// ACTIONS FILES ARE IN EACH FEATURE CONTAINING ONLY API CALLS FOR THIS FEATURE
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const BackendUrl = process.env.BACKEND_URL;

// fonction pour récupérer tout les buildings d'une entreprise
export async function getCompany() {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await fetch(`${BackendUrl}/company`, {
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
// fonction pour récupérer le calendrier du mois en cours de l'entreprise



//fonction qui permet de récupérer les infos du user connecté
export async function getUser() {
  const session = await getServerSession(authOptions);
  if (session) {
    return { success: true, data: session };
  }
  return {
    success: false,
    message: "Il semblerait qu'un problème ai eu lieu",
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