import { Form, Formik, yupToFormErrors } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { SearchHomestays } from "../../redux/reducers/app";
import { AppDispatch, RootState } from "../../redux/store";
import MySelectInput from "./mySelectInput";
import MyTextInput from "./myTextInput";

type searchFormValues = {
  value: string;
  field: "name" | "country" | "city" | "state";
};

const SearchForm: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const app = useSelector((state: RootState) => state.app)

  return (
    <Formik<searchFormValues>
      initialValues={{ value: "", field: "name" }}
      validationSchema={yup.object({
        value: yup.string(),
        field: yup.string().required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        dispatch(SearchHomestays(app.homestays,values.field,values.value))
        setSubmitting(true)
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <MyTextInput
            label="Search"
            name="value"
            type="text"
            placeholder="Search"
          />
          <MySelectInput label="Fields" name="field">
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="state">State</option>
            <option value="country">Country</option>
          </MySelectInput>
          <button type="submit">Search</button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
