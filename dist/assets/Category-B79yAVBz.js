import{r as a,n as C,_ as x,c as J,a as V,j as e,V as F,u as H,F as K,b as Q,d as W,e as X}from"./index-o3iPDp2a.js";import{S as N}from"./sweetalert2.esm.all-DwEdJQJv.js";import{u as Z}from"./useGetCategories-Bqw22Tk0.js";import{s as ee}from"./searchSchema-DBIwj-sD.js";import{T as te}from"./TableShimmer-B7SA4yOK.js";const ae="http://3.110.208.70:3000/admin/categories",se=()=>{const[l,o]=a.useState(!1);return{addCategory:async i=>{const s=localStorage.getItem("authToken");o(!0);try{const n=await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:s?`Bearer ${s}`:""},body:JSON.stringify({name:i})});if(!n.ok){const u=(await n.json()).message||"Failed to add category.";return C.error(u,{position:"top-center"}),{success:!1}}const r=await n.json();return C.success(r.message||"Category added successfully!",{position:"top-center"}),{success:!0}}catch(n){return n.name==="TypeError"&&n.message.includes("Failed to fetch")?C.error("Network error: Failed to fetch.",{position:"top-center"}):C.error("An unexpected error occurred.",{position:"top-center"}),{success:!1}}finally{o(!1)}},loading:l}},re=l=>{const[o,c]=a.useState(!1),[i,s]=a.useState([]);return a.useEffect(()=>{(async()=>{var u;if(!l){s(null);return}const r=localStorage.getItem("authToken"),d=`http://3.110.208.70:3000/admin/categories/${l}`;c(!0);try{const g=await fetch(d,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(!g.ok){const f=await g.json();x.error(f.message,{position:"top-center"}),c(!1);return}const h=await g.json();s((u=h==null?void 0:h.data)==null?void 0:u.result)}catch(g){x.error((g==null?void 0:g.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{c(!1)}})()},[l]),{category:i,loading:o}},ne=()=>{const[l,o]=a.useState(!1),c=localStorage.getItem("authToken");return{deleteCategory:async s=>{o(!0);const n=`http://3.110.208.70:3000/admin/categories/${s}`;try{const r=await fetch(n,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`}}),d=await r.json();return r.ok?{success:!0,message:d.message}:(x.error(d.message,{position:"top-center"}),{success:!1,message:d.message})}catch(r){return x.error("An error occurred while deleting the category.",{position:"top-center"}),{success:!1,message:r.message}}finally{o(!1)}},loading:l}},oe=()=>{const[l,o]=a.useState(!1);return{updateCategory:async(i,s)=>{o(!0);const n=`http://3.110.208.70:3000/admin/categories/${i}`;try{const r=await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("authToken")}`},body:JSON.stringify({name:s})});if(r.ok){const d=await r.json();return x.success(d.message,{position:"top-center"}),!0}else{const d=await r.json();return x.error(d.message,{position:"top-center"}),!1}}catch(r){return x.error(r.message,{position:"top-center"}),!1}finally{o(!1)}},loading:l}},ce=J().shape({name:V().required("Category name is required").max(30,"Maximum length of 30 characters exceeded")}),le=({isOpen:l,onClose:o,setIsSubmit:c})=>{const{addCategory:i,loading:s}=se(),[n,r]=a.useState({name:""}),[d,u]=a.useState({});a.useEffect(()=>{l&&(r({name:""}),u({}))},[l]);const g=async h=>{h.preventDefault();try{await ce.validate(n,{abortEarly:!1}),await i(n.name),c(!0),o()}catch(f){if(f instanceof F){const j={};f.inner.forEach(p=>{p.path&&(j[p.path]=p.message)}),u(j)}else x.error("Failed to submit the form. Please try again.")}};return l&&e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:o}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-96 z-10 relative",children:[e.jsx("h1",{className:"text-2xl font-bold mb-6",children:"Add Category"}),e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"flex flex-col mb-4",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",value:n.name,onChange:h=>r({...n,name:h.target.value}),className:"input border border-gray-300 rounded-md p-2",disabled:s}),e.jsx("p",{className:"text-red-500 text-sm",children:d.name||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${s?"opacity-50 cursor-not-allowed":""}`,disabled:s,children:s?"Adding...":"Add Category"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:o,disabled:s,children:"Cancel"})]})]})]})]})},ie=({isSubmit:l,setIsSubmit:o})=>{const[c,i]=a.useState(1),[s,n]=a.useState(10),[r,d]=a.useState(null),[u,g]=a.useState(),[h,f]=H(),j=h.get("page"),p=h.get("perPage"),[_,I]=a.useState(null),[de,L]=a.useState(""),[y,A]=a.useState(""),[T,B]=a.useState(""),[O,P]=a.useState(""),{categories:S,totalCategories:v,fetchCategories:w,loading:R}=Z(c,s,y,r,u),{category:E}=re(_),{deleteCategory:z}=ne();oe();const b=Math.ceil(v/s);a.useEffect(()=>{l&&(w(),o(!1))},[l,w]),a.useEffect(()=>{E&&L(E.name||"")},[E]);const M=t=>{I(t)},U=async t=>{try{const{isConfirmed:m}=await N.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(m){const{success:q,message:D}=await z(t);q?(await w(),N.fire(D)):N.fire(D)}}catch(m){N.fire({title:"Error",text:m.message||"An unexpected error occurred",icon:"error"})}};a.useEffect(()=>{j&&i(Number(j)),p&&n(Number(p))},[j,p]),a.useEffect(()=>{y&&(i(1),f({search:y,page:"1",perPage:s.toString()}))},[y]);const G=async t=>{t.preventDefault();try{await ee.validate({search:y},{abortEarly:!1}),A(T),P("")}catch(m){m instanceof F&&P(m.errors[0])}},$=t=>{r===t?g(u==="ASC"?"DESC":"ASC"):(d(t),g("ASC"))},k=t=>{t>=1&&t<=b&&(i(t),f({page:t.toString(),perPage:s.toString()}))},Y=t=>{const m=Number(t.target.value);n(m),i(1),f({page:"1",perPage:m.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsx("div",{className:"justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm mb-2 font-medium",children:e.jsxs("div",{className:"flex items-center gap-2 order-2 md:order-1",children:["Show",e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:s,onChange:Y,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),"per page"]})}),e.jsx("div",{className:"flex flex-wrap gap-2 lg:gap-5",children:e.jsx("div",{className:"flex flex-col",children:e.jsxs("form",{onSubmit:G,className:"flex flex-col",children:[e.jsxs("label",{className:"input input-sm h-10 flex items-center",children:[e.jsx("input",{type:"search",value:T,onChange:t=>{B(t.target.value),t.target.value===""&&A("")},placeholder:"Search category",className:"w-[275px]"}),e.jsx("button",{type:"submit",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]}),e.jsx("p",{className:"text-red-500 text-sm",children:O||" "})]})})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${r==="category_id"?u==="ASC"?"asc":"desc":""}`,onClick:()=>$("category_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${r==="name"?u==="ASC"?"asc":"desc":""}`,onClick:()=>$("name"),children:[e.jsx("span",{className:"sort-label",children:"Category name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"w-[130px]",children:"Actions"})]})}),R?e.jsx(te,{}):S.length>0?e.jsx("tbody",{children:S.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:t.category_id})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:t.name})}),e.jsxs("td",{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>M(t.category_id),children:e.jsx(K,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>U(t.category_id),children:e.jsx(Q,{className:"text-red-500"})})]})]},t.category_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No users available"})})})]})}),v>s&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",S.length," of ",v," Users"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:c===1,onClick:()=>k(c-1),className:`btn ${c===1?"disabled":""}`,children:e.jsx(W,{})}),Array.from({length:b}).map((t,m)=>e.jsx("button",{className:`btn ${c===m+1?"active":""}`,onClick:()=>k(m+1),children:m+1},m)),e.jsx("button",{disabled:c===b,onClick:()=>k(c+1),className:`btn ${c===b?"disabled":""}`,children:e.jsx(X,{})})]})]})})]})})]})},xe=()=>{const[l,o]=a.useState(!1),[c,i]=a.useState(!1),[s,n]=a.useState(!1),r=()=>{i(!1),o(!0)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Category"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:r,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Category"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(ie,{isSubmit:s,setIsSubmit:n})})})}),e.jsx(le,{setIsSubmit:n,isOpen:l,onClose:()=>o(!1)})]})};export{xe as default};
