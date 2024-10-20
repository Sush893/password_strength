import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; // Ensure you import the CSS file

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('weak');
    } else if (password.length < 8) {
      setPasswordStrength('moderate');
    } else if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) {
      setPasswordStrength('strong');
    } else {
      setPasswordStrength('very-strong');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert('Sign Up successful! Please log in.');
        navigate('/login');
      } else {
        const result = await res.json();
        alert(result.message);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
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
              checkPasswordStrength(e.target.value);
            }}
            required
          />
          <p className={`password-strength ${passwordStrength}`}>
            Password Strength: <strong>{passwordStrength.replace("-", " ")}</strong>
          </p>
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
