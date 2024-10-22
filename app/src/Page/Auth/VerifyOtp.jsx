import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const VerifyOtp = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending OTP Verification with: ", { email, otp });

    try {
      const response = await fetch(`http://localhost:8081/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      const data = await response.json();
      console.log('OTP verification success:', data);

      // Call the onSuccess function to inform the parent component
      onSuccess(); 
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <Button type="submit" fullWidth>
          Verify OTP
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyOtp;
