export default function Loading() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between">
        {/* Categorie loading... */}
        <div className="bg-gray-100 flex flex-row p-2 w-full gap-2 whitespace-nowrap overflow-x-scroll no-scrollbar">
          {[...new Array(20)]?.map((i) => (
            <div
              key={i}
              className="skeleton p-2 bg-slate-200 rounded-xl shadow-sm"
            >
              <p className="text-gray-700 text-sm w-10 p-2"></p>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 flex-1 p-2 flex flex-col gap-4 rounded-xl shadow- pb-8 w-full">
          <div className="flex items-center gap-2 w-full rounded-md">
            <div className="skeleton h-8 w-9 rounded-full"></div>
            <p className="skeleton text-md text-gray-800 w-full h-2 rounded-md"></p>
          </div>
          {/* matchs */}
          {[...new Array(20)]?.map((i) => (
            <div
              key={i}
              className="skeleton bg-blue-50 flex flex-col pb-2 pt-1 items-center shadow-md rounded-md"
            >
              <div>
                <p className="text-xs text-gray-500">- </p>
              </div>
              <div className="flex w-full px-4 items-center ">
                <div className="flex-1 flex items-center justify-center  gap-4">
                  <div className=" flex flex-col justify-center items-center gap-1">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <p className="text-xs text-gray-800 w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-center h-2 bg-gray-200 rounded-lg"></p>
                  </div>
                  {/* score */}
                  <span className=" text-2xl bg-gray-200 h-1 w-4"></span>
                </div>
                <div className="p-4 flex">
                  <span className="text-lg text-gray-400">-</span>
                </div>
                <div className="flex-1 flex items-center justify-center  gap-4">
                  <span className=" text-2xl bg-gray-200 h-1 w-4"></span>
                  <div className=" flex flex-col justify-center items-center gap-1">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <p className="text-xs text-gray-800 w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-center h-2 bg-gray-200 rounded-lg"></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
