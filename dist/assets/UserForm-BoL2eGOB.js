import{r as l,V as k,m as $,h as z,t as J,j as e,b as q}from"./index-BdkURwdi.js";import{u as H}from"./useGetCompanies-Q9JQWhwe.js";import{u as K}from"./useGetBranches-ClMjvIez.js";import{u as Q,a as X}from"./userSchema-Jsvslfq7.js";import{u as Y}from"./useGetWorkshops-DzH2KSxQ.js";import{u as Z}from"./useGetuser-CQcny1FG.js";import{M as D}from"./index-DCKwhkRz.js";const ee=()=>{const[C,u]=l.useState(!1);return{updateUser:async(x,_)=>{const o=localStorage.getItem("authToken"),f=`http://3.110.208.70:3000/user/${x}`;u(!0);try{const d=await fetch(f,{method:"PUT",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(_)});if(!d.ok){const b=await d.json();return k.error(b.message,{position:"top-center"}),!1}const h=await d.json();return k.success(h.message,{position:"top-center"}),!0}catch(d){return k.error(d.message,{position:"top-center"}),!1}finally{u(!1)}},loading:C}},ie=()=>{const{addUser:C,loading:u}=Q(),{updateUser:F,loading:x}=ee(),{id:_}=$(),o=_?Number(_):null,f=1e3,d=1,h=z(),{companies:b}=H(d,f),{userData:S,fetchUser:I}=Z(),[j,O]=l.useState([]),{branches:E}=K(d,f),{workshops:U}=Y(d,f),[y,M]=l.useState([]),[N,B]=l.useState([]),n=S==null?void 0:S.user,A=J(),[m,G]=l.useState(!1),v={first_name:"",last_name:"",email:"",mobile_number:"",password:"",gender:null,role_id:null,image:"",company_ids:[],branch_ids:[],workshop_ids:[]},[s,r]=l.useState(v),[V,P]=l.useState(v),[p,R]=l.useState({});l.useEffect(()=>{A.pathname.split("/")[1]==="customer"&&G(!0)},[A]),l.useEffect(()=>{m&&r({...s,role_id:5})},[m]),l.useEffect(()=>{(async()=>{await I(o)})()},[o]),l.useEffect(()=>{if(b){const a=b.map(t=>({company_id:t.company_id,company_name:t.company_name}));O(a)}},[b]),l.useEffect(()=>{if(E){const a=E.map(t=>({branch_id:t.branch_id,branch_name:t.branch_name}));M(a)}},[E]),l.useEffect(()=>{if(U){const a=U.map(t=>({workshop_id:t.workshop_id,workshop_name:t.workshop_name}));B(a)}},[U]),l.useEffect(()=>{if(n){const a={...s,first_name:n.first_name,last_name:n.last_name,email:n.email,mobile_number:n.mobile_number,gender:n.gender,role_id:n.role_id,branch_ids:n.branch_ids,company_ids:n.company_ids,workshop_ids:n.workshop_ids};r(a),P(a)}else r(v),P(v),R({})},[n]);const T=a=>{const{name:t,value:g,files:i}=a.target;t==="image"&&i&&i.length>0?r(c=>({...c,image:i[0].name})):r(c=>({...c,[t]:g}))},L=async a=>{a.preventDefault();try{if(await X(!!o).validate(s,{abortEarly:!1}),!Object.keys(s).some(c=>c==="image"?s.image instanceof File||s.image!==V.image:s[c]!==V[c])){h(m?"/customers":"/users");return}let i;if(o){const c=new FormData;Object.keys(s).forEach(w=>{w==="image"&&s.image instanceof File?c.append(w,s.image):c.append(w,s[w])}),i=await F(o,s)}else i=await C(s);i&&h(m?"/customers":"/users")}catch(t){if(t instanceof q){const g={};t.inner.forEach(i=>{g[i.path||""]=i.message}),R(g)}else k.error("Failed to submit the form. Please try again.")}},W=()=>{h(m?"/customers":"/users")};return e.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:m?o?"Edit Customer":"Add Customer":o?"Edit User":"Add User"}),e.jsxs("form",{onSubmit:L,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"first_name",className:"block text-gray-700 font-semibold",children:"First name"}),e.jsx("input",{type:"text",id:"first_name",name:"first_name",autoComplete:"off",value:s.first_name||"",onChange:a=>r({...s,first_name:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:p.first_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"last_name",className:"block text-gray-700 font-semibold",children:"Last name"}),e.jsx("input",{type:"text",id:"last_name",name:"last_name",autoComplete:"off",value:s.last_name||"",onChange:a=>r({...s,last_name:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:p.last_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"email",className:"block text-gray-700 font-semibold",children:"Email"}),e.jsx("input",{type:"text",id:"email",name:"email",autoComplete:"off",value:s.email||"",onChange:a=>r({...s,email:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:p.email||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"mobile_number",className:"block text-gray-700 font-semibold",children:"Mobile number"}),e.jsx("input",{type:"text",id:"mobile_number",name:"mobile_number",autoComplete:"off",value:s.mobile_number||"",onChange:a=>r({...s,mobile_number:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:p.mobile_number||" "})]}),!m&&o&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"password",className:"block text-gray-700 font-semibold",children:"Password"}),e.jsx("input",{type:"text",id:"password",name:"password",value:s.password||"",onChange:a=>r({...s,password:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:p.password||" "})]}),!m&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"role_id",children:"Role"}),e.jsxs("select",{id:"role_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:s.role_id===null?"":s.role_id,onChange:a=>r({...s,role_id:a.target.value?parseInt(a.target.value):null}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Role"}),e.jsx("option",{value:1,children:"Super Admin"}),e.jsx("option",{value:2,children:"Sub Admin"}),e.jsx("option",{value:3,children:"Branch Manager"}),e.jsx("option",{value:4,children:"Delivery and Pickup"}),e.jsx("option",{value:5,children:"Customer"}),e.jsx("option",{value:6,children:"Workshop Manager"}),e.jsx("option",{value:7,children:"Vendor"})]}),e.jsx("p",{className:"text-red-500 text-sm",children:p.role_id||" "})]}),s.role_id===2||s.role_id===1&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",children:"Company"}),e.jsx(D,{options:j,displayValue:"company_name",selectedValues:j==null?void 0:j.filter(a=>{var t;return(t=s.company_ids)==null?void 0:t.includes(a.company_id)}),onSelect:a=>{r({...s,company_ids:a.map(t=>t.company_id)})},onRemove:a=>{r({...s,company_ids:a.map(t=>t.company_id)})},isObject:!0}),e.jsx("p",{className:"text-red-500 text-sm",children:p.company_ids||" "})]}),s.role_id===3&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",children:"Branch"}),e.jsx(D,{options:y,displayValue:"branch_name",selectedValues:y==null?void 0:y.filter(a=>{var t;return(t=s.branch_ids)==null?void 0:t.includes(a.branch_id)}),onSelect:a=>{r({...s,branch_ids:a.map(t=>t.branch_id)})},onRemove:a=>{r({...s,branch_ids:a.map(t=>t.branch_id)})},isObject:!0})]}),s.role_id===6&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",children:"Workshop"}),e.jsx(D,{options:N,displayValue:"workshop_name",selectedValues:N==null?void 0:N.filter(a=>{var t;return(t=s.workshop_ids)==null?void 0:t.includes(a.workshop_id)}),onSelect:a=>{r({...s,workshop_ids:a.map(t=>t.workshop_id)})},onRemove:a=>{r({...s,workshop_ids:a.map(t=>t.workshop_id)})},isObject:!0})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",children:"Gender"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:1,checked:s.gender===1,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Male"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:2,checked:s.gender===2,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Female"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:3,checked:s.gender===3,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Other"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:p.gender||" "})]}),o&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"image",className:"block text-gray-700 font-semibold",children:"Profile Photo"}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:T,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:p.image||" "})]})]}),e.jsxs("div",{className:"mt-6 flex gap-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${u||x?"opacity-50 cursor-not-allowed":""}`,disabled:u||x,children:u||x?u?"Adding...":"Updating...":m?o?"Update customer":"Add customer":o?"Update user":"Add User"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:W,disabled:u||x,children:"Cancel"})]})]})]})};export{ie as default};
