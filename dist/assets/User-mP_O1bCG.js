import{r as i,_ as A,u as M,k as T,j as e,F as z,b as q,d as V,e as Y,V as W}from"./index-ekHY3xQj.js";import{F as b,a as y,s as Z}from"./searchSchema-BZfm46a9.js";import{u as H}from"./useGetCompanies-Df0G4sLJ.js";import{u as J}from"./useGetBranches-DCiMEsW0.js";import{T as K,S as _}from"./TableShimmer-BaU0WSyA.js";import{G as O,R as Q}from"./enums-tzNm48ue.js";const X="http://35.154.167.170:3000/user",ee=(d=1,a=10,c="",l,h)=>{const[p,o]=i.useState([]),[t,S]=i.useState(0),[r,u]=i.useState(!1),N=i.useCallback(async()=>{var w,j;const v=localStorage.getItem("authToken"),x=new URLSearchParams;d&&x.append("page_number",d.toString()),a&&x.append("per_page",a.toString()),c&&x.append("search",c),l&&x.append("sortBy",l),h&&x.append("order",h),u(!0);try{const m=await fetch(`${X}?${x}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`}});if(!m.ok){const E=await m.json();A.error(E.message,{position:"top-center"});return}const g=await m.json(),U=((w=g==null?void 0:g.data)==null?void 0:w.users)||[],k=((j=g==null?void 0:g.data)==null?void 0:j.count)||0;o(U),S(k)}catch(m){A.error((m==null?void 0:m.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{u(!1)}},[d,a,h,l,c]);return{users:p,totalUsers:t,loading:r,fetchUsers:N}},se=()=>{const[d,a]=i.useState(!1);return{deleteUser:async l=>{a(!0);const h=`http://35.154.167.170:3000/user/${l}`,p=localStorage.getItem("authToken");try{const o=await fetch(h,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`}}),t=await o.json();return o.ok?{success:!0,message:t.message}:(A.error(t.message,{position:"top-center"}),{success:!1,message:t.message})}catch(o){return{success:!1,message:o.message}}finally{a(!1)}},loading:d}},te=({search:d})=>{const[a,c]=i.useState(1),[l,h]=i.useState(10),[p,o]=M(),[t,S]=i.useState(null),[r,u]=i.useState(null),N=p.get("page"),v=p.get("perPage"),x=1e3,w=1,{users:j,fetchUsers:m,totalUsers:g,loading:U}=ee(a,l,d,t,r),{deleteUser:k}=se(),{companies:E}=H(w,x),{branches:L}=J(w,x),F=T(),C=Math.ceil(g/l),B=s=>{F(`/user/edit/${s}`)};i.useEffect(()=>{N&&c(Number(N)),v&&h(Number(v))},[N,v]),i.useEffect(()=>{d&&(c(1),o({search:d,page:"1",perPage:l.toString()})),m()},[l,a,d,t,r,m]);const $=async s=>{try{const{isConfirmed:n}=await _.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(n){const{success:G,message:D}=await k(s);G?(j.filter(I=>I.user_id!==s).length===0&&a>1&&(c(a-1),o({page:(a-1).toString(),perPage:l.toString()})),await m(),_.fire(D)):_.fire(D)}}catch(n){_.fire({title:"Error",text:n.message,icon:"error"})}},f=s=>{t===s?u(r==="ASC"?"DESC":"ASC"):(S(s),u("ASC"))},P=s=>{s>=1&&s<=C&&(c(s),o({page:s.toString(),perPage:l.toString()}))},R=s=>{const n=Number(s.target.value);h(n),c(1),o({page:"1",perPage:n.toString()})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"inline-block",children:e.jsxs("div",{className:"flex mb-3 items-center gap-2",children:["Show",e.jsxs("select",{className:"select select-sm w-16",value:l,onChange:R,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),"per page"]})}),e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[100px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>f("user_id"),children:["Id",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(b,{color:t==="user_id"&&r==="ASC"?"gray":"lightgray"}),e.jsx(y,{color:t==="user_id"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[165px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>f("first_name"),children:["User name",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(b,{color:t==="first_name"&&r==="ASC"?"gray":"lightgray"}),e.jsx(y,{color:t==="first_name"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>f("email"),children:["Email",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(b,{color:t==="email"&&r==="ASC"?"gray":"lightgray"}),e.jsx(y,{color:t==="email"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[165px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>f("mobile_number"),children:["Mobile no",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(b,{color:t==="mobile_number"&&r==="ASC"?"gray":"lightgray"}),e.jsx(y,{color:t==="mobile_number"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[150px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>f("gender"),children:["Gender",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(b,{color:t==="gender"&&r==="ASC"?"gray":"lightgray"}),e.jsx(y,{color:t==="gender"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[170px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>f("role_id"),children:["Role",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(b,{color:t==="role_id"&&r==="ASC"?"gray":"lightgray"}),e.jsx(y,{color:t==="role_id"&&r==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[250px]",children:"Companies"}),e.jsx("th",{className:"min-w-[250px]",children:"Branches"}),e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),U?e.jsx(K,{}):j.length>0?e.jsx("tbody",{children:j.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:s.user_id}),e.jsxs("td",{children:[s.first_name," ",s.last_name]}),e.jsx("td",{children:s.email}),e.jsx("td",{children:s.mobile_number}),e.jsx("td",{children:O[s.gender]}),e.jsx("td",{children:Q[s.role_id]}),e.jsx("td",{children:E.filter(n=>s.company_ids.includes(n.company_id)).map(n=>n.company_name).join(", ")}),e.jsx("td",{children:L.filter(n=>s.branch_ids.includes(n.branch_id)).map(n=>n.branch_name).join(", ")}),e.jsxs("td",{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>B(s.user_id),children:e.jsx(z,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>$(s.user_id),children:e.jsx(q,{className:"text-red-500"})})]})]},s.user_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No users available"})})})]})})})})}),g>l&&e.jsxs("div",{className:"flex items-center gap-4 mt-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",j.length," of ",g," Users"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:a===1,onClick:()=>P(a-1),className:`btn ${a===1?"disabled":""}`,children:e.jsx(V,{})}),Array.from({length:C}).map((s,n)=>e.jsx("button",{className:`btn ${a===n+1?"active":""}`,onClick:()=>P(n+1),children:n+1},n)),e.jsx("button",{disabled:a===C,onClick:()=>P(a+1),className:`btn ${a===C?"disabled":""}`,children:e.jsx(Y,{})})]})]})]})},de=()=>{const d=T(),[a,c]=i.useState(""),[l,h]=i.useState(""),[p,o]=i.useState(""),t=()=>{d("/user/add")},S=async r=>{r.preventDefault();try{await Z.validate({search:l},{abortEarly:!1}),c(l),o("")}catch(u){u instanceof W&&o(u.errors[0])}};return e.jsxs("div",{className:"container-fixed relative",children:[e.jsxs("div",{className:"flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5",children:[e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Users"}),e.jsxs("button",{onClick:t,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add User"]})]}),e.jsxs("div",{className:"absolute top-11 right-[2.5rem] mt-2",children:[e.jsxs("form",{onSubmit:S,className:"w-64 relative flex",children:[e.jsx("input",{type:"search",value:l,onChange:r=>{h(r.target.value),r.target.value===""&&c("")},className:"peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] text-gray-700 outline-none focus:border-gray-500 focus:bg-white border-gray-500",placeholder:"Search"}),e.jsx("button",{type:"submit",className:"relative z-[2] -ml-0.5 flex items-center rounded-e bg-gray-500 px-5 text-xs font-medium uppercase leading-normal text-white",children:e.jsx("svg",{fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"h-5 w-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})})})]}),e.jsx("p",{className:"absolute top-8 right-[0.2rem] mt-2 text-red-500 text-sm w-80",children:p||" "})]}),e.jsx(te,{search:a})]})};export{de as default};
