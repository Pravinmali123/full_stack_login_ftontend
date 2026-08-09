import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const ini = {
    name: "",
    email: "",
    password: ""
  };

  const handlesubmit = (values, { resetForm }) => {
    console.log("values ==", values);
    
  axios
      .post(`${API_URL}/register/postregister`, values)
      
      .then(() => {
        alert("Signup Completed");
        navigate("/login");
        resetForm();
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Signup Failed");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 border p-5 rounded shadow">
        <h2 className="text-xl mb-4">Sign Up</h2>

        <Formik initialValues={ini} onSubmit={handlesubmit}>
          <Form className="flex flex-col gap-3">

            <Field
              name="name"
              placeholder="Username"
              className="border p-2"
            />

            <Field
              name="email"
              placeholder="Email"
              className="border p-2"
            />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="border p-2"
            />

            <button type="submit" className="bg-green-500 text-white p-2">
              Submit
            </button>

            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600">
                Login
              </Link>
            </p>

          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;