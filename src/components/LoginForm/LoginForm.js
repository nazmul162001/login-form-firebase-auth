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
  // const [user, setUser] = useState('')

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


  return (
    <div className="form-container">
      <div className="form-content position-relative">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-light">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button className="btn-style" variant="primary" type="submit">
            Submit
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
