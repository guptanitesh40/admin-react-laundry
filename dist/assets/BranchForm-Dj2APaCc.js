import{r as h,V as b,a as q,k as A,d as g,l as D,i as P,j as e,b as R}from"./index-BtmdiTM0.js";import{u as U}from"./useGetCompanies-BxxMUjF8.js";import{u as $}from"./useGetBranch-DNtiFccy.js";import{u as I}from"./useGetUsersByRole-DH77FGPy.js";const T="http://3.110.208.70:3000",O=`${T}/branches`,L=()=>{const[n,o]=h.useState(!1);return{addBranch:async s=>{const l=localStorage.getItem("authToken");o(!0),s.company_id&&typeof s.company_id!="number"&&(s.company_id=Number(s.company_id));const i={...s,company_id:parseInt(s.company_id),branch_manager_id:parseInt(s.branch_manager_id)};try{const c=await fetch(O,{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify(i)});if(!c.ok){const r=await c.json();return b.error(r.message,{position:"top-center"}),!1}const p=await c.json();return b.success(p.message,{position:"top-center"}),!0}catch(c){return b.error((c==null?void 0:c.message)||"Network error: Failed to fetch.",{position:"top-center"}),!1}finally{o(!1)}},loading:n}},G=()=>{const[n,o]=h.useState(!1);return{updateBranch:async(s,l)=>{const i=localStorage.getItem("authToken"),c=`http://3.110.208.70:3000/branches/${s}`;o(!0);const p={...l,company_id:parseInt(l.company_id),branch_manager_id:parseInt(l.branch_manager_id)};try{const r=await fetch(c,{method:"PUT",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify(p)});if(r.ok){const f=await r.json();return b.success(f.message,{position:"top-center"}),!0}const N=await r.json();return b.error(N.message,{position:"top-center"}),!1}catch(r){return b.error((r==null?void 0:r.message)||"Network error: Failed to fetch.",{position:"top-center"}),!1}finally{o(!1)}},loading:n}},M=q().shape({branch_name:g().required("Branch name is required"),branch_address:g().required("Please add branch address"),branch_phone_number:g().nullable().test("required","Please add mobile number",n=>!(n===null||n==="")),branch_email:g().required("Email is required").email("Enter a valid email").test("required","Email is required",n=>!!n),branch_registration_number:g().nullable().test("required","Branch registration number is required",n=>!!n),company_id:A().required("Please select company").test("required","Please select company",n=>!!n)}),K=()=>{const{addBranch:n,loading:o}=L(),{updateBranch:j,loading:s}=G(),{id:l}=D(),i=Number(l),c=1e3,p=1,{branch:r,fetchBranch:N}=$(),{companies:f}=U(p,c),{users:B,fetchUsersByRole:C}=I(),v=P(),[t,y]=h.useState({branch_name:"",branch_address:"",branch_manager_id:null,branch_phone_number:"",branch_email:"",branch_registration_number:"",company_id:null}),[w,k]=h.useState({branch_name:"",branch_address:"",branch_manager_id:null,branch_phone_number:"",branch_email:"",branch_registration_number:"",company_id:null}),[u,F]=h.useState({});h.useEffect(()=>{(async()=>{await N(i),await C(3)})()},[i]),h.useEffect(()=>{if(r){const a={branch_name:r.branch_name,branch_address:r.branch_address,branch_manager_id:r.branch_manager_id,branch_phone_number:r.branch_phone_number,branch_email:r.branch_email,branch_registration_number:r.branch_registration_number,company_id:r.company_id};y(a),k(a)}},[r]);const _=a=>{const{name:x,value:d}=a.target;y(m=>({...m,[x]:d}))},S=async a=>{a.preventDefault();try{if(await M.validate(t,{abortEarly:!1}),!Object.keys(t).some(m=>t[m]!==w[m])){v("/branches");return}let d;i?d=await j(l,t):d=await n(t),d&&v("/branches")}catch(x){if(x instanceof R){const d={};x.inner.forEach(m=>{d[m.path||""]=m.message}),F(d)}else b.error("Failed to submit the form. Please try again.")}},E=()=>{v("/branches")};return e.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:i?"Edit Branch":"Add Branch"}),e.jsxs("form",{onSubmit:S,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"company_id",children:"Company"}),e.jsxs("select",{id:"company_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:t.company_id||"",onChange:a=>y({...t,company_id:a.target.value?Number(a.target.value):null}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Company"}),f.length>0?f.map(a=>e.jsx("option",{value:a.company_id,children:a.company_name},a.company_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm",children:u.company_id||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_manager_id",children:"Branch Manager"}),e.jsxs("select",{id:"branch_manager_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:t.branch_manager_id||"",onChange:a=>y({...t,branch_manager_id:a.target.value?Number(a.target.value):null}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Branch Manager"}),B?B.map(a=>e.jsxs("option",{value:a.user_id,children:[a.first_name," ",a.last_name]},a.user_id)):e.jsx("option",{children:"No Data available"})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_name",children:"Branch name"}),e.jsx("input",{type:"text",id:"branch_name",name:"branch_name",value:t.branch_name||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.branch_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_address",children:"Address"}),e.jsx("textarea",{id:"branch_address",name:"branch_address",value:t.branch_address||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.branch_address||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_phone_number",children:"Mobile number"}),e.jsx("input",{type:"text",id:"branch_phone_number",name:"branch_phone_number",value:t.branch_phone_number||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.branch_phone_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_email",children:"Email"}),e.jsx("input",{type:"text",id:"branch_email",name:"branch_email",value:t.branch_email||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.branch_email||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_registration_number",children:"Branch Registration Number"}),e.jsx("input",{type:"text",id:"branch_registration_number",name:"branch_registration_number",value:t.branch_registration_number||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.branch_registration_number||" "})]})]}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary mt-5 ${o||s?"opacity-50 cursor-not-allowed":""}`,disabled:o||s,children:o||s?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),e.jsx("span",{className:"ml-2",children:"Saving..."})]}):i?"Update Branch":"Add Branch"}),e.jsx("button",{type:"button",className:"mx-5 btn btn-light mt-5",onClick:E,disabled:o||s,children:"Cancel"})]})]})]})};export{K as default};
