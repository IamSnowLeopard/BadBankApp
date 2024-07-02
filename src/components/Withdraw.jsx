import React, { useState } from "react";
import { useUserActivities } from "./UserActivitiesContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Withdrawal = () => {
  const { addActivity, balance } = useUserActivities();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showOverdraftMessage, setShowOverdraftMessage] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError("Please enter a valid number")
      .positive("Amount must be positive")
      .required("Please enter an amount")
      .max(balance, "Insufficient funds for this withdrawal"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const withdrawalAmount = parseFloat(values.amount);
    if (balance >= withdrawalAmount) {
      addActivity({
        type: "withdraw",
        message: `Withdrew $${values.amount}`,
        amount: values.amount,
      });
      setShowSuccessMessage(true);
      setShowOverdraftMessage(false);
    } else {
      setShowOverdraftMessage(true);
    }
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowOverdraftMessage(false);
    }, 3000); // Hide messages after 3 seconds

    setSubmitting(false);
    resetForm();
  };

  return (
    <div
      className="card mx-auto"
      style={{ maxWidth: "400px", marginTop: "20px" }}
    >
      <div className="card-body">
        <h5 className="card-title">Withdrawal</h5>
        <h6>Balance: {formatCurrency(balance)}</h6>
        {showSuccessMessage && (
          <div className="alert alert-success">Withdrawal successful!</div>
        )}
        {showOverdraftMessage && (
          <div className="alert alert-danger">
            Insufficient funds for this withdrawal.
          </div>
        )}
        <Formik
          initialValues={{ amount: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Withdrawal Amount
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
                className="btn withdraw-btn-primary"
                disabled={isSubmitting || !isValid || !dirty}
              >
                Withdraw
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Withdrawal;
