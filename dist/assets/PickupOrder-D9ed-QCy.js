import{r,u as K,g as Q,j as e,k as W,F as X,b as Z,d as ee,e as se,V as ae}from"./index-BGpOCz7R.js";import{s as te}from"./searchSchema-CAltIT2m.js";import{u as le,a as ne}from"./useDeleteOrder-ByezgOgn.js";import{u as ce}from"./useGenerateInvoice-DzJZngBU.js";import{L as re}from"./Loading-CCkclrlE.js";import{T as ie}from"./TableShimmer-Czdw204g.js";import{g as O}from"./orderStatusClasses-HfHBGnti.js";import{d as j}from"./dayjs.min-sRTcbxS6.js";import{P as de}from"./enums-CdakGUf3.js";import{S as u}from"./sweetalert2.esm.all-DwEdJQJv.js";const oe=()=>{const[c,d]=r.useState(1),[i,v]=r.useState(10),[y,x]=K(),[t,D]=r.useState(null),[l,N]=r.useState(null),g=y.get("page"),b=y.get("perPage"),[h,k]=r.useState(""),[f,Y]=r.useState(""),[E,w]=r.useState(""),[P,F]=r.useState();let M="order_list",I="pickup_order";const{orders:o,loading:T,totalOrders:_,fetchOrders:B}=le(c,i,h,t,l,M,I),{deleteOrder:L}=ne(),{generateInvoice:R,loading:A}=ce(),$=Q(),p=Math.ceil(_/i);r.useEffect(()=>{g&&d(Number(g)),b&&v(Number(b))},[g,b]),r.useEffect(()=>{h&&(d(1),x({search:h,page:"1",perPage:i.toString()}))},[h]);const z=s=>{$(`/order/${s}`,{state:{from:"OrderTable"}})},G=async s=>{try{const{isConfirmed:a}=await u.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(a){const{success:S,message:m}=await L(s);S?(o.filter(J=>J.order_id!==s).length===0&&c>1&&(d(c-1),x({page:(c-1).toString(),perPage:i.toString()})),await B(),u.fire(m)):u.fire(m)}}catch(a){u.fire({title:"Error",text:a.message,icon:"error"})}},V=s=>{$(`/order/edit/${s}`)},n=s=>{t===s?N(l==="ASC"?"DESC":"ASC"):(D(s),N("ASC"))},C=s=>{s>=1&&s<=p&&(d(s),x({page:s.toString(),perPage:i.toString()}))},q=s=>{const a=Number(s.target.value);v(a),d(1),x({page:"1",perPage:a.toString()})},U=async s=>{s.preventDefault();try{await te.validate({search:f},{abortEarly:!1}),k(f),w("")}catch(a){a instanceof ae&&w(a.errors[0])}},H=async s=>{F(s),await R(s)};if(o.length!==0)return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:i,onChange:q,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:U,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:f,onChange:s=>{Y(s.target.value),s.target.value===""&&k("")},placeholder:"Search...",className:"min-w-[185px]"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("span",{children:e.jsx("i",{className:"ki-filled ki-magnifier"})})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:E||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("span",{className:`sort ${t==="order_id"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${t==="first_name"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${t==="branch_id"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Assigned Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${t==="mobile_number"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${t==="address_details"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("address_details"),children:[e.jsx("span",{className:"sort-label",children:"Shipping Address"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${t==="booking_date"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("booking_date"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${t==="estimated_pickup_time"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${t==="delivery_date"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("delivery_date"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${t==="coupon_code"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${t==="coupon_discount"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${t==="sub_total"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Bill Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[135px]",children:e.jsxs("span",{className:`sort ${t==="total"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Duo Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:e.jsxs("span",{className:`sort ${t==="payment_type"?l==="ASC"?"asc":"desc":""}`,onClick:()=>n("payment_type"),children:[e.jsx("span",{className:"sort-label",children:"Payment type"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[160px]",children:"Receipt"}),e.jsx("th",{className:"w-[170px]",children:"Actions"})]})}),T?e.jsx(ie,{}):o.length>0?e.jsx("tbody",{children:o.map(s=>{var m;const a=O(s.order_status_details.admin_label),S=O(s.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",s.order_id]}),e.jsx("td",{children:s.user.first_name+" "+s.user.last_name}),e.jsx("td",{children:(m=s==null?void 0:s.branch)==null?void 0:m.branch_name}),e.jsx("td",{children:e.jsx("span",{className:`${a} relative badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.admin_label})}),e.jsx("td",{children:s.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${S} badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:s.order_status_details.description})]})}),e.jsx("td",{children:s.user.mobile_number}),e.jsx("td",{children:s.address_details}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[j(s.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),j(s.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:j(s.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[j(s.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:s.coupon_code}),e.jsx("td",{children:s.coupon_discount}),e.jsx("td",{children:s.sub_total}),e.jsx("td",{children:s.total}),e.jsx("td",{children:de[s.payment_type]}),e.jsx("td",{children:e.jsx("button",{className:"flex items-center mr-2 btn btn-light btn-sm",onClick:()=>H(s.order_id),disabled:A&&P===s.order_id,children:A&&P===s.order_id?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ki-filled ki-cheque text-2xl link"}),"Receipt ",e.jsx(re,{})]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ki-filled ki-cheque text-2xl link"}),"Receipt"]})})}),e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>z(s.order_id),children:e.jsx(W,{size:18,className:"text-gray-600"})}),e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>V(s.order_id),children:e.jsx(X,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>G(s.order_id),children:e.jsx(Z,{className:"text-red-500"})})]})})]},s.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),_>i&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",o.length," of ",_," Orders"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:c===1,onClick:()=>C(c-1),className:`btn ${c===1?"disabled":""}`,children:e.jsx(ee,{})}),Array.from({length:p}).map((s,a)=>e.jsx("button",{className:`btn ${c===a+1?"active":""}`,onClick:()=>C(a+1),children:a+1},a)),e.jsx("button",{disabled:c===p,onClick:()=>C(c+1),className:`btn ${c===p?"disabled":""}`,children:e.jsx(se,{})})]})]})})]})})]})},Ce=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Pickup Orders"})})})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(oe,{})})})})]});export{Ce as default};
