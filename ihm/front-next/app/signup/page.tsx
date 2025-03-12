"use client";
import { useRef } from "react";
const BackendUrl = process.env.BACKEND_URL;

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const res = await fetch(process.env.BACKEND_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.current),
    });
    if (!res.ok) {
      return;
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="">Nom</label>
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => {
              data.current.name = e.target.value;
            }}
            className="text-black"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            type="email"
            autoComplete="off"
            onChange={(e) => {
              data.current.email = e.target.value;
            }}
            className="text-black"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Mot de passe</label>
          <input
            type="password"
            onChange={(e) => {
              data.current.password = e.target.value;
            }}
            className="text-black"
          />
        </div>
        <button type="submit" className="bg-emerald-500 rounded-sm mt-4">
          S'inscrire
        </button>
      </form>
    </main>
  );
};

export default SignupPage;
