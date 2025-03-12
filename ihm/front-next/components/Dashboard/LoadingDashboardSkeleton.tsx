export default async function LoadingDashboardSkeleton() {
  return (
    <>
      <div className="flex flex-col bg-gray-bg w-9/12 p-14">
        <h1 className="animate-pulse font-poppins font-bold text-xl mb-10 w-full text-gray-400">
          Dashboard
        </h1>
        <div className="w-full flex gap-2">
          <div className="bg-gray-300 animate-pulse w-1/2 h-20 rounded-lg"></div>
          <div className="bg-gray-300 animate-pulse w-1/2 h-30 rounded-lg"></div>
        </div>
        <div className="w-full animate-pulse bg-gray-300 h-40 rounded-lg mt-20"></div>
      </div>
    </>
  );
}
