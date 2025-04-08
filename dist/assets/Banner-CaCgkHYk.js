import{r,B as J,V as N,u as W,e as I,j as e,T as Y,F as K,f as Q,P as X,s as Z,b as R,a as ee,m as te,h as ae,d as L}from"./index-qfg-RXc2.js";import{S as A}from"./sweetalert2.esm.all-B0Dix5B2.js";import{B as se}from"./enums-Dwyd47hm.js";const ne=(o=1,t=10,l="",i,h,a)=>{const[d,c]=r.useState([]),[u,g]=r.useState(0),[s,x]=r.useState(!1),y=async()=>{var C,B;const E=localStorage.getItem("authToken"),p=new URLSearchParams;o&&p.append("page_number",o.toString()),t&&p.append("per_page",t.toString()),l&&p.append("search",l),i&&p.append("sort_by",i),h&&p.append("order",h),a&&p.append("banner_types",a.toString()),x(!0);try{const w=await fetch(`${J}/admin/banners?${p}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${E}`}}),m=await w.json();if(!w.ok){N.error(m.message,{position:"top-center"});return}c(((C=m==null?void 0:m.data)==null?void 0:C.banner)||[]),g(((B=m==null?void 0:m.data)==null?void 0:B.count)||0)}catch(w){N.error((w==null?void 0:w.message)||"Network error: Failed to fetch.",{position:"top-center"})}finally{x(!1)}};return r.useEffect(()=>{y()},[o,t,l,i,h,a]),{banners:d,count:u,loading:s,fetchBanners:y}},re=()=>{const[o,t]=r.useState(!1),[l,i]=r.useState(null);return{banner:l,loading:o,fetchBanner:async a=>{var u;if(!a){i(null);return}const d=localStorage.getItem("authToken"),c=`http://3.110.208.70:3000/admin/banners/${a}`;t(!0);try{const g=await fetch(c,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`}});if(!g.ok){const x=await g.json();N.error(x.message,{position:"top-center"}),t(!1);return}const s=await g.json();i((u=s==null?void 0:s.data)==null?void 0:u.banner)}catch{N.error("Network error: Failed to fetch.")}finally{t(!1)}}}},ie="http://3.110.208.70:3000/admin/banners",le=()=>{const[o,t]=r.useState(!1);return{addBanner:async i=>{const h=localStorage.getItem("authToken");t(!0);try{const a=await fetch(ie,{method:"POST",headers:{Authorization:`Bearer ${h}`},body:i});if(!a.ok){const c=await a.json();return N.error(c.message,{position:"top-center"}),!1}const d=await a.json();return N.success(d.message,{position:"top-center"}),!0}catch(a){return N.error((a==null?void 0:a.message)||"Error adding banner",{position:"top-center"}),!1}finally{t(!1)}},loading:o}},ce=()=>{const[o,t]=r.useState(!1);return{deleteBanner:async i=>{t(!0);const h=`http://3.110.208.70:3000/admin/banners/${i}`,a=localStorage.getItem("authToken");try{const d=await fetch(h,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}}),c=await d.json();return d.ok?{success:!0,message:c.message}:(N.error(c.message,{position:"top-center"}),{success:!1,message:c.message})}catch(d){return{success:!1,message:d.message}}finally{t(!1)}},loading:o}},oe=()=>{const[o,t]=r.useState(!1);return{updateBanner:async(i,h)=>{const a=localStorage.getItem("authToken"),d=`http://3.110.208.70:3000/admin/banners/${i}`;t(!0);try{const c=await fetch(d,{method:"PUT",headers:{Authorization:`Bearer ${a}`},body:h});if(c.ok){const u=await c.json();return N.success(u.message,{position:"top-center"}),!0}else{const u=await c.json();return N.error(u.message,{position:"top-center"}),!1}}catch(c){return N.error(c.message,{position:"top-center"}),!1}finally{t(!1)}},loading:o}},de=o=>{switch(o){case 1:return"badge-website";case 2:return"badge-app";case 3:return"badge-web-app";default:return""}},me=({setEditBanner:o,isSubmit:t,setIsSubmit:l})=>{const{deleteBanner:i}=ce(),[h,a]=r.useState(1),[d,c]=r.useState(10),[u,g]=W(),[s,x]=r.useState(null),[y,E]=r.useState(null),[p,C]=r.useState(""),[B,w]=r.useState(""),[m,S]=r.useState(""),b=u.get("page"),f=u.get("perPage"),[j,T]=r.useState(),{banners:k,fetchBanners:D,count:F,loading:U}=ne(h,d,p,s,y,j),{hasPermission:P}=I(),q=Math.ceil(F/d);r.useEffect(()=>{(async()=>{t&&(D(),l(!1))})()},[t]),r.useEffect(()=>{b&&a(Number(b)),f&&c(Number(f))},[b,f]),r.useEffect(()=>{a(1),g(p!==""?{search:p,page:"1",perPage:d.toString()}:{})},[p]),r.useEffect(()=>{a(1),g(p!==""?{search:p,page:"1",perPage:d.toString()}:{})},[j]);const M=async n=>{try{const{isConfirmed:v}=await A.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(v){const{success:V,message:$}=await i(n);V?(k.filter(H=>H.banner_id!==n).length===0&&h>1&&(a(h-1),g({page:(h-1).toString(),perPage:d.toString()})),await D(),A.fire($)):A.fire($)}}catch(v){A.fire({title:"Error",text:v.message,icon:"error"})}},z=async n=>{n.preventDefault();try{await Z.validate({search:p},{abortEarly:!1}),C(B),S("")}catch(v){v instanceof R&&S(v.errors[0])}},_=n=>{s===n?E(y==="ASC"?"DESC":"ASC"):(x(n),E("ASC"))},G=n=>{n>=1&&n<=q&&(a(n),g({page:n.toString(),perPage:d.toString()}))},O=n=>{const v=Number(n.target.value);c(v),a(1),g({page:"1",perPage:v.toString()})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex flex-wrap items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:d,onChange:O,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsx("div",{className:"flex flex-wrap gap-2.5",children:e.jsxs("select",{className:"select select-lg w-[170px] text-sm",value:j,onChange:n=>{T(Number(n.target.value))},children:[e.jsx("option",{value:"",selected:!0,children:"Banner Type"}),e.jsx("option",{value:1,children:"Website"}),e.jsx("option",{value:2,children:"App"}),e.jsx("option",{value:3,children:"Both"})]})}),e.jsxs("div",{className:"flex",children:[e.jsx("form",{onSubmit:z,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:B,onChange:n=>{w(n.target.value),n.target.value===""&&C("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:m||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{"data-datatable":"true","data-datatable-page-size":"10",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-[30px]",children:e.jsxs("span",{className:`sort ${s==="banner_id"?y==="ASC"?"asc":"desc":""}`,onClick:()=>_("banner_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[115px]",children:"Image"}),e.jsx("th",{className:"min-w-[160px]",children:e.jsxs("span",{className:`sort ${s==="title"?y==="ASC"?"asc":"desc":""}`,onClick:()=>_("title"),children:[e.jsx("span",{className:"sort-label",children:"Title"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[205px]",children:e.jsxs("span",{className:`sort ${s==="description"?y==="ASC"?"asc":"desc":""}`,onClick:()=>_("description"),children:[e.jsx("span",{className:"sort-label",children:"Description"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:"Banner type"}),(P(14,"update")||P(14,"delete"))&&e.jsx("th",{className:"min-w-[125px]",children:"Actions"})]})}),U?e.jsx(Y,{}):k.length>0?e.jsx("tbody",{children:k.map(n=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:n.banner_id})}),e.jsx("td",{children:e.jsx("img",{alt:n.image,className:"rounded-lg size-20 shrink-0",src:n.image})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:n.title})}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:n.description})}),e.jsx("td",{children:e.jsx("span",{className:`mt-1 rounded-md text-sm ${de(n.banner_type)}`,children:se[n.banner_type]})}),(P(14,"update")||P(14,"delete"))&&e.jsxs("td",{children:[P(14,"update")&&e.jsx("button",{className:"mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>o(n.banner_id),children:e.jsx(K,{className:"text-yellow-600"})}),P(14,"delete")&&e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>M(n.banner_id),children:e.jsx(Q,{className:"text-red-500"})})]})]},n.banner_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No banner available"})})})]})})})}),e.jsx(X,{count:F,currentPage:h,totalRecords:k==null?void 0:k.length,perPage:d,onPageChange:G,label:"banners"})]})},pe=o=>ee().shape({title:L().required("Title is required").test("required","Title is required",t=>!!t).max(50,"Max title length exceeded by 50 characters"),description:L().required("Description is required").test("required","Description is required",t=>!!t).max(255,"Max description length exceeded by 255 characters"),image:ae().test("required","Image is required",function(t){return o?!0:t instanceof File}).test("fileType","Allowed Format : jpg, jpeg, png, ",t=>t&&t instanceof File?["image/jpeg","image/png","image/jpg"].includes(t.type):!0).test("dimensions","image dimention 689×668 pixels allowed",t=>!t||!(t instanceof File)?!0:new Promise(l=>{const i=new Image;i.src=URL.createObjectURL(t),i.onload=()=>{URL.revokeObjectURL(i.src),l(i.width===689&&i.height===668)},i.onerror=()=>{l(!1)}})).nullable(),banner_type:te().required("Please select banner type")}),ue=({isOpen:o,onClose:t,banner_id:l,setIsSubmit:i})=>{const{addBanner:h,loading:a}=le(),{updateBanner:d,loading:c}=oe(),{banner:u,fetchBanner:g}=re(),[s,x]=r.useState({title:"",description:"",image:"",banner_type:null}),[y,E]=r.useState({title:"",description:"",image:"",banner_type:null}),[p,C]=r.useState({});r.useEffect(()=>{o&&l&&g(l)},[o,l]),r.useEffect(()=>{if(o&&u&&l){const m={title:u.title,description:u.description,image:u.image,banner_type:u.banner_type};x(m),E(m)}else x({title:"",description:"",image:"",banner_type:null}),E({title:"",description:"",image:"",banner_type:null}),C({})},[o,u,l]);const B=m=>{const S=m.target;if(S instanceof HTMLInputElement){const{name:b,value:f,files:j}=S;b==="image"&&j&&j.length>0?x(T=>({...T,image:j[0]})):x(T=>({...T,[b]:f}))}else if(S instanceof HTMLTextAreaElement){const{name:b,value:f}=S;x(j=>({...j,[b]:f}))}},w=async m=>{m.preventDefault();try{if(await pe(!!l).validate(s,{abortEarly:!1}),!Object.keys(s).some(j=>j==="image"?s.image instanceof File||s.image!==y.image:s[j]!==y[j])){t();return}const f=new FormData;f.append("title",s.title),f.append("description",s.description),s.image instanceof File&&f.append("image",s.image),f.append("banner_type",s.banner_type),l?(await d(l,f),i(!0)):(await h(f),i(!0)),t()}catch(S){if(S instanceof R){const b={};S.inner.forEach(f=>{b[f.path||""]=f.message}),C(b)}else N.error("Failed to submit the form. Please try again.")}};return o?e.jsxs("div",{className:"fixed inset-0 grid overflow-auto items-center justify-center z-50 p-4",children:[e.jsx("div",{className:"fixed inset-0 bg-black opacity-50",onClick:t}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg min-w-[400px] smobile:min-w-[85%] z-10 relative",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0  mr-5 mt-5 lg:mr-5 shadow-default","data-modal-dismiss":"true",onClick:t,children:e.jsx("i",{className:"ki-filled ki-cross"})}),e.jsx("h1",{className:"text-2xl font-bold mb-6",children:l?"Edit Banner":"Add Banner"}),e.jsx("form",{onSubmit:w,children:e.jsxs("div",{className:"grid grid-cols-1 gap-2",children:[e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"title",children:"Title"}),e.jsx("input",{type:"text",id:"title",name:"title",autoComplete:"off",value:s.title,onChange:B,className:"input border border-gray-300 rounded-md p-2"}),e.jsx("p",{className:"text-red-500 text-sm",children:p.title||" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",htmlFor:"description",children:"Description"}),e.jsx("textarea",{id:"description",name:"description",value:s.description,onChange:B,className:"h-20 input border border-gray-300 rounded-md p-2",rows:5}),e.jsx("p",{className:"text-red-500 text-sm",children:p.description||" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("label",{className:"font-semibold",htmlFor:"image",children:"Image"}),e.jsx("span",{className:"text-sm text-gray-500",children:"(JPG, JPEG, PNG | 689×668 px)"})]}),e.jsx("input",{type:"file",id:"image",name:"image",accept:"image/*",onChange:B,className:"input border border-gray-300 rounded-md p-2 mt-1"}),e.jsx("p",{className:"text-red-500 text-sm",children:p.image?p.image:" "})]}),e.jsxs("div",{className:"col-span-1",children:[e.jsx("label",{className:"mb-2 font-semibold",children:"Banner type"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"banner_type",value:1,checked:s.banner_type===1,onChange:m=>x({...s,banner_type:parseInt(m.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Website"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"banner_type",value:2,checked:s.banner_type===2,onChange:m=>x({...s,banner_type:parseInt(m.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"App"})]}),e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"radio",name:"banner_type",value:3,checked:s.banner_type===3,onChange:m=>x({...s,banner_type:parseInt(m.target.value)}),className:"radio radio-primary"}),e.jsx("span",{className:"text-sm",children:"Both"})]})]}),e.jsx("p",{className:"text-red-500 text-sm",children:p.banner_type||" "})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx("button",{type:"submit",className:`btn btn-primary ${a||c?"opacity-50 cursor-not-allowed":""}`,disabled:a||c,children:a||c?a?"Adding...":"Updating...":l?"Update Banner":"Add Banner"}),e.jsx("button",{type:"button",className:"btn btn-light",onClick:t,disabled:a||c,children:"Cancel"})]})]})})]})]}):null},je=()=>{const[o,t]=r.useState(!1),[l,i]=r.useState(null),[h,a]=r.useState(!1),[d,c]=r.useState(!1),{hasPermission:u}=I(),g=()=>{a(!1),t(!0),i(null)},s=x=>{a(!0),i(x),t(!0)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-7.5",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Banner"})}),u(14,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:g,className:"btn btn-primary",children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Banner"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(me,{isSubmit:d,setIsSubmit:c,setEditBanner:s})})})}),e.jsx(ue,{setIsSubmit:c,isOpen:o,onClose:()=>t(!1),banner_id:l})]})};export{je as default};
