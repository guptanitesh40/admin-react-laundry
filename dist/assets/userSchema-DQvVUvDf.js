import{r as l,_ as a,c as o,a as e,h as t,q as m}from"./index-LX-Ofzqt.js";const p="http://3.110.208.70:3000/user",b=()=>{const[i,r]=l.useState(!1);return{addUser:async n=>{const d=localStorage.getItem("authToken");r(!0);try{const s=await fetch(p,{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){const u=await s.json();return a.error(u.message,{position:"top-center"}),!1}const c=await s.json();return n.role_id===5?a.success("Customer added successfully",{position:"top-center"}):a.success(c.message,{position:"top-center"}),!0}catch(s){return a.error((s==null?void 0:s.message)||"Error adding banner",{position:"top-center"}),!1}finally{r(!1)}},loading:i}},g=i=>o().shape({first_name:e().required("First name is required"),last_name:e().required("Last name is required"),email:e().email("Enter a valid email"),mobile_number:e().matches(/^\d{10}$/,"Mobile number must be 10 digits").required("Mobile number is required"),gender:t().required("Please select gender"),role_id:t().required("Please select role"),company_ids:m().when("role_id",{is:r=>r===2,then:r=>r.min(1,"Please select at least one company").required("Please select a company"),otherwise:r=>r})}),_=()=>o().shape({first_name:e().required("First name is required"),last_name:e().required("Last name is required"),email:e().email("Enter a valid email"),password:e().min(6,"Password must be at least 6 characters").required("Password is required"),mobile_number:e().matches(/^\d{10}$/,"Mobile number must be 10 digits").required("Mobile number is required"),gender:t().required("Please select gender")});export{g as a,_ as c,b as u};
