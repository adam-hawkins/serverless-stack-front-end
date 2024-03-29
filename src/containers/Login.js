import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import { useFormFields } from "../libs/hooksLib";
import './Login.css';

export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
        await Auth.signIn(fields.email, fields.password);
        props.userHasAuthenticated(true);
        props.history.push('/');
    } catch (e) {
        alert(e.message);
        setIsLoading(false);
    }

  }

  return (
    <div className='Login'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <label>Email</label>
          <Form.Control
            autoFocus
            type='email'
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <label>Password</label>
          <Form.Control
            value={fields.password}
            onChange={handleFieldChange}
            type='password'
          />
        </Form.Group>
          <LoaderButton block type='submit' isLoading={isLoading} disabled={!validateForm()}>
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}
