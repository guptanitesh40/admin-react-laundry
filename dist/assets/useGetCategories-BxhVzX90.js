import{r as o,n as u}from"./index-DkLiFbUV.js";const m="http://3.110.208.70:3000/admin/categories",_=(a=1,s=10,n="",r,i)=>{const[d,h]=o.useState([]),[S,y]=o.useState(0),[E,c]=o.useState(!1),p=async()=>{var f,g;const T=localStorage.getItem("authToken"),t=new URLSearchParams;a&&t.append("page_number",a.toString()),s&&t.append("per_page",s.toString()),n&&t.append("search",n),r&&t.append("sort_by",r),i&&t.append("order",i),c(!0);try{const l=await fetch(`${m}?${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`}}),e=await l.json();if(!l.ok){u.error(e.message,{position:"top-center"}),c(!1);return}h(((f=e==null?void 0:e.data)==null?void 0:f.result)||[]),y((g=e==null?void 0:e.data)==null?void 0:g.count)}catch{u.error("Network error: Failed to fetch categories.")}finally{c(!1)}};return o.useEffect(()=>{p()},[a,s,n,r,i]),{categories:d,loading:E,totalCategories:S,fetchCategories:p}};export{_ as u};
