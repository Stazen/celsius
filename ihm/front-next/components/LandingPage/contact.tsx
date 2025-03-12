"use client";

import { contactForm } from "@/app/action";
import classNames from "classnames";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

export const ContactForm = () => {
  const { ref, inView } = useInView({ threshold: 0.8, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to handle form submission
    const res = await contactForm(formData);
    if (res.success) {
      toast("Votre message a bien été envoyé");
    } else {
      toast("Il semblerait qu'un problème ai eu lieu");
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="pb-[4rem]">
      <div
        ref={ref}
        className={classNames(
          "border dark:border-white-a08 border-black-a12 p-4 md:p-8 rounded-lg opacity-0 bg-white bg-opacity-[0.02] w-[80%] sm:w-[75%] lg:w-[50%] mx-auto",
          inView &&
            "animate-fade-in [--animation-delay:0ms] opacity-100 translate-y-0",
        )}
      >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-primary-grey"
            >
              Nom
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-primary-grey"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-primary-grey"
            >
              Numéro de téléphone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 dark:text-primary-grey"
            >
              Sujet
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-primary-grey"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey mb-4"
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-primary-gradient hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
