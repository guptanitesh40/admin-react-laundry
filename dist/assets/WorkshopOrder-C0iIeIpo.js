import{r as l,B as T,V,u as I,k as Y,j as e,T as U,l as E,p as B,P as z,s as G,b as L,g as q,w as H,v as J,R as K,y as Q}from"./index-C5bMjS4g.js";import{P as X,b as Z,O as ee}from"./enums-Dwyd47hm.js";import{g as R}from"./orderStatusClasses-HfHBGnti.js";import{u as se}from"./useGetWorkshops-DH6osXmV.js";import{M as A}from"./MultiSelect-Bn24BAsz.js";const ae=(n=1,o=10,u="",p,N,_,x,r,g,c,f,v)=>{const[C,j]=l.useState(),[$,F]=l.useState(0),[O,M]=l.useState(!1),P=async()=>{var w,y;const k=localStorage.getItem("authToken"),i=new URLSearchParams;n&&i.append("page_number",n.toString()),o&&i.append("per_page",o.toString()),u&&i.append("search",u),p&&i.append("sort_by",p),N&&i.append("order",N),_&&_.forEach(d=>i.append("order_statuses",d.toString())),x&&x.forEach(d=>i.append("customer_ids",d.toString())),r&&r.forEach(d=>i.append("branches_ids",d.toString())),c&&c.forEach(d=>i.append("payment_statuses",d.toString())),f&&f.forEach(d=>i.append("workshop_ids",d.toString())),v&&v.forEach(d=>i.append("workshop_manager_ids",d.toString())),g&&i.append("payment_types",g.toString()),M(!0);try{const d=await fetch(`${T}/admin/orders/workshop?${i}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`}}),S=await d.json();if(!d.ok){V.error(S.message,{position:"top-center"}),M(!1);return}j(((w=S==null?void 0:S.data)==null?void 0:w.workshopOrders)||[]),F((y=S==null?void 0:S.data)==null?void 0:y.count)}catch{V.error("Network error: Failed to fetch workshop orders.")}finally{M(!1)}};return l.useEffect(()=>{P()},[n,o,u,p,N,_,x,r,g,c,f,v]),{workshopOrders:C,loading:O,count:$}},te=({filters:n})=>{const[o,u]=l.useState(1),[p,N]=l.useState(10),[_,x]=I(),[r,g]=l.useState(null),[c,f]=l.useState(null),v=_.get("page"),C=_.get("perPage"),[j,$]=l.useState(""),[F,O]=l.useState(""),[M,P]=l.useState(""),{workshopOrders:k,loading:i,count:w}=ae(o,p,j,r,c,n.workshopOrderStatusFilter,n.customerFilter,n.branchFilter,n.paymentTypeFilter,n.paymentStatusFilter,n.workshopFilter,n.workshopManagerFilter),y=Y(),d=Math.ceil(w/p);l.useEffect(()=>{v&&u(Number(v)),C&&N(Number(C))},[v,C]),l.useEffect(()=>{u(1),x(j!==""?{search:j,page:"1",perPage:p.toString()}:{})},[j]),l.useEffect(()=>{u(1),x(j!==""?{search:j,page:"1",perPage:p.toString()}:{})},[n.workshopOrderStatusFilter,n.customerFilter,n.branchFilter,n.paymentTypeFilter,n.paymentStatusFilter,n.workshopFilter,n.workshopManagerFilter]);const S=t=>{y(`/order/${t}`,{state:{from:"WorkshopOrderTable"}})},s=async t=>{t.preventDefault();try{await G.validate({search:F},{abortEarly:!1}),$(F),P("")}catch(b){b instanceof L&&P(b.errors[0])}};l.useEffect(()=>{j&&(u(1),x({search:j,page:"1",perPage:p.toString()}))},[j]);const a=t=>{r===t?f(c==="ASC"?"DESC":"ASC"):(g(t),f("ASC"))},m=t=>{t>=1&&t<=d&&(u(t),x({page:t.toString(),perPage:p.toString()}))},h=t=>{const b=Number(t.target.value);N(b),u(1),x({page:"1",perPage:b.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:p,onChange:h,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:s,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:F,onChange:t=>{O(t.target.value),t.target.value===""&&$("")},placeholder:"Search...",className:"min-w-[200px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:M||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[115px]",children:e.jsxs("span",{className:`sort ${r==="order_id"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Order Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${r==="first_name"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${r==="branch_name"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("branch_name"),children:[e.jsx("span",{className:"sort-label",children:"Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${r==="workshop_name"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("workshop_name"),children:[e.jsx("span",{className:"sort-label",children:"Workshop name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[200px]",children:"Workshop Manager"}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${r==="mobile_number"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile No"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Shipping address"}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${r==="created_at"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("created_at"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${r==="estimated_pickup_time"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${r==="estimated_delivery_time"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="coupon_code"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="coupon_discount"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${r==="sub_total"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Bill Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[105px]",children:e.jsxs("span",{className:`sort ${r==="total"?c==="ASC"?"asc":"desc":""}`,onClick:()=>a("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Duo Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:"Payment type"}),e.jsx("th",{className:"min-w-[50px]",children:"Action"})]})}),i?e.jsx(U,{}):(k==null?void 0:k.length)>0?e.jsx("tbody",{children:k.map(t=>{const b=R(t.order_status_details.admin_label),D=R(t.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsxs("td",{className:"cursor-pointer text-blue-600 hover:underline",onClick:()=>y(`/order/${t.order_id}`),children:["#",t.order_id]}),e.jsxs("td",{children:[t.user.first_name," ",t.user.last_name]}),e.jsx("td",{children:t.branch.branch_name}),e.jsx("td",{children:t.workshop.workshop_name}),e.jsx("td",{children:e.jsx("span",{className:`${b} relative badge-outline badge-xl rounded-[30px]`,children:t.order_status_details.admin_label})}),e.jsx("td",{children:t.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${D} badge-outline badge-xl rounded-[30px]`,children:t.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:t.order_status_details.description})]})}),e.jsx("td",{children:t.workshop.workshopManagerMappings.map(W=>`${W.user.first_name} ${W.user.last_name}`).join(", ")}),e.jsx("td",{children:t.user.mobile_number}),e.jsx("td",{children:t.address_details}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[E(t.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),E(t.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:E(t.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[E(t.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:t.coupon_code}),e.jsx("td",{children:t.coupon_discount}),e.jsx("td",{children:t.sub_total}),e.jsx("td",{children:t.total}),e.jsx("td",{children:X[t.payment_type]}),e.jsx("td",{children:e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>S(t.order_id),children:e.jsx(B,{size:18,className:"text-gray-600"})})})]},t.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),e.jsx(z,{count:w,currentPage:o,totalRecords:k==null?void 0:k.length,perPage:p,onPageChange:m,label:"orders"})]})})]})},ne=({filters:n,updateFilters:o,workshopOrderStatusOptions:u})=>{const p=q(s=>s.user.role_id),[N,_]=l.useState([]),[x,r]=l.useState([]),[g,c]=l.useState([]),[f,v]=l.useState([]),[C,j]=l.useState([]),[$,F]=l.useState([]),[O,M]=l.useState(""),[P,k]=l.useState(""),{fetchUsersByRole:i}=H(),{branches:w}=J(),{workshops:y}=se(1,1e3),d=Object.entries(Z).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a}));l.useEffect(()=>{(async()=>{const a=await i(5),m=await i(6),h=t=>t.map(b=>({label:`${b.first_name} ${b.last_name} (${b.mobile_number})`,value:b.user_id}));_(h(a)),v(h(m))})()},[]),l.useEffect(()=>{O?(async()=>{const m=(await i(5,O)).map(h=>({label:`${h.first_name} ${h.last_name} (${h.mobile_number})`,value:h.user_id}));r(m)})():r(N)},[O,N]),l.useEffect(()=>{P?(async()=>{const m=(await i(6,P)).map(h=>({label:`${h.first_name} ${h.last_name} (${h.mobile_number})`,value:h.user_id}));j(m)})():j(f)},[C,f]);const S=(s,a)=>[...s.filter(m=>!a.some(h=>h.value===m.value)),...a];return e.jsx(e.Fragment,{children:e.jsx("div",{className:"p-4",children:e.jsxs("div",{className:"grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4",children:[p!==6&&e.jsx(A,{options:y==null?void 0:y.map(s=>({label:s.workshop_name,value:s.workshop_id})),displayValue:"label",placeholder:"Select Workshop",selectedValues:n.workshopFilter,onSelect:s=>o({...n,workshopFilter:s.map(a=>a.value)}),onRemove:s=>o({...n,workshopFilter:s.map(a=>a.value)}),className:"w-full"}),e.jsx(A,{options:S($,C),displayValue:"label",placeholder:"Select Workshop Manager",selectedValues:n.workshopManagerFilter,onSelect:s=>{F(s);const a=s.map(m=>m.value);o({...n,workshopManagerFilter:a})},onRemove:s=>{F(s);const a=s.map(m=>m.value);o({...n,workshopManagerFilter:a})},className:"w-full"}),e.jsx(A,{options:S(g,x),displayValue:"label",placeholder:"Search Customer",selectedValues:g.map(s=>s.value),onSelect:s=>{c(s);const a=s.map(m=>m.value);o({...n,customerFilter:a})},onRemove:s=>{c(s);const a=s.map(m=>m.value);o({...n,customerFilter:a})},setSearch:M,className:"w-full",isSearchInput:!0}),e.jsx(A,{options:w==null?void 0:w.map(s=>({label:s.branch_name,value:s.branch_id})),displayValue:"label",placeholder:"Select Branch",selectedValues:n.branchFilter,onSelect:s=>o({...n,branchFilter:s.map(a=>a.value)}),onRemove:s=>o({...n,branchFilter:s.map(a=>a.value)}),className:"w-full"}),e.jsx(A,{options:u,displayValue:"label",placeholder:"Select Order Status",selectedValues:n.workshopOrderStatusFilter,onSelect:s=>o({...n,workshopOrderStatusFilter:s.map(a=>a.value)}),onRemove:s=>o({...n,workshopOrderStatusFilter:s.map(a=>a.value)}),isCustomLabel:!0,isSearchInput:!1,className:"w-full"}),e.jsx(A,{options:d,displayValue:"label",placeholder:"Select Payment Status",selectedValues:n.paymentStatusFilter,onSelect:s=>o({...n,paymentStatusFilter:s.map(a=>a.value)}),onRemove:s=>o({...n,paymentStatusFilter:s.map(a=>a.value)}),isSearchInput:!1,sliceCount:2,className:"w-full"}),e.jsxs("select",{className:"select select-lg w-[200px] text-sm",value:n.paymentTypeFilter||"",onChange:s=>o({...n,paymentTypeFilter:Number(s.target.value)}),children:[e.jsx("option",{value:"",children:"Payment type"}),e.jsx("option",{value:1,children:"Cash on Delivery"}),e.jsx("option",{value:2,children:"Online Payment"})]})]})})})},de=()=>{const[n,o]=l.useState(!1),[u,p]=l.useState({paymentStatusFilter:[],workshopOrderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],branchFilter:[],workshopFilter:[],workshopManagerFilter:[]}),N=r=>{p(r)},x=(r=>Object.entries(ee).filter(([g])=>r.includes(g)).map(([g,c])=>({label:g,value:c})))(["Workshop Assigned","Order Received at Workshop","Order Work In Progress"]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsx("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Workshop Orders"})})}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>o(!n),children:["Filters",n?e.jsx(K,{size:23}):e.jsx(Q,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[n&&e.jsx(ne,{filters:u,updateFilters:N,workshopOrderStatusOptions:x})," ",e.jsx(te,{filters:u})]})})})]})};export{de as default};
