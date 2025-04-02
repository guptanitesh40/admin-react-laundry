import{r as i,u as Q,g as D,j as e,k as W,F as X,b as Z,d as ee,e as se,V as ae,R as te,p as le}from"./index-BsXSBe6J.js";import{s as ne}from"./searchSchema-B8jfaWv1.js";import{u as re,a as ie,O as ce}from"./OrderTableFilter-mZ4_1Jcs.js";import{u as de}from"./useGenerateInvoice-DJQfj-mT.js";import{L as oe}from"./Loading-Bxglv2Pm.js";import{T as me}from"./TableShimmer-CyOAWIbP.js";import{g as $}from"./orderStatusClasses-HfHBGnti.js";import{d as N}from"./dayjs.min-DJjsxh_s.js";import{P as xe}from"./enums-CdakGUf3.js";import{S as b}from"./sweetalert2.esm.all-DwEdJQJv.js";import"./useGetBranches-DMjl_2Jw.js";import"./useGetUsersByRole-hGehtCF8.js";import"./MultiSelect-Cp2q9yoR.js";const he=()=>{const[n,c]=i.useState(1),[d,h]=i.useState(10),[p,o]=Q(),[a,g]=i.useState(null),[l,f]=i.useState(null),_=p.get("page"),v=p.get("perPage"),[j,w]=i.useState(""),[S,Y]=i.useState(""),[E,A]=i.useState(""),[F,T]=i.useState();let B="order_list",I="delivered_order";const{orders:m,loading:M,totalOrders:C,fetchOrders:R}=re(n,d,j,a,l,B,I),{deleteOrder:L}=ie(),{generateInvoice:z,loading:P}=de(),O=D(),u=Math.ceil(C/d);i.useEffect(()=>{_&&c(Number(_)),v&&h(Number(v))},[_,v]),i.useEffect(()=>{j&&(c(1),o({search:j,page:"1",perPage:d.toString()}))},[j]);const q=s=>{O(`/order/${s}`,{state:{from:"OrderTable"}})},G=async s=>{try{const{isConfirmed:t}=await b.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(t){const{success:k,message:x}=await L(s);k?(m.filter(K=>K.order_id!==s).length===0&&n>1&&(c(n-1),o({page:(n-1).toString(),perPage:d.toString()})),await R(),b.fire(x)):b.fire(x)}}catch(t){b.fire({title:"Error",text:t.message,icon:"error"})}},V=s=>{O(`/order/edit/${s}`)},r=s=>{a===s?f(l==="ASC"?"DESC":"ASC"):(g(s),f("ASC"))},y=s=>{s>=1&&s<=u&&(c(s),o({page:s.toString(),perPage:d.toString()}))},U=s=>{const t=Number(s.target.value);h(t),c(1),o({page:"1",perPage:t.toString()})},H=async s=>{s.preventDefault();try{await ne.validate({search:S},{abortEarly:!1}),w(S),A("")}catch(t){t instanceof ae&&A(t.errors[0])}},J=async s=>{T(s),await z(s)};if(m.length!==0)return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:d,onChange:U,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:H,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:S,onChange:s=>{Y(s.target.value),s.target.value===""&&w("")},placeholder:"Search...",className:"min-w-[185px]"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("span",{children:e.jsx("i",{className:"ki-filled ki-magnifier"})})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:E||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("span",{className:`sort ${a==="order_id"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${a==="first_name"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${a==="branch_id"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Assigned Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${a==="mobile_number"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${a==="address_details"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("address_details"),children:[e.jsx("span",{className:"sort-label",children:"Shipping Address"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${a==="booking_date"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("booking_date"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${a==="estimated_pickup_time"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${a==="delivery_date"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("delivery_date"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${a==="coupon_code"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${a==="coupon_discount"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${a==="sub_total"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Bill Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[135px]",children:e.jsxs("span",{className:`sort ${a==="total"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Duo Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:e.jsxs("span",{className:`sort ${a==="payment_type"?l==="ASC"?"asc":"desc":""}`,onClick:()=>r("payment_type"),children:[e.jsx("span",{className:"sort-label",children:"Payment type"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[160px]",children:"Receipt"}),e.jsx("th",{className:"w-[170px]",children:"Actions"})]})}),M?e.jsx(me,{}):m.length>0?e.jsx("tbody",{children:m.map(s=>{var x;const t=$(s.order_status_details.admin_label),k=$(s.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",s.order_id]}),e.jsx("td",{children:s.user.first_name+" "+s.user.last_name}),e.jsx("td",{children:(x=s==null?void 0:s.branch)==null?void 0:x.branch_name}),e.jsx("td",{children:e.jsx("span",{className:`${t} relative badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.admin_label})}),e.jsx("td",{children:s.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${k} badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:s.order_status_details.description})]})}),e.jsx("td",{children:s.user.mobile_number}),e.jsx("td",{children:s.address_details}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[N(s.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),N(s.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:N(s.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[N(s.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:s.coupon_code}),e.jsx("td",{children:s.coupon_discount}),e.jsx("td",{children:s.sub_total}),e.jsx("td",{children:s.total}),e.jsx("td",{children:xe[s.payment_type]}),e.jsx("td",{children:e.jsx("button",{className:"flex items-center mr-2 btn btn-light btn-sm",onClick:()=>J(s.order_id),disabled:P&&F===s.order_id,children:P&&F===s.order_id?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ki-filled ki-cheque text-2xl link"}),"Receipt ",e.jsx(oe,{})]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ki-filled ki-cheque text-2xl link"}),"Receipt"]})})}),e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>q(s.order_id),children:e.jsx(W,{size:18,className:"text-gray-600"})}),e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>V(s.order_id),children:e.jsx(X,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>G(s.order_id),children:e.jsx(Z,{className:"text-red-500"})})]})})]},s.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),C>d&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",m.length," of ",C," Orders"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:n===1,onClick:()=>y(n-1),className:`btn ${n===1?"disabled":""}`,children:e.jsx(ee,{})}),Array.from({length:u}).map((s,t)=>e.jsx("button",{className:`btn ${n===t+1?"active":""}`,onClick:()=>y(t+1),children:t+1},t)),e.jsx("button",{disabled:n===u,onClick:()=>y(n+1),className:`btn ${n===u?"disabled":""}`,children:e.jsx(se,{})})]})]})})]})})]})},Ae=()=>{const n=D(),[c,d]=i.useState(!1),[h,p]=i.useState({paymentStatusFilter:[],orderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],pickupBoyFilter:[],deliveryBoyFilter:[],branchFilter:[]}),o=()=>{n("/order/add")},a=g=>{p(g)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Delivered Orders"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:o,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Order"]})})]}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>d(!c),children:["Filters",c?e.jsx(te,{size:23}):e.jsx(le,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[c&&e.jsx(ce,{filters:h,updateFilters:a})," ",e.jsx(he,{})]})})})]})};export{Ae as default};
