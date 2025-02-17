import{r as o,B as T,_ as O,j as e,i as E,L as k}from"./index-DkLiFbUV.js";import{u as R}from"./useGetuser-BWFPhRde.js";import{g as $}from"./paymentStatusClasses-BddHAg9R.js";import{R as C,b as L,P as z}from"./enums-3gjpsfQG.js";import{g as U}from"./orderStatusClasses-DgGpuqsn.js";import{g as A}from"./roleClasses-Lg_oRePj.js";const I=()=>{const[x,r]=o.useState(!1);return{clearDueAmount:async(j,h)=>{const g=localStorage.getItem("authToken");r(!0);try{const n=await fetch(`${T}/orders/payments/clear-due`,{method:"POST",headers:{Authorization:`Bearer ${g}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:j,orders:h})}),p=await n.json();return n.ok?(O.success(p.message,{position:"top-center"}),!0):(O.error(p.message,{position:"top-center"}),!1)}catch{O.error("Error clearing due amount",{position:"top-center"})}finally{r(!1)}},loading:x}},K=({modalOpen:x,onClose:r,userId:u,setRefetch:j})=>{const{userData:h,fetchUser:g}=R(),{clearDueAmount:n,loading:p}=I(),[t,y]=o.useState([]),[v,w]=o.useState([]),[b,N]=o.useState(),a=h==null?void 0:h.user;o.useEffect(()=>{x&&g(u)},[x,u]),o.useEffect(()=>{if(a!=null&&a.orders){const s=a.orders.filter(i=>i.payment_status!==2);s.map(i=>({...i,kasar_amount:i.kasar_amount||null,payment_status:i.payment_status||null,current_total:0})),y(s)}},[a]);const c=(s,i,f)=>{const d=t.map(l=>{if(l.order_id===s){const m={...l,[i]:f};return m.current_total=(m.current_paid||0)+(m.kasar_amount||0)||0,m.current_total===l.total||m.current_total===l.total-l.paid_amount?N(!0):N(!1),m}return l});y(d);const _=d.find(l=>l.order_id===s);_&&w(l=>{const m=l.findIndex(S=>S.order_id===s);if(m>-1){const S=[...l];return S[m]=_,S}return[...l,_]})},P=async()=>{if(v.length===0){r();return}const s={user_id:u,filteredOrders:v.map(({order_id:f,payment_status:d,kasar_amount:_,current_paid:l})=>({order_id:f,paid_amount:l||0,payment_status:d,kasar_amount:_}))};await n(u,s.filteredOrders)&&(r(),w([])),j(!0)};return x?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:r}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[1000px] z-10 relative max-h-[80vh] overflow-auto",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:r,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Orders"}),e.jsx("button",{className:"btn btn-primary btn-lg flex flex-end mt-10",onClick:P,disabled:p,children:p?"Saving...":"Save"})]}),e.jsx("div",{className:"grid gap-5 lg:gap-5.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[30px]",children:"Id"}),e.jsx("th",{className:"min-w-[120px]",children:"Total"}),e.jsx("th",{className:"min-w-[120px]",children:"Paid Amount"}),e.jsx("th",{className:"min-w-[120px]",children:"Kasar Amount"}),e.jsx("th",{className:"min-w-[120px]",children:"Current Paid"}),e.jsx("th",{className:"min-w-[190px]",children:"Current Total"}),e.jsx("th",{className:"min-w-[120px]",children:"Payment Status"})]})}),e.jsx("tbody",{children:t.map(s=>{const i=(s.paid_amount||0)+(s.kasar_amount||0)+(s.current_paid||0),f=$(s.payment_status,!0);return e.jsxs("tr",{className:"custom-row",children:[e.jsxs("td",{children:["#",s.order_id]}),e.jsxs("td",{children:["₹",s.total||0]}),e.jsxs("td",{children:["₹",s.paid_amount||0]}),e.jsx("td",{children:e.jsx("input",{type:"text",className:"input input-bordered",value:s.kasar_amount||0,onChange:d=>c(s.order_id,"kasar_amount",Number(d.target.value))})}),e.jsx("td",{children:e.jsx("input",{type:"text",className:"input input-bordered",value:s.current_paid||0,onChange:d=>c(s.order_id,"current_paid",Number(d.target.value))})}),e.jsxs("td",{className:i>(s.total||0)?"text-red-500":"",children:[e.jsxs("span",{children:["₹",s.current_total||0]}),i>(s.total||0)?e.jsx("span",{className:"flex mt-1 font-serif",children:"greater then pending amount"}):""]}),e.jsx("td",{children:e.jsxs("div",{children:[e.jsxs("select",{className:`select select-lg w-[170px] text-sm ${f}`,"data-datatable-size":"true","data-tooltip":"#custom_tooltip",value:s.payment_status,onChange:d=>c(s.order_id,"payment_status",Number(d.target.value)),children:[e.jsx("option",{value:"1",className:`${f}`,children:"Pending"}),e.jsx("option",{value:"2",disabled:!b,children:"Received"}),e.jsx("option",{value:"3",disabled:b,children:"Partial Received"})]}),e.jsx("div",{className:"hidden rounded-xl shadow-default p-3 bg-light border border-gray-200 text-gray-700 text-xs font-normal",id:"custom_tooltip",children:"Change Payment Status"})]})})]},s.order_id)})})]})})})})})]})]}):null},J=()=>{var N;const{id:x}=E(),r=Number(x),[u,j]=o.useState(),[h,g]=o.useState(!1),{userData:n,fetchUser:p}=R(),t=n==null?void 0:n.user;o.useEffect(()=>{p(r),g(!1)},[r,h]);const y=a=>{window.open(`/order/${a}`,"_blank")};if(!t)return;const v=t.orders.reduce((a,c)=>a+c.kasar_amount,0),w=t.orders.reduce((a,c)=>a+c.total,0),b=()=>{j(!0)};return e.jsxs("div",{className:"container mx-auto p-6",children:[e.jsx("div",{className:"flex flex-col bg-gray-50 p-5 rounded-md shadow-md",children:e.jsxs("div",{className:"flex justify-between gap-4 items-center",children:[e.jsxs("h1",{className:"text-xl font-semibold text-gray-900",children:[t.first_name," ",t.last_name]}),(n==null?void 0:n.total_pending_amount)!==0&&e.jsxs("div",{className:"flex flex-end items-center gap-2",children:[e.jsxs("span",{className:"text-sm font-medium text-green-700",children:["Total Pending Amount: ₹",n.total_pending_amount]}),e.jsxs("button",{className:"font-extralight btn btn-lg btn-light",onClick:b,children:["Pay ",e.jsx(k,{size:20})]})]}),(t==null?void 0:t.role_id)!==5&&e.jsx("span",{className:`mt-1 p-2 rounded-md text-sm ${A(t.role_id)}`,children:C[t.role_id]})]})}),e.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5 mt-5",children:e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card pb-2.5",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Personal Information"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Name:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:[t.first_name," ",t.last_name]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Email:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:"email"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Mobile Number:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:t.mobile_number})]}),t.role_id===5?e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Profile Photo :"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:e.jsx("span",{className:"",children:e.jsx("img",{className:"h-14 w-14 rounded-full",src:`${T}/images/user/1735042941768.jpeg`})})})]}):e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Role:"}),e.jsx("span",{className:`mt-1 p-2 rounded-md text-sm ${A(t.role_id)}`,children:C[t.role_id]})]})]})})})]})})}),t.role_id===5&&e.jsx("div",{className:"grid gap-5 lg:gap-7.5 mt-5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("h3",{className:"text-xl font-semibold mb-1",children:"Orders"}),e.jsxs("span",{className:"text-gray-700 text-lg font-semibold px-3 py-1 rounded-lg",children:["Total Orders: ",(N=t==null?void 0:t.orders)==null?void 0:N.length]})]}),e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Id"}),e.jsx("th",{className:"min-w-[220px]",children:"Status"}),e.jsx("th",{className:"min-w-[60px]",children:"Item Count"}),e.jsx("th",{children:"Total"}),e.jsx("th",{className:"min-w-[80px]",children:"Paid Amount"}),e.jsx("th",{className:"",children:"Kasar Amount"}),e.jsx("th",{className:"min-w-[140px]",children:"Payment Type"}),e.jsx("th",{className:"min-w-[135px]",children:"Payment Status"}),e.jsx("th",{className:"min-w-[130px]",children:"Actions"})]})}),t.orders.length>0?e.jsx("tbody",{children:t.orders.map(a=>{const c=$(a.payment_status),P=U(a.admin_order_status.admin_label),s=a.items.length;return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",a.order_id]}),e.jsx("td",{children:e.jsx("span",{className:`${P} badge-outline badge-xl rounded-[30px]`,children:a.admin_order_status.admin_label})}),e.jsx("td",{children:s}),e.jsxs("td",{children:["₹",a.total]}),e.jsxs("td",{children:["₹",a.paid_amount===""?0:a.paid_amount]}),e.jsxs("td",{children:["₹",a.kasar_amount===""?0:a.kasar_amount]}),e.jsx("td",{children:e.jsx("span",{className:"badge badge-outline",children:L[a.payment_type]})}),e.jsx("td",{children:e.jsx("span",{className:`${c} badge-outline`,children:z[a.payment_status]})}),e.jsx("td",{children:e.jsx("button",{className:"btn btn-sm btn-primary",onClick:()=>y(a.order_id),children:"View Order"})})]},a.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:9,className:"text-center",children:"No Orders available"})})})]})})]})}),(t==null?void 0:t.orders.length)>0&&e.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6",children:e.jsx("div",{className:"space-y-6",children:e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Orders Summary"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total Kasar Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",v]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total Order Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",w]})]}),n.total_pending_amount>0&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total Pending Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",n.total_pending_amount]}),e.jsx("td",{children:e.jsx("span",{className:"relative bottom-2 left-4",children:e.jsxs("button",{className:"flex items-center gap-2.5 font-extralight btn btn-light ",onClick:b,children:["Pay ",e.jsx(k,{size:20})]})})})]})]})})})]})})})}),e.jsx(K,{modalOpen:u,onClose:()=>j(!1),userId:r,setRefetch:g})]})};export{J as default};
