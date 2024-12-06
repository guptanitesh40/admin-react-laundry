import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import Multiselect from "multiselect-react-dropdown";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import { useGetBranches } from "../../hooks";
import { OrderStatus, PaymentStatus } from "../../../types/enums";

interface OptionType {
  label: string;
  value: number;
}

interface OrderTableFilterProps {
  filters: {
    paymentStatusFilter: number[];
    orderStatusFilter: number[];
    paymentTypeFilter: number;
    customerFilter: number[];
    pickupBoyFilter: number[];
    deliveryBoyFilter: number[];
    branchFilter: number[];
  };
  updateFilters: (filters: any) => void;
}

const OrderTableFilter: React.FC<OrderTableFilterProps> = ({
  filters,
  updateFilters,
}) => {
  const [customerSearch, setCustomerSearch] = useState("");
  const [pickupBoySearch, setPickBoySearch] = useState("");
  const [deliveryBoySearch, setDeliveryBoySearch] = useState("");

  const [customerOptions, setOptions] = useState<OptionType[]>([]);
  const [pickupBoyOptions, setPickupBoyOptions] = useState<OptionType[]>([]);
  const [deliveryBoyOptions, setDeliveryBoyOptions] = useState<OptionType[]>(
    []
  );

  const { fetchUsersByRole } = useGetUsersByRole();
  const { branches, fetchBranches } = useGetBranches();

  const paymentStatusOptions = Object.entries(PaymentStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));
  const orderStatusOptions = Object.entries(OrderStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      const customers = await fetchUsersByRole(5, customerSearch);
      const formattedOptions = customers?.map((user: any) => ({
        label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
        value: user.user_id,
      }));
      setOptions(formattedOptions);
    };
    if (customerSearch) {
      fetchCustomer();
    }
  }, [customerSearch]);

  useEffect(() => {
    if (pickupBoySearch) {
      const fetchPickupBoy = async () => {
        const pickupBoys = await fetchUsersByRole(4, pickupBoySearch);
        const formattedOptions = pickupBoys?.map((user: any) => ({
          label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
          value: user.user_id,
        }));
        setPickupBoyOptions(formattedOptions);
      };
      fetchPickupBoy();
    }
    if (deliveryBoySearch) {
      const fetchDeliveryBoy = async () => {
        const deliveryBoys = await fetchUsersByRole(4, deliveryBoySearch);
        const formattedOptions = deliveryBoys?.map((user: any) => ({
          label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
          value: user.user_id,
        }));
        setDeliveryBoyOptions(formattedOptions);
      };
      fetchDeliveryBoy();
    }
  }, [pickupBoySearch, deliveryBoySearch]);

  const handleFilterChange = (filterName: string, value: any) => {
    updateFilters({
      ...filters,
      [filterName]: value,
    });
  };

  return (
    <div className="card-header flex-wrap gap-2">
      <div className="flex flex-wrap">
        <div className="basis-1/2 flex flex-col space-y-2">
          <Select
            name="customer-select"
            options={customerOptions}
            value={customerOptions?.filter((option) =>
              filters.customerFilter?.includes(option.value)
            )}
            onChange={(selected: MultiValue<OptionType>) =>
              handleFilterChange(
                "customerFilter",
                selected.map((option) => option.value)
              )
            }
            onInputChange={(inputValue: string) =>
              setCustomerSearch(inputValue)
            }
            isMulti
            placeholder="Search and select customers"
            className="custom-select-container"
            classNamePrefix="custom-select"
          />
          <Select
            name="pickupboy-select"
            options={pickupBoyOptions}
            value={pickupBoyOptions?.filter((option) =>
              filters.pickupBoyFilter?.includes(option.value)
            )}
            onChange={(selected: MultiValue<OptionType>) =>
              handleFilterChange(
                "pickupBoyFilter",
                selected.map((option) => option.value)
              )
            }
            onInputChange={(inputValue: string) => setPickBoySearch(inputValue)}
            isMulti
            placeholder="Search and select pickup boys"
            className="custom-select-container"
            classNamePrefix="custom-select"
          />
          <Select
            name="deliveryboy-select"
            options={deliveryBoyOptions}
            value={deliveryBoyOptions?.filter((option) =>
              filters.deliveryBoyFilter?.includes(option.value)
            )}
            onChange={(selected: MultiValue<OptionType>) =>
              handleFilterChange(
                "deliveryBoyFilter",
                selected.map((option) => option.value)
              )
            }
            onInputChange={(inputValue: string) =>
              setDeliveryBoySearch(inputValue)
            }
            isMulti
            placeholder="Search and select delivery boys"
            className="custom-select-container"
            classNamePrefix="custom-select"
          />
        </div>
        <div className="basis-1/2 space-y-4">
          <Multiselect
            options={branches?.map((branch) => ({
              branch_id: branch.branch_id,
              branch_name: branch.branch_name,
            }))}
            displayValue="branch_name"
            selectedValues={branches?.filter((option) =>
              filters.branchFilter?.includes(option.branch_id)
            )}
            placeholder="Branch"
            onSelect={(selectedList) => {
              handleFilterChange(
                "branchFilter",
                selectedList.map((item: any) => item.branch_id)
              );
            }}
            onRemove={(selectedList) => {
              handleFilterChange(
                "branchFilter",
                selectedList.map((item: any) => item.branch_id)
              );
            }}
            className="multiselect-container multiselect min-w-[430px] max-w-[480px]"
          />
          <Multiselect
            options={orderStatusOptions}
            displayValue="label"
            selectedValues={orderStatusOptions?.filter((option) =>
              filters.orderStatusFilter?.includes(option.value)
            )}
            placeholder="Order status"
            onSelect={(selectedList) => {
              handleFilterChange(
                "orderStatusFilter",
                selectedList.map((item: any) => item.value)
              );
            }}
            onRemove={(selectedList) => {
              handleFilterChange(
                "orderStatusFilter",
                selectedList.map((item: any) => item.value)
              );
            }}
            className="multiselect-container multiselect min-w-[430px] max-w-[480px]"
          />
          <Multiselect
            options={paymentStatusOptions}
            displayValue="label"
            selectedValues={paymentStatusOptions.filter((option) =>
              filters.paymentStatusFilter?.includes(option.value)
            )}
            placeholder="Payment status"
            onSelect={(selectedList) => {
              handleFilterChange(
                "paymentStatusFilter",
                selectedList.map((item: any) => item.value)
              );
            }}
            onRemove={(selectedList) => {
              handleFilterChange(
                "paymentStatusFilter",
                selectedList.map((item: any) => item.value)
              );
            }}
            className="multiselect-container multiselect min-w-[430px] max-w-[480px]"
          />
        </div>
        <select
          className="select select-lg w-[200px] text-sm mt-2"
          value={filters.paymentTypeFilter}
          onChange={(e) => {
            handleFilterChange("paymentTypeFilter", Number(e.target.value));
          }}
        >
          <option value="" disabled selected>
            Payment type
          </option>
          <option value={1}>Cash on Delivery</option>
          <option value={2}>Online Payment</option>
        </select>
      </div>
    </div>
  );
};

export default OrderTableFilter;
