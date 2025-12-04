import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';

const Step4Success: React.FC = () => {
  const profile = useAppSelector((s) => s.onboarding.profile);
  const navigate = useNavigate();

  return (
    <Box textAlign="center">
      <Typography variant="h5" gutterBottom>
        🎉 Onboarding Complete
      </Typography>
      <Typography variant="body1">
        Welcome, {profile.name || 'User'}!
      </Typography>

      <Box mt={2}>
        <Button variant="contained" onClick={() => navigate('/home')}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Step4Success;
