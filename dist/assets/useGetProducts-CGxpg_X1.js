import{r as s,c as l}from"./index-CoHgHDWF.js";const k="http://3.110.208.70:3000/admin/products",$=(n=1,a=10,r="",c,i)=>{const[h,P]=s.useState([]),[S,g]=s.useState(0),[m,p]=s.useState(!1),u=async()=>{var d,f;const y=localStorage.getItem("authToken"),o=new URLSearchParams;n&&o.append("page_number",n.toString()),a&&o.append("per_page",a.toString()),r&&o.append("search",r),c&&o.append("sort_by",c),i&&o.append("order",i),p(!0);try{const t=await fetch(`${k}?${o}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`}});if(!t.ok){const _=await t.json();l.error(_.message,{position:"top-center"});return}const e=await t.json(),T=((d=e==null?void 0:e.data)==null?void 0:d.result)||[],w=((f=e==null?void 0:e.data)==null?void 0:f.count)||0;P(T),g(w)}catch(t){l.error((t==null?void 0:t.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{p(!1)}};return s.useEffect(()=>{u()},[n,a,r,c,i]),{products:h,loading:m,totalProducts:S,fetchProducts:u}};export{$ as u};
