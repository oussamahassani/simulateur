import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function AddNewUser(props) {
  const history = useHistory();

  const [state, setState] = useState({
    email: '',
    password: '',
    name: '',
    lastname: '',
    error: '',
    loading: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ff")
    console.log(state)
    // Basic form validation
    const { email, password, lastname, name } = state;
    if (!email || !password || !lastname || !name) {
      setState({ ...state, error: 'Please fill in both fields' });
      return;
    }

    try {
      // Send a POST request to the backend API
      const response = await axios.post('/api/user/registeruser', {
        email: state.email,
        password: state.password,
        name: state.name,
        lastname: state.lastname,
        role: "user"
      });

      // Handle success response from backend (e.g., store token or redirect)
      if (response) {
        const responsesendmail = await axios.post('/api/user/sendemail', {
          email: state.email,
          message: "votre mot de passe est " + state.password,
          name: state.name,
          prenom: state.lastname,
          subject: "invitation au systeme de simulation"
        });

        // Redirect to another page if needed
        history.push('/dashboard');
      }
    } catch (err) {
      // Handle error response
      console.error('Login failed', err);
      setState({ ...state, error: 'Login failed, please try again', loading: false });
    }
  }
  return (
    <div className="col-md-9 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Add New User</h4>

          {/* Display error if there is one */}
          {state.error && <p className="text-danger">{state.error}</p>}

          {/* Form */}
          <form className="forms-sample" onSubmit={handleSubmit}>
            {/* Email Input */}
            <Form.Group className="row">
              <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <Form.Control
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
              </div>
            </Form.Group>

            {/* Name Input */}
            <Form.Group className="row">
              <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
              <div className="col-sm-9">
                <Form.Control
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                />
              </div>
            </Form.Group>

            {/* Last Name Input */}
            <Form.Group className="row">
              <label htmlFor="lastname" className="col-sm-3 col-form-label">Last Name</label>
              <div className="col-sm-9">
                <Form.Control
                  type="text"
                  name="lastname"
                  value={state.lastname}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                />
              </div>
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="row">
              <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-9">
                <Form.Control
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
              </div>
            </Form.Group>

            {/* Submit and Reset buttons */}
            <Button type="submit" className="btn btn-gradient-primary mr-2">
              Submit
            </Button>
            <Button type="reset" className="btn btn-light">
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

