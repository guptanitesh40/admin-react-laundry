import{a0 as r,h as n,j as e,T as c,F as x}from"./index-D4IHe3Uq.js";const o=()=>{const{rolesData:s,loading:l}=r(),t=n(),i=(a,d)=>{t("/user-permissions",{state:{role:a,role_id:d}})};return e.jsx("div",{className:"card-body",children:e.jsx("div",{"data-datatable":"true","data-datatable-page-size":"10",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[600px]",children:"Roles"}),e.jsx("th",{children:"Actions"})]})}),l?e.jsx(c,{}):s?e.jsx("tbody",{children:s.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.name}),e.jsx("td",{children:e.jsx("div",{className:"flex justify-self-center gap-2.5",children:e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full","aria-label":"Edit",onClick:()=>i(a.name,a.role_id),children:e.jsx(x,{className:"text-yellow-600"})})})})]},a.role_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No Roles data available"})})})]})})})})},j=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Roles List"})})})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(o,{})})})})]});export{j as default};
