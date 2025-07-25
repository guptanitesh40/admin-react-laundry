import React from "react";

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
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Pincode</th>
              <th>State</th>
              <th className="min-w-[150px] text-center">Actions</th>
            </tr>
          </thead>
          {addresses.length > 0 ? (
            <tbody>
              {addresses.map((address) => {
                const { id, name, phone, city, pincode, address_line, state } =
                  address;
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{phone}</td>
                    <td>{address_line}</td>
                    <td>{city}</td>
                    <td>{pincode}</td>
                    <td>{state}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-warning mr-2"
                        onClick={() => onEdit(id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center">
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

// import React from 'react'

// const CustomerAddress = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default CustomerAddress
