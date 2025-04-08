import{r as o,B as L,V as R,q as M,t as H,j as i}from"./index-BXIzzU16.js";import{P as J}from"./enums-B2C1EGNG.js";import{M as b}from"./MultiSelect-DibcVqIB.js";const X=(a=1,n=10,h="",y,S,d,u,p,f,v,B,g,j="",k="")=>{const[w,U]=o.useState([]),[$,F]=o.useState(0),[D,x]=o.useState(!1),E=async()=>{var O,_;const P=localStorage.getItem("authToken"),l=new URLSearchParams;a&&l.append("page_number",a.toString()),n&&l.append("per_page",n.toString()),h&&l.append("search",h),y&&l.append("sort_by",y),S&&l.append("order",S),d&&d.forEach(c=>l.append("order_statuses",c.toString())),u&&u.forEach(c=>l.append("customer_ids",c.toString())),p&&p.forEach(c=>l.append("branches_ids",c.toString())),f&&f.forEach(c=>l.append("pickup_boy_ids",c.toString())),v&&v.forEach(c=>l.append("delivery_boy_ids",c.toString())),j&&l.append("list",j),k&&l.append("orderList",k),g&&g.forEach(c=>l.append("payment_statuses",c.toString())),B&&l.append("payment_types",B.toString()),x(!0);try{const c=await fetch(`${L}/admin/orders?${l}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${P}`}}),m=await c.json();if(!c.ok){R.error(m.message,{position:"top-center"});return}U(((O=m==null?void 0:m.data)==null?void 0:O.orders)||[]),F(((_=m==null?void 0:m.data)==null?void 0:_.count)||0)}catch(c){R.error(c||"Network error: Failed to fetch.",{position:"top-center"})}finally{x(!1)}};return o.useEffect(()=>{E()},[a,n,h,y,S,d,u,p,f,v,B,g]),{orders:w,count:$,loading:D,fetchOrders:E}},Y=()=>{const[a,n]=o.useState(!1);return{deleteOrder:async y=>{const S=localStorage.getItem("authToken"),d=`http://3.110.208.70:3000/admin/order/${y}`;n(!0);try{const u=await fetch(d,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${S}`}}),p=await u.json();return u.ok?{success:!0,message:p.message}:(R.error(p.message,{position:"top-center"}),{success:!1,message:p.message})}catch(u){return R.error("An unexpected error occurred.",{position:"top-center"}),{success:!1,message:u.message}}finally{n(!1)}},loading:a}},Z=({filters:a,updateFilters:n,showOrderStatusFilter:h=!0,orderStatusOptions:y,showSearchInput:S=!0})=>{const[d,u]=o.useState([]),[p,f]=o.useState([]),[v,B]=o.useState([]),[g,j]=o.useState([]),[k,w]=o.useState([]),[U,$]=o.useState([]),[F,D]=o.useState([]),[x,E]=o.useState([]),[P,l]=o.useState([]),[O,_]=o.useState(""),[c,m]=o.useState(""),[A,G]=o.useState(""),{branches:I}=M(),{fetchUsersByRole:V}=H(),q=Object.entries(J).filter(([e,t])=>typeof t=="number").map(([e,t])=>({label:e,value:t}));o.useEffect(()=>{(async()=>{const t=await V(5),s=await V(4),r=await V(4),N=z=>z.map(C=>({label:`${C.first_name} ${C.last_name} (${C.mobile_number})`,value:C.user_id}));u(N(t)),j(N(s)),D(N(r))})()},[]),o.useEffect(()=>{O?(async()=>{const s=(await V(5,O)).map(r=>({label:`${r.first_name} ${r.last_name} (${r.mobile_number})`,value:r.user_id}));f(s)})():f(d)},[O,d]),o.useEffect(()=>{c?(async()=>{const s=(await V(4,c)).map(r=>({label:`${r.first_name} ${r.last_name} (${r.mobile_number})`,value:r.user_id}));w(s)})():w(g)},[k,g]),o.useEffect(()=>{A?(async()=>{const s=(await V(4,c)).map(r=>({label:`${r.first_name} ${r.last_name} (${r.mobile_number})`,value:r.user_id}));E(s)})():E(F)},[x,F]);const T=(e,t)=>[...e.filter(s=>!t.some(r=>r.value===s.value)),...t];return i.jsx(i.Fragment,{children:i.jsx("div",{className:"p-4",children:i.jsxs("div",{className:"grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4",children:[i.jsx(b,{options:T(v,p),displayValue:"label",placeholder:"Search Customer",selectedValues:v.map(e=>e.value),onSelect:e=>{B(e);const t=e.map(s=>s.value);n({...a,customerFilter:t})},onRemove:e=>{B(e);const t=e.map(s=>s.value);n({...a,customerFilter:t})},setSearch:_,className:"w-full",isSearchInput:!0}),h&&i.jsx(b,{options:y,displayValue:"label",placeholder:"Select Order Status",selectedValues:a.orderStatusFilter,onSelect:e=>{const t=e.map(s=>s.value);n({...a,orderStatusFilter:t})},onRemove:e=>{const t=e.map(s=>s.value);n({...a,orderStatusFilter:t})},isCustomLabel:!0,className:"w-full",isSearchInput:S}),i.jsx(b,{options:I==null?void 0:I.map(e=>({label:e.branch_name,value:e.branch_id})),displayValue:"branch_name",placeholder:"Select Branch",selectedValues:a==null?void 0:a.branchFilter,onSelect:e=>{const t=e.map(s=>s.value);n({...a,branchFilter:t})},onRemove:e=>{const t=e.map(s=>s.value);n({...a,branchFilter:t})},className:"w-full",isSearchInput:!0}),i.jsx(b,{options:T(P,x),displayValue:"label",placeholder:"Search DeliveryBoy",selectedValues:a.deliveryBoyFilter,onSelect:e=>{l(e);const t=e.map(s=>s.value);n({...a,deliveryBoyFilter:t})},onRemove:e=>{l(e);const t=e.map(s=>s.value);n({...a,deliveryBoyFilter:t})},setSearch:G,className:"w-full",isSearchInput:!0}),i.jsx(b,{options:T(U,k),displayValue:"label",placeholder:"Search PickupBoy",selectedValues:a.pickupBoyFilter,onSelect:e=>{$(e);const t=e.map(s=>s.value);n({...a,pickupBoyFilter:t})},onRemove:e=>{$(e);const t=e.map(s=>s.value);n({...a,pickupBoyFilter:t})},setSearch:m,className:"w-full",isSearchInput:!0}),i.jsx(b,{options:q,displayValue:"label",placeholder:"Select Payment Status",selectedValues:a.paymentStatusFilter,onSelect:e=>{const t=e.map(s=>s.value);n({...a,paymentStatusFilter:t})},onRemove:e=>{const t=e.map(s=>s.value);n({...a,paymentStatusFilter:t})},sliceCount:2,isSearchInput:!1,className:"w-full"}),i.jsxs("select",{className:"select select-lg w-[200px] text-sm",value:a.paymentTypeFilter,onChange:e=>{n({...a,paymentTypeFilter:Number(e.target.value)})},children:[i.jsx("option",{value:"",selected:!0,children:"Payment type"}),i.jsx("option",{value:1,children:"Cash on Delivery"}),i.jsx("option",{value:2,children:"Online Payment"})]})]})})})};export{Z as O,Y as a,X as u};
