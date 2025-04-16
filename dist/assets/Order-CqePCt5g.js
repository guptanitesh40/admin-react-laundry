import{r as n,u as V,e as A,h as B,j as e,T as q,i as S,n as H,F as J,f as K,P as Q,s as X,b as Z,v as ee,R as se,w as ae}from"./index-B8RoWQko.js";import{u as te,a as re,O as le}from"./OrderTableFilter-xO4EKGfV.js";import{u as ne}from"./useGenerateInvoice-DVopGpmk.js";import{P as ce,O as ie}from"./enums-Dwyd47hm.js";import{S as _}from"./sweetalert2.esm.all-B0Dix5B2.js";import{g as P}from"./orderStatusClasses-HfHBGnti.js";import"./useGetBranches-FqqxxGXS.js";import"./MultiSelect-COYoOIqG.js";const de=({filters:a})=>{const[r,m]=n.useState(1),[i,f]=n.useState(10),[N,p]=V(),[t,v]=n.useState(null),[l,g]=n.useState(null),u=N.get("page"),x=N.get("perPage"),[c,y]=n.useState(""),[C,T]=n.useState(""),[D,O]=n.useState(""),[oe,me]=n.useState(),{orders:j,loading:$,count:k,fetchOrders:Y}=te(r,i,c,t,l,a.orderStatusFilter,a.customerFilter,a.branchFilter,a.pickupBoyFilter,a.deliveryBoyFilter,a.paymentTypeFilter,a.paymentStatusFilter),{deleteOrder:E}=re();ne();const{hasPermission:h}=A(),w=B(),I=Math.ceil(k/i);n.useEffect(()=>{u&&m(Number(u)),x&&f(Number(x))},[u,x]),n.useEffect(()=>{m(1),p(c!==""?{search:c,page:"1",perPage:i.toString()}:{})},[c]),n.useEffect(()=>{m(1),p(c!==""?{search:c,page:"1",perPage:i.toString()}:{})},[a.paymentStatusFilter,a.orderStatusFilter,a.paymentTypeFilter,a.customerFilter,a.pickupBoyFilter,a.deliveryBoyFilter,a.branchFilter]);const M=s=>{w(`/order/${s}`,{state:{from:"OrderTable"}})},R=async s=>{try{const{isConfirmed:o}=await _.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(o){const{success:F,message:b}=await E(s);F?(j.filter(G=>G.order_id!==s).length===0&&r>1&&(m(r-1),p({page:(r-1).toString(),perPage:i.toString()})),await Y(),_.fire(b)):_.fire(b)}}catch(o){_.fire({title:"Error",text:o.message,icon:"error"})}},z=s=>{w(`/order/edit/${s}`,{state:{prevUrl:location.pathname}})},L=async s=>{s.preventDefault();try{await X.validate({search:C},{abortEarly:!1}),y(C),O("")}catch(o){o instanceof Z&&O(o.errors[0])}},d=s=>{t===s?g(l==="ASC"?"DESC":"ASC"):(v(s),g("ASC"))},U=s=>{s>=1&&s<=I&&(m(s),p({page:s.toString(),perPage:i.toString()}))},W=s=>{const o=Number(s.target.value);f(o),m(1),p({page:"1",perPage:o.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:i,onChange:W,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:L,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:C,onChange:s=>{T(s.target.value),s.target.value===""&&y("")},placeholder:"Search...",className:"min-w-[185px]"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:D||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("span",{className:`sort ${t==="order_id"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${t==="first_name"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${t==="branch_name"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("branch_name"),children:[e.jsx("span",{className:"sort-label",children:"Assigned Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${t==="mobile_number"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:"Shipping Address"}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${t==="created_at"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("created_at"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${t==="estimated_pickup_time"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${t==="estimated_delivery_time"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${t==="coupon_code"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${t==="coupon_discount"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${t==="sub_total"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Bill Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[135px]",children:e.jsxs("span",{className:`sort ${t==="total"?l==="ASC"?"asc":"desc":""}`,onClick:()=>d("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Duo Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:"Payment type"}),(h(3,"read")||h(3,"update")||h(3,"delete"))&&e.jsx("th",{className:"w-[170px]",children:"Actions"})]})}),$?e.jsx(q,{}):j.length>0?e.jsx("tbody",{children:j.map(s=>{var b;const o=P(s.order_status_details.admin_label),F=P(s.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsxs("td",{className:"cursor-pointer",onClick:()=>w(`/order/${s.order_id}`),children:["#",s.order_id]}),e.jsx("td",{children:s.user.first_name+" "+s.user.last_name}),e.jsx("td",{children:(b=s==null?void 0:s.branch)==null?void 0:b.branch_name}),e.jsx("td",{children:e.jsx("span",{className:`${o} relative badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.admin_label})}),e.jsx("td",{children:s.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${F} badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:s.order_status_details.description})]})}),e.jsx("td",{children:s.user.mobile_number}),e.jsx("td",{children:s.address_details}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[S(s.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),S(s.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:S(s.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[S(s.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:s.coupon_code}),e.jsx("td",{children:s.coupon_discount}),e.jsx("td",{children:s.sub_total}),e.jsx("td",{children:s.total}),e.jsx("td",{children:ce[s.payment_type]}),(h(3,"update")||h(3,"delete")||h(3,"read"))&&e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[h(3,"read")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>M(s.order_id),children:e.jsx(H,{size:18,className:"text-gray-600"})}),h(3,"update")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>z(s.order_id),children:e.jsx(J,{className:"text-yellow-600"})}),h(3,"delete")&&e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>R(s.order_id),children:e.jsx(K,{className:"text-red-500"})})]})})]},s.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),e.jsx(Q,{count:k,currentPage:r,totalRecords:j==null?void 0:j.length,perPage:i,onPageChange:U,label:"orders"})]})})]})},ye=()=>{var u;const a=B(),r=ee(),[m,i]=n.useState(!1),{hasPermission:f}=A(),[N,p]=n.useState({paymentStatusFilter:[],orderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],pickupBoyFilter:[],deliveryBoyFilter:[],branchFilter:[]}),t=()=>{a("/order/add",{state:{prevUrl:r.pathname}})},v=x=>{p(x)};n.useEffect(()=>{var x;(x=r==null?void 0:r.state)!=null&&x.paymentType&&(i(!0),p(c=>({...c,paymentTypeFilter:r.state.paymentType==="Cash On Delivery"?1:2})))},[(u=r==null?void 0:r.state)==null?void 0:u.paymentType]);const g=(x=>Object.entries(ie).filter(([c])=>x.includes(c)).map(([c,y])=>({label:c,value:y})))(["Order Placed","Branch Assigned","Pickup Boy Assigned","Pickup Complete","Items Received at Branch","Workshop Assigned","Order Received at Workshop","Order Work In Progress","Order Completed","Ready for delivery","Cancelled By Admin","Cancelled By Customer"]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Orders"})}),f(3,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:t,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Order"]})})]}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>i(!m),children:["Filters",m?e.jsx(se,{size:23}):e.jsx(ae,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[m&&e.jsx(le,{filters:N,updateFilters:v,orderStatusOptions:g})," ",e.jsx(de,{filters:N})]})})})]})};export{ye as default};
