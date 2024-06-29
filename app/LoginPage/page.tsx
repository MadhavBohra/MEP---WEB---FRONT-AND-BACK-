'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import './LoginForm.css';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.status === 200) {
        console.log('Login successful:', response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
        alert('Wrong email or password');
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
    setFormValid(value !== '' && password !== '');
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setFormValid(username !== '' && value !== '');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <img src='/logo.png' alt="Logo" className="logo" />
        <h2>Log In</h2>
        <h4>Don't have an account? <Link href="/Sign-Up"><span className="Sign-Up">Sign Up</span></Link></h4>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Link href="/forgot-password"><span className="forgot-password">Forgot Password?</span></Link>
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
      <img src='/GreenBGRight.png' alt="Side" className='right-img' />
    </div>
  );
};

export default LoginForm;
