import{r as c,B as l,_ as t}from"./index-BGpOCz7R.js";const h=()=>{const[n,o]=c.useState(),a=localStorage.getItem("authToken");return{generateInvoice:async s=>{o(!0);try{const r=await fetch(`${l}/pdf/invoice/${s}`,{method:"GET",headers:{Authorization:`Bearer ${a}`}}),e=await r.json();if(r.ok){const i=e==null?void 0:e.url;window.open(i,"_blank")}else t.error((e==null?void 0:e.message)||"Failed to generate invoice")}catch{t.error("An error occurred while generating the invoice!")}finally{o(!1)}},loading:n}};export{h as u};
