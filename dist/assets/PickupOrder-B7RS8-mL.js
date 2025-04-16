import{i as N,r as t,e as k,j as e,R as y,w as v}from"./index-Bh52HvmB.js";import{O as w}from"./OrderTableFilter-D5qbba63.js";import{O as P}from"./enums-B2C1EGNG.js";import{O as A}from"./OrderTable-nT4091ca.js";import"./MultiSelect-DYHkeFZ0.js";import"./orderStatusClasses-HfHBGnti.js";import"./useGenerateInvoice-BGf8Rizt.js";import"./sweetalert2.esm.all-B0Dix5B2.js";import"./DueDetailsModel-DSSJGv0R.js";import"./useGetWorkshops-D8uA11xE.js";const H=()=>{const d=N(),[s,o]=t.useState(!1),{hasPermission:u}=k(),[m,p]=t.useState([]),[r,x]=t.useState(null),[i,f]=t.useState(null),[h,n]=t.useState(null),[c,j]=t.useState({paymentStatusFilter:[],orderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],pickupBoyFilter:[],deliveryBoyFilter:[],branchFilter:[]}),S=()=>{d("/order/add",{state:{prevUrl:location.pathname}})},b=a=>{j(a)},O=(a=>Object.entries(P).filter(([l])=>a.includes(l)).map(([l,F])=>({label:l,value:F})))(["Order Placed","Branch Assigned","Pickup Boy Assigned","Pickup Complete"]),g=()=>{i&&n(i)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Pickup Orders"})}),u(3,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:S,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Order"]})})]}),e.jsxs("div",{className:"flex flex-auto items-center justify-between gap-2.5 mb-4 shadow-none",children:[e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>o(!s),children:["Filters",s?e.jsx(y,{size:23}):e.jsx(v,{color:"skyblue",size:23})]}),r&&e.jsx("button",{className:"btn btn-sm btn-outline btn-success",onClick:g,children:r})]})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[s&&e.jsx(w,{filters:c,updateFilters:b,orderStatusOptions:O,showSearchInput:!1})," ",e.jsx(A,{filters:c,setSelectedOrderIds:p,selectedOrderIds:m,setNextStatus:x,selectedStatus:i,setSelectedStatus:f,nextStatus:r,trackingState:h,setTrackingState:n})]})})})]})};export{H as default};
