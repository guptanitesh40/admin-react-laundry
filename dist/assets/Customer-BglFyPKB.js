import{r as l,B as C,V as g,u as X,h as E,e as $,j as e,T as Z,n as ee,F as te,f as se,P as ae,s as re,b as oe,a4 as v,a5 as S}from"./index-BdkURwdi.js";import{G as T}from"./enums-CdakGUf3.js";import{u as ne,a as ie}from"./useDeleteUser-COEUmPul.js";import{S as b}from"./sweetalert2.esm.all-B0Dix5B2.js";import{M as le}from"./MultiSelect-Dwbm9YHI.js";import"./orderStatusClasses-HfHBGnti.js";const ce=()=>{const[r,i]=l.useState(),[s,n]=l.useState(!1);return{customerActivityData:r,loading:s,fetchCustomerActivityData:async(h,d)=>{const c=localStorage.getItem("authToken"),a=new URLSearchParams;h&&a.append("startDate",h),d&&a.append("endDate",d),n(!0);try{const o=await fetch(`${C}/report/customer-activity?${a}`,{method:"GET",headers:{Authorization:`Bearer ${c}`}}),p=await o.json();if(!o.ok){g.error(p.message,{position:"top-center"}),n(!1);return}i(p)}catch{g.error("Network error: Failed to fetch customer activity data.")}finally{n(!1)}}}},de=()=>{const[r,i]=l.useState(),[s,n]=l.useState(!1);return{customerData:r,loading:s,fetchNewCustomerData:async(h,d)=>{const c=localStorage.getItem("authToken"),a=new URLSearchParams;h&&a.append("startDate",h),d&&a.append("endDate",d),n(!0);try{const o=await fetch(`${C}/report/new-customer-acquisition-report?${a}`,{method:"GET",headers:{Authorization:`Bearer ${c}`}}),p=await o.json();if(!o.ok){g.error(p.message,{position:"top-center"}),n(!1);return}i(p)}catch{g.error("Network error: Failed to fetch customer data.")}finally{n(!1)}}}},me=()=>{const[r,i]=l.useState(),[s,n]=l.useState(!1);return{customerData:r,loading:s,fetchInActiveCustomerData:async(h,d)=>{const c=localStorage.getItem("authToken"),a=new URLSearchParams;h&&a.append("startDate",h),d&&a.append("endDate",d),n(!0);try{const o=await fetch(`${C}/report/inactive-customer-report?${a}`,{method:"GET",headers:{Authorization:`Bearer ${c}`}}),p=await o.json();if(!o.ok){g.error(p.message,{position:"top-center"}),n(!1);return}i(p)}catch{g.error("Failed to fetch in active customer data.")}finally{n(!1)}}}},he=()=>{const[r,i]=l.useState(1),[s,n]=l.useState(10),[u,h]=l.useState(null),[d,c]=l.useState(),[a,o]=X(),[p,k]=l.useState([]),w=a.get("page"),N=a.get("perPage"),[j,D]=l.useState(""),[_,z]=l.useState(""),[R,P]=l.useState(""),A=E();let M=5;const{users:x,loading:G,count:B,fetchUsers:I}=ne(r,s,j,u,d,p,M),{deleteUser:L}=ie(),{hasPermission:f}=$(),U=Object.entries(T).filter(([t,m])=>typeof m=="number").map(([t,m])=>({label:t,value:m})),V=Math.ceil(B/s);l.useEffect(()=>{w&&i(Number(w)),N&&n(Number(N))},[w,N]),l.useEffect(()=>{j&&(i(1),o({search:j,page:"1",perPage:s.toString()}))},[j]);const W=async t=>{t.preventDefault();try{await re.validate({search:j},{abortEarly:!1}),D(_),P("")}catch(m){m instanceof oe&&P(m.errors[0])}},y=t=>{u===t?c(d==="ASC"?"DESC":"ASC"):(h(t),c("ASC"))},q=t=>{t>=1&&t<=V&&(i(t),o({page:t.toString(),perPage:s.toString()}))},O=t=>{const m=Number(t.target.value);n(m),i(1),o({page:"1",perPage:m.toString()})},K=async t=>{A(`/customer/${t}`)},Y=t=>{A(`/customer/edit/${t}`)},H=async t=>{try{const{isConfirmed:m}=await b.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(m){const{success:J,message:F}=await L(t);J?(x.filter(Q=>Q.user_id!==t).length===0&&r>1&&(i(r-1),o({page:(r-1).toString(),perPage:s.toString()})),await I(),b.fire(F)):b.fire(F)}}catch(m){b.fire({title:"Error",text:m.message,icon:"error"})}};if(x)return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:s,onChange:O,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsx("div",{className:"flex flex-wrap gap-2.5",children:e.jsx(le,{options:U,displayValue:"label",placeholder:"Select Gender",selectedValues:p,onSelect:t=>k(t.map(m=>m.value)),onRemove:t=>k(t.map(m=>m.value)),className:"lgscreen:min-w-[230px] mini:min-w-[250px]",sliceCount:2})}),e.jsxs("div",{className:"flex",children:[e.jsx("form",{onSubmit:W,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:_,onChange:t=>{z(t.target.value),t.target.value===""&&D("")},placeholder:"Search...",className:"mini:min-w-[185px] lgscreen:min-w-[150px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:R||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[70px]",children:e.jsxs("span",{className:`sort ${u==="user_id"?d==="ASC"?"asc":"desc":""}`,onClick:()=>y("user_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${u==="first_name"?d==="ASC"?"asc":"desc":""}`,onClick:()=>y("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Full name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${u==="email"?d==="ASC"?"asc":"desc":""}`,onClick:()=>y("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[190px]",children:e.jsxs("span",{className:`sort ${u==="mobile_number"?d==="ASC"?"asc":"desc":""}`,onClick:()=>y("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[80px]",children:"Gender"}),e.jsx("th",{className:"min-w-[150px]",children:"Total Pending Amount"}),(f(8,"read")||f(8,"update")||f(8,"delete"))&&e.jsx("th",{className:"min-w-[180px]",children:"Actions"})]})}),G?e.jsx(Z,{}):x.length>0?e.jsx("tbody",{children:x==null?void 0:x.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:t.user_id})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-1.5",children:[t.first_name," ",t.last_name]})}),e.jsx("td",{children:t.email}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:t.mobile_number})}),e.jsx("td",{children:T[t.gender]}),e.jsx("td",{children:t.total_due_amount}),(f(8,"read")||f(8,"update")||f(8,"delete"))&&e.jsxs("td",{className:"space-x-3",children:[f(8,"read")&&e.jsx("button",{className:"bg-yellow-100 hover:bg-yellow-200 p-[9px] rounded-full",style:{marginBottom:"-30px"},onClick:()=>K(t.user_id),children:e.jsx(ee,{size:18,className:"text-gray-600"})}),f(8,"update")&&e.jsx("button",{className:"bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>Y(t.user_id),children:e.jsx(te,{className:"text-yellow-600"})}),f(8,"delete")&&e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>H(t.user_id),children:e.jsx(se,{className:"text-red-500"})})]})]},t.user_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No customer available"})})})]})}),e.jsx(ae,{count:B,currentPage:r,totalRecords:x==null?void 0:x.length,perPage:s,onPageChange:q,label:"customers"})]})})]})},{RangePicker:pe}=v,ue=()=>{const[r,i]=l.useState({start_time:"",end_time:""}),{customerActivityData:s,fetchCustomerActivityData:n}=ce();l.useEffect(()=>{r.start_time&&r.end_time?n(r.start_time,r.end_time):n()},[r]);const u=(a,o)=>{i(a?{start_time:o[0],end_time:o[1]}:{start_time:"",end_time:""})},h=(s==null?void 0:s.map(a=>a.month.split("-")[0]))||[],c={series:[{name:"Login Count",data:(s==null?void 0:s.map(a=>a.login_count))||[]}],options:{chart:{type:"area",height:240,toolbar:{show:!1}},dataLabels:{enabled:!1},colors:["#4154f1"],fill:{gradient:{enabled:!0,opacityFrom:.25,opacityTo:.1}},grid:{borderColor:"rgba(0, 0, 0, 0)",strokeDashArray:5,padding:{top:0,right:0,bottom:20,left:8}},stroke:{curve:"smooth",show:!0,width:3,colors:["#4154f1"]},legend:{show:!1},xaxis:{type:"category",categories:h,labels:{show:!0,style:{colors:"#6B7280",fontSize:"12px",fontWeight:500}},axisTicks:{show:!0,color:"#D1D5DB",height:6},axisBorder:{show:!0,color:"#D1D5DB"},crosshairs:{position:"front",stroke:{color:"#3B82F6",width:1,dashArray:3}}},markers:{colors:"#4154f1",strokeColors:"#4154f1",strokeWidth:4,hover:{size:5}},yaxis:{min:0,tickAmount:1,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"},formatter:a=>a>=1e3?`₹${(a/1e3).toFixed(0)}K`:a.toString()}},responsive:[{breakpoint:480,options:{legend:{position:"bottom"}}}],tooltip:{x:{format:"MMM yyyy"}}}};return e.jsxs("div",{className:"card w-full pb-2.5 max-h-[300px] rounded-md",children:[e.jsx("div",{className:"self-end p-3 sm:mt-0",children:e.jsx(pe,{className:"min-w-[80px] sm:w-[250px]",dropdownClassName:"custom-rangepicker-dropdown",onChange:u})}),e.jsx("div",{className:"flex justify-between ml-6",children:e.jsxs("div",{children:[e.jsx("h3",{className:"card-title text-lg",children:"Activity"}),e.jsx("span",{className:"text-gray-500 font-medium",children:"Customer Login Count"})]})}),e.jsx("div",{className:"card-body flex flex-col justify-end items-stretch grow px-0 py-1",children:e.jsx(S,{options:c.options,series:c.series,type:c.options.chart.type,height:200})})]})},{RangePicker:xe}=v,fe=()=>{const[r,i]=l.useState({start_time:"",end_time:""}),{customerData:s,fetchNewCustomerData:n}=de();l.useEffect(()=>{r.start_time&&r.end_time?n(r.start_time,r.end_time):n()},[r]);const u=(o,p)=>{i(o?{start_time:p[0],end_time:p[1]}:{start_time:"",end_time:""})},h=(s==null?void 0:s.map(o=>o.month.split("-")[0]))||[],d=(s==null?void 0:s.map(o=>o.customer_count))||[],c=s==null?void 0:s.reduce((o,p)=>o+Number(p.customer_count),0),a={series:[{name:"New Customer",data:d}],options:{chart:{fontFamily:"inherit",type:"bar",toolbar:{show:!1}},plotOptions:{bar:{horizontal:!1,columnWidth:"40%",borderRadius:5}},legend:{show:!1},dataLabels:{enabled:!1},stroke:{show:!0,width:2,colors:"blue"},xaxis:{type:"category",categories:h,labels:{show:!0,style:{colors:"#6B7280",fontSize:"12px",fontWeight:500}},axisTicks:{show:!0,color:"#D1D5DB",height:6},axisBorder:{show:!0,color:"#D1D5DB"},crosshairs:{position:"front",stroke:{color:"#3B82F6",width:1,dashArray:3}}},yaxis:{min:0,tickAmount:5,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"},formatter:o=>o>=1e3?`₹${(o/1e3).toFixed(0)}K`:o.toString()}},fill:{opacity:1},states:{normal:{filter:{type:"none",value:0}},hover:{filter:{type:"none",value:0}},active:{allowMultipleDataPointsSelection:!1,filter:{type:"none",value:0}}},tooltip:{style:{fontSize:"12px"}},colors:["#ECE852"],grid:{strokeDashArray:4,yaxis:{lines:{show:!0}}}}};return e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card w-full rounded-md",children:[e.jsx("div",{className:"self-end p-3 sm:mt-0",children:e.jsx(xe,{className:"min-w-[80px] sm:w-[250px]",dropdownClassName:"custom-rangepicker-dropdown",onChange:u})}),e.jsxs("div",{className:"card-header pt-0  border-none",children:[e.jsx("div",{className:"flex flex-col justify-between",children:e.jsx("h3",{className:"card-title",children:"New Customer"})}),e.jsx("div",{className:"mt-2",children:e.jsxs("span",{className:"p-3 bg-red-50 rounded-md relative text-gray-500 semibold",children:["+",c]})})]}),e.jsx("div",{className:"card-body flex flex-col justify-end items-stretch grow px-0 py-1",children:e.jsx(S,{options:a.options,series:a.series,type:a.options.chart.type,height:163})})]})})},{RangePicker:ge}=v,je=()=>{const[r,i]=l.useState({start_time:"",end_time:""}),{customerData:s,fetchInActiveCustomerData:n}=me();l.useEffect(()=>{r.start_time&&r.end_time?n(r.start_time,r.end_time):n()},[r]);const u=(a,o)=>{i(a?{start_time:o[0],end_time:o[1]}:{start_time:"",end_time:""})},h=(s==null?void 0:s.map(a=>a.month.split("-")[0]))||[],c={series:[{name:"No Active Customer",data:(s==null?void 0:s.map(a=>a.not_active_count))||[]}],options:{chart:{type:"area",height:200,toolbar:{show:!1}},dataLabels:{enabled:!1},colors:["#4154f1"],fill:{gradient:{enabled:!0,opacityFrom:.25,opacityTo:.1}},grid:{borderColor:"rgba(0, 0, 0, 0)",strokeDashArray:5,padding:{top:0,right:0,bottom:2,left:8}},stroke:{curve:"smooth",show:!0,width:3,colors:["#4154f1"]},legend:{show:!1},xaxis:{type:"category",categories:h,labels:{show:!0,style:{colors:"#6B7280",fontSize:"12px",fontWeight:500}},axisTicks:{show:!0,color:"#D1D5DB",height:6},axisBorder:{show:!0,color:"#D1D5DB"},crosshairs:{position:"front",stroke:{color:"#3B82F6",width:1,dashArray:3}}},markers:{colors:"#4154f1",strokeColors:"#4154f1",strokeWidth:4,hover:{size:5}},yaxis:{min:0,tickAmount:1,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"},formatter:a=>a>=1e3?`₹${(a/1e3).toFixed(0)}K`:a.toString()}},tooltip:{x:{format:"MMM yyyy"}}}};return e.jsxs("div",{className:"card w-full pb-2.5 max-h-[300px] rounded-md",children:[e.jsx("div",{className:"self-end p-3 sm:mt-0",children:e.jsx(ge,{className:"min-w-[80px] sm:w-[250px]",dropdownClassName:"custom-rangepicker-dropdown",onChange:u})}),e.jsx("div",{className:"flex justify-between ml-5",children:e.jsx("div",{children:e.jsx("h3",{className:"card-title text-lg",children:"In Active Customer"})})}),e.jsx("div",{className:"card-body flex flex-col justify-end items-stretch grow px-0 py-3",children:e.jsx(S,{options:c.options,series:c.series,type:c.options.chart.type,height:c.options.chart.height})})]})},ke=()=>{const r=E(),{hasPermission:i}=$(),s=()=>{r("/customer/add")};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 desktop:grid-cols-1 zx:grid-cols-1 pb-8 gap-x-4 gap-y-4",children:[e.jsx(ue,{}),e.jsx(fe,{}),e.jsx(je,{})]}),e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-4",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Customers"})}),i(8,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{className:"btn btn-primary",onClick:s,children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Customer"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(he,{})})})})]})};export{ke as default};
