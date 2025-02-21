import{r as i,_ as M,u as D,g as Y,j as e,h as A,aP as B,d as G,e as I,V as z,aU as L,aV as U}from"./index-DMSbvj8i.js";import{T as K}from"./TableShimmer-2GqGFreh.js";import{P as V,b as q,W as H}from"./enums-DgP6u8Ia.js";import{s as J}from"./searchSchema-CJY6-_5j.js";import{g as Q}from"./paymentStatusClasses-BddHAg9R.js";import{u as X}from"./useGetUsersByRole-Bk3t1Dqh.js";import{u as Z}from"./useGetBranches-6MOhQY7b.js";import{u as ee}from"./useGetWorkshops-Dxe-bt-1.js";import{M as C}from"./MultiSelect-C4keEoFF.js";import"./orderStatusClasses-DgGpuqsn.js";const se="http://3.110.208.70:3000/admin/orders/workshop",ae=(l=1,n=10,p="",h,b,g,y,c,k,r,N,S)=>{const[v,s]=i.useState(),[a,x]=i.useState(0),[u,F]=i.useState(!1),O=async()=>{var _,$;const w=localStorage.getItem("authToken"),m=new URLSearchParams;l&&m.append("page_number",l.toString()),n&&m.append("per_page",n.toString()),p&&m.append("search",p),h&&m.append("sortBy",h),b&&m.append("order",b),g&&g.forEach(o=>m.append("orderstatus",o.toString())),y&&y.forEach(o=>m.append("customer_id",o.toString())),c&&c.forEach(o=>m.append("branch_id",o.toString())),r&&r.forEach(o=>m.append("payment_status",o.toString())),N&&N.forEach(o=>m.append("workshop_id",o.toString())),S&&S.forEach(o=>m.append("workshop_manager_id",o.toString())),k&&m.append("payment_type",k.toString()),F(!0);try{const o=await fetch(`${se}?${m}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`}}),f=await o.json();if(!o.ok){M.error(f.message,{position:"top-center"}),F(!1);return}s((_=f==null?void 0:f.data)==null?void 0:_.workshopOrders),x(($=f==null?void 0:f.data)==null?void 0:$.count)}catch{M.error("Network error: Failed to fetch workshop orders.")}finally{F(!1)}};return i.useEffect(()=>{O()},[l,n,p,h,b,g,y,c,k,r,N,S]),{workshopOrders:v,loading:u,count:a}},te=({filters:l})=>{const[n,p]=i.useState(1),[h,b]=i.useState(10),[g,y]=D(),[c,k]=i.useState(null),[r,N]=i.useState(null),S=g.get("page"),v=g.get("perPage"),[s,a]=i.useState(""),[x,u]=i.useState(""),[F,O]=i.useState(""),{workshopOrders:w,loading:m,count:_}=ae(n,h,s,c,r,l.workshopOrderStatusFilter,l.customerFilter,l.branchFilter,l.paymentTypeFilter,l.paymentStatusFilter,l.workshopFilter,l.workshopManagerFilter),$=Y(),o=Math.ceil(_/h);i.useEffect(()=>{S&&p(Number(S)),v&&b(Number(v))},[S,v]);const f=t=>{$(`/order/${t}`,{state:{from:"WorkshopOrderTable"}})},W=async t=>{t.preventDefault();try{await J.validate({search:x},{abortEarly:!1}),a(x),O("")}catch(j){j instanceof z&&O(j.errors[0])}},d=t=>{c===t?N(r==="ASC"?"DESC":"ASC"):(k(t),N("ASC"))},P=t=>{t>=1&&t<=o&&(p(t),y({page:t.toString(),perPage:h.toString()}))},R=t=>{const j=Number(t.target.value);b(j),p(1),y({page:"1",perPage:j.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:h,onChange:R,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:W,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:x,onChange:t=>{u(t.target.value),t.target.value===""&&a("")},placeholder:"Search...",className:"w-[275px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:F||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[115px]",children:e.jsxs("span",{className:`sort ${c==="order_id"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Order Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${c==="first_name"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${c==="email"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${c==="mobile_number"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile No"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Shipping address"}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="coupon_code"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("coupon_code"),children:[e.jsx("span",{className:"sort-label",children:"Coupon code"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="coupon_discount"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("coupon_discount"),children:[e.jsx("span",{className:"sort-label",children:"Coupon discount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[220px]",children:"Order Status"}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="estimated_delivery_time"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated delivery time"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="estimated_pickup_time"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Estimated pickup time"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("span",{className:`sort ${c==="shipping_charges"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("shipping_charges"),children:[e.jsx("span",{className:"sort-label",children:"Shipping charge"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[180px]",children:e.jsxs("span",{className:`sort ${c==="express_delivery_charges"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("express_delivery_charges"),children:[e.jsx("span",{className:"sort-label",children:"Express delivery charges"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[100px]",children:e.jsxs("span",{className:`sort ${c==="gst"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("gst"),children:[e.jsx("span",{className:"sort-label",children:"GST"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="kasar_amount"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("kasar_amount"),children:[e.jsx("span",{className:"sort-label",children:"Kasar amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="sub_total"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("sub_total"),children:[e.jsx("span",{className:"sort-label",children:"Sub total"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[105px]",children:e.jsxs("span",{className:`sort ${c==="total"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("total"),children:[e.jsx("span",{className:"sort-label",children:"Total"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:"Payment type"}),e.jsx("th",{className:"min-w-[175px]",children:"Payment status"}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="branch_id"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="workshop_name"?r==="ASC"?"asc":"desc":""}`,onClick:()=>d("workshop_name"),children:[e.jsx("span",{className:"sort-label",children:"Workshop name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:"Workshop Manager"}),e.jsx("th",{className:"min-w-[50px]",children:"Action"})]})}),m?e.jsx(K,{}):(w==null?void 0:w.length)>0?e.jsx("tbody",{children:w.map(t=>{const j=V[t.payment_status],T=Q(t.payment_status);return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",t.order_id]}),e.jsxs("td",{children:[t.user.first_name," ",t.user.last_name]}),e.jsx("td",{children:t.user.email}),e.jsx("td",{children:t.user.mobile_number}),e.jsx("td",{children:t.address_details}),e.jsx("td",{children:t.coupon_code}),e.jsx("td",{children:t.coupon_discount}),e.jsx("td",{children:e.jsx("span",{className:"badge badge-outline rounded-[30px]",children:t.workshop_status_name})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-col",children:A(t.estimated_delivery_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-col",children:A(t.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:t.shipping_charges}),e.jsx("td",{children:t.express_delivery_charges}),e.jsx("td",{children:t.gst}),e.jsx("td",{children:t.kasar_amount}),e.jsx("td",{children:t.sub_total}),e.jsx("td",{children:t.total}),e.jsx("td",{children:q[t.payment_type]}),e.jsx("td",{children:e.jsx("span",{className:`${T} badge-outline rounded-[30px]`,children:j})}),e.jsx("td",{children:t.branch.branch_name}),e.jsx("td",{children:t.workshop.workshop_name}),e.jsx("td",{children:t.workshop.workshopManagerMappings.map(E=>`${E.user.first_name} ${E.user.last_name}`).join(", ")}),e.jsx("td",{children:e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>f(t.order_id),children:e.jsx(B,{size:18,className:"text-gray-600"})})})]},t.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Orders available"})})})]})}),_>h&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",w.length," of ",_," Workshop order"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:n===1,onClick:()=>P(n-1),className:`btn ${n===1?"disabled":""}`,children:e.jsx(G,{})}),Array.from({length:o}).map((t,j)=>e.jsx("button",{className:`btn ${n===j+1?"active":""}`,onClick:()=>P(j+1),children:j+1},j)),e.jsx("button",{disabled:n===o,onClick:()=>P(n+1),className:`btn ${n===o?"disabled":""}`,children:e.jsx(I,{})})]})]})})]})})]})},le=({filters:l,updateFilters:n})=>{const[p,h]=i.useState(""),[b,g]=i.useState([]),[y,c]=i.useState([]),{fetchUsersByRole:k}=X(),{branches:r}=Z(),{workshops:N}=ee(1,1e3),S=Object.entries(V).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a})),v=Object.entries(H).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a}));return i.useEffect(()=>{(async()=>{const a=await k(6);if(a){const x=a.map(u=>({label:`${u.first_name} ${u.last_name} (${u.mobile_number})`,value:u.user_id}));c(x)}})()},[]),i.useEffect(()=>{p&&(async()=>{const a=await k(5,p),x=a==null?void 0:a.map(u=>({label:`${u.first_name} ${u.last_name} (${u.mobile_number})`,value:u.user_id}));g(x)})()},[p]),e.jsxs("div",{className:"card-header flex flex-col items-start gap-4",children:[e.jsxs("div",{className:"custom-grid",children:[e.jsx(C,{options:N==null?void 0:N.map(s=>({label:s.workshop_name,value:s.workshop_id})),displayValue:"label",placeholder:"Select Workshop",selectedValues:l.workshopFilter,onSelect:s=>n({...l,workshopFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,workshopFilter:s.map(a=>a.value)}),className:"w-[240px]"}),e.jsx(C,{options:y,displayValue:"label",placeholder:"Search Workshop Manager",selectedValues:l.workshopManagerFilter,onSelect:s=>n({...l,workshopManagerFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,workshopManagerFilter:s.map(a=>a.value)}),className:"w-[320px]"}),e.jsx(C,{options:b,displayValue:"label",placeholder:"Search Customer",selectedValues:l.customerFilter,onSelect:s=>{const a=s.map(x=>x.value);n({...l,customerFilter:a})},onRemove:s=>{const a=s.map(x=>x.value);n({...l,customerFilter:a})},setSearch:h}),e.jsx(C,{options:r==null?void 0:r.map(s=>({label:s.branch_name,value:s.branch_id})),displayValue:"label",placeholder:"Select Branch",selectedValues:l.branchFilter,onSelect:s=>n({...l,branchFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,branchFilter:s.map(a=>a.value)}),className:"w-[240px]"}),e.jsx(C,{options:v,displayValue:"label",placeholder:"Select Order Status",selectedValues:l.workshopOrderStatusFilter,onSelect:s=>n({...l,workshopOrderStatusFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,workshopOrderStatusFilter:s.map(a=>a.value)}),isSearchInput:!1,sliceCount:2,className:"w-[320px]"}),e.jsx(C,{options:S,displayValue:"label",placeholder:"Select Payment Status",selectedValues:l.paymentStatusFilter,onSelect:s=>n({...l,paymentStatusFilter:s.map(a=>a.value)}),onRemove:s=>n({...l,paymentStatusFilter:s.map(a=>a.value)}),isSearchInput:!1,sliceCount:2})]}),e.jsxs("select",{className:"select select-lg w-[200px] text-sm mt-4",value:l.paymentTypeFilter||"",onChange:s=>n({...l,paymentTypeFilter:Number(s.target.value)}),children:[e.jsx("option",{value:"",children:"Payment type"}),e.jsx("option",{value:1,children:"Cash on Delivery"}),e.jsx("option",{value:2,children:"Online Payment"})]})]})},ue=()=>{const[l,n]=i.useState(!1),[p,h]=i.useState({paymentStatusFilter:[],workshopOrderStatusFilter:[],paymentTypeFilter:void 0,customerFilter:[],branchFilter:[],workshopFilter:[],workshopManagerFilter:[]}),b=g=>{h(g)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsx("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Workshop Orders"})})}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>n(!l),children:["Filters",l?e.jsx(L,{size:23}):e.jsx(U,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[l&&e.jsx(le,{filters:p,updateFilters:b})," ",e.jsx(te,{filters:p})]})})})]})};export{ue as default};
