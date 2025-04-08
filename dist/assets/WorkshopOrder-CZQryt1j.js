import{r as l,B as D,V as A,u as I,i as Y,j as e,T as U,k as W,o as B,P as z,s as G,b as L,g as q,t as H,q as J,R as K,w as Q}from"./index-BUS4H48H.js";import{T as X}from"./TableShimmer-CCO57AY_.js";import{c as Z,P as ee,O as se}from"./enums-B2C1EGNG.js";import{g as R}from"./orderStatusClasses-HfHBGnti.js";import{u as ae}from"./useGetWorkshops-DU2-bcBi.js";import{M as E}from"./MultiSelect-BRBLPFcL.js";const te=(t=1,n=10,u="",p,b,y,x,c,g,i,N,v)=>{const[F,j]=l.useState(),[$,C]=l.useState(0),[O,P]=l.useState(!1),M=async()=>{var w,_;const k=localStorage.getItem("authToken"),o=new URLSearchParams;t&&o.append("page_number",t.toString()),n&&o.append("per_page",n.toString()),u&&o.append("search",u),p&&o.append("sort_by",p),b&&o.append("order",b),y&&y.forEach(d=>o.append("order_statuses",d.toString())),x&&x.forEach(d=>o.append("customer_ids",d.toString())),c&&c.forEach(d=>o.append("branches_ids",d.toString())),i&&i.forEach(d=>o.append("payment_statuses",d.toString())),N&&N.forEach(d=>o.append("workshop_ids",d.toString())),v&&v.forEach(d=>o.append("workshop_manager_ids",d.toString())),g&&o.append("payment_types",g.toString()),P(!0);try{const d=await fetch(`${D}/admin/orders/workshop?${o}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`}}),S=await d.json();if(!d.ok){A.error(S.message,{position:"top-center"}),P(!1);return}j(((w=S==null?void 0:S.data)==null?void 0:w.workshopOrders)||[]),C((_=S==null?void 0:S.data)==null?void 0:_.count)}catch{A.error("Network error: Failed to fetch workshop orders.")}finally{P(!1)}};return l.useEffect(()=>{M()},[t,n,u,p,b,y,x,c,g,i,N,v]),{workshopOrders:F,loading:O,count:$}},re=({filters:t})=>{const[n,u]=l.useState(1),[p,b]=l.useState(10),[y,x]=I(),[c,g]=l.useState(null),[i,N]=l.useState(null),v=y.get("page"),F=y.get("perPage"),[j,$]=l.useState(""),[C,O]=l.useState(""),[P,M]=l.useState(""),{workshopOrders:k,loading:o,count:w}=te(n,p,j,c,i,t.workshopOrderStatusFilter,t.customerFilter,t.branchFilter,t.paymentTypeFilter,t.paymentStatusFilter,t.workshopFilter,t.workshopManagerFilter),_=Y(),d=Math.ceil(w/p);l.useEffect(()=>{v&&u(Number(v)),F&&b(Number(F))},[v,F]),l.useEffect(()=>{u(1),x(j!==""?{search:j,page:"1",perPage:p.toString()}:{})},[j]),l.useEffect(()=>{u(1),x(j!==""?{search:j,page:"1",perPage:p.toString()}:{})},[t.workshopOrderStatusFilter,t.customerFilter,t.branchFilter,t.paymentTypeFilter,t.paymentStatusFilter,t.workshopFilter,t.workshopManagerFilter]);const S=r=>{_(`/order/${r}`,{state:{from:"WorkshopOrderTable"}})},s=async r=>{r.preventDefault();try{await G.validate({search:C},{abortEarly:!1}),$(C),M("")}catch(f){f instanceof L&&M(f.errors[0])}};l.useEffect(()=>{j&&(u(1),x({search:j,page:"1",perPage:p.toString()}))},[j]);const a=r=>{c===r?N(i==="ASC"?"DESC":"ASC"):(g(r),N("ASC"))},m=r=>{r>=1&&r<=d&&(u(r),x({page:r.toString(),perPage:p.toString()}))},h=r=>{const f=Number(r.target.value);b(f),u(1),x({page:"1",perPage:f.toString()})};return o?e.jsx(U,{isFilters:!0,columns:12,records:10,isPagination:!0}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:p,onChange:h,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:s,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:C,onChange:r=>{O(r.target.value),r.target.value===""&&$("")},placeholder:"Search...",className:"min-w-[200px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:P||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"!px-3",style:{display:"none"},children:e.jsx("label",{className:"flex items-center justify-center",children:e.jsx("input",{className:"checkbox",type:"checkbox",disabled:!0})})}),e.jsx("th",{className:"min-w-[115px]",children:e.jsxs("span",{className:`sort ${c==="order_id"?i==="ASC"?"asc":"desc":""}`,onClick:()=>a("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Order Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="branch_name"?i==="ASC"?"asc":"desc":""}`,onClick:()=>a("branch_name"),children:[e.jsx("span",{className:"sort-label",children:"Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${c==="first_name"?i==="ASC"?"asc":"desc":""}`,onClick:()=>a("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer Name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Current Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[200px]",children:"Workshop Manager"}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="workshop_name"?i==="ASC"?"asc":"desc":""}`,onClick:()=>a("workshop_name"),children:[e.jsx("span",{className:"sort-label",children:"Workshop name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="created_at"?i==="ASC"?"asc":"desc":""}`,onClick:()=>a("created_at"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="estimated_pickup_time"?i==="ASC"?"asc":"desc":""}`,onClick:()=>a("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="estimated_delivery_time"?i==="ASC"?"asc":"desc":""}`,onClick:()=>a("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[105px]",children:e.jsxs("span",{className:`sort ${c==="total"?i==="ASC"?"asc":"desc":""}`,onClick:()=>a("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:"Payment type"}),e.jsx("th",{className:"min-w-[50px]",children:"Action"})]})}),o?e.jsx(X,{}):(k==null?void 0:k.length)>0?e.jsx("tbody",{children:k.map(r=>{const f=R(r.order_status_details.admin_label),T=R(r.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsx("th",{style:{display:"none"},children:e.jsx("label",{className:"flex items-center justify-center",children:e.jsx("input",{className:"checkbox",type:"checkbox"})})}),e.jsxs("td",{className:"cursor-pointer text-blue-600 hover:underline",onClick:()=>_(`/order/${r.order_id}`),children:["#",r.order_id]}),e.jsx("td",{children:r.branch.branch_name}),e.jsxs("td",{children:[r.user.first_name," ",r.user.last_name]}),e.jsx("td",{children:e.jsx("span",{className:`${f} relative badge-outline badge-xl rounded-[30px]`,children:r.order_status_details.admin_label})}),e.jsx("td",{children:r.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${T} badge-outline badge-xl rounded-[30px]`,children:r.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:r.order_status_details.description})]})}),e.jsx("td",{children:r.workshop.workshopManagerMappings.map(V=>`${V.user.first_name} ${V.user.last_name}`).join(", ")}),e.jsx("td",{children:r.workshop.workshop_name}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[W(r.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),W(r.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:W(r.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[W(r.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:r.total}),e.jsx("td",{children:Z[r.payment_type]}),e.jsx("td",{children:e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>S(r.order_id),children:e.jsx(B,{size:18,className:"text-gray-600"})})})]},r.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),e.jsx(z,{count:w,currentPage:n,totalRecords:k==null?void 0:k.length,perPage:p,onPageChange:m,label:"orders"})]})})]})},le=({filters:t,updateFilters:n,workshopOrderStatusOptions:u})=>{const p=q(s=>s.user.role_id),[b,y]=l.useState([]),[x,c]=l.useState([]),[g,i]=l.useState([]),[N,v]=l.useState([]),[F,j]=l.useState([]),[$,C]=l.useState([]),[O,P]=l.useState(""),[M,k]=l.useState(""),{fetchUsersByRole:o}=H(),{branches:w}=J(),{workshops:_}=ae(1,1e3),d=Object.entries(ee).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a}));l.useEffect(()=>{(async()=>{const a=await o(5),m=await o(6),h=r=>r.map(f=>({label:`${f.first_name} ${f.last_name} (${f.mobile_number})`,value:f.user_id}));y(h(a)),v(h(m))})()},[]),l.useEffect(()=>{O?(async()=>{const m=(await o(5,O)).map(h=>({label:`${h.first_name} ${h.last_name} (${h.mobile_number})`,value:h.user_id}));c(m)})():c(b)},[O,b]),l.useEffect(()=>{M?(async()=>{const m=(await o(6,M)).map(h=>({label:`${h.first_name} ${h.last_name} (${h.mobile_number})`,value:h.user_id}));j(m)})():j(N)},[F,N]);const S=(s,a)=>[...s.filter(m=>!a.some(h=>h.value===m.value)),...a];return e.jsx(e.Fragment,{children:e.jsx("div",{className:"p-4",children:e.jsxs("div",{className:"grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4",children:[p!==6&&e.jsx(E,{options:_==null?void 0:_.map(s=>({label:s.workshop_name,value:s.workshop_id})),displayValue:"label",placeholder:"Select Workshop",selectedValues:t.workshopFilter,onSelect:s=>n({...t,workshopFilter:s.map(a=>a.value)}),onRemove:s=>n({...t,workshopFilter:s.map(a=>a.value)}),className:"w-full"}),e.jsx(E,{options:S($,F),displayValue:"label",placeholder:"Select Workshop Manager",selectedValues:t.workshopManagerFilter,onSelect:s=>{C(s);const a=s.map(m=>m.value);n({...t,workshopManagerFilter:a})},onRemove:s=>{C(s);const a=s.map(m=>m.value);n({...t,workshopManagerFilter:a})},className:"w-full"}),e.jsx(E,{options:S(g,x),displayValue:"label",placeholder:"Search Customer",selectedValues:g.map(s=>s.value),onSelect:s=>{i(s);const a=s.map(m=>m.value);n({...t,customerFilter:a})},onRemove:s=>{i(s);const a=s.map(m=>m.value);n({...t,customerFilter:a})},setSearch:P,className:"w-full",isSearchInput:!0}),e.jsx(E,{options:w==null?void 0:w.map(s=>({label:s.branch_name,value:s.branch_id})),displayValue:"label",placeholder:"Select Branch",selectedValues:t.branchFilter,onSelect:s=>n({...t,branchFilter:s.map(a=>a.value)}),onRemove:s=>n({...t,branchFilter:s.map(a=>a.value)}),className:"w-full"}),e.jsx(E,{options:u,displayValue:"label",placeholder:"Select Order Status",selectedValues:t.workshopOrderStatusFilter,onSelect:s=>n({...t,workshopOrderStatusFilter:s.map(a=>a.value)}),onRemove:s=>n({...t,workshopOrderStatusFilter:s.map(a=>a.value)}),isCustomLabel:!0,isSearchInput:!1,className:"w-full"}),e.jsx(E,{options:d,displayValue:"label",placeholder:"Select Payment Status",selectedValues:t.paymentStatusFilter,onSelect:s=>n({...t,paymentStatusFilter:s.map(a=>a.value)}),onRemove:s=>n({...t,paymentStatusFilter:s.map(a=>a.value)}),isSearchInput:!1,sliceCount:2,className:"w-full"}),e.jsxs("select",{className:"select select-lg w-[200px] text-sm",value:t.paymentTypeFilter||"",onChange:s=>n({...t,paymentTypeFilter:Number(s.target.value)}),children:[e.jsx("option",{value:"",children:"Payment type"}),e.jsx("option",{value:1,children:"Cash on Delivery"}),e.jsx("option",{value:2,children:"Online Payment"})]})]})})})},pe=()=>{const[t,n]=l.useState(!1),[u,p]=l.useState({paymentStatusFilter:[],workshopOrderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],branchFilter:[],workshopFilter:[],workshopManagerFilter:[]}),b=c=>{p(c)},x=(c=>Object.entries(se).filter(([g])=>c.includes(g)).map(([g,i])=>({label:g,value:i})))(["Workshop Assigned","Order Received at Workshop","Order Work In Progress"]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsx("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Workshop Orders"})})}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>n(!t),children:["Filters",t?e.jsx(K,{size:23}):e.jsx(Q,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[t&&e.jsx(le,{filters:u,updateFilters:b,workshopOrderStatusOptions:x})," ",e.jsx(re,{filters:u})]})})})]})};export{pe as default};
