
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import initializeAuthentication from './firebase/firebase.initialize';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  const auth = getAuth();
  const [isLogIn, setIsLogIn] = useState('Sign Up');
  const [userData, setUserData] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleEmail = e => {
    setUserEmail(e.target.value);
  }
  const handlePassword = e => {
    setUserPassword(e.target.value);
    console.log(e.target.value);
  }

  const handleCheckbox = e => {
    setIsLogIn(e.target.checked ? 'Login' : 'Sign Up');
  }
  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUserData(user);
      })
  }
  const handleSignUpLogin = e => {
    e.preventDefault();
    isLogIn === 'Sign Up' ?
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then(result => {
          console.log(result.user);
        })
        .catch(error => {
          console.log(error.message);
        })
      :
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then(result => {
          setUserData(result.user);
          console.log(result.user);
        })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
      })
  }
  return (
    <div className="mx-5 my-5">
      {!userData.email ? <div>
        <h1>{isLogIn}</h1>
        <br />
        {/* ---------form----------- */}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group onClick={handleCheckbox} className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Already have an account? Click to Login" />
          </Form.Group>

          <Button onClick={handleSignUpLogin} variant="primary" type="submit">
            {isLogIn}
          </Button>
        </Form>
        {/* ---------form----------- */}
        <br />
        <h3 className='text-center'>{isLogIn} with</h3>
        <hr />
        <div className='d-flex justify-content-center'>
          <Button onClick={handleGoogle} className='m-3'><h3><FontAwesomeIcon icon={faGoogle} /></h3></Button>
          <Button className='m-3'><h3><FontAwesomeIcon icon={faTwitter} /></h3></Button>
        </div>

      </div>

        :
        <div>
          <h2>Welcome {userData.displayName}</h2>
          <p>Your e-mail is: {userData.email}</p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>}

    </div>

  );
}

export default App;
