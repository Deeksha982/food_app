import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; 

const SignupForm = ({ switchToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };


  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          mobileNumber,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error signing up');
      }

      const data = await response.json();
      console.log('Signup successful', data);
      navigate('/login')
    } catch (error) {
      setError('Error signing up. Please try again.');
      console.error('Signup error', error);
    }
  };

  return (
    <div className="signup-main-container">
      <div className='signup-container-one'>
      </div>
      <div className='signup-container'>
        <form onSubmit={handleFormSubmit} className="signup-form">
          <h2>Registration Form</h2>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              placeholder='Enter your First Name'
              required
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              placeholder='Enter your Last Name'
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              id="mobileNumber"
              placeholder='Enter your Mobile Number'
              required
              value={mobileNumber}
              onChange={handleMobileNumberChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder='Enter your Email'
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder='Enter your Password'
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <button type="submit">Register</button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <p>
            Already have an account?{' '}
            <Link to="/login" onClick={switchToLogin}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
