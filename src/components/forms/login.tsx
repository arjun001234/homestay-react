import { Form, Formik } from "formik";
import MyTextInput from "./myTextInput";
import * as yup from "yup";
import { LoginUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

type loginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return (
    <Formik<loginFormValues>
      initialValues={{ email: "", password: "" }}
      validationSchema={yup.object({
        email: yup.string().required().email(),
        password: yup
          .string()
          .required()
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "password too weak"
          ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(LoginUser(values.email,values.password,navigate))
        setSubmitting(false)
      }}
    >
      {(formik) => (
        <div className="form-container">
        <Form className="form" onSubmit={formik.handleSubmit}>
          <div className="title">Welcome Back</div>
          <div className="subtitle">Continue your journey with us</div>
          <MyTextInput label="Email" name="email" type="text" placeholder="Email"/>
          <MyTextInput label="Password" name="password" type="text" placeholder="Password"/>
          <button disabled={formik.isSubmitting ? true : false} type="submit">{formik.isSubmitting ? "Logging..." : "Login"}</button>
        </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
