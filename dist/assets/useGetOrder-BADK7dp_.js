import{r as a,_ as c}from"./index-BsXSBe6J.js";const h=()=>{const[i,r]=a.useState(!1),[l,o]=a.useState(null);return{order:l,loading:i,fetchOrder:async s=>{var n;if(!s){o(null);return}const p=localStorage.getItem("authToken"),u=`http://3.110.208.70:3000/admin/order/${s}`;r(!0);try{const e=await fetch(u,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`}}),t=await e.json();if(!e.ok){c.error(t.message,{position:"top-center"}),r(!1);return}o((n=t==null?void 0:t.data)==null?void 0:n.orders)}catch(e){c.error((e==null?void 0:e.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{r(!1)}}}};export{h as u};
