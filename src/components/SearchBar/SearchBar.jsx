import { Field, Form, Formik } from "formik";

export const SearchBar = ({ onSetSearchQuery }) => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values) => {
        onSetSearchQuery(values.query);
      }}
    >
      <Form>
        <Field
          placeholder="Search images and photos"
          type="text"
          name="query"
        />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};
