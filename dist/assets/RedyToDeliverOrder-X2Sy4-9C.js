import{i as S,r as t,e as g,j as e,R as N,w as v}from"./index-BXIzzU16.js";import{O as y}from"./OrderTableFilter-DA-yk1jS.js";import{O}from"./OrderTable-o73W-rWN.js";import"./enums-B2C1EGNG.js";import"./MultiSelect-DibcVqIB.js";import"./orderStatusClasses-HfHBGnti.js";import"./useGenerateInvoice-CGsCiBw5.js";import"./sweetalert2.esm.all-B0Dix5B2.js";import"./AssignWorkshopModal-B2IGA2Xl.js";import"./useGetWorkshops-G-Gnx_vQ.js";const E=()=>{const n=S(),[s,c]=t.useState(!1),{hasPermission:d}=g(),[o,m]=t.useState([]),[r,u]=t.useState(null),[i,x]=t.useState(null),[p,a]=t.useState(null),[l,f]=t.useState({paymentStatusFilter:[],orderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],pickupBoyFilter:[],deliveryBoyFilter:[],branchFilter:[]}),j=()=>{n("/order/add",{state:{prevUrl:location.pathname}})},h=F=>{f(F)},b=()=>{i&&a(i)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Delivered Orders"})}),d(3,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:j,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Order"]})})]}),e.jsxs("div",{className:"flex flex-auto items-center justify-between gap-2.5 mb-4 shadow-none",children:[e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>c(!s),children:["Filters",s?e.jsx(N,{size:23}):e.jsx(v,{color:"skyblue",size:23})]}),r&&e.jsx("button",{className:"btn btn-sm btn-outline btn-success",onClick:b,children:r})]})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[s&&e.jsx(y,{filters:l,updateFilters:h,showOrderStatusFilter:!1})," ",e.jsx(O,{filters:l,setSelectedOrderIds:m,selectedOrderIds:o,setNextStatus:u,selectedStatus:i,setSelectedStatus:x,nextStatus:r,trackingState:p,setTrackingState:a})]})})})]})};export{E as default};
