import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Collapse } from "react-collapse";
import { useState } from "react";

export const Faq = ({ question, answer }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
      setOpen(!open);
    };
  
    return (
      <div>
        <div className="border-b dark:border-white-a08 border-black-a12 cursor-pointer flex justify-between items-center py-[2rem] px-[1rem]" onClick={toggle}>
          <p className="text-sm md:text-md dark:text-white">{question}</p>
          <div>
            {open ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
          </div>
        </div>
        <Collapse isOpened={open}>
          <p className="text-xxs md:text-xs text-grey py-[2rem] px-[1rem] text-justify">{answer}</p>
        </Collapse>
      </div>
    )
}