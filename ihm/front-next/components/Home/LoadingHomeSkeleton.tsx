export default async function LoadingHomeSkeleton() {
  return (
    <>
      <div className="flex flex-col bg-gray-bg w-full p-14">
        <h1 className="animate-pulse font-poppins font-bold text-xl mb-10 w-full text-gray-400">
          Accueil
        </h1>
        <div className="w-full flex gap-2">
          <div className="bg-gray-300 animate-pulse w-full h-40 rounded"></div>
        </div>
        <div className="flex flex-row w-full pt-14">
          <div className="flex flex-col animate-pulse bg-gray-300 w-9/12 h-96 rounded">
          </div>
          <div className="flex flex-col animate-pulse bg-gray-300 w-3/12 ml-14 rounded h-96">
          </div>
        </div>
        {/* <div className="w-full animate-pulse bg-gray-300 h-40 rounded-lg mt-20"></div> */}
      </div>
    </>
  );
}
