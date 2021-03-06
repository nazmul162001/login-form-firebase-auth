import Button from 'react-bootstrap/Form';
import Form from 'react-bootstrap/Form';
import './LoginForm.css';
import { MdOutlineMail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import app from '../../firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false)
  const [name, setName] = useState('')

  const handleName = event => {
    setName(event.target.value)
  }

  //handle google
  const handleGoogle = (event) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error('error', error);
      });
    event.preventDefault();
  };

  //handle form submit // Registration
  const handleFormSubmit = (event) => {
    // console.log(email, password);
    if(registered){
      signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user);
      })
      .catch(error => {
        console.error('error', error);
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setEmail('')
        setPassword('')
        verifyEmail();
        setUserName();
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  // update profile / setUserName()
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() => {
      console.log('updating your name');
    })
  }
  // verify email
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('email verification sent');
    })
  }

  // handle forget password 
  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('reset email sent');
    })
    .catch(error => {
      console.error('error', error)
    })
  }

  // handle email
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  //handle password
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };


// handle registered 
const handleRegistered = event => {
  setRegistered(event.target.checked);
}

  return (
    <div className="form-container">
      <div className="form-content position-relative">
        <Form>
          {/* Register  */}
          { !registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              onBlur={handleName}
              type="email"
              placeholder="Enter Your Name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Provide your name.
            </Form.Control.Feedback>
          </Form.Group>}

          {/* login */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmail}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-light">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please enter your correct email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePassword}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegistered} type="checkbox" label="Already a member?" />
          </Form.Group>

          <Button
            onClick={handleFormSubmit}
            className="btn-style"
            variant="primary"
            type="submit"
          >
            {registered ? 'Login' : 'Register'}
          </Button>
          <p className='text-center py-3'><a onClick={handleForgetPassword} href="#">Forget password</a></p>
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
