import { useField } from 'formik';
import React from 'react'

type mySelectInputProps = {
    [key: string]: any 
    label: string,
    name: string,  
}

const MySelectInput : React.FC<mySelectInputProps> = ({label,...props}) => {
   const [field, meta] = useField(props);
   return (
     <>
       {/* <label htmlFor={props.name}>{label}</label> */}
       <select {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="input-error">{meta.error}</div>
       ) : null}
     </>
   );
}

export default MySelectInput