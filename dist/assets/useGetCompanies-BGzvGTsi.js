import{r as n,B as w,V as S}from"./index-CRy1hVzF.js";const B=(o=1,a=10,s="",r,i,c)=>{const[l,m]=n.useState([]),[g,f]=n.useState(!1),[y,E]=n.useState(0),u=async()=>{var d,h;const k=localStorage.getItem("authToken"),t=new URLSearchParams;o&&t.append("page_number",o.toString()),a&&t.append("per_page",a.toString()),s&&t.append("search",s),r&&t.append("sort_by",r),i&&t.append("order",i),c&&t.append("companies_ownedby",c.toString()),f(!0);try{const p=await fetch(`${w}/companies?${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`}}),e=await p.json();if(!p.ok){S.error(e.message,{position:"top-center"});return}m(((d=e==null?void 0:e.data)==null?void 0:d.result)||[]),E(((h=e==null?void 0:e.data)==null?void 0:h.count)||0)}catch{S.error("An error occurred while fetching data")}finally{f(!1)}};return n.useEffect(()=>{u()},[o,a,s,r,i,c]),{companies:l,loading:g,count:y,fetchCompanies:u}};export{B as u};
