import{r as d,_ as D,u as G,k as $,j as e,l as L,aY as V,F as q,b as K,d as W,e as Z,V as H}from"./index-ekHY3xQj.js";import{F as i,a as n,s as J}from"./searchSchema-BZfm46a9.js";import{T as Q,S as E}from"./TableShimmer-BaU0WSyA.js";import{O as C,P as A,b as X}from"./enums-tzNm48ue.js";const ee="http://35.154.167.170:3000/admin/orders",se=(m=1,a=10,o="",c,u)=>{const[j,x]=d.useState([]),[s,S]=d.useState(0),[t,y]=d.useState(!1),f=async()=>{var _,b;const v=localStorage.getItem("authToken"),g=new URLSearchParams;m&&g.append("page_number",m.toString()),a&&g.append("per_page",a.toString()),o&&g.append("search",o),c&&g.append("sort_by",c),u&&g.append("order",u),y(!0);try{const N=await fetch(`${ee}?${g}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`}}),p=await N.json();if(!N.ok){D.error(p.message,{position:"top-center"});return}x(((_=p==null?void 0:p.data)==null?void 0:_.orders)||[]),S(((b=p==null?void 0:p.data)==null?void 0:b.count)||0)}catch(N){D.error(N||"Network error: Failed to fetch.",{position:"top-center"})}finally{y(!1)}};return d.useEffect(()=>{f()},[m,a,o,c,u]),{orders:j,totalOrders:s,loading:t,fetchOrders:f}},re=()=>{const[m,a]=d.useState(!1);return{deleteOrder:async c=>{const u=localStorage.getItem("authToken"),j=`http://35.154.167.170:3000/admin/order/${c}`;a(!0);try{const x=await fetch(j,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`}}),s=await x.json();return x.ok?{success:!0,message:s.message}:(D.error(s.message,{position:"top-center"}),{success:!1,message:s.message})}catch(x){return D.error("An unexpected error occurred.",{position:"top-center"}),{success:!1,message:x.message}}finally{a(!1)}},loading:m}},te=({search:m})=>{const[a,o]=d.useState(1),[c,u]=d.useState(10),[j,x]=G(),[s,S]=d.useState(null),[t,y]=d.useState(null),f=j.get("page"),v=j.get("perPage"),{orders:g,loading:_,totalOrders:b,fetchOrders:N}=se(a,c,m,s,t),p=$(),w=Math.ceil(b/c),{deleteOrder:F}=re(),R=r=>{p(`/order/${r}`)},Y=async r=>{try{const{isConfirmed:h}=await E.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(h){const{success:O,message:k}=await F(r);O?(g.filter(z=>z.order_id!==r).length===0&&a>1&&(o(a-1),x({page:(a-1).toString(),perPage:c.toString()})),await N(),E.fire(k)):E.fire(k)}}catch(h){E.fire({title:"Error",text:h.message,icon:"error"})}},B=r=>{p(`/order/edit/${r}`)};d.useEffect(()=>{f&&o(Number(f)),v&&u(Number(v))},[f,v]),d.useEffect(()=>{m&&(o(1),x({search:m,page:"1",perPage:c.toString()}))},[m]);const l=r=>{s===r?y(t==="ASC"?"DESC":"ASC"):(S(r),y("ASC"))},P=r=>{r>=1&&r<=w&&(o(r),x({page:r.toString(),perPage:c.toString()}))},M=r=>{const h=Number(r.target.value);u(h),o(1),x({page:"1",perPage:h.toString()})},I=r=>{switch(r){case C.Pending:return"badge badge-pending";case C["In Process"]:return"badge badge-in-process";case C["Ready to delivery"]:return"badge badge-ready-to-deliver";case C["Delivery complete"]:return"badge badge-delivery-complete";default:return"badge"}},U=r=>{switch(r){case A.Pending:return"badge badge-pending";case A["Partial received"]:return"badge badge-ready-to-deliver";case A.Received:return"badge badge-delivery-complete";default:return"badge"}};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"inline-block",children:e.jsxs("div",{className:"flex mb-3 items-center gap-2",children:["Show",e.jsxs("select",{className:"select select-sm w-16",value:c,onChange:M,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),"per page"]})}),e.jsx("div",{className:"grid gap-5 lg:gap-5.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("order_id"),children:["Id",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="order_id"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="order_id"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("first_name"),children:["Customer",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="first_name"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="first_name"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("email"),children:["Email",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="email"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="email"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("mobile_number"),children:["Mobile no",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="mobile_number"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="mobile_number"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("address_details"),children:["Shipping Address",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="address_details"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="address_details"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("description"),children:["Description",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="description"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="description"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer ",onClick:()=>l("coupon_code"),children:["Coupon code",e.jsxs("div",{className:"flex cursor-pointer mt-2",children:[e.jsx(i,{color:s==="coupon_code"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="coupon_code"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("coupon_discount"),children:["Coupon discount",e.jsxs("div",{className:"flex cursor-pointer mt-2",children:[e.jsx(i,{color:s==="coupon_discount"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="coupon_discount"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[160px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("order_statue"),children:["Order Status",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="order_status"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="order_status"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("estimated_delivery_time"),children:["Estimated delivery time",e.jsxs("div",{className:"flex cursor-pointer mt-2",children:[e.jsx(i,{color:s==="order_status"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="estimated_delivery_time"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("estimated_pickup_time"),children:["Estimated pickup time",e.jsxs("div",{className:"flex cursor-pointer mt-2",children:[e.jsx(i,{color:s==="order_status"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="estimated_pickup_time"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[140px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("shipping_charges"),children:["Shipping charge",e.jsxs("div",{className:"flex cursor-pointer mt-2",children:[e.jsx(i,{color:s==="shipping_charges"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="shipping_charges"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[180px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("express_delivery_charges"),children:["Express delivery charges",e.jsxs("div",{className:"flex cursor-pointer mt-2",children:[e.jsx(i,{color:s==="express_delivery_charges"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="express_delivery_charges"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[100px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("gst"),children:["GST",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="gst"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="gst"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("kasar_amount"),children:["Kasar amount",e.jsxs("div",{className:"flex cursor-pointer mt-2",children:[e.jsx(i,{color:s==="kasar_amount"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="kasar_amount"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("sub_total"),children:["Sub total",e.jsxs("div",{className:"flex cursor-pointer ",children:[e.jsx(i,{color:s==="sub_total"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="sub_total"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[105px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("total"),children:["Total",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="total"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="total"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[165px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("payment_type"),children:["Payment type",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="payment_type"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="payment_type"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[175px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>l("payment_status"),children:["Payment Status",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(i,{color:s==="payment_status"&&t==="ASC"?"gray":"lightgray"}),e.jsx(n,{color:s==="payment_status"&&t==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"w-[170px]",children:"Actions"})]})}),_?e.jsx(Q,{}):g.length!==null?e.jsx("tbody",{children:g.map(r=>{const h=C[r.order_status],O=I(r.order_status),k=A[r.payment_status],T=U(r.payment_status);return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",r.order_id]}),e.jsx("td",{children:r.user.first_name+" "+r.user.last_name}),e.jsx("td",{children:r.user.email}),e.jsx("td",{children:r.user.mobile_number}),e.jsx("td",{children:r.address_details}),e.jsx("td",{children:r.description}),e.jsx("td",{children:r.coupon_code}),e.jsx("td",{children:r.coupon_discount}),e.jsx("td",{children:e.jsx("span",{className:`${O} badge-outline rounded-[30px]`,children:h})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-col",children:L(r.estimated_delivery_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-col",children:L(r.estimated_pickup_time).format("DD-MM-YYYY")})}),e.jsx("td",{children:r.shipping_charges}),e.jsx("td",{children:r.express_delivery_charges}),e.jsx("td",{children:r.gst}),e.jsx("td",{children:r.kasar_amount}),e.jsx("td",{children:r.sub_total}),e.jsx("td",{children:r.total}),e.jsx("td",{children:X[r.payment_type]}),e.jsx("td",{children:e.jsx("span",{className:`${T} badge-outline rounded-[30px]`,children:k})}),e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>R(r.order_id),children:e.jsx(V,{size:18,className:"text-gray-600"})}),e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>B(r.order_id),children:e.jsx(q,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>Y(r.order_id),children:e.jsx(K,{className:"text-red-500"})})]})})]},r.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No banners available"})})})]})})})})}),b>c&&e.jsxs("div",{className:"flex items-center gap-4 mt-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",g.length," of ",b," Orders"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:a===1,onClick:()=>P(a-1),className:`btn ${a===1?"disabled":""}`,children:e.jsx(W,{})}),Array.from({length:w}).map((r,h)=>e.jsx("button",{className:`btn ${a===h+1?"active":""}`,onClick:()=>P(h+1),children:h+1},h)),e.jsx("button",{disabled:a===w,onClick:()=>P(a+1),className:`btn ${a===w?"disabled":""}`,children:e.jsx(Z,{})})]})]})]})},ce=()=>{const[m,a]=d.useState(""),[o,c]=d.useState(""),[u,j]=d.useState(""),x=$(),s=()=>{x("/order/add")},S=async t=>{t.preventDefault();try{await J.validate({search:o},{abortEarly:!1}),a(o),j("")}catch(y){y instanceof H&&j(y.errors[0])}};return e.jsxs("div",{className:"container-fixed relative",children:[e.jsxs("div",{className:"flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5",children:[e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Orders"}),e.jsxs("button",{className:"btn btn-primary",onClick:s,children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Order"]})]}),e.jsxs("div",{className:"absolute top-11 right-[2.5rem] mt-2",children:[e.jsxs("form",{onSubmit:S,className:"w-64 relative flex",children:[e.jsx("input",{type:"search",value:o,onChange:t=>{c(t.target.value),t.target.value===""&&a("")},className:"peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] text-gray-700 outline-none focus:border-primary focus:bg-white border-primary",placeholder:"Search"}),e.jsx("button",{type:"submit",className:"relative z-[2] -ml-0.5 flex items-center rounded-e bg-gray-500 px-5 text-xs font-medium uppercase leading-normal text-white",children:e.jsx("svg",{fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"h-5 w-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})})})]}),e.jsx("p",{className:"absolute top-8 right-[0.2rem] mt-2 text-red-500 text-sm w-80",children:u||" "})]}),e.jsx(te,{search:m})]})};export{ce as default};
