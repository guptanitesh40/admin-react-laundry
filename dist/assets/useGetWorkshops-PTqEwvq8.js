import{r as s,B as W,V as u}from"./index-B3hfs0zu.js";const T=(a=1,r=10,n="",p,c,i)=>{const[S,d]=s.useState(),[w,y]=s.useState(0),[g,f]=s.useState(!1),h=async()=>{var k,l;const E=localStorage.getItem("authToken"),t=new URLSearchParams;a&&t.append("page_number",a.toString()),r&&t.append("per_page",r.toString()),n&&t.append("search",n),p&&t.append("sortBy",p),c&&t.append("order",c),i&&i.forEach(e=>t.append("workshop_manager_ids",e.toString())),f(!0);try{const e=await fetch(`${W}/workshops?${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${E}`}}),o=await e.json();if(!e.ok){u.error(o.message,{position:"top-center"}),f(!1);return}d(((k=o==null?void 0:o.data)==null?void 0:k.workshops)||[]),y((l=o==null?void 0:o.data)==null?void 0:l.count)}catch{u.error("Network error: Failed to fetch workshops.")}finally{f(!1)}};return s.useEffect(()=>{h()},[a,r,n,p,c,i]),{workshops:S,totalWorkshops:w,loading:g,fetchWorkshops:h}};export{T as u};
