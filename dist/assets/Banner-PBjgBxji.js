import{r,_ as y,u as O,j as e,F as V,b as W,d as Y,e as J,V as q,c as K,a as L,f as Q,h as X}from"./index-BGpOCz7R.js";import{S as A}from"./sweetalert2.esm.all-DwEdJQJv.js";import{s as Z}from"./searchSchema-CAltIT2m.js";import{T as ee}from"./TableShimmer-Czdw204g.js";import{B as te}from"./enums-CdakGUf3.js";const ae="http://3.110.208.70:3000/admin/banners",se=(l=1,t=10,d="",p,c,a)=>{const[o,i]=r.useState([]),[h,g]=r.useState(0),[s,f]=r.useState(!1),S=async()=>{var E,w;const C=localStorage.getItem("authToken"),u=new URLSearchParams;l&&u.append("page_number",l.toString()),t&&u.append("per_page",t.toString()),d&&u.append("search",d),p&&u.append("sort_by",p),c&&u.append("order",c),a&&u.append("banner_types",a.toString()),f(!0);try{const v=await fetch(`${ae}?${u}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`}}),m=await v.json();if(!v.ok){y.error(m.message,{position:"top-center"});return}i(((E=m==null?void 0:m.data)==null?void 0:E.banner)||[]),g(((w=m==null?void 0:m.data)==null?void 0:w.count)||0)}catch(v){y.error((v==null?void 0:v.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{f(!1)}};return r.useEffect(()=>{S()},[l,t,d,p,c,a]),{banners:o,totalBanners:h,loading:s,fetchBanners:S}},ne=()=>{const[l,t]=r.useState(!1),[d,p]=r.useState(null);return{banner:d,loading:l,fetchBanner:async a=>{var h;if(!a){p(null);return}const o=localStorage.getItem("authToken"),i=`http://3.110.208.70:3000/admin/banners/${a}`;t(!0);try{const g=await fetch(i,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}});if(!g.ok){const f=await g.json();y.error(f.message,{position:"top-center"}),t(!1);return}const s=await g.json();p((h=s==null?void 0:s.data)==null?void 0:h.banner)}catch{y.error("Network error: Failed to fetch.")}finally{t(!1)}}}},re="http://3.110.208.70:3000/admin/banners",ie=()=>{const[l,t]=r.useState(!1);return{addBanner:async p=>{const c=localStorage.getItem("authToken");t(!0);try{const a=await fetch(re,{method:"POST",headers:{Authorization:`Bearer ${c}`},body:p});if(!a.ok){const i=await a.json();return y.error(i.message,{position:"top-center"}),!1}const o=await a.json();return y.success(o.message,{position:"top-center"}),!0}catch(a){return y.error((a==null?void 0:a.message)||"Error adding banner",{position:"top-center"}),!1}finally{t(!1)}},loading:l}},le=()=>{const[l,t]=r.useState(!1);return{deleteBanner:async p=>{t(!0);const c=`http://3.110.208.70:3000/admin/banners/${p}`,a=localStorage.getItem("authToken");try{const o=await fetch(c,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}}),i=await o.json();return o.ok?{success:!0,message:i.message}:(y.error(i.message,{position:"top-center"}),{success:!1,message:i.message})}catch(o){return{success:!1,message:o.message}}finally{t(!1)}},loading:l}},ce=()=>{const[l,t]=r.useState(!1);return{updateBanner:async(p,c)=>{const a=localStorage.getItem("authToken"),o=`http://3.110.208.70:3000/admin/banners/${p}`;t(!0);try{const i=await fetch(o,{method:"PUT",headers:{Authorization:`Bearer ${a}`},body:c});if(i.ok){const h=await i.json();return y.success(h.message,{position:"top-center"}),!0}else{const h=await i.json();return y.error(h.message,{position:"top-center"}),!1}}catch(i){return y.error(i.message,{position:"top-center"}),!1}finally{t(!1)}},loading:l}},oe=l=>{switch(l){case 1:return"badge-website";case 2:return"badge-app";case 3:return"badge-web-app";default:return""}},de=({setEditBanner:l,isSubmit:t,setIsSubmit:d})=>{const{deleteBanner:p}=le(),[c,a]=r.useState(1),[o,i]=r.useState(10),[h,g]=O(),[s,f]=r.useState(null),[S,C]=r.useState(null),[u,E]=r.useState(""),[w,v]=r.useState(""),[m,B]=r.useState(""),j=h.get("page"),x=h.get("perPage"),[N,k]=r.useState(),{banners:T,fetchBanners:P,totalBanners:D,loading:R}=se(c,o,u,s,S,N),_=Math.ceil(D/o);r.useEffect(()=>{(async()=>{t&&(P(),d(!1))})()},[t]),r.useEffect(()=>{j&&a(Number(j)),x&&i(Number(x))},[j,x]),r.useEffect(()=>{u&&(a(1),g({search:u,page:"1",perPage:o.toString()}))},[u]);const z=async n=>{try{const{isConfirmed:b}=await A.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(b){const{success:G,message:I}=await p(n);G?(T.filter(H=>H.banner_id!==n).length===0&&c>1&&(a(c-1),g({page:(c-1).toString(),perPage:o.toString()})),await P(),A.fire(I)):A.fire(I)}}catch(b){A.fire({title:"Error",text:b.message,icon:"error"})}},U=async n=>{n.preventDefault();try{await Z.validate({search:u},{abortEarly:!1}),E(w),B("")}catch(b){b instanceof q&&B(b.errors[0])}},F=n=>{s===n?C(S==="ASC"?"DESC":"ASC"):(f(n),C("ASC"))},$=n=>{n>=1&&n<=_&&(a(n),g({page:n.toString(),perPage:o.toString()}))},M=n=>{const b=Number(n.target.value);i(b),a(1),g({page:"1",perPage:b.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex flex-wrap items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:o,onChange:M,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsx("div",{className:"flex flex-wrap gap-2.5",children:e.jsxs("select",{className:"select select-lg w-[170px] text-sm",value:N,onChange:n=>{k(Number(n.target.value))},children:[e.jsx("option",{value:"",selected:!0,children:"Banner Type"}),e.jsx("option",{value:1,children:"Website"}),e.jsx("option",{value:2,children:"App"}),e.jsx("option",{value:3,children:"Both"})]})}),e.jsxs("div",{className:"flex",children:[e.jsx("form",{onSubmit:U,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:w,onChange:n=>{v(n.target.value),n.target.value===""&&E("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:m||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{"data-datatable":"true","data-datatable-page-size":"10",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${s==="banner_id"?S==="ASC"?"asc":"desc":""}`,onClick:()=>F("banner_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[115px]",children:"Image"}),e.jsx("th",{className:"min-w-[160px]",children:e.jsxs("span",{className:`sort ${s==="title"?S==="ASC"?"asc":"desc":""}`,onClick:()=>F("title"),children:[e.jsx("span",{className:"sort-label",children:"Title"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[205px]",children:e.jsxs("span",{className:`sort ${s==="description"?S==="ASC"?"asc":"desc":""}`,onClick:()=>F("description"),children:[e.jsx("span",{className:"sort-label",children:"Description"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:"Banner type"}),e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),R?e.jsx(ee,{}):T.length>0?e.jsx("tbody",{children:T.map(n=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:n.banner_id})}),e.jsx("td",{children:e.jsx("img",{alt:n.image,className:"rounded-lg size-20 shrink-0",src:n.image})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:n.title})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:n.description})}),e.jsx("td",{children:e.jsx("span",{className:`mt-1 rounded-md text-sm ${oe(n.banner_type)}`,children:te[n.banner_type]})}),e.jsxs("td",{children:[e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>l(n.banner_id),children:e.jsx(V,{className:"text-yellow-600"})}),e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>z(n.banner_id),children:e.jsx(W,{className:"text-red-500"})})]})]},n.banner_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No banner available"})})})]})})})}),D>o&&e.jsxs("div",{className:"flex items-center gap-4 mt-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",T.length," of ",D," Branches"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:c===1,onClick:()=>$(c-1),className:`btn ${c===1?"disabled":""}`,children:e.jsx(Y,{})}),Array.from({length:_}).map((n,b)=>e.jsx("button",{className:`btn ${c===b+1?"active":""}`,onClick:()=>$(b+1),children:b+1},b)),e.jsx("button",{disabled:c===_,onClick:()=>$(c+1),className:`btn ${c===_?"disabled":""}`,children:e.jsx(J,{})})]})]})]})},me=l=>K().shape({title:L().required("Title is required").test("required","Title is required",t=>!!t).max(50,"Max title length exceeded by 50 characters"),description:L().required("Description is required").test("required","Description is required",t=>!!t).max(255,"Max description length exceeded by 255 characters"),image:Q().test("required","Image is required",function(t){return l?!0:t instanceof File}).test("fileSize","File is too large",t=>t&&t instanceof File?t.size<=2*1024*1024:!0).test("fileType","Unsupported file format",t=>t&&t instanceof File?["image/jpeg","image/png","image/jpg"].includes(t.type):!0).nullable(),banner_type:X().required("Please select banner type")}),pe=({isOpen:l,onClose:t,banner_id:d,setIsSubmit:p})=>{const{addBanner:c,loading:a}=ie(),{updateBanner:o,loading:i}=ce(),{banner:h,fetchBanner:g}=ne(),[s,f]=r.useState({title:"",description:"",image:"",banner_type:null}),[S,C]=r.useState({title:"",description:"",image:"",banner_type:null}),[u,E]=r.useState({});r.useEffect(()=>{l&&d&&g(d)},[l,d]),r.useEffect(()=>{if(l&&h&&d){const m={title:h.title,description:h.description,image:h.image,banner_type:h.banner_type};f(m),C(m)}else f({title:"",description:"",image:"",banner_type:null}),C({title:"",description:"",image:"",banner_type:null}),E({})},[l,h,d]);const w=m=>{const B=m.target;if(B instanceof HTMLInputElement){const{name:j,value:x,files:N}=B;j==="image"&&N&&N.length>0?f(k=>({...k,image:N[0]})):f(k=>({...k,[j]:x}))}else if(B instanceof HTMLTextAreaElement){const{name:j,value:x}=B;f(N=>({...N,[j]:x}))}},v=async m=>{m.preventDefault();try{if(await me(!!d).validate(s,{abortEarly:!1}),!Object.keys(s).some(N=>N==="image"?s.image instanceof File||s.image!==S.image:s[N]!==S[N])){t();return}const x=new FormData;x.append("title",s.title),x.append("description",s.description),s.image instanceof File&&x.append("image",s.image),x.append("banner_type",s.banner_type),d?(await o(d,x),p(!0)):(await c(x),p(!0)),t()}catch(B){if(B instanceof q){const j={};B.inner.forEach(x=>{j[x.path||""]=x.message}),E(j)}else y.error("Failed to submit the form. Please try again.")}};return l?e.jsxs("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:t}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg min-w-[480px] lgmobile:min-w-[90%] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0  mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:t,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h1",{className:"text-2xl font-bold mb-6",children:d?"Edit Banner":"Add Banner"}),e.jsx("form",{onSubmit:v,children:e.jsxs("div",{className:"grid grid-cols-1 gap-2",children:[e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"title",children:"Title"}),e.jsx("input",{type:"text",id:"title",name:"title",value:s.title,onChange:w,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.title||" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"description",children:"Description"}),e.jsx("textarea",{id:"description",name:"description",value:s.description,onChange:w,className:"h-20 input border border-gray-300 rounded-md p-2",rows:5}),e.jsx("p",{className:"text-red-500 text-sm",children:u.description||" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"image",children:"Image"}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:w,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:u.image?u.image:" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",children:"Banner type"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"banner_type",value:1,checked:s.banner_type===1,onChange:m=>f({...s,banner_type:parseInt(m.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Website"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"banner_type",value:2,checked:s.banner_type===2,onChange:m=>f({...s,banner_type:parseInt(m.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"App"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"banner_type",value:3,checked:s.banner_type===3,onChange:m=>f({...s,banner_type:parseInt(m.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Both"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:u.banner_type||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${a||i?"opacity-50 cursor-not-allowed":""}`,disabled:a||i,children:a||i?a?"Adding...":"Updating...":d?"Update Banner":"Add Banner"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:t,disabled:a||i,children:"Cancel"})]})]})})]})]}):null},je=()=>{const[l,t]=r.useState(!1),[d,p]=r.useState(null),[c,a]=r.useState(!1),[o,i]=r.useState(!1),h=()=>{a(!1),t(!0),p(null)},g=s=>{a(!0),p(s),t(!0)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Banner"})}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:h,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Banner"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(de,{isSubmit:o,setIsSubmit:i,setEditBanner:g})})})}),e.jsx(pe,{setIsSubmit:i,isOpen:l,onClose:()=>t(!1),banner_id:d})]})};export{je as default};
