import{r as a,V as g,u as H,e as O,j as e,T as Q,s as W,b as X,L as Y}from"./index-B-uNKBOV.js";import{u as Z}from"./useGetCategories-mEk_eARX.js";import{u as ee}from"./useGetProducts-B9oiQU5b.js";import{u as se}from"./useGetServices-CNKpJbLh.js";import{u as re}from"./useGetPrice-D5nVYRJr.js";const te="http://3.110.208.70:3000/prices",ae=()=>{const[m,i]=a.useState(!1);return{addPrice:async d=>{const u=localStorage.getItem("authToken");if(d.length===0)return g.error("No changes detected. Please provide a price to save.",{position:"top-center"}),!1;i(!0);try{const p={prices:d},f=await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify(p)});if(!f.ok){const j=(await f.json()).message;return g.error(j,{position:"top-center"}),!1}const C=await f.json();return g.success(C.message,{position:"top-center"}),!0}catch(p){return p.name==="TypeError"&&p.message.includes("Failed to fetch")?g.error("Network error: Failed to fetch.",{position:"top-center"}):g.error("An unexpected error occurred.",{position:"top-center"}),!1}finally{i(!1)}},loading:m}},ce=({isSave:m,setIsSave:i,setIsLoading:x})=>{const{categories:d}=Z(1,1e3),{products:u}=ee(1,1e3),{services:p}=se(1,1e3),{prices:f,loading:C,fetchPrices:E}=re(),{addPrice:j,loading:$}=ae(),[n,A]=a.useState({}),[_,w]=a.useState(new Set),b=a.useRef({}),[ie,L]=H(),[c,B]=a.useState(null),[h,k]=a.useState(null),[N,D]=a.useState(""),[P,V]=a.useState(""),[q,F]=a.useState(""),{hasPermission:v}=O(),y=a.useCallback((s,t,r,l)=>{const o=[];return s.forEach(I=>{t.forEach(R=>{r.forEach(G=>{const K=`${I.category_id}_${R.product_id}_${G.service_id}`;o.push({category:I,product:R,service:G,price:l[K]||0})})})}),o},[d,u,p,f])(d,u,p,f),T=y.filter(s=>{const t=N.toLowerCase();return s.category.name.toLowerCase().includes(t)||s.product.name.toLowerCase().includes(t)||s.service.name.toLowerCase().includes(t)}).sort((s,t)=>["category","product","service"].includes(c)?h==="ASC"?s[c].name.localeCompare(t[c].name):t[c].name.localeCompare(s[c].name):c==="price"?h==="ASC"?s.price-t.price:t.price-s.price:0);a.useEffect(()=>{if(m){if(!y.some(r=>{const l=`${r.category.category_id}_${r.product.product_id}_${r.service.service_id}`;return n[l]!==void 0&&n[l]!==r.price})){i(!1);return}const t=y.map(r=>{const l=`${r.category.category_id}_${r.product.product_id}_${r.service.service_id}`;return{category_id:r.category.category_id,product_id:r.product.product_id,service_id:r.service.service_id,price:n[l]!==void 0?n[l]:r.price}}).filter(r=>r.price>0);try{j(t).then(()=>{E().then(()=>{A({}),w(new Set)})})}catch{g.error("Failed to save prices.")}}i(!1)},[m,j,y,n]),a.useEffect(()=>{var t;const s=Array.from(_);if(s.length>0){const r=s[0];b.current[r]&&((t=b.current[r])==null||t.focus())}},[_]),a.useEffect(()=>{L(N?{search:N}:{})},[N]),a.useEffect(()=>{x(!!$)},[$]);const z=s=>{w(t=>{const r=new Set(t);return r.add(s),r})},M=(s,t)=>{A(r=>({...r,[s]:t}))},U=async s=>{s.preventDefault();try{await W.validate({search:P},{abortEarly:!1}),D(P),F("")}catch(t){t instanceof X&&F(t.errors[0])}},S=s=>{c===s?k(h==="ASC"?"DESC":"ASC"):(B(s),k("ASC"))},J=s=>{w(t=>{const r=new Set(t);return r.delete(s),r})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex-wrap container-fixed",children:e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:U,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:P,onChange:s=>{V(s.target.value),s.target.value===""&&D("")},placeholder:"Search...",className:"min-w-[185px]"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:q||" "})]})})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{"data-datatable":"true","data-datatable-page-size":"10",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[40px]",children:"Id"}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${c==="category"?h==="ASC"?"asc":"desc":""}`,onClick:()=>S("category"),children:[e.jsx("span",{className:"sort-label",children:"Category"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${c==="product"?h==="ASC"?"asc":"desc":""}`,onClick:()=>S("product"),children:[e.jsx("span",{className:"sort-label",children:"Product"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${c==="service"?h==="ASC"?"asc":"desc":""}`,onClick:()=>S("service"),children:[e.jsx("span",{className:"sort-label",children:"Service"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[200px]",children:e.jsxs("span",{className:`sort ${c==="price"?h==="ASC"?"asc":"desc":""}`,onClick:()=>S("price"),children:[e.jsx("span",{className:"sort-label",children:"Price"}),e.jsx("span",{className:"sort-icon"})]})})]})}),e.jsx("tbody",{children:C?e.jsx(Q,{}):T.length>0?T.map((s,t)=>{const r=`${s.category.category_id}_${s.product.product_id}_${s.service.service_id}`,l=_.has(r);return e.jsxs("tr",{className:`font-semibold ${s.price?"":"text-red-500"}`,children:[e.jsx("td",{children:t+1}),e.jsx("td",{children:s.category.name}),e.jsx("td",{children:s.product.name}),e.jsx("td",{children:s.service.name}),e.jsx("td",{className:"relative",children:l?e.jsx("input",{ref:o=>b.current[r]=o,type:"text",className:"w-full h-full absolute inset-0 input input-bordered",value:n[r]!==void 0?n[r]:s.price||"",onChange:o=>M(r,o.target.value===""?0:Number(o.target.value)),onBlur:()=>J(r),onKeyDown:o=>{o.key==="Enter"&&i(!0)}}):e.jsx("span",{className:`${v(10,"update")||v(10,"create")?"cursor-pointer h-full flex":"h-full flex"}`,onClick:v(10,"update")||v(10,"create")?()=>z(r):void 0,children:n[r]!==void 0?n[r]:s.price||"Add Price"})})]},t)}):e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No data available"})})})]})})})})})})})]})},he=()=>{const[m,i]=a.useState(!1),[x,d]=a.useState(!1),{hasPermission:u}=O();return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-3",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Price"})}),(u(10,"create")||u(10,"update"))&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("button",{onClick:()=>i(!0),className:"btn btn-primary",disabled:x,children:x?e.jsxs(e.Fragment,{children:[" ",e.jsx("i",{className:"ki-filled ki-plus-squared"})," Saving"," ",e.jsx(Y,{})," "]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ki-filled ki-plus-squared"})," Save"]})})})]})}),e.jsx(ce,{isSave:m,setIsSave:i,setIsLoading:d})]})};export{he as default};
