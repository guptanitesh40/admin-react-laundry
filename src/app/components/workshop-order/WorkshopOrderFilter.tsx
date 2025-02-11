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
}

const WorkshopOrderFilter: React.FC<WorkshopOrderFilterProps> = ({
  filters,
  updateFilters,
}) => {
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerOptions, setCustomerOptions] = useState<OptionType[]>([]);
  const [workshopManagers, setWorkshopManagers] = useState<OptionType[]>([]);

  const { fetchUsersByRole } = useGetUsersByRole();
  const { branches } = useGetBranches();
  const { workshops } = useGetWorkshops(1, 1000);

  const paymentStatusOptions = Object.entries(PaymentStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));

  const orderStatusOptions = Object.entries(WorkshopOrderStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));

  useEffect(() => {
    const fetchManagers = async () => {
      const managers = await fetchUsersByRole(6);
      if (managers) {
        const formattedOptions = managers.map((manager: any) => ({
          label: `${manager.first_name} ${manager.last_name} (${manager.mobile_number})`,
          value: manager.user_id,
        }));
        setWorkshopManagers(formattedOptions);
      }
    };
    fetchManagers();
  }, []);

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
            options={workshopManagers}
            displayValue="label"
            placeholder="Search Workshop Manager"
            selectedValues={filters.workshopManagerFilter}
            onSelect={(selectedList) =>
              updateFilters({
                ...filters,
                workshopManagerFilter: selectedList.map((item) => item.value),
              })
            }
            onRemove={(selectedList) =>
              updateFilters({
                ...filters,
                workshopManagerFilter: selectedList.map((item) => item.value),
              })
            }
            className="w-full"
          />

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
            options={orderStatusOptions}
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
            isSearchInput={false}
            sliceCount={2}
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
            className="select select-lg w-[200px] text-sm mt-4"
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
