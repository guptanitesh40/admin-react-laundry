import{r,B as me,V as S,u as ue,e as he,i as pe,j as e,T as xe,k as F,o as je,F as ge,f as fe,P as be,s as Ne,b as _e}from"./index-BXIzzU16.js";import{u as ye,a as Ce}from"./OrderTableFilter-DA-yk1jS.js";import{u as Se}from"./useGenerateInvoice-CGsCiBw5.js";import{c as ve}from"./enums-B2C1EGNG.js";import{S as C}from"./sweetalert2.esm.all-B0Dix5B2.js";import{g as G}from"./orderStatusClasses-HfHBGnti.js";import{P as ke,W as we}from"./AssignWorkshopModal-B2IGA2Xl.js";const Pe=()=>{const[t,n]=r.useState(!1),v=localStorage.getItem("authToken");return{changeOrderStatus:async(b,N)=>{n(!0);try{const l=await fetch(`${me}/admin/orders/update-status`,{method:"PATCH",headers:{Authorization:`Bearer ${v}`,"Content-Type":"application/json"},body:JSON.stringify({order_ids:b,order_status:N})}),j=await l.json();return l.ok?(S.success(j.message||"Order status updated successfully",{position:"top-center"}),!0):(S.error(j.message||"Failed to update order status",{position:"top-center"}),!1)}catch(l){return S.error((l==null?void 0:l.message)||"Error updating order status",{position:"top-center"}),!1}finally{n(!1)}},loading:t}},Le=({filters:t,selectedOrderIds:n,setSelectedOrderIds:v,setNextStatus:k,selectedStatus:b,setSelectedStatus:N,nextStatus:l,trackingState:j,setTrackingState:w})=>{const[_,g]=r.useState(1),[d,L]=r.useState(10),[I,u]=ue(),[c,H]=r.useState(null),[i,A]=r.useState(null),M=I.get("page"),E=I.get("perPage"),[f,W]=r.useState(""),[O,J]=r.useState(""),[q,z]=r.useState(""),[Be,Fe]=r.useState(),U=[{path:"/orders",list:"",orderList:""},{path:"/pickup-orders",list:"order_list",orderList:"pickup_order"},{path:"/redy-to-deliver",list:"order_list",orderList:"ready_for_delivery"},{path:"/confirmed-orders",list:"order_list",orderList:"confirm_order"}].find(s=>s.path===location.pathname),K=U.list,Q=U.orderList,{changeOrderStatus:X}=Pe(),[Z,D]=r.useState(!1),[ee,V]=r.useState(!1),se=s=>{const{order_id:a}=s;v(m=>m.includes(a)?m.filter(T=>T!==a):[...m,a])},Y=()=>{v([]),N(null),k(null),w(null)};r.useEffect(()=>{if(n.length===0)N(null),k(null);else if(n.length===1){const s=h.find(a=>n.includes(a.order_id));s&&(N(s.order_status),k(s.order_status_details.next_step))}},[n]);const{orders:h,loading:ae,count:R,fetchOrders:P}=ye(_,d,f,c,i,t.orderStatusFilter,t.customerFilter,t.branchFilter,t.pickupBoyFilter,t.deliveryBoyFilter,t.paymentTypeFilter,t.paymentStatusFilter,K,Q),{deleteOrder:te}=Ce();Se();const{hasPermission:o}=he(),$=pe(),re=Math.ceil(R/d);r.useEffect(()=>{M&&g(Number(M)),E&&L(Number(E))},[M,E]),r.useEffect(()=>{g(1),u(f!==""?{search:f,page:"1",perPage:d.toString()}:{})},[f]),r.useEffect(()=>{g(1),u(f!==""?{search:f,page:"1",perPage:d.toString()}:{})},[t.paymentStatusFilter,t.orderStatusFilter,t.paymentTypeFilter,t.customerFilter,t.pickupBoyFilter,t.deliveryBoyFilter,t.branchFilter]);const ne=s=>{$(`/order/${s}`,{state:{from:"OrderTable"}})},le=async s=>{try{const{isConfirmed:a}=await C.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(a){const{success:m,message:y}=await te(s);m?(h.filter(T=>T.order_id!==s).length===0&&_>1&&(g(_-1),u({page:(_-1).toString(),perPage:d.toString()})),await P(),C.fire(y)):C.fire(y)}}catch(a){C.fire({title:"Error",text:a.message,icon:"error"})}},ce=s=>{$(`/order/edit/${s}`,{state:{prevUrl:location.pathname}})},ie=async s=>{s.preventDefault();try{await Ne.validate({search:O},{abortEarly:!1}),W(O),z("")}catch(a){a instanceof _e&&z(a.errors[0])}},p=s=>{c===s?A(i==="ASC"?"DESC":"ASC"):(H(s),A("ASC"))},oe=s=>{s>=1&&s<=re&&(g(s),u({page:s.toString(),perPage:d.toString()}))},de=s=>{const a=Number(s.target.value);L(a),g(1),u({page:"1",perPage:a.toString()})},x=async()=>{try{const{isConfirmed:s}=await C.fire({title:"Are you sure?",html:`Want to change order status to <span style="color: #1B84FF; font-weight: 500;">"${l}"</span> ?`,showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes",cancelButtonText:"No",icon:void 0,didClose:()=>{w(null)}});if(s){const a=b+1;await X(n,a)&&(Y(),await P())}}catch{S.error("Error while changing status")}};return r.useEffect(()=>{if(j!==null)switch(j){case 1:D(!0);break;case 2:x();break;case 3:x();break;case 4:V(!0);break;case 5:x();break;case 6:x();break;case 7:x();break;case 8:x();break;case 9:D(!0);break;case 10:x();break;default:S("Invalid order status...")}},[j]),ae?e.jsx(xe,{isFilters:!0,isPagination:!0,columns:5,records:10}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:d,onChange:de,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:ie,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:O,onChange:s=>{J(s.target.value),s.target.value===""&&W("")},placeholder:"Search...",className:"min-w-[185px]"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:q||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"!px-3",children:e.jsx("label",{className:"flex items-center justify-center",children:e.jsx("input",{className:"checkbox",type:"checkbox",disabled:!0})})}),e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("span",{className:`sort ${c==="order_id"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="branch_name"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("branch_name"),children:[e.jsx("span",{className:"sort-label",children:"Branch"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[240px]",children:e.jsxs("span",{className:`sort ${c==="first_name"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer Name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[280px]",children:"Current Status"}),e.jsx("th",{className:"min-w-[280px]",children:"Next Status"}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="created_at"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("created_at"),children:[e.jsx("span",{className:"sort-label",children:"Booking Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="estimated_pickup_time"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("estimated_pickup_time"),children:[e.jsx("span",{className:"sort-label",children:"Pickup Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${c==="estimated_delivery_time"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("estimated_delivery_time"),children:[e.jsx("span",{className:"sort-label",children:"Delivery Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[135px]",children:e.jsxs("span",{className:`sort ${c==="total"?i==="ASC"?"asc":"desc":""}`,onClick:()=>p("total"),children:[e.jsx("span",{className:"sort-label",children:"Total Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[165px]",children:"Payment type"}),(o(3,"read")||o(3,"update")||o(3,"delete"))&&e.jsx("th",{className:"w-[170px]",children:"Actions"})]})}),h.length>0?e.jsx("tbody",{children:h.map(s=>{var B;const a=b!==null&&s.order_status!==b||[11,12,13].includes(s.order_status),m=G(s.order_status_details.admin_label),y=G(s.order_status_details.next_step);return e.jsxs("tr",{children:[e.jsx("th",{children:e.jsx("label",{className:"flex items-center justify-center",children:e.jsx("input",{className:"checkbox",type:"checkbox",disabled:a,checked:n.includes(s.order_id),onChange:()=>se(s)})})}),e.jsxs("td",{className:"cursor-pointer text-blue-600 hover:underline",onClick:()=>$(`/order/${s.order_id}`),children:["#",s.order_id]}),e.jsx("td",{children:(B=s==null?void 0:s.branch)==null?void 0:B.branch_name}),e.jsx("td",{children:s.user.first_name+" "+s.user.last_name}),e.jsx("td",{children:e.jsx("span",{className:`${m} relative badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.admin_label})}),e.jsx("td",{children:s.order_status_details.next_step!=="NULL"&&e.jsxs("div",{className:"tooltip-custom",children:[e.jsx("span",{className:`${y} badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.next_step}),e.jsx("div",{className:"tooltip-text",children:s.order_status_details.description})]})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[F(s.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),F(s.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:F(s.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[F(s.estimated_delivery_time).format("DD-MM-YYYY"),e.jsx("br",{})]})}),e.jsx("td",{children:s.total}),e.jsx("td",{children:ve[s.payment_type]}),(o(3,"update")||o(3,"delete")||o(3,"read"))&&e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[o(3,"read")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>ne(s.order_id),children:e.jsx(je,{size:18,className:"text-gray-600"})}),o(3,"update")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>ce(s.order_id),children:e.jsx(ge,{className:"text-yellow-600"})}),o(3,"delete")&&e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>le(s.order_id),children:e.jsx(fe,{className:"text-red-500"})})]})})]},s.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Order available"})})})]})}),e.jsx(be,{count:R,currentPage:_,totalRecords:h==null?void 0:h.length,perPage:d,onPageChange:oe,label:"orders"})]})}),e.jsx(ke,{orderId:n,modelOpen:Z,onClose:()=>{D(!1),w(null)},orderStatus:l,setAssigned:s=>{s&&(Y(),P())}}),e.jsx(we,{orderIds:n,workshopModalOpen:ee,onClose:()=>{w(null),V(!1)},setAssigned:s=>{s&&(Y(),P())},orderStatus:l})]})};export{Le as O};
