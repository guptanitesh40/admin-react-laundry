import{r as o,_ as V,u as Z,g as G,j as e,k as ee,F as se,b as ae,d as te,e as ne,V as le,R as ce,p as re}from"./index-DkLiFbUV.js";import{u as ie}from"./useGenerateInvoice-BaQRc5BX.js";import{T as oe}from"./TableShimmer-DUJMzJgv.js";import{P as z,b as de,O as me}from"./enums-3gjpsfQG.js";import{S as B}from"./sweetalert2.esm.all-DwEdJQJv.js";import{d as M}from"./dayjs.min-DvNBM3lH.js";import{s as pe}from"./searchSchema-CFoSO0rg.js";import{g as Y}from"./orderStatusClasses-DgGpuqsn.js";import{g as he}from"./paymentStatusClasses-BddHAg9R.js";import{L as xe}from"./Loading-BJznh4LQ.js";import{u as ue}from"./useGetBranches-CcoylmlN.js";import{u as je}from"./useGetUsersByRole-BNHrtaVi.js";import{M as O}from"./MultiSelect-CvUt20sV.js";const ge="http://3.110.208.70:3000/admin/orders",be=(n=1,c=10,g="",m,N,f,h,r,v,i,S,y)=>{const[k,C]=o.useState([]),[t,a]=o.useState(0),[l,b]=o.useState(!1),u=async()=>{var w,$;const F=localStorage.getItem("authToken"),j=new URLSearchParams;n&&j.append("page_number",n.toString()),c&&j.append("per_page",c.toString()),g&&j.append("search",g),m&&j.append("sort_by",m),N&&j.append("order",N),f&&f.forEach(d=>j.append("order_statuses",d.toString())),h&&h.forEach(d=>j.append("customer_ids",d.toString())),r&&r.forEach(d=>j.append("branches_ids",d.toString())),v&&v.forEach(d=>j.append("pickup_boy_ids",d.toString())),i&&i.forEach(d=>j.append("delivery_boy_ids",d.toString())),y&&y.forEach(d=>j.append("payment_statuses",d.toString())),S&&j.append("payment_types",S.toString()),b(!0);try{const d=await fetch(`${ge}?${j}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${F}`}}),_=await d.json();if(!d.ok){V.error(_.message,{position:"top-center"});return}C(((w=_==null?void 0:_.data)==null?void 0:w.orders)||[]),a((($=_==null?void 0:_.data)==null?void 0:$.count)||0)}catch(d){V.error(d||"Network error: Failed to fetch.",{position:"top-center"})}finally{b(!1)}};return o.useEffect(()=>{u()},[n,c,g,m,N,f,h,r,v,i,S,y]),{orders:k,totalOrders:t,loading:l,fetchOrders:u}},Ne=()=>{const[n,c]=o.useState(!1);return{deleteOrder:async m=>{const N=localStorage.getItem("authToken"),f=`http://3.110.208.70:3000/admin/order/${m}`;c(!0);try{const h=await fetch(f,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${N}`}}),r=await h.json();return h.ok?{success:!0,message:r.message}:(V.error(r.message,{position:"top-center"}),{success:!1,message:r.message})}catch(h){return V.error("An unexpected error occurred.",{position:"top-center"}),{success:!1,message:h.message}}finally{c(!1)}},loading:n}},fe=({filters:n})=>{const[c,g]=o.useState(1),[m,N]=o.useState(10),[f,h]=Z(),[r,v]=o.useState(null),[i,S]=o.useState(null),y=f.get("page"),k=f.get("perPage"),[C,t]=o.useState(""),[a,l]=o.useState(""),[b,u]=o.useState(""),[F,j]=o.useState(),{orders:w,loading:$,totalOrders:d,fetchOrders:_}=be(c,m,C,r,i,n.orderStatusFilter,n.customerFilter,n.branchFilter,n.pickupBoyFilter,n.deliveryBoyFilter,n.paymentTypeFilter,n.paymentStatusFilter),{deleteOrder:U}=Ne(),{generateInvoice:q,loading:D}=ie(),I=G(),E=Math.ceil(d/m);o.useEffect(()=>{y&&g(Number(y)),k&&N(Number(k))},[y,k]),o.useEffect(()=>{C&&(g(1),h({search:C,page:"1",perPage:m.toString()}))},[C]);const K=s=>{I(`/order/${s}`,{state:{from:"OrderTable"}})},H=async s=>{try{const{isConfirmed:x}=await B.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(x){const{success:R,message:A}=await U(s);R?(w.filter(P=>P.order_id!==s).length===0&&c>1&&(g(c-1),h({page:(c-1).toString(),perPage:m.toString()})),await _(),B.fire(A)):B.fire(A)}}catch(x){B.fire({title:"Error",text:x.message,icon:"error"})}},J=s=>{I(`/order/edit/${s}`)},Q=async s=>{s.preventDefault();try{await pe.validate({search:a},{abortEarly:!1}),t(a),u("")}catch(x){x instanceof le&&u(x.errors[0])}},p=s=>{r===s?S(i==="ASC"?"DESC":"ASC"):(v(s),S("ASC"))},T=s=>{s>=1&&s<=E&&(g(s),h({page:s.toString(),perPage:m.toString()}))},W=s=>{const x=Number(s.target.value);N(x),g(1),h({page:"1",perPage:x.toString()})},X=async s=>{j(s),await q(s)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:m,onChange:W,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:Q,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:a,onChange:s=>{l(s.target.value),s.target.value===""&&t("")},placeholder:"Search...",className:"min-w-[185px]"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:b||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("span",{className:`sort ${r==="order_id"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${r==="first_name"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${r==="email"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${r==="mobile_number"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${r==="address_details"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("address_details"),children:[e.jsx("span",{className:"sort-label",children:"Shipping Address"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="coupon_code"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="coupon_discount"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${r==="estimated_delivery_time"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated delivery time"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${r==="estimated_pickup_time"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated pickup time"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${r==="shipping_charges"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("shipping_charges"),children:[e.jsx("span",{className:"sort-label",children:"Shipping charge"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[180px]",children:e.jsxs("span",{className:`sort ${r==="express_delivery_charges"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("express_delivery_charges"),children:[e.jsx("span",{className:"sort-label",children:"Express delivery charges"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[100px]",children:e.jsxs("span",{className:`sort ${r==="gst"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("gst"),children:[e.jsx("span",{className:"sort-label",children:"GST"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="kasar_amount"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("kasar_amount"),children:[e.jsx("span",{className:"sort-label",children:"Kasar amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="sub_total"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Sub total"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[105px]",children:e.jsxs("span",{className:`sort ${r==="total"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("total"),children:[e.jsx("span",{className:"sort-label",children:"Total"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:e.jsxs("span",{className:`sort ${r==="payment_type"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("payment_type"),children:[e.jsx("span",{className:"sort-label",children:"Payment type"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[155px]",children:e.jsxs("span",{className:`sort ${r==="payment_status"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("payment_status"),children:[e.jsx("span",{className:"sort-label",children:"Payment Status"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${r==="branch_id"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Assigned Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[160px]",children:"Invoice"}),e.jsx("th",{className:"w-[170px]",children:"Actions"})]})}),$?e.jsx(oe,{}):w.length>0?e.jsx("tbody",{children:w.map(s=>{var P;const x=z[s.payment_status],R=he(s.payment_status),A=Y(s.order_status_details.admin_label),L=Y(s.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",s.order_id]}),e.jsx("td",{children:s.user.first_name+" "+s.user.last_name}),e.jsx("td",{children:e.jsx("span",{className:`${A} relative badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.admin_label})}),e.jsx("td",{children:s.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${L} badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:s.order_status_details.description})]})}),e.jsx("td",{children:s.user.email}),e.jsx("td",{children:s.user.mobile_number}),e.jsx("td",{children:s.address_details}),e.jsx("td",{children:s.coupon_code}),e.jsx("td",{children:s.coupon_discount}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-col",children:M(s.estimated_delivery_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-col",children:M(s.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:s.shipping_charges}),e.jsx("td",{children:s.express_delivery_charges}),e.jsx("td",{children:s.gst}),e.jsx("td",{children:s.kasar_amount}),e.jsx("td",{children:s.sub_total}),e.jsx("td",{children:s.total}),e.jsx("td",{children:de[s.payment_type]}),e.jsx("td",{children:e.jsx("span",{className:`${R} badge-outline rounded-[30px]`,children:x})}),e.jsx("td",{children:(P=s==null?void 0:s.branch)==null?void 0:P.branch_name}),e.jsx("td",{children:e.jsx("button",{className:"flex items-center mr-2 btn btn-light btn-sm",onClick:()=>X(s.order_id),disabled:D&&F===s.order_id,children:D&&F===s.order_id?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ki-filled ki-cheque text-2xl link"}),"Invoice ",e.jsx(xe,{})]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ki-filled ki-cheque text-2xl link"}),"Invoice"]})})}),e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>K(s.order_id),children:e.jsx(ee,{size:18,className:"text-gray-600"})}),e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>J(s.order_id),children:e.jsx(se,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>H(s.order_id),children:e.jsx(ae,{className:"text-red-500"})})]})})]},s.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),d>m&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",w.length," of ",d," Orders"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:c===1,onClick:()=>T(c-1),className:`btn ${c===1?"disabled":""}`,children:e.jsx(te,{})}),Array.from({length:E}).map((s,x)=>e.jsx("button",{className:`btn ${c===x+1?"active":""}`,onClick:()=>T(x+1),children:x+1},x)),e.jsx("button",{disabled:c===E,onClick:()=>T(c+1),className:`btn ${c===E?"disabled":""}`,children:e.jsx(ne,{})})]})]})})]})})]})},Se=({filters:n,updateFilters:c})=>{const[g,m]=o.useState([]),[N,f]=o.useState([]),[h,r]=o.useState([]),[v,i]=o.useState(""),{branches:S}=ue(),{fetchUsersByRole:y}=je(),k=Object.entries(me).filter(([t,a])=>typeof a=="number").map(([t,a])=>({label:t,value:a})),C=Object.entries(z).filter(([t,a])=>typeof a=="number").map(([t,a])=>({label:t,value:a}));return o.useEffect(()=>{v&&(async()=>{const a=await y(5,v),l=a==null?void 0:a.map(b=>({label:`${b.first_name} ${b.last_name} (${b.mobile_number})`,value:b.user_id}));m(l)})()},[v]),o.useEffect(()=>{const t=async()=>{const l=await y(4),b=l==null?void 0:l.map(u=>({label:`${u.first_name} ${u.last_name} (${u.mobile_number})`,value:u.user_id}));f(b)},a=async()=>{const l=await y(4),b=l==null?void 0:l.map(u=>({label:`${u.first_name} ${u.last_name} (${u.mobile_number})`,value:u.user_id}));r(b)};t(),a()},[]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"card-header flex flex-col items-start gap-4",children:e.jsxs("div",{className:"grid grid-cols-3 gap-10 md:grid-cols-1 sm:grid-cols-1",children:[e.jsx(O,{options:g,displayValue:"label",placeholder:"Search Customer",selectedValues:n.customerFilter,onSelect:t=>{const a=t.map(l=>l.value);c({...n,customerFilter:a})},onRemove:t=>{const a=t.map(l=>l.value);c({...n,customerFilter:a})},setSearch:i,className:"min-w-[300px]"}),e.jsx(O,{options:k,displayValue:"label",placeholder:"Select Order Status",selectedValues:n.orderStatusFilter,onSelect:t=>{const a=t.map(l=>l.value);c({...n,orderStatusFilter:a})},onRemove:t=>{const a=t.map(l=>l.value);c({...n,orderStatusFilter:a})},isCustomLabel:!0}),e.jsx(O,{options:S==null?void 0:S.map(t=>({label:t.branch_name,value:t.branch_id})),displayValue:"branch_name",placeholder:"Select Branch",selectedValues:n==null?void 0:n.branchFilter,onSelect:t=>{const a=t.map(l=>l.value);c({...n,branchFilter:a})},onRemove:t=>{const a=t.map(l=>l.value);c({...n,branchFilter:a})}}),e.jsx(O,{options:h,displayValue:"label",placeholder:"Search DeliveryBoy",selectedValues:n.deliveryBoyFilter,onSelect:t=>{const a=t.map(l=>l.value);c({...n,deliveryBoyFilter:a})},onRemove:t=>{const a=t.map(l=>l.value);c({...n,deliveryBoyFilter:a})}}),e.jsx(O,{options:N,displayValue:"label",placeholder:"Search PickupBoy",selectedValues:n.pickupBoyFilter,onSelect:t=>{const a=t.map(l=>l.value);c({...n,pickupBoyFilter:a})},onRemove:t=>{const a=t.map(l=>l.value);c({...n,pickupBoyFilter:a})}}),e.jsx(O,{options:C,displayValue:"label",placeholder:"Select Payment Status",selectedValues:n.paymentStatusFilter,onSelect:t=>{const a=t.map(l=>l.value);c({...n,paymentStatusFilter:a})},onRemove:t=>{const a=t.map(l=>l.value);c({...n,paymentStatusFilter:a})},isSearchInput:!1}),e.jsxs("select",{className:"select select-lg w-[200px] text-sm",value:n.paymentTypeFilter,onChange:t=>{c({...n,paymentTypeFilter:Number(t.target.value)})},children:[e.jsx("option",{value:"",selected:!0,children:"Payment type"}),e.jsx("option",{value:1,children:"Cash on Delivery"}),e.jsx("option",{value:2,children:"Online Payment"})]})]})})})},Ve=()=>{const n=G(),[c,g]=o.useState(!1),[m,N]=o.useState({paymentStatusFilter:[],orderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],pickupBoyFilter:[],deliveryBoyFilter:[],branchFilter:[]}),f=()=>{n("/order/add")},h=r=>{N(r)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Orders"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:f,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Order"]})})]}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>g(!c),children:["Filters",c?e.jsx(ce,{size:23}):e.jsx(re,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[c&&e.jsx(Se,{filters:m,updateFilters:h})," ",e.jsx(fe,{filters:m})]})})})]})};export{Ve as default};
