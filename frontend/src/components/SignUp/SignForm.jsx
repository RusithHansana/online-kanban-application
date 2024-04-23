import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User } from "react-feather";

import FormInput from './FormInput';
import SignUpFooter from './SignUpFooter';
import { useRegisterMutation, useLoginMutation } from '../../slices/api/usersApiSlice.js';
import { setCredentials } from "../../slices/state/authSlice";

import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignForm = ({ isRegistered, handleButton }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include any special charachters(@, #, $, %, etc.)",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email is invalid",
      label: "Email",
      required: true
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and should include 1 letter, 1 special character, 1 number",
      label: "Password",
      pattern: `^[A-Za-z0-9]{8,20}$`,
      required: true
    },
    {
      id: 4,
      name: "confirm_password",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      label: "Confirm Password",
      pattern: values.password,
      required: true
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData.entries());

    if (!isRegistered) {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/main");
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    } else {
      try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/main");
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }

    }
  }



  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Form
        className="signup-form"
        onSubmit={handleSubmit}
      >
        <div className='form-header'>
          <User />
          <h1> Welcome !</h1>
        </div>
        <div className="inputs">
          {
            isRegistered ? (
              <>
                <FormInput {...inputs[1]} handleChange={handleChange} />
                <FormInput {...inputs[2]} handleChange={handleChange} />
              </>
            ) : (
              inputs.map(input =>
                <FormInput
                  {...input}
                  key={input.id}
                  handleChange={handleChange}
                />
              )
            )
          }
          <button>{isRegistered ? "Sign In" : "Register"}</button>
        </div>
        <div className="form-footer">
          {
            isRegistered ?
              <SignUpFooter message={"Don't have an account? "} action={"Register"} handleButton={handleButton} />
              : <SignUpFooter message={"Already have an account? "} action={"Sign In"} handleButton={handleButton} />
          }
        </div>
        <ToastContainer />
      </Form>
    </>
  );
}

export default SignForm;