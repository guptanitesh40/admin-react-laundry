import{r,B as f,c as a}from"./index-Epl70b2T.js";const l=()=>{const[n,c]=r.useState([]),[i,o]=r.useState(!0),s=async()=>{const p=localStorage.getItem("authToken");o(!0);try{const e=await fetch(`${f}/prices`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`}});if(!e.ok){const u=await e.json();a.error(u.message,{position:"top-center"});return}const t=await e.json();c((t==null?void 0:t.data)||[])}catch{a.error("Network error: Failed to fetch.")}finally{o(!1)}};return r.useEffect(()=>{s()},[]),{prices:n,loading:i,fetchPrices:s}};export{l as u};
