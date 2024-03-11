import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import * as Yup from "yup";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short name!")
    .max(50, "Too Long name!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d\d\d-\d\d-\d\d$/, "Invalid number, XXX-XX-XX only!")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

export const ContactForm = ({ addContact }) => {
  const nameId = useId();
  const numberId = useId();

  const handleAddContact = (values, actions) => {
    console.log(values);
    addContact(values.name, values.number);
    actions.resetForm();
  };

  const handleNumberChange = (handleChange) => (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(?<=^\d\d\d\d\d)(\d)/, "-$1");
    value = value.replace(/(?<=^\d\d\d)(\d)/, "-$1");

    handleChange({
      target: {
        name: "number",
        value,
      },
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleAddContact}
      validationSchema={FeedbackSchema}
    >
      {({ handleChange }) => (
        <Form>
          <label htmlFor={nameId}>
            <p>Name</p>
            <Field type="text" name="name" id={nameId}></Field>
            <ErrorMessage name="name" as="span" />
          </label>
          <label htmlFor={numberId}>
            <p>Number</p>
            <Field
              type="phone"
              name="number"
              id={numberId}
              onChange={handleNumberChange(handleChange)}
            ></Field>
            <ErrorMessage name="number" as="span" />
          </label>
          <button type="submit">Add contact</button>
        </Form>
      )}
    </Formik>
  );
};
