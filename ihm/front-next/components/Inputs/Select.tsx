

export default function Select({ data }: any) {
  return (
    <div>
      <select className="w-full border border-black-a12 dark:border-white-a08 rounded-lg px-[0.6rem] py-[0.5rem] text-black dark:text-white bg-white bg-opacity-[0.08] text-sm placeholder-grey mb-4">
        {data.map((item: any, i: number) => (
          <option key={i} className="dark:bg-darkBackground" value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
}
