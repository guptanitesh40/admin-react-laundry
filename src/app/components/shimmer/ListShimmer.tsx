const ListShimmer = () => {
    return (
      <div className="flex flex-col gap-5 lg:gap-7.5 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div
            className="card p-5 lg:p-7.5 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            key={index}
          >
            <div className="flex items-center flex-wrap justify-between gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-[50px] h-[50px] bg-gray-300 rounded-lg"></div>
                <div>
                  <div className="w-[120px] h-5 bg-gray-300 mb-2 rounded"></div>
                  <div className="w-[100px] h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="flex items-center flex-wrap justify-between gap-5 lg:gap-12">
                <div className="w-10 h-10 bg-yellow-100 rounded-full"></div>
                <div className="w-10 h-10 bg-red-100 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ListShimmer;