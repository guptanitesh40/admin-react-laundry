import{r,B as T,V,u as Y,h as I,j as e,T as U,i as A,n as B,P as z,s as G,b as L,q,R as H,w as J}from"./index-Qj1W7LSO.js";import{P as K,b as Q,O as X}from"./enums-Dwyd47hm.js";import{g as R}from"./orderStatusClasses-HfHBGnti.js";import{u as Z}from"./useGetBranches-FPDYmiQD.js";import{u as ee}from"./useGetWorkshops-B2P7u94x.js";import{M}from"./MultiSelect-D7aGrrTZ.js";const se=(t=1,i=10,x="",p,b,f,h,c,S,o,k,N)=>{const[v,g]=r.useState(),[C,_]=r.useState(0),[P,y]=r.useState(!1),$=async()=>{var w,F;const j=localStorage.getItem("authToken"),d=new URLSearchParams;t&&d.append("page_number",t.toString()),i&&d.append("per_page",i.toString()),x&&d.append("search",x),p&&d.append("sort_by",p),b&&d.append("order",b),f&&f.forEach(m=>d.append("order_statuses",m.toString())),h&&h.forEach(m=>d.append("customer_ids",m.toString())),c&&c.forEach(m=>d.append("branches_ids",m.toString())),o&&o.forEach(m=>d.append("payment_statuses",m.toString())),k&&k.forEach(m=>d.append("workshop_ids",m.toString())),N&&N.forEach(m=>d.append("workshop_manager_ids",m.toString())),S&&d.append("payment_types",S.toString()),y(!0);try{const m=await fetch(`${T}/admin/orders/workshop?${d}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`}}),s=await m.json();if(!m.ok){V.error(s.message,{position:"top-center"}),y(!1);return}g(((w=s==null?void 0:s.data)==null?void 0:w.workshopOrders)||[]),_((F=s==null?void 0:s.data)==null?void 0:F.count)}catch{V.error("Network error: Failed to fetch workshop orders.")}finally{y(!1)}};return r.useEffect(()=>{$()},[t,i,x,p,b,f,h,c,S,o,k,N]),{workshopOrders:v,loading:P,count:C}},ae=({filters:t})=>{const[i,x]=r.useState(1),[p,b]=r.useState(10),[f,h]=Y(),[c,S]=r.useState(null),[o,k]=r.useState(null),N=f.get("page"),v=f.get("perPage"),[g,C]=r.useState(""),[_,P]=r.useState(""),[y,$]=r.useState(""),{workshopOrders:j,loading:d,count:w}=se(i,p,g,c,o,t.workshopOrderStatusFilter,t.customerFilter,t.branchFilter,t.paymentTypeFilter,t.paymentStatusFilter,t.workshopFilter,t.workshopManagerFilter),F=I(),m=Math.ceil(w/p);r.useEffect(()=>{N&&x(Number(N)),v&&b(Number(v))},[N,v]),r.useEffect(()=>{x(1),h(g!==""?{search:g,page:"1",perPage:p.toString()}:{})},[g]),r.useEffect(()=>{x(1),h(g!==""?{search:g,page:"1",perPage:p.toString()}:{})},[t.workshopOrderStatusFilter,t.customerFilter,t.branchFilter,t.paymentTypeFilter,t.paymentStatusFilter,t.workshopFilter,t.workshopManagerFilter]);const s=a=>{F(`/order/${a}`,{state:{from:"WorkshopOrderTable"}})},n=async a=>{a.preventDefault();try{await G.validate({search:_},{abortEarly:!1}),C(_),$("")}catch(O){O instanceof L&&$(O.errors[0])}};r.useEffect(()=>{g&&(x(1),h({search:g,page:"1",perPage:p.toString()}))},[g]);const l=a=>{c===a?k(o==="ASC"?"DESC":"ASC"):(S(a),k("ASC"))},u=a=>{a>=1&&a<=m&&(x(a),h({page:a.toString(),perPage:p.toString()}))},E=a=>{const O=Number(a.target.value);b(O),x(1),h({page:"1",perPage:O.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:p,onChange:E,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:n,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:_,onChange:a=>{P(a.target.value),a.target.value===""&&C("")},placeholder:"Search...",className:"min-w-[200px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:y||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[115px]",children:e.jsxs("span",{className:`sort ${c==="order_id"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Order Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${c==="first_name"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="branch_name"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("branch_name"),children:[e.jsx("span",{className:"sort-label",children:"Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="workshop_name"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("workshop_name"),children:[e.jsx("span",{className:"sort-label",children:"Workshop name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[200px]",children:"Workshop Manager"}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${c==="mobile_number"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile No"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Shipping address"}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="created_at"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("created_at"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="estimated_pickup_time"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="estimated_delivery_time"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="coupon_code"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="coupon_discount"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="sub_total"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Bill Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[105px]",children:e.jsxs("span",{className:`sort ${c==="total"?o==="ASC"?"asc":"desc":""}`,onClick:()=>l("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Duo Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:"Payment type"}),e.jsx("th",{className:"min-w-[50px]",children:"Action"})]})}),d?e.jsx(U,{}):(j==null?void 0:j.length)>0?e.jsx("tbody",{children:j.map(a=>{const O=R(a.order_status_details.admin_label),D=R(a.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsxs("td",{className:"cursor-pointer",onClick:()=>F(`/order/${a.order_id}`),children:["#",a.order_id]}),e.jsxs("td",{children:[a.user.first_name," ",a.user.last_name]}),e.jsx("td",{children:a.branch.branch_name}),e.jsx("td",{children:a.workshop.workshop_name}),e.jsx("td",{children:e.jsx("span",{className:`${O} relative badge-outline badge-xl rounded-[30px]`,children:a.order_status_details.admin_label})}),e.jsx("td",{children:a.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${D} badge-outline badge-xl rounded-[30px]`,children:a.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:a.order_status_details.description})]})}),e.jsx("td",{children:a.workshop.workshopManagerMappings.map(W=>`${W.user.first_name} ${W.user.last_name}`).join(", ")}),e.jsx("td",{children:a.user.mobile_number}),e.jsx("td",{children:a.address_details}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[A(a.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),A(a.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:A(a.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[A(a.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:a.coupon_code}),e.jsx("td",{children:a.coupon_discount}),e.jsx("td",{children:a.sub_total}),e.jsx("td",{children:a.total}),e.jsx("td",{children:K[a.payment_type]}),e.jsx("td",{children:e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>s(a.order_id),children:e.jsx(B,{size:18,className:"text-gray-600"})})})]},a.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),e.jsx(z,{count:w,currentPage:i,totalRecords:j==null?void 0:j.length,perPage:p,onPageChange:u,label:"orders"})]})})]})},te=({filters:t,updateFilters:i,workshopOrderStatusOptions:x})=>{const[p,b]=r.useState([]),[f,h]=r.useState([]),[c,S]=r.useState([]),[o,k]=r.useState([]),[N,v]=r.useState([]),[g,C]=r.useState([]),[_,P]=r.useState(""),[y,$]=r.useState(""),{fetchUsersByRole:j}=q(),{branches:d}=Z(),{workshops:w}=ee(1,1e3),F=Object.entries(Q).filter(([s,n])=>typeof n=="number").map(([s,n])=>({label:s,value:n}));r.useEffect(()=>{(async()=>{const n=await j(5),l=await j(6),u=E=>E.map(a=>({label:`${a.first_name} ${a.last_name} (${a.mobile_number})`,value:a.user_id}));b(u(n)),k(u(l))})()},[]),r.useEffect(()=>{_?(async()=>{const l=(await j(5,_)).map(u=>({label:`${u.first_name} ${u.last_name} (${u.mobile_number})`,value:u.user_id}));h(l)})():h(p)},[_,p]),r.useEffect(()=>{y?(async()=>{const l=(await j(6,y)).map(u=>({label:`${u.first_name} ${u.last_name} (${u.mobile_number})`,value:u.user_id}));v(l)})():v(o)},[N,o]);const m=(s,n)=>[...s.filter(l=>!n.some(u=>u.value===l.value)),...n];return e.jsx(e.Fragment,{children:e.jsx("div",{className:"p-4",children:e.jsxs("div",{className:"grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4",children:[e.jsx(M,{options:w==null?void 0:w.map(s=>({label:s.workshop_name,value:s.workshop_id})),displayValue:"label",placeholder:"Select Workshop",selectedValues:t.workshopFilter,onSelect:s=>i({...t,workshopFilter:s.map(n=>n.value)}),onRemove:s=>i({...t,workshopFilter:s.map(n=>n.value)}),className:"w-full"}),e.jsx(M,{options:m(g,N),displayValue:"label",placeholder:"Select Workshop Manager",selectedValues:t.workshopManagerFilter,onSelect:s=>{C(s);const n=s.map(l=>l.value);i({...t,workshopManagerFilter:n})},onRemove:s=>{C(s);const n=s.map(l=>l.value);i({...t,workshopManagerFilter:n})},className:"w-full"}),e.jsx(M,{options:m(c,f),displayValue:"label",placeholder:"Search Customer",selectedValues:c.map(s=>s.value),onSelect:s=>{S(s);const n=s.map(l=>l.value);i({...t,customerFilter:n})},onRemove:s=>{S(s);const n=s.map(l=>l.value);i({...t,customerFilter:n})},setSearch:P,className:"w-full",isSearchInput:!0}),e.jsx(M,{options:d==null?void 0:d.map(s=>({label:s.branch_name,value:s.branch_id})),displayValue:"label",placeholder:"Select Branch",selectedValues:t.branchFilter,onSelect:s=>i({...t,branchFilter:s.map(n=>n.value)}),onRemove:s=>i({...t,branchFilter:s.map(n=>n.value)}),className:"w-full"}),e.jsx(M,{options:x,displayValue:"label",placeholder:"Select Order Status",selectedValues:t.workshopOrderStatusFilter,onSelect:s=>i({...t,workshopOrderStatusFilter:s.map(n=>n.value)}),onRemove:s=>i({...t,workshopOrderStatusFilter:s.map(n=>n.value)}),isCustomLabel:!0,isSearchInput:!1,className:"w-full"}),e.jsx(M,{options:F,displayValue:"label",placeholder:"Select Payment Status",selectedValues:t.paymentStatusFilter,onSelect:s=>i({...t,paymentStatusFilter:s.map(n=>n.value)}),onRemove:s=>i({...t,paymentStatusFilter:s.map(n=>n.value)}),isSearchInput:!1,sliceCount:2,className:"w-full"}),e.jsxs("select",{className:"select select-lg w-[200px] text-sm",value:t.paymentTypeFilter||"",onChange:s=>i({...t,paymentTypeFilter:Number(s.target.value)}),children:[e.jsx("option",{value:"",children:"Payment type"}),e.jsx("option",{value:1,children:"Cash on Delivery"}),e.jsx("option",{value:2,children:"Online Payment"})]})]})})})},de=()=>{const[t,i]=r.useState(!1),[x,p]=r.useState({paymentStatusFilter:[],workshopOrderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],branchFilter:[],workshopFilter:[],workshopManagerFilter:[]}),b=c=>{p(c)},h=(c=>Object.entries(X).filter(([S])=>c.includes(S)).map(([S,o])=>({label:S,value:o})))(["Workshop Assigned","Order Received at Workshop","Order Work In Progress"]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsx("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Workshop Orders"})})}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>i(!t),children:["Filters",t?e.jsx(H,{size:23}):e.jsx(J,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[t&&e.jsx(te,{filters:x,updateFilters:b,workshopOrderStatusOptions:h})," ",e.jsx(ae,{filters:x})]})})})]})};export{de as default};
