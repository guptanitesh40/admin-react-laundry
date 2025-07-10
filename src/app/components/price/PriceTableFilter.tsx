import React from "react";
import MultiSelect from "../MultiSelect/MultiSelect"; // Assuming you already have this component
import { useGetCategories, useGetProducts, useGetServices } from "../../hooks";

interface FilterOptions {
  categoryId: number[];
  productId: number[];
  serviceId: number[];
}

interface PriceTableFilterProps {
  filters: FilterOptions;
  updateFilters: (filters: FilterOptions) => void;
}

const PriceTableFilter: React.FC<PriceTableFilterProps> = ({
  filters,
  updateFilters,
}) => {
  const { categories } = useGetCategories(1, 1000);
  const { products } = useGetProducts(1, 1000);
  const { services } = useGetServices(1, 1000);
  return (
    <div className="p-3 border border-gray-200 rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MultiSelect
          options={categories?.map((category) => ({
            label: category?.name,
            value: category?.category_id,
          }))}
          displayValue="name"
          placeholder="Select Category"
          selectedValues={filters?.categoryId}
          onSelect={(selectedList: any) => {
            const selected = selectedList.map((item: any) => item.value);
            updateFilters({ ...filters, categoryId: selected });
          }}
          onRemove={(selectedList: any) => {
            const selected = selectedList.map((item: any) => item.value);
            updateFilters({ ...filters, categoryId: selected });
          }}
          className="w-full"
          isSearchInput={true}
        />

        <MultiSelect
          options={products?.map((product) => ({
            label: product?.name,
            value: product?.product_id,
          }))}
          displayValue="label"
          placeholder="Select Product"
          selectedValues={filters.productId}
          onSelect={(selectedList: any) => {
            const selected = selectedList.map((item: any) => item.value);
            updateFilters({ ...filters, productId: selected });
          }}
          onRemove={(selectedList: any) => {
            const selected = selectedList.map((item: any) => item.value);
            updateFilters({ ...filters, productId: selected });
          }}
          className="w-full"
          isSearchInput={true}
        />

        <MultiSelect
          options={services?.map((service) => ({
            label: service?.name,
            value: service?.service_id,
          }))}
          displayValue="label"
          placeholder="Select Service"
          selectedValues={filters.serviceId}
          onSelect={(selectedList: any) => {
            const selected = selectedList.map((item: any) => item.value);
            updateFilters({ ...filters, serviceId: selected });
          }}
          onRemove={(selectedList: any) => {
            const selected = selectedList.map((item: any) => item.value);
            updateFilters({ ...filters, serviceId: selected });
          }}
          className="w-full"
          isSearchInput={true}
        />
      </div>
    </div>
  );
};

export default PriceTableFilter;
