import{r as o,B as w,c as d}from"./index-BXIzzU16.js";const _=(a=1,s=10,n="",r,i)=>{const[l,h]=o.useState([]),[S,y]=o.useState(0),[m,c]=o.useState(!1),p=async()=>{var f,u;const k=localStorage.getItem("authToken"),t=new URLSearchParams;a&&t.append("page_number",a.toString()),s&&t.append("per_page",s.toString()),n&&t.append("search",n),r&&t.append("sort_by",r),i&&t.append("order",i),c(!0);try{const g=await fetch(`${w}/admin/categories?${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`}}),e=await g.json();if(!g.ok){d.error(e.message,{position:"top-center"}),c(!1);return}h(((f=e==null?void 0:e.data)==null?void 0:f.result)||[]),y((u=e==null?void 0:e.data)==null?void 0:u.count)}catch{d.error("Network error: Failed to fetch categories.")}finally{c(!1)}};return o.useEffect(()=>{p()},[a,s,n,r,i]),{categories:l,loading:m,count:S,fetchCategories:p}};export{_ as u};
