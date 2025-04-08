import{r as d,B as I,V as F,a as D,d as f,H as P,e as $,j as e,L as R,b as O,g as U,l as A,I as T,i as E,F as z}from"./index-vHAOnTyK.js";import{au as G,av as H}from"./AdapterDayjs-DSJF9VDl.js";import{D as V}from"./DatePicker-0SbO9u-j.js";const B=()=>{const[t,u]=d.useState(),[m,y]=d.useState();return{settingsData:m,fetchSetting:async()=>{const h=localStorage.getItem("authToken");u(!0);try{const g=await fetch(`${I}/admin/settings`,{method:"GET",headers:{Authorization:h?`Bearer ${h}`:""}}),_=await g.json();if(!g.ok){F.error(_.message,{position:"top-center"}),u(!1);return}y(_)}catch(g){F.error(g||"Network Error: Fail to fetch data")}finally{u(!1)}},loading:t}},Y=D().shape({estimate_pickup_normal_hour:f().notRequired().test("is-numeric","Estimate pickup normal hour must be a positive number",t=>t?/^\d+$/.test(t):!0),estimate_pickup_express_hour:f().notRequired().test("is-numeric","Estimate pickup express hour must be a positive number",t=>t?/^\d+$/.test(t):!0),gst_percentage:f().notRequired().test("is-numeric","GST percentage must be a positive number",t=>t?/^\d+$/.test(t):!0),estimate_delivery_normal_day:f().notRequired().test("is-numeric","Estimate delivery normal day must be a positive number",t=>t?/^\d+$/.test(t):!0),estimate_delivery_express_day:f().notRequired().test("is-numeric","Estimate delivery express day must be a positive number",t=>t?/^\d+$/.test(t):!0),normal_delivery_charges:f().notRequired().test("is-numeric","Normal delivery charge must be a positive number",t=>t?/^\d+$/.test(t):!0),express_delivery_charge:f().notRequired().test("is-numeric","Express delivery charge must be a positive number",t=>t?/^\d+$/.test(t):!0)}),J=({})=>{const{settingsData:t,fetchSetting:u}=B(),{addSetting:m,loading:y}=P(),[x,h]=d.useState({}),[g,_]=d.useState(!1),{hasPermission:r}=$(),n=t==null?void 0:t.data,[i,N]=d.useState({estimate_delivery_express_day:"",estimate_delivery_normal_day:"",estimate_pickup_express_hour:"",estimate_pickup_normal_hour:"",gst_percentage:"",normal_delivery_charges:"",express_delivery_charge:""});d.useEffect(()=>{u(),_(!1)},[g]),d.useEffect(()=>{n&&N({estimate_delivery_express_day:n.estimate_delivery_express_day||"",estimate_delivery_normal_day:n.estimate_delivery_normal_day||"",estimate_pickup_express_hour:n.estimate_pickup_express_hour||"",estimate_pickup_normal_hour:n.estimate_pickup_normal_hour||"",gst_percentage:n.gst_percentage||"",normal_delivery_charges:n.normal_delivery_charges||"",express_delivery_charge:n.express_delivery_charge||""})},[n]);const p=async s=>{s.preventDefault();try{if(await Y.validate(i,{abortEarly:!1}),!Object.keys(i).some(b=>i[b]!==n[b]))return;const w=Object.keys(i).map(b=>({setting_key:b,setting_value:i[b]}));await m(w)&&(h({}),_(!0))}catch(v){if(v instanceof O){const w={};v.inner.forEach(C=>{w[C.path||""]=C.message}),h(w)}else F.error("Failed to submit the form. Please try again.")}},a=(s,v)=>{N({...i,[s]:v})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card pb-2.5 min-w-full",children:[e.jsx("div",{className:"card-header",id:"basic_settings",children:e.jsx("h3",{className:"card-title",children:"General Settings"})}),e.jsx("form",{onSubmit:p,children:e.jsxs("div",{className:"card-body grid gap-1",children:[e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"estimate_pickup_normal_hour",children:"Estimate Pickup Normal Hour (In Hour)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${r(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"estimate_pickup_normal_hour",autoComplete:"off",value:i.estimate_pickup_normal_hour||"",onChange:s=>a("estimate_pickup_normal_hour",s.target.value),readOnly:!r(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:x.estimate_pickup_normal_hour||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"estimate_pickup_express_hour",children:"Estimate Pickup Express Hour (In Hour)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${r(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"estimate_pickup_express_hour",autoComplete:"off",value:i.estimate_pickup_express_hour||"",onChange:s=>a("estimate_pickup_express_hour",s.target.value),readOnly:!r(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:x.estimate_pickup_express_hour||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"gst_percentage",children:"GST Percentage (%)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${r(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"gst_percentage",autoComplete:"off",value:i.gst_percentage,onChange:s=>a("gst_percentage",s.target.value),readOnly:!r(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:x.gst_percentage||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"estimate_delivery_normal_day",children:"Estimate Delivery Normal Day (Day)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${r(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"estimate_delivery_normal_day",autoComplete:"off",value:i.estimate_delivery_normal_day,onChange:s=>a("estimate_delivery_normal_day",s.target.value),readOnly:!r(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:x.estimate_delivery_normal_day||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"estimate_delivery_express_day",children:"Estimate Delivery Express Day (Day)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${r(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"estimate_delivery_express_day",autoComplete:"off",value:i.estimate_delivery_express_day,onChange:s=>a("estimate_delivery_express_day",s.target.value),readOnly:!r(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:x.estimate_delivery_express_day||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"normal_delivery_charges",children:"Normal Delivery Charge (Rs)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${r(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"normal_delivery_charges",autoComplete:"off",value:i.normal_delivery_charges,onChange:s=>a("normal_delivery_charges",s.target.value),readOnly:!r(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:x.normal_delivery_charges||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"express_delivery_charge",children:"Express Delivery Charge (Rs)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${r(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"express_delivery_charge",autoComplete:"off",value:i.express_delivery_charge,onChange:s=>a("express_delivery_charge",s.target.value),readOnly:!r(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:x.express_delivery_charge||" "})]})]})}),r(2,"update")&&e.jsx("div",{className:"flex relative justify-end pt-2.5",children:e.jsx("button",{className:"btn btn-primary",type:"submit",disabled:y,children:y?e.jsxs(e.Fragment,{children:["Saving... ",e.jsx(R,{})]}):e.jsx(e.Fragment,{children:"Save Changes "})})})]})})]})})})},M=D().shape({title:f().required("Title is required"),price:A().required("Please enter price").typeError("Price must be a number").min(0,"Price must be a positive number"),promotion_code:f().notRequired().matches(/^[a-zA-Z0-9]*$/,"Coupon code can only contain letters and numbers").test("length","Coupon code must be between 3 and 30 characters long",t=>!t||t.length>=3&&t.length<=30).nullable(),image:U().test("fileType","Allowed Format : jpg, jpeg, png, ",t=>t&&t instanceof File?["image/jpeg","image/png","image/jpg"].includes(t.type):!0).test("dimensions","image dimention 632×445 pixels allowed",t=>!t||!(t instanceof File)?!0:new Promise(u=>{const m=new Image;m.src=URL.createObjectURL(t),m.onload=()=>{URL.revokeObjectURL(m.src),u(m.width===632&&m.height===445)},m.onerror=()=>{u(!1)}})).nullable()}),W=()=>{const{settingsData:t,fetchSetting:u}=B(),{addSetting:m,loading:y}=P(),{updatePromotionBanner:x,loading:h}=T(),[g,_]=d.useState(null),[r,n]=d.useState({}),[i,N]=d.useState(!1),{hasPermission:p}=$(),[a,s]=d.useState({image:null,title:"",price:"",promotion_code:"",offer_validity:E()}),[v,w]=d.useState({image:null,title:"",price:"",promotion_code:"",offer_validity:E()});d.useEffect(()=>{u(),N(!1)},[i]),d.useEffect(()=>{var o,l;if(t){const c=JSON.parse((o=t==null?void 0:t.data)==null?void 0:o.home_promotion_banner_website),j=(l=t==null?void 0:t.data)==null?void 0:l.home_banner_image,S={...a,title:c.title||"",price:c.price||"",promotion_code:c.promotion_code||"",offer_validity:E(c.offer_validity),image:j};s(S),w(S)}},[t]);const C=o=>{s(l=>({...l,offer_validity:o}))},b=o=>{var c;const l=(c=o.target.files)==null?void 0:c[0];if(l){const j=URL.createObjectURL(l);_(j),s(S=>({...S,image:l}))}},q=async o=>{o.preventDefault();try{await M.validate(a,{abortEarly:!1});let l;const c=new FormData;if(g!==null&&(c.append("home_banner_image",a.image),c.append("setting_key","home_banner_image"),l=await x(c),l&&(n({}),N(!0)),_(null)),!Object.keys(a).some(k=>k==="image"?!1:a[k]!==v[k]))return;const S={title:a.title,price:a.price,promotion_code:a.promotion_code,offer_validity:a.offer_validity},L=[{setting_key:"home_promotion_banner_website",setting_value:JSON.stringify(S)}];l=await m(L),l&&(n({}),N(!0))}catch(l){if(l instanceof O){const c={};l.inner.forEach(j=>{c[j.path||""]=j.message}),n(c)}else F.error("Failed to submit the form. Please try again.")}};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card min-w-full pb-2.5",children:[e.jsx("div",{className:"card-header",id:"basic_settings",children:e.jsx("h3",{className:"card-title",children:"Promotion Banner"})}),e.jsx("form",{onSubmit:q,children:e.jsxs("div",{className:"card-body grid gap-4",children:[e.jsx("div",{className:"flex items-center flex-wrap gap-2.5",children:e.jsx("div",{className:"flex justify-end bnmobile:justify-center flex-wrap grow gap-2.5",children:e.jsxs("div",{className:"image-input relative","data-image-input":"true",children:[e.jsx("label",{htmlFor:"image-upload",className:`btn btn-icon btn-icon-2xl btn-light absolute z-1 size-8 -top-0.5 -right-0.5 rounded-full ${p(2,"update")?"":"hidden"}`,children:p(2,"update")&&e.jsx(z,{className:"text-blue-600"})}),e.jsx("input",{id:"image-upload",type:"file",accept:"image/*",style:{display:"none"},onChange:b}),e.jsxs("div",{className:"flex flex-col items-center max-w-[300px] bnmobile:w-[95%]",children:[e.jsx("div",{className:"image-input-placeholder rounded-md border-2",children:e.jsx("img",{className:"h-[200px] w-[300px] rounded-sm",src:g||typeof a.image=="string"&&a.image||"",alt:"Promotion Banner"})}),e.jsx("p",{className:"text-red-500 text-sm min-h-[20px] block w-full text-center",children:r.image||" "})]})]})})}),e.jsx("div",{children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"title",children:"Title"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${p(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"title",autoComplete:"off",value:a.title,onChange:o=>s({...a,title:o.target.value}),readOnly:!p(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:r.title||" "})]})]})}),e.jsx("div",{children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"price",children:"Price (Rs)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${p(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"price",autoComplete:"off",value:a.price,onChange:o=>s({...a,price:o.target.value}),readOnly:!p(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:r.price||" "})]})]})}),e.jsx("div",{children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",htmlFor:"promotion_code",children:"Promotion code"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:`input ${p(2,"update")?"":"border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"}`,type:"text",id:"promotion_code",autoComplete:"off",value:a.promotion_code,onChange:o=>s({...a,promotion_code:o.target.value}),readOnly:!p(2,"update")}),e.jsx("p",{className:"text-red-500 text-sm",children:r.promotion_code||" "})]})]})}),e.jsx("div",{children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 mt-3",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Offer Validity"}),e.jsx(G,{dateAdapter:H,children:e.jsx(V,{value:a.offer_validity,onChange:C,disabled:!p(2,"update"),format:"DD-MM-YYYY",slotProps:{textField:{fullWidth:!0,InputProps:{style:{height:"35px",width:"155px",fontSize:"14px"}}}},disablePast:!0})})]})}),p(2,"update")&&e.jsx("div",{className:"flex relative justify-end pt-2.5",children:e.jsx("button",{className:"btn btn-primary",type:"submit",disabled:y||h,children:y||h?e.jsxs(e.Fragment,{children:["Saving...",e.jsx(R,{})]}):e.jsx(e.Fragment,{children:"Save Changes"})})})]})})]})})})},X=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Settings"})})})}),e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5",children:[e.jsx(J,{}),e.jsx(W,{})]})})]});export{X as default};
