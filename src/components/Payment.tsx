import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
  updatePayment,
  setStep,
  completeOnboarding,
} from '../store/onboardingSlice';

const Payment: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const payment = useAppSelector((s) => s.onboarding.payment);
  const dispatch = useAppDispatch();
  const [cardNumber, setCardNumber] = useState(payment.cardNumber);
  const [expiry, setExpiry] = useState(payment.expiry);
  const [cvv, setCvv] = useState(payment.cvv);

  const submit = () => {
    dispatch(updatePayment({ cardNumber, expiry, cvv }));
    dispatch(completeOnboarding());
    dispatch(setStep(4));
    onNext();
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Expiry (MM/YY)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        margin="normal"
      />

      <Box mt={2}>
        <Button variant="contained" onClick={submit}>
          Complete Onboarding
        </Button>
      </Box>
    </Box>
  );
};

export default Payment;
