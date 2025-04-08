import{r as n,V as F,u as ee,e as T,q as se,h as D,j as e,T as ae,n as te,F as ne,f as re,P as ce,s as le,b as ie}from"./index-B-uNKBOV.js";import{u as oe}from"./useGetCompanies-ZeNFmvdI.js";import{u as de}from"./useGetBranches-DrY3mMxg.js";import{S as j}from"./sweetalert2.esm.all-B0Dix5B2.js";import{M}from"./MultiSelect-EiSicJdo.js";import"./orderStatusClasses-HfHBGnti.js";const me=()=>{const[l,r]=n.useState(!1);return{deleteBranch:async u=>{r(!0);const g=`http://3.110.208.70:3000/branches/${u}`,i=localStorage.getItem("authToken");try{const t=await fetch(g,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`}}),p=await t.json();return t.ok?{success:!0,message:p.message}:(F.error(p.message,{position:"top-center"}),{success:!1,message:p.message})}catch(t){return F.error(t.message,{position:"top-center"}),{success:!1,message:t.message}}finally{r(!1)}},loading:l}},he=()=>{const[l,r]=n.useState(1),[c,u]=n.useState(10),[g,i]=ee(),[t,p]=n.useState(null),[o,f]=n.useState(null),b=g.get("page"),N=g.get("perPage"),R=1e3,V=1,[h,P]=n.useState(""),[S,L]=n.useState(""),[I,B]=n.useState(""),[v,k]=n.useState([]),[y,E]=n.useState([]),{branches:x,fetchBranches:z,count:A,loading:U}=de(l,c,h,t,o,v,y),{hasPermission:d}=T(),{deleteBranch:G}=me(),{companies:_}=oe(V,R),{users:C,fetchUsersByRole:q}=se(),w=D(),O=Math.ceil(A/c);n.useEffect(()=>{(async()=>{await q(3)})()},[]),n.useEffect(()=>{b&&r(Number(b)),N&&u(Number(N))},[b,N]),n.useEffect(()=>{r(1),i(h!==""?{search:h,page:"1",perPage:c.toString()}:{})},[h]),n.useEffect(()=>{r(1),i(h!==""?{search:h,page:"1",perPage:c.toString()}:{})},[v,y]);const Y=s=>{w(`/branch/edit/${s}`)},H=async s=>{try{const{isConfirmed:a}=await j.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(a){const{success:X,message:$}=await G(s);X?(x.filter(Z=>Z.branch_id!==s).length===0&&l>1&&(r(l-1),i({page:(l-1).toString(),perPage:c.toString()})),await z(),j.fire($)):j.fire($)}}catch(a){j.fire({title:"Error",text:a.message,icon:"error"})}},J=async s=>{s.preventDefault();try{await le.validate({search:S},{abortEarly:!1}),P(S),B("")}catch(a){a instanceof ie&&B(a.errors[0])}},m=s=>{t===s?f(o==="ASC"?"DESC":"ASC"):(p(s),f("ASC"))},K=s=>{s>=1&&s<=O&&(r(s),i({page:s.toString(),perPage:c.toString()}))},Q=s=>{const a=Number(s.target.value);u(a),r(1),i({page:"1",perPage:a.toString()})},W=s=>{w(`/branch-profile/${s}`)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:c,onChange:Q,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsxs("div",{className:"flex flex-wrap gap-2.5",children:[e.jsx(M,{options:_==null?void 0:_.map(s=>({label:s.company_name,value:s.company_id})),displayValue:"company_name",placeholder:"Select Company",selectedValues:v,onSelect:s=>k(s.map(a=>a.value)),onRemove:s=>k(s.map(a=>a.value)),className:"lgmobile:min-w-[235px] vsmobile:min-w-[235px]"}),e.jsx(M,{options:C==null?void 0:C.map(s=>({label:`${s.first_name} ${s.last_name} (${s.mobile_number})`,value:s.user_id})),displayValue:"user_name",placeholder:"Select Branch Manager",selectedValues:y,onSelect:s=>E(s.map(a=>a.value)),onRemove:s=>E(s.map(a=>a.value)),className:"lgmobile:min-w-[300px] vsmobile:min-w-[235px]",isSearchInput:!0})]}),e.jsxs("div",{className:"flex justify-self-end",children:[e.jsx("form",{onSubmit:J,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:S,onChange:s=>{L(s.target.value),s.target.value===""&&P("")},placeholder:"Search...",className:"flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:I||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${t==="branch_id"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("branch_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${t==="branch_name"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("branch_name"),children:[e.jsx("span",{className:"sort-label",children:"Branch name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[320px]",children:"Address"}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${t==="branch_email"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("branch_email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${t==="mobile_number"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("branch_phone_number"),children:[e.jsx("span",{className:"sort-label",children:"Phone No 1"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${t==="mobile_number"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("branch_mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Phone No 2"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("span",{className:`sort ${t==="first_name"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Branch Manager Name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[190px]",children:e.jsxs("span",{className:`sort ${t==="company_name"?o==="ASC"?"asc":"desc":""}`,onClick:()=>m("company_name"),children:[e.jsx("span",{className:"sort-label",children:"Company Name"}),e.jsx("span",{className:"sort-icon"})]})}),(d(13,"update")||d(13,"delete"))&&e.jsx("th",{className:"w-[50px]",children:"Actions"})]})}),U?e.jsx(ae,{}):x.length>0?e.jsx("tbody",{children:x.map(s=>e.jsxs("tr",{children:[e.jsx("td",{className:"cursor-pointer",onClick:()=>w(`/branch-profile/${s.branch_id}`),children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.branch_id})}),e.jsx("td",{children:e.jsx("div",{children:s.branch_name})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.branch_address})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.branch_email})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.branch_phone_number})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.branch_mobile_number})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[s.branchManager.first_name," ",s.branchManager.last_name]})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.company.company_name})}),(d(13,"update")||d(13,"delete"))&&e.jsx("td",{children:e.jsxs("div",{className:"flex",children:[d(12,"read")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>W(s.branch_id),children:e.jsx(te,{size:18,className:"text-gray-600"})}),d(12,"update")&&e.jsx("button",{onClick:()=>Y(s.branch_id),className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",children:e.jsx(ne,{className:"text-yellow-600"})}),d(12,"delete")&&e.jsx("button",{onClick:()=>H(s.branch_id),className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",children:e.jsx(re,{className:"text-red-500"})})]})})]},s.branch_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center",children:"No branch available."})})})]})}),e.jsx(ce,{count:A,currentPage:l,totalRecords:x==null?void 0:x.length,perPage:c,onPageChange:K,label:"branch"})]})})]})},Ne=()=>{const l=D(),{hasPermission:r}=T(),c=()=>{l("/branch/add")};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Branch"})}),r(13,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:c,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Branch"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(he,{})})})})]})};export{Ne as default};
