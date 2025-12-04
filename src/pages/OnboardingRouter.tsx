import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Button, Typography } from '@mui/material';
import Profile from '../components/Profile';
import Songs from '../components/Songs';
import Payment from '../components/Payment';
import Success from '../components/Success';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setStep } from '../store/onboardingSlice';

const OnboardingRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const step = useAppSelector((s) => s.onboarding.step);
  const completed = useAppSelector((s) => s.onboarding.completed);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (completed) navigate('/home');
  }, [completed, navigate]);

  const goPrev = () => {
    if (step > 1) dispatch(setStep(step - 1));
  };
  const goNext = () => {
    if (step < 4) dispatch(setStep(step + 1));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Onboarding — Step {step}</Typography>
        <Box mt={2}>
          {step === 1 && <Profile onNext={goNext} />}
          {step === 2 && <Songs onNext={goNext} />}
          {step === 3 && <Payment onNext={goNext} />}
          {step === 4 && <Success />}
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button disabled={step === 1} onClick={goPrev}>
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OnboardingRouter;
