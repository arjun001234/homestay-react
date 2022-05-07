import { Form, Formik } from 'formik';
import React from 'react'
import MyTextInput from './myTextInput';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../redux/reducers/user';
import { AppDispatch } from '../../redux/store';

type registerFormValues = {
    name: string
    email: string;
    password: string;
};

const RegisterForm = () => {

     const navigate = useNavigate()
     const dispatch = useDispatch<AppDispatch>()

    return (
        <Formik<registerFormValues>
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={yup.object({
            name: yup.string().required().min(3,"name too short"),
            email: yup.string().required().email(),
            password: yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"password too weak")
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            dispatch(RegisterUser(values.name,values.email,values.password,navigate))
            setSubmitting(false)
          }}
        >
          {(formik) => (
            <div className="form-container">
            <Form className="form" onSubmit={formik.handleSubmit}>
            <div className="title">Welcome</div>
             <div className="subtitle">Let's create your account!</div>
              <MyTextInput label="Name" name="name" type="text" placeholder="Name" />
              <MyTextInput label="Email" name="email" type="text" placeholder="Email" />
              <MyTextInput label="Password" name="password" type="text" placeholder="Password" />
              <button type="submit">Register</button>
            </Form>
            </div>
          )}
        </Formik>
    );
}

export default RegisterForm