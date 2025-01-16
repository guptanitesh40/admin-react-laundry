import{r as a,_ as k,u as J,j as e,F as Y,b as Q,d as X,e as Z,V as L,c as ee,a as T,q as se}from"./index-C5KUhj60.js";import{T as ae}from"./TableShimmer-qrbQMXRo.js";import{u as te}from"./useGetWorkshops-CUcUcPMc.js";import{S as F}from"./sweetalert2.esm.all-DwEdJQJv.js";import{M as re}from"./MultiSelect-B9aRLnRh.js";import{u as q}from"./useGetUsersByRole-ywOvrRPO.js";import{s as oe}from"./searchSchema-vzUQ_umg.js";import{M as ne}from"./index-zkj-3RQM.js";import"./orderStatusClasses-DgGpuqsn.js";const le=()=>{const[m,r]=a.useState(!1),[j,o]=a.useState(null);return{workshop:j,loading:m,fetchWorkshop:async n=>{var f;if(!n){o(null);return}const l=localStorage.getItem("authToken"),h=`http://35.154.167.170:3000/workshops/${n}`;r(!0);try{const x=await fetch(h,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`}}),g=await x.json();if(!x.ok){k.error(g.message,{position:"top-center"}),r(!1);return}o((f=g==null?void 0:g.data)==null?void 0:f.result)}catch{k.error("Network error: Failed to fetch workshops.")}finally{r(!1)}}}},ie="http://35.154.167.170:3000/workshops",ce=()=>{const[m,r]=a.useState(!1);return{addWorkshop:async o=>{const t=localStorage.getItem("authToken");r(!0);try{const n=await fetch(ie,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify(o)}),l=await n.json();return n.ok?(k.success(l.message,{position:"top-center"}),!0):(k.error(l.message,{position:"top-center"}),!1)}catch{return k.error("Error adding workshop",{position:"top-center"}),!1}finally{r(!1)}},loading:m}},de=()=>{const[m,r]=a.useState(!1);return{deleteWorkshop:async o=>{r(!0);const t=`http://35.154.167.170:3000/workshops/${o}`,n=localStorage.getItem("authToken");try{const l=await fetch(t,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}}),h=await l.json();return l.ok?{success:!0,message:h.message}:(k.error(h.message,{position:"top-center"}),{success:!1,message:h.message})}catch(l){return{success:!1,message:l.message}}finally{r(!1)}},loading:m}},me=()=>{const[m,r]=a.useState(!1);return{updateWorkshop:async(o,t)=>{const n=localStorage.getItem("authToken"),l=`http://35.154.167.170:3000/workshops/${o}`;r(!0);try{const h=await fetch(l,{method:"PUT",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify(t)}),f=await h.json();return h.ok?(k.success(f.message,{position:"top-center"}),!0):(k.error(f.message,{position:"top-center"}),!1)}catch(h){return k.error(h.message||"Error Updating workshop",{position:"top-center"}),!1}finally{r(!1)}},loading:m}},he=({isSubmit:m,setIsSubmit:r,setUpdateWorkshop:j})=>{const{deleteWorkshop:o}=de(),[t,n]=a.useState(1),[l,h]=a.useState(10),[f,x]=J(),[g,y]=a.useState(null),[u,E]=a.useState(null),[i,b]=a.useState(""),[P,$]=a.useState(""),[A,M]=a.useState(""),N=f.get("page"),v=f.get("perPage"),[U,c]=a.useState([]),[p,w]=a.useState([]),{fetchUsersByRole:_}=q(),{workshops:W,totalWorkshops:R,loading:z,fetchWorkshops:I}=te(t,l,i,g,u,p),D=Math.ceil(R/l);a.useEffect(()=>{(async()=>{m&&(I(),r(!1))})()},[m]),a.useEffect(()=>{(async()=>{const d=await _(6);if(d){const B=d.map(S=>({label:`${S.first_name} ${S.last_name} (${S.mobile_number})`,value:S.user_id}));c(B)}})()},[]),a.useEffect(()=>{N&&n(Number(N)),v&&h(Number(v))},[N,v]),a.useEffect(()=>{i&&(n(1),x({search:i,page:"1",perPage:l.toString()}))},[i]);const V=async s=>{s.preventDefault();try{await oe.validate({search:i},{abortEarly:!1}),b(P),M("")}catch(d){d instanceof L&&M(d.errors[0])}},G=async s=>{try{const{isConfirmed:d}=await F.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(d){const{success:B,message:S}=await o(s);B?(W.filter(K=>K.workshop_id!==s).length===0&&t>1&&(n(t-1),x({page:(t-1).toString(),perPage:l.toString()})),await I(),F.fire(S)):F.fire(S)}}catch(d){F.fire({title:"Error",text:d.message,icon:"error"})}},C=s=>{g===s?E(u==="ASC"?"DESC":"ASC"):(y(s),E("ASC"))},O=s=>{s>=1&&s<=D&&(n(s),x({page:s.toString(),perPage:l.toString()}))},H=s=>{const d=Number(s.target.value);h(d),n(1),x({page:"1",perPage:d.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex flex-wrap items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:l,onChange:H,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsx("div",{className:"flex flex-wrap gap-2.5",children:e.jsx(re,{options:U,displayValue:"label",placeholder:"Search Workshop Manager",selectedValues:p,onSelect:s=>w(s.map(d=>d.value)),onRemove:s=>w(s.map(d=>d.value)),className:"w-[300px]"})}),e.jsxs("div",{className:"flex",children:[e.jsx("form",{onSubmit:V,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:P,onChange:s=>{$(s.target.value),s.target.value===""&&b("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:A||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsxs("th",{className:"min-w-[90px]",children:[e.jsxs("span",{className:`sort ${g==="workshop_id"?u==="ASC"?"asc":"desc":""}`,onClick:()=>C("workshop_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})," "]}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${g==="workshop_name"?u==="ASC"?"asc":"desc":""}`,onClick:()=>C("workshop_name"),children:[e.jsx("span",{className:"sort-label",children:"Workshop name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:"Workshop manager"}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${g==="address"?u==="ASC"?"asc":"desc":""}`,onClick:()=>C("address"),children:[e.jsx("span",{className:"sort-label",children:"Address"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${g==="email"?u==="ASC"?"asc":"desc":""}`,onClick:()=>C("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[155px]",children:e.jsxs("span",{className:`sort ${g==="mobile_number"?u==="ASC"?"asc":"desc":""}`,onClick:()=>C("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),z?e.jsx(ae,{}):(W==null?void 0:W.length)>0?e.jsx("tbody",{children:W.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:s.workshop_id}),e.jsx("td",{children:s.workshop_name}),e.jsx("td",{children:s.workshop_managers.map(d=>d.full_name).join(", ")}),e.jsx("td",{children:s.address}),e.jsx("td",{children:s.email}),e.jsx("td",{children:s.mobile_number}),e.jsxs("td",{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>j(s.workshop_id),children:e.jsx(Y,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>G(s.workshop_id),children:e.jsx(Q,{className:"text-red-500"})})]})]},s.workshop_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Workshop available"})})})]})})}),R>l&&e.jsxs("div",{className:"flex items-center gap-4 mt-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",W.length," of ",R," Branches"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:t===1,onClick:()=>O(t-1),className:`btn ${t===1?"disabled":""}`,children:e.jsx(X,{})}),Array.from({length:D}).map((s,d)=>e.jsx("button",{className:`btn ${t===d+1?"active":""}`,onClick:()=>O(d+1),children:d+1},d)),e.jsx("button",{disabled:t===D,onClick:()=>O(t+1),className:`btn ${t===D?"disabled":""}`,children:e.jsx(Z,{})})]})]})]})},pe=ee().shape({workshop_name:T().required("Workshop name is required"),address:T().required("Workshop address is required"),email:T().email("Enter a valid email"),mobile_number:T().matches(/^\d{10}$/,"Mobile number must be 10 digits").required("Mobile number is required"),workshop_managers_ids:se().min(1,"Please select at least workshop manager").required("Please select workshop manager")}),ue=({isOpen:m,onClose:r,setIsSubmit:j,workshop_id:o})=>{const t={workshop_name:"",email:"",address:"",mobile_number:"",workshop_managers_ids:[]},{users:n,fetchUsersByRole:l,loading:h}=q(),{addWorkshop:f,loading:x}=ce(),{updateWorkshop:g,loading:y}=me(),{workshop:u,fetchWorkshop:E}=le(),[i,b]=a.useState(t),[P,$]=a.useState(t),[A,M]=a.useState([]),[N,v]=a.useState({});a.useEffect(()=>{if(n){const c=n.map(p=>({workshop_manager_id:p.user_id,workshop_manager_name:`${p.first_name} ${p.last_name}`}));M(c)}},[n]),a.useEffect(()=>{m&&(async()=>l(6))(),m&&o&&E(o)},[m,o]),a.useEffect(()=>{if(m&&u&&o){const c={workshop_name:u.workshop_name,address:u.address,email:u.email,mobile_number:u.mobile_number,workshop_managers_ids:u.workshopManagerMappings.map(p=>p.user_id)};b(c),$(c)}else b(t),$(t),v({})},[m,u,o]);const U=async c=>{c.preventDefault();try{if(await pe.validate(i,{abortEarly:!1}),!Object.keys(i).some(_=>i[_]!==P[_])){r();return}const w={...i,user_ids:i.workshop_managers_ids};o?await g(o,w):await f(w),j(!0),r()}catch(p){if(p instanceof L){const w={};p.inner.forEach(_=>{w[_.path||""]=_.message}),v(w)}else k.error("Failed to submit the form. Please try again.")}};return m?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:r}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-[480px] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:r,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h1",{className:"text-2xl font-bold mb-6",children:o?"Update Workshop":"Add Workshop"}),e.jsx("form",{onSubmit:U,children:e.jsxs("div",{className:"grid grid-cols-1 gap-3",children:[e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{htmlFor:"workshop_name",className:"mb-1 block text-gray-700 font-semibold",children:"Workshop name"}),e.jsx("input",{type:"text",id:"workshop_name",name:"workshop_name",value:i.workshop_name||"",onChange:c=>b({...i,workshop_name:c.target.value}),className:"input border border-gray-300 rounded-md p-2 w-full"}),e.jsx("p",{className:"text-red-500 text-sm",children:N.workshop_name||" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{htmlFor:"address",className:"mb-1 block text-gray-700 font-semibold",children:"Address"}),e.jsx("textarea",{id:"address",name:"address",value:i.address,onChange:c=>b({...i,address:c.target.value}),className:"input border border-gray-300 rounded-md p-2 w-full"}),e.jsx("p",{className:"text-red-500 text-sm",children:N.address||" "})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"mobile_number",className:"mb-1 block text-gray-700 font-semibold",children:"Mobile Number"}),e.jsx("input",{type:"text",id:"mobile_number",name:"mobile_number",value:i.mobile_number,onChange:c=>b({...i,mobile_number:c.target.value}),className:"input border border-gray-300 rounded-md p-2 w-full"}),e.jsx("p",{className:"text-red-500 text-sm",children:N.mobile_number||" "})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"mb-1 block text-gray-700 font-semibold",children:"Email"}),e.jsx("input",{type:"text",id:"email",name:"email",value:i.email||"",onChange:c=>b({...i,email:c.target.value}),className:"input border border-gray-300 rounded-md p-2 w-full"}),e.jsx("p",{className:"text-red-500 text-sm",children:N.email||" "})]})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-1 block text-gray-700 font-semibold",children:"Workshop manager"}),e.jsx(ne,{options:A,displayValue:"workshop_manager_name",selectedValues:i.workshop_managers_ids?A.filter(c=>i.workshop_managers_ids.includes(c.workshop_manager_id)):[],isObject:!0,onSelect:c=>{b({...i,workshop_managers_ids:c.map(p=>p.workshop_manager_id)})},onRemove:c=>{b({...i,workshop_managers_ids:c.map(p=>p.workshop_manager_id)})}}),e.jsx("p",{className:"text-red-500 text-sm",children:N.workshop_managers_ids||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${x||y?"opacity-50 cursor-not-allowed":""}`,disabled:x||y,children:x||y?x?"Adding...":"Updating...":o?"Update Workshop":"Add Workshop"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:r,disabled:x||y,children:"Cancel"})]})]})})]})]}):null},ye=()=>{const[m,r]=a.useState(!1),[j,o]=a.useState(null),[t,n]=a.useState(!1),l=()=>{r(!0),o(null)},h=f=>{o(f),r(!0)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Workshop"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:l,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Workshop"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(he,{isSubmit:t,setIsSubmit:n,setUpdateWorkshop:h})})})}),e.jsx(ue,{isOpen:m,onClose:()=>r(!1),setIsSubmit:n,workshop_id:j})]})};export{ye as default};
