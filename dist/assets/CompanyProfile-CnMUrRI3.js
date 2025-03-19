import{j as e,i,h as d,r as c,m as n,o as x}from"./index-D9FLaJ7A.js";import{a as m}from"./enums-CdakGUf3.js";import{u as h}from"./useGetCompany-mWC0MCT3.js";import{u as j}from"./useGetBranchesOnId-BFJRDvQf.js";const o=({company:s})=>e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card min-w-full",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Company Info"})}),e.jsx("div",{className:"card-table scrollable-x-auto pb-3",children:e.jsx("table",{className:"table align-middle text-sm text-gray-500",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Company Name"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.company_name})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Company Owner"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.company_owner_name})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Company owned by "}),e.jsx("td",{className:"py-2 text-gray-700",children:m[s.company_ownedby]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Address"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.address})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"City"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.city})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"State"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.state})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Zip Code"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.zip_code})]})]})})})]})}),N=({company:s})=>e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card min-w-full",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Contact Info"})}),e.jsx("div",{className:"card-table scrollable-x-auto pb-3",children:e.jsx("table",{className:"table align-middle text-sm text-gray-500",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Phone No 1"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.phone_number})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Phone No 2"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.mobile_number})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Email"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.email})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Website"}),e.jsx("td",{className:"py-2 text-gray-700",children:e.jsx("a",{href:s.website,target:"_blank",rel:"noopener noreferrer",children:s.website})})]})]})})})]})}),g=({company:s})=>{const l=i(s.registration_date).format("MM-DD-YYYY");return e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card min-w-full",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Registration Info"})}),e.jsx("div",{className:"card-table scrollable-x-auto pb-3",children:e.jsx("table",{className:"table align-middle text-sm text-gray-500",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Registration Number"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.registration_number})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Registration Date"}),e.jsx("td",{className:"py-2 text-gray-700",children:l})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"GSTIN"}),e.jsx("td",{className:"py-2 text-gray-700",children:s.gstin})]})]})})})]})})},p=({company_id:s})=>{const{branches:l,fetchBranchesOnId:a}=j(),t=d();if(c.useEffect(()=>{a(s)},[s]),!!l)return e.jsx("div",{className:"mt-5",children:e.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5",children:e.jsx("div",{className:"col-span-2",children:e.jsx("div",{className:"flex flex-col gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card min-w-full",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Branches"})}),e.jsx("div",{className:"card-table scrollable-x-auto pb-3",children:e.jsxs("table",{className:"table align-middle text-sm text-gray-500",id:"general_info_table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-56",children:"Branch Name"}),e.jsx("th",{className:"min-w-48 w-full text-gray-700",children:"Branch Address"}),e.jsx("th",{className:"min-w-16 text-center",children:"Actions"})]})}),e.jsx("tbody",{children:l.length>0?l.map(r=>e.jsxs("tr",{children:[e.jsx("td",{className:"min-w-56",children:r.branch_name}),e.jsx("td",{className:"min-w-48 w-full text-gray-700",children:r.branch_address}),e.jsx("td",{className:"min-w-16 text-center",children:e.jsxs("span",{className:"btn btn-sm btn-secondary",onClick:()=>t(`/branch-profile/${r.branch_id}`),children:[e.jsx("i",{className:"ki-filled ki-search-list"}),"View"]})})]},r.branch_id)):e.jsx("tr",{children:e.jsx("td",{colSpan:3,className:"text-center text-gray-700",children:"No Branches Available"})})})]})})]})})})})})},u=()=>{const{id:s}=n(),l=Number(s),{company:a,loading:t,fetchCompany:r}=h();return c.useEffect(()=>{r(l)},[l]),t?e.jsx(x,{}):!t&&!a?e.jsx("p",{children:"No company data available."}):e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("div",{className:"bg-center bg-cover bg-no-repeat hero-bg",children:e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-col items-center gap-2 lg:gap-3.5 py-4 lg:pt-5 lg:pb-10",children:[e.jsx("div",{className:"flex overflow-hidden items-center justify-center rounded-full border-2 border-success-clarity size-[100px] shrink-0 bg-light",children:e.jsx("img",{className:"rounded object-cover w-full h-full",src:a.logo,alt:a.company_name})}),e.jsx("div",{className:"flex items-center gap-1.5",children:e.jsx("div",{className:"text-lg leading-5 font-semibold text-gray-900",children:a.company_name})}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-1 lg:gap-4.5 text-sm",children:[e.jsxs("div",{className:"flex gap-1.25 items-center",children:[e.jsx("i",{className:"ki-filled ki-geolocation text-gray-500 text-sm"}),e.jsxs("span",{className:"text-gray-600",children:[a.city,", ",a.state]})]}),e.jsxs("div",{className:"flex gap-1.25 items-center",children:[e.jsx("i",{className:"ki-filled ki-sms text-gray-500 text-sm"}),e.jsx("a",{className:"text-gray-600 hover:text-primary",href:`mailto:${a.email}`,children:a.email})]}),e.jsxs("div",{className:"flex gap-1.25 items-center",children:[e.jsx("i",{className:"ki-filled ki-link text-gray-500 text-sm"}),e.jsx("a",{className:"text-gray-600 hover:text-primary",href:a.website,target:"_blank",rel:"noopener noreferrer",children:a.website})]})]})]})})}),e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5",children:[e.jsx(o,{company:a}),e.jsx(N,{company:a}),e.jsx(g,{company:a})]}),e.jsx(p,{company_id:a.company_id})]})]})})};export{u as default};
