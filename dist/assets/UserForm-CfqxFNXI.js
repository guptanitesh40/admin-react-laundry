import{r as l,B as z,V as k,n as J,i as K,q as Q,v as X,j as e,b as Y}from"./index-D0TBWkPZ.js";import{u as Z}from"./useGetCompanies-sipcfjS6.js";import{u as ee,a as se}from"./userSchema-D7P9bQhw.js";import{u as ae}from"./useGetWorkshops-D327B63D.js";import{u as te}from"./useGetuser-BOAXGsuo.js";import{M as D}from"./index--BTeCX9X.js";const re=()=>{const[C,h]=l.useState(!1);return{updateUser:async(b,j)=>{const n=localStorage.getItem("authToken");h(!0);try{const m=await fetch(`${z}/user/${b}`,{method:"PUT",headers:{Authorization:`Bearer ${n}`},body:j});if(!m.ok){const x=await m.json();return k.error(x.message,{position:"top-center"}),!1}const g=await m.json();return k.success(g.message,{position:"top-center"}),!0}catch(m){return k.error(m.message,{position:"top-center"}),!1}finally{h(!1)}},loading:C}},me=()=>{const{addUser:C,loading:h}=ee(),{updateUser:F,loading:b}=re(),{id:j}=J(),n=j?Number(j):null,m=1e3,g=1,x=K(),{companies:S}=Z(g,m),{userData:E,fetchUser:R}=te(),[y,L]=l.useState([]),{branches:U}=Q(g,m),{workshops:A}=ae(g,m),[N,O]=l.useState([]),[v,T]=l.useState([]),i=E==null?void 0:E.user,P=X(),[p,G]=l.useState(!1),[V,W]=l.useState(!1),w={first_name:"",last_name:"",email:"",mobile_number:"",password:"",gender:null,role_id:null,image:"",company_ids:[],branch_ids:[],workshop_ids:[]},[a,r]=l.useState(w),[I,M]=l.useState(w),[u,B]=l.useState({});l.useEffect(()=>{P.pathname.split("/")[1]==="customer"&&G(!0)},[P]),l.useEffect(()=>{p&&r({...a,role_id:5})},[p]),l.useEffect(()=>{(async()=>{await R(n)})()},[n]),l.useEffect(()=>{if(S){const s=S.map(t=>({company_id:t.company_id,company_name:t.company_name}));L(s)}},[S]),l.useEffect(()=>{if(U){const s=U.map(t=>({branch_id:t.branch_id,branch_name:t.branch_name}));O(s)}},[U]),l.useEffect(()=>{if(A){const s=A.map(t=>({workshop_id:t.workshop_id,workshop_name:t.workshop_name}));T(s)}},[A]),l.useEffect(()=>{if(i){const s={...a,first_name:i.first_name,last_name:i.last_name,email:i.email,mobile_number:i.mobile_number,gender:i.gender,role_id:i.role_id,branch_ids:i.branch_ids,company_ids:i.company_ids,workshop_ids:i.workshop_ids};r(s),M(s)}else r(w),M(w),B({})},[i]);const $=s=>{const t=s.target;if(t instanceof HTMLInputElement){const{name:f,value:d,files:o}=t;f==="image"&&o&&o.length>0?r(c=>({...c,image:o[0]})):r(c=>({...c,[f]:d}))}else if(t instanceof HTMLTextAreaElement){const{name:f,value:d}=t;r(o=>({...o,[f]:d}))}},H=async s=>{s.preventDefault();try{if(await se(!!n).validate(a,{abortEarly:!1}),!Object.keys(a).some(o=>o==="image"?a.image instanceof File||a.image!==I.image:a[o]!==I[o])){x(p?"/customers":"/users");return}let d;if(n){const o=new FormData;Object.keys(a).forEach(c=>{c==="image"&&a.image instanceof File?o.append(c,a.image):c==="company_ids"&&Array.isArray(a.company_ids)?a.company_ids.forEach(_=>{o.append("company_ids",_.toString())}):c==="branch_ids"&&Array.isArray(a.branch_ids)?a.branch_ids.forEach(_=>{o.append("branch_ids",_.toString())}):c==="workshop_ids"&&Array.isArray(a.workshop_ids)?a.workshop_ids.forEach(_=>{o.append("workshop_ids",_.toString())}):o.append(c,a[c])}),d=await F(n,o)}else d=await C(a);d&&x(p?"/customers":"/users")}catch(t){if(t instanceof Y){const f={};t.inner.forEach(d=>{f[d.path||""]=d.message}),B(f)}else k.error("Failed to submit the form. Please try again.")}},q=()=>{x(p?"/customers":"/users")};return e.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:p?n?"Edit Customer":"Add Customer":n?"Edit User":"Add User"}),e.jsxs("form",{onSubmit:H,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"first_name",className:"block text-gray-700 font-semibold",children:"First name"}),e.jsx("input",{type:"text",id:"first_name",name:"first_name",autoComplete:"off",value:a.first_name||"",onChange:s=>r({...a,first_name:s.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.first_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"last_name",className:"block text-gray-700 font-semibold",children:"Last name"}),e.jsx("input",{type:"text",id:"last_name",name:"last_name",autoComplete:"off",value:a.last_name||"",onChange:s=>r({...a,last_name:s.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.last_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"email",className:"block text-gray-700 font-semibold",children:"Email"}),e.jsx("input",{type:"text",id:"email",name:"email",autoComplete:"off",value:a.email||"",onChange:s=>r({...a,email:s.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.email||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"mobile_number",className:"block text-gray-700 font-semibold",children:"Mobile number"}),e.jsx("input",{type:"text",id:"mobile_number",name:"mobile_number",autoComplete:"off",value:a.mobile_number||"",onChange:s=>r({...a,mobile_number:s.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.mobile_number||" "})]}),!p&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"password",className:"block text-gray-700 font-semibold",children:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:V?"text":"password",id:"password",name:"password",autoComplete:"off",value:a.password||"",onChange:s=>r({...a,password:s.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("span",{className:"absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer",onClick:()=>W(s=>!s),children:V?e.jsx("i",{className:"ki-filled ki-eye-slash text-gray-500"}):e.jsx("i",{className:"ki-filled ki-eye text-gray-500"})})]}),e.jsx("p",{className:"text-red-500 text-sm",children:u.password||" "})]}),!p&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"role_id",children:"Role"}),e.jsxs("select",{id:"role_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:a.role_id===null?"":a.role_id,onChange:s=>r({...a,role_id:s.target.value?parseInt(s.target.value):null}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Role"}),e.jsx("option",{value:1,children:"Super Admin"}),e.jsx("option",{value:2,children:"Sub Admin"}),e.jsx("option",{value:3,children:"Branch Manager"}),e.jsx("option",{value:4,children:"Delivery and Pickup"}),e.jsx("option",{value:5,children:"Customer"}),e.jsx("option",{value:6,children:"Workshop Manager"}),e.jsx("option",{value:7,children:"Vendor"})]}),e.jsx("p",{className:"text-red-500 text-sm",children:u.role_id||" "})]}),(a.role_id===2||a.role_id===1)&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",children:"Company"}),e.jsx(D,{options:y,displayValue:"company_name",selectedValues:y==null?void 0:y.filter(s=>{var t;return(t=a.company_ids)==null?void 0:t.includes(s.company_id)}),onSelect:s=>{r({...a,company_ids:s.map(t=>t.company_id)})},onRemove:s=>{r({...a,company_ids:s.map(t=>t.company_id)})},isObject:!0}),e.jsx("p",{className:"text-red-500 text-sm",children:u.company_ids||" "})]}),a.role_id===3&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",children:"Branch"}),e.jsx(D,{options:N,displayValue:"branch_name",selectedValues:N==null?void 0:N.filter(s=>{var t;return(t=a.branch_ids)==null?void 0:t.includes(s.branch_id)}),onSelect:s=>{r({...a,branch_ids:s.map(t=>t.branch_id)})},onRemove:s=>{r({...a,branch_ids:s.map(t=>t.branch_id)})},isObject:!0})]}),a.role_id===6&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",children:"Workshop"}),e.jsx(D,{options:v,displayValue:"workshop_name",selectedValues:v==null?void 0:v.filter(s=>{var t;return(t=a.workshop_ids)==null?void 0:t.includes(s.workshop_id)}),onSelect:s=>{r({...a,workshop_ids:s.map(t=>t.workshop_id)})},onRemove:s=>{r({...a,workshop_ids:s.map(t=>t.workshop_id)})},isObject:!0})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",children:"Gender"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:1,checked:a.gender===1,onChange:s=>r({...a,gender:parseInt(s.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Male"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:2,checked:a.gender===2,onChange:s=>r({...a,gender:parseInt(s.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Female"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:3,checked:a.gender===3,onChange:s=>r({...a,gender:parseInt(s.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Other"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:u.gender||" "})]}),n&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"image",className:"block text-gray-700 font-semibold",children:"Profile Photo"}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:$,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.image||" "})]})]}),e.jsxs("div",{className:"mt-6 flex gap-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${h||b?"opacity-50 cursor-not-allowed":""}`,disabled:h||b,children:h||b?h?"Adding...":"Updating...":p?n?"Update customer":"Add customer":n?"Update user":"Add User"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:q,disabled:h||b,children:"Cancel"})]})]})]})};export{me as default};
