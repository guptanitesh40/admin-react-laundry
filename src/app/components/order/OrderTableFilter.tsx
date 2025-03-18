import React, { useEffect, useState } from "react";
import { useGetBranches } from "../../hooks";
import { PaymentStatus } from "../../../types/enums";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import MultiSelect from "../MultiSelect/MultiSelect";

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
  showOrderStatusFilter?: boolean;
  orderStatusOptions: any;
  showSearchInput: boolean;
}

const OrderTableFilter: React.FC<OrderTableFilterProps> = ({
  filters,
  updateFilters,
  showOrderStatusFilter = true,
  orderStatusOptions,
  showSearchInput = true,
}) => {
  const [allCustomerOptions, setAllCustomerOptions] = useState<OptionType[]>([]);
  const [customerOptions, setCustomerOptions] = useState<OptionType[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<OptionType[]>([]);

  const [allPickupBoyOptions, setAllPickupBoyOptions] = useState<OptionType[]>([]);
  const [pickupBoyOptions, setPickupBoyOptions] = useState<OptionType[]>([]);
  const [selectedPickupBoys, setSelectedPickupBoys] = useState<OptionType[]>([]);

  const [allDeliveryBoyOptions, setAllDeliveryBoyOptions] = useState<OptionType[]>([]);
  const [deliveryBoyOptions, setDeliveryBoyOptions] = useState<OptionType[]>([]);
  const [selectedDeliveryBoys, setSelectedDeliveryBoys] = useState<OptionType[]>([]);

  const [customerSearch, setCustomerSearch] = useState("");
  const [pickupBoySearch, setPickupBoySearch] = useState("");
  const [deliveryBoySearch, setDeliveryBoySearch] = useState("");

  const { branches } = useGetBranches();
  const { fetchUsersByRole } = useGetUsersByRole();

  const paymentStatusOptions = Object.entries(PaymentStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));

  useEffect(() => {
    const fetchInitialUsers = async () => {
      const customers = await fetchUsersByRole(5);
      const pickupBoys = await fetchUsersByRole(4);
      const deliveryBoys = await fetchUsersByRole(4);

      const formatOptions = (users: any[]) =>
        users.map((user) => ({
          label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
          value: user.user_id,
        }));

      setAllCustomerOptions(formatOptions(customers));
      setAllPickupBoyOptions(formatOptions(pickupBoys));
      setAllDeliveryBoyOptions(formatOptions(deliveryBoys));
    };

    fetchInitialUsers();
  }, []);

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      const customers = await fetchUsersByRole(5, customerSearch);
      const formattedOptions = customers.map((user: any) => ({
        label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
        value: user.user_id,
      }));

      setCustomerOptions(formattedOptions);
    };

    if (customerSearch) {
      fetchFilteredUsers();
    } else {
      setCustomerOptions(allCustomerOptions);
    }
  }, [customerSearch, allCustomerOptions]);

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      const pickupBoys = await fetchUsersByRole(4, pickupBoySearch);
      const formattedOptions = pickupBoys.map((user: any) => ({
        label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
        value: user.user_id,
      }));

      setPickupBoyOptions(formattedOptions);
    };

    if (pickupBoySearch) {
      fetchFilteredUsers();
    } else {
      setPickupBoyOptions(allPickupBoyOptions);
    }
  }, [pickupBoyOptions, allPickupBoyOptions]);

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      const deliveryBoys = await fetchUsersByRole(4, pickupBoySearch);
      const formattedOptions = deliveryBoys.map((user: any) => ({
        label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
        value: user.user_id,
      }));

      setDeliveryBoyOptions(formattedOptions);
    };

    if (deliveryBoySearch) {
      fetchFilteredUsers();
    } else {
      setDeliveryBoyOptions(allDeliveryBoyOptions);
    }
  }, [deliveryBoyOptions, allDeliveryBoyOptions]);

  const getCombinedOptions = (
    selectedOptions: OptionType[], 
    filteredOptions: OptionType[] 
  ): OptionType[] => [
    ...selectedOptions.filter(
      (selected) => !filteredOptions.some((option) => option.value === selected.value)
    ),
    ...filteredOptions,
  ];

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <MultiSelect
            options={getCombinedOptions(selectedCustomers, customerOptions)}
            displayValue="label"
            placeholder="Search Customer"
            selectedValues={selectedCustomers.map((customer) => customer.value)}
            onSelect={(selectedList: any) => {
              setSelectedCustomers(selectedList); 
              const selectedValues = selectedList.map((item: any) => item.value);
              updateFilters({
                ...filters,
                customerFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              setSelectedCustomers(selectedList); 
              const selectedValues = selectedList.map((item: any) => item.value);
              updateFilters({
                ...filters,
                customerFilter: selectedValues, 
              });
            }}
            setSearch={setCustomerSearch}
            className="w-full"
            isSearchInput={true}
          />

          {showOrderStatusFilter && (
            <MultiSelect
              options={orderStatusOptions}
              displayValue="label"
              placeholder="Select Order Status"
              selectedValues={filters.orderStatusFilter}
              onSelect={(selectedList: any) => {
                const selectedValues = selectedList.map(
                  (item: any) => item.value
                );
                updateFilters({
                  ...filters,
                  orderStatusFilter: selectedValues,
                });
              }}
              onRemove={(selectedList: any) => {
                const selectedValues = selectedList.map(
                  (item: any) => item.value
                );
                updateFilters({
                  ...filters,
                  orderStatusFilter: selectedValues,
                });
              }}
              isCustomLabel={true}
              className="w-full"
              isSearchInput={showSearchInput}
            />
          )}

          <MultiSelect
            options={branches?.map((branch) => ({
              label: branch.branch_name,
              value: branch.branch_id,
            }))}
            displayValue="branch_name"
            placeholder="Select Branch"
            selectedValues={filters?.branchFilter}
            onSelect={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                branchFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                branchFilter: selectedValues,
              });
            }}
            className="w-full"
            isSearchInput={true}
          />

          <MultiSelect
            options={getCombinedOptions(selectedDeliveryBoys, deliveryBoyOptions)}
            displayValue="label"
            placeholder="Search DeliveryBoy"
            selectedValues={filters.deliveryBoyFilter}
            onSelect={(selectedList: any) => {
              setSelectedDeliveryBoys(selectedList); 
              const selectedValues = selectedList.map((item: any) => item.value);
              updateFilters({
                ...filters,
                deliveryBoyFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              setSelectedDeliveryBoys(selectedList); 
              const selectedValues = selectedList.map((item: any) => item.value);
              updateFilters({
                ...filters,
                deliveryBoyFilter: selectedValues, 
              });
            }}
            setSearch={setDeliveryBoySearch}
            className="w-full"
            isSearchInput={true}
          />

          <MultiSelect
            options={getCombinedOptions(selectedPickupBoys, pickupBoyOptions)}
            displayValue="label"
            placeholder="Search PickupBoy"
            selectedValues={filters.pickupBoyFilter}
            onSelect={(selectedList: any) => {
              setSelectedPickupBoys(selectedList); 
              const selectedValues = selectedList.map((item: any) => item.value);
              updateFilters({
                ...filters,
                pickupBoyFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              setSelectedPickupBoys(selectedList); 
              const selectedValues = selectedList.map((item: any) => item.value);
              updateFilters({
                ...filters,
                pickupBoyFilter: selectedValues, 
              });
            }}
            setSearch={setPickupBoySearch}
            className="w-full"
            isSearchInput={true}
          />

          <MultiSelect
            options={paymentStatusOptions}
            displayValue="label"
            placeholder="Select Payment Status"
            selectedValues={filters.paymentStatusFilter}
            onSelect={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                paymentStatusFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                paymentStatusFilter: selectedValues,
              });
            }}
            sliceCount={2}
            isSearchInput={false}
            className="w-full"
          />

          <select
            className="select select-lg w-[200px] text-sm"
            value={filters.paymentTypeFilter}
            onChange={(e) => {
              updateFilters({
                ...filters,
                paymentTypeFilter: Number(e.target.value),
              });
            }}
          >
            <option value="" selected>
              Payment type
            </option>
            <option value={1}>Cash on Delivery</option>
            <option value={2}>Online Payment</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default OrderTableFilter;
