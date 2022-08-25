import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikControl from "./components/FormikControl";

/**Arrow function for form included in contact us page
 * @returns contact us enquiry form
 */
const CreateUserForm = () => {
  const initialValues = {
    userId: "",
    email: "",
    password: "",
    name: "",
    orgId: "",
  };

  interface IValues {
    userId: string;
    email: string;
    password: string;
    name: string;
    orgId: string;
  }

  /**Yup is used for form validation */
  const validationSchema = Yup.object({
    userId: Yup.string().required("*User id is required"),
    email: Yup.string().required("*Email is required"),
    password: Yup.string().required("*Password id is required"),
    name: Yup.string().required("*Name is required"),
    orgId: Yup.string().required("*Org id is required"),
  });

  const onSubmit = async (
    values: IValues,
    { setSubmitting, resetForm }: FormikHelpers<IValues>
  ) => {
    try {
      console.log("Form data", values);

      await fetch("/api/createUser", {
        method: "POST",
        body: JSON.stringify({
          userId: values.userId,
          email: values.email,
          password: values.password,
          name: values.name,
          orgId: values.orgId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await fetch("/api/addUserInOrganization", {
        method: "POST",
        body: JSON.stringify({
          userId: values.userId,
          orgId: values.orgId,
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
                placeholder="User id*"
                name="userId"
              />
              <FormikControl
                control="input"
                type="email"
                placeholder="Email*"
                name="email"
              />
              <FormikControl
                control="input"
                type="password"
                placeholder="Password*"
                name="password"
              />
              <FormikControl
                control="input"
                type="text"
                placeholder="Name*"
                name="name"
              />
              <FormikControl
                control="input"
                type="text"
                placeholder="Org id*"
                name="orgId"
              />
              <button type="submit" className="bg-green-200 p-2 rounded-md">
                Create user
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateUserForm;
