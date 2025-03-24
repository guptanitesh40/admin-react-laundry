import{r as d,_ as v,aM as O,g as k,j as e,V as T}from"./index-C2mEiCt6.js";import{u as G}from"./useGetCompanies-BN8uTotm.js";import{u as $}from"./useGetBranches-PqZIbwoU.js";import{u as L,a as z}from"./userSchema-DIYze-PN.js";import{u as J}from"./useGetuser-BGzu7CmE.js";import{M as P}from"./index-CrG4yMj-.js";const W=()=>{const[w,c]=d.useState(!1);return{updateUser:async(u,f)=>{const n=localStorage.getItem("authToken"),g=`http://3.110.208.70:3000/user/${u}`;c(!0);try{const p=await fetch(g,{method:"PUT",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify(f)});if(!p.ok){const h=await p.json();return v.error(h.message,{position:"top-center"}),!1}const x=await p.json();return v.success(x.message,{position:"top-center"}),!0}catch(p){return v.error(p.message,{position:"top-center"}),!1}finally{c(!1)}},loading:w}},Z=()=>{const{addUser:w,loading:c}=L(),{updateUser:S,loading:u}=W(),{id:f}=O(),n=f?Number(f):null,g=1e3,p=1,x=k(),{companies:h}=G(p,g),{userData:C,fetchUser:A}=J(),[_,M]=d.useState([]),{branches:F}=$(p,g),[j,R]=d.useState([]),l=C==null?void 0:C.user,N={first_name:"",last_name:"",email:"",password:"",mobile_number:"",gender:null,role_id:null,image:"",company_ids:[],branch_ids:[]},[s,r]=d.useState(N),[D,E]=d.useState(N),[m,U]=d.useState({});d.useEffect(()=>{(async()=>{await A(n)})()},[n]),d.useEffect(()=>{if(h){const a=h.map(t=>({company_id:t.company_id,company_name:t.company_name}));M(a)}},[h]),d.useEffect(()=>{if(F){const a=F.map(t=>({branch_id:t.branch_id,branch_name:t.branch_name}));R(a)}},[F]),d.useEffect(()=>{if(l){const a={...s,first_name:l.first_name,last_name:l.last_name,email:l.email,password:"",mobile_number:l.mobile_number,gender:l.gender,role_id:l.role_id,branch_ids:l.branch_ids,company_ids:l.company_ids};r(a),E(a)}else r(N),E(N),U({})},[l]);const V=a=>{const{name:t,value:b,files:i}=a.target;t==="image"&&i&&i.length>0?r(o=>({...o,image:i[0].name})):r(o=>({...o,[t]:b}))},B=async a=>{a.preventDefault();try{if(await z(!!n).validate(s,{abortEarly:!1}),!Object.keys(s).some(o=>o==="image"?s.image instanceof File||s.image!==D.image:s[o]!==D[o])){x("/user");return}let i;if(n){const o=new FormData;Object.keys(s).forEach(y=>{y==="image"&&s.image instanceof File?o.append(y,s.image):o.append(y,s[y])}),i=await S(n,s)}else i=await w(s);i&&x("/user")}catch(t){if(t instanceof T){const b={};t.inner.forEach(i=>{b[i.path||""]=i.message}),U(b)}else v.error("Failed to submit the form. Please try again.")}},I=()=>{x("/user")};return e.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:n?"Edit user detail":"Add user"}),e.jsxs("form",{onSubmit:B,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"first_name",className:"mb-2 font-semibold",children:"First Name"}),e.jsx("input",{type:"text",id:"first_name",name:"first_name",value:s.first_name||"",onChange:a=>r({...s,first_name:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.first_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"last_name",className:"mb-2 font-semibold",children:"Last Name"}),e.jsx("input",{type:"text",id:"last_name",name:"last_name",value:s.last_name||"",onChange:a=>r({...s,last_name:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.last_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"email",className:"mb-2 font-semibold",children:"Email"}),e.jsx("input",{type:"text",id:"email",name:"email",value:s.email||"",onChange:a=>r({...s,email:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.email||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"mobile_number",className:"mb-2 font-semibold",children:"Mobile Number"}),e.jsx("input",{type:"text",id:"mobile_number",name:"mobile_number",value:s.mobile_number||"",onChange:a=>r({...s,mobile_number:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.mobile_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"password",className:"mb-2 font-semibold",children:"Password"}),e.jsx("input",{type:"password",id:"password",name:"password",value:s.password||"",onChange:a=>r({...s,password:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.password||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"role_id",children:"Role"}),e.jsxs("select",{id:"role_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:s.role_id===null?"":s.role_id,onChange:a=>r({...s,role_id:a.target.value?parseInt(a.target.value):null}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Role"}),e.jsx("option",{value:2,children:"Sub Admin"}),e.jsx("option",{value:3,children:"Branch Manager"}),e.jsx("option",{value:4,children:"Delivery Boy"}),e.jsx("option",{value:5,children:"Customer"}),e.jsx("option",{value:6,children:"Workshop Manager"}),e.jsx("option",{value:7,children:"Vendor"})]}),e.jsx("p",{className:"text-red-500 text-sm",children:m.role_id||" "})]}),s.role_id===2&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"role_id",children:"Company"}),e.jsx(P,{options:_,displayValue:"company_name",selectedValues:_==null?void 0:_.filter(a=>{var t;return(t=s.company_ids)==null?void 0:t.includes(a.company_id)}),onSelect:a=>{r({...s,company_ids:a.map(t=>t.company_id)})},onRemove:a=>{r({...s,company_ids:a.map(t=>t.company_id)})},isObject:!0}),e.jsx("p",{className:"text-red-500 text-sm",children:m.company_ids||" "})]}),s.role_id===3&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"role_id",children:"Branch"}),e.jsx(P,{options:j,displayValue:"branch_name",selectedValues:j==null?void 0:j.filter(a=>{var t;return(t=s.branch_ids)==null?void 0:t.includes(a.branch_id)}),onSelect:a=>{r({...s,branch_ids:a.map(t=>t.branch_id)})},onRemove:a=>{r({...s,branch_ids:a.map(t=>t.branch_id)})},isObject:!0})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",children:"Gender"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:1,checked:s.gender===1,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Male"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:2,checked:s.gender===2,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Female"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:3,checked:s.gender===3,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Other"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:m.gender||" "})]}),n&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"image",className:"mb-2 font-semibold",children:"Profile Photo"}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:V,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.image||" "})]})]}),e.jsxs("div",{className:"mt-6 flex gap-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${c||u?"opacity-50 cursor-not-allowed":""}`,disabled:c||u,children:c||u?c?"Adding...":"Updating...":n?"Update user":"Add user"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:I,disabled:c||u,children:"Cancel"})]})]})]})};export{Z as default};
