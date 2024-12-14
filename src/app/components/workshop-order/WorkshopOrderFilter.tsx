import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import Multiselect from "multiselect-react-dropdown";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import { useGetBranches, useGetWorkshops } from "../../hooks";
import {
  PaymentStatus,
  WorkshopOrderStatus,
} from "../../../types/enums";

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
  const [customerOptions, setOptions] = useState<OptionType[]>([]);

  const { fetchUsersByRole, users } = useGetUsersByRole();
  const { branches, fetchBranches } = useGetBranches();
  const { fetchWorkshops, workshops } = useGetWorkshops(1, 1000);

  const paymentStatusOptions = Object.entries(PaymentStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));
  const orderStatusOptions = Object.entries(WorkshopOrderStatus)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));
    
  useEffect(() => {
    const fetchData = async () => {
      fetchBranches();
      fetchUsersByRole(6);
      fetchWorkshops();
    };
    fetchData();
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

  const handleFilterChange = (filterName: string, value: any) => {
    updateFilters({
      ...filters,
      [filterName]: value,
    });
  };

  return (
    <div className="card-header flex-wrap gap-2">
      <div className="flex flex-wrap gap-2">
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
          onInputChange={(inputValue: string) => setCustomerSearch(inputValue)}
          isMulti
          placeholder="Search and select customers"
          className="custom-select-container"
          classNamePrefix="custom-select"
        />
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
            filters.workshopOrderStatusFilter?.includes(option.value)
          )}
          placeholder="Order status"
          onSelect={(selectedList) => {
            handleFilterChange(
              "workshopOrderStatusFilter",
              selectedList.map((item: any) => item.value)
            );
          }}
          onRemove={(selectedList) => {
            handleFilterChange(
              "workshopOrderStatusFilter",
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
        <Multiselect
          options={workshops?.map((workshop) => ({
            workshop_id: workshop.workshop_id,
            workshop_name: workshop.workshop_name,
          }))}
          displayValue="workshop_name"
          selectedValues={workshops?.filter((option) =>
            filters.workshopFilter?.includes(option.workshop_id)
          )}
          placeholder="Workshop"
          onSelect={(selectedList) => {
            handleFilterChange(
              "workshopFilter",
              selectedList.map((item: any) => item.workshop_id)
            );
          }}
          onRemove={(selectedList) => {
            handleFilterChange(
              "workshopFilter",
              selectedList.map((item: any) => item.workshop_id)
            );
          }}
          className="multiselect-container multiselect min-w-[430px] max-w-[480px]"
        />
        <Multiselect
          options={users?.map((user: any) => ({
            workshop_manager_id: user.user_id,
            user_name: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
          }))}
          displayValue="user_name"
          selectedValues={users
            ?.filter((user: any) =>
              filters.workshopManagerFilter?.includes(user.user_id)
            )
            .map((user: any) => ({
              workshop_manager_id: user.user_id,
              user_name: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
            }))}
          placeholder="Workshop manager name"
          onSelect={(selectedList) => {
            handleFilterChange(
              "workshopManagerFilter",
              selectedList.map((item: any) => item.workshop_manager_id)
            );
          }}
          onRemove={(selectedList) => {
            handleFilterChange(
              "workshopManagerFilter",
              selectedList.map((item: any) => item.workshop_manager_id)
            );
          }}
          className="multiselect-container multiselect min-w-[430px] h-[10px] max-w-[480px]"
        />
      </div>
      <select
        className="select select-lg w-[200px] text-sm mt-2"
        value={filters.paymentTypeFilter}
        onChange={(e) => {
          handleFilterChange("paymentTypeFilter", Number(e.target.value));
        }}
      >
        <option value="" selected>
          Payment type
        </option>
        <option value={1}>Cash on Delivery</option>
        <option value={2}>Online Payment</option>
      </select>
    </div>
  );
};

export default WorkshopOrderFilter;
