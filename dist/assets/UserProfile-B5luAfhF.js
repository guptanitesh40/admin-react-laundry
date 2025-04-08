import{r as c,B as $,V as k,G as I,j as e,L as G,o as U}from"./index-C5bMjS4g.js";import{u as O}from"./useGetuser-5lHNiDx6.js";import{P as z,b as M,R as A,G as B}from"./enums-Dwyd47hm.js";import{g as T}from"./roleClasses-BoMLQkqs.js";import{g as R}from"./paymentStatusClasses-BddHAg9R.js";import{g as F}from"./orderStatusClasses-HfHBGnti.js";const D=()=>{const[i,d]=c.useState(!1);return{clearDueAmount:async(h,y)=>{const u=localStorage.getItem("authToken");d(!0);try{const l=await fetch(`${$}/orders/payments/clear-due`,{method:"POST",headers:{Authorization:`Bearer ${u}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:h,orders:y})}),b=await l.json();return l.ok?(k.success(b.message,{position:"top-center"}),!0):(k.error(b.message,{position:"top-center"}),!1)}catch{k.error("Error clearing due amount",{position:"top-center"})}finally{d(!1)}},loading:i}};function E(i){return I({attr:{viewBox:"0 0 32 32"},child:[{tag:"path",attr:{d:"M 8 5 L 8 7 L 12 7 C 13.703125 7 15.941406 8.039063 16.71875 10 L 8 10 L 8 12 L 16.96875 12 C 16.660156 14.609375 13.972656 16 12 16 L 8 16 L 8 18.46875 L 18.25 27 L 21.375 27 L 10.5625 18 L 12 18 C 15.234375 18 18.675781 15.609375 18.96875 12 L 24 12 L 24 10 L 18.8125 10 C 18.507813 8.816406 17.859375 7.804688 17 7 L 24 7 L 24 5 Z"},child:[]}]})(i)}const K=({modalOpen:i,onClose:d,userId:j,setRefetch:h,count:y})=>{const{userData:u,fetchUser:l}=O(),{clearDueAmount:b,loading:N}=D(),[t,_]=c.useState([]),[v,w]=c.useState([]),[a,o]=c.useState(),g=1,n=u==null?void 0:u.user;c.useEffect(()=>{i&&l(j,g,y)},[i,j]),c.useEffect(()=>{if(n!=null&&n.orders){const s=n.orders.filter(x=>![2].includes(x.payment_status)&&![12,13].includes(x.order_status));s.map(x=>({...x,kasar_amount:x.kasar_amount||null,payment_status:x.payment_status||null,current_total:0})),_(s)}},[n]);const f=(s,x,S)=>{const p=t.map(r=>{if(r.order_id===s){const m={...r,[x]:S};return m.current_total=(m.current_paid||0)+(m.kasar_amount||0)||0,m.current_total===0?m.payment_status=1:m.current_total===r.total||m.current_total===r.total-r.paid_amount?(o(!0),m.payment_status=2):(o(!1),m.payment_status=3),m}return r});_(p);const C=p.find(r=>r.order_id===s);C&&w(r=>{const m=r.findIndex(L=>L.order_id===s);if(m>-1){const L=[...r];return L[m]=C,L}return[...r,C]})},P=async()=>{if(v.length===0){d();return}const s={filteredOrders:v.map(({order_id:S,payment_status:p,kasar_amount:C,current_paid:r})=>({order_id:S,paid_amount:r||0,payment_status:p,kasar_amount:C}))};await b(j,s.filteredOrders)&&(d(),w([])),h(!0)};return i?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:d}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[1000px] z-10 relative max-h-[80vh] overflow-auto",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:d,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Orders"}),e.jsx("button",{className:"btn btn-primary btn-lg flex flex-end mt-10",onClick:P,disabled:N,children:N?"Saving...":"Save"})]}),e.jsx("div",{className:"grid gap-5 lg:gap-5.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[30px]",children:"Id"}),e.jsx("th",{className:"min-w-[120px]",children:"Total"}),e.jsx("th",{className:"min-w-[120px]",children:"Paid Amount"}),e.jsx("th",{className:"min-w-[120px]",children:"Kasar Amount"}),e.jsx("th",{className:"min-w-[120px]",children:"Current Paid"}),e.jsx("th",{className:"min-w-[190px]",children:"Current Total"}),e.jsx("th",{className:"min-w-[120px]",children:"Payment Status"})]})}),e.jsx("tbody",{children:t.map(s=>{const x=(s.paid_amount||0)+(s.kasar_amount||0)+(s.current_paid||0),S=R(s.payment_status,!0);return e.jsxs("tr",{className:"custom-row",children:[e.jsxs("td",{children:["#",s.order_id]}),e.jsxs("td",{children:["₹",s.total||0]}),e.jsxs("td",{children:["₹",s.paid_amount||0]}),e.jsx("td",{children:e.jsx("input",{type:"text",className:"input input-bordered",value:s.kasar_amount||0,onChange:p=>f(s.order_id,"kasar_amount",Number(p.target.value))})}),e.jsx("td",{children:e.jsx("input",{type:"text",className:"input input-bordered",value:s.current_paid||0,onChange:p=>f(s.order_id,"current_paid",Number(p.target.value))})}),e.jsxs("td",{className:x>(s.total||0)?"text-red-500":"",children:[e.jsxs("span",{children:["₹",s.current_total||0]}),x>(s.total||0)?e.jsx("span",{className:"flex mt-1 font-serif",children:"greater then pending amount"}):""]}),e.jsx("td",{children:e.jsxs("div",{children:[e.jsxs("select",{className:`select select-lg w-[170px] text-sm ${S}`,"data-datatable-size":"true","data-tooltip":"#custom_tooltip",value:s.payment_status,onChange:p=>f(s.order_id,"payment_status",Number(p.target.value)),children:[e.jsx("option",{value:"1",className:`${S}`,disabled:a||!a,children:"Pending"}),e.jsx("option",{value:"2",disabled:!a||s.paid_amount===0,children:"Received"}),e.jsx("option",{value:"3",disabled:a,children:"Partial Received"})]}),e.jsx("div",{className:"hidden rounded-xl shadow-default p-3 bg-light border border-gray-200 text-gray-700 text-xs font-normal",id:"custom_tooltip",children:"Change Payment Status"})]})})]},s.order_id)})})]})})})})})]})]}):null},V=({user:i,userId:d,count:j})=>{const[h,y]=c.useState(1),[u,l]=c.useState(100),{fetchUser:b,loading:N}=O(),[t,_]=c.useState([]);c.useEffect(()=>{_(i==null?void 0:i.orders)},[i]),c.useEffect(()=>{(async()=>{const o=await b(d,h,u);o&&_(g=>{const n=new Set(g.map(P=>P.order_id)),f=o==null?void 0:o.filter(P=>!n.has(P.order_id));return[...g,...f]})})()},[h]);const v=a=>{window.open(`/order/${a}`,"_blank")},w=()=>{y(h+1)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid gap-5 lg:gap-7.5 mt-5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("h3",{className:"text-xl font-semibold mb-1",children:"Orders"}),e.jsxs("span",{className:"text-gray-700 text-lg font-semibold px-3 py-1 rounded-lg",children:["Total Orders: ",j]})]}),e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Id"}),e.jsx("th",{className:"min-w-[220px]",children:"Status"}),e.jsx("th",{className:"min-w-[60px]",children:"Item Count"}),e.jsx("th",{children:"Total"}),e.jsx("th",{className:"min-w-[80px]",children:"Paid Amount"}),e.jsx("th",{className:"",children:"Kasar Amount"}),e.jsx("th",{className:"min-w-[140px]",children:"Payment Type"}),e.jsx("th",{className:"min-w-[135px]",children:"Payment Status"}),e.jsx("th",{className:"min-w-[130px]",children:"Actions"})]})}),(t==null?void 0:t.length)>0?e.jsx("tbody",{children:t==null?void 0:t.map(a=>{const o=R(a.payment_status),g=F(a.admin_order_status.admin_label),n=a.items.length;return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",a.order_id]}),e.jsx("td",{children:e.jsx("span",{className:`${g} badge-outline badge-xl rounded-[30px]`,children:a.admin_order_status.admin_label})}),e.jsx("td",{children:n}),e.jsxs("td",{children:["₹",a.total]}),e.jsxs("td",{children:["₹",a.paid_amount===""?0:a.paid_amount]}),e.jsxs("td",{children:["₹",a.kasar_amount===""?0:a.kasar_amount]}),e.jsx("td",{children:e.jsx("span",{className:"badge badge-outline",children:z[a.payment_type]})}),e.jsx("td",{children:e.jsx("span",{className:`${o} badge-outline`,children:M[a.payment_status]})}),e.jsx("td",{children:e.jsx("button",{className:"btn btn-sm btn-primary",onClick:()=>v(a.order_id),children:"View Order"})})]},a.order_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:9,className:"text-center",children:"No Orders available"})})})]})})]})}),(t==null?void 0:t.length)<j&&e.jsx("div",{className:"mt-2 flex justify-center items-center",children:e.jsx("button",{className:"btn btn-primary custom-rounded",onClick:w,disabled:N,children:N?e.jsxs(e.Fragment,{children:["Loading ",e.jsx(G,{})]}):e.jsx(e.Fragment,{children:"Load More"})})})]})},X=()=>{var a,o,g;const{id:i}=U(),d=Number(i),[j,h]=c.useState(),[y,u]=c.useState(!1),{userData:l,fetchUser:b,count:N}=O(),t=l==null?void 0:l.user;if(c.useEffect(()=>{b(d),u(!1)},[d,y]),!t)return;const _=t.orders.reduce((n,f)=>n+f.kasar_amount,0),v=t.orders.reduce((n,f)=>n+f.total,0),w=()=>{h(!0)};return e.jsxs("div",{className:"container mx-auto p-6",children:[e.jsx("div",{className:"flex flex-col bg-gray-50 p-5 rounded-md shadow-md",children:e.jsxs("div",{className:"flex justify-between gap-4 items-center",children:[e.jsxs("h1",{className:"text-xl font-semibold text-gray-900",children:[t.first_name," ",t.last_name]}),(l==null?void 0:l.total_pending_amount)!==0&&e.jsxs("div",{className:"flex flex-end items-center gap-2",children:[e.jsxs("span",{className:"text-sm font-medium text-red-700",children:["Total Pending Amount: ₹",l.total_pending_amount]}),e.jsxs("button",{className:"font-extralight btn btn-lg btn-light",onClick:w,children:["Pay ",e.jsx(E,{size:20})]})]}),(t==null?void 0:t.role_id)!==5&&e.jsx("span",{className:`mt-1 p-2 rounded-md text-sm ${T(t.role_id)}`,children:A[t.role_id]})]})}),e.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5 mt-5",children:e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card pb-2.5",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Personal Information"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Name:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:[t.first_name," ",t.last_name]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Email:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:"email"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Mobile Number:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:t.mobile_number})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Gender:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:B[t.gender]})]}),(t==null?void 0:t.image)!==""&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Profile Photo :"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:e.jsx("span",{className:"",children:e.jsx("img",{className:"h-14 w-14 rounded-full",src:t.image})})})]}),t.role_id!==5&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Role:"}),e.jsx("span",{className:`mt-1 p-2 rounded-md text-sm ${T(t.role_id)}`,children:A[t.role_id]})]}),((a=t==null?void 0:t.companies)==null?void 0:a.length)>0&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Company:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:[t.companies.map(n=>n).join(",")," "]})]}),((o=t==null?void 0:t.branches)==null?void 0:o.length)>0&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Branch:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:[t.branches.map(n=>n).join(", ")," "]})]}),((g=t==null?void 0:t.workshops)==null?void 0:g.length)>0&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Workshop:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:[t.workshops.map(n=>n).join(", ")," "]})]})]})})})]})})}),(t==null?void 0:t.role_id)===5&&t&&e.jsx(V,{user:t,userId:d,count:N}),(t==null?void 0:t.orders.length)>0&&e.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6",children:e.jsx("div",{className:"space-y-6",children:e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Orders Summary"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total Kasar Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",_]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total Order Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",v]})]}),l.total_pending_amount>0&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total Pending Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",l.total_pending_amount]}),e.jsx("td",{children:e.jsx("span",{className:"relative bottom-2 left-4",children:e.jsxs("button",{className:"flex items-center gap-2.5 font-extralight btn btn-light ",onClick:w,children:["Pay ",e.jsx(E,{size:20})]})})})]})]})})})})]})})})}),e.jsx(K,{modalOpen:j,onClose:()=>h(!1),userId:d,setRefetch:u,count:N})]})};export{X as default};
