import React, { useState, useEffect } from 'react';
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

  const [cardNumber, setCardNumber] = useState(payment.cardNumber || '');
  const [expiry, setExpiry] = useState(payment.expiry || '');
  const [cvv, setCvv] = useState(payment.cvv || '');

  // Track if user touched a field
  const [touched, setTouched] = useState({
    cardNumber: false,
    expiry: false,
    cvv: false,
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // ---------- VALIDATION ----------
  const validate = () => {
    const newErrors = { cardNumber: '', expiry: '', cvv: '' };

    // Card number validation (16 digits)
    if (cardNumber && !/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    // Expiry MM/YY validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (expiry && !expiryRegex.test(expiry)) {
      newErrors.expiry = 'Expiry must be MM/YY';
    } else if (expiryRegex.test(expiry)) {
      const [month, year] = expiry.split('/').map(Number);
      const now = new Date();
      const expiryDate = new Date(2000 + year, month - 1);

      if (expiryDate < now) {
        newErrors.expiry = 'Expiry date must be in the future';
      }
    }

    // CVV validation (3 digits)
    if (cvv && !/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    validate();
  }, [cardNumber, expiry, cvv]);

  const isFormValid =
    cardNumber &&
    expiry &&
    cvv &&
    !errors.cardNumber &&
    !errors.expiry &&
    !errors.cvv;

  const submit = () => {
    if (!isFormValid) return;

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
        onBlur={() => setTouched({ ...touched, cardNumber: true })}
        margin="normal"
        error={touched.cardNumber && !!errors.cardNumber}
        helperText={touched.cardNumber ? errors.cardNumber : ''}
      />

      <TextField
        fullWidth
        label="Expiry (MM/YY)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        onBlur={() => setTouched({ ...touched, expiry: true })}
        margin="normal"
        error={touched.expiry && !!errors.expiry}
        helperText={touched.expiry ? errors.expiry : ''}
      />

      <TextField
        fullWidth
        type="password"
        label="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        onBlur={() => setTouched({ ...touched, cvv: true })}
        margin="normal"
        error={touched.cvv && !!errors.cvv}
        helperText={touched.cvv ? errors.cvv : ''}
      />

      <Box mt={2}>
        <Button variant="contained" onClick={submit} disabled={!isFormValid}>
          Complete Onboarding
        </Button>
      </Box>
    </Box>
  );
};

export default Payment;
