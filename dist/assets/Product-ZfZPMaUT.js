import{r as n,_ as g,j as e,V as $,u as z,F,a as L,T as R,b as M,c as _,d as O,e as G,S as E,s as V}from"./index-aVJcLekq.js";import{p as Y}from"./productSchema-C5rpQ3Vp.js";import{u as q}from"./useGetProducts-D0BMOjx7.js";const W=()=>{const[d,s]=n.useState(!1),[l,h]=n.useState(null);return{product:l,loading:d,fetchProduct:async t=>{var u;if(!t){h(null);return}const r=localStorage.getItem("authToken"),o=`http://35.154.167.170:3000/admin/products/${t}`;s(!0);try{const m=await fetch(o,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(!m.ok){const j=await m.json();g.error(j.message,{position:"top-center"}),s(!1);return}const c=await m.json();h((u=c==null?void 0:c.data)==null?void 0:u.product)}catch{g.error("Network error: Failed to fetch.")}finally{s(!1)}}}},Z="http://35.154.167.170:3000/admin/products",H=()=>{const[d,s]=n.useState(!1);return{addProduct:async h=>{const a=localStorage.getItem("authToken");s(!0);try{const t=await fetch(Z,{method:"POST",headers:{Authorization:a?`Bearer ${a}`:""},body:h});if(!t.ok){const u=(await t.json()).message;return g.error(u,{position:"top-center"}),!1}const r=await t.json();return g.success(r.message,{position:"top-center"}),!0}catch(t){return t.name==="TypeError"&&t.message.includes("Failed to fetch")?g.error("Network error: Failed to fetch.",{position:"top-center"}):g.error("An unexpected error occurred.",{position:"top-center"}),!1}finally{s(!1)}},loading:d}},J=()=>{const[d,s]=n.useState(!1);return{deleteProduct:async h=>{s(!0);const a=`http://35.154.167.170:3000/admin/products/${h}`;try{const t=localStorage.getItem("authToken"),r=await fetch(a,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}),o=await r.json();return t?r.ok?{success:!0,message:o.message}:(g.error(o.message,{position:"top-center"}),{success:!1,message:o.message}):(g.error(o.message,{position:"top-center"}),s(!1),{success:!1,message:o.message})}catch(t){return g.error(t.message,{position:"top-center"}),{success:!1,message:t.message}}finally{s(!1)}},loading:d}},K=()=>{const[d,s]=n.useState(!1);return{updateProduct:async(h,a)=>{s(!0);const t=`http://35.154.167.170:3000/admin/products/${h}`;try{const r=localStorage.getItem("authToken");if(!r)return g.error("No authentication token found",{position:"top-center"}),s(!1),!1;const o=await fetch(t,{method:"PUT",headers:{Authorization:`Bearer ${r}`},body:a});if(o.ok){const u=await o.json();return g.success(u.message,{position:"top-center"}),!0}else{const m=(await o.json()).message;return g.error(m,{position:"top-center"}),!1}}catch(r){return g.error(r.message,{position:"top-center"}),!1}finally{s(!1)}},loading:d}},Q=({isOpen:d,onClose:s,product_id:l,setIsSubmit:h})=>{const{addProduct:a,loading:t}=H(),{updateProduct:r,loading:o}=K(),{product:u,fetchProduct:m}=W(),[c,j]=n.useState({name:"",image:""}),[p,S]=n.useState({name:"",image:""}),[C,k]=n.useState({});n.useEffect(()=>{d&&l&&m(l)},[d,l]),n.useEffect(()=>{if(d&&u&&l){const N={name:u.name,image:u.image};j(N),S(N)}else j({name:"",image:""}),S({name:"",image:""}),k({})},[d,u,l]);const w=N=>{const{name:b,value:P,files:f}=N.target;b==="image"&&f&&f.length>0?j(v=>({...v,image:f[0]})):j(v=>({...v,[b]:P}))},x=async N=>{N.preventDefault();try{if(await Y(!!l).validate(c,{abortEarly:!1}),!Object.keys(c).some(v=>v==="image"?c.image instanceof File||c.image!==p.image:c[v]!==p[v])){s();return}const f=new FormData;f.append("name",c.name),c.image instanceof File&&f.append("image",c.image),l?await r(l,f):await a(f),h(!0),s()}catch(b){if(b instanceof $){const P={};b.inner.forEach(f=>{P[f.path||""]=f.message}),k(P)}else g.error("Failed to submit the form. Please try again.")}};return d?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:s}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-96 z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:s,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h1",{className:"text-2xl font-bold mb-6",children:l?"Edit Product":"Add Product"}),e.jsxs("form",{onSubmit:x,children:[e.jsxs("div",{className:"flex flex-col mb-4",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",value:c.name,onChange:w,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:C.name||" "})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"image",children:"Image"}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:w,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:C.image||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${t||o?"opacity-50 cursor-not-allowed":""}`,disabled:t||o,children:t||o?t?"Adding...":"Updating...":l?"Update Product":"Add Product"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:s,disabled:t||o,children:"Cancel"})]})]})]})]}):null},X=({search:d,setEditProduct:s,isSubmit:l,setIsSubmit:h})=>{const[a,t]=n.useState(1),[r,o]=n.useState(10),[u,m]=z(),[c,j]=n.useState(null),[p,S]=n.useState(null),C=u.get("page"),k=u.get("perPage"),{products:w,totalProducts:x,loading:N,fetchProducts:b}=q(a,r,d,c,p),P=Math.ceil(x/r);n.useEffect(()=>{l&&(b(),h(!1))},[l,b]);const{deleteProduct:f}=J(),v=async i=>{try{const{isConfirmed:y}=await E.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(y){const{success:U,message:T}=await f(i);U?(w.filter(B=>B.product_id!==i).length===0&&a>1&&(t(a-1),m({page:(a-1).toString(),perPage:r.toString()})),await b(),E.fire(T)):E.fire(T)}}catch(y){E.fire({title:"Error",text:y.message,icon:"error"})}};n.useEffect(()=>{C&&t(Number(C)),k&&o(Number(k))},[C,k]),n.useEffect(()=>{d&&(t(1),m({search:d,page:"1",perPage:r.toString()})),b()},[r,a,d,c,p,b]);const A=i=>{c===i?S(p==="ASC"?"DESC":"ASC"):(j(i),S("ASC"))},D=i=>{i>=1&&i<=P&&(t(i),m({page:i.toString(),perPage:r.toString()}))},I=i=>{const y=Number(i.target.value);o(y),t(1),m({page:"1",perPage:y.toString()})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"inline-block",children:e.jsxs("div",{className:"flex mb-3 items-center gap-2",children:["Show",e.jsxs("select",{className:"select select-sm w-16",value:r,onChange:I,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),"per page"]})}),e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[100px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>A("product_id"),children:["Id",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(F,{color:c==="product_id"&&p==="ASC"?"gray":"lightgray"}),e.jsx(L,{color:c==="product_id"&&p==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[165px]",children:e.jsxs("div",{className:"flex justify-between cursor-pointer",onClick:()=>A("name"),children:["Product name",e.jsxs("div",{className:"flex cursor-pointer",children:[e.jsx(F,{color:c==="name"&&p==="ASC"?"gray":"lightgray"}),e.jsx(L,{color:c==="name"&&p==="DESC"?"gray":"lightgray"})]})]})}),e.jsx("th",{className:"min-w-[100px]",children:e.jsxs("div",{className:"flex justify-between",children:["Image",e.jsx("div",{className:"flex "})]})}),e.jsx("th",{className:"w-[125px]",children:"Actions"})]})}),N?e.jsx(R,{}):w.length>0?e.jsx("tbody",{children:w.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:i.product_id}),e.jsx("td",{children:i.name}),e.jsx("td",{children:e.jsx("img",{alt:i.name,className:"rounded-lg size-20 shrink-0",src:i.image})}),e.jsxs("td",{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>s(i.product_id),children:e.jsx(M,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>v(i.product_id),children:e.jsx(_,{className:"text-red-500"})})]})]},i.product_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No products available"})})})]})})})})}),x>r&&e.jsxs("div",{className:"flex items-center gap-4 mt-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",w.length," of ",x," Branches"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:a===1,onClick:()=>D(a-1),className:`btn ${a===1?"disabled":""}`,children:e.jsx(O,{})}),Array.from({length:P}).map((i,y)=>e.jsx("button",{className:`btn ${a===y+1?"active":""}`,onClick:()=>D(y+1),children:y+1},y)),e.jsx("button",{disabled:a===P,onClick:()=>D(a+1),className:`btn ${a===P?"disabled":""}`,children:e.jsx(G,{})})]})]})]})},re=()=>{const[d,s]=n.useState(""),[l,h]=n.useState(""),[a,t]=n.useState(!1),[r,o]=n.useState(null),[u,m]=n.useState(!1),[c,j]=n.useState(!1),[p,S]=n.useState(""),C=()=>{m(!1),t(!0),o(null)},k=x=>{m(!0),o(x),t(!0)},w=async x=>{x.preventDefault();try{await V.validate({search:l},{abortEarly:!1}),s(l),S("")}catch(N){N instanceof $&&S(N.errors[0])}};return e.jsxs("div",{className:"container-fixed relative",children:[e.jsxs("div",{className:"flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5",children:[e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Products"}),e.jsxs("button",{onClick:C,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Product"]})]}),e.jsxs("div",{className:"absolute top-11 right-[2.5rem] mt-2",children:[e.jsxs("form",{onSubmit:w,className:"w-64 relative flex",children:[e.jsx("input",{type:"search",value:l,onChange:x=>{h(x.target.value),x.target.value===""&&s("")},className:"peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] text-gray-700 outline-none focus:border-gray-500 focus:bg-white border-gray-500",placeholder:"Search"}),e.jsx("button",{type:"submit",className:"relative z-[2] -ml-0.5 flex items-center rounded-e bg-gray-500 px-5 text-xs font-medium uppercase leading-normal text-white",children:e.jsx("svg",{fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"h-5 w-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})})})]}),e.jsx("p",{className:"absolute top-8 right-[0.2rem] mt-2 text-red-500 text-sm w-80",children:p||" "})]}),e.jsx(X,{search:d,isSubmit:c,setIsSubmit:j,setEditProduct:k}),e.jsx(Q,{setIsSubmit:j,isOpen:a,onClose:()=>t(!1),product_id:r})]})};export{re as default};