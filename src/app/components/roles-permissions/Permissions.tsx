import PermissionTable from "./PermissionTable";


const Permissions:React.FC = () => {

    return(
        <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Permissions 
            </h1>
          </div>
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <PermissionTable />
          </div>
        </div>
      </div>
    </>
    );
}

export default Permissions;