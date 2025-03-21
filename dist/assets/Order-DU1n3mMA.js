import{r as l,u as V,e as A,h as B,j as e,T as q,i as y,n as H,F as J,f as K,P as Q,s as X,b as Z,v as ee}from"./index-D4IHe3Uq.js";import{u as se,a as ae,O as te}from"./OrderTableFilter-DtboF05c.js";import{u as re}from"./useGenerateInvoice-DSezbkX4.js";import{P as le,O as ne}from"./enums-CdakGUf3.js";import{S as _}from"./sweetalert2.esm.all-B0Dix5B2.js";import{g as F}from"./orderStatusClasses-HfHBGnti.js";import{R as ce,a as ie}from"./index-BF63KoAt.js";import"./useGetBranches-BdYbUjr5.js";import"./MultiSelect-CGMnjgJl.js";const de=({filters:m})=>{const[t,p]=l.useState(1),[i,f]=l.useState(10),[N,h]=V(),[a,v]=l.useState(null),[r,b]=l.useState(null),u=N.get("page"),d=N.get("perPage"),[o,S]=l.useState(""),[C,D]=l.useState(""),[T,k]=l.useState(""),[oe,me]=l.useState(),{orders:j,loading:$,count:P,fetchOrders:Y}=se(t,i,o,a,r,m.orderStatusFilter,m.customerFilter,m.branchFilter,m.pickupBoyFilter,m.deliveryBoyFilter,m.paymentTypeFilter,m.paymentStatusFilter),{deleteOrder:E}=ae();re();const{hasPermission:x}=A(),w=B(),I=Math.ceil(P/i);l.useEffect(()=>{u&&p(Number(u)),d&&f(Number(d))},[u,d]),l.useEffect(()=>{o&&(p(1),h({search:o,page:"1",perPage:i.toString()}))},[o]);const M=s=>{w(`/order/${s}`,{state:{from:"OrderTable"}})},R=async s=>{try{const{isConfirmed:c}=await _.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(c){const{success:O,message:g}=await E(s);O?(j.filter(G=>G.order_id!==s).length===0&&t>1&&(p(t-1),h({page:(t-1).toString(),perPage:i.toString()})),await Y(),_.fire(g)):_.fire(g)}}catch(c){_.fire({title:"Error",text:c.message,icon:"error"})}},z=s=>{w(`/order/edit/${s}`,{state:{prevUrl:location.pathname}})},L=async s=>{s.preventDefault();try{await X.validate({search:C},{abortEarly:!1}),S(C),k("")}catch(c){c instanceof Z&&k(c.errors[0])}},n=s=>{a===s?b(r==="ASC"?"DESC":"ASC"):(v(s),b("ASC"))},U=s=>{s>=1&&s<=I&&(p(s),h({page:s.toString(),perPage:i.toString()}))},W=s=>{const c=Number(s.target.value);f(c),p(1),h({page:"1",perPage:c.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:i,onChange:W,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:L,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:C,onChange:s=>{D(s.target.value),s.target.value===""&&S("")},placeholder:"Search...",className:"min-w-[185px]"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:T||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("span",{className:`sort ${a==="order_id"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${a==="first_name"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${a==="branch_name"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("branch_name"),children:[e.jsx("span",{className:"sort-label",children:"Assigned Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${a==="mobile_number"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:"Shipping Address"}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${a==="created_at"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("created_at"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${a==="estimated_pickup_time"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${a==="estimated_delivery_time"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${a==="coupon_code"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${a==="coupon_discount"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${a==="sub_total"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Bill Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[135px]",children:e.jsxs("span",{className:`sort ${a==="total"?r==="ASC"?"asc":"desc":""}`,onClick:()=>n("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Duo Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:"Payment type"}),(x(3,"read")||x(3,"update")||x(3,"delete"))&&e.jsx("th",{className:"w-[170px]",children:"Actions"})]})}),$?e.jsx(q,{}):j.length>0?e.jsx("tbody",{children:j.map(s=>{var g;const c=F(s.order_status_details.admin_label),O=F(s.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsxs("td",{className:"cursor-pointer",onClick:()=>w(`/order/${s.order_id}`),children:["#",s.order_id]}),e.jsx("td",{children:s.user.first_name+" "+s.user.last_name}),e.jsx("td",{children:(g=s==null?void 0:s.branch)==null?void 0:g.branch_name}),e.jsx("td",{children:e.jsx("span",{className:`${c} relative badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.admin_label})}),e.jsx("td",{children:s.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${O} badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:s.order_status_details.description})]})}),e.jsx("td",{children:s.user.mobile_number}),e.jsx("td",{children:s.address_details}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[y(s.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),y(s.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:y(s.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[y(s.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:s.coupon_code}),e.jsx("td",{children:s.coupon_discount}),e.jsx("td",{children:s.sub_total}),e.jsx("td",{children:s.total}),e.jsx("td",{children:le[s.payment_type]}),(x(3,"update")||x(3,"delete")||x(3,"read"))&&e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[x(3,"read")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>M(s.order_id),children:e.jsx(H,{size:18,className:"text-gray-600"})}),x(3,"update")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>z(s.order_id),children:e.jsx(J,{className:"text-yellow-600"})}),x(3,"delete")&&e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>R(s.order_id),children:e.jsx(K,{className:"text-red-500"})})]})})]},s.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),e.jsx(Q,{count:P,currentPage:t,totalRecords:j==null?void 0:j.length,perPage:i,onPageChange:U,label:"orders"})]})})]})},ye=()=>{var u;const m=B(),t=ee(),[p,i]=l.useState(!1),{hasPermission:f}=A(),[N,h]=l.useState({paymentStatusFilter:[],orderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],pickupBoyFilter:[],deliveryBoyFilter:[],branchFilter:[]}),a=()=>{m("/order/add",{state:{prevUrl:t.pathname}})},v=d=>{h(d)};l.useEffect(()=>{var d;(d=t==null?void 0:t.state)!=null&&d.paymentType&&(i(!0),h(o=>({...o,paymentTypeFilter:t.state.paymentType==="Cash On Delivery"?1:2})))},[(u=t==null?void 0:t.state)==null?void 0:u.paymentType]);const b=(d=>Object.entries(ne).filter(([o])=>d.includes(o)).map(([o,S])=>({label:o,value:S})))(["Order Placed","Branch Assigned","Pickup Boy Assigned","Pickup Complete","Items Received at Branch","Workshop Assigned","Order Received at Workshop","Order Work In Progress","Order Completed","Ready for delivery","Cancelled By Admin","Cancelled By Customer"]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Orders"})}),f(3,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:a,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Order"]})})]}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>i(!p),children:["Filters",p?e.jsx(ce,{size:23}):e.jsx(ie,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[p&&e.jsx(te,{filters:N,updateFilters:v,orderStatusOptions:b})," ",e.jsx(de,{filters:N})]})})})]})};export{ye as default};
