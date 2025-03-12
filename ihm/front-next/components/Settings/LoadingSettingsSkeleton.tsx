export default async function LoadingSettingsSkeleton() {
  return (
    <>
      <div className="flex flex-col bg-gray-bg w-9/12 p-14">
        <h1 className="animate-pulse font-poppins font-bold text-xl mb-10 w-full text-gray-400">
          Paramètres
        </h1>

          <p className="text-gray-400 font-poppins animate-pulse font-poppins mb-8">Gérez votre environnement :</p>
          <div className="bg-gray-300 rounded flex flex-col p-4 mb-14 h-48 animate-pulse"></div>
          <p className="text-gray-400 font-poppins animate-pulse font-poppins mb-8">Gérez votre équipe :</p>
          <div className="bg-gray-300 rounded flex flex-col p-4 mb-14 h-48 animate-pulse"></div>
        </div>
    
      <div className="flex flex-col bg-custom-blue w-3/12 h-screen py-14 px-8">
        <div className="bg-gray-300 rounded flex flex-col p-4 mb-14 h-48 animate-pulse">
        </div>
        <div className="bg-gray-300 rounded flex flex-col p-4 mb-14 h-48 animate-pulse">
        </div>
        <div className="bg-gray-300 rounded flex flex-col p-4 h-48 animate-pulse">
        </div>
      </div>
    </>
  );
}
