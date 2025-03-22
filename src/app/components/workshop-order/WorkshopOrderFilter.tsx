import React, { useEffect, useState } from "react";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import { useGetBranches, useGetWorkshops } from "../../hooks";
import { PaymentStatus, WorkshopOrderStatus } from "../../../types/enums";
import MultiSelect from "../MultiSelect/MultiSelect";

interface OptionType {
  label: string;
  value: number;
}

interface WorkshopOrderFilterProps {
  filters: {
    paymentStatusFilter: number[];
    workshopOrderStatusFilter: number[];
    paymentTypeFilter: number;
    customerFilter: number[];
    branchFilter: number[];
    workshopFilter: number[];
    workshopManagerFilter: number[];
  };
  updateFilters: (filters: any) => void;
  workshopOrderStatusOptions: any;
}

const WorkshopOrderFilter: React.FC<WorkshopOrderFilterProps> = ({
  filters,
  updateFilters,
  workshopOrderStatusOptions,
}) => {
  const [allCustomerOptions, setAllCustomerOptions] = useState<OptionType[]>(
    []
  );
  const [customerOptions, setCustomerOptions] = useState<OptionType[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<OptionType[]>([]);

  const [allWorkshopManagerOptions, setAllWorkshopManagerOptions] = useState<
    OptionType[]
  >([]);
  const [workshopManagerOptions, setWorkshopManagerOptions] = useState<
    OptionType[]
  >([]);
  const [selectedWorkshopManagers, setSelectedWorkshopManagers] = useState<
    OptionType[]
  >([]);

  const [customerSearch, setCustomerSearch] = useState("");
  const [workshopManagerSearch, setWorkshopManagerSearch] = useState("");

  const { fetchUsersByRole } = useGetUsersByRole();
  const { branches } = useGetBranches();
  const { workshops } = useGetWorkshops(1, 1000);

  const paymentStatusOptions = Object.entries(PaymentStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));

  useEffect(() => {
    const fetchInitialUsers = async () => {
      const customers = await fetchUsersByRole(5);
      const workshopManagers = await fetchUsersByRole(6);

      const formatOptions = (users: any[]) =>
        users.map((user) => ({
          label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
          value: user.user_id,
        }));

      setAllCustomerOptions(formatOptions(customers));
      setAllWorkshopManagerOptions(formatOptions(workshopManagers));
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
      const workshopManagers = await fetchUsersByRole(6, workshopManagerSearch);
      const formattedOptions = workshopManagers.map((user: any) => ({
        label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
        value: user.user_id,
      }));

      setWorkshopManagerOptions(formattedOptions);
    };

    if (workshopManagerSearch) {
      fetchFilteredUsers();
    } else {
      setWorkshopManagerOptions(allWorkshopManagerOptions);
    }
  }, [workshopManagerOptions, allWorkshopManagerOptions]);

  const getCombinedOptions = (
    selectedOptions: OptionType[],
    filteredOptions: OptionType[]
  ): OptionType[] => [
    ...selectedOptions.filter(
      (selected) =>
        !filteredOptions.some((option) => option.value === selected.value)
    ),
    ...filteredOptions,
  ];

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <MultiSelect
            options={workshops?.map((workshop) => ({
              label: workshop.workshop_name,
              value: workshop.workshop_id,
            }))}
            displayValue="label"
            placeholder="Select Workshop"
            selectedValues={filters.workshopFilter}
            onSelect={(selectedList) =>
              updateFilters({
                ...filters,
                workshopFilter: selectedList.map((item) => item.value),
              })
            }
            onRemove={(selectedList) =>
              updateFilters({
                ...filters,
                workshopFilter: selectedList.map((item) => item.value),
              })
            }
            className="w-full"
          />

          <MultiSelect
            options={getCombinedOptions(
              selectedWorkshopManagers,
              workshopManagerOptions
            )}
            displayValue="label"
            placeholder="Select Workshop Manager"
            selectedValues={filters.workshopManagerFilter}
            onSelect={(selectedList: any) => {
              setSelectedWorkshopManagers(selectedList);
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                workshopManagerFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              setSelectedWorkshopManagers(selectedList);
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                workshopManagerFilter: selectedValues,
              });
            }}
            className="w-full"
          />

          <MultiSelect
            options={getCombinedOptions(selectedCustomers, customerOptions)}
            displayValue="label"
            placeholder="Search Customer"
            selectedValues={selectedCustomers.map((customer) => customer.value)}
            onSelect={(selectedList: any) => {
              setSelectedCustomers(selectedList);
              const selectedValues = selectedList.map(
                (item: any) => item.value
              );
              updateFilters({
                ...filters,
                customerFilter: selectedValues,
              });
            }}
            onRemove={(selectedList: any) => {
              setSelectedCustomers(selectedList);
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
            isSearchInput={true}
          />

          <MultiSelect
            options={branches?.map((branch) => ({
              label: branch.branch_name,
              value: branch.branch_id,
            }))}
            displayValue="label"
            placeholder="Select Branch"
            selectedValues={filters.branchFilter}
            onSelect={(selectedList) =>
              updateFilters({
                ...filters,
                branchFilter: selectedList.map((item) => item.value),
              })
            }
            onRemove={(selectedList) =>
              updateFilters({
                ...filters,
                branchFilter: selectedList.map((item) => item.value),
              })
            }
            className="w-full"
          />

          <MultiSelect
            options={workshopOrderStatusOptions}
            displayValue="label"
            placeholder="Select Order Status"
            selectedValues={filters.workshopOrderStatusFilter}
            onSelect={(selectedList) =>
              updateFilters({
                ...filters,
                workshopOrderStatusFilter: selectedList.map(
                  (item) => item.value
                ),
              })
            }
            onRemove={(selectedList) =>
              updateFilters({
                ...filters,
                workshopOrderStatusFilter: selectedList.map(
                  (item) => item.value
                ),
              })
            }
            isCustomLabel={true}
            isSearchInput={false}
            className="w-full"
          />

          <MultiSelect
            options={paymentStatusOptions}
            displayValue="label"
            placeholder="Select Payment Status"
            selectedValues={filters.paymentStatusFilter}
            onSelect={(selectedList) =>
              updateFilters({
                ...filters,
                paymentStatusFilter: selectedList.map((item) => item.value),
              })
            }
            onRemove={(selectedList) =>
              updateFilters({
                ...filters,
                paymentStatusFilter: selectedList.map((item) => item.value),
              })
            }
            isSearchInput={false}
            sliceCount={2}
            className="w-full"
          />

          <select
            className="select select-lg w-[200px] text-sm"
            value={filters.paymentTypeFilter || ""}
            onChange={(e) =>
              updateFilters({
                ...filters,
                paymentTypeFilter: Number(e.target.value),
              })
            }
          >
            <option value="">Payment type</option>
            <option value={1}>Cash on Delivery</option>
            <option value={2}>Online Payment</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default WorkshopOrderFilter;
