import{r as p,B,_ as u}from"./index-BGpOCz7R.js";const x=(s=1,a=10,f="",c,i,d,r,o,l,g,h,E,L,k)=>{const[w,O]=p.useState([]),[$,R]=p.useState(0),[j,S]=p.useState(!1),m=async()=>{var T,y;const A=localStorage.getItem("authToken"),t=new URLSearchParams;s&&t.append("page_number",s.toString()),a&&t.append("per_page",a.toString()),f&&t.append("search",f),c&&t.append("sort_by",c),i&&t.append("order",i),o&&o.forEach(e=>t.append("order_statuses",e.toString())),l&&l.forEach(e=>t.append("customer_ids",e.toString())),g&&g.forEach(e=>t.append("branches_ids",e.toString())),h&&h.forEach(e=>t.append("pickup_boy_ids",e.toString())),E&&E.forEach(e=>t.append("delivery_boy_ids",e.toString())),d&&t.append("list",d),r&&t.append("orderList",r),S(!0);try{const e=await fetch(`${B}/admin/orders?${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A}`}}),n=await e.json();if(!e.ok){u.error(n.message,{position:"top-center"});return}O(((T=n==null?void 0:n.data)==null?void 0:T.orders)||[]),R(((y=n==null?void 0:n.data)==null?void 0:y.count)||0)}catch(e){u.error(e||"Network error: Failed to fetch.",{position:"top-center"})}finally{S(!1)}};return p.useEffect(()=>{m()},[s,a,f,c,i,o,l,g,h,E,L,k]),{orders:w,totalOrders:$,loading:j,fetchOrders:m}},U=()=>{const[s,a]=p.useState(!1);return{deleteOrder:async c=>{const i=localStorage.getItem("authToken"),d=`http://3.110.208.70:3000/admin/order/${c}`;a(!0);try{const r=await fetch(d,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`}}),o=await r.json();return r.ok?{success:!0,message:o.message}:(u.error(o.message,{position:"top-center"}),{success:!1,message:o.message})}catch(r){return u.error("An unexpected error occurred.",{position:"top-center"}),{success:!1,message:r.message}}finally{a(!1)}},loading:s}};export{U as a,x as u};
