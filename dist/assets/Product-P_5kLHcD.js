import{r as n,_ as p,j as e,V as I,u as _,F as G,b as V,d as Y,e as q}from"./index-BGpOCz7R.js";import{p as H}from"./productSchema-Cy8PMr09.js";import{u as J}from"./useGetProducts-B8wU_wlm.js";import{S as D}from"./sweetalert2.esm.all-DwEdJQJv.js";import{T as K}from"./TableShimmer-Czdw204g.js";import{s as Q}from"./searchSchema-CAltIT2m.js";const W=()=>{const[d,s]=n.useState(!1),[c,r]=n.useState(null);return{product:c,loading:d,fetchProduct:async t=>{var l;if(!t){r(null);return}const i=localStorage.getItem("authToken"),o=`http://3.110.208.70:3000/admin/products/${t}`;s(!0);try{const g=await fetch(o,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`}});if(!g.ok){const x=await g.json();p.error(x.message,{position:"top-center"}),s(!1);return}const m=await g.json();r((l=m==null?void 0:m.data)==null?void 0:l.product)}catch{p.error("Network error: Failed to fetch.")}finally{s(!1)}}}},X="http://3.110.208.70:3000/admin/products",Z=()=>{const[d,s]=n.useState(!1);return{addProduct:async r=>{const u=localStorage.getItem("authToken");s(!0);try{const t=await fetch(X,{method:"POST",headers:{Authorization:u?`Bearer ${u}`:""},body:r});if(!t.ok){const l=(await t.json()).message;return p.error(l,{position:"top-center"}),!1}const i=await t.json();return p.success(i.message,{position:"top-center"}),!0}catch(t){return t.name==="TypeError"&&t.message.includes("Failed to fetch")?p.error("Network error: Failed to fetch.",{position:"top-center"}):p.error("An unexpected error occurred.",{position:"top-center"}),!1}finally{s(!1)}},loading:d}},ee=()=>{const[d,s]=n.useState(!1);return{deleteProduct:async r=>{s(!0);const u=`http://3.110.208.70:3000/admin/products/${r}`;try{const t=localStorage.getItem("authToken"),i=await fetch(u,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}),o=await i.json();return t?i.ok?{success:!0,message:o.message}:(p.error(o.message,{position:"top-center"}),{success:!1,message:o.message}):(p.error(o.message,{position:"top-center"}),s(!1),{success:!1,message:o.message})}catch(t){return p.error(t.message,{position:"top-center"}),{success:!1,message:t.message}}finally{s(!1)}},loading:d}},te=()=>{const[d,s]=n.useState(!1);return{updateProduct:async(r,u)=>{s(!0);const t=`http://3.110.208.70:3000/admin/products/${r}`;try{const i=localStorage.getItem("authToken");if(!i)return p.error("No authentication token found",{position:"top-center"}),s(!1),!1;const o=await fetch(t,{method:"PUT",headers:{Authorization:`Bearer ${i}`},body:u});if(o.ok){const l=await o.json();return p.success(l.message,{position:"top-center"}),!0}else{const g=(await o.json()).message;return p.error(g,{position:"top-center"}),!1}}catch(i){return p.error(i.message,{position:"top-center"}),!1}finally{s(!1)}},loading:d}},se=({isOpen:d,onClose:s,product_id:c,setIsSubmit:r})=>{const{addProduct:u,loading:t}=Z(),{updateProduct:i,loading:o}=te(),{product:l,fetchProduct:g}=W(),[m,x]=n.useState({name:"",image:""}),[y,v]=n.useState({name:"",image:""}),[w,b]=n.useState({});n.useEffect(()=>{d&&c&&g(c)},[d,c]),n.useEffect(()=>{if(d&&l&&c){const N={name:l.name,image:l.image};x(N),v(N)}else x({name:"",image:""}),v({name:"",image:""}),b({})},[d,l,c]);const C=N=>{const{name:P,value:S,files:h}=N.target;P==="image"&&h&&h.length>0?x(j=>({...j,image:h[0]})):x(j=>({...j,[P]:S}))},k=async N=>{N.preventDefault();try{if(await H(!!c).validate(m,{abortEarly:!1}),!Object.keys(m).some(j=>j==="image"?m.image instanceof File||m.image!==y.image:m[j]!==y[j])){s();return}const h=new FormData;h.append("name",m.name),m.image instanceof File&&h.append("image",m.image),c?await i(c,h):await u(h),r(!0),s()}catch(P){if(P instanceof I){const S={};P.inner.forEach(h=>{S[h.path||""]=h.message}),b(S)}else p.error("Failed to submit the form. Please try again.")}};return d?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:s}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg min-w-96 zx:min-w-[85%] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:s,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h1",{className:"text-2xl font-bold mb-6",children:c?"Edit Product":"Add Product"}),e.jsx("form",{onSubmit:k,children:e.jsxs("div",{className:"grid grid-cols-1 gap-3",children:[e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",value:m.name,onChange:C,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:w.name||" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"image",children:"Image"}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:C,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:w.image||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${t||o?"opacity-50 cursor-not-allowed":""}`,disabled:t||o,children:t||o?t?"Adding...":"Updating...":c?"Update Product":"Add Product"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:s,disabled:t||o,children:"Cancel"})]})]})})]})]}):null},ae=({setEditProduct:d,isSubmit:s,setIsSubmit:c})=>{const[r,u]=n.useState(1),[t,i]=n.useState(10),[o,l]=_(),[g,m]=n.useState(null),[x,y]=n.useState(null),v=o.get("page"),w=o.get("perPage"),[b,C]=n.useState(""),[k,N]=n.useState(""),[P,S]=n.useState(""),{products:h,totalProducts:j,loading:U,fetchProducts:A}=J(r,t,b,g,x),E=Math.ceil(j/t);n.useEffect(()=>{s&&(A(),c(!1))},[s,A]);const{deleteProduct:L}=ee(),z=async a=>{try{const{isConfirmed:f}=await D.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(f){const{success:M,message:$}=await L(a);M?(h.filter(O=>O.product_id!==a).length===0&&r>1&&(u(r-1),l({page:(r-1).toString(),perPage:t.toString()})),await A(),D.fire($)):D.fire($)}}catch(f){D.fire({title:"Error",text:f.message,icon:"error"})}};n.useEffect(()=>{v&&u(Number(v)),w&&i(Number(w))},[v,w]),n.useEffect(()=>{b&&(u(1),l({search:b,page:"1",perPage:t.toString()}))},[b]);const B=async a=>{a.preventDefault();try{await Q.validate({search:b},{abortEarly:!1}),C(k),S("")}catch(f){f instanceof I&&S(f.errors[0])}},F=a=>{g===a?y(x==="ASC"?"DESC":"ASC"):(m(a),y("ASC"))},T=a=>{a>=1&&a<=E&&(u(a),l({page:a.toString(),perPage:t.toString()}))},R=a=>{const f=Number(a.target.value);i(f),u(1),l({page:"1",perPage:f.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:t,onChange:R,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsx("div",{className:"flex items-center gap-4 flex-1 justify-end",children:e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("form",{onSubmit:B,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:k,onChange:a=>{N(a.target.value),a.target.value===""&&C("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:P||" "})]})})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${g==="product_id"?x==="ASC"?"asc":"desc":""}`,onClick:()=>F("product_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[690px]",children:e.jsxs("span",{className:`sort ${g==="name"?x==="ASC"?"asc":"desc":""}`,onClick:()=>F("name"),children:[e.jsx("span",{className:"sort-label",children:"Product name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[125px]",children:e.jsxs("div",{className:"flex justify-between",children:["Image",e.jsx("div",{className:"flex "})]})}),e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),U?e.jsx(K,{}):h.length>0?e.jsx("tbody",{children:h.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:a.product_id})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:a.name})}),e.jsx("td",{children:e.jsx("img",{alt:a.name,className:"rounded-lg size-20 shrink-0",src:a.image})}),e.jsxs("td",{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>d(a.product_id),children:e.jsx(G,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>z(a.product_id),children:e.jsx(V,{className:"text-red-500"})})]})]},a.product_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No Products available"})})})]})}),j>t&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",h.length," of ",j," Users"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:r===1,onClick:()=>T(r-1),className:`btn ${r===1?"disabled":""}`,children:e.jsx(Y,{})}),Array.from({length:E}).map((a,f)=>e.jsx("button",{className:`btn ${r===f+1?"active":""}`,onClick:()=>T(f+1),children:f+1},f)),e.jsx("button",{disabled:r===E,onClick:()=>T(r+1),className:`btn ${r===E?"disabled":""}`,children:e.jsx(q,{})})]})]})})]})})]})},me=()=>{const[d,s]=n.useState(!1),[c,r]=n.useState(null),[u,t]=n.useState(!1),[i,o]=n.useState(!1),l=()=>{t(!1),s(!0),r(null)},g=m=>{t(!0),r(m),s(!0)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Product"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:l,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Product"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(ae,{isSubmit:i,setIsSubmit:o,setEditProduct:g})})})}),e.jsx(se,{setIsSubmit:o,isOpen:d,onClose:()=>s(!1),product_id:c})]})};export{me as default};
