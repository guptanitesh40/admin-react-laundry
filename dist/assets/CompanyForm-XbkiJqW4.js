import{r as f,V as _,a as P,g as C,d,p as E,m as S,h as L,j as e,i as A,b as z}from"./index-DmrRugRi.js";import{u as O}from"./useGetCompany-rgQJU0gY.js";import{au as R,av as U}from"./AdapterDayjs-C-K34wye.js";import{D as T}from"./DatePicker-BpKncnNS.js";const $="http://3.110.208.70:3000",Y=`${$}/companies`,I=()=>{const[h,t]=f.useState(!1);return{addCompany:async m=>{const c=localStorage.getItem("authToken");t(!0);try{const s=new FormData;Object.entries(m).forEach(([n,r])=>{r&&(r instanceof FileList?s.append(n,r[0]):s.append(n,r))});const a=await fetch(Y,{method:"POST",headers:{Authorization:`Bearer ${c}`},body:s});if(!a.ok){const n=await a.json();return _.error(n.message,{position:"top-center"}),!1}const y=await a.json();return _.success(y.message,{position:"top-center"}),!0}catch(s){return _.error((s==null?void 0:s.message)||"Network error: Failed to fetch.",{position:"top-center"}),!1}finally{t(!1)}},loading:h}},M=()=>{const[h,t]=f.useState(!1);return{updateCompany:async(m,c)=>{const s=localStorage.getItem("authToken"),a=`http://3.110.208.70:3000/companies/${m}`,y=new FormData;for(const n in c)c[n]&&(n==="logo"||n==="contract_document"?c[n]instanceof FileList&&c[n].length>0&&y.append(n,c[n][0]):y.append(n,c[n]));t(!0);try{const n=await fetch(a,{method:"PUT",headers:{Authorization:`Bearer ${s}`},body:y});if(n.ok){const x=await n.json();return _.success(x.message,{position:"top-center"}),!0}const r=await n.json();return _.error(r.message,{position:"top-center"}),!1}catch(n){return _.error(n.message,{position:"top-center"}),!1}finally{t(!1)}},loading:h}},G=(h=!1)=>P().shape({company_name:d().required("Company name is required").test("required","Company name is required",t=>!!t),address:d().required("Address is required").test("required","Address is required",t=>!!t),city:d().required("City is required").test("required","City is required",t=>!!t),state:d().required("State is required").test("required","State is required",t=>!!t),zip_code:d().test("required","Zip Code is required",t=>!(t===null||t==="")).test("format","Zip Code must be a 6 digit number",t=>t===null||t===""?!0:/^[0-9]{6}$/.test(t)),company_owner_name:d().required("Company Owner Name is required").test("required","Company Owner Name is required",t=>!!t),phone_number:d().nullable().test("required","Please add phone number",t=>!(t===null||t==="")).test("is-numeric","Phone number must be a positive number",t=>t?/^[0-9+\-\s()]{5,15}$/.test(t):!0).test("length","Phone number must be between 5 to 15 long",t=>t?t.length>=5&&t.length<=15:!0),mobile_number:d().nullable().test("is-numeric","Phone number must be a positive number",t=>t?/^[0-9+\-\s()]{5,15}$/.test(t):!0).test("length","Phone number must be between 5 to 15 long",t=>t?t.length>=5&&t.length<=15:!0),email:d().required("Email is required").email("Enter a valid email").test("required","Email is required",t=>!!t),website:d().nullable().url("Please enter a valid website URL").test("required","Website URL is required",t=>!!t),logo:C().nullable().test("required","Logo is required",t=>h?!0:!!t).test("fileType","Allowed Format : jpg, jpeg, png, ",t=>t&&t instanceof File?["image/jpeg","image/png","image/jpg"].includes(t.type):!0).test("dimensions","Logo must be 92×92 pixels",t=>!t||!(t instanceof File)?!0:new Promise(j=>{const m=new Image;m.src=URL.createObjectURL(t),m.onload=()=>{URL.revokeObjectURL(m.src),j(m.width===92&&m.height===92)},m.onerror=()=>{j(!1)}})),registration_number:d().nullable().test("required","Registration Number is required",t=>!!t),registration_date:E().nullable().required("Please select the registration date").typeError("Please select the registration date").max(new Date,"Registration Date cannot be in the future"),gstin:d().nullable().test("required","GSTIN is required",t=>!!t),company_ownedby:d().nullable().test("required","Company Owned By is required",t=>!(t===null||t==="")).test("format","Company Owned By must be a number",t=>t===null||t===""?!0:/^[0-9]+$/.test(t)),contract_document:C().nullable().test("fileSize","File is too large",t=>t&&t instanceof File?t.size<=5e6:!0).test("fileType","Unsupported file format",t=>t&&t instanceof File?["application/pdf"].includes(t.type):!0)}),V=()=>{const{addCompany:h,loading:t}=I(),{updateCompany:j,loading:m}=M(),{id:c}=S(),s=Number(c),{company:a,fetchCompany:y}=O(),n=L(),[r,x]=f.useState({company_name:"",address:"",city:"",state:"",zip_code:"",company_owner_name:"",phone_number:"",mobile_number:"",email:"",website:"",logo:"",registration_number:"",registration_date:"",gstin:"",company_ownedby:null,contract_document:null}),[w,q]=f.useState({company_name:"",address:"",city:"",state:"",zip_code:"",company_owner_name:"",phone_number:"",mobile_number:"",email:"",website:"",logo:"",registration_number:"",registration_date:"",gstin:"",company_ownedby:null,contract_document:null}),[o,F]=f.useState({});f.useEffect(()=>{(async()=>{await y(s)})()},[s]),f.useEffect(()=>{if(a){const l={company_name:a.company_name,address:a.address,city:a.city,state:a.state,zip_code:a.zip_code,company_owner_name:a.company_owner_name,phone_number:a.phone_number,mobile_number:a.mobile_number,email:a.email,website:a.website,logo:a.logo,registration_number:a.registration_number,registration_date:a.registration_date,gstin:a.gstin,company_ownedby:a.company_ownedby,contract_document:a.contract_document};x(l),q(l)}},[a]);const i=l=>{const u=l.target;if(u instanceof HTMLInputElement){const{name:g,value:p,files:b}=u;g==="image"&&b&&b.length>0?x(N=>({...N,logo:b[0]})):x(N=>({...N,[g]:p}))}else if(u instanceof HTMLTextAreaElement){const{name:g,value:p}=u;x(b=>({...b,[g]:p}))}},v=l=>{x(u=>({...u,registration_date:l?l.format("MM-DD-YYYY"):""}))},k=async l=>{l.preventDefault();try{if(await G(!!s).validate(r,{abortEarly:!1}),!Object.keys(r).some(b=>b==="logo"?r.logo instanceof File||r.logo!==w.logo:r[b]!==w[b])){n("/companies");return}let p;s?p=await j(s,r):p=await h(r),p&&n("/companies")}catch(u){if(u instanceof z){const g={};u.inner.forEach(p=>{g[p.path]=p.message}),F(g)}else _.error("Failed to submit the form. Please try again.")}},D=()=>{n("/companies")};return e.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:s?"Edit Company":"Add Company"}),e.jsxs("form",{onSubmit:k,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"company_name",children:"Company name"}),e.jsx("input",{type:"text",id:"company_name",name:"company_name",value:r.company_name,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.company_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"address",children:"Address"}),e.jsx("input",{type:"text",id:"address",name:"address",value:r.address,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.address||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"city",children:"City"}),e.jsx("input",{type:"text",id:"city",name:"city",value:r.city,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.city||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"state",children:"State"}),e.jsx("input",{type:"text",id:"state",name:"state",value:r.state,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.state||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"zip_code",children:"Zip code"}),e.jsx("input",{type:"text",id:"zip_code",name:"zip_code",value:r.zip_code,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.zip_code||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"company_owner_name",children:"Company owner name"}),e.jsx("input",{type:"text",id:"company_owner_name",name:"company_owner_name",value:r.company_owner_name,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.company_owner_name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"phone_number",children:"Phone number 1"}),e.jsx("input",{type:"text",id:"phone_number",name:"phone_number",value:r.phone_number,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.phone_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"mobile_number",children:"Phone number 2"}),e.jsx("input",{type:"text",id:"mobile_number",name:"mobile_number",value:r.mobile_number,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.mobile_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"email",children:"Email"}),e.jsx("input",{type:"text",id:"email",name:"email",value:r.email,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.email||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"website",children:"Website"}),e.jsx("input",{type:"text",id:"website",name:"website",value:r.website,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.website||" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"image",children:"Logo"}),e.jsx("span",{className:"text-sm text-gray-600",children:"(JPG, JPEG, PNG | 92×92 px)"})]}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:i,className:"input border border-gray-300 rounded-md p-2 mt-1"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.logo||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"registration_number",children:"Registration Number"}),e.jsx("input",{type:"text",id:"registration_number",name:"registration_number",value:r.registration_number,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.registration_number||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"registration_date",children:"Registration Date"}),e.jsx(R,{dateAdapter:U,children:e.jsx(T,{value:r.registration_date?A(r.registration_date):null,onChange:v,format:"DD-MM-YYYY",renderInput:l=>e.jsx("input",{...l,id:"registration_date",name:"registration_date",className:"input border border-gray-300 rounded-md p-2"})})}),e.jsx("p",{className:"text-red-500 text-sm",children:o.registration_date||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"gstin",children:"GSTIN"}),e.jsx("input",{type:"text",id:"gstin",name:"gstin",value:r.gstin,onChange:i,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.gstin||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"company_ownedby",children:"Company owned by"}),e.jsxs("select",{className:"select border border-gray-300 rounded-md p-2 w-full text-sm",id:"company_ownedby",value:r.company_ownedby??"",onChange:l=>x({...r,company_ownedby:Number(l.target.value)}),children:[e.jsx("option",{value:"",disabled:!0,children:"Select Ownership"}),e.jsx("option",{value:1,children:"Own"}),e.jsx("option",{value:2,children:"Other Company"})]}),e.jsx("p",{className:"w-full text-red-500 text-sm",children:o.company_ownedby||" "})]}),r.company_ownedby===2&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-gray-700 font-semibold",htmlFor:"contract_document",children:"Contract Document"}),e.jsx("input",{type:"file",id:"contract_document",name:"contract_document",accept:".pdf,.doc,.docx",onChange:i,className:"border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:o.contract_document||" "})]})]}),e.jsxs("div",{className:"flex justify-start mt-6",children:[e.jsx("button",{type:"submit",className:"btn btn-primary mr-4",disabled:t||m,children:s?"Update Company":"Add Company"}),e.jsx("button",{type:"button",onClick:D,className:"btn btn-secondary",children:"Cancel"})]})]})]})};export{V as default};
