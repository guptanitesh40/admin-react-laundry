import{r as c,_ as B,u as M,k,j as e,l as Y,F as O,b as I,d as R,e as U,V as z}from"./index-ekHY3xQj.js";import{u as V}from"./useGetCompanies-Df0G4sLJ.js";import{T as W,S as f}from"./TableShimmer-BaU0WSyA.js";import{F as h,a as x,s as G}from"./searchSchema-BZfm46a9.js";import{a as Z}from"./enums-tzNm48ue.js";const q=()=>{const[d,t]=c.useState(!1);return{deleteCompany:async n=>{t(!0);const p=`http://35.154.167.170:3000/companies/${n}`,g=localStorage.getItem("authToken");try{const l=await fetch(p,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`}}),a=await l.json();return l.ok?{success:!0,message:a.message}:(B.error(a.message,{position:"top-center"}),{success:!1,message:a.message})}catch(l){return{success:!1,message:l.message}}finally{t(!1)}},loading:d}},H=({search:d})=>{const[t,i]=c.useState(1),[n,p]=c.useState(10),[g,l]=M(),[a,b]=c.useState(null),[r,u]=c.useState(null),C=g.get("page"),N=g.get("perPage"),{companies:j,fetchCompanies:E,loading:A,totalCount:w}=V(t,n,d,a,r),S=k(),y=Math.ceil(w/n),{deleteCompany:P}=q(),D=async s=>{try{const{isConfirmed:o}=await f.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(o){const{success:F,message:_}=await P(s);F?(j.filter($=>$.company_id!==s).length===0&&t>1&&(i(t-1),l({page:(t-1).toString(),perPage:n.toString()})),await E(),f.fire(_)):f.fire(_)}}catch(o){f.fire({title:"Error",text:o.message,icon:"error"})}},L=s=>{S(`/company/edit/${s}`)};c.useEffect(()=>{C&&i(Number(C)),N&&p(Number(N))},[C,N]),c.useEffect(()=>{d&&(i(1),l({search:d,page:"1",perPage:n.toString()}))},[d]);const m=s=>{a===s?u(r==="ASC"?"DESC":"ASC"):(b(s),u("ASC"))},v=s=>{s>=1&&s<=y&&(i(s),l({page:s.toString(),perPage:n.toString()}))},T=s=>{const o=Number(s.target.value);p(o),i(1),l({page:"1",perPage:o.toString()})};return e.jsxs("div",{children:[e.jsx("div",{className:"inline-block",children:e.jsxs("div",{className:"flex mb-3 items-center gap-2",children:["Show",e.jsxs("select",{className:"select select-sm w-16",value:n,onChange:T,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),"per page"]})}),e.jsxs("div",{className:"grid gap-5 lg:gap-7.5",children:[e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>m("company_id"),children:["Id",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(h,{color:a==="company_id"&&r==="ASC"?"gray":"lightgray"}),e.jsx(x,{color:a==="company_id"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>m("company_name"),children:["Company Name",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(h,{color:a==="company_name"&&r==="ASC"?"gray":"lightgray"}),e.jsx(x,{color:a==="company_name"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[237px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>m("company_owner_name"),children:["Company Owner Name",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(h,{color:a==="company_owner_name"&&r==="ASC"?"gray":"lightgray"}),e.jsx(x,{color:a==="company_owner_name"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[220px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>m("company_ownedby"),children:["Company Ownership",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(h,{color:a==="company_ownedby"&&r==="ASC"?"gray":"lightgray"}),e.jsx(x,{color:a==="company_ownedby"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>m("address"),children:["Company Address",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(h,{color:a==="address"&&r==="ASC"?"gray":"lightgray"}),e.jsx(x,{color:a==="address"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[120px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>m("email"),children:["Company Email",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(h,{color:a==="email"&&r==="ASC"?"gray":"lightgray"}),e.jsx(x,{color:a==="email"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[180px]",children:"Company Website"}),e.jsx("th",{className:"min-w-[215px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>m("mobile_number"),children:["Company Mobile no",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(h,{color:a==="mobile_number"&&r==="ASC"?"gray":"lightgray"}),e.jsx(x,{color:a==="mobile_number"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[193px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>m("registration_date"),children:["Registration Date",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(h,{color:a==="registration_date"&&r==="ASC"?"gray":"lightgray"}),e.jsx(x,{color:a==="registration_date"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"w-[50px]",children:"Actions"})]})}),A?e.jsx(W,{}):j.length>0?e.jsx("tbody",{children:j.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:s.company_id}),e.jsx("td",{children:e.jsx("span",{className:"cursor-pointer hover:text-primary",onClick:()=>S(`/company-profile/${s.company_id}`),children:s.company_name})}),e.jsx("td",{children:s.company_owner_name}),e.jsx("td",{children:Z[s.company_ownedby]}),e.jsx("td",{children:s.address}),e.jsx("td",{children:s.email}),e.jsx("td",{children:e.jsx("a",{className:"text-gray-600 hover:text-primary",href:s.website,target:"_blank",rel:"noopener noreferrer",children:s.website})}),e.jsx("td",{children:s.mobile_number}),e.jsx("td",{children:Y(s.registration_date).format("DD-MM-YYYY")}),e.jsx("td",{children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>L(s.company_id),className:"bg-yellow-100 hover:bg-yellow-200 p-2 rounded-full",children:e.jsx(O,{className:"text-yellow-600"})}),e.jsx("button",{onClick:()=>D(s.company_id),className:"bg-red-100 hover:bg-red-200 p-2 rounded-full",children:e.jsx(I,{className:"text-red-500"})})]})})]},s.company_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center",children:"No companies available."})})})]})})})}),w>n&&e.jsxs("div",{className:"flex items-center gap-4 mt-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",j.length," of ",w," Companies"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:t===1,onClick:()=>v(t-1),className:`btn ${t===1?"disabled":""}`,children:e.jsx(R,{})}),Array.from({length:y},(s,o)=>e.jsx("button",{onClick:()=>v(o+1),className:`btn ${t===o+1?"active":""}`,children:o+1},o+1)),e.jsx("button",{disabled:t===y,onClick:()=>v(t+1),className:`btn ${t===y?"disabled":""}`,children:e.jsx(U,{})})]})]})]})]})},ae=()=>{const[d,t]=c.useState(""),[i,n]=c.useState(""),[p,g]=c.useState(""),l=k(),a=()=>{l("/company/add")},b=async r=>{r.preventDefault();try{await G.validate({search:i},{abortEarly:!1}),t(i),g("")}catch(u){u instanceof z&&g(u.errors[0])}};return e.jsxs("div",{className:"container-fixed relative",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900 py-3",children:"Company List"})}),e.jsx("button",{onClick:a,className:"btn btn-primary",children:"Add Company"})]}),e.jsxs("div",{className:"absolute top-11 right-[2.5rem] mt-2",children:[e.jsxs("form",{onSubmit:b,className:"w-64 relative flex",children:[e.jsx("input",{type:"search",value:i,onChange:r=>{n(r.target.value),r.target.value===""&&t("")},className:"peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] text-gray-700 outline-none focus:border-gray-500 focus:bg-white border-gray-500",placeholder:"Search"}),e.jsx("button",{type:"submit",className:"relative z-[2] -ml-0.5 flex items-center rounded-e bg-gray-500 px-5 text-xs font-medium uppercase leading-normal text-white",children:e.jsx("svg",{fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"h-5 w-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})})})]}),e.jsx("p",{className:"absolute top-8 right-[0.2rem] mt-2 text-red-500 text-sm w-80",children:p||" "})]}),e.jsx(H,{search:d})]})};export{ae as default};
