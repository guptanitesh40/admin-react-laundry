import{r as m,V as a,a as l,x as p,l as o,d as r}from"./index-Pj7GyAZD.js";const q="http://3.110.208.70:3000/user",g=()=>{const[i,e]=m.useState(!1);return{addUser:async(u,n=!0)=>{var d;const c=localStorage.getItem("authToken");e(!0);try{const s=await fetch(q,{method:"POST",headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify(u)}),t=await s.json();return s.ok?(n&&(u.role_id===5?a.success("Customer created successfully",{position:"top-center"}):a.success(t.message,{position:"top-center"})),(d=t==null?void 0:t.data)==null?void 0:d.result):(n&&a.error(t.message,{position:"top-center"}),!1)}catch(s){return n&&a.error((s==null?void 0:s.message)||"Error adding banner",{position:"top-center"}),!1}finally{e(!1)}},loading:i}},h=i=>l().shape({first_name:r().required("First name is required"),last_name:r().required("Last name is required"),email:r().email("Enter a valid email"),mobile_number:r().matches(/^\d{10}$/,"Mobile number must be 10 digits").required("Mobile number is required"),gender:o().required("Please select gender"),role_id:o().required("Please select role"),company_ids:p().when("role_id",{is:e=>e===2,then:e=>e.min(1,"Please select at least one company").required("Please select a company"),otherwise:e=>e})}),_=()=>l().shape({first_name:r().required("First name is required"),last_name:r().required("Last name is required"),email:r().required("Email is required").email("Enter a valid email").test("required","Email is required",i=>!!i),mobile_number:r().matches(/^\d{10}$/,"Mobile number must be 10 digits number").required("Mobile number is required"),gender:o().required("Please select gender")});export{h as a,_ as c,g as u};
