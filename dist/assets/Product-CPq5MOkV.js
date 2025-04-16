import{r,V as f,j as e,b as $,u as _,e as I,T as J,F as Y,f as q,P as H,s as K}from"./index-CF8J22nX.js";import{p as Q}from"./productSchema-cGVMh2ad.js";import{u as W}from"./useGetProducts-vxiJXjGz.js";import{S as D}from"./sweetalert2.esm.all-B0Dix5B2.js";const X=()=>{const[m,s]=r.useState(!1),[o,c]=r.useState(null);return{product:o,loading:m,fetchProduct:async t=>{var l;if(!t){c(null);return}const i=localStorage.getItem("authToken"),n=`http://3.110.208.70:3000/admin/products/${t}`;s(!0);try{const g=await fetch(n,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`}});if(!g.ok){const p=await g.json();f.error(p.message,{position:"top-center"}),s(!1);return}const u=await g.json();c((l=u==null?void 0:u.data)==null?void 0:l.product)}catch{f.error("Network error: Failed to fetch.")}finally{s(!1)}}}},Z="http://3.110.208.70:3000/admin/products",ee=()=>{const[m,s]=r.useState(!1);return{addProduct:async c=>{const h=localStorage.getItem("authToken");s(!0);try{const t=await fetch(Z,{method:"POST",headers:{Authorization:h?`Bearer ${h}`:""},body:c});if(!t.ok){const l=(await t.json()).message;return f.error(l,{position:"top-center"}),!1}const i=await t.json();return f.success(i.message,{position:"top-center"}),!0}catch(t){return t.name==="TypeError"&&t.message.includes("Failed to fetch")?f.error("Network error: Failed to fetch.",{position:"top-center"}):f.error("An unexpected error occurred.",{position:"top-center"}),!1}finally{s(!1)}},loading:m}},te=()=>{const[m,s]=r.useState(!1);return{deleteProduct:async c=>{s(!0);const h=`http://3.110.208.70:3000/admin/products/${c}`;try{const t=localStorage.getItem("authToken"),i=await fetch(h,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}),n=await i.json();return t?i.ok?{success:!0,message:n.message}:(f.error(n.message,{position:"top-center"}),{success:!1,message:n.message}):(f.error(n.message,{position:"top-center"}),s(!1),{success:!1,message:n.message})}catch(t){return f.error(t.message,{position:"top-center"}),{success:!1,message:t.message}}finally{s(!1)}},loading:m}},se=()=>{const[m,s]=r.useState(!1);return{updateProduct:async(c,h)=>{s(!0);const t=`http://3.110.208.70:3000/admin/products/${c}`;try{const i=localStorage.getItem("authToken");if(!i)return f.error("No authentication token found",{position:"top-center"}),s(!1),!1;const n=await fetch(t,{method:"PUT",headers:{Authorization:`Bearer ${i}`},body:h});if(n.ok){const l=await n.json();return f.success(l.message,{position:"top-center"}),!0}else{const g=(await n.json()).message;return f.error(g,{position:"top-center"}),!1}}catch(i){return f.error(i.message,{position:"top-center"}),!1}finally{s(!1)}},loading:m}},ae=({isOpen:m,onClose:s,product_id:o,setIsSubmit:c})=>{const{addProduct:h,loading:t}=ee(),{updateProduct:i,loading:n}=se(),{product:l,fetchProduct:g}=X(),[u,p]=r.useState({name:"",image:""}),[y,w]=r.useState({name:"",image:""}),[v,b]=r.useState({});r.useEffect(()=>{m&&o&&g(o)},[m,o]),r.useEffect(()=>{if(m&&l&&o){const N={name:l.name,image:l.image};p(N),w(N)}else p({name:"",image:""}),w({name:"",image:""}),b({})},[m,l,o]);const E=N=>{const{name:P,value:S,files:d}=N.target;P==="image"&&d&&d.length>0?p(x=>({...x,image:d[0]})):p(x=>({...x,[P]:S}))},k=async N=>{N.preventDefault();try{if(await Q(!!o).validate(u,{abortEarly:!1}),!Object.keys(u).some(x=>x==="image"?u.image instanceof File||u.image!==y.image:u[x]!==y[x])){s();return}const d=new FormData;d.append("name",u.name),u.image instanceof File&&d.append("image",u.image),o?await i(o,d):await h(d),c(!0),s()}catch(P){if(P instanceof $){const S={};P.inner.forEach(d=>{S[d.path||""]=d.message}),b(S)}else f.error("Failed to submit the form. Please try again.")}};return m?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:s}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg min-w-96 zx:min-w-[85%] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:s,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h1",{className:"text-2xl font-bold mb-6",children:o?"Edit Product":"Add Product"}),e.jsx("form",{onSubmit:k,children:e.jsxs("div",{className:"grid grid-cols-1 gap-3",children:[e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",autoComplete:"off",value:u.name,onChange:E,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:v.name||" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("label",{className:"font-semibold",htmlFor:"image",children:"Image"}),e.jsx("span",{className:"text-sm text-gray-500",children:"(JPG, JPEG, PNG | 85×85 px)"})]}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:E,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:v.image||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${t||n?"opacity-50 cursor-not-allowed":""}`,disabled:t||n,children:t||n?t?"Adding...":"Updating...":o?"Update Product":"Add Product"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:s,disabled:t||n,children:"Cancel"})]})]})})]})]}):null},re=({setEditProduct:m,isSubmit:s,setIsSubmit:o})=>{const[c,h]=r.useState(1),[t,i]=r.useState(10),[n,l]=_(),[g,u]=r.useState(null),[p,y]=r.useState(null),w=n.get("page"),v=n.get("perPage"),[b,E]=r.useState(""),[k,N]=r.useState(""),[P,S]=r.useState(""),{products:d,count:x,loading:U,fetchProducts:T}=W(c,t,b,g,p),{hasPermission:C}=I(),z=Math.ceil(x/t);r.useEffect(()=>{s&&(T(),o(!1))},[s,T]);const{deleteProduct:L}=te(),B=async a=>{try{const{isConfirmed:j}=await D.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(j){const{success:O,message:F}=await L(a);O?(d.filter(V=>V.product_id!==a).length===0&&c>1&&(h(c-1),l({page:(c-1).toString(),perPage:t.toString()})),await T(),D.fire(F)):D.fire(F)}}catch(j){D.fire({title:"Error",text:j.message,icon:"error"})}};r.useEffect(()=>{w&&h(Number(w)),v&&i(Number(v))},[w,v]),r.useEffect(()=>{b&&(h(1),l({search:b,page:"1",perPage:t.toString()}))},[b]);const R=async a=>{a.preventDefault();try{await K.validate({search:b},{abortEarly:!1}),E(k),S("")}catch(j){j instanceof $&&S(j.errors[0])}},A=a=>{g===a?y(p==="ASC"?"DESC":"ASC"):(u(a),y("ASC"))},G=a=>{a>=1&&a<=z&&(h(a),l({page:a.toString(),perPage:t.toString()}))},M=a=>{const j=Number(a.target.value);i(j),h(1),l({page:"1",perPage:j.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:t,onChange:M,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:R,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:k,onChange:a=>{N(a.target.value),a.target.value===""&&E("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:P||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${g==="product_id"?p==="ASC"?"asc":"desc":""}`,onClick:()=>A("product_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[690px]",children:e.jsxs("span",{className:`sort ${g==="name"?p==="ASC"?"asc":"desc":""}`,onClick:()=>A("name"),children:[e.jsx("span",{className:"sort-label",children:"Product name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[125px]",children:e.jsxs("div",{className:"flex justify-between",children:["Image",e.jsx("div",{className:"flex "})]})}),(C(6,"update")||C(6,"delete"))&&e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),U?e.jsx(J,{}):d.length>0?e.jsx("tbody",{children:d.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:a.product_id})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:a.name})}),e.jsx("td",{children:e.jsx("img",{alt:a.name,className:"rounded-lg size-20 shrink-0",src:a.image})}),(C(6,"update")||C(6,"delete"))&&e.jsxs("td",{children:[C(6,"update")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>m(a.product_id),children:e.jsx(Y,{className:"text-yellow-600"})}),C(6,"delete")&&e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>B(a.product_id),children:e.jsx(q,{className:"text-red-500"})})]})]},a.product_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No Product available"})})})]})}),e.jsx(H,{count:x,currentPage:c,totalRecords:d==null?void 0:d.length,perPage:t,onPageChange:G,label:"products"})]})})]})},de=()=>{const[m,s]=r.useState(!1),[o,c]=r.useState(null),[h,t]=r.useState(!1),[i,n]=r.useState(!1),{hasPermission:l}=I(),g=()=>{t(!1),s(!0),c(null)},u=p=>{t(!0),c(p),s(!0)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Products"})}),l(6,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:g,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Product"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(re,{isSubmit:i,setIsSubmit:n,setEditProduct:u})})})}),e.jsx(ae,{setIsSubmit:n,isOpen:m,onClose:()=>s(!1),product_id:o})]})};export{de as default};
