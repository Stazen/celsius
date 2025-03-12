export default async function LoadingHomeSkeleton() {
  return (
    <>
      <div className="flex flex-col bg-gray-bg w-full p-14">
        <h1 className="animate-pulse font-poppins font-bold text-xl mb-10 w-full text-gray-400">
          Données
        </h1>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-row animate-pulse bg-gray-300 w-full h-96 rounded pt-14">
            </div>
            <div className="flex flex-row bg-gray-bg w-full h-full pt-14">
              <div className="w-1/2 mr-14 animate-pulse bg-gray-300 rounded h-40">
              </div>
              <div className="w-1/2 animate-pulse bg-gray-300 rounded h-40">
              </div>
            </div>
          </div>
          <div className="flex flex-col w-2/6 ml-14">
            <div className="animate-pulse bg-gray-300 w-full mb-14 rounded h-40">
            </div>
            <div className="animate-pulse bg-gray-300 w-full rounded h-40">
            </div>
          </div>
        </div>
        {/* <div className="w-full animate-pulse bg-gray-300 h-40 rounded-lg mt-20"></div> */}
      </div>
    </>
  );
}
