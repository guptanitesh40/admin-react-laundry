import{r as o,V as u}from"./index-6FG022z5.js";const k="http://3.110.208.70:3000/admin/services",j=(a=1,n=10,r="",c,i)=>{const[v,d]=o.useState([]),[h,g]=o.useState(0),[m,p]=o.useState(!1),f=async()=>{var S,l;const y=localStorage.getItem("authToken"),t=new URLSearchParams;a&&t.append("page_number",a.toString()),n&&t.append("per_page",n.toString()),r&&t.append("search",r),c&&t.append("sort_by",c),i&&t.append("order",i);const E=`${k}?${t}`;p(!0);try{const e=await fetch(E,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`}});if(!e.ok){const _=await e.json();u.error(_.message,{position:"top-center"});return}const s=await e.json(),w=((S=s==null?void 0:s.data)==null?void 0:S.services)||[],T=((l=s==null?void 0:s.data)==null?void 0:l.count)||0;d(w),g(T)}catch(e){u.error((e==null?void 0:e.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{p(!1)}};return o.useEffect(()=>{f()},[a,n,r,c,i]),{services:v,totalServices:h,fetchServices:f,loading:m}};export{j as u};
