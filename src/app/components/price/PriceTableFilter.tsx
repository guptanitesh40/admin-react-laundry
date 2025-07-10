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
          isSearchInput={false}
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
          isSearchInput={false}
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
          isSearchInput={false}
        />
      </div>
    </div>
  );
};

export default PriceTableFilter;

// // components/filters/PriceTableFilter.tsx
// import React from "react";

// interface FilterOptions {
//   categoryId: number | null;
//   productId: number | null;
//   serviceId: number | null;
// }

// interface Option {
//   value: number;
//   label: string;
// }

// interface PriceTableFilterProps {
//   filters: FilterOptions;
//   updateFilters: (filters: FilterOptions) => void;
//   categories: Option[];
//   products: Option[];
//   services: Option[];
// }

// const PriceTableFilter: React.FC<PriceTableFilterProps> = ({
//   filters,
//   updateFilters,
//   categories,
//   products,
//   services,
// }) => {
//   return (
//     <div className="card p-3">
//       <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
//         <select
//           className="select select-bordered w-full"
//           value={filters.categoryId ?? ""}
//           onChange={(e) =>
//             updateFilters({
//               ...filters,
//               categoryId: Number(e.target.value) || null,
//             })
//           }
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat) => (
//             <option key={cat.value} value={cat.value}>
//               {cat.label}
//             </option>
//           ))}
//         </select>

//         <select
//           className="select select-bordered w-full"
//           value={filters.productId ?? ""}
//           onChange={(e) =>
//             updateFilters({
//               ...filters,
//               productId: Number(e.target.value) || null,
//             })
//           }
//         >
//           <option value="">Select Product</option>
//           {products.map((prod) => (
//             <option key={prod.value} value={prod.value}>
//               {prod.label}
//             </option>
//           ))}
//         </select>

//         <select
//           className="select select-bordered w-full"
//           value={filters.serviceId ?? ""}
//           onChange={(e) =>
//             updateFilters({
//               ...filters,
//               serviceId: Number(e.target.value) || null,
//             })
//           }
//         >
//           <option value="">Select Service</option>
//           {services.map((srv) => (
//             <option key={srv.value} value={srv.value}>
//               {srv.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default PriceTableFilter;
