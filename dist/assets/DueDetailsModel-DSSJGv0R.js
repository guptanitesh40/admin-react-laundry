import{r as d,V as f,B as P,t as F,j as e,a as D,b as E,m as T,q as O}from"./index-Bh52HvmB.js";import{u as L}from"./useGetWorkshops-D8uA11xE.js";const R="http://3.110.208.70:3000/admin/orders/assign-pickup",W=()=>{const[l,s]=d.useState(!1);return{assignPickupBoy:async x=>{const c=localStorage.getItem("authToken");s(!0);try{const t=await fetch(R,{method:"PATCH",headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify(x)}),o=await t.json();return t.ok?(f.success(o.message,{position:"top-center"}),!0):(f.error(o.message,{position:"top-center"}),!1)}catch(t){return f.error((t==null?void 0:t.message)||"Error assignning pickupboy",{position:"top-center"}),!1}finally{s(!1)}},loading:l}},z=()=>{const[l,s]=d.useState(!1);return{assignWorkshop:async(x,c)=>{const t=localStorage.getItem("authToken");s(!0);try{const o=await fetch(`${P}/admin/orders/assign-workshop`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_ids:x,workshop_id:c})}),b=await o.json();return o.ok?(f.success(b.message,{position:"top-center"}),!0):(f.error(b.message,{position:"top-center"}),!1)}catch{return f.error("Failed to assign workshop"),!1}finally{s(!1)}},loading:l}},U=()=>{const[l,s]=d.useState(!1);return{assignBranch:async(x,c)=>{const t=localStorage.getItem("authToken");s(!0);try{const o=await fetch(`${P}/admin/orders/assign-branch`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_id:x,branch_id:c})}),b=await o.json();return o.ok?(f.success(b.message,{position:"top-center"}),!0):(f.error(b.message,{position:"top-center"}),!1)}catch{return f.error("Failed to assign branch"),!1}finally{s(!1)}},loading:l}},M="http://3.110.208.70:3000/admin/orders/assign-delivery",q=()=>{const[l,s]=d.useState(!1);return{assignDeliveryBoy:async x=>{const c=localStorage.getItem("authToken");s(!0);try{const t=await fetch(M,{method:"PATCH",headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify(x)}),o=await t.json();return t.ok?(f.success(o.message,{position:"top-center"}),!0):(f.error(o.message,{position:"top-center"}),!1)}catch(t){return f.error((t==null?void 0:t.message)||"Error assigning delivery boy",{position:"top-center"}),!1}finally{s(!1)}},loading:l}},I=D().shape({pickup_boy_id:T().required("Please enter name to assign")}),Y=({orderId:l,modelOpen:s,onClose:g,setAssigned:x,orderStatus:c})=>{const{assignPickupBoy:t,loading:o}=W(),{assignDeliveryBoy:b,loading:j}=q(),{users:k,fetchUsersByRole:_}=F(),[a,r]=d.useState(""),[y,u]=d.useState(!0),[n,m]=d.useState({order_ids:l,pickup_boy_id:null,comment:""}),[i,h]=d.useState(""),v=d.useRef(null),S=d.useRef(null),[B,C]=d.useState(!1);d.useEffect(()=>{(async()=>{B&&(!a||a.trim()==="")?await _(4):a&&y&&await _(4,a)})()},[B,a,y]);const A=p=>{r(p.target.value),u(!0),p.target.value===""&&m({...n,pickup_boy_id:null})},w=p=>{const N=`${p.first_name} ${p.last_name}`;r(N),u(!1),m({...n,pickup_boy_id:p.user_id})};d.useEffect(()=>{const p=N=>{v.current&&!v.current.contains(N.target)&&S.current&&!S.current.contains(N.target)&&(u(!1),C(!1))};return document.addEventListener("mousedown",p),()=>{document.removeEventListener("mousedown",p)}},[]),d.useEffect(()=>{s||(r(""),m({order_ids:l,pickup_boy_id:null,comment:""}),h(""))},[s,l]);const $=async p=>{p.preventDefault();try{if(await I.validate(n,{abortEarly:!1}),c==="Assign Delivery boy"){const N={order_ids:n.order_ids,delivery_boy_id:n.pickup_boy_id};await b(N)}else await t(n);x(!0),g()}catch(N){N instanceof E&&h(N.errors[0])}};return s?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:g}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:g,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:c}),e.jsxs("form",{onSubmit:$,children:[e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{htmlFor:"username",className:"block text-gray-700 text-sm font-bold mb-1",children:"Name"}),e.jsx("input",{type:"text",id:"username",ref:S,autoComplete:"off",value:a||"",onChange:A,className:"input border border-gray-300 rounded-md p-2 w-full",placeholder:"Search name...",onFocus:()=>{C(!0),u(!0)}}),k&&y&&e.jsx("ul",{ref:v,className:"absolute mt-[64px] bg-white z-10 border border-gray-300 rounded-md p-2 w-full text-sm",children:k.length>0?k.map(p=>e.jsxs("li",{className:"p-2 hover:bg-gray-100 cursor-pointer",onClick:()=>w(p),children:[p.first_name," ",p.last_name," (",p.mobile_number,")"]},p.user_id)):e.jsx("li",{className:"p-2 text-gray-500",children:"No users found"})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:i||" "})]}),c==="Assign Pickup Boy"&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-1",htmlFor:"comment",children:"Comment"}),e.jsx("textarea",{id:"comment",name:"comment",className:"h-20 input border border-gray-300 rounded-md p-2",rows:5,value:n.comment,onChange:p=>m({...n,comment:p.target.value})})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",disabled:o||j,children:"Assign"}),e.jsx("button",{type:"button",onClick:g,className:"btn btn-light",children:"Cancel"})]})]})]})]}):null},G=D().shape({option:T().required("Please select option")}),K=({orderIds:l,workshopModalOpen:s,onClose:g,setAssigned:x,orderStatus:c})=>{const{workshops:b}=L(1,1e3),{branches:j}=O(1,1e3),{assignWorkshop:k,loading:_}=z(),{assignBranch:a}=U(),[r,y]=d.useState(),[u,n]=d.useState("");d.useEffect(()=>{s||(y(null),n(""))},[s,l]);const m=async i=>{i.preventDefault();try{await G.validate({option:r},{abortEarly:!1}),c==="Assign Workshop"?await k(l,r):await a(l,r),g(),x(!0)}catch(h){h instanceof E&&n(h.errors[0])}};return s?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:g}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:g,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:c==="Assign Workshop"?"Assign Workshop":"Assign Branch"}),e.jsxs("form",{onSubmit:m,children:[c==="Assign Workshop"?e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"workshop_id",children:"Workshop"}),e.jsxs("select",{id:"workshop_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:r??"",onChange:i=>y(Number(i.target.value)),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Workshop"}),(b==null?void 0:b.length)>0?b.map(i=>e.jsx("option",{value:i.workshop_id,children:i.workshop_name},i.workshop_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:u||" "})]}):e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"branch_id",children:"Branch"}),e.jsxs("select",{id:"branch_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:r??"",onChange:i=>y(Number(i.target.value)),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Branch"}),(j==null?void 0:j.length)>0?j.map(i=>e.jsx("option",{value:i.branch_id,children:i.branch_name},i.branch_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:u||" "})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",disabled:_,children:"Assign"}),e.jsx("button",{type:"button",onClick:g,className:"btn btn-light",children:"Cancel"})]})]})]})]}):!1},J=()=>{const[l,s]=d.useState(!1);return{payDue:async x=>{const c=localStorage.getItem("authToken");if(!c)return f.error("Authentication token is missing!",{position:"top-center"}),{success:!1};s(!0);try{const t=await fetch(`${P}/orders/payments/pay-due`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({orders:x})}),o=await t.json();if(!t.ok)throw new Error((o==null?void 0:o.message)||"Failed to process payment.");return f.success("Order status updated successfully",{position:"top-center"}),{success:!0,data:o}}catch(t){return f.error(t.message,{position:"top-center"}),{success:!1,error:t.message}}finally{s(!1)}},loading:l}},Q=({orders:l,onClose:s,onSuccess:g})=>{const{payDue:x,loading:c}=J(),[t,o]=d.useState([]),[b,j]=d.useState({}),k=async()=>{if(Object.keys(b).length>0){f.error("Please fix errors before submitting.");return}const a=11,r=t.map(({order_id:u,current_paid:n,payment_status:m,kasar_amount:i,user_id:h})=>({order_id:u,paid_amount:n,payment_status:m,kasar_amount:i,order_status:a,user_id:h}));await x(r)&&g(!0)},_=(a,r,y)=>{o(u=>u.map(n=>{if(n.order_id!==a)return n;const m={...n,[r]:y},i=m.current_paid+m.kasar_amount+m.paid_amount;return i>m.total?j(h=>({...h,[a]:"Paid amount cannot exceed total amount."})):j(h=>{const v={...h};return delete v[a],v}),i===m.total?m.payment_status=2:i>0?m.payment_status=3:m.payment_status=1,m}))};if(d.useEffect(()=>{l.length>0&&o(l.map(a=>{var r,y;return{user:a.user,user_id:a.user_id,order_id:a.order_id,total:a.total,paid_amount:a.paid_amount,kasar_amount:a.kasar_amount,current_paid:0,payment_status:a.payment_status,total_items:((r=a.items)==null?void 0:r.length)||0,total_quantity:((y=a.items)==null?void 0:y.reduce((u,n)=>u+n.quantity,0))||"NULL"}}))},[l]),!l.length){f.error("Order not found."),s();return}return e.jsxs("div",{className:"fixed inset-0 z-50 p-4 grid place-items-center overflow-y-auto",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:s}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[700px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:s,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-xl font-bold mb-6",children:"Order Due Summary"}),e.jsx("div",{className:"flex flex-col gap-4 max-h-[500px] overflow-y-auto",children:t.map(a=>{const{order_id:r,user:y,total:u,paid_amount:n,total_items:m,total_quantity:i,kasar_amount:h,current_paid:v,payment_status:S}=a,{first_name:B,last_name:C,mobile_number:A}=y;return e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"py-2 px-4 border-b border-gray-200 flex justify-between gap-4 items-center",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsxs("a",{href:`/order/${r}`,target:"__blank",className:"text-base font-bold link",children:["#",r]}),e.jsx("h4",{className:"text-gray-700 text-sm font-bold",children:`${B} ${C} (${A})`})]}),e.jsx("div",{className:"flex flex-col gap-1",children:u===n+h?e.jsx("p",{className:"badge-outline badge badge-info justify-self-start",children:"Payement Received"}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"form-label !text-red-500 !font-bold",children:"Total Due Amount"}),e.jsx("p",{className:"form-label justify-center !text-red-500 !font-bold",children:u-n-h})]})})]}),e.jsx("div",{className:"py-3 px-4",children:e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-stretch gap-3",children:[e.jsxs("div",{className:"basis-[225px] grid grid-cols-2 gap-y-2 items-center gap-x-4",children:[e.jsx("p",{className:"form-label",children:"Total Amount"}),e.jsx("p",{className:"form-label justify-center",children:u}),e.jsx("p",{className:"form-label",children:"Paid Amount"}),e.jsx("p",{className:"form-label justify-center",children:n}),e.jsx("p",{className:"form-label",children:"Total Items"}),e.jsx("p",{className:"form-label justify-center",children:m}),e.jsx("p",{className:"form-label",children:"Total Quantity"}),e.jsx("p",{className:"form-label justify-center",children:i})]}),e.jsxs("div",{className:"grow grid grid-cols-2 gap-y-2 items-center",children:[e.jsx("label",{htmlFor:"kasar_amount",className:"form-label",children:"Kasar Amount"}),e.jsx("input",{id:"kasar_amount",className:"form-control border border-gray-400 rounded px-3 py-2 input",type:"text",value:h,autoComplete:"off",disabled:u===h+n,onChange:w=>_(r,"kasar_amount",Number(w.target.value))}),e.jsx("label",{htmlFor:"current_paid_amount",className:"form-label",children:"Current Paid"}),e.jsx("div",{children:e.jsx("input",{id:"current_paid_amount",className:"form-control border border-gray-400 rounded px-3 py-2 input",type:"text",value:v,autoComplete:"off",disabled:u===h+n,onChange:w=>_(r,"current_paid",Number(w.target.value))})}),e.jsx("label",{htmlFor:"payement_status",className:"form-label",children:"Payment Status"}),e.jsxs("select",{id:"payement_status",className:"form-select border border-gray-400 rounded px-3 py-2 select",value:S,disabled:u===h+n,onChange:w=>_(r,"payment_status",Number(w.target.value)),children:[e.jsx("option",{value:1,children:"Pending"}),e.jsx("option",{value:2,children:"Received"}),e.jsx("option",{value:3,children:"Partial received"})]})]})]}),e.jsx("div",{children:b[r]&&e.jsx("p",{className:"text-red-500 text-sm mt-1 text-right",children:b[r]})})]})})]},r)})}),e.jsxs("div",{className:"mt-4 space-x-4",children:[e.jsx("button",{type:"button",className:"btn btn-primary relative",disabled:c,onClick:k,children:c?"loading...":"Submit"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:s,children:"Cancel"})]})]})]})};export{Q as D,Y as P,K as W,q as a,W as u};
