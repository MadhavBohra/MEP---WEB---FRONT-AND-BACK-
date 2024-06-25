'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import './LoginForm.css';


// Type for the component state
interface LoginFormState {
  username: string;
  password: string;
  formValid: boolean;
  showPassword: boolean;
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<LoginFormState['username']>('');
  const [password, setPassword] = useState<LoginFormState['password']>('');
  const [formValid, setFormValid] = useState<LoginFormState['formValid']>(false);
  const [showPassword, setShowPassword] = useState<LoginFormState['showPassword']>(false);

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Login clicked');
  };

  // Update state as user types
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
    setFormValid(value !== '' && password !== '');
  };

  // Update state as user types
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setFormValid(username !== '' && value !== '');
  };

  // Toggle show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <img src='/logo.png' alt="Logo" className="logo" />  {/* Use the imported logo image */}
        <h2>Log In</h2>
        <h4>Don't have an account? <a href="/Sign-Up" className="Sign-Up">Sign Up</a></h4>
        <form onSubmit={handleSubmit}>
          <label>Username or Email</label>
          <input
            placeholder='Username'
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label>Password</label>
          <div className="password-input">
            <input
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <img
              src='/eye.png'
              alt={showPassword ? 'Hide' : 'Show'}
              className="eye-icon"
              onClick={toggleShowPassword}
            />
          </div>
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          <button type="submit" className="login-btn" disabled={!formValid}>Login</button>
          <div className="or-separator">
            <span className="line"></span>
            <span className="or-text">OR</span>
            <span className="line"></span>
          </div>
          <button type="button" className="google-btn">
            <FaGoogle className="icon" /> Login with Google
          </button>
          <button type="button" className="facebook-btn">
            <FaFacebook className="icon" /> Login with Facebook
          </button>
        </form>
      </div>
      <div className="image-container">
        <img src='/GreenBGRight.png' alt="Side" />  {/* Use the imported side image */}
      </div>
    </div>
  );
};

export default LoginForm;
