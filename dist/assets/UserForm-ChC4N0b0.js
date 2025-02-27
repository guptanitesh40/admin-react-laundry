import{r as n,_ as C,i as G,g as L,x as $,j as e,V as z}from"./index-BsXSBe6J.js";import{u as J}from"./useGetCompanies-CNNqxRpc.js";import{u as W}from"./useGetBranches-DMjl_2Jw.js";import{u as q,a as H}from"./userSchema-Chko4FDw.js";import{u as K}from"./useGetuser-DEs1xFru.js";import{M as P}from"./index-7g1vhUvD.js";const Q=()=>{const[U,m]=n.useState(!1);return{updateUser:async(h,g)=>{const l=localStorage.getItem("authToken"),_=`http://3.110.208.70:3000/user/${h}`;m(!0);try{const d=await fetch(_,{method:"PUT",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify(g)});if(!d.ok){const f=await d.json();return C.error(f.message,{position:"top-center"}),!1}const u=await d.json();return C.success(u.message,{position:"top-center"}),!0}catch(d){return C.error(d.message,{position:"top-center"}),!1}finally{m(!1)}},loading:U}},te=()=>{const{addUser:U,loading:m}=q(),{updateUser:F,loading:h}=Q(),{id:g}=G(),l=g?Number(g):null,_=1e3,d=1,u=L(),{companies:f}=J(d,_),{userData:E,fetchUser:I}=K(),[j,R]=n.useState([]),{branches:S}=W(d,_),[y,V]=n.useState([]),i=E==null?void 0:E.user,D=$(),[p,M]=n.useState(!1),N={first_name:"",last_name:"",email:"",mobile_number:"",gender:null,role_id:null,image:"",company_ids:[],branch_ids:[]},[s,r]=n.useState(N),[k,w]=n.useState(N),[x,A]=n.useState({});n.useEffect(()=>{D.pathname.split("/")[1]==="customer"&&M(!0)},[D]),n.useEffect(()=>{p&&r({...s,role_id:5})},[p]),n.useEffect(()=>{(async()=>{await I(l)})()},[l]),n.useEffect(()=>{if(f){const a=f.map(t=>({company_id:t.company_id,company_name:t.company_name}));R(a)}},[f]),n.useEffect(()=>{if(S){const a=S.map(t=>({branch_id:t.branch_id,branch_name:t.branch_name}));V(a)}},[S]),n.useEffect(()=>{if(i){const a={...s,first_name:i.first_name,last_name:i.last_name,email:i.email,mobile_number:i.mobile_number,gender:i.gender,role_id:i.role_id,branch_ids:i.branch_ids,company_ids:i.company_ids};r(a),w(a)}else r(N),w(N),A({})},[i]);const O=a=>{const{name:t,value:b,files:o}=a.target;t==="image"&&o&&o.length>0?r(c=>({...c,image:o[0].name})):r(c=>({...c,[t]:b}))},B=async a=>{a.preventDefault();try{if(await H(!!l).validate(s,{abortEarly:!1}),!Object.keys(s).some(c=>c==="image"?s.image instanceof File||s.image!==k.image:s[c]!==k[c])){u(p?"/customers":"/users");return}let o;if(l){const c=new FormData;Object.keys(s).forEach(v=>{v==="image"&&s.image instanceof File?c.append(v,s.image):c.append(v,s[v])}),o=await F(l,s)}else o=await U(s);o&&u(p?"/customers":"/users")}catch(t){if(t instanceof z){const b={};t.inner.forEach(o=>{b[o.path||""]=o.message}),A(b)}else C.error("Failed to submit the form. Please try again.")}},T=()=>{u(p?"/customers":"/users")};return e.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:p?l?"Edit Customer":"Add Customer":l?"Edit User":"Add User"}),e.jsxs("form",{onSubmit:B,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"first_name",className:"block text-gray-700 font-semibold",children:"First name"}),e.jsx("input",{type:"text",id:"first_name",name:"first_name",value:s.first_name||"",onChange:a=>r({...s,first_name:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:x.first_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"last_name",className:"block text-gray-700 font-semibold",children:"Last name"}),e.jsx("input",{type:"text",id:"last_name",name:"last_name",value:s.last_name||"",onChange:a=>r({...s,last_name:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:x.last_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"email",className:"block text-gray-700 font-semibold",children:"Email"}),e.jsx("input",{type:"text",id:"email",name:"email",value:s.email||"",onChange:a=>r({...s,email:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:x.email||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"mobile_number",className:"block text-gray-700 font-semibold",children:"Mobile number"}),e.jsx("input",{type:"text",id:"mobile_number",name:"mobile_number",value:s.mobile_number||"",onChange:a=>r({...s,mobile_number:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:x.mobile_number||" "})]}),!p&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"role_id",children:"Role"}),e.jsxs("select",{id:"role_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:s.role_id===null?"":s.role_id,onChange:a=>r({...s,role_id:a.target.value?parseInt(a.target.value):null}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Role"}),e.jsx("option",{value:2,children:"Sub Admin"}),e.jsx("option",{value:3,children:"Branch Manager"}),e.jsx("option",{value:4,children:"Delivery and Pickup"}),e.jsx("option",{value:5,children:"Customer"}),e.jsx("option",{value:6,children:"Workshop Manager"}),e.jsx("option",{value:7,children:"Vendor"})]}),e.jsx("p",{className:"text-red-500 text-sm",children:x.role_id||" "})]}),s.role_id===2&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"role_id",children:"Company"}),e.jsx(P,{options:j,displayValue:"company_name",selectedValues:j==null?void 0:j.filter(a=>{var t;return(t=s.company_ids)==null?void 0:t.includes(a.company_id)}),onSelect:a=>{r({...s,company_ids:a.map(t=>t.company_id)})},onRemove:a=>{r({...s,company_ids:a.map(t=>t.company_id)})},isObject:!0}),e.jsx("p",{className:"text-red-500 text-sm",children:x.company_ids||" "})]}),s.role_id===3&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"role_id",children:"Branch"}),e.jsx(P,{options:y,displayValue:"branch_name",selectedValues:y==null?void 0:y.filter(a=>{var t;return(t=s.branch_ids)==null?void 0:t.includes(a.branch_id)}),onSelect:a=>{r({...s,branch_ids:a.map(t=>t.branch_id)})},onRemove:a=>{r({...s,branch_ids:a.map(t=>t.branch_id)})},isObject:!0})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",children:"Gender"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:1,checked:s.gender===1,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Male"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:2,checked:s.gender===2,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Female"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:3,checked:s.gender===3,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Other"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:x.gender||" "})]}),l&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"image",className:"block text-gray-700 font-semibold",children:"Profile Photo"}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:O,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:x.image||" "})]})]}),e.jsxs("div",{className:"mt-6 flex gap-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${m||h?"opacity-50 cursor-not-allowed":""}`,disabled:m||h,children:m||h?m?"Adding...":"Updating...":p?l?"Update customer":"Add customer":l?"Update user":"Add User"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:T,disabled:m||h,children:"Cancel"})]})]})]})};export{te as default};
