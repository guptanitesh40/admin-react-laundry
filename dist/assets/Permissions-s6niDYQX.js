import{$ as P,a0 as S,a1 as _,r,t as p,j as e,T as C,V as E,L as J}from"./index-CRy1hVzF.js";const O=({isSave:h,setIsSave:l,setIsLoading:m})=>{var b;const{modulesData:n}=P(),{assignRolePermission:c,loading:o}=S(),{permissionsData:d,loading:N}=_(),[x,j]=r.useState([]),[y,f]=r.useState([]),g=p(),u=(b=g==null?void 0:g.state)==null?void 0:b.role_id;r.useEffect(()=>{m(o)},[o]),r.useEffect(()=>{if(n&&d){const t=d.map(s=>({...s}));n.forEach(s=>{t.find(a=>a.role_id===u&&a.module_id===s.module_id)||t.push({role_id:u,module_id:s.module_id,create:!1,update:!1,read:!1,delete:!1})}),j(t),f(JSON.parse(JSON.stringify(t)))}},[n,d]),r.useEffect(()=>{if(h){if(!(JSON.stringify(x)!==JSON.stringify(y))){l(!1);return}(async()=>{try{c(x)&&(f(JSON.parse(JSON.stringify(x))),l(!1))}catch{E.error("Failed to assign role permissions. Please try again.")}})()}},[h]);const v=(t,s)=>{j(i=>i.map(a=>a.role_id===u&&a.module_id===t?{...a,[s]:!a[s],read:s==="read"?!a.read:(s==="create"||s==="update"||s==="delete")&&(!a.read||a.create&&a.update&&a.delete)?!0:a.read}:a))};return e.jsx("div",{className:"card-body",children:e.jsx("div",{"data-datatable":"true","data-datatable-page-size":"10",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[200px]",children:"Modules"}),e.jsx("th",{children:"Create"}),e.jsx("th",{children:"Read"}),e.jsx("th",{children:"Update"}),e.jsx("th",{children:"Delete"})]})}),N?e.jsx(C,{}):n&&x.length>0?e.jsx("tbody",{children:n.map(t=>{const s=x.find(i=>i.role_id===u&&i.module_id===t.module_id);return e.jsxs("tr",{children:[e.jsx("td",{children:t.module_name}),["create","read","update","delete"].map(i=>e.jsx("td",{children:e.jsx("input",{className:"w-4 h-4",type:"checkbox",checked:s?s[i]:!1,onChange:()=>v(t.module_id,i)})},i))]},t.module_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Modules Data Available"})})})]})})})})},D=()=>{var d;const[h,l]=r.useState(!1),[m,n]=r.useState(!1),c=p(),o=(d=c==null?void 0:c.state)==null?void 0:d.role;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-5",children:[e.jsxs("div",{className:"flex flex-col justify-center gap-2",children:[e.jsxs("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:[o," Permissions"]}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Manage permissions for the ",o,"."]})]}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("button",{className:"btn btn-primary",onClick:()=>l(!0),disabled:m,children:m?e.jsxs(e.Fragment,{children:[" ","Saving"," ",e.jsx(J,{})," "]}):e.jsx(e.Fragment,{children:"Save Changes"})})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(O,{isSave:h,setIsSave:l,setIsLoading:n})})})})]})};export{D as default};
