
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

function App() {
  return (
    <div className="mx-5">
      {/* ---------form----------- */}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      {/* ---------form----------- */}
      <br />
      <h3 className='text-center'>Sign Up with</h3>
      <hr />
      <div className='d-flex justify-content-center'>
        <Button className='m-3'><h3><FontAwesomeIcon icon={faGoogle} /></h3></Button>
        <Button className='m-3'><h3><FontAwesomeIcon icon={faTwitter} /></h3></Button>
      </div>


    </div>

  );
}

export default App;
