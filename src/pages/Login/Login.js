import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
      })
    });

      if (response.ok) {
        navigate('/dashboard')
      }
      else {
        throw new Error('Error signing up');
      }

    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-main-container">
      <div className='login-container-one'>
      </div>
      <div className='login-container'>
      <form onSubmit={handleFormSubmit} className="login-form">
        <h1>Log In</h1><br/>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input placeholder='Enter your Email'
            type="text"
            id="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input placeholder='Enter your Password'
            type="password"
            id="password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </div><br/>
        <div className="form-group">
        <button type="submit">Log In</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
      </div>
    </div>
  );
};

export default LoginForm;
