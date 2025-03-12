"use server";

const BackendUrl = process.env.BACKEND_URL;

export const contactForm = async (formData: any) => {
  const res = await fetch(`${BackendUrl}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const response = await res.json();

  if (res.status === 201) {
    return { success: true, data: response };
  }

  return {
    success: false,
    message: "Il semblerait qu'un problème ai eu lieu",
  };
};
