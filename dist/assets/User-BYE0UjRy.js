import{r as o,u as H,h as V,j as e,T as J,n as K,F as Q,f as X,P as Z,s as ee,b as se,R as ae,v as le}from"./index-CF8J22nX.js";import{u as U}from"./useGetCompanies-CrDBibFs.js";import{u as te}from"./useGetBranches-CbssEcJL.js";import{u as ne,a as ce}from"./useDeleteUser-CgLk0b4F.js";import{R as A,G as R}from"./enums-CdakGUf3.js";import{S as b}from"./sweetalert2.esm.all-B0Dix5B2.js";import{g as re}from"./roleClasses-8Xjy3Q3A.js";import{u as ie}from"./useGetBranchesOnId-BXeeuSdQ.js";import{M as N}from"./MultiSelect-BzELlyZ1.js";import"./orderStatusClasses-HfHBGnti.js";const oe=({filters:l})=>{const[c,r]=o.useState(1),[d,h]=o.useState(10),[p,x]=H(),[m,f]=o.useState(null),[a,t]=o.useState(null),n=p.get("page"),v=p.get("perPage"),S=1e3,y=1,[j,F]=o.useState(""),[w,E]=o.useState(""),[B,C]=o.useState(""),{users:u,fetchUsers:O,count:P,loading:G}=ne(c,d,j,m,a,l.genderFilter,l.roleFilter,l.companyFilter,l.branchFilter),{deleteUser:$}=ce();U(y,S),te(y,S);const _=V(),M=Math.ceil(P/d),T=s=>{_(`/user/edit/${s}`)};o.useEffect(()=>{n&&r(Number(n)),v&&h(Number(v))},[n,v]),o.useEffect(()=>{j&&(r(1),x({search:j,page:"1",perPage:d.toString()}))},[j]);const z=async s=>{s.preventDefault();try{await ee.validate({search:j},{abortEarly:!1}),F(w),C("")}catch(i){i instanceof se&&C(i.errors[0])}},D=async s=>{try{const{isConfirmed:i}=await b.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(i){const{success:q,message:k}=await $(s);q?(u.filter(W=>W.user_id!==s).length===0&&c>1&&(r(c-1),x({page:(c-1).toString(),perPage:d.toString()})),await O(),b.fire(k)):b.fire(k)}}catch(i){b.fire({title:"Error",text:i.message,icon:"error"})}},g=s=>{m===s?t(a==="ASC"?"DESC":"ASC"):(f(s),t("ASC"))},I=s=>{s>=1&&s<=M&&(r(s),x({page:s.toString(),perPage:d.toString()}))},L=s=>{const i=Number(s.target.value);h(i),r(1),x({page:"1",perPage:i.toString()})},Y=async s=>{_(`/user/${s}`)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:d,onChange:L,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:z,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:w,onChange:s=>{E(s.target.value),s.target.value===""&&F("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:B||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[70px]",children:e.jsxs("span",{className:`sort ${m==="user_id"?a==="ASC"?"asc":"desc":""}`,onClick:()=>g("user_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${m==="first_name"?a==="ASC"?"asc":"desc":""}`,onClick:()=>g("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Full name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:"Role"}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${m==="email"?a==="ASC"?"asc":"desc":""}`,onClick:()=>g("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[190px]",children:e.jsxs("span",{className:`sort ${m==="mobile_number"?a==="ASC"?"asc":"desc":""}`,onClick:()=>g("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[80px]",children:"Gender"}),e.jsx("th",{className:"min-w-[250px]",children:e.jsx("span",{className:"sort-label",children:"Company"})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsx("span",{className:"sort-label",children:"Branch"})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsx("span",{className:"sort-label",children:"Workshop"})}),e.jsx("th",{className:"min-w-[150px]",children:"Actions"})]})}),G?e.jsx(J,{}):u.length>0?e.jsx("tbody",{children:u.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.user_id})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-1.5",children:[s.first_name," ",s.last_name]})}),e.jsx("td",{children:e.jsx("span",{className:`mt-1 p-2 rounded-md text-sm ${re(s.role_id)}`,children:A[s.role_id]})}),e.jsx("td",{children:s.email}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:s.mobile_number})}),e.jsx("td",{children:R[s.gender]}),e.jsx("td",{children:s==null?void 0:s.companies.map(i=>i).join(", ")}),e.jsxs("td",{children:[s==null?void 0:s.branches.map(i=>i).join(", ")," "]}),e.jsxs("td",{children:[s==null?void 0:s.workshops.map(i=>i).join(", ")," "]}),e.jsxs("td",{className:"flex",children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full",onClick:()=>Y(s.user_id),children:e.jsx(K,{size:18,className:"text-gray-600"})}),e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>T(s.user_id),children:e.jsx(Q,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>D(s.user_id),children:e.jsx(X,{className:"text-red-500"})})]})]},s.user_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No user available"})})})]})}),e.jsx(Z,{count:P,currentPage:c,totalRecords:u==null?void 0:u.length,perPage:d,onPageChange:I,label:"users"})]})})]})},de=({filters:l,updateFilters:c})=>{const{branches:r,fetchBranchesOnId:d}=ie(),{companies:h}=U(1,1e3),[p,x]=o.useState();o.useEffect(()=>{d(p)},[p]);const m=Object.entries(R).filter(([a,t])=>typeof t=="number").map(([a,t])=>({label:a,value:t})),f=Object.entries(A).filter(([a,t])=>typeof t=="number").map(([a,t])=>({label:a,value:t}));return o.useEffect(()=>{l.companyFilter&&x(l.companyFilter)},[l.companyFilter]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex flex-wrap gap-4 p-4",children:e.jsxs("div",{className:"w-full flex flex-col md:flex-row gap-3",children:[e.jsx(N,{options:m,displayValue:"label",placeholder:"Select Gender",selectedValues:l.genderFilter,onSelect:a=>{const t=a.map(n=>n.value);c({...l,genderFilter:t})},onRemove:a=>{const t=a.map(n=>n.value);c({...l,genderFilter:t})},className:"basis-1/4"}),e.jsx(N,{options:f,displayValue:"label",placeholder:"Select Role",selectedValues:l.roleFilter,onSelect:a=>{const t=a.map(n=>n.value);c({...l,roleFilter:t})},onRemove:a=>{const t=a.map(n=>n.value);c({...l,roleFilter:t})},className:"basis-1/4"}),e.jsx(N,{options:h==null?void 0:h.map(a=>({label:a.company_name,value:a.company_id})),displayValue:"company_name",placeholder:"Select Company",selectedValues:l.companyFilter,onSelect:a=>{const t=a.map(n=>n.value);c({...l,companyFilter:t})},onRemove:a=>{const t=a.map(n=>n.value);c({...l,companyFilter:t})},className:"basis-1/4"}),e.jsx(N,{options:r==null?void 0:r.map(a=>({label:a.branch_name,value:a.branch_id})),displayValue:"branch_name",placeholder:"Select Branch",selectedValues:l.branchFilter,onSelect:a=>{const t=a.map(n=>n.value);c({...l,branchFilter:t})},onRemove:a=>{const t=a.map(n=>n.value);c({...l,branchFilter:t})},...!(l!=null&&l.companyFilter)||(l==null?void 0:l.companyFilter.length)===0?{defaultOption:"Please select company"}:r&&(r==null?void 0:r.length)===0?{noDataAvailableLabel:"No Branch Available"}:{},className:"basis-1/4"})]})})})},Se=()=>{const l=V(),[c,r]=o.useState(!1),[d,h]=o.useState({genderFilter:[],roleFilter:[],companyFilter:[],branchFilter:[]}),p=()=>{l("/user/add")},x=m=>{h(m)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Users"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:p,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add User"]})})]}),e.jsx("div",{className:"flex flex-auto items-center gap-2.5 mb-4 shadow-none",children:e.jsxs("button",{className:"btn btn-sm btn-primary shadow-none",onClick:()=>r(!c),children:["Filters",c?e.jsx(ae,{size:23}):e.jsx(le,{color:"skyblue",size:23})]})})]}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsxs("div",{className:"card card-grid min-w-full",children:[c&&e.jsx(de,{filters:d,updateFilters:x})," ",e.jsx(oe,{filters:d})]})})})]})};export{Se as default};
