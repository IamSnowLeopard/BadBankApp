import React, { useState } from "react";
import { useUserActivities } from "./UserActivitiesContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateAccount = () => {
  const { addActivity } = useUserActivities();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/create-account`,
        values
      );
      addActivity({
        type: "New account",
        message: `Account ${values.email} created`,
      });

      setFormSubmitted(true);
      setSubmitting(false);
      resetForm({ values: "" });
    } catch (error) {
      console.error("There was an error creating the account!", error);
      setSubmitting(false);
    }
  };

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
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                  />
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
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                  />
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
                    id="password"
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
