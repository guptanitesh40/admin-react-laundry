import{n as m,r as d,j as e,v as c}from"./index-qfg-RXc2.js";import{u as i}from"./useGetBranch-CBq_5Vri.js";const h=()=>{const{id:a}=m(),s=Number(a),{branch:t,fetchBranch:r,loading:n}=i();return d.useEffect(()=>{r(s)},[s]),n?e.jsx(c,{}):t?e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"card w-[50%]",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:t.branch_name})}),e.jsx("div",{className:"card-body pt-3.5 pb-3.5",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10",children:"Address:"}),e.jsx("td",{className:"text-sm font-medium text-gray-800 pb-3",children:t.branch_address})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10",children:"Manager:"}),e.jsxs("td",{className:"text-sm font-medium text-gray-800 pb-3",children:[t.branchManager.first_name," ",t.branchManager.last_name]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10",children:"Phone no 1:"}),e.jsx("td",{className:"text-sm font-medium text-gray-800 pb-3",children:t.branch_phone_number})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10",children:"Phone no 2:"}),e.jsx("td",{className:"text-sm font-medium text-gray-800 pb-3",children:t.branch_mobile_number})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10",children:"Email:"}),e.jsx("td",{className:"text-sm font-medium text-gray-800 pb-3",children:t.branch_email})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10",children:"Registration Number:"}),e.jsx("td",{className:"text-sm font-medium text-gray-800 pb-3",children:t.branch_registration_number})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10",children:"Company :"}),e.jsx("td",{className:"text-sm font-medium text-gray-800 pb-3",children:t.company.company_name})]})]})})})]})}):null};export{h as default};
