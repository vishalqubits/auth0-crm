import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikControl from "./components/FormikControl";

/**Arrow function for form included in contact us page
 * @returns contact us enquiry form
 */
const CreateOrganizationForm = () => {
  const initialValues = {
    name: "",
    displayName: "",
  };

  interface IValues {
    name: string;
    displayName: string;
  }

  /**Yup is used for form validation */
  const validationSchema = Yup.object({
    name: Yup.string().required("*Name is required"),
    displayName: Yup.string().required("*Display name is required"),
  });

  const onSubmit = async (
    values: IValues,
    { setSubmitting, resetForm }: FormikHelpers<IValues>
  ) => {
    try {
      console.log("Form data", values);

      await fetch("/api/createOrganization", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          displayName: values.displayName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmitting(false);
      resetForm();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mb-4 md:mb-10 mt-2 md:mt-0 py-3 px-2 md:px-8 rounded-[15px] bg-lightGreen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          // console.log('Formik Props', formik);
          return (
            <Form>
              <FormikControl
                control="input"
                type="text"
                placeholder="Name*"
                name="name"
              />
              <FormikControl
                control="input"
                type="text"
                placeholder="Display Name*"
                name="displayName"
              />

              <button type="submit" className="bg-green-200 p-2 rounded-md">
                Create organization
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateOrganizationForm;
