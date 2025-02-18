import{r as l,aW as B,_ as u,aY as ue,c as D,aK as $,j as e,V as E,a as M,aL as xe,aZ as he,g as pe,a_ as fe,a$ as ge,b0 as be,h as je}from"./index-o3iPDp2a.js";import{P as ye,c as Ne,b as _e}from"./enums-2F1Uvolu.js";import{u as ve}from"./useGetOrder-C_iqdHEs.js";import{u as we,L as ke}from"./Loading-BXbEWr2e.js";import{S as O}from"./sweetalert2.esm.all-DwEdJQJv.js";import{u as Se}from"./useGetUsersByRole-DYhgvvTq.js";import{u as Ce}from"./useGetBranches-DXp9CoBw.js";import{u as Ae}from"./useGetWorkshops-BQGJCVJ7.js";import{g as G}from"./orderStatusClasses-DgGpuqsn.js";import{g as Oe}from"./paymentStatusClasses-BddHAg9R.js";const Be=()=>{const[i,a]=l.useState(!1),s=localStorage.getItem("authToken");return{cancelOrder:async c=>{a(!0);try{const t=await fetch(`${B}/orders/cancel`,{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-type":"application/json"},body:JSON.stringify(c)}),n=await t.json();return t.ok?(u.success(n.message,{position:"top-center"}),!0):(u.error(n.message,{position:"top-center"}),!1)}catch(t){u.error((t==null?void 0:t.message)||"Error in cancelling order",{position:"top-center"})}finally{a(!1)}},loading:i}},De=()=>{const[i,a]=l.useState(!1),s=localStorage.getItem("authToken");return{refundOrder:async c=>{a(!0);try{const t=await fetch(`${B}/refund`,{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-type":"application/json"},body:JSON.stringify(c)}),n=await t.json();return t.ok?(u.success(n.message,{position:"top-center"}),!0):(u.error(n.message,{position:"top-center"}),!1)}catch(t){u.error((t==null?void 0:t.message)||"Network Error : Fail to refund order",{position:"top-center"})}finally{a(!1)}},loading:i}},Ee="http://3.110.208.70:3000/notes",Re=()=>{const[i,a]=l.useState(!1);return{addNote:async d=>{const c=localStorage.getItem("authToken");a(!0);try{const t=await fetch(Ee,{method:"POST",headers:{Authorization:`Bearer ${c}`},body:d}),n=await t.json();return t.ok?(u.success(n.message,{position:"top-center"}),!0):(u.error(n.message,{position:"top-center"}),!1)}catch(t){return u.error((t==null?void 0:t.message)||"Error adding note",{position:"top-center"}),!1}finally{a(!1)}},loading:i}},Pe=()=>{const[i,a]=l.useState(!1);return{deleteNote:async d=>{const c=localStorage.getItem("authToken"),t=`http://3.110.208.70:3000/notes/${d}`;a(!0);try{const n=await fetch(t,{method:"DELETE",headers:{Authorization:`Bearer ${c}`}}),m=await n.json();return n.ok?{success:!0,message:m.message}:(u.error(m.message,{position:"top-center"}),{success:!1,message:m.message})}catch(n){return{success:!1,message:n.message}}finally{a(!1)}},loading:i}},Te="http://3.110.208.70:3000/admin/orders/assign-pickup",$e=()=>{const[i,a]=l.useState(!1);return{assignPickupBoy:async d=>{const c=localStorage.getItem("authToken");a(!0);try{const t=await fetch(Te,{method:"PATCH",headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify(d)}),n=await t.json();return t.ok?(u.success(n.message,{position:"top-center"}),!0):(u.error(n.message,{position:"top-center"}),!1)}catch(t){return u.error((t==null?void 0:t.message)||"Error assignning pickupboy",{position:"top-center"}),!1}finally{a(!1)}},loading:i}},Le=()=>{const[i,a]=l.useState(!1);return{updateOrderStatus:async(d,c)=>{const t=localStorage.getItem("authToken");a(!0);try{const n=await fetch(`${B}/admin/orders/${d}/update-status`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_status:c})}),m=await n.json();return n.ok?(u.success(m.message,{position:"top-center"}),!0):(u.error(m.message,{position:"top-center"}),!1)}catch{return u.error("Failed to update order status"),!1}finally{a(!1)}},loading:i}},Ie=()=>{const[i,a]=l.useState(!1);return{assignWorkshop:async(d,c)=>{const t=localStorage.getItem("authToken");a(!0);try{const n=await fetch(`${B}/admin/orders/assign-workshop`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_id:d,workshop_id:c})}),m=await n.json();return n.ok?(u.success(m.message,{position:"top-center"}),!0):(u.error(m.message,{position:"top-center"}),!1)}catch{return u.error("Failed to assign workshop"),!1}finally{a(!1)}},loading:i}},Fe=()=>{const[i,a]=l.useState(!1);return{assignBranch:async(d,c)=>{const t=localStorage.getItem("authToken");a(!0);try{const n=await fetch(`${B}/admin/orders/assign-branch`,{method:"PATCH",headers:{Authorization:t?`Bearer ${t}`:"","Content-Type":"application/json"},body:JSON.stringify({order_id:d,branch_id:c})}),m=await n.json();return n.ok?(u.success(m.message,{position:"top-center"}),!0):(u.error(m.message,{position:"top-center"}),!1)}catch{return u.error("Failed to assign branch"),!1}finally{a(!1)}},loading:i}};function Me(i){return ue({tag:"svg",attr:{viewBox:"0 0 15 15",fill:"none"},child:[{tag:"path",attr:{fillRule:"evenodd",clipRule:"evenodd",d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:"currentColor"},child:[]}]})(i)}const We="http://3.110.208.70:3000/admin/orders/assign-delivery",ze=()=>{const[i,a]=l.useState(!1);return{assignDeliveryBoy:async d=>{const c=localStorage.getItem("authToken");a(!0);try{const t=await fetch(We,{method:"PATCH",headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify(d)}),n=await t.json();return t.ok?(u.success(n.message,{position:"top-center"}),!0):(u.error(n.message,{position:"top-center"}),!1)}catch(t){return u.error((t==null?void 0:t.message)||"Error assigning delivery boy",{position:"top-center"}),!1}finally{a(!1)}},loading:i}},Ue=D().shape({pickup_boy_id:$().required("Please enter name to assign")}),Ye=({orderId:i,modelOpen:a,onClose:s,setAssigned:d,orderStatus:c})=>{const{assignPickupBoy:t}=$e(),{assignDeliveryBoy:n}=ze(),{users:m,fetchUsersByRole:j}=Se(),[b,o]=l.useState(""),[p,y]=l.useState(!0),[x,N]=l.useState({order_id:i,pickup_boy_id:null,comment:""}),[v,f]=l.useState("");l.useEffect(()=>{(async()=>{await j(4,b)})()},[b,p]);const C=g=>{o(g.target.value),y(!0),g.target.value===""&&N({...x,pickup_boy_id:null})},L=g=>{const w=`${g.first_name} ${g.last_name}`;o(w),y(!1),N({...x,pickup_boy_id:g.user_id})};l.useEffect(()=>{a||(o(""),N({order_id:i,pickup_boy_id:null,comment:""}),f(""))},[a,i]);const R=async g=>{g.preventDefault();try{if(await Ue.validate(x,{abortEarly:!1}),c==="Assign Delivery boy"){const w={order_id:x.order_id,delivery_boy_id:x.pickup_boy_id};await n(w)}else await t(x);d(!0),s()}catch(w){w instanceof E&&f(w.errors[0])}};return a?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:s}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:s,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:c}),e.jsxs("form",{onSubmit:R,children:[e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{htmlFor:"username",className:"block text-gray-700 text-sm font-bold mb-1",children:"Name"}),e.jsx("input",{type:"text",id:"username",value:b||"",onChange:C,className:"input border border-gray-300 rounded-md p-2 w-full",placeholder:"Search name..."}),m&&b&&p&&e.jsx("ul",{className:"absolute mt-[68px] bg-white z-10 border border-gray-300 rounded-md p-2 w-full text-sm",children:m.length>0?m.map(g=>e.jsxs("li",{className:"p-2 hover:bg-gray-100 cursor-pointer",onClick:()=>L(g),children:[g.first_name," ",g.last_name," (",g.mobile_number,")"]},g.user_id)):e.jsx("li",{className:"p-2 text-gray-500",children:"No users found"})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:v||" "})]}),c==="Assign Pickup Boy"&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-1",htmlFor:"comment",children:"Comment"}),e.jsx("textarea",{id:"comment",name:"comment",className:"h-20 input border border-gray-300 rounded-md p-2",rows:5,value:x.comment,onChange:g=>N({...x,comment:g.target.value})})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",children:"Assign"}),e.jsx("button",{type:"button",onClick:s,className:"btn btn-light",children:"Cancel"})]})]})]})]}):null},qe=D().shape({option:$().required("Please select option")}),Ge=({orderId:i,workshopModalOpen:a,onClose:s,setAssigned:d,orderStatus:c})=>{const{workshops:m}=Ae(1,1e3),{branches:j}=Ce(1,1e3),{assignWorkshop:b}=Ie(),{assignBranch:o}=Fe(),[p,y]=l.useState(),[x,N]=l.useState("");l.useEffect(()=>{a||(y(null),N(""))},[a,i]);const v=async f=>{f.preventDefault();try{await qe.validate({option:p},{abortEarly:!1}),c==="Assign Workshop"?await b(i,p):await o(i,p),s(),d(!0)}catch(C){C instanceof E&&N(C.errors[0])}};return a?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:s}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:s,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:c==="Assign Workshop"?"Assign Workshop":"Assign Branch"}),e.jsxs("form",{onSubmit:v,children:[c==="Assign Workshop"?e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"workshop_id",children:"Workshop"}),e.jsxs("select",{id:"workshop_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:p??"",onChange:f=>y(Number(f.target.value)),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Select Workshop"}),(m==null?void 0:m.length)>0?m.map(f=>e.jsx("option",{value:f.workshop_id,children:f.workshop_name},f.workshop_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:x||" "})]}):e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"branch_id",children:"Branch"}),e.jsxs("select",{id:"branch_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:p??"",onChange:f=>y(Number(f.target.value)),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Select Branch"}),(j==null?void 0:j.length)>0?j.map(f=>e.jsx("option",{value:f.branch_id,children:f.branch_name},f.branch_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:x||" "})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",children:"Assign"}),e.jsx("button",{type:"button",onClick:s,className:"btn btn-light",children:"Cancel"})]})]})]})]}):!1},He=D().shape({text_note:M().required("Please enter text to add note")}),Je=({onClose:i,orderCancelModalOpen:a,orderId:s,userId:d,setRefetch:c})=>{const{cancelOrder:t,loading:n}=Be(),[m,j]=l.useState(""),[b,o]=l.useState({user_id:d,order_id:s,text_note:""});l.useEffect(()=>{a?o({user_id:d,order_id:s,text_note:""}):(o({user_id:null,order_id:null,text_note:""}),j(""))},[a]);const p=async y=>{y.preventDefault();try{await He.validate(b,{abortEarly:!1}),await t(b)&&(j(""),i(),c(!0))}catch(x){x instanceof E?j(x.errors[0]):u.error("Failed to Cancel Order")}};if(a)return e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:i}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[600px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:i,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsxs("h1",{className:"text-xl font-semibold text-gray-900",children:["Cancel Order #",s]}),e.jsxs("div",{className:"mt-2 p-3",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-700 mb-4",children:"Reason for Cancellation"}),e.jsxs("div",{children:[e.jsx("textarea",{className:"h-20 input border border-gray-300 rounded-md p-2",rows:5,placeholder:"Write a text note...",value:b.text_note||"",onChange:y=>o({...b,text_note:y.target.value})}),e.jsx("p",{className:"text-red-500 text-sm",children:m||" "})]})]}),e.jsx("button",{type:"submit",className:`btn btn-primary ${n?"opacity-50 cursor-not-allowed":""}`,onClick:p,disabled:n,children:n?"Cancelling.":"Submit"}),e.jsx("button",{type:"button",className:"btn btn-light ml-2",onClick:i,children:"Cancel"})]})]})},Ve=D().shape({refund_descriptions:M().required("Please enter text to add description"),refund_amount:$().required("Refund amount is required").typeError("Refund amount must be a number").min(0,"Paid amount must be a positive number"),refund_status:$().required("Please choose refund status").test("required","Please choose refund status",i=>!!i)}),Ke=({orderRefundModalOpen:i,onClose:a,orderId:s,TotalAmount:d,PaidAmount:c,setRefetch:t})=>{const{refundOrder:n,loading:m}=De(),[j,b]=l.useState({}),[o,p]=l.useState({order_id:s,refund_amount:null,refund_status:null,refund_descriptions:""});l.useEffect(()=>{i?p({order_id:s,refund_amount:null,refund_status:null,refund_descriptions:""}):(p({order_id:s,refund_amount:null,refund_status:null,refund_descriptions:""}),b({}))},[i]);const y=async x=>{x.preventDefault();try{await Ve.validate(o,{abortEarly:!1});const N={...o,refund_amount:Number(o.refund_amount)};await n(N)&&(a(),t(!0))}catch(N){if(N instanceof E){const v={};N.inner.forEach(f=>{v[f.path||""]=f.message}),b(v)}else u.error("Failed to submit the form. Please try again.")}};if(i)return e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:a}),e.jsxs("div",{className:"bg-white p-5 rounded-lg shadow-lg w-[500px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:a,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsxs("h1",{className:"text-xl font-semibold text-gray-900 mb-4",children:["Refund Order #",s]}),e.jsxs("div",{className:"flex flex-col p-2",children:[e.jsxs("span",{className:"text-gray-700 text-sm font-medium py-1",children:["Total Amount : ₹",d]}),e.jsxs("span",{className:"text-gray-700 text-sm font-medium py-1",children:["Paid Amount :  ₹",c]})]}),e.jsxs("div",{className:"p-2",children:[e.jsxs("div",{className:"flex flex-col mb-2",children:[e.jsx("label",{htmlFor:"refund_amount",className:"block text-gray-700 text-sm font-bold mb-2",children:"Refund Amount"}),e.jsx("input",{type:"text",id:"refund_amount",min:"0",value:o.refund_amount||"",onChange:x=>p({...o,refund_amount:x.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:j.refund_amount||" "})]}),e.jsxs("div",{className:"flex flex-col mb-2",children:[e.jsx("label",{className:"block text-gray-700 text-base font-bold mb-2",htmlFor:"refund_descriptions",children:"Reason of Refund (Refund Note)"}),e.jsx("textarea",{id:"refund_descriptions",name:"refund_descriptions",value:o.refund_descriptions,onChange:x=>p({...o,refund_descriptions:x.target.value}),className:"h-20 input border border-gray-300 rounded-md p-2",rows:5}),e.jsx("p",{className:"text-red-500 text-sm",children:j.refund_descriptions||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 text-base font-bold mb-2",htmlFor:"refund_status",children:"Refund Status"}),e.jsxs("select",{id:"refund_status",className:"select select-lg w-[170px] text-sm",value:o.refund_status||"",onChange:x=>p({...o,refund_status:Number(x.target.value)}),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"Select Refund Status"}),e.jsx("option",{value:1,children:"Full"}),e.jsx("option",{value:2,children:"Partial"})]}),e.jsx("p",{className:"w-full text-red-500 text-sm",children:j.refund_status||" "})]})]}),e.jsx("button",{type:"submit",className:`btn btn-primary ${m?"opacity-50 cursor-not-allowed":""}`,onClick:y,disabled:m,children:m?"Submitting...":"Submit"}),e.jsx("button",{type:"button",className:"btn btn-light ml-2",onClick:a,children:"Cancel"})]})]})},Ze=D().shape({text_note:M().required("Please enter text to add note")}),os=()=>{var Y,q;const{id:i}=xe(),a=Number(i),{order:s,fetchOrder:d}=ve(),{addNote:c,loading:t}=Re(),{deleteNote:n}=Pe(),{updateOrderStatus:m}=Le(),{generateInvoice:j,loading:b}=we(),[o,p]=l.useState({user_id:null,order_id:null,text_note:"",images:[]}),[y,x]=l.useState(!1),[N,v]=l.useState(!1),[f,C]=l.useState(!1),[L,R]=l.useState(!1),[g,w]=l.useState(!1),[H,W]=l.useState(""),[Qe,P]=l.useState(!1),[J,I]=l.useState(!1),F=he(),z=pe(),U=l.useRef(null);l.useEffect(()=>{d(a),w(!1),I(!1)},[g,J]),l.useEffect(()=>{s&&p(r=>({...r,user_id:s.user_id,order_id:s.order_id}))},[s]);const V=r=>{const h=r.target;if(h instanceof HTMLInputElement){const{name:S,value:k,files:A}=h;S==="images"&&A&&A.length>0?p(T=>({...T,images:[...T.images,...Array.from(A)]})):p(T=>({...T,[S]:k}))}},K=async r=>{try{const{isConfirmed:h}=await O.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(h){const{success:S,message:k}=await n(r);S?(await d(a),O.fire(k)):O.fire(k)}}catch(h){O.fire({title:"Error",text:h.message,icon:"error"})}},Z=()=>{var r;(r=U.current)==null||r.click()},Q=r=>{p(h=>({...h,images:h.images.filter((S,k)=>k!==r)}))},X=async r=>{r.preventDefault();try{await Ze.validate(o,{abortEarly:!1});const h=new FormData;h.append("user_id",o.user_id),h.append("order_id",o.order_id),h.append("text_note",o.text_note),o.images&&o.images.length>0&&o.images.forEach(k=>{h.append("images",k)}),await c(h)&&(W(""),await d(o.order_id))}catch(h){h instanceof E?W(h.errors[0]):u.error("Failed to add note")}},ee=async()=>{try{const{isConfirmed:r}=await O.fire({title:"Are you sure?",text:"Want to change order status!",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes",cancelButtonText:"No"});return r}catch(r){return O.fire({title:"Error",text:r.message,icon:"error"}),!1}},se=async r=>{await m(a,r)&&await d(a)},_=async r=>{await ee()&&await se(r)},te=async()=>{switch(s==null?void 0:s.order_status_details.next_step){case"Assign Pickup Boy":case"Assign Delivery boy":x(!0);break;case"Received by pickup boy":await _(3);break;case"Order Received at Workshop":await _(6);break;case"Workshop Marks Order In Progress":await _(7);break;case"Work Completed by Workshop":await _(8);break;case"Mark as Received at Branch":await _(9);break;case"Items Received at Branch":case"Pickup Complete":await _(4);break;case"Ready For Delivery":await _(10);break;case"Delivered":await _(11);break;case"Assign Workshop":case"Assign Branch":v(!0);break;case"Branch Received Items":await _(8),P(!1);break}},ae=async()=>{switch(s==null?void 0:s.workshop_status_name){case"Order Received":await _(5),P(!1);break;case"In Progress":await _(6),P(!1);break;case"Completed":await _(7),P(!1),z("/workshop-order");break}},re=async()=>{var r;((r=F==null?void 0:F.state)==null?void 0:r.from)==="OrderTable"?await te():await ae()},ne=()=>{z(`/order/edit/${a}`)},ie=()=>{C(!0)},le=()=>{R(!0)},ce=async()=>{await j(a)};if(!s)return null;const oe=G(s.order_status_details.admin_label),de=G(s.order_status_details.next_step),me=ye[s.payment_status];return e.jsxs("div",{className:"container mx-auto p-6",children:[e.jsxs("div",{className:"flex flex-col bg-gray-100 p-6 rounded-md shadow-md",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsxs("h1",{className:"text-xl font-semibold text-gray-900",children:["Order Details - #",a]}),e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsxs("button",{className:"flex items-center btn btn-light",onClick:ce,disabled:b,children:[e.jsx("i",{className:"ki-filled ki-cheque text-2xl link"}),b?e.jsxs(e.Fragment,{children:["View Invoice ",e.jsx(ke,{})]}):"View Invoice"]}),e.jsxs("button",{className:"flex items-center font-medium btn btn-primary",onClick:ne,children:[e.jsx("i",{className:"ki-filled ki-pencil mr-2"}),"Edit Order"]}),((Y=s==null?void 0:s.order_status_details)==null?void 0:Y.admin_label)!=="Cancelled"&&e.jsxs("button",{className:"flex items-center font-semibold btn btn-danger",onClick:ie,children:[e.jsx(fe,{size:20}),"Cancel Order"]}),s.payment_status===1||s.refund_status===3&&e.jsxs("button",{className:"flex items-center font-semibold btn btn-success",onClick:le,children:[e.jsx(ge,{size:20}),"Refund Order"]})]})]}),s.refund_status===3?e.jsxs("div",{className:"flex items-center justify-between bg-white p-4 rounded-md shadow-sm",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Current Status:"}),e.jsx("span",{className:`${oe} badge-outline badge-xl rounded-[30px] mt-2`,children:s.order_status_details.admin_label})]}),e.jsx("div",{className:"flex-1 px-6",children:e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:s.order_status_details.description})}),s.order_status_details.next_step!==null&&e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Next Step:"}),e.jsx("button",{className:`${de} badge-outline badge-xl rounded-[30px] mt-2`,onClick:re,children:s.order_status_details.next_step})]})]}):e.jsxs("div",{className:"flex items-center bg-white p-4 rounded-md shadow-sm",children:[e.jsx("div",{children:e.jsx("span",{className:"badge text-sm font-medium text-gray-700",children:"Order Refunded"})}),e.jsxs("div",{className:"flex-1 px-10",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Reason of Refund :"}),e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:s.refund_descriptions})]}),e.jsxs("div",{className:"flex flex-col mr-4 gap-2",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Refund Amount : "}),e.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["₹",s.refund_amount]})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Refund Status :"}),e.jsxs("span",{className:`${s.refund_status===1?"badge badge-primary":"badge badge-warning"} badge-outline badge-sm`,children:[Ne[s.refund_status]," "]})]})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-white p-6 rounded-md shadow",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Order Items"}),e.jsxs("span",{className:"text-gray-700 text-sm font-semibold px-3 py-1 rounded-lg ",children:["Total Items: ",s.items.length]})]}),e.jsx("div",{className:"space-y-4",children:s.items.map(r=>e.jsxs("div",{className:"border border-gray-200 rounded-xl gap-2 px-4 py-4 bg-gray-50",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3.5",children:[e.jsx("img",{alt:r.product.name,className:"w-10 shrink-0 object-cover rounded",src:r.product.image}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-sm font-semibold text-gray-900 mb-px",children:r.product.name}),e.jsxs("span",{className:"text-2sm font-medium text-gray-600",children:["Category: ",r.category.name]})]})]}),e.jsx("div",{className:"flex items-center gap-5",children:e.jsxs("span",{className:"badge badge-lg badge-success badge-outline text-xs font-medium mr-2 px-2.5",children:["Service: ",r.service.name]})})]}),r.description&&e.jsx("div",{className:"mt-2 p-3 bg-gray-100 rounded-md",children:e.jsxs("p",{className:"text-sm text-gray-600",children:[e.jsx("span",{className:"text-sm font-medium text-gray-600",children:"Description :"})," ",r.description]})})]},r.item_id))})]}),e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Order Summary"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Sub Total:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.sub_total]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Shipping Charges:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.shipping_charges]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Express Delivery Charges:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.express_delivery_charges]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Kasar Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.kasar_amount]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Coupon Code:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.coupon_code})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Coupon Discount"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.coupon_discount]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.total]})]})]})})})]})}),e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Estimated Delivery & Pickup"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{className:"flex flex-col gap-2",children:[e.jsxs("tr",{className:"",children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pe-9",children:"Estimated Pickup Time:"}),e.jsx("td",{className:"text-sm font-medium text-gray-700",children:new Date(s.estimated_pickup_time).toLocaleDateString()})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pe-6",children:"Estimated Delivery Time:"}),e.jsx("td",{className:"text-sm font-medium text-gray-700",children:new Date(s.estimated_delivery_time).toLocaleDateString()})]})]})})})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Customer Information"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Name:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:[s.user.first_name," ",s.user.last_name]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Email:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.user.email})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Mobile Number:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.user.mobile_number})]})]})})})]})}),s.branch&&e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Branch Information"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.branch.branch_name})]})})})}),s.pickup_boy&&e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Pickup Boy Information"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.pickup_boy.pickup_boy_name}),s.pickup_comment&&e.jsx("div",{className:"mt-2 p-3 bg-gray-100 rounded-md",children:e.jsx("p",{className:"text-sm text-gray-600",children:s.pickup_comment})})]})})})}),e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Shipping Address"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.address_details!=="null"&&s.address_details.trim()!==""?s.address_details:"Address not provided."})]})})})}),e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Payment Information"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Payment Type:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:_e[s.payment_type]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Payment Status:"}),e.jsx("td",{className:`badge-outline ${Oe(s.payment_status)}`,children:me})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Transaction ID:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.transaction_id||"N/A"})]})]})})})]})})]})]}),e.jsxs("div",{className:"mt-6 bg-white p-6 rounded-md shadow",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-700 mb-4",children:"Order Notes"}),e.jsxs("div",{children:[e.jsxs("div",{className:"relative border border-gray-300 rounded-md p-2",children:[e.jsx("textarea",{className:"w-full h-[100px] p-3 border-none focus:outline-none focus:ring-0",placeholder:"Add a new note...",value:o.text_note||"",onChange:r=>p({...o,text_note:r.target.value})}),e.jsxs("div",{className:"flex items-center mt-2",children:[e.jsx("button",{className:"text-gray-600 hover:text-gray-700 hover:bg-gray-200 rounded-full p-1 transition-all ease-in-out duration-200",title:"Attach image",onClick:Z,children:e.jsx(be,{size:23})}),e.jsx("input",{type:"file",ref:U,style:{display:"none"},multiple:!0,onChange:V,name:"images"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:H||" "})]}),e.jsx("div",{children:o.images.map((r,h)=>e.jsxs("div",{className:"relative inline-block mr-2 mb-2 group",children:[e.jsx("img",{src:URL.createObjectURL(r),alt:`Preview ${h}`,className:"w-32 h-32 object-cover rounded-md border"}),e.jsx("button",{className:"absolute top-0 right-0 rounded-full p-1 shadow-md text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200",onClick:()=>Q(h),children:e.jsx(Me,{size:20})})]},h))}),e.jsx("button",{className:`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600
          ${t?"opacity-50 cursor-not-allowed":""}`,onClick:X,disabled:t,children:t?"Adding...":"Add Note"}),e.jsx("ul",{className:"mt-6 space-y-4",children:(q=s.notes)==null?void 0:q.map((r,h)=>{const S=je(r.created_at).format("HH:mm, DD/MM/YYYY");return e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsxs("span",{className:"block text-sm text-gray-600",children:["• ",r.user.first_name," ",r.user.last_name]}),e.jsx("span",{className:"text-xs text-gray-500",children:S})]}),e.jsxs("li",{className:"p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-200 relative",children:[e.jsx("p",{className:"text-gray-800 mb-2",children:r.text_note}),r.images&&r.images.length>0&&e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-3",children:r.images.map((k,A)=>e.jsx("img",{src:k,className:"w-full h-auto rounded-md border shadow-sm",alt:`Note Attachment ${A+1}`},A))}),e.jsx("div",{className:"menu absolute top-1 right-2","data-menu":"true",children:e.jsxs("div",{className:"menu-item","data-menu-item-offset":"0, 10px","data-menu-item-placement":"bottom-end","data-menu-item-toggle":"dropdown","data-menu-item-trigger":"click|lg:click",children:[e.jsx("button",{className:"menu-toggle btn btn-sm btn-icon btn-light btn-clear",children:e.jsx("i",{className:"ki-filled ki-dots-vertical"})}),e.jsx("div",{className:"menu-dropdown menu-default w-full max-w-[175px]","data-menu-dismiss":"true",children:e.jsx("div",{className:"menu-item",children:e.jsxs("button",{className:"menu-link",onClick:()=>K(r.note_id),children:[e.jsx("span",{className:"menu-icon",children:e.jsx("i",{className:"ki-filled ki-trash"})}),e.jsx("span",{className:"menu-title",children:"Remove"})]})})})]})})]})]},h)})})]}),e.jsx(Ye,{orderStatus:(s==null?void 0:s.order_status_details.next_step)==="Assign Pickup Boy"||(s==null?void 0:s.order_status_details.next_step)==="Assign Delivery boy"?s==null?void 0:s.order_status_details.next_step:void 0,modelOpen:y,onClose:()=>x(!1),orderId:a,setAssigned:w}),e.jsx(Ge,{orderStatus:(s==null?void 0:s.order_status_details.next_step)==="Assign Branch"||(s==null?void 0:s.order_status_details.next_step)==="Assign Workshop"?s==null?void 0:s.order_status_details.next_step:void 0,orderId:a,workshopModalOpen:N,onClose:()=>v(!1),setAssigned:w}),e.jsx(Je,{orderId:s==null?void 0:s.order_id,userId:s==null?void 0:s.user_id,orderCancelModalOpen:f,onClose:()=>C(!1),setRefetch:I}),e.jsx(Ke,{orderId:s==null?void 0:s.order_id,TotalAmount:s==null?void 0:s.total,PaidAmount:s==null?void 0:s.paid_amount,orderRefundModalOpen:L,onClose:()=>R(!1),setRefetch:I})]})};export{os as default};
