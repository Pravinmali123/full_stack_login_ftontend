import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const ini = {
      email : "",
      password : ""
    }
  const navigate = useNavigate();

  const [showOtp, setShowOtp] =
useState(false)

const [otp, setOtp] =
useState("")

const [email,
setEmail] =
useState("")

const handlesubmit =
async(
values,
{ resetForm }
)=>{

try{

const res =
await axios.post(

`${API_URL}/login/postlogin`,

values

)

console.log(
"FULL LOGIN ==",
res.data
)

// OTP only user

if(
res.data.showOtp
){

setEmail(
values.email
)

setShowOtp(
true
)

alert(
"OTP Sent"
)

}

else{

localStorage.setItem(
"token",
res.data.token
)

localStorage.setItem(
"user",

JSON.stringify(
res.data.data
)

)

if(
res.data.data.role
===
"subadmin"
){

navigate(
"/subadmin"
)

}

else if(
res.data.data.role
===
"admin"
){

navigate(
"/dashbord"
)

}

else{

navigate(
"/"
)

}

}

resetForm()

}

catch(error){

alert(

error.response
?.data
?.message

||

"Login Failed"

)

}

};

const verifyOtp =
async()=>{

try{

const res =
await axios.post(

`${API_URL}/login/verifyotp`,

{

email,

otp

}

)

localStorage.setItem(
"token",
res.data.token
)

localStorage.setItem(

"user",

JSON.stringify(
res.data.data
)

)

if(
res.data.data.role
===
"subadmin"
){

alert(
"SubAdmin Login"
)

navigate(
"/subadmin"
)

}

else if(
res.data.data.role
===
"admin"
){

alert(
"Admin Login"
)

navigate(
"/dashbord"
)

}

else{

alert(
"User Login"
)

navigate(
"/home"
)

}

}

catch(error){

alert(

error.response
?.data
?.message

||

"Invalid OTP"

)

}

}
  return (
     <div className="flex justify-center items-center h-screen">
      <div className="w-80 border p-5 rounded shadow">

      <h2 className="text-xl mb-4">Login</h2>

      <Formik initialValues={ini} onSubmit={handlesubmit}>
        <Form className="flex flex-col gap-3">
          {
!showOtp ?

<>
          <Field name="email" placeholder="Enter your email"
              className="border p-2" />
          {/* <br /><br /> */}

          <Field name="password" type="password" placeholder="Enter Password"
              className="border p-2" />
          {/* <br /><br /> */}

          <button type="submit"  className="bg-green-400 text-white p-2">Submit</button>
          </>

:

<>

<input

type="text"

value={otp}

onChange={
(e)=>
setOtp(
e.target.value
)
}

placeholder=
"Enter OTP"

className=
"border p-2"

/>

<button

type="button"

onClick=
{verifyOtp}

className=
"bg-blue-500 text-white p-2"

>

Verify OTP

</button>

</>

}
          <p className="text-sm">Don't have an account?<Link to="/register"  className="text-blue-600">Signup</Link></p>
        </Form>
        
      </Formik>
    </div>
    </div>
  );
};

export default Login;