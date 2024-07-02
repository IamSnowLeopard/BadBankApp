import React, { useState } from "react";
import { useUserActivities } from "./UserActivitiesContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Component to create a new account
const CreateAccount = () => {
  const { addActivity } = useUserActivities(); // Hook into the custom context to log user activities
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track whether the form has been submitted

  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  // Form validation using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send POST request to the backend to create a new account
      const response = await axios.post(
        "http://localhost:5001/auth/create-account",
        values
      );

      console.log(response.data); // Log response data for debugging
      addActivity({
        type: "New account",
        message: `Account ${values.email} created`,
      });

      // Update the form as submitted successfully
      setFormSubmitted(true);
      // Re-enable the submit button
      setSubmitting(false);
      // Reset the form fields
      resetForm({ values: "" });
    } catch (error) {
      console.error("There was an error creating the account!", error);
      setSubmitting(false);
    }
  };

  // Handler to reset the form and allow another account creation
  const handleAddAnother = () => {
    setFormSubmitted(false);
  };

  return (
    <div
      className="card mx-auto"
      style={{ maxWidth: "400px", marginTop: "20px" }}
    >
      <div className="card-body">
        <h5 className="card-title">Create Account</h5>
        {!formSubmitted ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="errorMessage"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
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
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <p className="text-success">Account created successfully!</p>
            <button onClick={handleAddAnother} className="btn btn-info">
              Add Another Account
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
