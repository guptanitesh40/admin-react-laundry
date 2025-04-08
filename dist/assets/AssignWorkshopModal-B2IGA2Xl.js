import{r as n,V as u,B as S,t as W,j as e,a as B,b as A,m as C,q as $}from"./index-BXIzzU16.js";import{u as T}from"./useGetWorkshops-G-Gnx_vQ.js";const R="http://3.110.208.70:3000/admin/orders/assign-pickup",L=()=>{const[i,a]=n.useState(!1);return{assignPickupBoy:async m=>{const l=localStorage.getItem("authToken");a(!0);try{const s=await fetch(R,{method:"PATCH",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify(m)}),r=await s.json();return s.ok?(u.success(r.message,{position:"top-center"}),!0):(u.error(r.message,{position:"top-center"}),!1)}catch(s){return u.error((s==null?void 0:s.message)||"Error assignning pickupboy",{position:"top-center"}),!1}finally{a(!1)}},loading:i}},U=()=>{const[i,a]=n.useState(!1);return{assignWorkshop:async(m,l)=>{const s=localStorage.getItem("authToken");a(!0);try{const r=await fetch(`${S}/admin/orders/assign-workshop`,{method:"PATCH",headers:{Authorization:s?`Bearer ${s}`:"","Content-Type":"application/json"},body:JSON.stringify({order_ids:m,workshop_id:l})}),c=await r.json();return r.ok?(u.success(c.message,{position:"top-center"}),!0):(u.error(c.message,{position:"top-center"}),!1)}catch{return u.error("Failed to assign workshop"),!1}finally{a(!1)}},loading:i}},z=()=>{const[i,a]=n.useState(!1);return{assignBranch:async(m,l)=>{const s=localStorage.getItem("authToken");a(!0);try{const r=await fetch(`${S}/admin/orders/assign-branch`,{method:"PATCH",headers:{Authorization:s?`Bearer ${s}`:"","Content-Type":"application/json"},body:JSON.stringify({order_id:m,branch_id:l})}),c=await r.json();return r.ok?(u.success(c.message,{position:"top-center"}),!0):(u.error(c.message,{position:"top-center"}),!1)}catch{return u.error("Failed to assign branch"),!1}finally{a(!1)}},loading:i}},F="http://3.110.208.70:3000/admin/orders/assign-delivery",O=()=>{const[i,a]=n.useState(!1);return{assignDeliveryBoy:async m=>{const l=localStorage.getItem("authToken");a(!0);try{const s=await fetch(F,{method:"PATCH",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify(m)}),r=await s.json();return s.ok?(u.success(r.message,{position:"top-center"}),!0):(u.error(r.message,{position:"top-center"}),!1)}catch(s){return u.error((s==null?void 0:s.message)||"Error assigning delivery boy",{position:"top-center"}),!1}finally{a(!1)}},loading:i}},M=B().shape({pickup_boy_id:C().required("Please enter name to assign")}),J=({orderId:i,modelOpen:a,onClose:d,setAssigned:m,orderStatus:l})=>{const{assignPickupBoy:s}=L(),{assignDeliveryBoy:r}=O(),{users:c,fetchUsersByRole:x}=W(),[g,j]=n.useState(""),[p,b]=n.useState(!0),[h,y]=n.useState({order_ids:i,pickup_boy_id:null,comment:""}),[N,o]=n.useState(""),k=n.useRef(null),v=n.useRef(null),[_,w]=n.useState(!1);n.useEffect(()=>{(async()=>{_&&(!g||g.trim()==="")?await x(4):g&&p&&await x(4,g)})()},[_,g,p]);const E=t=>{j(t.target.value),b(!0),t.target.value===""&&y({...h,pickup_boy_id:null})},P=t=>{const f=`${t.first_name} ${t.last_name}`;j(f),b(!1),y({...h,pickup_boy_id:t.user_id})};n.useEffect(()=>{const t=f=>{k.current&&!k.current.contains(f.target)&&v.current&&!v.current.contains(f.target)&&(b(!1),w(!1))};return document.addEventListener("mousedown",t),()=>{document.removeEventListener("mousedown",t)}},[]),n.useEffect(()=>{a||(j(""),y({order_ids:i,pickup_boy_id:null,comment:""}),o(""))},[a,i]);const D=async t=>{t.preventDefault();try{if(await M.validate(h,{abortEarly:!1}),l==="Assign Delivery boy"){const f={order_ids:h.order_ids,delivery_boy_id:h.pickup_boy_id};await r(f)}else await s(h);m(!0),d()}catch(f){f instanceof A&&o(f.errors[0])}};return a?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:d}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:d,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:l}),e.jsxs("form",{onSubmit:D,children:[e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{htmlFor:"username",className:"block text-gray-700 text-sm font-bold mb-1",children:"Name"}),e.jsx("input",{type:"text",id:"username",ref:v,autoComplete:"off",value:g||"",onChange:E,className:"input border border-gray-300 rounded-md p-2 w-full",placeholder:"Search name...",onFocus:()=>{w(!0),b(!0)}}),c&&p&&e.jsx("ul",{ref:k,className:"absolute mt-[64px] bg-white z-10 border border-gray-300 rounded-md p-2 w-full text-sm",children:c.length>0?c.map(t=>e.jsxs("li",{className:"p-2 hover:bg-gray-100 cursor-pointer",onClick:()=>P(t),children:[t.first_name," ",t.last_name," (",t.mobile_number,")"]},t.user_id)):e.jsx("li",{className:"p-2 text-gray-500",children:"No users found"})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:N||" "})]}),l==="Assign Pickup Boy"&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-1",htmlFor:"comment",children:"Comment"}),e.jsx("textarea",{id:"comment",name:"comment",className:"h-20 input border border-gray-300 rounded-md p-2",rows:5,value:h.comment,onChange:t=>y({...h,comment:t.target.value})})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",children:"Assign"}),e.jsx("button",{type:"button",onClick:d,className:"btn btn-light",children:"Cancel"})]})]})]})]}):null},G=B().shape({option:C().required("Please select option")}),V=({orderIds:i,workshopModalOpen:a,onClose:d,setAssigned:m,orderStatus:l})=>{const{workshops:c}=T(1,1e3),{branches:x}=$(1,1e3),{assignWorkshop:g}=U(),{assignBranch:j}=z(),[p,b]=n.useState(),[h,y]=n.useState("");n.useEffect(()=>{a||(b(null),y(""))},[a,i]);const N=async o=>{o.preventDefault();try{await G.validate({option:p},{abortEarly:!1}),l==="Assign Workshop"?await g(i,p):await j(i,p),d(),m(!0)}catch(k){k instanceof A&&y(k.errors[0])}};return a?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:d}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default",onClick:d,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h2",{className:"text-2xl font-bold mb-6",children:l==="Assign Workshop"?"Assign Workshop":"Assign Branch"}),e.jsxs("form",{onSubmit:N,children:[l==="Assign Workshop"?e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"workshop_id",children:"Workshop"}),e.jsxs("select",{id:"workshop_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:p??"",onChange:o=>b(Number(o.target.value)),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Workshop"}),(c==null?void 0:c.length)>0?c.map(o=>e.jsx("option",{value:o.workshop_id,children:o.workshop_name},o.workshop_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:h||" "})]}):e.jsxs("div",{className:"relative flex flex-col flex-[0_0_40%]",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"branch_id",children:"Branch"}),e.jsxs("select",{id:"branch_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:p??"",onChange:o=>b(Number(o.target.value)),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Branch"}),(x==null?void 0:x.length)>0?x.map(o=>e.jsx("option",{value:o.branch_id,children:o.branch_name},o.branch_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:h||" "})]}),e.jsxs("div",{className:"flex mt-4",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-2",children:"Assign"}),e.jsx("button",{type:"button",onClick:d,className:"btn btn-light",children:"Cancel"})]})]})]})]}):!1};export{J as P,V as W};
