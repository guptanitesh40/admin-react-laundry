import{r as x,_ as h,c as E,a as d,f as C,aR as z,aM as A,g as P,j as e,aN as O,aO as $,aS as L,h as M,V as R}from"./index-C2mEiCt6.js";import{u as U}from"./useGetCompany-B53gYKCA.js";const T="http://3.110.208.70:3000",Y=`${T}/companies`,k=()=>{const[u,t]=x.useState(!1);return{addCompany:async y=>{const m=localStorage.getItem("authToken");t(!0);try{const s=new FormData;Object.entries(y).forEach(([n,r])=>{r&&(r instanceof FileList?s.append(n,r[0]):s.append(n,r))});const a=await fetch(Y,{method:"POST",headers:{Authorization:`Bearer ${m}`},body:s});if(!a.ok){const n=await a.json();return h.error(n.message,{position:"top-center"}),!1}const p=await a.json();return h.success(p.message,{position:"top-center"}),!0}catch(s){return h.error((s==null?void 0:s.message)||"Network error: Failed to fetch.",{position:"top-center"}),!1}finally{t(!1)}},loading:u}},I=()=>{const[u,t]=x.useState(!1);return{updateCompany:async(y,m)=>{const s=localStorage.getItem("authToken"),a=`http://3.110.208.70:3000/companies/${y}`,p=new FormData;for(const n in m)m[n]&&(n==="logo"||n==="contract_document"?m[n]instanceof FileList&&m[n].length>0&&p.append(n,m[n][0]):p.append(n,m[n]));t(!0);try{const n=await fetch(a,{method:"PUT",headers:{Authorization:`Bearer ${s}`},body:p});if(n.ok){const f=await n.json();return h.success(f.message,{position:"top-center"}),!0}const r=await n.json();return h.error(r.message,{position:"top-center"}),!1}catch(n){return h.error(n.message,{position:"top-center"}),!1}finally{t(!1)}},loading:u}},B=(u=!1)=>E().shape({company_name:d().required("Company name is required").test("required","Company name is required",t=>!!t),address:d().required("Address is required").test("required","Address is required",t=>!!t),city:d().required("City is required").test("required","City is required",t=>!!t),state:d().required("State is required").test("required","State is required",t=>!!t),zip_code:d().test("required","Zip Code is required",t=>!(t===null||t==="")).test("format","Zip Code must be a 6 digit number",t=>t===null||t===""?!0:/^[0-9]{6}$/.test(t)),company_owner_name:d().required("Company Owner Name is required").test("required","Company Owner Name is required",t=>!!t),phone_number:d().nullable().test("format","Phone Number must be a 10-digit number",t=>t===null||t===""?!0:/^[0-9]{10}$/.test(t)).test("required","Phone Number is required",t=>!(t===null||t==="")),mobile_number:d().required("Mobile Number is required").matches(/^[0-9]{10}$/,"Mobile Number must be a 10-digit number").test("required","Mobile Number is required",t=>!!t).test("format","Mobile Number must be a 10-digit number",t=>t?/^[0-9]{10}$/.test(t):!0),email:d().required("Email is required").email("Enter a valid email").test("required","Email is required",t=>!!t),website:d().nullable().url("Please enter a valid website URL").test("required","Website URL is required",t=>!!t),logo:C().nullable().test("fileSize","Logo file is too large",t=>t&&t instanceof File?t.size<=2e6:!0).test("fileType","Unsupported logo format",t=>t&&t instanceof File?["image/jpeg","image/png","image/gif"].includes(t.type):!0).test("required","Logo is required",t=>u?!0:!!t),registration_number:d().nullable().test("required","Registration Number is required",t=>!!t),registration_date:z().nullable().required("Please select the registration date").typeError("Please select the registration date").max(new Date,"Registration Date cannot be in the future"),gstin:d().nullable().test("required","GSTIN is required",t=>!!t),company_ownedby:d().nullable().test("required","Company Owned By is required",t=>!(t===null||t==="")).test("format","Company Owned By must be a number",t=>t===null||t===""?!0:/^[0-9]+$/.test(t)),contract_document:C().nullable().test("fileSize","File is too large",t=>t&&t instanceof File?t.size<=5e6:!0).test("fileType","Unsupported file format",t=>t&&t instanceof File?["application/pdf"].includes(t.type):!0)}),W=()=>{const{addCompany:u,loading:t}=k(),{updateCompany:N,loading:y}=I(),{id:m}=A(),s=Number(m),{company:a,fetchCompany:p}=U(),n=P(),[r,f]=x.useState({company_name:"",address:"",city:"",state:"",zip_code:"",company_owner_name:"",phone_number:"",mobile_number:"",email:"",website:"",logo:"",registration_number:"",registration_date:"",gstin:"",company_ownedby:null,contract_document:null}),[j,w]=x.useState({company_name:"",address:"",city:"",state:"",zip_code:"",company_owner_name:"",phone_number:"",mobile_number:"",email:"",website:"",logo:"",registration_number:"",registration_date:"",gstin:"",company_ownedby:null,contract_document:null}),[o,q]=x.useState({});x.useEffect(()=>{(async()=>{await p(s)})()},[s]),x.useEffect(()=>{if(a){const l={company_name:a.company_name,address:a.address,city:a.city,state:a.state,zip_code:a.zip_code,company_owner_name:a.company_owner_name,phone_number:a.phone_number,mobile_number:a.mobile_number,email:a.email,website:a.website,logo:a.logo,registration_number:a.registration_number,registration_date:a.registration_date,gstin:a.gstin,company_ownedby:a.company_ownedby,contract_document:a.contract_document};f(l),w(l)}},[a]);const i=l=>{const{name:b,value:g,type:c,files:_}=l.target;f(S=>({...S,[b]:c==="file"?_:g}))},F=l=>{f(b=>({...b,registration_date:l?l.format("MM-DD-YYYY"):""}))},v=async l=>{l.preventDefault();try{if(await B(!!s).validate(r,{abortEarly:!1}),!Object.keys(r).some(_=>_==="logo"?r.logo instanceof File||r.logo!==j.logo:r[_]!==j[_])){n("/branches");return}let c;s?c=await N(s,r):c=await u(r),c&&n("/companies")}catch(b){if(b instanceof R){const g={};b.inner.forEach(c=>{g[c.path]=c.message}),q(g)}else h.error("Failed to submit the form. Please try again.")}},D=()=>{n("/companies")};return e.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:s?"Edit Company":"Add Company"}),e.jsxs("form",{onSubmit:v,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"company_name",children:"Company Name"}),e.jsx("input",{type:"text",id:"company_name",name:"company_name",value:r.company_name,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.company_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"address",children:"Address"}),e.jsx("input",{type:"text",id:"address",name:"address",value:r.address,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.address||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"city",children:"City"}),e.jsx("input",{type:"text",id:"city",name:"city",value:r.city,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.city||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"state",children:"State"}),e.jsx("input",{type:"text",id:"state",name:"state",value:r.state,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.state||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"zip_code",children:"Zip Code"}),e.jsx("input",{type:"text",id:"zip_code",name:"zip_code",value:r.zip_code,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.zip_code||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"company_owner_name",children:"Company Owner Name"}),e.jsx("input",{type:"text",id:"company_owner_name",name:"company_owner_name",value:r.company_owner_name,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.company_owner_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"phone_number",children:"Phone Number"}),e.jsx("input",{type:"text",id:"phone_number",name:"phone_number",value:r.phone_number,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.phone_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"mobile_number",children:"Mobile Number"}),e.jsx("input",{type:"text",id:"mobile_number",name:"mobile_number",value:r.mobile_number,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.mobile_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"email",children:"Email"}),e.jsx("input",{type:"text",id:"email",name:"email",value:r.email,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.email||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"website",children:"Website"}),e.jsx("input",{type:"text",id:"website",name:"website",value:r.website,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.website||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"logo",children:"Logo"}),e.jsx("input",{type:"file",id:"logo",name:"logo",accept:"image/*",onChange:i,className:"border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.logo||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"registration_number",children:"Registration Number"}),e.jsx("input",{type:"text",id:"registration_number",name:"registration_number",value:r.registration_number,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.registration_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"registration_date",children:"Registration Date"}),e.jsx(O,{dateAdapter:$,children:e.jsx(L,{value:r.registration_date?M(r.registration_date):null,onChange:F,format:"DD-MM-YYYY",renderInput:l=>e.jsx("input",{...l,id:"registration_date",name:"registration_date",className:"input border border-gray-300 rounded-md p-2"})})}),e.jsx("p",{className:"text-red-500 text-sm",children:o.registration_date||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"gstin",children:"GSTIN"}),e.jsx("input",{type:"text",id:"gstin",name:"gstin",value:r.gstin,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.gstin||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"company_ownedby",children:"Company owned by"}),e.jsxs("select",{className:"select border border-gray-300 rounded-md p-2 w-full text-sm",id:"company_ownedby",value:r.company_ownedby??"",onChange:l=>f({...r,company_ownedby:Number(l.target.value)}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Ownership"}),e.jsx("option",{value:1,children:"Own"}),e.jsx("option",{value:2,children:"Other Company"})]}),e.jsx("p",{className:"w-full text-red-500 text-sm",children:o.company_ownedby||" "})]}),r.company_ownedby===2&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"contract_document",children:"Contract Document"}),e.jsx("input",{type:"file",id:"contract_document",name:"contract_document",accept:".pdf,.doc,.docx",onChange:i,className:"border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.contract_document||" "})]})]}),e.jsxs("div",{className:"flex justify-start mt-6",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-4",disabled:t||y,children:s?"Update Company":"Add Company"}),e.jsx("button",{type:"button",onClick:D,className:"btn btn-secondary",children:"Cancel"})]})]})]})};export{W as default};
