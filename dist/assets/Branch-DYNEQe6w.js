import{r,V as T,u as ee,e as R,k as V,j as e,n as se,F as ae,f as te,g as ne,h as re,b as le}from"./index-CoHgHDWF.js";import{u as ce}from"./useGetCompanies-DH3oP-mF.js";import{u as ie}from"./useGetBranches-q3oLKuzA.js";import{S as f}from"./sweetalert2.esm.all-B0Dix5B2.js";import{T as oe}from"./TableShimmer-CQJ0W3Hu.js";import{s as de}from"./searchSchema-DXUyEPW3.js";import{u as me}from"./useGetUsersByRole-C96Zox8v.js";import{M as D}from"./MultiSelect-IvQQlhxj.js";import"./orderStatusClasses-HfHBGnti.js";const he=()=>{const[t,l]=r.useState(!1);return{deleteBranch:async x=>{l(!0);const p=`http://3.110.208.70:3000/branches/${x}`,d=localStorage.getItem("authToken");try{const n=await fetch(p,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`}}),h=await n.json();return n.ok?{success:!0,message:h.message}:(T.error(h.message,{position:"top-center"}),{success:!1,message:h.message})}catch(n){return T.error(n.message,{position:"top-center"}),{success:!1,message:n.message}}finally{l(!1)}},loading:t}},xe=()=>{const[t,l]=r.useState(1),[c,x]=r.useState(10),[p,d]=ee(),[n,h]=r.useState(null),[o,b]=r.useState(null),N=p.get("page"),v=p.get("perPage"),L=1e3,I=1,[u,P]=r.useState(""),[S,z]=r.useState(""),[U,k]=r.useState(""),[A,E]=r.useState([]),[$,F]=r.useState([]),{branches:g,fetchBranches:G,totalBranches:y,loading:O}=ie(t,c,u,n,o,A,$),{hasPermission:i}=R(),{deleteBranch:Y}=he(),{companies:C}=ce(I,L),{users:w,fetchUsersByRole:q}=me(),_=V(),j=Math.ceil(y/c);r.useEffect(()=>{(async()=>{await q(3)})()},[]),r.useEffect(()=>{N&&l(Number(N)),v&&x(Number(v))},[N,v]),r.useEffect(()=>{u&&(l(1),d({search:u,page:"1",perPage:c.toString()}))},[u]);const H=s=>{_(`/branch/edit/${s}`)},J=async s=>{try{const{isConfirmed:a}=await f.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(a){const{success:X,message:M}=await Y(s);X?(g.filter(Z=>Z.branch_id!==s).length===0&&t>1&&(l(t-1),d({page:(t-1).toString(),perPage:c.toString()})),await G(),f.fire(M)):f.fire(M)}}catch(a){f.fire({title:"Error",text:a.message,icon:"error"})}},K=async s=>{s.preventDefault();try{await de.validate({search:S},{abortEarly:!1}),P(S),k("")}catch(a){a instanceof le&&k(a.errors[0])}},m=s=>{n===s?b(o==="ASC"?"DESC":"ASC"):(h(s),b("ASC"))},B=s=>{s>=1&&s<=j&&(l(s),d({page:s.toString(),perPage:c.toString()}))},Q=s=>{const a=Number(s.target.value);x(a),l(1),d({page:"1",perPage:a.toString()})},W=s=>{_(`/branch-profile/${s}`)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:c,onChange:Q,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsxs("div",{className:"flex flex-wrap gap-2.5",children:[e.jsx(D,{options:C==null?void 0:C.map(s=>({label:s.company_name,value:s.company_id})),displayValue:"company_name",placeholder:"Select Company",selectedValues:A,onSelect:s=>E(s.map(a=>a.value)),onRemove:s=>E(s.map(a=>a.value)),className:"lgmobile:min-w-[235px] vsmobile:min-w-[235px]"}),e.jsx(D,{options:w==null?void 0:w.map(s=>({label:`${s.first_name} ${s.last_name} (${s.mobile_number})`,value:s.user_id})),displayValue:"user_name",placeholder:"Select Branch Manager",selectedValues:$,onSelect:s=>F(s.map(a=>a.value)),onRemove:s=>F(s.map(a=>a.value)),className:"lgmobile:min-w-[300px] vsmobile:min-w-[235px]",isSearchInput:!0})]}),e.jsxs("div",{className:"flex justify-self-end",children:[e.jsx("form",{onSubmit:K,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:S,onChange:s=>{z(s.target.value),s.target.value===""&&P("")},placeholder:"Search...",className:"flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:U||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${n==="branch_id"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${n==="branch_name"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("branch_name"),children:[e.jsx("span",{className:"sort-label",children:"Branch name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[320px]",children:"Address"}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${n==="email"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${n==="mobile_number"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${n==="branch_manager"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("branch_manager"),children:[e.jsx("span",{className:"sort-label",children:"Branch Manager Name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[190px]",children:e.jsxs("span",{className:`sort ${n==="company_name"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("company_name"),children:[e.jsx("span",{className:"sort-label",children:"Company Name"}),e.jsx("span",{className:"sort-icon"})]})}),(i(13,"update")||i(13,"delete")||i(13,"read"))&&e.jsx("th",{className:"w-[50px]",children:"Actions"})]})}),O?e.jsx(oe,{}):g.length>0?e.jsx("tbody",{children:g.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.branch_id})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5 cursor-pointer hover:text-primary",onClick:()=>_(`/branch-profile/${s.branch_id}`),children:s.branch_name})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.branch_address})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.branch_email})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.branch_phone_number})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[s.branchManager.first_name," ",s.branchManager.last_name]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.company.company_name})}),(i(13,"update")||i(13,"delete")||i(13,"read"))&&e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[i(12,"read")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>W(s.branch_id),children:e.jsx(se,{size:18,className:"text-gray-600"})}),i(12,"update")&&e.jsx("button",{onClick:()=>H(s.branch_id),className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",children:e.jsx(ae,{className:"text-yellow-600"})}),i(12,"delete")&&e.jsx("button",{onClick:()=>J(s.branch_id),className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",children:e.jsx(te,{className:"text-red-500"})})]})})]},s.branch_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center",children:"No branches available."})})})]})}),y>c&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",g.length," of ",y," Companies"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:t===1,onClick:()=>B(t-1),className:`btn ${t===1?"disabled":""}`,children:e.jsx(ne,{})}),Array.from({length:j}).map((s,a)=>e.jsx("button",{className:`btn ${t===a+1?"active":""}`,onClick:()=>B(a+1),children:a+1},a)),e.jsx("button",{disabled:t===j,onClick:()=>B(t+1),className:`btn ${t===j?"disabled":""}`,children:e.jsx(re,{})})]})]})})]})})]})},Ce=()=>{const t=V(),{hasPermission:l}=R(),c=()=>{t("/branch/add")};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Branch"})}),l(13,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:c,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Branch"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(xe,{})})})})]})};export{Ce as default};
