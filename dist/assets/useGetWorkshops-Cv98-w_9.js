import{r as s,_ as u}from"./index-2OuGMmVb.js";const E="http://3.110.208.70:3000/workshops",_=(a=1,n=10,r="",p,c,i)=>{const[S,d]=s.useState(),[w,y]=s.useState(0),[W,f]=s.useState(!1),h=async()=>{var k,l;const g=localStorage.getItem("authToken"),t=new URLSearchParams;a&&t.append("page_number",a.toString()),n&&t.append("per_page",n.toString()),r&&t.append("search",r),p&&t.append("sortBy",p),c&&t.append("order",c),i&&i.forEach(e=>t.append("workshop_manager_ids",e.toString())),f(!0);try{const e=await fetch(`${E}?${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`}}),o=await e.json();if(!e.ok){u.error(o.message,{position:"top-center"}),f(!1);return}d(((k=o==null?void 0:o.data)==null?void 0:k.workshops)||[]),y((l=o==null?void 0:o.data)==null?void 0:l.count)}catch{u.error("Network error: Failed to fetch workshops.")}finally{f(!1)}};return s.useEffect(()=>{h()},[a,n,r,p,c,i]),{workshops:S,totalWorkshops:w,loading:W,fetchWorkshops:h}};export{_ as u};
