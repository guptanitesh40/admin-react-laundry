import{r,_ as z,u as U,g as P,j as e,h as V,F as q,b as G,d as W,e as H,V as J}from"./index-o3iPDp2a.js";import{u as K}from"./useGetCompanies-D6spozwN.js";import{S as u}from"./sweetalert2.esm.all-DwEdJQJv.js";import{s as Q}from"./searchSchema-DBIwj-sD.js";import{T as X}from"./TableShimmer-B7SA4yOK.js";import{a as Z}from"./enums-2F1Uvolu.js";const ee=()=>{const[a,l]=r.useState(!1);return{deleteCompany:async h=>{l(!0);const p=`http://3.110.208.70:3000/companies/${h}`,d=localStorage.getItem("authToken");try{const t=await fetch(p,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`}}),m=await t.json();return t.ok?{success:!0,message:m.message}:(z.error(m.message,{position:"top-center"}),{success:!1,message:m.message})}catch(t){return{success:!1,message:t.message}}finally{l(!1)}},loading:a}},se=()=>{const[a,l]=r.useState(1),[i,h]=r.useState(10),[p,d]=U(),[t,m]=r.useState(null),[c,f]=r.useState(null),[x,v]=r.useState(""),[w,A]=r.useState(""),[E,S]=r.useState(""),[_,$]=r.useState(),N=p.get("page"),b=p.get("perPage"),{companies:j,fetchCompanies:F,loading:T,totalCount:C}=K(a,i,x,t,c,_),D=P(),g=Math.ceil(C/i),{deleteCompany:O}=ee(),M=async s=>{try{const{isConfirmed:n}=await u.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(n){const{success:I,message:k}=await O(s);I?(j.filter(R=>R.company_id!==s).length===0&&a>1&&(l(a-1),d({page:(a-1).toString(),perPage:i.toString()})),await F(),u.fire(k)):u.fire(k)}}catch(n){u.fire({title:"Error",text:n.message,icon:"error"})}},Y=s=>{D(`/company/edit/${s}`)};r.useEffect(()=>{N&&l(Number(N)),b&&h(Number(b))},[N,b]),r.useEffect(()=>{x&&(l(1),d({search:x,page:"1",perPage:i.toString()}))},[x]);const B=async s=>{s.preventDefault();try{await Q.validate({search:x},{abortEarly:!1}),v(w),S("")}catch(n){n instanceof J&&S(n.errors[0])}},o=s=>{t===s?f(c==="ASC"?"DESC":"ASC"):(m(s),f("ASC"))},y=s=>{s>=1&&s<=g&&(l(s),d({page:s.toString(),perPage:i.toString()}))},L=s=>{const n=Number(s.target.value);h(n),l(1),d({page:"1",perPage:n.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:i,onChange:L,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex items-center gap-4 flex-1 justify-end",children:[e.jsxs("div",{className:"flex flex-wrap gap-2.5 mb-6",children:[e.jsxs("button",{className:"btn btn-lg btn-outline btn-primary flex-shrink-0",children:[e.jsx("i",{className:"ki-filled ki-setting-4"}),"Filter"]}),e.jsxs("select",{className:"select select-lg w-[200px] text-sm",value:_,onChange:s=>{$(Number(s.target.value))},children:[e.jsx("option",{value:"",selected:!0,children:"Select Ownership"}),e.jsx("option",{value:1,children:"Own"}),e.jsx("option",{value:2,children:"Other Company"})]})]}),e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:B,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:w,onChange:s=>{A(s.target.value),s.target.value===""&&v("")},placeholder:"Search...",className:"w-[275px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:E||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${t==="company_id"?c==="ASC"?"asc":"desc":""}`,onClick:()=>o("company_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${t==="company_name"?c==="ASC"?"asc":"desc":""}`,onClick:()=>o("company_name"),children:[e.jsx("span",{className:"sort-label",children:"Company name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${t==="company_owner_name"?c==="ASC"?"asc":"desc":""}`,onClick:()=>o("company_owner_name"),children:[e.jsx("span",{className:"sort-label",children:"Company owner name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${t==="company_ownedby"?c==="ASC"?"asc":"desc":""}`,onClick:()=>o("company_ownedby"),children:[e.jsx("span",{className:"sort-label",children:"Company Ownership"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${t==="address"?c==="ASC"?"asc":"desc":""}`,onClick:()=>o("address"),children:[e.jsx("span",{className:"sort-label",children:"Address"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[120px]",children:e.jsxs("span",{className:`sort ${t==="email"?c==="ASC"?"asc":"desc":""}`,onClick:()=>o("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[215px]",children:e.jsxs("span",{className:`sort ${t==="mobile_number"?c==="ASC"?"asc":"desc":""}`,onClick:()=>o("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[180px]",children:"Company Website"}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${t==="registration_date"?c==="ASC"?"asc":"desc":""}`,onClick:()=>o("registration_date"),children:[e.jsx("span",{className:"sort-label",children:"Registration Date"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),T?e.jsx(X,{}):j.length>0?e.jsx("tbody",{children:j.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.company_id})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.company_name})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.company_owner_name})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:Z[s.company_ownedby]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.address})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.email})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.mobile_number})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("a",{className:"text-gray-600 hover:text-primary",href:s.website,target:"_blank",rel:"noopener noreferrer",children:s.website})})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:V(s.registration_date).format("DD-MM-YYYY")})}),e.jsxs("td",{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>Y(s.company_id),children:e.jsx(q,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>M(s.company_id),children:e.jsx(G,{className:"text-red-500"})})]})]},s.company_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No users available"})})})]})}),C>i&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",j.length," of ",C," Companies"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:a===1,onClick:()=>y(a-1),className:`btn ${a===1?"disabled":""}`,children:e.jsx(W,{})}),Array.from({length:g}).map((s,n)=>e.jsx("button",{className:`btn ${a===n+1?"active":""}`,onClick:()=>y(n+1),children:n+1},n)),e.jsx("button",{disabled:a===g,onClick:()=>y(a+1),className:`btn ${a===g?"disabled":""}`,children:e.jsx(H,{})})]})]})})]})})]})},oe=()=>{const a=P(),l=()=>{a("/company/add")};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Company"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:l,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Company"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(se,{})})})})]})};export{oe as default};
