import { useEffect, useState } from "react";
import { Gender, Role } from "../../../types/enums";
import { useGetBranchesOnId, useGetCompanies } from "../../hooks";
import MultiSelect from "../MultiSelect/MultiSelect";

interface UserFilterProps {
  filters: {
    genderFilter: number[];
    roleFilter: number[];
    companyFilter: number[];
    branchFilter: number[];
  };
  updateFilters: (filters: any) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ filters, updateFilters }) => {
  const { branches, fetchBranchesOnId } = useGetBranchesOnId();
  const { companies } = useGetCompanies(1, 1000);

  const [selectedCompanies, setSelectedCompanies] = useState<number[]>();

  useEffect(() => {
    fetchBranchesOnId(selectedCompanies);
  }, [selectedCompanies]);

  const genderOptions = Object.entries(Gender)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));

  const roleOptions = Object.entries(Role)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));

  useEffect(() => {
    if (filters.companyFilter) {
      setSelectedCompanies(filters.companyFilter);
    }
  }, [filters.companyFilter]);

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4">
        <div className="w-full flex flex-col md:flex-row gap-3">
          <MultiSelect
            options={genderOptions}
            displayValue="label"
            placeholder="Select Gender"
            selectedValues={filters.genderFilter}
            onSelect={(selectedList) => {
              const selectedValues = selectedList.map((item) => item.value);
              updateFilters({
                ...filters,
                genderFilter: selectedValues,
              });
            }}
            onRemove={(selectedList) => {
              const selectedValues = selectedList.map((item) => item.value);
              updateFilters({
                ...filters,
                genderFilter: selectedValues,
              });
            }}
            className="basis-1/4"
          />

          <MultiSelect
            options={roleOptions}
            displayValue="label"
            placeholder="Select Role"
            selectedValues={filters.roleFilter}
            onSelect={(selectedList) => {
              const selectedValues = selectedList.map((item) => item.value);
              updateFilters({
                ...filters,
                roleFilter: selectedValues,
              });
            }}
            onRemove={(selectedList) => {
              const selectedValues = selectedList.map((item) => item.value);
              updateFilters({
                ...filters,
                roleFilter: selectedValues,
              });
            }}
            className="basis-1/4"
          />

          <MultiSelect
            options={companies?.map((company) => ({
              label: company.company_name,
              value: company.company_id,
            }))}
            displayValue="company_name"
            placeholder="Select Company"
            selectedValues={filters.companyFilter}
            onSelect={(selectedList) => {
              const selectedValues = selectedList.map((item) => item.value);
              updateFilters({
                ...filters,
                companyFilter: selectedValues,
              });
            }}
            onRemove={(selectedList) => {
              const selectedValues = selectedList.map((item) => item.value);
              updateFilters({
                ...filters,
                companyFilter: selectedValues,
              });
            }}
            className="basis-1/4"
          />

          <MultiSelect
            options={branches?.map(
              (branch: { branch_name: any; branch_id: any }) => ({
                label: branch.branch_name,
                value: branch.branch_id,
              })
            )}
            displayValue="branch_name"
            placeholder="Select Branch"
            selectedValues={filters.branchFilter}
            onSelect={(selectedList) => {
              const selectedValues = selectedList.map((item) => item.value);
              updateFilters({
                ...filters,
                branchFilter: selectedValues,
              });
            }}
            onRemove={(selectedList) => {
              const selectedValues = selectedList.map((item) => item.value);
              updateFilters({
                ...filters,
                branchFilter: selectedValues,
              });
            }}
            {...(!filters?.companyFilter || filters?.companyFilter.length === 0
              ? { defaultOption: "Please select branch" }
              : branches && branches?.length === 0
              ? { noDataAvailableLabel: "No Branch Available" }
              : {})}
            className="basis-1/4"
          />
        </div>
      </div>
    </>
  );
};

export default UserFilter;
