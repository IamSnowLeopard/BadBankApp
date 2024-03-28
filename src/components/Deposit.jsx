import React, { useState } from "react";
import { useUserActivities } from "./UserActivitiesContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Deposit = () => {
  const { addActivity, balance } = useUserActivities();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Currency format function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Initial values for Formik
  const initialValues = {
    amount: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Use values.amount directly
    addActivity({
      type: "Deposit",
      message: `Deposited $${values.amount}`,
      amount: values.amount,
    });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div
      className="card mx-auto"
      style={{ maxWidth: "400px", marginTop: "20px" }}
    >
      <div className="card-body">
        <h5 className="card-title">Deposit</h5>
        <h6>Balance: {formatCurrency(balance)}</h6>
        {showSuccessMessage && (
          <div className="alert alert-success">Deposit successful!</div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Deposit Amount
                </label>
                <Field type="number" name="amount" className="form-control" />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !isValid || !dirty}
              >
                Deposit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Deposit;
