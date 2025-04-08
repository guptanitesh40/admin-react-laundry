import{r,_ as M,u as X,g as D,j as e,k as Z,F as ee,b as ae,d as se,e as te,V as ne}from"./index-DkLiFbUV.js";import{u as re}from"./useGetCompanies-D-VW1D-Q.js";import{u as ce}from"./useGetBranches-CcoylmlN.js";import{S as b}from"./sweetalert2.esm.all-DwEdJQJv.js";import{T as le}from"./TableShimmer-DUJMzJgv.js";import{s as ie}from"./searchSchema-CFoSO0rg.js";import{u as oe}from"./useGetUsersByRole-BNHrtaVi.js";import{M as T}from"./MultiSelect-CvUt20sV.js";import"./orderStatusClasses-DgGpuqsn.js";const de=()=>{const[t,c]=r.useState(!1);return{deleteBranch:async h=>{c(!0);const x=`http://3.110.208.70:3000/branches/${h}`,o=localStorage.getItem("authToken");try{const n=await fetch(x,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}}),m=await n.json();return n.ok?{success:!0,message:m.message}:(M.error(m.message,{position:"top-center"}),{success:!1,message:m.message})}catch(n){return M.error(n.message,{position:"top-center"}),{success:!1,message:n.message}}finally{c(!1)}},loading:t}},me=()=>{const[t,c]=r.useState(1),[l,h]=r.useState(10),[x,o]=X(),[n,m]=r.useState(null),[i,N]=r.useState(null),v=x.get("page"),S=x.get("perPage"),R=1e3,L=1,[p,B]=r.useState(""),[y,V]=r.useState(""),[z,k]=r.useState(""),[P,A]=r.useState([]),[E,$]=r.useState([]),{branches:u,fetchBranches:I,totalBranches:C,loading:U}=ce(t,l,p,n,i,P,E),{deleteBranch:G}=de(),{companies:g}=re(L,R),{users:j,fetchUsersByRole:O}=oe(),w=D(),f=Math.ceil(C/l);r.useEffect(()=>{(async()=>{await O(3)})()},[]),r.useEffect(()=>{v&&c(Number(v)),S&&h(Number(S))},[v,S]),r.useEffect(()=>{p&&(c(1),o({search:p,page:"1",perPage:l.toString()}))},[p]);const Y=a=>{w(`/branch/edit/${a}`)},q=async a=>{try{const{isConfirmed:s}=await b.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(s){const{success:Q,message:F}=await G(a);Q?(u.filter(W=>W.branch_id!==a).length===0&&t>1&&(c(t-1),o({page:(t-1).toString(),perPage:l.toString()})),await I(),b.fire(F)):b.fire(F)}}catch(s){b.fire({title:"Error",text:s.message,icon:"error"})}},H=async a=>{a.preventDefault();try{await ie.validate({search:y},{abortEarly:!1}),B(y),k("")}catch(s){s instanceof ne&&k(s.errors[0])}},d=a=>{n===a?N(i==="ASC"?"DESC":"ASC"):(m(a),N("ASC"))},_=a=>{a>=1&&a<=f&&(c(a),o({page:a.toString(),perPage:l.toString()}))},J=a=>{const s=Number(a.target.value);h(s),c(1),o({page:"1",perPage:s.toString()})},K=a=>{w(`/branch-profile/${a}`)};if(!(!j||!g))return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:l,onChange:J,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsxs("div",{className:"flex flex-wrap gap-2.5",children:[e.jsx(T,{options:g==null?void 0:g.map(a=>({label:a.company_name,value:a.company_id})),displayValue:"company_name",placeholder:"Select Company",selectedValues:P,onSelect:a=>A(a.map(s=>s.value)),onRemove:a=>A(a.map(s=>s.value)),className:"min-w-[250px]"}),e.jsx(T,{options:j==null?void 0:j.map(a=>({label:`${a.first_name} ${a.last_name} (${a.mobile_number})`,value:a.user_id})),displayValue:"user_name",placeholder:"Select Branch Manager",selectedValues:E,onSelect:a=>$(a.map(s=>s.value)),onRemove:a=>$(a.map(s=>s.value)),className:"min-w-[300px]"})]}),e.jsxs("div",{className:"flex",children:[e.jsx("form",{onSubmit:H,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:y,onChange:a=>{V(a.target.value),a.target.value===""&&B("")},placeholder:"Search...",className:"flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:z||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${n==="branch_id"?i==="ASC"?"asc":"desc":""}`,onClick:()=>d("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${n==="branch_name"?i==="ASC"?"asc":"desc":""}`,onClick:()=>d("branch_name"),children:[e.jsx("span",{className:"sort-label",children:"Branch name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[320px]",children:"Address"}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${n==="email"?i==="ASC"?"asc":"desc":""}`,onClick:()=>d("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${n==="mobile_number"?i==="ASC"?"asc":"desc":""}`,onClick:()=>d("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${n==="branch_manager"?i==="ASC"?"asc":"desc":""}`,onClick:()=>d("branch_manager"),children:[e.jsx("span",{className:"sort-label",children:"Branch Manager Name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[190px]",children:e.jsxs("span",{className:`sort ${n==="company_name"?i==="ASC"?"asc":"desc":""}`,onClick:()=>d("company_name"),children:[e.jsx("span",{className:"sort-label",children:"Company Name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"w-[50px]",children:"Actions"})]})}),U?e.jsx(le,{}):u.length>0?e.jsx("tbody",{children:u.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:a.branch_id})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5 cursor-pointer hover:text-primary",onClick:()=>w(`/branch-profile/${a.branch_id}`),children:a.branch_name})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:a.branch_address})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:a.branch_email})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:a.branch_phone_number})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[a.branchManager.first_name," ",a.branchManager.last_name]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:a.company.company_name})}),e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>K(a.branch_id),children:e.jsx(Z,{size:18,className:"text-gray-600"})}),e.jsx("button",{onClick:()=>Y(a.branch_id),className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",children:e.jsx(ee,{className:"text-yellow-600"})}),e.jsx("button",{onClick:()=>q(a.branch_id),className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",children:e.jsx(ae,{className:"text-red-500"})})]})})]},a.branch_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center",children:"No branches available."})})})]})}),C>l&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",u.length," of ",C," Companies"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:t===1,onClick:()=>_(t-1),className:`btn ${t===1?"disabled":""}`,children:e.jsx(se,{})}),Array.from({length:f}).map((a,s)=>e.jsx("button",{className:`btn ${t===s+1?"active":""}`,onClick:()=>_(s+1),children:s+1},s)),e.jsx("button",{disabled:t===f,onClick:()=>_(t+1),className:`btn ${t===f?"disabled":""}`,children:e.jsx(te,{})})]})]})})]})})]})},Se=()=>{const t=D(),c=()=>{t("/branch/add")};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Branch"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:c,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Branch"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(me,{})})})})]})};export{Se as default};
