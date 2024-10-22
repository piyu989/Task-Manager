import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const EnterEmail = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
      console.log("workingg")
      onEmailSubmit(email); // This is where the error occurs
      console.log("workingg........")
    } catch (error) {
      setError('OTP Sended......');
    }
  };

  return (
    <div>
      <h2>Enter your Email</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" fullWidth>
          Send OTP
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EnterEmail;
