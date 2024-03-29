import React, { useState } from "react";
import LoaderButton from "../components/LoaderButton";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useFormFields } from "../libs/hooksLib";
import { Auth } from "aws-amplify";
import "./Signup.css";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
      event.preventDefault();

      setIsLoading(true);

      try {
          const newUser = await Auth.signUp({
              username: fields.email,
              password: fields.password
          });
          setIsLoading(false);
          setNewUser(newUser);
      } catch (e) {
          alert(e.message);
          setIsLoading(false);
      }
  }


  async function handleConfirmationSubmit(event) {
      event.preventDefault();

      setIsLoading(true);

      try {
          await Auth.confirmSignUp(fields.email, fields.confirmationCode);
          await Auth.signIn(fields.email, fields.password);

          props.userHasAuthenticated(true);
          props.history.push("/");
      } catch (e) {
          alert(e.message);
          setIsLoading(false);
      }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" bsSize="large">
          <label>Confirmation Code</label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Alert variant='secondary'>Please check your email for the code.</Alert>
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="email" bsSize="large">
          <label>Email</label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <label>Password</label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" bsSize="large">
          <label>Confirm Password</label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
