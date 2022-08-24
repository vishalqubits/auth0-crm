import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

function Input(props: any) {
  const { placeholder, name, type } = props;
  return (
    <div className="relative mt-3 md:mt-6 pb-6 md:pb-9">
      <div className="w-full">
        <Field
          className="border h-9 md:h-12 border-black-500 rounded-md px-2 md:px-4 text-normalTextBlack text-c-tiny md:text-c-xl not-italic font-normal"
          id={name}
          placeholder={placeholder}
          name={name}
          type={type}
        />
      </div>

      <div className="absolute py-1 md:py-2 w-full ">
        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
}

export default Input;
