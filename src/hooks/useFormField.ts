import React from "react";


export const useFormField = <T>(initialValue: T) => {
    const [values, setValue] = React.useState<T>(initialValue);
     
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target
      setValue({...values, [name]: value})
    }
    return { values, onChange, setValue };
  };