import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';
import { resetOnboarding } from '../store/onboardingSlice';

const Home: React.FC = () => {
  const profile = useAppSelector((s) => s.onboarding.profile);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome, {profile.name || 'User'}!</Typography>
      <Typography variant="body1" mt={2}>
        You've completed onboarding.
      </Typography>

      <Box mt={2}>
        <Button variant="outlined" onClick={() => dispatch(resetOnboarding())}>
          Reset Onboarding (for testing)
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
