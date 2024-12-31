import { Role } from "../../types/enums";

export const getRoleClass = (roleId: number) => {
    switch (roleId) {
      case Role["Super Admin"]:
        return "role-super-admin";
      case Role["Sub Admin"]:
        return "role-sub-admin";
      case Role["Branch Manager"]:
        return "role-branch-manager";
      case Role["Delivery Boy"]:
        return "role-delivery-boy";
      case Role["Customer"]:
        return "role-customer";
      case Role["Workshop Manager"]:
        return "role-workshop-manager";
      case Role["Vendor"]:
        return "role-vendor";
      default:
        return "role-default";
    }
  }