import{r as a,c as E,V as p,j as e,a as Z,b as L,d as ee,G as M,u as te,e as G,T as ae,F as se,f as re,P as ne,s as oe}from"./index-B8RoWQko.js";import{S as k}from"./sweetalert2.esm.all-B0Dix5B2.js";import{u as ce}from"./useGetCategories-C0NdG2Py.js";const le="http://3.110.208.70:3000/admin/categories",ie=()=>{const[n,c]=a.useState(!1);return{addCategory:async i=>{const s=localStorage.getItem("authToken");c(!0);try{const o=await fetch(le,{method:"POST",headers:{"Content-Type":"application/json",Authorization:s?`Bearer ${s}`:""},body:JSON.stringify({name:i})});if(!o.ok){const u=(await o.json()).message||"Failed to add category.";return E.error(u,{position:"top-center"}),{success:!1}}const r=await o.json();return E.success(r.message||"Category added successfully!",{position:"top-center"}),{success:!0}}catch(o){return o.name==="TypeError"&&o.message.includes("Failed to fetch")?E.error("Network error: Failed to fetch.",{position:"top-center"}):E.error("An unexpected error occurred.",{position:"top-center"}),{success:!1}}finally{c(!1)}},loading:n}},de=n=>{const[c,d]=a.useState(!1),[i,s]=a.useState([]);return a.useEffect(()=>{(async()=>{var u;if(!n){s(null);return}const r=localStorage.getItem("authToken"),l=`http://3.110.208.70:3000/admin/categories/${n}`;d(!0);try{const g=await fetch(l,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(!g.ok){const f=await g.json();p.error(f.message,{position:"top-center"}),d(!1);return}const h=await g.json();s((u=h==null?void 0:h.data)==null?void 0:u.result)}catch(g){p.error((g==null?void 0:g.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{d(!1)}})()},[n]),{category:i,loading:c}},me=()=>{const[n,c]=a.useState(!1),d=localStorage.getItem("authToken");return{deleteCategory:async s=>{c(!0);const o=`http://3.110.208.70:3000/admin/categories/${s}`;try{const r=await fetch(o,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`}}),l=await r.json();return r.ok?{success:!0,message:l.message}:(p.error(l.message,{position:"top-center"}),{success:!1,message:l.message})}catch(r){return p.error("An error occurred while deleting the category.",{position:"top-center"}),{success:!1,message:r.message}}finally{c(!1)}},loading:n}},ue=()=>{const[n,c]=a.useState(!1);return{updateCategory:async(i,s)=>{c(!0);const o=`http://3.110.208.70:3000/admin/categories/${i}`;try{const r=await fetch(o,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("authToken")}`},body:JSON.stringify({name:s})});if(r.ok){const l=await r.json();return p.success(l.message,{position:"top-center"}),!0}else{const l=await r.json();return p.error(l.message,{position:"top-center"}),!1}}catch(r){return p.error(r.message,{position:"top-center"}),!1}finally{c(!1)}},loading:n}},ge=Z().shape({name:ee().required("Category name is required").max(30,"Maximum length of 30 characters exceeded")}),he=({isOpen:n,onClose:c,setIsSubmit:d})=>{const{addCategory:i,loading:s}=ie(),[o,r]=a.useState({name:""}),[l,u]=a.useState({});a.useEffect(()=>{n&&(r({name:""}),u({}))},[n]);const g=async h=>{h.preventDefault();try{await ge.validate(o,{abortEarly:!1}),await i(o.name),d(!0),c()}catch(f){if(f instanceof L){const b={};f.inner.forEach(x=>{x.path&&(b[x.path]=x.message)}),u(b)}else p.error("Failed to submit the form. Please try again.")}};return n&&e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:c}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg min-w-96 z-10 zx:min-w-[85%] relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:c,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h1",{className:"text-2xl font-bold mb-6",children:"Add Category"}),e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"flex flex-col mb-4",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",autoComplete:"off",value:o.name,onChange:h=>r({...o,name:h.target.value}),className:"input border border-gray-300 rounded-md p-2",disabled:s}),e.jsx("p",{className:"text-red-500 text-sm",children:l.name||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${s?"opacity-50 cursor-not-allowed":""}`,disabled:s,children:s?"Adding...":"Add Category"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:c,disabled:s,children:"Cancel"})]})]})]})]})};function pe(n){return M({attr:{version:"1.1",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"},child:[]}]})(n)}function fe(n){return M({attr:{version:"1.1",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"},child:[]}]})(n)}const xe=({isSubmit:n,setIsSubmit:c})=>{const[d,i]=a.useState(1),[s,o]=a.useState(10),[r,l]=a.useState(null),[u,g]=a.useState(),[h,f]=te(),b=h.get("page"),x=h.get("perPage"),[S,T]=a.useState(null),[v,P]=a.useState(""),[j,$]=a.useState(""),[D,O]=a.useState(""),[R,I]=a.useState(""),{categories:C,count:F,fetchCategories:w,loading:U}=ce(d,s,j,r,u),{category:N}=de(S),{deleteCategory:Y}=me(),{updateCategory:q}=ue(),{hasPermission:y}=G(),V=Math.ceil(F/s);a.useEffect(()=>{n&&(w(),c(!1))},[n,w]),a.useEffect(()=>{N&&P(N.name||"")},[N]);const J=t=>{T(t)},_=async()=>{if(v.trim()===""){p.error("Category name cannot be empty.",{position:"top-center"});return}if(N&&v===N.name){A();return}try{await q(S,v)&&(A(),w())}catch{p.error("An error occurred while updating the category.",{position:"top-center"})}},A=()=>{T(null),P("")},K=async t=>{try{const{isConfirmed:m}=await k.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(m){const{success:X,message:B}=await Y(t);X?(await w(),k.fire(B)):k.fire(B)}}catch(m){k.fire({title:"Error",text:m.message||"An unexpected error occurred",icon:"error"})}};a.useEffect(()=>{b&&i(Number(b)),x&&o(Number(x))},[b,x]),a.useEffect(()=>{j&&(i(1),f({search:j,page:"1",perPage:s.toString()}))},[j]);const H=async t=>{t.preventDefault();try{await oe.validate({search:j},{abortEarly:!1}),$(D),I("")}catch(m){m instanceof L&&I(m.errors[0])}},z=t=>{r===t?g(u==="ASC"?"DESC":"ASC"):(l(t),g("ASC"))},Q=t=>{t>=1&&t<=V&&(i(t),f({page:t.toString(),perPage:s.toString()}))},W=t=>{const m=Number(t.target.value);o(m),i(1),f({page:"1",perPage:m.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:s,onChange:W,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:H,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:D,onChange:t=>{O(t.target.value),t.target.value===""&&$("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:R||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${r==="category_id"?u==="ASC"?"asc":"desc":""}`,onClick:()=>z("category_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[780px]",children:e.jsxs("span",{className:`sort ${r==="name"?u==="ASC"?"asc":"desc":""}`,onClick:()=>z("name"),children:[e.jsx("span",{className:"sort-label",children:"Category name"}),e.jsx("span",{className:"sort-icon"})]})}),(y(5,"update")||y(5,"delete"))&&e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),U?e.jsx(ae,{}):C.length>0?e.jsx("tbody",{children:C.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:t.category_id})}),e.jsx("td",{children:S===t.category_id?e.jsx("input",{type:"text",className:"border border-gray-300 p-2 rounded-md focus:outline-none",value:v,onChange:m=>P(m.target.value),onKeyPress:m=>{m.key==="Enter"&&_()}}):t.name}),(y(5,"update")||y(5,"delete"))&&e.jsx("td",{children:S===t.category_id?y(5,"update")&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:_,"aria-label":"Save",children:e.jsx(fe,{color:"green"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:A,"aria-label":"Cancel",children:e.jsx(pe,{color:"red"})})]}):e.jsxs(e.Fragment,{children:[y(5,"update")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>J(t.category_id),"aria-label":"Edit",children:e.jsx(se,{className:"text-yellow-600"})}),y(5,"delete")&&e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>K(t.category_id),"aria-label":"Delete",children:e.jsx(re,{className:"text-red-500"})})]})})]},t.category_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No Category available"})})})]})}),e.jsx(ne,{count:F,currentPage:d,totalRecords:C==null?void 0:C.length,perPage:s,onPageChange:Q,label:"category"})]})})]})},Ce=()=>{const[n,c]=a.useState(!1),[d,i]=a.useState(!1),[s,o]=a.useState(!1),{hasPermission:r}=G(),l=()=>{i(!1),c(!0)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Category"})}),r(5,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:l,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Category"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(xe,{isSubmit:s,setIsSubmit:o})})})}),e.jsx(he,{setIsSubmit:o,isOpen:n,onClose:()=>c(!1)})]})};export{Ce as default};
