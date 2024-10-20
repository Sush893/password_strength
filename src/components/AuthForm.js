// src/components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import PasswordValidator from 'password-validator';

const schema = new PasswordValidator();
schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const validatePasswordStrength = (pwd) => {
    const passwordQuality = schema.validate(pwd, { details: true });

    if (!passwordQuality.length) {
      setPasswordStrength('Excellent');
    } else if (passwordQuality.length <= 1) {
      setPasswordStrength('Strong');
    } else if (passwordQuality.length <= 2) {
      setPasswordStrength('Very Good');
    } else {
      setPasswordStrength('Good');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/${isSignUp ? 'signup' : 'login'}`, {
        email,
        password
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePasswordStrength(e.target.value);
            }}
            required
          />
          <p>Password Strength: {passwordStrength}</p>
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
      </button>
    </div>
  );
};

export default AuthForm;
