export default function BasicInput({ placeholder, type}: any) {
  return (
    <input className="border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] w-full text-sm placeholder-grey" type={type} placeholder={placeholder} />
  );
}
