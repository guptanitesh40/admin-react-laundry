import{r as c,_ as D,u as W,g as z,j as e,h as Y,aT as X,F as Z,b as ee,d as se,e as ae,V as te,aU as ne,aV as le}from"./index-DxJcpna2.js";import{T as re}from"./TableShimmer-DtsENsts.js";import{O as $,P as O,b as ce}from"./enums-DrmPtfwX.js";import{S as T}from"./sweetalert2.esm.all-DwEdJQJv.js";import{s as ie}from"./searchSchema-BKe6WphV.js";import{S as L}from"./react-select.esm-Dy247hz0.js";import{M as I}from"./index-C7vaskAF.js";import{u as oe}from"./useGetUsersByRole-Cx2yFRnt.js";import{u as de}from"./useGetBranches-DafcePQN.js";const me="http://35.154.167.170:3000/admin/orders",pe=(i=1,o=10,u="",p,j,g,d,n,N,r,f,C)=>{const[y,w]=c.useState([]),[k,b]=c.useState(0),[P,F]=c.useState(!1),S=async()=>{var a,v;const h=localStorage.getItem("authToken"),s=new URLSearchParams;i&&s.append("page_number",i.toString()),o&&s.append("per_page",o.toString()),u&&s.append("search",u),p&&s.append("sort_by",p),j&&s.append("order",j),g&&g.forEach(l=>s.append("orderstatus",l.toString())),d&&d.forEach(l=>s.append("customer_id",l.toString())),n&&n.forEach(l=>s.append("branch_id",l.toString())),N&&N.forEach(l=>s.append("pickup_boy_id",l.toString())),r&&r.forEach(l=>s.append("delivery_boy_id",l.toString())),C&&C.forEach(l=>s.append("payment_status",l.toString())),f&&s.append("payment_type",f.toString()),F(!0);try{const l=await fetch(`${me}?${s}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`}}),_=await l.json();if(!l.ok){D.error(_.message,{position:"top-center"});return}w(((a=_==null?void 0:_.data)==null?void 0:a.orders)||[]),b(((v=_==null?void 0:_.data)==null?void 0:v.count)||0)}catch(l){D.error(l||"Network error: Failed to fetch.",{position:"top-center"})}finally{F(!1)}};return c.useEffect(()=>{S()},[i,o,u,p,j,g,d,n,N,r,f,C]),{orders:y,totalOrders:k,loading:P,fetchOrders:S}},he=()=>{const[i,o]=c.useState(!1);return{deleteOrder:async p=>{const j=localStorage.getItem("authToken"),g=`http://35.154.167.170:3000/admin/order/${p}`;o(!0);try{const d=await fetch(g,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`}}),n=await d.json();return d.ok?{success:!0,message:n.message}:(D.error(n.message,{position:"top-center"}),{success:!1,message:n.message})}catch(d){return D.error("An unexpected error occurred.",{position:"top-center"}),{success:!1,message:d.message}}finally{o(!1)}},loading:i}},ue=({filters:i})=>{const[o,u]=c.useState(1),[p,j]=c.useState(10),[g,d]=W(),[n,N]=c.useState(null),[r,f]=c.useState(null),C=g.get("page"),y=g.get("perPage"),[w,k]=c.useState(""),[b,P]=c.useState(""),[F,S]=c.useState(""),{orders:h,loading:s,totalOrders:a,fetchOrders:v}=pe(o,p,w,n,r,i.orderStatusFilter,i.customerFilter,i.branchFilter,i.pickupBoyFilter,i.deliveryBoyFilter,i.paymentTypeFilter,i.paymentStatusFilter),{deleteOrder:l}=he(),_=z(),E=Math.ceil(a/p);c.useEffect(()=>{C&&u(Number(C)),y&&j(Number(y))},[C,y]),c.useEffect(()=>{w&&(u(1),d({search:w,page:"1",perPage:p.toString()}))},[w]);const U=t=>{_(`/order/${t}`,{state:{from:"OrderTable"}})},G=async t=>{try{const{isConfirmed:x}=await T.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(x){const{success:M,message:A}=await l(t);M?(h.filter(B=>B.order_id!==t).length===0&&o>1&&(u(o-1),d({page:(o-1).toString(),perPage:p.toString()})),await v(),T.fire(A)):T.fire(A)}}catch(x){T.fire({title:"Error",text:x.message,icon:"error"})}},q=t=>{_(`/order/edit/${t}`)},K=async t=>{t.preventDefault();try{await ie.validate({search:b},{abortEarly:!1}),k(b),S("")}catch(x){x instanceof te&&S(x.errors[0])}},m=t=>{n===t?f(r==="ASC"?"DESC":"ASC"):(N(t),f("ASC"))},R=t=>{t>=1&&t<=E&&(u(t),d({page:t.toString(),perPage:p.toString()}))},H=t=>{const x=Number(t.target.value);j(x),u(1),d({page:"1",perPage:x.toString()})},J=t=>{switch(t){case $.Pending:return"badge badge-pending";case $["In Process"]:return"badge badge-in-process";case $["Ready to delivery"]:return"badge badge-ready-to-deliver";case $["Delivery complete"]:return"badge badge-delivery-complete";default:return"badge"}},Q=t=>{switch(t){case O.Pending:return"badge badge-pending";case O["Partial received"]:return"badge badge-ready-to-deliver";case O.Received:return"badge badge-delivery-complete";default:return"badge"}};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:p,onChange:H,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:K,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:b,onChange:t=>{P(t.target.value),t.target.value===""&&k("")},placeholder:"Search...",className:"w-[275px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:F||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("span",{className:`sort ${n==="order_id"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${n==="first_name"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${n==="email"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${n==="mobile_number"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${n==="address_details"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("address_details"),children:[e.jsx("span",{className:"sort-label",children:"Shipping Address"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${n==="coupon_code"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${n==="coupon_discount"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[160px]",children:e.jsxs("span",{className:`sort ${n==="order_statue"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("order_statue"),children:[e.jsx("span",{className:"sort-label",children:"Order Status"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${n==="estimated_delivery_time"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated delivery time"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${n==="estimated_pickup_time"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated pickup time"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${n==="shipping_charges"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("shipping_charges"),children:[e.jsx("span",{className:"sort-label",children:"Shipping charge"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[180px]",children:e.jsxs("span",{className:`sort ${n==="express_delivery_charges"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("express_delivery_charges"),children:[e.jsx("span",{className:"sort-label",children:"Express delivery charges"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[100px]",children:e.jsxs("span",{className:`sort ${n==="gst"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("gst"),children:[e.jsx("span",{className:"sort-label",children:"GST"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${n==="kasar_amount"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("kasar_amount"),children:[e.jsx("span",{className:"sort-label",children:"Kasar amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${n==="sub_total"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Sub total"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[105px]",children:e.jsxs("span",{className:`sort ${n==="total"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("total"),children:[e.jsx("span",{className:"sort-label",children:"Total"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:e.jsxs("span",{className:`sort ${n==="payment_type"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("payment_type"),children:[e.jsx("span",{className:"sort-label",children:"Payment type"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[175px]",children:e.jsxs("span",{className:`sort ${n==="payment_status"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("payment_status"),children:[e.jsx("span",{className:"sort-label",children:"Payment Status"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${n==="branch_id"?r==="ASC"?"asc":"desc":""}`,onClick:()=>m("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Assigned Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"w-[170px]",children:"Actions"})]})}),s?e.jsx(re,{}):h.length>0?e.jsx("tbody",{children:h.map(t=>{var B;const x=$[t.order_status],M=J(t.order_status),A=O[t.payment_status],V=Q(t.payment_status);return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",t.order_id]}),e.jsx("td",{children:t.user.first_name+" "+t.user.last_name}),e.jsx("td",{children:t.user.email}),e.jsx("td",{children:t.user.mobile_number}),e.jsx("td",{children:t.address_details}),e.jsx("td",{children:t.coupon_code}),e.jsx("td",{children:t.coupon_discount}),e.jsx("td",{children:e.jsx("span",{className:`${M} badge-outline rounded-[30px]`,children:x})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-col",children:Y(t.estimated_delivery_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-col",children:Y(t.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:t.shipping_charges}),e.jsx("td",{children:t.express_delivery_charges}),e.jsx("td",{children:t.gst}),e.jsx("td",{children:t.kasar_amount}),e.jsx("td",{children:t.sub_total}),e.jsx("td",{children:t.total}),e.jsx("td",{children:ce[t.payment_type]}),e.jsx("td",{children:e.jsx("span",{className:`${V} badge-outline rounded-[30px]`,children:A})}),e.jsx("td",{children:(B=t==null?void 0:t.branch)==null?void 0:B.branch_name}),e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>U(t.order_id),children:e.jsx(X,{size:18,className:"text-gray-600"})}),e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>q(t.order_id),children:e.jsx(Z,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>G(t.order_id),children:e.jsx(ee,{className:"text-red-500"})})]})})]},t.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Orders available"})})})]})}),a>p&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",h.length," of ",a," Orders"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:o===1,onClick:()=>R(o-1),className:`btn ${o===1?"disabled":""}`,children:e.jsx(se,{})}),Array.from({length:E}).map((t,x)=>e.jsx("button",{className:`btn ${o===x+1?"active":""}`,onClick:()=>R(x+1),children:x+1},x)),e.jsx("button",{disabled:o===E,onClick:()=>R(o+1),className:`btn ${o===E?"disabled":""}`,children:e.jsx(ae,{})})]})]})})]})})]})},xe=({filters:i,updateFilters:o})=>{const[u,p]=c.useState(""),[j,g]=c.useState(""),[d,n]=c.useState(""),[N,r]=c.useState([]),[f,C]=c.useState([]),[y,w]=c.useState([]),{fetchUsersByRole:k}=oe(),{branches:b,fetchBranches:P}=de(),F=Object.entries(O).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a})),S=Object.entries($).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a}));c.useEffect(()=>{P()},[]),c.useEffect(()=>{u&&(async()=>{const a=await k(5,u),v=a==null?void 0:a.map(l=>({label:`${l.first_name} ${l.last_name} (${l.mobile_number})`,value:l.user_id}));r(v)})()},[u]),c.useEffect(()=>{j&&(async()=>{const a=await k(4,j),v=a==null?void 0:a.map(l=>({label:`${l.first_name} ${l.last_name} (${l.mobile_number})`,value:l.user_id}));C(v)})(),d&&(async()=>{const a=await k(4,d),v=a==null?void 0:a.map(l=>({label:`${l.first_name} ${l.last_name} (${l.mobile_number})`,value:l.user_id}));w(v)})()},[j,d]);const h=(s,a)=>{o({...i,[s]:a})};return e.jsx("div",{className:"card-header flex-wrap gap-2",children:e.jsxs("div",{className:"flex flex-wrap",children:[e.jsxs("div",{className:"basis-1/2 flex flex-col space-y-2",children:[e.jsx(L,{name:"customer-select",options:N,value:N==null?void 0:N.filter(s=>{var a;return(a=i.customerFilter)==null?void 0:a.includes(s.value)}),onChange:s=>h("customerFilter",s.map(a=>a.value)),onInputChange:s=>p(s),isMulti:!0,placeholder:"Search and select customers",className:"custom-select-container",classNamePrefix:"custom-select"}),e.jsx(L,{name:"pickupboy-select",options:f,value:f==null?void 0:f.filter(s=>{var a;return(a=i.pickupBoyFilter)==null?void 0:a.includes(s.value)}),onChange:s=>h("pickupBoyFilter",s.map(a=>a.value)),onInputChange:s=>g(s),isMulti:!0,placeholder:"Search and select pickup boys",className:"custom-select-container",classNamePrefix:"custom-select"}),e.jsx(L,{name:"deliveryboy-select",options:y,value:y==null?void 0:y.filter(s=>{var a;return(a=i.deliveryBoyFilter)==null?void 0:a.includes(s.value)}),onChange:s=>h("deliveryBoyFilter",s.map(a=>a.value)),onInputChange:s=>n(s),isMulti:!0,placeholder:"Search and select delivery boys",className:"custom-select-container",classNamePrefix:"custom-select"})]}),e.jsxs("div",{className:"basis-1/2 space-y-4",children:[e.jsx(I,{options:b==null?void 0:b.map(s=>({branch_id:s.branch_id,branch_name:s.branch_name})),displayValue:"branch_name",selectedValues:b==null?void 0:b.filter(s=>{var a;return(a=i.branchFilter)==null?void 0:a.includes(s.branch_id)}),placeholder:"Branch",onSelect:s=>{h("branchFilter",s.map(a=>a.branch_id))},onRemove:s=>{h("branchFilter",s.map(a=>a.branch_id))},className:"multiselect-container multiselect min-w-[430px] max-w-[480px]"}),e.jsx(I,{options:S,displayValue:"label",selectedValues:S==null?void 0:S.filter(s=>{var a;return(a=i.orderStatusFilter)==null?void 0:a.includes(s.value)}),placeholder:"Order status",onSelect:s=>{h("orderStatusFilter",s.map(a=>a.value))},onRemove:s=>{h("orderStatusFilter",s.map(a=>a.value))},className:"multiselect-container multiselect min-w-[430px] max-w-[480px]"}),e.jsx(I,{options:F,displayValue:"label",selectedValues:F.filter(s=>{var a;return(a=i.paymentStatusFilter)==null?void 0:a.includes(s.value)}),placeholder:"Payment status",onSelect:s=>{h("paymentStatusFilter",s.map(a=>a.value))},onRemove:s=>{h("paymentStatusFilter",s.map(a=>a.value))},className:"multiselect-container multiselect min-w-[430px] max-w-[480px]"})]}),e.jsxs("select",{className:"select select-lg w-[200px] text-sm mt-2",value:i.paymentTypeFilter,onChange:s=>{h("paymentTypeFilter",Number(s.target.value))},children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Payment type"}),e.jsx("option",{value:1,children:"Cash on Delivery"}),e.jsx("option",{value:2,children:"Online Payment"})]})]})})},Ce=()=>{const i=z(),[o,u]=c.useState(!1),[p,j]=c.useState({paymentStatusFilter:[],orderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],pickupBoyFilter:[],deliveryBoyFilter:[],branchFilter:[]}),g=()=>{i("/order/add")},d=n=>{j(n)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Orders"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:g,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Order"]})})]}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>u(!o),children:["Filters",o?e.jsx(ne,{size:23}):e.jsx(le,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[o&&e.jsx(xe,{filters:p,updateFilters:d})," ",e.jsx(ue,{filters:p})]})})})]})};export{Ce as default};