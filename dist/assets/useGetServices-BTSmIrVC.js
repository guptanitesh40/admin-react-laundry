import{r as o,B as k,V as d}from"./index-Bh52HvmB.js";const _=(n=1,a=10,r="",i,c)=>{const[h,l]=o.useState([]),[v,g]=o.useState(0),[m,p]=o.useState(!1),f=async()=>{var u,S;const y=localStorage.getItem("authToken"),t=new URLSearchParams;n&&t.append("page_number",n.toString()),a&&t.append("per_page",a.toString()),r&&t.append("search",r),i&&t.append("sort_by",i),c&&t.append("order",c),p(!0);try{const e=await fetch(`${k}/admin/services?${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`}});if(!e.ok){const w=await e.json();d.error(w.message,{position:"top-center"});return}const s=await e.json();l(((u=s==null?void 0:s.data)==null?void 0:u.services)||[]),g(((S=s==null?void 0:s.data)==null?void 0:S.count)||0)}catch(e){d.error((e==null?void 0:e.message)||"Network error: Failed to fetch services.",{position:"top-center"})}finally{p(!1)}};return o.useEffect(()=>{f()},[n,a,r,i,c]),{services:h,count:v,fetchServices:f,loading:m}};export{_ as u};
