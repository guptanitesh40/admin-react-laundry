import{r as l,_ as B,u as R,m as D,j as e,F as j,a as b,T as M,b as I,c as U,d as z,e as G,S as _,s as H,V}from"./index-DIwkLB2J.js";const Y="http://35.154.167.170:3000/branches",q=(i=1,t=10,o="",n,m)=>{const[u,c]=l.useState([]),[s,v]=l.useState(0),[r,g]=l.useState(!1),C=l.useCallback(async()=>{var f,y;const w=localStorage.getItem("authToken"),h=new URLSearchParams;i&&h.append("page_number",i.toString()),t&&h.append("per_page",t.toString()),o&&h.append("search",o),n&&h.append("sortBy",n),m&&h.append("order",m),g(!0);try{const N=await fetch(`${Y}?${h}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`}});if(!N.ok){const E=await N.json();B.error(E.message,{position:"top-center"});return}const x=await N.json(),S=((f=x==null?void 0:x.data)==null?void 0:f.result)||[],k=((y=x==null?void 0:x.data)==null?void 0:y.count)||0;c(S),v(k)}catch{B.error("An error occurred while fetching data")}finally{g(!1)}},[i,t,m,n,o]);return{branches:u,totalBranches:s,loading:r,fetchBranches:C}},W=()=>{const[i,t]=l.useState(!1);return{deleteBranch:async n=>{t(!0);const m=`http://35.154.167.170:3000/branches/${n}`,u=localStorage.getItem("authToken");try{const c=await fetch(m,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`}}),s=await c.json();return c.ok?{success:!0,message:s.message}:(B.error(s.message,{position:"top-center"}),{success:!1,message:s.message})}catch(c){return B.error(c.message,{position:"top-center"}),{success:!1,message:c.message}}finally{t(!1)}},loading:i}},Z=({search:i})=>{const[t,o]=l.useState(1),[n,m]=l.useState(10),[u,c]=R(),[s,v]=l.useState(null),[r,g]=l.useState(null),C=u.get("page"),w=u.get("perPage"),{branches:h,fetchBranches:f,totalBranches:y,loading:N}=q(t,n,i,s,r),x=D(),S=Math.ceil(y/n),{deleteBranch:k}=W(),E=a=>{x(`/branch/edit/${a}`)},T=async a=>{try{const{isConfirmed:d}=await _.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(d){const{success:$,message:P}=await k(a);$?(h.filter(F=>F.branch_id!==a).length===0&&t>1&&(o(t-1),c({page:(t-1).toString(),perPage:n.toString()})),await f(),_.fire(P)):_.fire(P)}}catch(d){_.fire({title:"Error",text:d.message,icon:"error"})}};l.useEffect(()=>{C&&o(Number(C)),w&&m(Number(w))},[C,w]),l.useEffect(()=>{i?(o(1),c({search:i,page:"1",perPage:n.toString()})):c({page:"1",perPage:n.toString()}),f()},[n,t,i,s,r,f]);const p=a=>{s===a?g(r==="ASC"?"DESC":"ASC"):(v(a),g("ASC"))},A=a=>{a>=1&&a<=S&&(o(a),c({page:a.toString(),perPage:n.toString()}))},L=a=>{const d=Number(a.target.value);m(d),o(1),c({page:"1",perPage:d.toString()})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"inline-block",children:e.jsxs("div",{className:"flex mb-3 items-center gap-2",children:["Show",e.jsxs("select",{className:"select select-sm w-16",value:n,onChange:L,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),"per page"]})}),e.jsx("div",{className:"grid gap-5 lg:gap-4.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[90px]",children:e.jsxs("div",{className:"flex justify-between",onClick:()=>p("branch_id"),children:["Id",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(j,{color:s==="branch_id"&&r==="ASC"?"gray":"lightgray"}),e.jsx(b,{color:s==="branch_id"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("div",{className:"flex justify-between",onClick:()=>p("branch_name"),children:["Branch Name",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(j,{color:s==="branch_name"&&r==="ASC"?"gray":"lightgray"}),e.jsx(b,{color:s==="branch_name"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("div",{className:"flex justify-between",onClick:()=>p("branch_address"),children:["Branch Address",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(j,{color:s==="branch_address"&&r==="ASC"?"gray":"lightgray"}),e.jsx(b,{color:s==="branch_address"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("div",{className:"flex justify-between",onClick:()=>p("branch_email"),children:["Branch Email",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(j,{color:s==="branch_email"&&r==="ASC"?"gray":"lightgray"}),e.jsx(b,{color:s==="branch_email"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("div",{className:"flex justify-between",onClick:()=>p("branch_phone_number"),children:["Branch Phone no",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(j,{color:s==="branch_phone_number"&&r==="ASC"?"gray":"lightgray"}),e.jsx(b,{color:s==="branch_phone_number"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[230px]",children:e.jsxs("div",{className:"flex justify-between",onClick:()=>p("branch_manager"),children:["Branch Manager Name",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(j,{color:s==="branch_manager"&&r==="ASC"?"gray":"lightgray"}),e.jsx(b,{color:s==="branch_manager"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[190px]",children:e.jsxs("div",{className:"flex justify-between",onClick:()=>p("company_name"),children:["Company Name",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx("span",{children:e.jsx(j,{color:s==="company_name"&&r==="DESC"?"gray":"lightgray"})}),e.jsx("span",{children:e.jsx(b,{color:s==="company_name"&&r==="DESC"?"gray":"lightgray"})})]})]})}),e.jsx("th",{className:"w-[50px]",children:"Actions"})]})}),N?e.jsx(M,{}):h.length>0?e.jsx("tbody",{children:h.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.branch_id}),e.jsx("td",{children:e.jsx("span",{className:"cursor-pointer hover:text-primary",onClick:()=>x(`/branch-profile/${a.branch_id}`),children:a.branch_name})}),e.jsx("td",{children:a.branch_address}),e.jsx("td",{children:a.branch_email}),e.jsx("td",{children:a.branch_phone_number}),e.jsxs("td",{children:[a.branchManager.first_name," ",a.branchManager.last_name]}),e.jsx("td",{children:a.company.company_name}),e.jsx("td",{children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>E(a.branch_id),className:"bg-yellow-100 hover:bg-yellow-200 p-2 rounded-full",children:e.jsx(I,{className:"text-yellow-600"})}),e.jsx("button",{onClick:()=>T(a.branch_id),className:"bg-red-100 hover:bg-red-200 p-2 rounded-full",children:e.jsx(U,{className:"text-red-500"})})]})})]},a.branch_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center",children:"No branches available."})})})]})})})})}),y>n&&e.jsxs("div",{className:"flex items-center gap-4 mt-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",h.length," of ",y," Branches"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:t===1,onClick:()=>A(t-1),className:`btn ${t===1?"disabled":""}`,children:e.jsx(z,{})}),Array.from({length:S}).map((a,d)=>e.jsx("button",{className:`btn ${t===d+1?"active":""}`,onClick:()=>A(d+1),children:d+1},d)),e.jsx("button",{disabled:t===S,onClick:()=>A(t+1),className:`btn ${t===S?"disabled":""}`,children:e.jsx(G,{})})]})]})]})},O=()=>{const i=D(),[t,o]=l.useState(""),[n,m]=l.useState(""),[u,c]=l.useState(""),s=()=>{i("/branch/add")},v=async r=>{r.preventDefault();try{await H.validate({search:n},{abortEarly:!1}),o(n),c("")}catch(g){g instanceof V&&c(g.errors[0])}};return e.jsxs("div",{className:"container-fixed relative",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900 py-3",children:"Branch List"})}),e.jsx("button",{onClick:s,className:"btn btn-primary",children:"Add Branch"})]}),e.jsxs("div",{className:"absolute top-11 right-[2.5rem] mt-2",children:[e.jsxs("form",{onSubmit:v,className:"w-64 relative flex",children:[e.jsx("input",{type:"search",value:n,onChange:r=>{m(r.target.value),r.target.value===""&&o("")},className:"peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] text-gray-700 outline-none focus:border-gray-500 focus:bg-white border-gray-500",placeholder:"Search"}),e.jsx("button",{type:"submit",className:"relative z-[2] -ml-0.5 flex items-center rounded-e bg-gray-500 px-5 text-xs font-medium uppercase leading-normal text-white",children:e.jsx("svg",{fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"h-5 w-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})})})]}),e.jsx("p",{className:"absolute top-8 right-[0.2rem] mt-2 text-red-500 text-sm w-80",children:u||" "})]}),e.jsx(Z,{search:t})]})};export{O as default};