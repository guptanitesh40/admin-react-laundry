import React, { useEffect, useState, useRef } from "react";
import { useGetBranches } from "../../hooks";
import { OrderStatus, PaymentStatus } from "../../../types/enums";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import MultiSelect from "../MultiSelect/MultiSelect";
import { getOrderStatusLabel } from "../../utils/orderStatusClasses";

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
  const [customerOptions, setCustomerOptions] = useState<OptionType[]>([]);
  const [pickupBoyOptions, setPickupBoyOptions] = useState<OptionType[]>([]);
  const [deliveryBoyOptions, setDeliveryBoyOptions] = useState<OptionType[]>(
    []
  );

  const [customerSearch, setCustomerSearch] = useState("");
  const { branches } = useGetBranches();
  const { fetchUsersByRole } = useGetUsersByRole();

  const orderStatusOptions = Object.entries(OrderStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));
  const paymentStatusOptions = Object.entries(PaymentStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));

  useEffect(() => {
    const fetchCustomer = async () => {
      const customers = await fetchUsersByRole(5, customerSearch);
      const formattedOptions = customers?.map((user: any) => ({
        label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
        value: user.user_id,
      }));
      setCustomerOptions(formattedOptions);
    };
    if (customerSearch) {
      fetchCustomer();
    }
  }, [customerSearch]);

  useEffect(() => {
    const fetchPickupBoy = async () => {
      const pickupBoys = await fetchUsersByRole(4);
      const formattedOptions = pickupBoys?.map((user: any) => ({
        label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
        value: user.user_id,
      }));
      setPickupBoyOptions(formattedOptions);
    };

    const fetchDeliveryBoy = async () => {
      const deliveryBoys = await fetchUsersByRole(4);
      const formattedOptions = deliveryBoys?.map((user: any) => ({
        label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
        value: user.user_id,
      }));
      setDeliveryBoyOptions(formattedOptions);
    };

    fetchPickupBoy();
    fetchDeliveryBoy();
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <MultiSelect
            options={customerOptions}
            displayValue="label"
            placeholder="Search Customer"
            selectedValues={filters.customerFilter}
            onSelect={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                customerFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                customerFilter: selectedValues,
              });
            }}
            setSearch={setCustomerSearch}
            className="w-full"
          />

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
          />

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
          />

          <MultiSelect
            options={deliveryBoyOptions}
            displayValue="label"
            placeholder="Search DeliveryBoy"
            selectedValues={filters.deliveryBoyFilter}
            onSelect={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                deliveryBoyFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                deliveryBoyFilter: selectedValues,
              });
            }}
            className="w-full"
          />

          <MultiSelect
            options={pickupBoyOptions}
            displayValue="label"
            placeholder="Search PickupBoy"
            selectedValues={filters.pickupBoyFilter}
            onSelect={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                pickupBoyFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                pickupBoyFilter: selectedValues,
              });
            }}
            className="w-full"
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
