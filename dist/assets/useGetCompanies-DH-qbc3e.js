import{r as n,V as d}from"./index-CRg_oNuF.js";const E="http://3.110.208.70:3000/companies",$=(o=1,a=10,s="",r,i,c)=>{const[m,S]=n.useState([]),[g,f]=n.useState(!1),[y,C]=n.useState(0),u=async()=>{var h,l;const T=localStorage.getItem("authToken"),t=new URLSearchParams;o&&t.append("page_number",o.toString()),a&&t.append("per_page",a.toString()),s&&t.append("search",s),r&&t.append("sort_by",r),i&&t.append("order",i),c&&t.append("companies_ownedby",c.toString()),f(!0);try{const p=await fetch(`${E}?${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`}}),e=await p.json();if(!p.ok){d.error(e.message,{position:"top-center"});return}S(((h=e==null?void 0:e.data)==null?void 0:h.result)||[]),C(((l=e==null?void 0:e.data)==null?void 0:l.count)||0)}catch{d.error("An error occurred while fetching data")}finally{f(!1)}};return n.useEffect(()=>{u()},[o,a,s,r,i,c]),{companies:m,loading:g,totalCount:y,fetchCompanies:u}};export{$ as u};
