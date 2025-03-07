import{r as n,V as p,j as e,b as U,u as V,e as L,T as J,F as Y,f as q,g as H,h as K,s as Q}from"./index-gEaxyYvd.js";import{p as W}from"./productSchema-CnrsKbSu.js";import{u as X}from"./useGetProducts-DhSOpG22.js";import{S as A}from"./sweetalert2.esm.all-B0Dix5B2.js";const Z=()=>{const[d,s]=n.useState(!1),[o,r]=n.useState(null);return{product:o,loading:d,fetchProduct:async t=>{var l;if(!t){r(null);return}const i=localStorage.getItem("authToken"),c=`http://3.110.208.70:3000/admin/products/${t}`;s(!0);try{const g=await fetch(c,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`}});if(!g.ok){const x=await g.json();p.error(x.message,{position:"top-center"}),s(!1);return}const m=await g.json();r((l=m==null?void 0:m.data)==null?void 0:l.product)}catch{p.error("Network error: Failed to fetch.")}finally{s(!1)}}}},ee="http://3.110.208.70:3000/admin/products",te=()=>{const[d,s]=n.useState(!1);return{addProduct:async r=>{const u=localStorage.getItem("authToken");s(!0);try{const t=await fetch(ee,{method:"POST",headers:{Authorization:u?`Bearer ${u}`:""},body:r});if(!t.ok){const l=(await t.json()).message;return p.error(l,{position:"top-center"}),!1}const i=await t.json();return p.success(i.message,{position:"top-center"}),!0}catch(t){return t.name==="TypeError"&&t.message.includes("Failed to fetch")?p.error("Network error: Failed to fetch.",{position:"top-center"}):p.error("An unexpected error occurred.",{position:"top-center"}),!1}finally{s(!1)}},loading:d}},se=()=>{const[d,s]=n.useState(!1);return{deleteProduct:async r=>{s(!0);const u=`http://3.110.208.70:3000/admin/products/${r}`;try{const t=localStorage.getItem("authToken"),i=await fetch(u,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}),c=await i.json();return t?i.ok?{success:!0,message:c.message}:(p.error(c.message,{position:"top-center"}),{success:!1,message:c.message}):(p.error(c.message,{position:"top-center"}),s(!1),{success:!1,message:c.message})}catch(t){return p.error(t.message,{position:"top-center"}),{success:!1,message:t.message}}finally{s(!1)}},loading:d}},ae=()=>{const[d,s]=n.useState(!1);return{updateProduct:async(r,u)=>{s(!0);const t=`http://3.110.208.70:3000/admin/products/${r}`;try{const i=localStorage.getItem("authToken");if(!i)return p.error("No authentication token found",{position:"top-center"}),s(!1),!1;const c=await fetch(t,{method:"PUT",headers:{Authorization:`Bearer ${i}`},body:u});if(c.ok){const l=await c.json();return p.success(l.message,{position:"top-center"}),!0}else{const g=(await c.json()).message;return p.error(g,{position:"top-center"}),!1}}catch(i){return p.error(i.message,{position:"top-center"}),!1}finally{s(!1)}},loading:d}},re=({isOpen:d,onClose:s,product_id:o,setIsSubmit:r})=>{const{addProduct:u,loading:t}=te(),{updateProduct:i,loading:c}=ae(),{product:l,fetchProduct:g}=Z(),[m,x]=n.useState({name:"",image:""}),[y,v]=n.useState({name:"",image:""}),[w,b]=n.useState({});n.useEffect(()=>{d&&o&&g(o)},[d,o]),n.useEffect(()=>{if(d&&l&&o){const N={name:l.name,image:l.image};x(N),v(N)}else x({name:"",image:""}),v({name:"",image:""}),b({})},[d,l,o]);const k=N=>{const{name:P,value:S,files:h}=N.target;P==="image"&&h&&h.length>0?x(j=>({...j,image:h[0]})):x(j=>({...j,[P]:S}))},E=async N=>{N.preventDefault();try{if(await W(!!o).validate(m,{abortEarly:!1}),!Object.keys(m).some(j=>j==="image"?m.image instanceof File||m.image!==y.image:m[j]!==y[j])){s();return}const h=new FormData;h.append("name",m.name),m.image instanceof File&&h.append("image",m.image),o?await i(o,h):await u(h),r(!0),s()}catch(P){if(P instanceof U){const S={};P.inner.forEach(h=>{S[h.path||""]=h.message}),b(S)}else p.error("Failed to submit the form. Please try again.")}};return d?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:s}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg min-w-96 zx:min-w-[85%] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:s,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h1",{className:"text-2xl font-bold mb-6",children:o?"Edit Product":"Add Product"}),e.jsx("form",{onSubmit:E,children:e.jsxs("div",{className:"grid grid-cols-1 gap-3",children:[e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",value:m.name,onChange:k,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:w.name||" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("label",{className:"font-semibold",htmlFor:"image",children:"Image"}),e.jsx("span",{className:"text-sm text-gray-500",children:"(JPG, JPEG, PNG | 85×85 px)"})]}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:k,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:w.image||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${t||c?"opacity-50 cursor-not-allowed":""}`,disabled:t||c,children:t||c?t?"Adding...":"Updating...":o?"Update Product":"Add Product"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:s,disabled:t||c,children:"Cancel"})]})]})})]})]}):null},ne=({setEditProduct:d,isSubmit:s,setIsSubmit:o})=>{const[r,u]=n.useState(1),[t,i]=n.useState(10),[c,l]=V(),[g,m]=n.useState(null),[x,y]=n.useState(null),v=c.get("page"),w=c.get("perPage"),[b,k]=n.useState(""),[E,N]=n.useState(""),[P,S]=n.useState(""),{products:h,totalProducts:j,loading:z,fetchProducts:T}=X(r,t,b,g,x),{hasPermission:C}=L(),D=Math.ceil(j/t);n.useEffect(()=>{s&&(T(),o(!1))},[s,T]);const{deleteProduct:B}=se(),R=async a=>{try{const{isConfirmed:f}=await A.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(f){const{success:O,message:I}=await B(a);O?(h.filter(_=>_.product_id!==a).length===0&&r>1&&(u(r-1),l({page:(r-1).toString(),perPage:t.toString()})),await T(),A.fire(I)):A.fire(I)}}catch(f){A.fire({title:"Error",text:f.message,icon:"error"})}};n.useEffect(()=>{v&&u(Number(v)),w&&i(Number(w))},[v,w]),n.useEffect(()=>{b&&(u(1),l({search:b,page:"1",perPage:t.toString()}))},[b]);const G=async a=>{a.preventDefault();try{await Q.validate({search:b},{abortEarly:!1}),k(E),S("")}catch(f){f instanceof U&&S(f.errors[0])}},$=a=>{g===a?y(x==="ASC"?"DESC":"ASC"):(m(a),y("ASC"))},F=a=>{a>=1&&a<=D&&(u(a),l({page:a.toString(),perPage:t.toString()}))},M=a=>{const f=Number(a.target.value);i(f),u(1),l({page:"1",perPage:f.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:t,onChange:M,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:G,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:E,onChange:a=>{N(a.target.value),a.target.value===""&&k("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:P||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${g==="product_id"?x==="ASC"?"asc":"desc":""}`,onClick:()=>$("product_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[690px]",children:e.jsxs("span",{className:`sort ${g==="name"?x==="ASC"?"asc":"desc":""}`,onClick:()=>$("name"),children:[e.jsx("span",{className:"sort-label",children:"Product name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[125px]",children:e.jsxs("div",{className:"flex justify-between",children:["Image",e.jsx("div",{className:"flex "})]})}),(C(6,"update")||C(6,"delete"))&&e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),z?e.jsx(J,{}):h.length>0?e.jsx("tbody",{children:h.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:a.product_id})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:a.name})}),e.jsx("td",{children:e.jsx("img",{alt:a.name,className:"rounded-lg size-20 shrink-0",src:a.image})}),(C(6,"update")||C(6,"delete"))&&e.jsxs("td",{children:[C(6,"update")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>d(a.product_id),children:e.jsx(Y,{className:"text-yellow-600"})}),C(6,"delete")&&e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>R(a.product_id),children:e.jsx(q,{className:"text-red-500"})})]})]},a.product_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No Products available"})})})]})}),j>t&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",h.length," of ",j," Users"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:r===1,onClick:()=>F(r-1),className:`btn ${r===1?"disabled":""}`,children:e.jsx(H,{})}),Array.from({length:D}).map((a,f)=>e.jsx("button",{className:`btn ${r===f+1?"active":""}`,onClick:()=>F(f+1),children:f+1},f)),e.jsx("button",{disabled:r===D,onClick:()=>F(r+1),className:`btn ${r===D?"disabled":""}`,children:e.jsx(K,{})})]})]})})]})})]})},me=()=>{const[d,s]=n.useState(!1),[o,r]=n.useState(null),[u,t]=n.useState(!1),[i,c]=n.useState(!1),{hasPermission:l}=L(),g=()=>{t(!1),s(!0),r(null)},m=x=>{t(!0),r(x),s(!0)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Products"})}),l(6,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:g,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Product"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(ne,{isSubmit:i,setIsSubmit:c,setEditProduct:m})})})}),e.jsx(re,{setIsSubmit:c,isOpen:d,onClose:()=>s(!1),product_id:o})]})};export{me as default};
