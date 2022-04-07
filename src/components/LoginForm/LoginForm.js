import Button from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './LoginForm.css';
import { MdOutlineMail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup } from "firebase/auth";
import app from '../../firebase.init';
import { GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const provider = new GoogleAuthProvider();

  //handleGoogle
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
    .then(res => {
      const user = res.user;
      console.log(user);
    })
    .catch(error => {
      console.error('error', error);
    })
  }

// handle email
  const handleEmail = e => {
    setEmail(e.target.value);
  } 

  // handle Pass
  const handlePass = e => {
    setPass(e.target.value);
  }

  // handle submit 
  const handleSubmit = () => {
    console.log(email, pass);
  }



  return (
    <div className="form-container">
      <div className="form-content position-relative">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control  onBlur={handleEmail} type="email" placeholder="Enter email" />
            <Form.Text className="text-light">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePass} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Already a member?" />
          </Form.Group>

          <Button onClick={handleSubmit} className="btn-style" variant="primary" type="submit">
            Login
          </Button>
          <p className="text-center py-3">Or Sign in With</p>
          <div className="social-platform d-flex justify-content-around">
            <button className="email fs-5">
              <MdOutlineMail className="fs-3 mail" /> Email
            </button>
            <button onClick={handleGoogle} className="google fs-5">
              <FcGoogle className="fs-3" /> Google
            </button>
            <div className="sign-up position-absolute bottom-0 text-center">
              <p>
                Not a member? <a href="#">Sign Up</a>{' '}
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
