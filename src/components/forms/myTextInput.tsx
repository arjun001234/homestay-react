import { FormikProps, useField } from "formik";

type myTextInputProps = {
   [key: string]: any
   label: string,
   name: string,  
}

const MyTextInput : React.FC<myTextInputProps> = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <div className="input-container">
        {/* <label htmlFor={props.name}>{label}</label> */}
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="input-error">{meta.error}</div>
        ) : null}
      </div>
    );
};

export default MyTextInput