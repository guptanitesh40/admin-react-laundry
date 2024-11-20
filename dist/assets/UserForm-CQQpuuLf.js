import{r as c,_ as f,aR as B,k as I,j as e,V}from"./index-ekHY3xQj.js";import{u as $}from"./useGetCompanies-Df0G4sLJ.js";import{u as G}from"./useGetBranches-DCiMEsW0.js";import{u as M,a as L}from"./userSchema-Cq_T8R1e.js";import{M as k}from"./index-CTLqIDwQ.js";const z=()=>{const[g,i]=c.useState(!1);return{updateUser:async(h,_)=>{const l=localStorage.getItem("authToken"),b=`http://35.154.167.170:3000/user/${h}`;i(!0);try{const d=await fetch(b,{method:"PUT",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify(_)});if(!d.ok){const o=await d.json();return f.error(o.message,{position:"top-center"}),!1}const x=await d.json();return f.success(x.message,{position:"top-center"}),!0}catch(d){return f.error(d.message,{position:"top-center"}),!1}finally{i(!1)}},loading:g}},J=()=>{const[g,i]=c.useState(!1),[N,h]=c.useState(null);return{user:N,loading:g,fetchUser:async l=>{var x;if(!l){h(null);return}const b=localStorage.getItem("authToken"),d=`http://35.154.167.170:3000/user/${l}`;i(!0);try{const o=await fetch(d,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`}});if(!o.ok){const w=await o.json();f.error(w.message,{position:"top-center"}),i(!1);return}const n=await o.json();h((x=n==null?void 0:n.data)==null?void 0:x.user)}catch(o){f.error((o==null?void 0:o.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{i(!1)}}}},X=()=>{const{addUser:g,loading:i}=M(),{updateUser:N,loading:h}=z(),{id:_}=B(),l=_?Number(_):null,b=1e3,d=1,x=I(),{companies:o}=$(d,b),{user:n,fetchUser:w}=J(),[C,O]=c.useState([]),{branches:S}=G(d,b),[U,R]=c.useState([]),y={first_name:"",last_name:"",email:"",password:"",mobile_number:"",gender:null,role_id:null,image:"",company_ids:[],branch_ids:[]},[s,r]=c.useState(y),[F,D]=c.useState(y),[m,E]=c.useState({});c.useEffect(()=>{(async()=>{await w(l)})()},[l]),c.useEffect(()=>{if(o){const a=o.map(t=>({company_id:t.company_id,company_name:t.company_name}));O(a)}},[o]),c.useEffect(()=>{if(S){const a=S.map(t=>({branch_id:t.branch_id,branch_name:t.branch_name}));R(a)}},[S]),c.useEffect(()=>{if(n){const a={...s,first_name:n.first_name,last_name:n.last_name,email:n.email,password:"",mobile_number:n.mobile_number,gender:n.gender,role_id:n.role_id,branch_ids:n.branch_ids,company_ids:n.company_ids};r(a),D(a)}else r(y),D(y),E({})},[n]);const T=a=>{const{name:t,value:j,files:p}=a.target;t==="image"&&p&&p.length>0?r(u=>({...u,image:p[0].name})):r(u=>({...u,[t]:j}))},A=async a=>{a.preventDefault();try{if(await L(!!l).validate(s,{abortEarly:!1}),!Object.keys(s).some(u=>u==="image"?s.image instanceof File||s.image!==F.image:s[u]!==F[u])){x("/user");return}let p;if(l){const u=new FormData;Object.keys(s).forEach(v=>{v==="image"&&s.image instanceof File?u.append(v,s.image):u.append(v,s[v])}),p=await N(l,s)}else p=await g(s);p&&x("/user")}catch(t){if(t instanceof V){const j={};t.inner.forEach(p=>{j[p.path||""]=p.message}),E(j)}else f.error("Failed to submit the form. Please try again.")}},P=()=>{x("/user")};return e.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:l?"Edit user detail":"Add user"}),e.jsxs("form",{onSubmit:A,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"first_name",className:"mb-2 font-semibold",children:"First Name"}),e.jsx("input",{type:"text",id:"first_name",name:"first_name",value:s.first_name||"",onChange:a=>r({...s,first_name:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.first_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"last_name",className:"mb-2 font-semibold",children:"Last Name"}),e.jsx("input",{type:"text",id:"last_name",name:"last_name",value:s.last_name||"",onChange:a=>r({...s,last_name:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.last_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"email",className:"mb-2 font-semibold",children:"Email"}),e.jsx("input",{type:"text",id:"email",name:"email",value:s.email||"",onChange:a=>r({...s,email:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.email||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"mobile_number",className:"mb-2 font-semibold",children:"Mobile Number"}),e.jsx("input",{type:"text",id:"mobile_number",name:"mobile_number",value:s.mobile_number||"",onChange:a=>r({...s,mobile_number:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.mobile_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"password",className:"mb-2 font-semibold",children:"Password"}),e.jsx("input",{type:"password",id:"password",name:"password",value:s.password||"",onChange:a=>r({...s,password:a.target.value}),className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.password||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"role_id",children:"Role"}),e.jsxs("select",{id:"role_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:s.role_id===null?"":s.role_id,onChange:a=>r({...s,role_id:a.target.value?parseInt(a.target.value):null}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Role"}),e.jsx("option",{value:2,children:"Sub Admin"}),e.jsx("option",{value:3,children:"Branch Manager"}),e.jsx("option",{value:4,children:"Delivery Boy"}),e.jsx("option",{value:5,children:"Customer"}),e.jsx("option",{value:6,children:"Workshop Manager"}),e.jsx("option",{value:7,children:"Vendor"})]}),e.jsx("p",{className:"text-red-500 text-sm",children:m.role_id||" "})]}),s.role_id===2&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"role_id",children:"Company"}),e.jsx(k,{options:C,displayValue:"company_name",selectedValues:C.filter(a=>s.company_ids.includes(a.company_id)),onSelect:a=>{r({...s,company_ids:a.map(t=>t.company_id)})},onRemove:a=>{r({...s,company_ids:a.map(t=>t.company_id)})},isObject:!0}),e.jsx("p",{className:"text-red-500 text-sm",children:m.company_ids||" "})]}),s.role_id===3&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"role_id",children:"Branch"}),e.jsx(k,{options:U,displayValue:"branch_name",selectedValues:U.filter(a=>s.branch_ids.includes(a.branch_id)),onSelect:a=>{r({...s,branch_ids:a.map(t=>t.branch_id)})},onRemove:a=>{r({...s,branch_ids:a.map(t=>t.branch_id)})},isObject:!0}),e.jsx("p",{className:"text-red-500 text-sm",children:m.branch_ids||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",children:"Gender"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:1,checked:s.gender===1,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Male"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:2,checked:s.gender===2,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Female"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"gender",value:3,checked:s.gender===3,onChange:a=>r({...s,gender:parseInt(a.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Other"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:m.gender||" "})]}),l&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"image",className:"mb-2 font-semibold",children:"Profile Photo"}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:T,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.image||" "})]})]}),e.jsxs("div",{className:"mt-6 flex gap-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${i||h?"opacity-50 cursor-not-allowed":""}`,disabled:i||h,children:i||h?i?"Adding...":"Updating...":l?"Update user":"Add user"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:P,disabled:i||h,children:"Cancel"})]})]})]})};export{X as default};
