import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

interface Address {
  id: number;
  name: string;
  phone: string;
  address_line: string;
  city: string;
  pincode: string;
}

interface CustomerAddressProps {
  addresses: Address[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const CustomerAddress: React.FC<CustomerAddressProps> = ({
  addresses,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="card mt-5">
      <div className="card-header flex justify-between items-center">
        <h3 className="text-xl font-semibold">Addresses</h3>
        <button className="btn btn-primary" onClick={onAdd}>
          + Add Address
        </button>
      </div>
      <div className="scrollable-x-auto">
        <table className="table table-auto table-border min-w-full">
          <thead>
            <tr>
              <th className="min-w-[75px]">id</th>
              <th className="min-w-[150px]">Name</th>
              <th className="min-w-[150px]">Phone</th>
              <th className="min-w-[200px]">Address</th>
              <th className="min-w-[100px]">City</th>
              <th className="min-w-[100px]">Pincode</th>
              <th className="min-w-[80px]">State</th>
              <th className="min-w-[125px] text-center">Actions</th>
            </tr>
          </thead>
          {addresses.length > 0 ? (
            <tbody>
              {addresses.map((address) => {
                const {
                  address_id,
                  full_name,
                  phone_number,
                  full_address,
                  building_number,
                  area,
                  landmark,
                  city,
                  pincode,
                  state,
                } = address;

                const addrString = [building_number, area, landmark]
                  .filter(Boolean)
                  .join(", ");
                return (
                  <tr key={address_id}>
                    <td>{address_id}</td>
                    <td>{full_name}</td>
                    <td>{phone_number}</td>
                    <td>{addrString}</td>
                    <td>{city}</td>
                    <td>{pincode}</td>
                    <td>{state}</td>
                    <td className="text-center">
                      <button
                        className="mr-3 p-3 rounded-full bg-yellow-100 hover:bg-yellow-200"
                        onClick={() => onEdit(address_id)}
                      >
                        <FaPencilAlt className="text-yellow-600 h-4 w-4" />
                      </button>
                      <button
                        className="p-3 bg-red-100 hover:bg-red-200  rounded-full"
                        onClick={() => onDelete(address_id)}
                      >
                        <FaTrash className="text-red-500 h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={8} className="text-center">
                  No addresses found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default CustomerAddress;
