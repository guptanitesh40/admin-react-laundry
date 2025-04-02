import{j as e}from"./index-BdkURwdi.js";import{R as a,G as l}from"./enums-CdakGUf3.js";const s=JSON.parse(localStorage.getItem("user")),d=()=>e.jsx(e.Fragment,{children:e.jsxs("main",{className:"grow content",id:"content",role:"content",children:[e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Profile"})})})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5",children:e.jsx("div",{className:"col-span-1",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card min-w-full",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("h3",{className:"card-title",children:"Personal Info"}),e.jsx("div",{className:"text-gray-700",children:e.jsx("span",{className:"badge badge-lg badge-outline badge-danger",children:a[s.role_id]})})]}),e.jsx("div",{className:"card-table scrollable-x-auto pb-3",children:e.jsx("table",{className:"table align-middle text-sm text-gray-500",children:e.jsxs("tbody",{children:[!!s.image&&e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 min-w-28",children:"Photo"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:e.jsx("span",{className:"",children:e.jsx("img",{className:"h-14 w-14 rounded-full object-cover",src:s.image||"/media/images/blank.png",alt:"User profile"})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2",children:"Name"}),e.jsxs("td",{className:"py-2 text-gray-700 text-sm",children:[s.first_name," ",s.last_name]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 min-w-36",children:"Email"}),e.jsx("td",{className:"py-2 min-w-60",children:s.email})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 min-w-36",children:"Mobile Number"}),e.jsx("td",{className:"py-2 min-w-60",children:s.mobile_number})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-3",children:"Gender"}),e.jsx("td",{className:"py-3 text-gray-700 text-sm",children:l[s.gender]})]})]})})})]})})})})})]})});export{d as default};
