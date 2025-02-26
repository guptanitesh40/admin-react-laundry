import{r as l,B as R,V as u,G,j as e,a as B,b as D,l as T,d as F,m as fe,y as ge,k as be,A as je,M as ye,C as U,D as Ne}from"./index-hktrQmVS.js";import{b as _e,c as ve,P as we}from"./enums-CdakGUf3.js";import{u as ke}from"./useGetOrder-BhqBlEeJ.js";import{d as Se}from"./dayjs.min-Dmf68Q7Q.js";import{u as Ce}from"./useGenerateInvoice-Dc-_iQxq.js";import{S as O}from"./sweetalert2.esm.all-B0Dix5B2.js";import{u as Ae}from"./useGetUsersByRole-DcfP0yXr.js";import{u as Oe}from"./useGetBranches-BLKoo-f5.js";import{u as Re}from"./useGetWorkshops-uOX7nQRi.js";import{g as q}from"./orderStatusClasses-HfHBGnti.js";import{L as Be}from"./Loading-CX5hFqdP.js";import{g as De}from"./paymentStatusClasses-BddHAg9R.js";const Pe=()=>{const[r,a]=l.useState(!1),o=localStorage.getItem("authToken");return{cancelOrder:async s=>{a(!0);try{const t=await fetch(`${R}/orders/cancel`,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-type":"application/json"},body:JSON.stringify(s)}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){u.error((t==null?void 0:t.message)||"Error in cancelling order",{position:"top-center"})}finally{a(!1)}},loading:r}},Ee=()=>{const[r,a]=l.useState(!1),o=localStorage.getItem("authToken");return{refundOrder:async s=>{a(!0);try{const t=await fetch(`${R}/refund`,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-type":"application/json"},body:JSON.stringify(s)}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){u.error((t==null?void 0:t.message)||"Network Error : Fail to refund order",{position:"top-center"})}finally{a(!1)}},loading:r}},Le="http://35.154.167.170:3000/notes",Te=()=>{const[r,a]=l.useState(!1);return{addNote:async x=>{const s=localStorage.getItem("authToken");a(!0);try{const t=await fetch(Le,{method:"POST",headers:{Authorization:`Bearer ${s}`},body:x}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){return u.error((t==null?void 0:t.message)||"Error adding note",{position:"top-center"}),!1}finally{a(!1)}},loading:r}},$e=()=>{const[r,a]=l.useState(!1);return{deleteNote:async x=>{const s=localStorage.getItem("authToken"),t=`http://35.154.167.170:3000/notes/${x}`;a(!0);try{const i=await fetch(t,{method:"DELETE",headers:{Authorization:`Bearer ${s}`}}),d=await i.json();return i.ok?{success:!0,message:d.message}:(u.error(d.message,{position:"top-center"}),{success:!1,message:d.message})}catch(i){return{success:!1,message:i.message}}finally{a(!1)}},loading:r}},Ie="http://35.154.167.170:3000/admin/orders/assign-pickup",Fe=()=>{const[r,a]=l.useState(!1);return{assignPickupBoy:async x=>{const s=localStorage.getItem("authToken");a(!0);try{const t=await fetch(Ie,{method:"PATCH",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(x)}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){return u.error((t==null?void 0:t.message)||"Error assignning pickupboy",{position:"top-center"}),!1}finally{a(!1)}},loading:r}},ze=()=>{const[r,a]=l.useState(!1);return{updateOrderStatus:async(x,s)=>{const t=localStorage.getItem("authToken");a(!0);try{const i=await fetch(`${R}/admin/orders/${x}/update-status`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_status:s})}),d=await i.json();return i.ok?(u.success(d.message,{position:"top-center"}),!0):(u.error(d.message,{position:"top-center"}),!1)}catch{return u.error("Failed to update order status"),!1}finally{a(!1)}},loading:r}},Me=()=>{const[r,a]=l.useState(!1);return{assignWorkshop:async(x,s)=>{const t=localStorage.getItem("authToken");a(!0);try{const i=await fetch(`${R}/admin/orders/assign-workshop`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_id:x,workshop_id:s})}),d=await i.json();return i.ok?(u.success(d.message,{position:"top-center"}),!0):(u.error(d.message,{position:"top-center"}),!1)}catch{return u.error("Failed to assign workshop"),!1}finally{a(!1)}},loading:r}},We=()=>{const[r,a]=l.useState(!1);return{assignBranch:async(x,s)=>{const t=localStorage.getItem("authToken");a(!0);try{const i=await fetch(`${R}/admin/orders/assign-branch`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_id:x,branch_id:s})}),d=await i.json();return i.ok?(u.success(d.message,{position:"top-center"}),!0):(u.error(d.message,{position:"top-center"}),!1)}catch{return u.error("Failed to assign branch"),!1}finally{a(!1)}},loading:r}};function Ue(r){return G({attr:{viewBox:"0 0 15 15",fill:"none"},child:[{tag:"path",attr:{fillRule:"evenodd",clipRule:"evenodd",d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:"currentColor"},child:[]}]})(r)}const qe="http://35.154.167.170:3000/admin/orders/assign-delivery",Ge=()=>{const[r,a]=l.useState(!1);return{assignDeliveryBoy:async x=>{const s=localStorage.getItem("authToken");a(!0);try{const t=await fetch(qe,{method:"PATCH",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(x)}),i=await t.json();return t.ok?(u.success(i.message,{position:"top-center"}),!0):(u.error(i.message,{position:"top-center"}),!1)}catch(t){return u.error((t==null?void 0:t.message)||"Error assigning delivery boy",{position:"top-center"}),!1}finally{a(!1)}},loading:r}},He=B().shape({pickup_boy_id:T().required("Please enter name to assign")}),Ye=({orderId:r,modelOpen:a,onClose:o,setAssigned:x,orderStatus:s})=>{const{assignPickupBoy:t}=Fe(),{assignDeliveryBoy:i}=Ge(),{users:d,fetchUsersByRole:y}=Ae(),[N,h]=l.useState(""),[p,f]=l.useState(!0),[m,j]=l.useState({order_id:r,pickup_boy_id:null,comment:""}),[_,g]=l.useState("");l.useEffect(()=>{(async()=>{await y(4,N)})()},[N,p]);const C=b=>{h(b.target.value),f(!0),b.target.value===""&&j({...m,pickup_boy_id:null})},$=b=>{const w=`${b.first_name} ${b.last_name}`;h(w),f(!1),j({...m,pickup_boy_id:b.user_id})};l.useEffect(()=>{a||(h(""),j({order_id:r,pickup_boy_id:null,comment:""}),g(""))},[a,r]);const P=async b=>{b.preventDefault();try{if(await He.validate(m,{abortEarly:!1}),s==="Assign Delivery boy"){const w={order_id:m.order_id,delivery_boy_id:m.pickup_boy_id};await i(w)}else await t(m);x(!0),o()}catch(w){w instanceof D&&g(w.errors[0])}};return a?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:o}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:o,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:s}),e.jsxs("form",{onSubmit:P,children:[e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{htmlFor:"username",className:"block text-gray-700 text-sm font-bold mb-1",children:"Name"}),e.jsx("input",{type:"text",id:"username",value:N||"",onChange:C,className:"input border border-gray-300 rounded-md p-2 w-full",placeholder:"Search name..."}),d&&N&&p&&e.jsx("ul",{className:"absolute mt-[68px] bg-white z-10 border border-gray-300 rounded-md p-2 w-full text-sm",children:d.length>0?d.map(b=>e.jsxs("li",{className:"p-2 hover:bg-gray-100 cursor-pointer",onClick:()=>$(b),children:[b.first_name," ",b.last_name," (",b.mobile_number,")"]},b.user_id)):e.jsx("li",{className:"p-2 text-gray-500",children:"No users found"})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:_||" "})]}),s==="Assign Pickup Boy"&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-1",htmlFor:"comment",children:"Comment"}),e.jsx("textarea",{id:"comment",name:"comment",className:"h-20 input border border-gray-300 rounded-md p-2",rows:5,value:m.comment,onChange:b=>j({...m,comment:b.target.value})})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",children:"Assign"}),e.jsx("button",{type:"button",onClick:o,className:"btn btn-light",children:"Cancel"})]})]})]})]}):null},Je=B().shape({option:T().required("Please select option")}),Ve=({orderId:r,workshopModalOpen:a,onClose:o,setAssigned:x,orderStatus:s})=>{const{workshops:d}=Re(1,1e3),{branches:y}=Oe(1,1e3),{assignWorkshop:N}=Me(),{assignBranch:h}=We(),[p,f]=l.useState(),[m,j]=l.useState("");l.useEffect(()=>{a||(f(null),j(""))},[a,r]);const _=async g=>{g.preventDefault();try{await Je.validate({option:p},{abortEarly:!1}),s==="Assign Workshop"?await N(r,p):await h(r,p),o(),x(!0)}catch(C){C instanceof D&&j(C.errors[0])}};return a?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:o}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:o,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:s==="Assign Workshop"?"Assign Workshop":"Assign Branch"}),e.jsxs("form",{onSubmit:_,children:[s==="Assign Workshop"?e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"workshop_id",children:"Workshop"}),e.jsxs("select",{id:"workshop_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:p??"",onChange:g=>f(Number(g.target.value)),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Select Workshop"}),(d==null?void 0:d.length)>0?d.map(g=>e.jsx("option",{value:g.workshop_id,children:g.workshop_name},g.workshop_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:m||" "})]}):e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"branch_id",children:"Branch"}),e.jsxs("select",{id:"branch_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:p??"",onChange:g=>f(Number(g.target.value)),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Select Branch"}),(y==null?void 0:y.length)>0?y.map(g=>e.jsx("option",{value:g.branch_id,children:g.branch_name},g.branch_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:m||" "})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",children:"Assign"}),e.jsx("button",{type:"button",onClick:o,className:"btn btn-light",children:"Cancel"})]})]})]})]}):!1},Ze=B().shape({text_note:F().required("Please enter text to add note")}),Ke=({onClose:r,orderCancelModalOpen:a,orderId:o,setRefetch:x})=>{const{cancelOrder:s,loading:t}=Pe(),[i,d]=l.useState(""),y=JSON.parse(localStorage.getItem("user")),N=y==null?void 0:y.user_id,[h,p]=l.useState({user_id:N,order_id:o,text_note:""});l.useEffect(()=>{a?p({user_id:N,order_id:o,text_note:""}):(p({user_id:null,order_id:null,text_note:""}),d(""))},[a]);const f=async m=>{m.preventDefault();try{await Ze.validate(h,{abortEarly:!1}),await s(h)&&(d(""),r(),x(!0))}catch(j){j instanceof D?d(j.errors[0]):u.error("Failed to Cancel Order")}};if(a)return e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-5",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:r}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[450px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:r,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsxs("h1",{className:"text-xl font-semibold text-gray-900",children:["Cancel Order #",o]}),e.jsxs("div",{className:"mt-2 p-3",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-700 mb-4",children:"Reason for Cancellation"}),e.jsxs("div",{children:[e.jsx("textarea",{className:"h-20 input border border-gray-300 rounded-md p-2",rows:5,placeholder:"Write a text note...",value:h.text_note||"",onChange:m=>p({...h,text_note:m.target.value})}),e.jsx("p",{className:"text-red-500 text-sm",children:i||" "})]})]}),e.jsx("button",{type:"submit",className:`btn btn-primary ${t?"opacity-50 cursor-not-allowed":""}`,onClick:f,disabled:t,children:t?"Cancelling.":"Submit"}),e.jsx("button",{type:"button",className:"btn btn-light ml-2",onClick:r,children:"Cancel"})]})]})};function Qe(r){return G({attr:{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M12 1.5c-1.921 0-3.816.111-5.68.327-1.497.174-2.57 1.46-2.57 2.93V21.75a.75.75 0 0 0 1.029.696l3.471-1.388 3.472 1.388a.75.75 0 0 0 .556 0l3.472-1.388 3.471 1.388a.75.75 0 0 0 1.029-.696V4.757c0-1.47-1.073-2.756-2.57-2.93A49.255 49.255 0 0 0 12 1.5Zm-.97 6.53a.75.75 0 1 0-1.06-1.06L7.72 9.22a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-.97-.97h3.065a1.875 1.875 0 0 1 0 3.75H12a.75.75 0 0 0 0 1.5h1.125a3.375 3.375 0 1 0 0-6.75h-3.064l.97-.97Z",clipRule:"evenodd"},child:[]}]})(r)}const Xe=B().shape({refund_descriptions:F().required("Please enter text to add description"),refund_amount:T().required("Refund amount is required").typeError("Refund amount must be a number").min(0,"Paid amount must be a positive number"),refund_status:T().required("Please choose refund status").test("required","Please choose refund status",r=>!!r)}),es=({orderRefundModalOpen:r,onClose:a,orderId:o,TotalAmount:x,PaidAmount:s,setRefetch:t})=>{const{refundOrder:i,loading:d}=Ee(),[y,N]=l.useState({}),[h,p]=l.useState({order_id:o,refund_amount:null,refund_status:null,refund_descriptions:""});l.useEffect(()=>{r?p({order_id:o,refund_amount:null,refund_status:null,refund_descriptions:""}):(p({order_id:o,refund_amount:null,refund_status:null,refund_descriptions:""}),N({}))},[r]);const f=async m=>{m.preventDefault();try{await Xe.validate(h,{abortEarly:!1});const j={...h,refund_amount:Number(h.refund_amount)};await i(j)&&(a(),t(!0))}catch(j){if(j instanceof D){const _={};j.inner.forEach(g=>{_[g.path||""]=g.message}),N(_)}else u.error("Failed to submit the form. Please try again.")}};if(r)return e.jsxs("div",{className:"fixed inset-0 grid overflow-auto items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:a}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg min-w-[400px] smobile:min-w-[85%] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:a,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsxs("h1",{className:"text-xl font-semibold text-gray-900 mb-4",children:["Refund Order #",o]}),e.jsxs("div",{className:"flex flex-col p-2",children:[e.jsxs("span",{className:"text-gray-700 text-sm font-medium py-1",children:["Total Amount : ₹",x]}),e.jsxs("span",{className:"text-gray-700 text-sm font-medium py-1",children:["Paid Amount : ₹",s]})]}),e.jsxs("div",{className:"p-2",children:[e.jsxs("div",{className:"flex flex-col mb-2",children:[e.jsx("label",{htmlFor:"refund_amount",className:"block text-gray-700 text-sm font-bold mb-2",children:"Refund Amount"}),e.jsx("input",{type:"text",id:"refund_amount",min:"0",value:h.refund_amount||"",onChange:m=>p({...h,refund_amount:m.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:y.refund_amount||" "})]}),e.jsxs("div",{className:"flex flex-col mb-2",children:[e.jsx("label",{className:"block text-gray-700 text-base font-bold mb-2",htmlFor:"refund_descriptions",children:"Reason of Refund (Refund Note)"}),e.jsx("textarea",{id:"refund_descriptions",name:"refund_descriptions",value:h.refund_descriptions,onChange:m=>p({...h,refund_descriptions:m.target.value}),className:"h-20 input border border-gray-300 rounded-md p-2",rows:5}),e.jsx("p",{className:"text-red-500 text-sm",children:y.refund_descriptions||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 text-base font-bold mb-2",htmlFor:"refund_status",children:"Refund Status"}),e.jsxs("select",{id:"refund_status",className:"select select-lg w-[170px] text-sm",value:h.refund_status||"",onChange:m=>p({...h,refund_status:Number(m.target.value)}),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Select Refund Status"}),e.jsx("option",{value:1,children:"Full"}),e.jsx("option",{value:2,children:"Partial"})]}),e.jsx("p",{className:"w-full text-red-500 text-sm",children:y.refund_status||" "})]})]}),e.jsx("button",{type:"submit",className:`btn btn-primary ${d?"opacity-50 cursor-not-allowed":""}`,onClick:f,disabled:d,children:d?"Submitting...":"Submit"}),e.jsx("button",{type:"button",className:"btn btn-light ml-2",onClick:a,children:"Cancel"})]})]})},ss=B().shape({text_note:F().required("Please enter text to add note")}),ps=()=>{var W;const{id:r}=fe(),a=Number(r),o=JSON.parse(localStorage.getItem("user")),x=o==null?void 0:o.user_id,{order:s,fetchOrder:t}=ke(),{addNote:i,loading:d}=Te(),{deleteNote:y}=$e(),{updateOrderStatus:N}=ze(),{generateInvoice:h,loading:p}=Ce(),[f,m]=l.useState({user_id:null,order_id:null,text_note:"",images:[]}),[j,_]=l.useState(!1),[g,C]=l.useState(!1),[$,P]=l.useState(!1),[b,w]=l.useState(!1),[H,I]=l.useState(!1),[Y,z]=l.useState(""),[ts,J]=l.useState(!1),[V,E]=l.useState(!1),Z=ge(),K=be(),M=l.useRef(null);l.useEffect(()=>{t(a),I(!1),E(!1)},[H,V]),l.useEffect(()=>{s&&m(n=>({...n,user_id:s.user_id,order_id:s.order_id}))},[s]);const Q=n=>{const c=n.target;if(c instanceof HTMLInputElement){const{name:S,value:v,files:A}=c;S==="images"&&A&&A.length>0?m(L=>({...L,images:[...L.images,...Array.from(A)]})):m(L=>({...L,[S]:v}))}},X=async n=>{try{const{isConfirmed:c}=await O.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(c){const{success:S,message:v}=await y(n);S?(await t(a),O.fire(v)):O.fire(v)}}catch(c){O.fire({title:"Error",text:c.message,icon:"error"})}},ee=()=>{var n;(n=M.current)==null||n.click()},se=n=>{m(c=>({...c,images:c.images.filter((S,v)=>v!==n)}))},te=async n=>{n.preventDefault();try{await ss.validate(f,{abortEarly:!1});const c=new FormData;c.append("user_id",x),c.append("order_id",f.order_id),c.append("text_note",f.text_note),f.images&&f.images.length>0&&f.images.forEach(v=>{c.append("images",v)}),await i(c)&&(m({user_id:null,order_id:null,text_note:"",images:[]}),z(""),await t(f.order_id))}catch(c){c instanceof D?z(c.errors[0]):u.error("Failed to add note")}},ae=async()=>{try{const{isConfirmed:n}=await O.fire({title:"Are you sure?",text:"Want to change order status!",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes",cancelButtonText:"No"});return n}catch(n){return O.fire({title:"Error",text:n.message,icon:"error"}),!1}},ne=async n=>{await N(a,n)&&await t(a)},k=async n=>{await ae()&&await ne(n)},re=async()=>{switch(s==null?void 0:s.order_status_details.next_step){case"Assign Pickup Boy":case"Assign Delivery boy":_(!0);break;case"Received by pickup boy":await k(3);break;case"Order Received at Workshop":await k(6);break;case"Workshop Marks Order In Progress":await k(7);break;case"Work Completed by Workshop":await k(8);break;case"Mark as Received at Branch":await k(9);break;case"Items Received at Branch":case"Pickup Complete":await k(4);break;case"Ready For Delivery":await k(10);break;case"Delivered":await k(11);break;case"Assign Workshop":case"Assign Branch":C(!0);break;case"Branch Received Items":await k(8),J(!1);break}},ie=async()=>{await re()},le=()=>{K(`/order/edit/${a}`,{state:{prevUrl:Z.pathname}})},ce=()=>{P(!0)},oe=()=>{w(!0)},de=async()=>{var n;if((s==null?void 0:s.order_invoice)!==""){const c=(n=s==null?void 0:s.order_invoice)==null?void 0:n.fileUrl;window.open(c,"_blank")}else await h(a),E(!0)};if(!s)return null;const me=q(s.order_status_details.admin_label),ue=q(s.order_status_details.next_step),xe=_e[s.payment_status],he=()=>{var c;const n=(c=s==null?void 0:s.order_label)==null?void 0:c.fileUrl;window.open(n,"_blank")},pe=()=>{var c;const n=(c=s==null?void 0:s.refund_receipt_url)==null?void 0:c.fileUrl;window.open(n,"_blank")};return e.jsxs("div",{className:"container mx-auto p-6",children:[e.jsx("div",{className:"card rounded-xl",children:e.jsxs("div",{className:"flex flex-col gap-4 p-5 rounded-md shadow-md",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[e.jsxs("h1",{className:"text-xl font-semibold text-gray-900",children:["Order Details - #",a]}),e.jsxs("div",{className:"flex gap-2 mobile:flex-wrap",children:[(s==null?void 0:s.order_status)===11&&e.jsxs("button",{className:"flex items-center btn-light sm:btn smmobile:btn-sm smmobile:btn",onClick:de,disabled:p,children:[e.jsx(je,{size:20,color:"gray"}),p?e.jsxs(e.Fragment,{children:["View Invoice ",e.jsx(Be,{})]}):"View Invoice"]}),e.jsxs("button",{className:"flex items-center font-medium sm:btn btn-primary smmobile:btn-sm smmobile:btn",onClick:le,children:[e.jsx("i",{className:"ki-filled ki-pencil mr-2"}),"Edit Order"]}),(s==null?void 0:s.order_status)<8&&(s==null?void 0:s.refund_status)!==1&&e.jsxs("button",{className:"flex items-center font-semibold btn-danger sm:btn smmobile:btn-sm smmobile:btn",onClick:ce,children:[e.jsx(ye,{size:20}),"Cancel Order"]}),s.payment_status!==1&&s.refund_status===3&&e.jsxs("button",{className:"flex items-center sm:btn smmobile:btn-sm smmobile:btn font-semibold btn-success",onClick:oe,children:[e.jsx(Qe,{size:20}),"Refund Order"]})]})]}),s.refund_status===3?e.jsxs("div",{className:"flex border border-gray-200 rounded-xl bg-gray-50 items-center justify-between bg-gray-00 p-4 shadow-sm mobile:flex mobile:flex-col gap-5",children:[e.jsxs("div",{className:"flex items-center mobile:flex-col desktop:flex-col gap-2",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Current Status:"}),e.jsx("span",{className:`${me} badge-outline badge-xl rounded-[30px]`,children:s.order_status_details.admin_label})]}),e.jsx("div",{className:"flex-1 px-6",children:e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:s.order_status_details.description})}),s.order_status_details.next_step!==null&&e.jsxs("div",{className:"flex items-center mobile:flex-col desktop:flex-col gap-2",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Next Step:"}),e.jsx("button",{className:`${ue} badge-outline badge-xl rounded-[30px]`,onClick:ie,children:s.order_status_details.next_step})]})]}):e.jsxs("div",{className:"flex items-center bg-white p-4 rounded-md shadow-sm",children:[e.jsx("div",{children:e.jsx("span",{className:"badge text-sm font-medium text-gray-700",children:"Order Refunded"})}),e.jsxs("div",{className:"flex-1 px-10",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Reason of Refund :"}),e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:s.refund_descriptions})]}),e.jsxs("div",{className:"flex flex-col mr-4 gap-2",children:[e.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["Refund Amount :"," "]}),e.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["₹",s.refund_amount]})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Refund Status :"}),e.jsxs("span",{className:`${s.refund_status===1?"badge badge-primary":"badge badge-warning"} badge-outline badge-sm`,children:[ve[s.refund_status]," "]})]}),e.jsxs("button",{className:"btn btn-secondary btn-lg flex gap-2 ml-3 text-gray-700 text-sm font-semibold",onClick:pe,children:[e.jsx(U,{size:20,color:"gray"})," Refund ",e.jsx("br",{}),"Receipt"]})]})]})}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"card p-2",children:[e.jsxs("div",{className:"card-header border-none p-2 mb-2 ml-2",children:[e.jsx("div",{className:"card-title align-items-start flex-column",children:e.jsxs("div",{children:[e.jsx("h3",{className:"card-title text-lg",children:"Order Items"}),e.jsxs("span",{className:"text-gray-500 text-sm font-bold rounded-lg flex",children:["Total Items: ",s.items.length]})]})}),e.jsx("div",{className:"flex flex-end",children:e.jsxs("button",{className:"flex items-center btn-light sm:btn smmobile:btn-sm smmobile:btn",onClick:he,children:[e.jsx(U,{size:20,color:"gray"})," ",e.jsx("p",{className:"text-gray-700",children:"Print Label"})]})})]}),e.jsx("div",{className:"flex flex-wrap",children:e.jsx("div",{className:"card-body p-0 ml-4",children:e.jsx("div",{className:"scrollable-y-hover pe-4 pb-4 max-h-[400px] mb-4",children:e.jsx("div",{className:"space-y-4",children:s.items.map(n=>e.jsxs("div",{className:"border border-gray-200 rounded-xl gap-2 px-4 py-4 bg-gray-50",children:[e.jsxs("div",{className:"flex items-center flex-wrap gap-x-10 gap-y-2 justify-between xmobile:flex-col",children:[e.jsxs("div",{className:"flex items-center gap-3.5 xmobile:flex-col",children:[e.jsx("img",{alt:n.product.name,className:"w-16 h-16 shrink-0 object-cover rounded",src:n.product.image}),e.jsxs("div",{className:"flex flex-col ",children:[e.jsxs("span",{className:"text-sm font-semibold text-gray-900 mb-px xmobile:ml-8",children:[n.product.name," (",n.quantity,")"]}),e.jsxs("span",{className:"text-2sm font-medium text-gray-600",children:["Category: ",n.category.name]})]})]}),e.jsx("div",{className:"flex items-center gap-5",children:e.jsxs("div",{className:"badge badge-sm flex gap-1 badge-success badge-outline text-xs",children:[e.jsx("span",{className:"mobile:hidden",children:"Service : "}),e.jsx("span",{children:n.service.name})]})})]}),n.description&&e.jsx("div",{className:"mt-2 p-3 bg-gray-100 rounded-md",children:e.jsxs("p",{className:"text-sm text-gray-600",children:[e.jsx("span",{className:"text-sm font-medium text-gray-600",children:"Description :"})," ",n.description]})})]},n.item_id))})})})})]}),e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Order Summary"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Sub Total:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.sub_total]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Shipping Charges:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.shipping_charges]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Express Delivery Charges:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.express_delivery_charges]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Kasar Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.kasar_amount]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Coupon Code:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.coupon_code})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Coupon Discount"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.coupon_discount]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.total]})]})]})})})]})}),e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Estimated Delivery & Pickup"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{className:"flex flex-col gap-2",children:[e.jsxs("tr",{className:"",children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pe-9",children:"Estimated Pickup Time:"}),e.jsx("td",{className:"text-sm font-medium text-gray-700",children:new Date(s.estimated_pickup_time).toLocaleDateString()})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pe-6",children:"Estimated Delivery Time:"}),e.jsx("td",{className:"text-sm font-medium text-gray-700",children:new Date(s.estimated_delivery_time).toLocaleDateString()})]})]})})})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card min-w-full",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Customer Information"})}),e.jsx("div",{className:"card-body pt-4 pb-2",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Name:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:[s.user.first_name," ",s.user.last_name]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Email:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.user.email})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Mobile Number:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.user.mobile_number})]})]})})})})]})}),s.branch&&e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Branch Information"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.branch.branch_name})]})})})}),s.pickup_boy&&e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Pickup Boy Information"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.pickup_boy.pickup_boy_name}),s.pickup_comment&&e.jsx("div",{className:"mt-2 p-3 bg-gray-100 rounded-md",children:e.jsx("p",{className:"text-sm text-gray-600",children:s.pickup_comment})})]})})})}),e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Shipping Address"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.address_details!=="null"&&s.address_details.trim()!==""?s.address_details:"Address not provided."})]})})})}),e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card min-w-full",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Payment Information"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Payment Type:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:we[s.payment_type]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Payment Status:"}),e.jsx("td",{className:`badge-outline ${De(s.payment_status)}`,children:xe})]}),(s==null?void 0:s.pending_due_amount)&&e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Pending amount:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.pending_due_amount})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Transaction ID:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.transaction_id||"N/A"})]})]})})})})]})})]})]}),e.jsxs("div",{className:"mt-6 card rounded-xl p-6 shadow",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-700 mb-4",children:"Order Notes"}),e.jsxs("div",{children:[e.jsxs("div",{className:"relative border border-gray-300 rounded-md p-2",children:[e.jsx("textarea",{className:"w-full h-16 p-3 border-none focus:outline-none focus:ring-0",placeholder:"Add a new note...",value:f.text_note||"",onChange:n=>m({...f,text_note:n.target.value}),rows:5}),e.jsxs("div",{className:"flex items-center mt-2",children:[e.jsx("button",{className:"text-gray-600 hover:text-gray-700 hover:bg-gray-200 rounded-full p-1 transition-all ease-in-out duration-200",title:"Attach image",onClick:ee,children:e.jsx(Ne,{size:23})}),e.jsx("input",{type:"file",ref:M,style:{display:"none"},multiple:!0,onChange:Q,name:"images"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:Y||" "})]}),e.jsx("div",{children:f.images.map((n,c)=>e.jsxs("div",{className:"relative inline-block mr-2 mb-2 group",children:[e.jsx("img",{src:URL.createObjectURL(n),alt:`Preview ${c}`,className:"w-32 h-32 object-cover rounded-md border"}),e.jsx("button",{className:"absolute top-0 right-0 rounded-full p-1 shadow-md text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200",onClick:()=>se(c),children:e.jsx(Ue,{size:20})})]},c))}),e.jsx("div",{className:"flex relative justify-start pt-2.5",children:e.jsx("button",{className:`px-4 py-2 btn btn-primary 
          ${d?"opacity-50 cursor-not-allowed":""}`,onClick:te,disabled:d,children:d?"Adding...":"Add Note"})}),e.jsx("ul",{className:"mt-4 space-y-4",children:(W=s.notes)==null?void 0:W.map((n,c)=>{const S=Se(n.created_at).format("HH:mm, DD/MM/YYYY");return e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsxs("span",{className:"block text-sm text-gray-600",children:["• ",n.user.first_name," ",n.user.last_name]}),e.jsx("span",{className:"text-xs text-gray-500",children:S})]}),e.jsxs("li",{className:"p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-200 relative",children:[e.jsx("p",{className:"text-gray-800 mb-2",children:n.text_note}),n.images&&n.images.length>0&&e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-3",children:n.images.map((v,A)=>e.jsx("img",{src:v,className:"w-full h-auto rounded-md border shadow-sm",alt:`Note Attachment ${A+1}`},A))}),e.jsx("div",{className:"menu absolute top-1 right-2","data-menu":"true",children:e.jsxs("div",{className:"menu-item","data-menu-item-offset":"0, 10px","data-menu-item-placement":"bottom-end","data-menu-item-toggle":"dropdown","data-menu-item-trigger":"click|lg:click",children:[e.jsx("button",{className:"menu-toggle btn btn-sm btn-icon btn-light btn-clear",children:e.jsx("i",{className:"ki-filled ki-dots-vertical"})}),e.jsx("div",{className:"menu-dropdown menu-default w-full max-w-[175px]","data-menu-dismiss":"true",children:e.jsx("div",{className:"menu-item",children:e.jsxs("button",{className:"menu-link",onClick:()=>X(n.note_id),children:[e.jsx("span",{className:"menu-icon",children:e.jsx("i",{className:"ki-filled ki-trash"})}),e.jsx("span",{className:"menu-title",children:"Remove"})]})})})]})})]})]},c)})})]}),e.jsx(Ye,{orderStatus:(s==null?void 0:s.order_status_details.next_step)==="Assign Pickup Boy"||(s==null?void 0:s.order_status_details.next_step)==="Assign Delivery boy"?s==null?void 0:s.order_status_details.next_step:void 0,modelOpen:j,onClose:()=>_(!1),orderId:a,setAssigned:I}),e.jsx(Ve,{orderStatus:(s==null?void 0:s.order_status_details.next_step)==="Assign Branch"||(s==null?void 0:s.order_status_details.next_step)==="Assign Workshop"?s==null?void 0:s.order_status_details.next_step:void 0,orderId:a,workshopModalOpen:g,onClose:()=>C(!1),setAssigned:I}),e.jsx(Ke,{orderId:s==null?void 0:s.order_id,orderCancelModalOpen:$,onClose:()=>P(!1),setRefetch:E}),e.jsx(es,{orderId:s==null?void 0:s.order_id,TotalAmount:s==null?void 0:s.total,PaidAmount:s==null?void 0:s.paid_amount,orderRefundModalOpen:b,onClose:()=>w(!1),setRefetch:E})]})};export{ps as default};
