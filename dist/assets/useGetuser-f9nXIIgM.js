import{r,_ as n}from"./index-C4DC31mm.js";const g=()=>{const[c,e]=r.useState(!1),[i,s]=r.useState(null);return{userData:i,loading:c,fetchUser:async a=>{if(!a){s(null);return}const l=localStorage.getItem("authToken"),u=`http://35.154.167.170:3000/user/${a}`;e(!0);try{const t=await fetch(u,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`}});if(!t.ok){const p=await t.json();n.error(p.message,{position:"top-center"}),e(!1);return}const o=await t.json();s(o==null?void 0:o.data)}catch(t){n.error((t==null?void 0:t.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{e(!1)}}}};export{g as u};