import{r as a,c as w,V as f,j as e,a as W,b as M,d as X,G,u as Z,F as ee,e as te,f as ae,g as se}from"./index-B25Ze_f8.js";import{S as k}from"./sweetalert2.esm.all-B0Dix5B2.js";import{u as re}from"./useGetCategories-DSt6iyvc.js";import{s as ne}from"./searchSchema-Cc4XUcmB.js";import{T as oe}from"./TableShimmer-2W1fPkpK.js";const ce="http://35.154.167.170:3000/admin/categories",le=()=>{const[n,c]=a.useState(!1);return{addCategory:async d=>{const s=localStorage.getItem("authToken");c(!0);try{const o=await fetch(ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:s?`Bearer ${s}`:""},body:JSON.stringify({name:d})});if(!o.ok){const u=(await o.json()).message||"Failed to add category.";return w.error(u,{position:"top-center"}),{success:!1}}const r=await o.json();return w.success(r.message||"Category added successfully!",{position:"top-center"}),{success:!0}}catch(o){return o.name==="TypeError"&&o.message.includes("Failed to fetch")?w.error("Network error: Failed to fetch.",{position:"top-center"}):w.error("An unexpected error occurred.",{position:"top-center"}),{success:!1}}finally{c(!1)}},loading:n}},ie=n=>{const[c,l]=a.useState(!1),[d,s]=a.useState([]);return a.useEffect(()=>{(async()=>{var u;if(!n){s(null);return}const r=localStorage.getItem("authToken"),m=`http://35.154.167.170:3000/admin/categories/${n}`;l(!0);try{const g=await fetch(m,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(!g.ok){const p=await g.json();f.error(p.message,{position:"top-center"}),l(!1);return}const h=await g.json();s((u=h==null?void 0:h.data)==null?void 0:u.result)}catch(g){f.error((g==null?void 0:g.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{l(!1)}})()},[n]),{category:d,loading:c}},de=()=>{const[n,c]=a.useState(!1),l=localStorage.getItem("authToken");return{deleteCategory:async s=>{c(!0);const o=`http://35.154.167.170:3000/admin/categories/${s}`;try{const r=await fetch(o,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`}}),m=await r.json();return r.ok?{success:!0,message:m.message}:(f.error(m.message,{position:"top-center"}),{success:!1,message:m.message})}catch(r){return f.error("An error occurred while deleting the category.",{position:"top-center"}),{success:!1,message:r.message}}finally{c(!1)}},loading:n}},me=()=>{const[n,c]=a.useState(!1);return{updateCategory:async(d,s)=>{c(!0);const o=`http://35.154.167.170:3000/admin/categories/${d}`;try{const r=await fetch(o,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("authToken")}`},body:JSON.stringify({name:s})});if(r.ok){const m=await r.json();return f.success(m.message,{position:"top-center"}),!0}else{const m=await r.json();return f.error(m.message,{position:"top-center"}),!1}}catch(r){return f.error(r.message,{position:"top-center"}),!1}finally{c(!1)}},loading:n}},ue=W().shape({name:X().required("Category name is required").max(30,"Maximum length of 30 characters exceeded")}),ge=({isOpen:n,onClose:c,setIsSubmit:l})=>{const{addCategory:d,loading:s}=le(),[o,r]=a.useState({name:""}),[m,u]=a.useState({});a.useEffect(()=>{n&&(r({name:""}),u({}))},[n]);const g=async h=>{h.preventDefault();try{await ue.validate(o,{abortEarly:!1}),await d(o.name),l(!0),c()}catch(p){if(p instanceof M){const b={};p.inner.forEach(x=>{x.path&&(b[x.path]=x.message)}),u(b)}else f.error("Failed to submit the form. Please try again.")}};return n&&e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:c}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg min-w-96 z-10 zx:min-w-[85%] relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:c,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h1",{className:"text-2xl font-bold mb-6",children:"Add Category"}),e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"flex flex-col mb-4",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",value:o.name,onChange:h=>r({...o,name:h.target.value}),className:"input border border-gray-300 rounded-md p-2",disabled:s}),e.jsx("p",{className:"text-red-500 text-sm",children:m.name||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${s?"opacity-50 cursor-not-allowed":""}`,disabled:s,children:s?"Adding...":"Add Category"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:c,disabled:s,children:"Cancel"})]})]})]})]})};function he(n){return G({attr:{version:"1.1",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"},child:[]}]})(n)}function fe(n){return G({attr:{version:"1.1",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"},child:[]}]})(n)}const pe=({isSubmit:n,setIsSubmit:c})=>{const[l,d]=a.useState(1),[s,o]=a.useState(10),[r,m]=a.useState(null),[u,g]=a.useState(),[h,p]=Z(),b=h.get("page"),x=h.get("perPage"),[C,F]=a.useState(null),[N,E]=a.useState(""),[j,D]=a.useState(""),[I,O]=a.useState(""),[R,_]=a.useState(""),{categories:A,totalCategories:T,fetchCategories:S,loading:U}=re(l,s,j,r,u),{category:y}=ie(C),{deleteCategory:Y}=de(),{updateCategory:q}=me(),v=Math.ceil(T/s);a.useEffect(()=>{n&&(S(),c(!1))},[n,S]),a.useEffect(()=>{y&&E(y.name||"")},[y]);const V=t=>{F(t)},z=async()=>{if(N.trim()===""){f.error("Category name cannot be empty.",{position:"top-center"});return}if(y&&N===y.name){P();return}try{await q(C,N)&&(P(),S())}catch{f.error("An error occurred while updating the category.",{position:"top-center"})}},P=()=>{F(null),E("")},J=async t=>{try{const{isConfirmed:i}=await k.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(i){const{success:Q,message:L}=await Y(t);Q?(await S(),k.fire(L)):k.fire(L)}}catch(i){k.fire({title:"Error",text:i.message||"An unexpected error occurred",icon:"error"})}};a.useEffect(()=>{b&&d(Number(b)),x&&o(Number(x))},[b,x]),a.useEffect(()=>{j&&(d(1),p({search:j,page:"1",perPage:s.toString()}))},[j]);const K=async t=>{t.preventDefault();try{await ne.validate({search:j},{abortEarly:!1}),D(I),_("")}catch(i){i instanceof M&&_(i.errors[0])}},B=t=>{r===t?g(u==="ASC"?"DESC":"ASC"):(m(t),g("ASC"))},$=t=>{t>=1&&t<=v&&(d(t),p({page:t.toString(),perPage:s.toString()}))},H=t=>{const i=Number(t.target.value);o(i),d(1),p({page:"1",perPage:i.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:s,onChange:H,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:K,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:I,onChange:t=>{O(t.target.value),t.target.value===""&&D("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:R||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${r==="category_id"?u==="ASC"?"asc":"desc":""}`,onClick:()=>B("category_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[780px]",children:e.jsxs("span",{className:`sort ${r==="name"?u==="ASC"?"asc":"desc":""}`,onClick:()=>B("name"),children:[e.jsx("span",{className:"sort-label",children:"Category name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),U?e.jsx(oe,{}):A.length>0?e.jsx("tbody",{children:A.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:t.category_id})}),e.jsx("td",{children:C===t.category_id?e.jsx("input",{type:"text",className:"border border-gray-300 p-2 rounded-md focus:outline-none",value:N,onChange:i=>E(i.target.value),onKeyPress:i=>{i.key==="Enter"&&z()}}):t.name}),e.jsx("td",{children:C===t.category_id?e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:z,"aria-label":"Save",children:e.jsx(fe,{color:"green"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:P,"aria-label":"Cancel",children:e.jsx(he,{color:"red"})})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>V(t.category_id),"aria-label":"Edit",children:e.jsx(ee,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>J(t.category_id),"aria-label":"Delete",children:e.jsx(te,{className:"text-red-500"})})]})})]},t.category_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No Categories available"})})})]})}),T>s&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",A.length," of ",T," Users"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:l===1,onClick:()=>$(l-1),className:`btn ${l===1?"disabled":""}`,children:e.jsx(ae,{})}),Array.from({length:v}).map((t,i)=>e.jsx("button",{className:`btn ${l===i+1?"active":""}`,onClick:()=>$(i+1),children:i+1},i)),e.jsx("button",{disabled:l===v,onClick:()=>$(l+1),className:`btn ${l===v?"disabled":""}`,children:e.jsx(se,{})})]})]})})]})})]})},Ne=()=>{const[n,c]=a.useState(!1),[l,d]=a.useState(!1),[s,o]=a.useState(!1),r=()=>{d(!1),c(!0)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Category"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:r,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Category"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(pe,{isSubmit:s,setIsSubmit:o})})})}),e.jsx(ge,{setIsSubmit:o,isOpen:n,onClose:()=>c(!1)})]})};export{Ne as default};
