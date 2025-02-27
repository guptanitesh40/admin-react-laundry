import{c as C,h as u,x as P,y as F,r as c,j as e,V as B,_ as O,a as L,z as A,F as G}from"./index-DUkfQgXw.js";import{L as R}from"./Loading-DQy3q16p.js";import{d as D}from"./dayjs.min-BVtTtjUc.js";import{au as H,av as T}from"./AdapterDayjs-YrZq7OEG.js";import{D as U}from"./DatePicker-CX24eqyC.js";const Y=C().shape({estimate_pickup_normal_hour:u().typeError("estimate pickup normal hour must be a number").min(0,"estimate pickup normal hour must be a positive number"),estimate_pickup_express_hour:u().typeError("estimate pickup express hour must be a number").min(0,"estimate pickup express hour must be a positive number"),gst_percentage:u().typeError("gst percentage must be a number").min(0,"gst percentage must be a positive number"),estimate_delivery_normal_day:u().typeError("estimate delivery normal day must be a number").min(0,"estimate delivery normal day must be a positive number"),estimate_delivery_express_day:u().typeError("estimate delivery express day must be a number").min(0,"estimate delivery express day must be a positive number"),shipping_charge:u().typeError("shipping charge must be a number").min(0,"shipping charge must be a positive number"),express_delivery_charge:u().typeError("express delivery charge must be a number").min(0,"express delivery charge must be a positive number")}),q=({})=>{const{settingsData:m,fetchSetting:S,loading:I}=P(),{addSetting:E,loading:v}=F(),[o,j]=c.useState({}),[N,y]=c.useState(!1),[w,b]=c.useState([]),r=m==null?void 0:m.data,[t,s]=c.useState({estimate_delivery_express_day:"",estimate_delivery_normal_day:"",estimate_pickup_express_hour:"",estimate_pickup_normal_hour:"",gst_percentage:"",shipping_charge:"",express_delivery_charge:""});c.useEffect(()=>{S(),y(!1)},[N]),c.useEffect(()=>{if(r){const a=Object.keys(r).map(l=>({setting_key:l,setting_value:r[l]||""})).filter(l=>Object.keys(t).includes(l.setting_key));b(a),s({estimate_delivery_express_day:r.estimate_delivery_express_day||"",estimate_delivery_normal_day:r.estimate_delivery_normal_day||"",estimate_pickup_express_hour:r.estimate_pickup_express_hour||"",estimate_pickup_normal_hour:r.estimate_pickup_normal_hour||"",gst_percentage:r.gst_percentage||"",shipping_charge:r.shipping_charge||"",express_delivery_charge:r.express_delivery_charge||""})}},[r]);const g=async a=>{a.preventDefault();try{if(await Y.validate(t,{abortEarly:!1}),!Object.keys(t).some(p=>t[p]!==r[p]))return;await E(w)&&(j({}),y(!0))}catch(l){if(l instanceof B){const h={};l.inner.forEach(p=>{h[p.path||""]=p.message}),j(h)}else O.error("Failed to submit the form. Please try again.")}},x=(a,l)=>{b(h=>h.map(p=>p.setting_key===a?{...p,setting_value:l}:p)),s({...t,[a]:l})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card pb-2.5 min-w-full",children:[e.jsx("div",{className:"card-header",id:"basic_settings",children:e.jsx("h3",{className:"card-title",children:"General Settings"})}),e.jsxs("div",{className:"card-body grid gap-1",children:[e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Estimate Pickup Normal Hour (In Hour)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:"input",type:"text",value:t.estimate_pickup_normal_hour||"",onChange:a=>x("estimate_pickup_normal_hour",a.target.value)}),e.jsx("p",{className:"text-red-500 text-sm",children:o.estimate_pickup_normal_hour||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Estimate Pickup Express Hour (In Hour)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:"input",type:"text",value:t.estimate_pickup_express_hour||"",onChange:a=>x("estimate_pickup_express_hour",a.target.value)}),e.jsx("p",{className:"text-red-500 text-sm",children:o.estimate_pickup_express_hour||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"GST Percentage (%)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:"input",type:"text",value:t.gst_percentage,onChange:a=>x("gst_percentage",a.target.value)}),e.jsx("p",{className:"text-red-500 text-sm",children:o.gst_percentage||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Estimate Delivery Normal Day (Day)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:"input",type:"text",value:t.estimate_delivery_normal_day,onChange:a=>x("estimate_delivery_normal_day",a.target.value)}),e.jsx("p",{className:"text-red-500 text-sm",children:o.estimate_delivery_normal_day||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Estimate Delivery Express Day (Day)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:"input",type:"text",value:t.estimate_delivery_express_day,onChange:a=>x("estimate_delivery_express_day",a.target.value)}),e.jsx("p",{className:"text-red-500 text-sm",children:o.estimate_delivery_express_day||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Shipping Charge (Rs)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:"input",type:"text",value:t.shipping_charge,onChange:a=>x("shipping_charge",a.target.value)}),e.jsx("p",{className:"text-red-500 text-sm",children:o.shipping_charge||" "})]})]})}),e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Express Delivery Charge (Rs)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:"input",type:"text",value:t.express_delivery_charge,onChange:a=>x("express_delivery_charge",a.target.value)}),e.jsx("p",{className:"text-red-500 text-sm",children:o.express_delivery_charge||" "})]})]})}),e.jsx("div",{className:"flex relative justify-end pt-2.5",children:e.jsx("button",{className:"btn btn-primary",onClick:g,disabled:v,children:v?e.jsxs(e.Fragment,{children:["Saving... ",e.jsx(R,{})]}):e.jsx(e.Fragment,{children:"Save Changes "})})})]})]})})})},V=C().shape({title:L().required("Title is required"),price:u().required("Please enter price").typeError("Price must be a number").min(0,"Price must be a positive number")}),$=()=>{const{settingsData:m,fetchSetting:S,loading:I}=P(),{addSetting:E,loading:v}=F(),{updatePromotionBanner:o,loading:j}=A(),[N,y]=c.useState(null),[w,b]=c.useState({}),[r,t]=c.useState(!1),[s,g]=c.useState({image:null,title:"",price:"",offer_validity:D()}),[x,a]=c.useState({image:null,title:"",price:"",offer_validity:D()});c.useEffect(()=>{S(),t(!1)},[r]),c.useEffect(()=>{var d,i;if(m){const n=JSON.parse((d=m==null?void 0:m.data)==null?void 0:d.home_promotion_banner_website),f=(i=m==null?void 0:m.data)==null?void 0:i.home_banner_image,_={...s,title:n.title||"",price:n.price||"",offer_validity:D(n.offer_validity),image:f};g(_),a(_)}},[m]);const l=d=>{g(i=>({...i,offer_validity:d}))},h=d=>{var n;const i=(n=d.target.files)==null?void 0:n[0];if(i){const f=URL.createObjectURL(i);y(f),g(_=>({..._,image:i}))}},p=async d=>{d.preventDefault();try{await V.validate(s,{abortEarly:!1});let i;const n=new FormData;if(N!==null&&(n.append("home_banner_image",s.image),n.append("setting_key","home_banner_image"),i=await o(n),i&&t(!0),y(null)),!Object.keys(s).some(k=>k==="image"?!1:s[k]!==x[k]))return;const _={title:s.title,price:s.price,offer_validity:s.offer_validity},z=[{setting_key:"home_promotion_banner_website",setting_value:JSON.stringify(_)}];i=await E(z),i&&(b({}),t(!0))}catch(i){if(i instanceof B){const n={};i.inner.forEach(f=>{n[f.path||""]=f.message}),b(n)}else O.error("Failed to submit the form. Please try again.")}};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card min-w-full pb-2.5",children:[e.jsx("div",{className:"card-header",id:"basic_settings",children:e.jsx("h3",{className:"card-title",children:"Promotion Banner"})}),e.jsxs("div",{className:"card-body grid gap-4",children:[e.jsx("div",{className:"flex items-center flex-wrap gap-2.5",children:e.jsx("div",{className:"flex justify-end flex-wrap grow gap-2.5",children:e.jsxs("div",{className:"image-input","data-image-input":"true",children:[e.jsx("label",{htmlFor:"image-upload",className:"btn btn-icon btn-icon-2xl btn-light absolute z-1 size-8 -top-0.5 -right-0.5 rounded-full",children:e.jsx(G,{className:"text-blue-600"})}),e.jsx("input",{id:"image-upload",type:"file",accept:"image/*",style:{display:"none"},onChange:h}),e.jsx("div",{className:"image-input-placeholder rounded-md border-2",children:e.jsx("img",{className:"h-[200px] w-[300px] rounded-sm",src:N||typeof s.image=="string"&&s.image||"",alt:"Promotion Banner"})})]})})}),e.jsx("div",{children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Title"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:"input",type:"text",value:s.title,onChange:d=>g({...s,title:d.target.value})}),e.jsx("p",{className:"text-red-500 text-sm",children:w.title||" "})]})]})}),e.jsx("div",{children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Price (Rs)"}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("input",{className:"input",type:"text",value:s.price,onChange:d=>g({...s,price:d.target.value})}),e.jsx("p",{className:"text-red-500 text-sm",children:w.price||" "})]})]})}),e.jsx("div",{children:e.jsxs("div",{className:"flex items-baseline flex-wrap lg:flex-nowrap gap-2.5",children:[e.jsx("label",{className:"form-label flex items-center gap-1 max-w-56",children:"Offer Validity"}),e.jsx(H,{dateAdapter:T,children:e.jsx(U,{value:s.offer_validity,onChange:l,format:"DD-MM-YYYY",slotProps:{textField:{fullWidth:!0,InputProps:{style:{height:"35px",width:"155px",fontSize:"14px"}}}}})})]})}),e.jsx("div",{className:"flex relative justify-end pt-2.5",children:e.jsx("button",{className:"btn btn-primary",onClick:p,disabled:v||j,children:v||j?e.jsxs(e.Fragment,{children:["Saving...",e.jsx(R,{})]}):e.jsx(e.Fragment,{children:"Save Changes"})})})]})]})})})},X=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5",children:e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Settings"})})})}),e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5",children:[e.jsx(q,{}),e.jsx($,{})]})})]});export{X as default};
