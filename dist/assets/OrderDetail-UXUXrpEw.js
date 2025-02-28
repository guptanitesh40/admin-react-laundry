import{r as l,B as R,V as u,G as J,j as e,a as B,b as D,l as L,d as F,m as ge,e as be,s as je,k as ye,A as Ne,M as _e,C as H,D as ve}from"./index-BxAhdOGX.js";import{b as we,c as ke,P as Se}from"./enums-CdakGUf3.js";import{u as Ce}from"./useGetOrder-BGFKCvBa.js";import{d as Ae}from"./dayjs.min-DVMdQKoZ.js";import{u as Oe}from"./useGenerateInvoice-F77Ca7PW.js";import{S as O}from"./sweetalert2.esm.all-B0Dix5B2.js";import{u as Re}from"./useGetUsersByRole-D3OzJlDe.js";import{u as Be}from"./useGetBranches-BC-Tju3v.js";import{u as De}from"./useGetWorkshops-CmzKdUP4.js";import{g as Y}from"./orderStatusClasses-HfHBGnti.js";import{L as Pe}from"./Loading-DH4dULuQ.js";import{g as Ee}from"./paymentStatusClasses-BddHAg9R.js";const Te=()=>{const[n,a]=l.useState(!1),d=localStorage.getItem("authToken");return{cancelOrder:async s=>{a(!0);try{const t=await fetch(`${R}/orders/cancel`,{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-type":"application/json"},body:JSON.stringify(s)}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){u.error((t==null?void 0:t.message)||"Error in cancelling order",{position:"top-center"})}finally{a(!1)}},loading:n}},Le=()=>{const[n,a]=l.useState(!1),d=localStorage.getItem("authToken");return{refundOrder:async s=>{a(!0);try{const t=await fetch(`${R}/refund`,{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-type":"application/json"},body:JSON.stringify(s)}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){u.error((t==null?void 0:t.message)||"Network Error : Fail to refund order",{position:"top-center"})}finally{a(!1)}},loading:n}},$e="http://35.154.167.170:3000/notes",Ie=()=>{const[n,a]=l.useState(!1);return{addNote:async x=>{const s=localStorage.getItem("authToken");a(!0);try{const t=await fetch($e,{method:"POST",headers:{Authorization:`Bearer ${s}`},body:x}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){return u.error((t==null?void 0:t.message)||"Error adding note",{position:"top-center"}),!1}finally{a(!1)}},loading:n}},Fe=()=>{const[n,a]=l.useState(!1);return{deleteNote:async x=>{const s=localStorage.getItem("authToken"),t=`http://35.154.167.170:3000/notes/${x}`;a(!0);try{const i=await fetch(t,{method:"DELETE",headers:{Authorization:`Bearer ${s}`}}),m=await i.json();return i.ok?{success:!0,message:m.message}:(u.error(m.message,{position:"top-center"}),{success:!1,message:m.message})}catch(i){return{success:!1,message:i.message}}finally{a(!1)}},loading:n}},ze="http://35.154.167.170:3000/admin/orders/assign-pickup",Me=()=>{const[n,a]=l.useState(!1);return{assignPickupBoy:async x=>{const s=localStorage.getItem("authToken");a(!0);try{const t=await fetch(ze,{method:"PATCH",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(x)}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){return u.error((t==null?void 0:t.message)||"Error assignning pickupboy",{position:"top-center"}),!1}finally{a(!1)}},loading:n}},We=()=>{const[n,a]=l.useState(!1);return{updateOrderStatus:async(x,s)=>{const t=localStorage.getItem("authToken");a(!0);try{const i=await fetch(`${R}/admin/orders/${x}/update-status`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_status:s})}),m=await i.json();return i.ok?(u.success(m.message,{position:"top-center"}),!0):(u.error(m.message,{position:"top-center"}),!1)}catch{return u.error("Failed to update order status"),!1}finally{a(!1)}},loading:n}},Ue=()=>{const[n,a]=l.useState(!1);return{assignWorkshop:async(x,s)=>{const t=localStorage.getItem("authToken");a(!0);try{const i=await fetch(`${R}/admin/orders/assign-workshop`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_id:x,workshop_id:s})}),m=await i.json();return i.ok?(u.success(m.message,{position:"top-center"}),!0):(u.error(m.message,{position:"top-center"}),!1)}catch{return u.error("Failed to assign workshop"),!1}finally{a(!1)}},loading:n}},qe=()=>{const[n,a]=l.useState(!1);return{assignBranch:async(x,s)=>{const t=localStorage.getItem("authToken");a(!0);try{const i=await fetch(`${R}/admin/orders/assign-branch`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_id:x,branch_id:s})}),m=await i.json();return i.ok?(u.success(m.message,{position:"top-center"}),!0):(u.error(m.message,{position:"top-center"}),!1)}catch{return u.error("Failed to assign branch"),!1}finally{a(!1)}},loading:n}};function Ge(n){return J({attr:{viewBox:"0 0 15 15",fill:"none"},child:[{tag:"path",attr:{fillRule:"evenodd",clipRule:"evenodd",d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:"currentColor"},child:[]}]})(n)}const He="http://35.154.167.170:3000/admin/orders/assign-delivery",Ye=()=>{const[n,a]=l.useState(!1);return{assignDeliveryBoy:async x=>{const s=localStorage.getItem("authToken");a(!0);try{const t=await fetch(He,{method:"PATCH",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(x)}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){return u.error((t==null?void 0:t.message)||"Error assigning delivery boy",{position:"top-center"}),!1}finally{a(!1)}},loading:n}},Je=B().shape({pickup_boy_id:L().required("Please enter name to assign")}),Ve=({orderId:n,modelOpen:a,onClose:d,setAssigned:x,orderStatus:s})=>{const{assignPickupBoy:t}=Me(),{assignDeliveryBoy:i}=Ye(),{users:m,fetchUsersByRole:y}=Re(),[N,p]=l.useState(""),[g,j]=l.useState(!0),[c,h]=l.useState({order_id:n,pickup_boy_id:null,comment:""}),[v,f]=l.useState("");l.useEffect(()=>{(async()=>{await y(4,N)})()},[N,g]);const C=b=>{p(b.target.value),j(!0),b.target.value===""&&h({...c,pickup_boy_id:null})},P=b=>{const k=`${b.first_name} ${b.last_name}`;p(k),j(!1),h({...c,pickup_boy_id:b.user_id})};l.useEffect(()=>{a||(p(""),h({order_id:n,pickup_boy_id:null,comment:""}),f(""))},[a,n]);const $=async b=>{b.preventDefault();try{if(await Je.validate(c,{abortEarly:!1}),s==="Assign Delivery boy"){const k={order_id:c.order_id,delivery_boy_id:c.pickup_boy_id};await i(k)}else await t(c);x(!0),d()}catch(k){k instanceof D&&f(k.errors[0])}};return a?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:d}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:d,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:s}),e.jsxs("form",{onSubmit:$,children:[e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{htmlFor:"username",className:"block text-gray-700 text-sm font-bold mb-1",children:"Name"}),e.jsx("input",{type:"text",id:"username",value:N||"",onChange:C,className:"input border border-gray-300 rounded-md p-2 w-full",placeholder:"Search name..."}),m&&N&&g&&e.jsx("ul",{className:"absolute mt-[68px] bg-white z-10 border border-gray-300 rounded-md p-2 w-full text-sm",children:m.length>0?m.map(b=>e.jsxs("li",{className:"p-2 hover:bg-gray-100 cursor-pointer",onClick:()=>P(b),children:[b.first_name," ",b.last_name," (",b.mobile_number,")"]},b.user_id)):e.jsx("li",{className:"p-2 text-gray-500",children:"No users found"})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:v||" "})]}),s==="Assign Pickup Boy"&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-1",htmlFor:"comment",children:"Comment"}),e.jsx("textarea",{id:"comment",name:"comment",className:"h-20 input border border-gray-300 rounded-md p-2",rows:5,value:c.comment,onChange:b=>h({...c,comment:b.target.value})})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",children:"Assign"}),e.jsx("button",{type:"button",onClick:d,className:"btn btn-light",children:"Cancel"})]})]})]})]}):null},Ze=B().shape({option:L().required("Please select option")}),Ke=({orderId:n,workshopModalOpen:a,onClose:d,setAssigned:x,orderStatus:s})=>{const{workshops:m}=De(1,1e3),{branches:y}=Be(1,1e3),{assignWorkshop:N}=Ue(),{assignBranch:p}=qe(),[g,j]=l.useState(),[c,h]=l.useState("");l.useEffect(()=>{a||(j(null),h(""))},[a,n]);const v=async f=>{f.preventDefault();try{await Ze.validate({option:g},{abortEarly:!1}),s==="Assign Workshop"?await N(n,g):await p(n,g),d(),x(!0)}catch(C){C instanceof D&&h(C.errors[0])}};return a?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:d}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:d,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:s==="Assign Workshop"?"Assign Workshop":"Assign Branch"}),e.jsxs("form",{onSubmit:v,children:[s==="Assign Workshop"?e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"workshop_id",children:"Workshop"}),e.jsxs("select",{id:"workshop_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:g??"",onChange:f=>j(Number(f.target.value)),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Select Workshop"}),(m==null?void 0:m.length)>0?m.map(f=>e.jsx("option",{value:f.workshop_id,children:f.workshop_name},f.workshop_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:c||" "})]}):e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"branch_id",children:"Branch"}),e.jsxs("select",{id:"branch_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:g??"",onChange:f=>j(Number(f.target.value)),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Select Branch"}),(y==null?void 0:y.length)>0?y.map(f=>e.jsx("option",{value:f.branch_id,children:f.branch_name},f.branch_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:c||" "})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",children:"Assign"}),e.jsx("button",{type:"button",onClick:d,className:"btn btn-light",children:"Cancel"})]})]})]})]}):!1},Qe=B().shape({text_note:F().required("Please enter text to add note")}),Xe=({onClose:n,orderCancelModalOpen:a,orderId:d,setRefetch:x})=>{const{cancelOrder:s,loading:t}=Te(),[i,m]=l.useState(""),y=JSON.parse(localStorage.getItem("user")),N=y==null?void 0:y.user_id,[p,g]=l.useState({user_id:N,order_id:d,text_note:""});l.useEffect(()=>{a?g({user_id:N,order_id:d,text_note:""}):(g({user_id:null,order_id:null,text_note:""}),m(""))},[a]);const j=async c=>{c.preventDefault();try{await Qe.validate(p,{abortEarly:!1}),await s(p)&&(m(""),n(),x(!0))}catch(h){h instanceof D?m(h.errors[0]):u.error("Failed to Cancel Order")}};if(a)return e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-5",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:n}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[450px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:n,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsxs("h1",{className:"text-xl font-semibold text-gray-900",children:["Cancel Order #",d]}),e.jsxs("div",{className:"mt-2 p-3",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-700 mb-4",children:"Reason for Cancellation"}),e.jsxs("div",{children:[e.jsx("textarea",{className:"h-20 input border border-gray-300 rounded-md p-2",rows:5,placeholder:"Write a text note...",value:p.text_note||"",onChange:c=>g({...p,text_note:c.target.value})}),e.jsx("p",{className:"text-red-500 text-sm",children:i||" "})]})]}),e.jsx("button",{type:"submit",className:`btn btn-primary ${t?"opacity-50 cursor-not-allowed":""}`,onClick:j,disabled:t,children:t?"Cancelling.":"Submit"}),e.jsx("button",{type:"button",className:"btn btn-light ml-2",onClick:n,children:"Cancel"})]})]})};function es(n){return J({attr:{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M12 1.5c-1.921 0-3.816.111-5.68.327-1.497.174-2.57 1.46-2.57 2.93V21.75a.75.75 0 0 0 1.029.696l3.471-1.388 3.472 1.388a.75.75 0 0 0 .556 0l3.472-1.388 3.471 1.388a.75.75 0 0 0 1.029-.696V4.757c0-1.47-1.073-2.756-2.57-2.93A49.255 49.255 0 0 0 12 1.5Zm-.97 6.53a.75.75 0 1 0-1.06-1.06L7.72 9.22a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-.97-.97h3.065a1.875 1.875 0 0 1 0 3.75H12a.75.75 0 0 0 0 1.5h1.125a3.375 3.375 0 1 0 0-6.75h-3.064l.97-.97Z",clipRule:"evenodd"},child:[]}]})(n)}const ss=B().shape({refund_descriptions:F().required("Please enter text to add description"),refund_amount:L().required("Refund amount is required").typeError("Refund amount must be a number").min(0,"Paid amount must be a positive number"),refund_status:L().required("Please choose refund status").test("required","Please choose refund status",n=>!!n)}),ts=({orderRefundModalOpen:n,onClose:a,orderId:d,TotalAmount:x,PaidAmount:s,setRefetch:t})=>{const{refundOrder:i,loading:m}=Le(),[y,N]=l.useState({}),[p,g]=l.useState({order_id:d,refund_amount:null,refund_status:null,refund_descriptions:""});l.useEffect(()=>{n?g({order_id:d,refund_amount:null,refund_status:null,refund_descriptions:""}):(g({order_id:d,refund_amount:null,refund_status:null,refund_descriptions:""}),N({}))},[n]);const j=async c=>{c.preventDefault();try{await ss.validate(p,{abortEarly:!1});const h={...p,refund_amount:Number(p.refund_amount)};await i(h)&&(a(),t(!0))}catch(h){if(h instanceof D){const v={};h.inner.forEach(f=>{v[f.path||""]=f.message}),N(v)}else u.error("Failed to submit the form. Please try again.")}};if(n)return e.jsxs("div",{className:"fixed inset-0 grid overflow-auto items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:a}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg min-w-[400px] smobile:min-w-[85%] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:a,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsxs("h1",{className:"text-xl font-semibold text-gray-900 mb-4",children:["Refund Order #",d]}),e.jsxs("div",{className:"flex flex-col p-2",children:[e.jsxs("span",{className:"text-gray-700 text-sm font-medium py-1",children:["Total Amount : ₹",x]}),e.jsxs("span",{className:"text-gray-700 text-sm font-medium py-1",children:["Paid Amount : ₹",s]})]}),e.jsxs("div",{className:"p-2",children:[e.jsxs("div",{className:"flex flex-col mb-2",children:[e.jsx("label",{htmlFor:"refund_amount",className:"block text-gray-700 text-sm font-bold mb-2",children:"Refund Amount"}),e.jsx("input",{type:"text",id:"refund_amount",min:"0",value:p.refund_amount||"",onChange:c=>g({...p,refund_amount:c.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:y.refund_amount||" "})]}),e.jsxs("div",{className:"flex flex-col mb-2",children:[e.jsx("label",{className:"block text-gray-700 text-base font-bold mb-2",htmlFor:"refund_descriptions",children:"Reason of Refund (Refund Note)"}),e.jsx("textarea",{id:"refund_descriptions",name:"refund_descriptions",value:p.refund_descriptions,onChange:c=>g({...p,refund_descriptions:c.target.value}),className:"h-20 input border border-gray-300 rounded-md p-2",rows:5}),e.jsx("p",{className:"text-red-500 text-sm",children:y.refund_descriptions||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 text-base font-bold mb-2",htmlFor:"refund_status",children:"Refund Status"}),e.jsxs("select",{id:"refund_status",className:"select select-lg w-[170px] text-sm",value:p.refund_status||"",onChange:c=>g({...p,refund_status:Number(c.target.value)}),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Select Refund Status"}),e.jsx("option",{value:1,children:"Full"}),e.jsx("option",{value:2,children:"Partial"})]}),e.jsx("p",{className:"w-full text-red-500 text-sm",children:y.refund_status||" "})]})]}),e.jsx("button",{type:"submit",className:`btn btn-primary ${m?"opacity-50 cursor-not-allowed":""}`,onClick:j,disabled:m,children:m?"Submitting...":"Submit"}),e.jsx("button",{type:"button",className:"btn btn-light ml-2",onClick:a,children:"Cancel"})]})]})},as=B().shape({text_note:F().required("Please enter text to add note")}),gs=()=>{var G;const{id:n}=ge(),a=Number(n),d=JSON.parse(localStorage.getItem("user")),x=d==null?void 0:d.user_id,{order:s,fetchOrder:t}=Ce(),{addNote:i,loading:m}=Ie(),{deleteNote:y}=Fe(),{updateOrderStatus:N}=We(),{generateInvoice:p,loading:g}=Oe(),{hasPermission:j}=be(),[c,h]=l.useState({user_id:null,order_id:null,text_note:"",images:[]}),[v,f]=l.useState(!1),[C,P]=l.useState(!1),[$,b]=l.useState(!1),[k,z]=l.useState(!1),[V,I]=l.useState(!1),[Z,M]=l.useState(""),[rs,K]=l.useState(!1),[Q,E]=l.useState(!1),W=je(),U=ye(),q=l.useRef(null);l.useEffect(()=>{t(a),I(!1),E(!1)},[V,Q]),l.useEffect(()=>{s&&h(r=>({...r,user_id:s.user_id,order_id:s.order_id}))},[s]);const X=r=>{const o=r.target;if(o instanceof HTMLInputElement){const{name:S,value:_,files:A}=o;S==="images"&&A&&A.length>0?h(T=>({...T,images:[...T.images,...Array.from(A)]})):h(T=>({...T,[S]:_}))}},ee=async r=>{try{const{isConfirmed:o}=await O.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(o){const{success:S,message:_}=await y(r);S?(await t(a),O.fire(_)):O.fire(_)}}catch(o){O.fire({title:"Error",text:o.message,icon:"error"})}},se=()=>{var r;(r=q.current)==null||r.click()},te=r=>{h(o=>({...o,images:o.images.filter((S,_)=>_!==r)}))},ae=async r=>{r.preventDefault();try{await as.validate(c,{abortEarly:!1});const o=new FormData;o.append("user_id",x),o.append("order_id",c.order_id),o.append("text_note",c.text_note),c.images&&c.images.length>0&&c.images.forEach(_=>{o.append("images",_)}),await i(o)&&(h({user_id:null,order_id:null,text_note:"",images:[]}),M(""),await t(c.order_id))}catch(o){o instanceof D?M(o.errors[0]):u.error("Failed to add note")}},re=async()=>{try{const{isConfirmed:r}=await O.fire({title:"Are you sure?",text:"Want to change order status!",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes",cancelButtonText:"No"});return r}catch(r){return O.fire({title:"Error",text:r.message,icon:"error"}),!1}},ne=async r=>{await N(a,r)&&await t(a)},w=async r=>{await re()&&await ne(r)},ie=async()=>{var r;switch(s==null?void 0:s.order_status_details.next_step){case"Assign Pickup Boy":case"Assign Delivery boy":f(!0);break;case"Received by pickup boy":await w(3);break;case"Order Received at Workshop":await w(6);break;case"Workshop Marks Order In Progress":await w(7);break;case"Work Completed by Workshop":await w(8);break;case"Mark as Received at Branch":await w(9),((r=W.state)==null?void 0:r.from)==="WorkshopOrderTable"&&U("/workshop-order");break;case"Items Received at Branch":case"Pickup Complete":await w(4);break;case"Ready For Delivery":await w(10);break;case"Delivered":await w(11);break;case"Assign Workshop":case"Assign Branch":P(!0);break;case"Branch Received Items":await w(8),K(!1);break}},le=async()=>{await ie()},ce=()=>{U(`/order/edit/${a}`,{state:{prevUrl:W.pathname}})},oe=()=>{b(!0)},de=()=>{z(!0)},me=async()=>{var r;if((s==null?void 0:s.order_invoice)!==""){const o=(r=s==null?void 0:s.order_invoice)==null?void 0:r.fileUrl;window.open(o,"_blank")}else await p(a),E(!0)};if(!s)return null;const ue=Y(s.order_status_details.admin_label),xe=Y(s.order_status_details.next_step),he=we[s.payment_status],pe=()=>{var o;const r=(o=s==null?void 0:s.order_label)==null?void 0:o.fileUrl;window.open(r,"_blank")},fe=()=>{var o;const r=(o=s==null?void 0:s.refund_receipt_url)==null?void 0:o.fileUrl;window.open(r,"_blank")};return e.jsxs("div",{className:"container mx-auto p-6",children:[e.jsx("div",{className:"card rounded-xl",children:e.jsxs("div",{className:"flex flex-col gap-4 p-5 rounded-md shadow-md",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("h1",{className:"text-xl font-semibold text-gray-900",children:["Order Details - #",a]}),e.jsxs("div",{className:"flex gap-2 mobile:flex-wrap",children:[(s==null?void 0:s.order_status)===11&&e.jsxs("button",{className:"flex items-center btn-light sm:btn smmobile:btn-sm smmobile:btn",onClick:me,disabled:g,children:[e.jsx(Ne,{size:20,color:"gray"}),g?e.jsxs(e.Fragment,{children:["View Invoice ",e.jsx(Pe,{})]}):"View Invoice"]}),j(3,"update")&&e.jsxs("button",{className:"flex items-center font-medium sm:btn btn-primary smmobile:btn-sm smmobile:btn",onClick:ce,children:[e.jsx("i",{className:"ki-filled ki-pencil mr-2"}),"Edit Order"]}),j(3,"update")&&(s==null?void 0:s.order_status)<8&&(s==null?void 0:s.refund_status)!==1&&e.jsxs("button",{className:"flex items-center font-semibold btn-danger sm:btn smmobile:btn-sm smmobile:btn",onClick:oe,children:[e.jsx(_e,{size:20}),"Cancel Order"]}),j(3,"update")&&s.payment_status!==1&&s.refund_status===3&&e.jsxs("button",{className:"flex items-center sm:btn smmobile:btn-sm smmobile:btn font-semibold btn-success",onClick:de,children:[e.jsx(es,{size:20}),"Refund Order"]})]})]}),s.refund_status===3?e.jsxs("div",{className:"flex border border-gray-200 rounded-xl bg-gray-50 items-center justify-between bg-gray-00 p-4 shadow-sm mobile:flex mobile:flex-col gap-5",children:[e.jsxs("div",{className:"flex items-center mobile:flex-col desktop:flex-col gap-2",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Current Status:"}),e.jsx("span",{className:`${ue} badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.admin_label})]}),e.jsx("div",{className:"flex-1 px-6",children:e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:s.order_status_details.description})}),s.order_status_details.next_step!==null&&e.jsxs("div",{className:"flex items-center mobile:flex-col desktop:flex-col gap-2",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Next Step:"}),e.jsx("button",{className:`${xe} badge-outline badge-xl rounded-[30px]`,onClick:le,disabled:!j(3,"update"),children:s.order_status_details.next_step})]})]}):e.jsxs("div",{className:"flex items-center bg-white p-4 rounded-md shadow-sm",children:[e.jsx("div",{children:e.jsx("span",{className:"badge text-sm font-medium text-gray-700",children:"Order Refunded"})}),e.jsxs("div",{className:"flex-1 px-10",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Reason of Refund :"}),e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:s.refund_descriptions})]}),e.jsxs("div",{className:"flex flex-col mr-4 gap-2",children:[e.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["Refund Amount :"," "]}),e.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["₹",s.refund_amount]})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Refund Status :"}),e.jsxs("span",{className:`${s.refund_status===1?"badge badge-primary":"badge badge-warning"} badge-outline badge-sm`,children:[ke[s.refund_status]," "]})]}),e.jsxs("button",{className:"btn btn-secondary btn-lg flex gap-2 ml-3 text-gray-700 text-sm font-semibold",onClick:fe,children:[e.jsx(H,{size:20,color:"gray"})," Refund ",e.jsx("br",{}),"Receipt"]})]})]})}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"card p-2",children:[e.jsxs("div",{className:"card-header border-none p-2 mb-2 ml-2",children:[e.jsx("div",{className:"card-title align-items-start flex-column",children:e.jsxs("div",{children:[e.jsx("h3",{className:"card-title text-lg",children:"Order Items"}),e.jsxs("span",{className:"text-gray-500 text-sm font-bold rounded-lg flex",children:["Total Items: ",s.items.length]})]})}),e.jsx("div",{className:"flex flex-end",children:e.jsxs("button",{className:"flex items-center btn-light sm:btn smmobile:btn-sm smmobile:btn",onClick:pe,children:[e.jsx(H,{size:20,color:"gray"})," ",e.jsx("p",{className:"text-gray-700",children:"Print Label"})]})})]}),e.jsx("div",{className:"flex flex-wrap",children:e.jsx("div",{className:"card-body p-0 ml-4",children:e.jsx("div",{className:"scrollable-y-hover pe-4 pb-4 max-h-[400px] mb-4",children:e.jsx("div",{className:"space-y-4",children:s.items.map(r=>e.jsxs("div",{className:"border border-gray-200 rounded-xl gap-2 px-4 py-4 bg-gray-50",children:[e.jsxs("div",{className:"flex items-center flex-wrap gap-x-10 gap-y-2 justify-between xmobile:flex-col",children:[e.jsxs("div",{className:"flex items-center gap-3.5 xmobile:flex-col",children:[e.jsx("img",{alt:r.product.name,className:"w-16 h-16 shrink-0 object-cover rounded",src:r.product.image}),e.jsxs("div",{className:"flex flex-col ",children:[e.jsxs("span",{className:"text-sm font-semibold text-gray-900 mb-px xmobile:ml-8",children:[r.product.name," (",r.quantity,")"]}),e.jsxs("span",{className:"text-2sm font-medium text-gray-600",children:["Category: ",r.category.name]})]})]}),e.jsx("div",{className:"flex items-center gap-5",children:e.jsxs("div",{className:"badge badge-sm flex gap-1 badge-success badge-outline text-xs",children:[e.jsx("span",{className:"mobile:hidden",children:"Service : "}),e.jsx("span",{children:r.service.name})]})})]}),r.description&&e.jsx("div",{className:"mt-2 p-3 bg-gray-100 rounded-md",children:e.jsxs("p",{className:"text-sm text-gray-600",children:[e.jsx("span",{className:"text-sm font-medium text-gray-600",children:"Description :"})," ",r.description]})})]},r.item_id))})})})})]}),e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Order Summary"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Sub Total:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.sub_total]})]}),s.normal_delivery_charges!==0&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Normal Delivery Charge:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.normal_delivery_charges]})]}),s.express_delivery_charges!==0&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Express Delivery Charge:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.express_delivery_charges]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Kasar Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.kasar_amount]})]}),s.coupon_code!==""&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Coupon Code:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.coupon_code})]}),s.coupon_discount!==0&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Coupon Discount"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.coupon_discount]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.total]})]})]})})})]})}),e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Estimated Delivery & Pickup"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{className:"flex flex-col gap-2",children:[e.jsxs("tr",{className:"",children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pe-9",children:"Estimated Pickup Time:"}),e.jsx("td",{className:"text-sm font-medium text-gray-700",children:new Date(s.estimated_pickup_time).toLocaleDateString()})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pe-6",children:"Estimated Delivery Time:"}),e.jsx("td",{className:"text-sm font-medium text-gray-700",children:new Date(s.estimated_delivery_time).toLocaleDateString()})]})]})})})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card min-w-full",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Customer Information"})}),e.jsx("div",{className:"card-body pt-4 pb-2",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Name:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:[s.user.first_name," ",s.user.last_name]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Email:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.user.email})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Mobile Number:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.user.mobile_number})]})]})})})})]})}),s.branch&&e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Branch Information"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.branch.branch_name})]})})})}),s.pickup_boy&&e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Pickup Boy Information"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.pickup_boy.pickup_boy_name}),s.pickup_comment&&e.jsx("div",{className:"mt-2 p-3 bg-gray-100 rounded-md",children:e.jsx("p",{className:"text-sm text-gray-600",children:s.pickup_comment})})]})})})}),e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Shipping Address"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.address_details!=="null"&&s.address_details.trim()!==""?s.address_details:"Address not provided."})]})})})}),e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card min-w-full",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Payment Information"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Payment Type:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:Se[s.payment_type]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Payment Status:"}),e.jsx("td",{className:`badge-outline ${Ee(s.payment_status)}`,children:he})]}),(s==null?void 0:s.pending_due_amount)&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Pending amount:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.pending_due_amount})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Transaction ID:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.transaction_id||"N/A"})]})]})})})})]})})]})]}),(j(3,"create")||j(3,"update"))&&e.jsxs("div",{className:"mt-6 card rounded-xl p-6 shadow",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-700 mb-4",children:"Order Notes"}),e.jsxs("div",{children:[e.jsxs("div",{className:"relative border border-gray-300 rounded-md p-2",children:[e.jsx("textarea",{className:"w-full h-16 p-3 border-none focus:outline-none focus:ring-0",placeholder:"Add a new note...",value:c.text_note||"",onChange:r=>h({...c,text_note:r.target.value}),rows:5}),e.jsxs("div",{className:"flex items-center mt-2",children:[e.jsx("button",{className:"text-gray-600 hover:text-gray-700 hover:bg-gray-200 rounded-full p-1 transition-all ease-in-out duration-200",title:"Attach image",onClick:se,children:e.jsx(ve,{size:23})}),e.jsx("input",{type:"file",ref:q,style:{display:"none"},multiple:!0,onChange:X,name:"images"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:Z||" "})]}),e.jsx("div",{children:c.images.map((r,o)=>e.jsxs("div",{className:"relative inline-block mr-2 mb-2 group",children:[e.jsx("img",{src:URL.createObjectURL(r),alt:`Preview ${o}`,className:"w-32 h-32 object-cover rounded-md border"}),e.jsx("button",{className:"absolute top-0 right-0 rounded-full p-1 shadow-md text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200",onClick:()=>te(o),children:e.jsx(Ge,{size:20})})]},o))}),e.jsx("div",{className:"flex relative justify-start pt-2.5",children:e.jsx("button",{className:`px-4 py-2 btn btn-primary 
          ${m?"opacity-50 cursor-not-allowed":""}`,onClick:ae,disabled:m,children:m?"Adding...":"Add Note"})}),e.jsx("ul",{className:"mt-4 space-y-4",children:(G=s.notes)==null?void 0:G.map((r,o)=>{const S=Ae(r.created_at).format("HH:mm, DD/MM/YYYY");return e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsxs("span",{className:"block text-sm text-gray-600",children:["• ",r.user.first_name," ",r.user.last_name]}),e.jsx("span",{className:"text-xs text-gray-500",children:S})]}),e.jsxs("li",{className:"p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-200 relative",children:[e.jsx("p",{className:"text-gray-800 mb-2",children:r.text_note}),r.images&&r.images.length>0&&e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-3",children:r.images.map((_,A)=>e.jsx("img",{src:_,className:"w-full h-auto rounded-md border shadow-sm",alt:`Note Attachment ${A+1}`},A))}),e.jsx("div",{className:"menu absolute top-1 right-2","data-menu":"true",children:e.jsxs("div",{className:"menu-item","data-menu-item-offset":"0, 10px","data-menu-item-placement":"bottom-end","data-menu-item-toggle":"dropdown","data-menu-item-trigger":"click|lg:click",children:[e.jsx("button",{className:"menu-toggle btn btn-sm btn-icon btn-light btn-clear",children:e.jsx("i",{className:"ki-filled ki-dots-vertical"})}),e.jsx("div",{className:"menu-dropdown menu-default w-full max-w-[175px]","data-menu-dismiss":"true",children:e.jsx("div",{className:"menu-item",children:e.jsxs("button",{className:"menu-link",onClick:()=>ee(r.note_id),children:[e.jsx("span",{className:"menu-icon",children:e.jsx("i",{className:"ki-filled ki-trash"})}),e.jsx("span",{className:"menu-title",children:"Remove"})]})})})]})})]})]},o)})})]}),e.jsx(Ve,{orderStatus:(s==null?void 0:s.order_status_details.next_step)==="Assign Pickup Boy"||(s==null?void 0:s.order_status_details.next_step)==="Assign Delivery boy"?s==null?void 0:s.order_status_details.next_step:void 0,modelOpen:v,onClose:()=>f(!1),orderId:a,setAssigned:I}),e.jsx(Ke,{orderStatus:(s==null?void 0:s.order_status_details.next_step)==="Assign Branch"||(s==null?void 0:s.order_status_details.next_step)==="Assign Workshop"?s==null?void 0:s.order_status_details.next_step:void 0,orderId:a,workshopModalOpen:C,onClose:()=>P(!1),setAssigned:I}),e.jsx(Xe,{orderId:s==null?void 0:s.order_id,orderCancelModalOpen:$,onClose:()=>b(!1),setRefetch:E}),e.jsx(ts,{orderId:s==null?void 0:s.order_id,TotalAmount:s==null?void 0:s.total,PaidAmount:s==null?void 0:s.paid_amount,orderRefundModalOpen:k,onClose:()=>z(!1),setRefetch:E})]})};export{gs as default};
