import{r as m,_ as V,u as X,g as T,j as e,k as Z,F as ee,b as se,d as ae,e as te,V as le,R as ne,p as re}from"./index-C5KUhj60.js";import{u as B}from"./useGetCompanies-DP1ya9Gw.js";import{u as L}from"./useGetBranches-DuZCeExe.js";import{T as ce}from"./TableShimmer-qrbQMXRo.js";import{R as G,G as z}from"./enums-9JeJuu7U.js";import{S as k}from"./sweetalert2.esm.all-DwEdJQJv.js";import{s as ie}from"./searchSchema-vzUQ_umg.js";import{g as oe}from"./roleClasses-BcUhvIoV.js";import{M as E}from"./MultiSelect-B9aRLnRh.js";import"./orderStatusClasses-DgGpuqsn.js";const de="http://35.154.167.170:3000/user",me=(n=1,l=10,d="",i,h,x,s,a,c)=>{const[g,b]=m.useState([]),[N,S]=m.useState(0),[w,y]=m.useState(!1),j=async()=>{var C,F;const _=localStorage.getItem("authToken"),p=new URLSearchParams;n&&p.append("page_number",n.toString()),l&&p.append("per_page",l.toString()),d&&p.append("search",d),i&&p.append("sortBy",i),h&&p.append("order",h),x&&x.forEach(o=>p.append("genders",o.toString())),s&&s.forEach(o=>p.append("roles",o.toString())),a&&a.forEach(o=>p.append("company_id",o.toString())),c&&c.forEach(o=>p.append("branches_ids",o.toString())),y(!0);try{const o=await fetch(`${de}?${p}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${_}`}}),u=await o.json();if(!o.ok){V.error(u.message,{position:"top-center"});return}b(((C=u==null?void 0:u.data)==null?void 0:C.users)||[]),S(((F=u==null?void 0:u.data)==null?void 0:F.count)||0)}catch(o){V.error((o==null?void 0:o.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{y(!1)}};return m.useEffect(()=>{j()},[n,l,d,i,h,x,s,a,c]),{users:g,totalUsers:N,loading:w,fetchUsers:j}},pe=()=>{const[n,l]=m.useState(!1);return{deleteUser:async i=>{l(!0);const h=`http://35.154.167.170:3000/user/${i}`,x=localStorage.getItem("authToken");try{const s=await fetch(h,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x}`}}),a=await s.json();return s.ok?{success:!0,message:a.message}:(V.error(a.message,{position:"top-center"}),{success:!1,message:a.message})}catch(s){return{success:!1,message:s.message}}finally{l(!1)}},loading:n}},he=({filters:n})=>{const[l,d]=m.useState(1),[i,h]=m.useState(10),[x,s]=X(),[a,c]=m.useState(null),[g,b]=m.useState(null),N=x.get("page"),S=x.get("perPage"),w=1e3,y=1,[j,_]=m.useState(""),[p,C]=m.useState(""),[F,o]=m.useState(""),{users:u,fetchUsers:D,totalUsers:P,loading:M}=me(l,i,j,a,g,n.genderFilter,n.roleFilter,n.companyFilter,n.branchFilter),{deleteUser:I}=pe(),{companies:O}=B(y,w),{branches:q}=L(y,w),$=T(),U=Math.ceil(P/i),Y=t=>{$(`/user/edit/${t}`)};m.useEffect(()=>{N&&d(Number(N)),S&&h(Number(S))},[N,S]),m.useEffect(()=>{j&&(d(1),s({search:j,page:"1",perPage:i.toString()}))},[j]);const H=async t=>{t.preventDefault();try{await ie.validate({search:j},{abortEarly:!1}),_(p),o("")}catch(r){r instanceof le&&o(r.errors[0])}},J=async t=>{try{const{isConfirmed:r}=await k.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(r){const{success:f,message:A}=await I(t);f?(u.filter(W=>W.user_id!==t).length===0&&l>1&&(d(l-1),s({page:(l-1).toString(),perPage:i.toString()})),await D(),k.fire(A)):k.fire(A)}}catch(r){k.fire({title:"Error",text:r.message,icon:"error"})}},v=t=>{a===t?b(g==="ASC"?"DESC":"ASC"):(c(t),b("ASC"))},R=t=>{t>=1&&t<=U&&(d(t),s({page:t.toString(),perPage:i.toString()}))},K=t=>{const r=Number(t.target.value);h(r),d(1),s({page:"1",perPage:r.toString()})},Q=async t=>{$(`/user/${t}`)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:i,onChange:K,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:H,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:p,onChange:t=>{C(t.target.value),t.target.value===""&&_("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:F||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[70px]",children:e.jsxs("span",{className:`sort ${a==="id"?g==="ASC"?"asc":"desc":""}`,onClick:()=>v("id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${a==="first_name"?g==="ASC"?"asc":"desc":""}`,onClick:()=>v("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Full name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:"Role"}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${a==="email"?g==="ASC"?"asc":"desc":""}`,onClick:()=>v("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[190px]",children:e.jsxs("span",{className:`sort ${a==="mobile_number"?g==="ASC"?"asc":"desc":""}`,onClick:()=>v("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[80px]",children:"Gender"}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("span",{className:`sort ${a==="total_pending_amount"?g==="ASC"?"asc":"desc":""}`,onClick:()=>v("total_pending_amount"),children:[e.jsx("span",{className:"sort-label",children:"Total Pending Amount"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsx("span",{className:"sort-label",children:"Companies"})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsx("span",{className:"sort-label",children:"Branches"})}),e.jsx("th",{className:"min-w-[150px]",children:"Actions"})]})}),M?e.jsx(ce,{}):u.length>0?e.jsx("tbody",{children:u.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:t.user_id})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-1.5",children:[t.first_name," ",t.last_name]})}),e.jsx("td",{children:e.jsx("span",{className:`mt-1 p-2 rounded-md text-sm ${oe(t.role_id)}`,children:G[t.role_id]})}),e.jsx("td",{children:t.email}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:t.mobile_number})}),e.jsx("td",{children:z[t.gender]}),e.jsx("td",{children:t.role_id===5&&t.total_due_amount}),e.jsx("td",{children:O.filter(r=>{var f;return(f=t.company_ids)==null?void 0:f.includes(r.company_id)}).map(r=>r.company_name).join(", ")}),e.jsxs("td",{children:[q.filter(r=>{var f;return(f=t.branch_ids)==null?void 0:f.includes(r.branch_id)}).map(r=>r.branch_name).join(", ")," "]}),e.jsxs("td",{className:"flex",children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>Q(t.user_id),children:e.jsx(Z,{size:18,className:"text-gray-600"})}),e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>Y(t.user_id),children:e.jsx(ee,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>J(t.user_id),children:e.jsx(se,{className:"text-red-500"})})]})]},t.user_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No user available"})})})]})}),P>i&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",u.length," of ",P," Users"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:l===1,onClick:()=>R(l-1),className:`btn ${l===1?"disabled":""}`,children:e.jsx(ae,{})}),Array.from({length:U}).map((t,r)=>e.jsx("button",{className:`btn ${l===r+1?"active":""}`,onClick:()=>R(r+1),children:r+1},r)),e.jsx("button",{disabled:l===U,onClick:()=>R(l+1),className:`btn ${l===U?"disabled":""}`,children:e.jsx(te,{})})]})]})})]})})]})},xe=({filters:n,updateFilters:l})=>{const{branches:d}=L(1,1e3),{companies:i}=B(1,1e3),h=Object.entries(z).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a})),x=Object.entries(G).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a}));return e.jsx(e.Fragment,{children:e.jsx("div",{className:"card-header flex flex-wrap gap-4",children:e.jsxs("div",{className:"w-full flex flex-col md:flex-row gap-3 mb-8",children:[e.jsx(E,{options:h,displayValue:"label",placeholder:"Select Gender",selectedValues:n.genderFilter,onSelect:s=>{const a=s.map(c=>c.value);l({...n,genderFilter:a})},onRemove:s=>{const a=s.map(c=>c.value);l({...n,genderFilter:a})},className:"basis-1/4"}),e.jsx(E,{options:x,displayValue:"label",placeholder:"Select Role",selectedValues:n.roleFilter,onSelect:s=>{const a=s.map(c=>c.value);l({...n,roleFilter:a})},onRemove:s=>{const a=s.map(c=>c.value);l({...n,roleFilter:a})},className:"basis-1/4"}),e.jsx(E,{options:i==null?void 0:i.map(s=>({label:s.company_name,value:s.company_id})),displayValue:"company_name",placeholder:"Select Company",selectedValues:n.companyFilter,onSelect:s=>{const a=s.map(c=>c.value);l({...n,companyFilter:a})},onRemove:s=>{const a=s.map(c=>c.value);l({...n,companyFilter:a})},className:"basis-1/4"}),e.jsx(E,{options:d==null?void 0:d.map(s=>({label:s.branch_name,value:s.branch_id})),displayValue:"branch_name",placeholder:"Select Branch",selectedValues:n.branchFilter,onSelect:s=>{const a=s.map(c=>c.value);l({...n,branchFilter:a})},onRemove:s=>{const a=s.map(c=>c.value);l({...n,branchFilter:a})},className:"basis-1/4"})]})})})},Ce=()=>{const n=T(),[l,d]=m.useState(!1),[i,h]=m.useState({genderFilter:[],roleFilter:[],companyFilter:[],branchFilter:[]}),x=()=>{n("/user/add")},s=a=>{h(a)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Users"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:x,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add User"]})})]}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>d(!l),children:["Filters",l?e.jsx(ne,{size:23}):e.jsx(re,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[l&&e.jsx(xe,{filters:i,updateFilters:s})," ",e.jsx(he,{filters:i})]})})})]})};export{Ce as default};
