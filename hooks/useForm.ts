import { useState } from "react";

// Define a generic type for the form values
type FormValues<T> = {
  [K in keyof T]: T[K];
};

const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<FormValues<T>>(initialValues);

  const onChangeInput = (key: keyof T, value: T[keyof T]) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  return {
    values,
    onChangeInput,
  };
};

export default useForm;
