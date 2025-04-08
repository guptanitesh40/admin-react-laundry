import{r as i,_ as V,u as W,g as I,j as e,k as X,F as Z,b as ee,d as se,e as ae,V as te,R as le,p as ne}from"./index-2OuGMmVb.js";import{u as ce}from"./useGenerateInvoice-eH-k0bff.js";import{T as re}from"./TableShimmer-sMksu-RW.js";import{P as ie,O as oe,b as de}from"./enums-CdakGUf3.js";import{S as B}from"./sweetalert2.esm.all-DwEdJQJv.js";import{d as E}from"./dayjs.min-BE2cglwF.js";import{s as me}from"./searchSchema-Btv9Z0cO.js";import{g as Y}from"./orderStatusClasses-HfHBGnti.js";import{L as pe}from"./Loading-B5tRdrqS.js";import{u as he}from"./useGetBranches-DXxnViBJ.js";import{u as ue}from"./useGetUsersByRole-DhUAYRwY.js";import{M as O}from"./MultiSelect-CHYv1z2S.js";const xe="http://3.110.208.70:3000/admin/orders",je=(l=1,c=10,j="",m,f,N,p,r,v,o,S,y)=>{const[w,C]=i.useState([]),[t,a]=i.useState(0),[n,b]=i.useState(!1),u=async()=>{var k,P;const $=localStorage.getItem("authToken"),x=new URLSearchParams;l&&x.append("page_number",l.toString()),c&&x.append("per_page",c.toString()),j&&x.append("search",j),m&&x.append("sort_by",m),f&&x.append("order",f),N&&N.forEach(d=>x.append("order_statuses",d.toString())),p&&p.forEach(d=>x.append("customer_ids",d.toString())),r&&r.forEach(d=>x.append("branches_ids",d.toString())),v&&v.forEach(d=>x.append("pickup_boy_ids",d.toString())),o&&o.forEach(d=>x.append("delivery_boy_ids",d.toString())),y&&y.forEach(d=>x.append("payment_statuses",d.toString())),S&&x.append("payment_types",S.toString()),b(!0);try{const d=await fetch(`${xe}?${x}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${$}`}}),_=await d.json();if(!d.ok){V.error(_.message,{position:"top-center"});return}C(((k=_==null?void 0:_.data)==null?void 0:k.orders)||[]),a(((P=_==null?void 0:_.data)==null?void 0:P.count)||0)}catch(d){V.error(d||"Network error: Failed to fetch.",{position:"top-center"})}finally{b(!1)}};return i.useEffect(()=>{u()},[l,c,j,m,f,N,p,r,v,o,S,y]),{orders:w,totalOrders:t,loading:n,fetchOrders:u}},be=()=>{const[l,c]=i.useState(!1);return{deleteOrder:async m=>{const f=localStorage.getItem("authToken"),N=`http://3.110.208.70:3000/admin/order/${m}`;c(!0);try{const p=await fetch(N,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`}}),r=await p.json();return p.ok?{success:!0,message:r.message}:(V.error(r.message,{position:"top-center"}),{success:!1,message:r.message})}catch(p){return V.error("An unexpected error occurred.",{position:"top-center"}),{success:!1,message:p.message}}finally{c(!1)}},loading:l}},ge=({filters:l})=>{const[c,j]=i.useState(1),[m,f]=i.useState(10),[N,p]=W(),[r,v]=i.useState(null),[o,S]=i.useState(null),y=N.get("page"),w=N.get("perPage"),[C,t]=i.useState(""),[a,n]=i.useState(""),[b,u]=i.useState(""),[$,x]=i.useState(),{orders:k,loading:P,totalOrders:d,fetchOrders:_}=je(c,m,C,r,o,l.orderStatusFilter,l.customerFilter,l.branchFilter,l.pickupBoyFilter,l.deliveryBoyFilter,l.paymentTypeFilter,l.paymentStatusFilter),{deleteOrder:M}=be(),{generateInvoice:z,loading:T}=ce(),L=I(),A=Math.ceil(d/m);i.useEffect(()=>{y&&j(Number(y)),w&&f(Number(w))},[y,w]),i.useEffect(()=>{C&&(j(1),p({search:C,page:"1",perPage:m.toString()}))},[C]);const G=s=>{L(`/order/${s}`,{state:{from:"OrderTable"}})},U=async s=>{try{const{isConfirmed:h}=await B.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(h){const{success:R,message:F}=await M(s);R?(k.filter(Q=>Q.order_id!==s).length===0&&c>1&&(j(c-1),p({page:(c-1).toString(),perPage:m.toString()})),await _(),B.fire(F)):B.fire(F)}}catch(h){B.fire({title:"Error",text:h.message,icon:"error"})}},q=s=>{L(`/order/edit/${s}`)},H=async s=>{s.preventDefault();try{await me.validate({search:a},{abortEarly:!1}),t(a),u("")}catch(h){h instanceof te&&u(h.errors[0])}},g=s=>{r===s?S(o==="ASC"?"DESC":"ASC"):(v(s),S("ASC"))},D=s=>{s>=1&&s<=A&&(j(s),p({page:s.toString(),perPage:m.toString()}))},J=s=>{const h=Number(s.target.value);f(h),j(1),p({page:"1",perPage:h.toString()})},K=async s=>{x(s),await z(s)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:m,onChange:J,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:H,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:a,onChange:s=>{n(s.target.value),s.target.value===""&&t("")},placeholder:"Search...",className:"min-w-[185px]"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:b||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("span",{className:`sort ${r==="order_id"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${r==="first_name"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${r==="branch_id"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Assigned Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${r==="mobile_number"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${r==="address_details"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("address_details"),children:[e.jsx("span",{className:"sort-label",children:"Shipping Address"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${r==="booking_date"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("booking_date"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${r==="estimated_pickup_time"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${r==="delivery_date"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("delivery_date"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="coupon_code"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="coupon_discount"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="sub_total"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Bill Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[135px]",children:e.jsxs("span",{className:`sort ${r==="total"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Duo Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:e.jsxs("span",{className:`sort ${r==="payment_type"?o==="ASC"?"asc":"desc":""}`,onClick:()=>g("payment_type"),children:[e.jsx("span",{className:"sort-label",children:"Payment type"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[160px]",children:"Receipt"}),e.jsx("th",{className:"w-[170px]",children:"Actions"})]})}),P?e.jsx(re,{}):k.length>0?e.jsx("tbody",{children:k.map(s=>{var F;const h=Y(s.order_status_details.admin_label),R=Y(s.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",s.order_id]}),e.jsx("td",{children:s.user.first_name+" "+s.user.last_name}),e.jsx("td",{children:(F=s==null?void 0:s.branch)==null?void 0:F.branch_name}),e.jsx("td",{children:e.jsx("span",{className:`${h} relative badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.admin_label})}),e.jsx("td",{children:s.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${R} badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:s.order_status_details.description})]})}),e.jsx("td",{children:s.user.mobile_number}),e.jsx("td",{children:s.address_details}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[E(s.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),E(s.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:E(s.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[E(s.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:s.coupon_code}),e.jsx("td",{children:s.coupon_discount}),e.jsx("td",{children:s.sub_total}),e.jsx("td",{children:s.total}),e.jsx("td",{children:ie[s.payment_type]}),e.jsx("td",{children:e.jsx("button",{className:"flex items-center mr-2 btn btn-light btn-sm",onClick:()=>K(s.order_id),disabled:T&&$===s.order_id,children:T&&$===s.order_id?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ki-filled ki-cheque text-2xl link"}),"Receipt ",e.jsx(pe,{})]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ki-filled ki-cheque text-2xl link"}),"Receipt"]})})}),e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>G(s.order_id),children:e.jsx(X,{size:18,className:"text-gray-600"})}),e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>q(s.order_id),children:e.jsx(Z,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>U(s.order_id),children:e.jsx(ee,{className:"text-red-500"})})]})})]},s.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),d>m&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",k.length," of ",d," Orders"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:c===1,onClick:()=>D(c-1),className:`btn ${c===1?"disabled":""}`,children:e.jsx(se,{})}),Array.from({length:A}).map((s,h)=>e.jsx("button",{className:`btn ${c===h+1?"active":""}`,onClick:()=>D(h+1),children:h+1},h)),e.jsx("button",{disabled:c===A,onClick:()=>D(c+1),className:`btn ${c===A?"disabled":""}`,children:e.jsx(ae,{})})]})]})})]})})]})},fe=({filters:l,updateFilters:c})=>{const[j,m]=i.useState([]),[f,N]=i.useState([]),[p,r]=i.useState([]),[v,o]=i.useState(""),{branches:S}=he(),{fetchUsersByRole:y}=ue(),w=Object.entries(oe).filter(([t,a])=>typeof a=="number").map(([t,a])=>({label:t,value:a})),C=Object.entries(de).filter(([t,a])=>typeof a=="number").map(([t,a])=>({label:t,value:a}));return i.useEffect(()=>{v&&(async()=>{const a=await y(5,v),n=a==null?void 0:a.map(b=>({label:`${b.first_name} ${b.last_name} (${b.mobile_number})`,value:b.user_id}));m(n)})()},[v]),i.useEffect(()=>{const t=async()=>{const n=await y(4),b=n==null?void 0:n.map(u=>({label:`${u.first_name} ${u.last_name} (${u.mobile_number})`,value:u.user_id}));N(b)},a=async()=>{const n=await y(4),b=n==null?void 0:n.map(u=>({label:`${u.first_name} ${u.last_name} (${u.mobile_number})`,value:u.user_id}));r(b)};t(),a()},[]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"p-4",children:e.jsxs("div",{className:"grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4",children:[e.jsx(O,{options:j,displayValue:"label",placeholder:"Search Customer",selectedValues:l.customerFilter,onSelect:t=>{const a=t.map(n=>n.value);c({...l,customerFilter:a})},onRemove:t=>{const a=t.map(n=>n.value);c({...l,customerFilter:a})},setSearch:o,className:"w-full"}),e.jsx(O,{options:w,displayValue:"label",placeholder:"Select Order Status",selectedValues:l.orderStatusFilter,onSelect:t=>{const a=t.map(n=>n.value);c({...l,orderStatusFilter:a})},onRemove:t=>{const a=t.map(n=>n.value);c({...l,orderStatusFilter:a})},isCustomLabel:!0,className:"w-full"}),e.jsx(O,{options:S==null?void 0:S.map(t=>({label:t.branch_name,value:t.branch_id})),displayValue:"branch_name",placeholder:"Select Branch",selectedValues:l==null?void 0:l.branchFilter,onSelect:t=>{const a=t.map(n=>n.value);c({...l,branchFilter:a})},onRemove:t=>{const a=t.map(n=>n.value);c({...l,branchFilter:a})},className:"w-full"}),e.jsx(O,{options:p,displayValue:"label",placeholder:"Search DeliveryBoy",selectedValues:l.deliveryBoyFilter,onSelect:t=>{const a=t.map(n=>n.value);c({...l,deliveryBoyFilter:a})},onRemove:t=>{const a=t.map(n=>n.value);c({...l,deliveryBoyFilter:a})},className:"w-full"}),e.jsx(O,{options:f,displayValue:"label",placeholder:"Search PickupBoy",selectedValues:l.pickupBoyFilter,onSelect:t=>{const a=t.map(n=>n.value);c({...l,pickupBoyFilter:a})},onRemove:t=>{const a=t.map(n=>n.value);c({...l,pickupBoyFilter:a})},className:"w-full"}),e.jsx(O,{options:C,displayValue:"label",placeholder:"Select Payment Status",selectedValues:l.paymentStatusFilter,onSelect:t=>{const a=t.map(n=>n.value);c({...l,paymentStatusFilter:a})},onRemove:t=>{const a=t.map(n=>n.value);c({...l,paymentStatusFilter:a})},isSearchInput:!1,className:"w-full"}),e.jsxs("select",{className:"select select-lg w-[200px] text-sm",value:l.paymentTypeFilter,onChange:t=>{c({...l,paymentTypeFilter:Number(t.target.value)})},children:[e.jsx("option",{value:"",selected:!0,children:"Payment type"}),e.jsx("option",{value:1,children:"Cash on Delivery"}),e.jsx("option",{value:2,children:"Online Payment"})]})]})})})},Be=()=>{const l=I(),[c,j]=i.useState(!1),[m,f]=i.useState({paymentStatusFilter:[],orderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],pickupBoyFilter:[],deliveryBoyFilter:[],branchFilter:[]}),N=()=>{l("/order/add")},p=r=>{f(r)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Orders"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:N,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Order"]})})]}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>j(!c),children:["Filters",c?e.jsx(le,{size:23}):e.jsx(ne,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[c&&e.jsx(fe,{filters:m,updateFilters:p})," ",e.jsx(ge,{filters:m})]})})})]})};export{Be as default};
