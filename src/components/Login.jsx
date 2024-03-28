import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Defines the component for the login form
const Login = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Initial form values for email and password
  const initialValues = {
    email: "",
    password: "",
  };

  // Validation for the login form using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handles form submission
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Login Info:", values);
      const loginSuccess = true;
      if (loginSuccess) {
        navigate("/all-data"); // Redirect to the All Data page
      }
      setSubmitting(false); // Reset the form's submitting state
    }, 400); // Simulates a delay, e.g., from a server response
  };

  return (
    //form
    <div
      className="card mx-auto"
      style={{ maxWidth: "400px", marginTop: "20px" }}
    >
      <div className="card-body">
        <h5 className="card-title">Login</h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="errorMessage"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="errorMessage"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
