import{r as s,B,V as S}from"./index-DmrRugRi.js";const L=(n=1,a=10,r="",p,c,i)=>{const[d,l]=s.useState(),[w,y]=s.useState(0),[g,f]=s.useState(!1),h=async()=>{var u,k;const E=localStorage.getItem("authToken"),t=new URLSearchParams;n&&t.append("page_number",n.toString()),a&&t.append("per_page",a.toString()),r&&t.append("search",r),p&&t.append("sortBy",p),c&&t.append("order",c),i&&i.forEach(e=>t.append("workshop_manager_ids",e.toString())),f(!0);try{const e=await fetch(`${B}/workshops?${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${E}`}}),o=await e.json();if(!e.ok){S.error(o.message,{position:"top-center"}),f(!1);return}l(((u=o==null?void 0:o.data)==null?void 0:u.workshops)||[]),y((k=o==null?void 0:o.data)==null?void 0:k.count)}catch{S.error("Network error: Failed to fetch workshops.")}finally{f(!1)}};return s.useEffect(()=>{h()},[n,a,r,p,c,i]),{workshops:d,count:w,loading:g,fetchWorkshops:h}};export{L as u};
