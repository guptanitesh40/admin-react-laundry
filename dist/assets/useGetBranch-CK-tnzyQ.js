import{r as s,V as c}from"./index-6FG022z5.js";const g=()=>{const[h,e]=s.useState(!1),[i,o]=s.useState(null);return{branch:i,loading:h,fetchBranch:async a=>{var n;if(!a){o(null);return}const l=localStorage.getItem("authToken"),u=`http://3.110.208.70:3000/branches/${a}`;e(!0);try{const t=await fetch(u,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`}});if(!t.ok){const f=await t.json();c.error(f.message,{position:"top-center"}),e(!1);return}const r=await t.json();o((n=r==null?void 0:r.data)==null?void 0:n.result)}catch{c.error("Network error: Failed to fetch.")}finally{e(!1)}}}};export{g as u};
