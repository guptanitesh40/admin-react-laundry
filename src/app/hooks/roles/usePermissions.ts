import { useSelector } from "react-redux";


const usePermissions = () => {

    const permissions = useSelector((state: any) => state.auth.permissions)

    const hasPermission = (moduleId: number, action: "create" | "update" | "read" | "delete") => {
        const modulePermission = permissions.find((perm:any) => perm.module_id === moduleId);
        return modulePermission ? modulePermission[action] : false;
    }

    return { hasPermission }

}

export default usePermissions;