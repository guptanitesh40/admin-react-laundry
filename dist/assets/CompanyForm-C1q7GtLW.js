import{r as h,_ as j,j as a,f as K,g,h as R,p as Z,y as H,x as J,n as X,V as ee}from"./index-CrW1VcAo.js";import{d as te}from"./dayjs.min-CgtumrHU.js";import{aw as ae,i as oe,j as se,f as O,k as re,v,l as T,_ as M,P as ne,T as ie,n as le,o as c,p as de,q as ce,g as me,a as ue,s as A,L as pe,I as be,N as C,E as q,W as S,c as fe,b as ye,S as he,U as xe,V as E,aj as P,ak as ge,al as z,am as L,an as _e,ao as I,ap as U,ar as je,as as De,at as Pe,au as Ne,av as we}from"./AdapterDayjs-DeYb5bBG.js";import{P as e}from"./index-M_tzK7Uh.js";const Te="http://35.154.167.170:3000",Ce=`${Te}/companies`,Fe=()=>{const[t,n]=h.useState(!1);return{addCompany:async l=>{const s=localStorage.getItem("authToken");n(!0);try{const r=new FormData;Object.entries(l).forEach(([o,u])=>{u&&(u instanceof FileList?r.append(o,u[0]):r.append(o,u))});const m=await fetch(Ce,{method:"POST",headers:{Authorization:`Bearer ${s}`},body:r});if(!m.ok){const o=await m.json();return j.error(o.message,{position:"top-center"}),!1}const b=await m.json();return j.success(b.message,{position:"top-center"}),!0}catch(r){return j.error((r==null?void 0:r.message)||"Network error: Failed to fetch.",{position:"top-center"}),!1}finally{n(!1)}},loading:t}},ke=()=>{const[t,n]=h.useState(!1);return{updateCompany:async(l,s)=>{const r=localStorage.getItem("authToken"),m=`http://35.154.167.170:3000/companies/${l}`,b=new FormData;for(const o in s)s[o]&&(o==="logo"||o==="contract_document"?s[o]instanceof FileList&&s[o].length>0&&b.append(o,s[o][0]):b.append(o,s[o]));n(!0);try{const o=await fetch(m,{method:"PUT",headers:{Authorization:`Bearer ${r}`},body:b});if(o.ok){const i=await o.json();return j.success(i.message,{position:"top-center"}),!0}const u=await o.json();return j.error(u.message,{position:"top-center"}),!1}catch(o){return j.error(o.message,{position:"top-center"}),!1}finally{n(!1)}},loading:t}},Oe=t=>{const n=ae(t),{forwardedProps:p,internalProps:l}=oe(n,"date");return se({forwardedProps:p,internalProps:l,valueManager:O,fieldValueManager:re,validator:v,valueType:"date"})},ve=["slots","slotProps","InputProps","inputProps"],$=h.forwardRef(function(n,p){const l=T({props:n,name:"MuiDateField"}),{slots:s,slotProps:r,InputProps:m,inputProps:b}=l,o=M(l,ve),u=l,i=(s==null?void 0:s.textField)??(n.enableAccessibleFieldDOMStructure?ne:ie),y=le({elementType:i,externalSlotProps:r==null?void 0:r.textField,externalForwardedProps:o,additionalProps:{ref:p},ownerState:u});y.inputProps=c({},b,y.inputProps),y.InputProps=c({},m,y.InputProps);const x=Oe(y),D=de(x),f=ce(c({},D,{slots:s,slotProps:r}));return a.jsx(i,c({},f))});function Me(t){return ue("MuiDatePickerToolbar",t)}me("MuiDatePickerToolbar",["root","title"]);const qe=["value","isLandscape","onChange","toolbarFormat","toolbarPlaceholder","views","className","onViewChange","view"],Se=t=>{const{classes:n}=t;return ye({root:["root"],title:["title"]},Me,n)},Re=A(pe,{name:"MuiDatePickerToolbar",slot:"Root",overridesResolver:(t,n)=>n.root})({}),Ee=A(be,{name:"MuiDatePickerToolbar",slot:"Title",overridesResolver:(t,n)=>n.title})({variants:[{props:{isLandscape:!0},style:{margin:"auto 16px auto auto"}}]}),Ae=h.forwardRef(function(n,p){const l=T({props:n,name:"MuiDatePickerToolbar"}),{value:s,isLandscape:r,toolbarFormat:m,toolbarPlaceholder:b="––",views:o,className:u}=l,i=M(l,qe),y=C(),x=q(),D=Se(l),f=h.useMemo(()=>{if(!s)return b;const k=S(y,{format:m,views:o},!0);return y.formatByString(s,k)},[s,m,b,y,o]),F=l;return a.jsx(Re,c({ref:p,toolbarTitle:x.datePickerToolbarTitle,isLandscape:r,className:fe(D.root,u)},i,{children:a.jsx(Ee,{variant:"h4",align:r?"left":"center",ownerState:F,className:D.title,children:f})}))});function V(t,n){const p=C(),l=he(),s=T({props:t,name:n}),r=h.useMemo(()=>{var m;return((m=s.localeText)==null?void 0:m.toolbarTitle)==null?s.localeText:c({},s.localeText,{datePickerToolbarTitle:s.localeText.toolbarTitle})},[s.localeText]);return c({},s,{localeText:r},xe({views:s.views,openTo:s.openTo,defaultViews:["year","day"],defaultOpenTo:"day"}),{disableFuture:s.disableFuture??!1,disablePast:s.disablePast??!1,minDate:E(p,s.minDate,l.minDate),maxDate:E(p,s.maxDate,l.maxDate),slots:c({toolbar:Ae},s.slots)})}const Y=h.forwardRef(function(n,p){var u,i;const l=q(),s=C(),r=V(n,"MuiDesktopDatePicker"),m=c({day:P,month:P,year:P},r.viewRenderers),b=c({},r,{viewRenderers:m,format:S(s,r,!1),yearsPerRow:r.yearsPerRow??4,slots:c({openPickerIcon:ge,field:$},r.slots),slotProps:c({},r.slotProps,{field:y=>{var x;return c({},z((x=r.slotProps)==null?void 0:x.field,y),L(r),{ref:p})},toolbar:c({hidden:!0},(u=r.slotProps)==null?void 0:u.toolbar)})}),{renderPicker:o}=_e({props:b,valueManager:O,valueType:"date",getOpenDialogAriaText:I({utils:s,formatKey:"fullDate",contextTranslation:l.openDatePickerDialogue,propsTranslation:(i=b.localeText)==null?void 0:i.openDatePickerDialogue}),validator:v});return o()});Y.propTypes={autoFocus:e.bool,className:e.string,closeOnSelect:e.bool,dayOfWeekFormatter:e.func,defaultValue:e.object,disabled:e.bool,disableFuture:e.bool,disableHighlightToday:e.bool,disableOpenPicker:e.bool,disablePast:e.bool,displayWeekNumber:e.bool,enableAccessibleFieldDOMStructure:e.any,fixedWeekNumber:e.number,format:e.string,formatDensity:e.oneOf(["dense","spacious"]),inputRef:U,label:e.node,loading:e.bool,localeText:e.object,maxDate:e.object,minDate:e.object,monthsPerRow:e.oneOf([3,4]),name:e.string,onAccept:e.func,onChange:e.func,onClose:e.func,onError:e.func,onMonthChange:e.func,onOpen:e.func,onSelectedSectionsChange:e.func,onViewChange:e.func,onYearChange:e.func,open:e.bool,openTo:e.oneOf(["day","month","year"]),orientation:e.oneOf(["landscape","portrait"]),readOnly:e.bool,reduceAnimations:e.bool,referenceDate:e.object,renderLoading:e.func,selectedSections:e.oneOfType([e.oneOf(["all","day","empty","hours","meridiem","minutes","month","seconds","weekDay","year"]),e.number]),shouldDisableDate:e.func,shouldDisableMonth:e.func,shouldDisableYear:e.func,showDaysOutsideCurrentMonth:e.bool,slotProps:e.object,slots:e.object,sx:e.oneOfType([e.arrayOf(e.oneOfType([e.func,e.object,e.bool])),e.func,e.object]),timezone:e.string,value:e.object,view:e.oneOf(["day","month","year"]),viewRenderers:e.shape({day:e.func,month:e.func,year:e.func}),views:e.arrayOf(e.oneOf(["day","month","year"]).isRequired),yearsOrder:e.oneOf(["asc","desc"]),yearsPerRow:e.oneOf([3,4])};const W=h.forwardRef(function(n,p){var u,i;const l=q(),s=C(),r=V(n,"MuiMobileDatePicker"),m=c({day:P,month:P,year:P},r.viewRenderers),b=c({},r,{viewRenderers:m,format:S(s,r,!1),slots:c({field:$},r.slots),slotProps:c({},r.slotProps,{field:y=>{var x;return c({},z((x=r.slotProps)==null?void 0:x.field,y),L(r),{ref:p})},toolbar:c({hidden:!1},(u=r.slotProps)==null?void 0:u.toolbar)})}),{renderPicker:o}=je({props:b,valueManager:O,valueType:"date",getOpenDialogAriaText:I({utils:s,formatKey:"fullDate",contextTranslation:l.openDatePickerDialogue,propsTranslation:(i=b.localeText)==null?void 0:i.openDatePickerDialogue}),validator:v});return o()});W.propTypes={autoFocus:e.bool,className:e.string,closeOnSelect:e.bool,dayOfWeekFormatter:e.func,defaultValue:e.object,disabled:e.bool,disableFuture:e.bool,disableHighlightToday:e.bool,disableOpenPicker:e.bool,disablePast:e.bool,displayWeekNumber:e.bool,enableAccessibleFieldDOMStructure:e.any,fixedWeekNumber:e.number,format:e.string,formatDensity:e.oneOf(["dense","spacious"]),inputRef:U,label:e.node,loading:e.bool,localeText:e.object,maxDate:e.object,minDate:e.object,monthsPerRow:e.oneOf([3,4]),name:e.string,onAccept:e.func,onChange:e.func,onClose:e.func,onError:e.func,onMonthChange:e.func,onOpen:e.func,onSelectedSectionsChange:e.func,onViewChange:e.func,onYearChange:e.func,open:e.bool,openTo:e.oneOf(["day","month","year"]),orientation:e.oneOf(["landscape","portrait"]),readOnly:e.bool,reduceAnimations:e.bool,referenceDate:e.object,renderLoading:e.func,selectedSections:e.oneOfType([e.oneOf(["all","day","empty","hours","meridiem","minutes","month","seconds","weekDay","year"]),e.number]),shouldDisableDate:e.func,shouldDisableMonth:e.func,shouldDisableYear:e.func,showDaysOutsideCurrentMonth:e.bool,slotProps:e.object,slots:e.object,sx:e.oneOfType([e.arrayOf(e.oneOfType([e.func,e.object,e.bool])),e.func,e.object]),timezone:e.string,value:e.object,view:e.oneOf(["day","month","year"]),viewRenderers:e.shape({day:e.func,month:e.func,year:e.func}),views:e.arrayOf(e.oneOf(["day","month","year"]).isRequired),yearsOrder:e.oneOf(["asc","desc"]),yearsPerRow:e.oneOf([3,4])};const ze=["desktopModeMediaQuery"],Le=h.forwardRef(function(n,p){const l=T({props:n,name:"MuiDatePicker"}),{desktopModeMediaQuery:s=Pe}=l,r=M(l,ze);return De(s,{defaultMatches:!0})?a.jsx(Y,c({ref:p},r)):a.jsx(W,c({ref:p},r))}),Ie=K().shape({company_name:g().required("Company name is required").test("required","Company name is required",t=>!!t),address:g().required("Address is required").test("required","Address is required",t=>!!t),city:g().required("City is required").test("required","City is required",t=>!!t),state:g().required("State is required").test("required","State is required",t=>!!t),zip_code:g().test("required","Zip Code is required",t=>!(t===null||t==="")).test("format","Zip Code must be a 6 digit number",t=>t===null||t===""?!0:/^[0-9]{6}$/.test(t)),company_owner_name:g().required("Company Owner Name is required").test("required","Company Owner Name is required",t=>!!t),phone_number:g().nullable().test("format","Phone Number must be a 10-digit number",t=>t===null||t===""?!0:/^[0-9]{10}$/.test(t)).test("required","Phone Number is required",t=>!(t===null||t==="")),mobile_number:g().required("Mobile Number is required").matches(/^[0-9]{10}$/,"Mobile Number must be a 10-digit number").test("required","Mobile Number is required",t=>!!t).test("format","Mobile Number must be a 10-digit number",t=>t?/^[0-9]{10}$/.test(t):!0),email:g().required("Email is required").email("Enter a valid email").test("required","Email is required",t=>!!t),logo:R().nullable().required("Logo is required").test("fileSize","Logo file is too large",t=>t&&t instanceof File?t.size<=2e6:!0).test("fileType","Unsupported logo format",t=>t&&t instanceof File?["image/jpeg","image/png","image/gif"].includes(t.type):!0),registration_number:g().nullable().test("required","Registration Number is required",t=>!!t),registration_date:Z().nullable().required("Please select the registration date").typeError("Please select the registration date").max(new Date,"Registration Date cannot be in the future"),gstin:g().nullable().test("required","GSTIN is required",t=>!!t),company_ownedby:g().test("required","Company Owned By is required",t=>!(t===null||t==="")).test("format","Company Owned By must be a number",t=>t===null||t===""?!0:/^[0-9]+$/.test(t)),contract_document:R().nullable().test("fileSize","File is too large",t=>t&&t instanceof File?t.size<=5e6:!0).test("fileType","Unsupported file format",t=>t&&t instanceof File?["application/pdf"].includes(t.type):!0)}),We=()=>{const{addCompany:t,loading:n}=Fe(),{updateCompany:p,loading:l}=ke(),{id:s}=H(),{companies:r,fetchCompanies:m}=J(),b=X(),[o,u]=h.useState({company_name:"",address:"",city:"",state:"",zip_code:"",company_owner_name:"",phone_number:"",mobile_number:"",email:"",website:"",logo:null,registration_number:"",registration_date:"",gstin:"",company_ownedby:"",contract_document:null}),[i,y]=h.useState({}),[x,D]=h.useState(!1);h.useEffect(()=>{(async()=>{try{await m()}catch{j.error("Failed to fetch company data.")}})()},[m]),h.useEffect(()=>{if(r.length>0&&s){const d=r.find(_=>_.company_id===parseInt(s));d&&(u({company_name:d.company_name||"",address:d.address||"",city:d.city||"",state:d.state||"",zip_code:d.zip_code||"",company_owner_name:d.company_owner_name||"",phone_number:d.phone_number||"",mobile_number:d.mobile_number||"",email:d.email||"",website:d.website||"",logo:null,registration_number:d.registration_number||"",registration_date:d.registration_date||"",gstin:d.gstin||"",company_ownedby:d.company_ownedby||"",contract_document:null}),D(!0))}},[r,s]);const f=d=>{const{name:_,value:N,type:w,files:G}=d.target;u(Q=>({...Q,[_]:w==="file"?G:N}))},F=d=>{u(_=>({..._,registration_date:d?d.format("MM-DD-YYYY"):""}))},k=async d=>{d.preventDefault();try{await Ie.validate(o,{abortEarly:!1}),x&&s?await p(s,o)&&b("/companies"):await t(o)&&(u({company_name:"",address:"",city:"",state:"",zip_code:"",company_owner_name:"",phone_number:"",mobile_number:"",email:"",website:"",logo:null,registration_number:"",registration_date:"",gstin:"",company_ownedby:"",contract_document:null}),b("/companies"))}catch(_){if(_ instanceof ee){const N={};_.inner.forEach(w=>{N[w.path]=w.message}),y(N)}else j.error("Failed to submit the form. Please try again.")}},B=()=>{b("/companies")};return a.jsxs("div",{className:"card max-w-4xl mx-auto p-6 bg-white shadow-md",children:[a.jsx("h1",{className:"text-2xl font-bold mb-6",children:x?"Edit Company":"Add Company"}),a.jsxs("form",{onSubmit:k,children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"company_name",children:"Company Name"}),a.jsx("input",{type:"text",id:"company_name",name:"company_name",value:o.company_name,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.company_name||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"address",children:"Address"}),a.jsx("input",{type:"text",id:"address",name:"address",value:o.address,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.address||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"city",children:"City"}),a.jsx("input",{type:"text",id:"city",name:"city",value:o.city,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.city||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"state",children:"State"}),a.jsx("input",{type:"text",id:"state",name:"state",value:o.state,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.state||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"zip_code",children:"Zip Code"}),a.jsx("input",{type:"text",id:"zip_code",name:"zip_code",value:o.zip_code,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.zip_code||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"company_owner_name",children:"Company Owner Name"}),a.jsx("input",{type:"text",id:"company_owner_name",name:"company_owner_name",value:o.company_owner_name,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.company_owner_name||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"phone_number",children:"Phone Number"}),a.jsx("input",{type:"text",id:"phone_number",name:"phone_number",value:o.phone_number,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.phone_number||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"mobile_number",children:"Mobile Number"}),a.jsx("input",{type:"text",id:"mobile_number",name:"mobile_number",value:o.mobile_number,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.mobile_number||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"email",children:"Email"}),a.jsx("input",{type:"text",id:"email",name:"email",value:o.email,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.email||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"website",children:"Website"}),a.jsx("input",{type:"text",id:"website",name:"website",value:o.website,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.website||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"logo",children:"Logo"}),a.jsx("input",{type:"file",id:"logo",name:"logo",accept:"image/*",onChange:f,className:"border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.logo||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"registration_number",children:"Registration Number"}),a.jsx("input",{type:"text",id:"registration_number",name:"registration_number",value:o.registration_number,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.registration_number||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"registration_date",children:"Registration Date"}),a.jsx(Ne,{dateAdapter:we,children:a.jsx(Le,{value:o.registration_date?te(o.registration_date):null,onChange:F,format:"MM-DD-YYYY",renderInput:d=>a.jsx("input",{...d,id:"registration_date",name:"registration_date",className:"input border border-gray-300 rounded-md p-2"})})}),a.jsx("p",{className:"text-red-500 text-sm",children:i.registration_date||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"gstin",children:"GSTIN"}),a.jsx("input",{type:"text",id:"gstin",name:"gstin",value:o.gstin,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.gstin||" "})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"mb-2 font-semibold",htmlFor:"company_ownedby",children:"Company Owned By"}),a.jsx("input",{type:"text",id:"company_ownedby",name:"company_ownedby",value:o.company_ownedby,onChange:f,className:"input border border-gray-300 rounded-md p-2"}),a.jsx("p",{className:"text-red-500 text-sm",children:i.company_ownedby||" "})]})]}),a.jsxs("div",{className:"flex justify-start mt-6",children:[a.jsx("button",{type:"submit",className:"btn btn-primary mr-4",disabled:n||l,children:x?"Update Company":"Add Company"}),a.jsx("button",{type:"button",onClick:B,className:"btn btn-secondary",children:"Cancel"})]})]})]})};export{We as default};