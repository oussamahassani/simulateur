import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';

export class Login extends Component {
  // Define state to store form data and response
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  // Handle changes to the form fields
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: 'Please fill in both fields' });
      return;
    }

    this.setState({ loading: true, error: '' });

    try {
      // Send a POST request to the backend API
      const response = await axios.post('/api/user/loginuser', {
        email: this.state.email,
        password: this.state.password,
      });

      // Handle success response from backend (e.g., store token or redirect)
      console.log('Response from backend:', response.data);

      // Optionally, you can handle response and redirect after successful login
      // For example, storing user data in localStorage or a global state (like Redux)
      localStorage.setItem('userToken', response.data.jwt);
      this.setState({ loading: false });

      // Redirect to another page if needed
      this.props.history.push('/dashboard');
    } catch (err) {
      // Handle error response
      console.error('Login failed', err);
      this.setState({ error: 'Login failed, please try again', loading: false });
    }
  };
  render() {
    const { email, password, error, loading } = this.state;

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control name="email" type="email" placeholder="Username" size="lg" className="h-auto" value={email}
                      onChange={this.handleChange} required />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control name="password" type="password" placeholder="Password" size="lg" className="h-auto" value={password}
                      onChange={this.handleChange} required />
                  </Form.Group>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={this.handleSubmit}>            {loading ? 'Logging in...' : 'SIGN IN'}
                    </button>

                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                  </div>

                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/register" className="text-primary">Create</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
