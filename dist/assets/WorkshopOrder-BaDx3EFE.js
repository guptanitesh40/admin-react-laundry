import{r as i,V as E,u as T,k as Y,j as e,T as B,l as P,o as I,g as L,h as z,s as G,b as U,R as q,w as H}from"./index-DGiT1R86.js";import{P as K,b as J,W as Q}from"./enums-CdakGUf3.js";import{g as R}from"./orderStatusClasses-HfHBGnti.js";import{u as X}from"./useGetUsersByRole-Cnt-O-Pw.js";import{u as Z}from"./useGetBranches-d2npnCUv.js";import{u as ee}from"./useGetWorkshops-CzqtHkK-.js";import{M as C}from"./MultiSelect-D1jZHMy2.js";const se="http://3.110.208.70:3000/admin/orders/workshop",ae=(l=1,n=10,m="",p,N,g,v,c,_,r,b,S)=>{const[y,s]=i.useState(),[a,h]=i.useState(0),[x,F]=i.useState(!1),O=async()=>{var w,$;const k=localStorage.getItem("authToken"),d=new URLSearchParams;l&&d.append("page_number",l.toString()),n&&d.append("per_page",n.toString()),m&&d.append("search",m),p&&d.append("sortBy",p),N&&d.append("order",N),g&&g.forEach(o=>d.append("orderstatus",o.toString())),v&&v.forEach(o=>d.append("customer_id",o.toString())),c&&c.forEach(o=>d.append("branch_id",o.toString())),r&&r.forEach(o=>d.append("payment_status",o.toString())),b&&b.forEach(o=>d.append("workshop_id",o.toString())),S&&S.forEach(o=>d.append("workshop_manager_id",o.toString())),_&&d.append("payment_type",_.toString()),F(!0);try{const o=await fetch(`${se}?${d}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`}}),f=await o.json();if(!o.ok){E.error(f.message,{position:"top-center"}),F(!1);return}s((w=f==null?void 0:f.data)==null?void 0:w.workshopOrders),h(($=f==null?void 0:f.data)==null?void 0:$.count)}catch{E.error("Network error: Failed to fetch workshop orders.")}finally{F(!1)}};return i.useEffect(()=>{O()},[l,n,m,p,N,g,v,c,_,r,b,S]),{workshopOrders:y,loading:x,count:a}},te=({filters:l})=>{const[n,m]=i.useState(1),[p,N]=i.useState(10),[g,v]=T(),[c,_]=i.useState(null),[r,b]=i.useState(null),S=g.get("page"),y=g.get("perPage"),[s,a]=i.useState(""),[h,x]=i.useState(""),[F,O]=i.useState(""),{workshopOrders:k,loading:d,count:w}=ae(n,p,s,c,r,l.workshopOrderStatusFilter,l.customerFilter,l.branchFilter,l.paymentTypeFilter,l.paymentStatusFilter,l.workshopFilter,l.workshopManagerFilter),$=Y(),o=Math.ceil(w/p);i.useEffect(()=>{S&&m(Number(S)),y&&N(Number(y))},[S,y]);const f=t=>{$(`/order/${t}`)},V=async t=>{t.preventDefault();try{await G.validate({search:h},{abortEarly:!1}),a(h),O("")}catch(j){j instanceof U&&O(j.errors[0])}},u=t=>{c===t?b(r==="ASC"?"DESC":"ASC"):(_(t),b("ASC"))},M=t=>{t>=1&&t<=o&&(m(t),v({page:t.toString(),perPage:p.toString()}))},W=t=>{const j=Number(t.target.value);N(j),m(1),v({page:"1",perPage:j.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:p,onChange:W,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:V,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:h,onChange:t=>{x(t.target.value),t.target.value===""&&a("")},placeholder:"Search...",className:"min-w-[200px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:F||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[115px]",children:e.jsxs("span",{className:`sort ${c==="order_id"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Order Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${c==="first_name"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="branch_id"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="workshop_name"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("workshop_name"),children:[e.jsx("span",{className:"sort-label",children:"Workshop name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[200px]",children:"Workshop Manager"}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${c==="mobile_number"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile No"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Shipping address"}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="created_at"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("created_at"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="estimated_pickup_time"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="estimated_delivery_time"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="coupon_code"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="coupon_discount"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="sub_total"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Bill Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[105px]",children:e.jsxs("span",{className:`sort ${c==="total"?r==="ASC"?"asc":"desc":""}`,onClick:()=>u("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Duo Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:"Payment type"}),e.jsx("th",{className:"min-w-[50px]",children:"Action"})]})}),d?e.jsx(B,{}):(k==null?void 0:k.length)>0?e.jsx("tbody",{children:k.map(t=>{const j=R(t.order_status_details.admin_label),D=R(t.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",t.order_id]}),e.jsxs("td",{children:[t.user.first_name," ",t.user.last_name]}),e.jsx("td",{children:t.branch.branch_name}),e.jsx("td",{children:t.workshop.workshop_name}),e.jsx("td",{children:e.jsx("span",{className:`${j} relative badge-outline badge-xl rounded-[30px]`,children:t.order_status_details.admin_label})}),e.jsx("td",{children:t.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${D} badge-outline badge-xl rounded-[30px]`,children:t.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:t.order_status_details.description})]})}),e.jsx("td",{children:t.workshop.workshopManagerMappings.map(A=>`${A.user.first_name} ${A.user.last_name}`).join(", ")}),e.jsx("td",{children:t.user.mobile_number}),e.jsx("td",{children:t.address_details}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[P(t.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),P(t.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:P(t.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[P(t.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:t.coupon_code}),e.jsx("td",{children:t.coupon_discount}),e.jsx("td",{children:t.sub_total}),e.jsx("td",{children:t.total}),e.jsx("td",{children:K[t.payment_type]}),e.jsx("td",{children:e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>f(t.order_id),children:e.jsx(I,{size:18,className:"text-gray-600"})})})]},t.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Orders available"})})})]})}),w>p&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",k.length," of ",w," Workshop order"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:n===1,onClick:()=>M(n-1),className:`btn ${n===1?"disabled":""}`,children:e.jsx(L,{})}),Array.from({length:o}).map((t,j)=>e.jsx("button",{className:`btn ${n===j+1?"active":""}`,onClick:()=>M(j+1),children:j+1},j)),e.jsx("button",{disabled:n===o,onClick:()=>M(n+1),className:`btn ${n===o?"disabled":""}`,children:e.jsx(z,{})})]})]})})]})})]})},le=({filters:l,updateFilters:n})=>{const[m,p]=i.useState(""),[N,g]=i.useState([]),[v,c]=i.useState([]),{fetchUsersByRole:_}=X(),{branches:r}=Z(),{workshops:b}=ee(1,1e3),S=Object.entries(J).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a})),y=Object.entries(Q).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a}));return i.useEffect(()=>{(async()=>{const a=await _(6);if(a){const h=a.map(x=>({label:`${x.first_name} ${x.last_name} (${x.mobile_number})`,value:x.user_id}));c(h)}})()},[]),i.useEffect(()=>{m&&(async()=>{const a=await _(5,m),h=a==null?void 0:a.map(x=>({label:`${x.first_name} ${x.last_name} (${x.mobile_number})`,value:x.user_id}));g(h)})()},[m]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"p-4",children:e.jsxs("div",{className:"grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4",children:[e.jsx(C,{options:b==null?void 0:b.map(s=>({label:s.workshop_name,value:s.workshop_id})),displayValue:"label",placeholder:"Select Workshop",selectedValues:l.workshopFilter,onSelect:s=>n({...l,workshopFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,workshopFilter:s.map(a=>a.value)}),className:"w-full"}),e.jsx(C,{options:v,displayValue:"label",placeholder:"Select Workshop Manager",selectedValues:l.workshopManagerFilter,onSelect:s=>n({...l,workshopManagerFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,workshopManagerFilter:s.map(a=>a.value)}),className:"w-full"}),e.jsx(C,{options:N,displayValue:"label",placeholder:"Search Customer",selectedValues:l.customerFilter,onSelect:s=>{const a=s.map(h=>h.value);n({...l,customerFilter:a})},onRemove:s=>{const a=s.map(h=>h.value);n({...l,customerFilter:a})},setSearch:p,className:"w-full",isSearchInput:!0}),e.jsx(C,{options:r==null?void 0:r.map(s=>({label:s.branch_name,value:s.branch_id})),displayValue:"label",placeholder:"Select Branch",selectedValues:l.branchFilter,onSelect:s=>n({...l,branchFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,branchFilter:s.map(a=>a.value)}),className:"w-full"}),e.jsx(C,{options:y,displayValue:"label",placeholder:"Select Order Status",selectedValues:l.workshopOrderStatusFilter,onSelect:s=>n({...l,workshopOrderStatusFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,workshopOrderStatusFilter:s.map(a=>a.value)}),isSearchInput:!1,className:"w-full"}),e.jsx(C,{options:S,displayValue:"label",placeholder:"Select Payment Status",selectedValues:l.paymentStatusFilter,onSelect:s=>n({...l,paymentStatusFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,paymentStatusFilter:s.map(a=>a.value)}),isSearchInput:!1,sliceCount:2,className:"w-full"}),e.jsxs("select",{className:"select select-lg w-[200px] text-sm mt-4",value:l.paymentTypeFilter||"",onChange:s=>n({...l,paymentTypeFilter:Number(s.target.value)}),children:[e.jsx("option",{value:"",children:"Payment type"}),e.jsx("option",{value:1,children:"Cash on Delivery"}),e.jsx("option",{value:2,children:"Online Payment"})]})]})})})},pe=()=>{const[l,n]=i.useState(!1),[m,p]=i.useState({paymentStatusFilter:[],workshopOrderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],branchFilter:[],workshopFilter:[],workshopManagerFilter:[]}),N=g=>{p(g)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsx("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Workshop Orders"})})}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>n(!l),children:["Filters",l?e.jsx(q,{size:23}):e.jsx(H,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[l&&e.jsx(le,{filters:m,updateFilters:N})," ",e.jsx(te,{filters:m})]})})})]})};export{pe as default};
