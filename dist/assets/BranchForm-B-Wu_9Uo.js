import{r as b,V as u,a as P,l as q,d as p,m as A,q as D,h as $,j as e,b as R}from"./index-Pj7GyAZD.js";import{u as U}from"./useGetCompanies-BrVCz-Hx.js";import{u as I}from"./useGetBranch-DAIEGzXp.js";const T="http://3.110.208.70:3000",O=`${T}/branches`,L=()=>{const[a,o]=b.useState(!1);return{addBranch:async s=>{const i=localStorage.getItem("authToken");o(!0),s.company_id&&typeof s.company_id!="number"&&(s.company_id=Number(s.company_id));const l={...s,company_id:parseInt(s.company_id),branch_manager_id:parseInt(s.branch_manager_id)};try{const c=await fetch(O,{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify(l)});if(!c.ok){const n=await c.json();return u.error(n.message,{position:"top-center"}),!1}const x=await c.json();return u.success(x.message,{position:"top-center"}),!0}catch(c){return u.error((c==null?void 0:c.message)||"Network error: Failed to fetch.",{position:"top-center"}),!1}finally{o(!1)}},loading:a}},G=()=>{const[a,o]=b.useState(!1);return{updateBranch:async(s,i)=>{const l=localStorage.getItem("authToken"),c=`http://3.110.208.70:3000/branches/${s}`;o(!0);const x={...i,company_id:parseInt(i.company_id),branch_manager_id:parseInt(i.branch_manager_id)};try{const n=await fetch(c,{method:"PUT",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify(x)});if(n.ok){const f=await n.json();return u.success(f.message,{position:"top-center"}),!0}const N=await n.json();return u.error(N.message,{position:"top-center"}),!1}catch(n){return u.error((n==null?void 0:n.message)||"Network error: Failed to fetch.",{position:"top-center"}),!1}finally{o(!1)}},loading:a}},V=P().shape({branch_name:p().required("Branch name is required"),branch_address:p().required("Please add branch address"),branch_phone_number:p().nullable().test("required","Please add phone number",a=>!(a===null||a==="")).test("is-numeric","Phone number must be a positive number",a=>a?/^[0-9+\-\s()]{5,15}$/.test(a):!0).test("length","Phone number must be between 5 to 15 long",a=>a?a.length>=5&&a.length<=15:!0),branch_mobile_number:p().nullable().test("is-numeric","Phone number must be a positive number",a=>a?/^[0-9+\-\s()]{5,15}$/.test(a):!0).test("length","Phone number must be between 5 to 15 long",a=>a?a.length>=5&&a.length<=15:!0),branch_email:p().required("Email is required").email("Enter a valid email").test("required","Email is required",a=>!!a),branch_registration_number:p().nullable().test("required","Branch registration number is required",a=>!!a),company_id:q().required("Please select company").test("required","Please select company",a=>!!a)}),M=()=>{const{addBranch:a,loading:o}=L(),{updateBranch:j,loading:s}=G(),{id:i}=A(),l=Number(i),c=1e3,x=1,{branch:n,fetchBranch:N}=I(),{companies:f}=U(x,c),{users:B,fetchUsersByRole:C}=D(),v=$(),[t,y]=b.useState({branch_name:"",branch_address:"",branch_manager_id:null,branch_phone_number:"",branch_mobile_number:"",branch_email:"",branch_registration_number:"",company_id:null}),[w,F]=b.useState({branch_name:"",branch_address:"",branch_manager_id:null,branch_phone_number:"",branch_mobile_number:"",branch_email:"",branch_registration_number:"",company_id:null}),[m,k]=b.useState({});b.useEffect(()=>{(async()=>{await N(l),await C(3)})()},[l]),b.useEffect(()=>{if(n){const r={branch_name:n.branch_name,branch_address:n.branch_address,branch_manager_id:n.branch_manager_id,branch_phone_number:n.branch_phone_number,branch_mobile_number:n.branch_mobile_number,branch_email:n.branch_email,branch_registration_number:n.branch_registration_number,company_id:n.company_id};y(r),F(r)}},[n]);const _=r=>{const{name:g,value:d}=r.target;y(h=>({...h,[g]:d}))},S=async r=>{r.preventDefault();try{if(await V.validate(t,{abortEarly:!1}),!Object.keys(t).some(h=>t[h]!==w[h])){v("/branches");return}let d;l?d=await j(i,t):d=await a(t),d&&v("/branches")}catch(g){if(g instanceof R){const d={};g.inner.forEach(h=>{d[h.path||""]=h.message}),k(d)}else u.error("Failed to submit the form. Please try again.")}},E=()=>{v("/branches")};return e.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:l?"Edit Branch":"Add Branch"}),e.jsxs("form",{onSubmit:S,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"company_id",children:"Company"}),e.jsxs("select",{id:"company_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:t.company_id||"",onChange:r=>y({...t,company_id:r.target.value?Number(r.target.value):null}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Company"}),f.length>0?f.map(r=>e.jsx("option",{value:r.company_id,children:r.company_name},r.company_id)):e.jsx("option",{children:"No Data available"})]}),e.jsx("p",{className:"text-red-500 text-sm",children:m.company_id||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_manager_id",children:"Branch Manager"}),e.jsxs("select",{id:"branch_manager_id",className:"select border border-gray-300 rounded-md p-2 w-full text-sm",value:t.branch_manager_id||"",onChange:r=>y({...t,branch_manager_id:r.target.value?Number(r.target.value):null}),children:[e.jsx("option",{value:"",selected:!0,children:"Select Branch Manager"}),B?B.map(r=>e.jsxs("option",{value:r.user_id,children:[r.first_name," ",r.last_name]},r.user_id)):e.jsx("option",{children:"No Data available"})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_name",children:"Branch name"}),e.jsx("input",{type:"text",id:"branch_name",name:"branch_name",autoComplete:"off",value:t.branch_name||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.branch_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_address",children:"Address"}),e.jsx("textarea",{id:"branch_address",name:"branch_address",value:t.branch_address||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.branch_address||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_phone_number",children:"Phone number 1"}),e.jsx("input",{type:"text",id:"branch_phone_number",name:"branch_phone_number",autoComplete:"off",value:t.branch_phone_number||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.branch_phone_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_mobile_number",children:"Phone number 2"}),e.jsx("input",{type:"text",id:"branch_mobile_number",name:"branch_mobile_number",autoComplete:"off",value:t.branch_mobile_number||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.branch_mobile_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_email",children:"Email"}),e.jsx("input",{type:"text",id:"branch_email",name:"branch_email",autoComplete:"off",value:t.branch_email||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.branch_email||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"branch_registration_number",children:"Branch Registration Number"}),e.jsx("input",{type:"text",id:"branch_registration_number",name:"branch_registration_number",autoComplete:"off",value:t.branch_registration_number||"",onChange:_,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:m.branch_registration_number||" "})]})]}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary mt-5 ${o||s?"opacity-50 cursor-not-allowed":""}`,disabled:o||s,children:o||s?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),e.jsx("span",{className:"ml-2",children:"Saving..."})]}):l?"Update Branch":"Add Branch"}),e.jsx("button",{type:"button",className:"mx-5 btn btn-light mt-5",onClick:E,disabled:o||s,children:"Cancel"})]})]})]})};export{M as default};
