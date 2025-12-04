import React, { useState } from 'react';
import { Box, Button, TextField, Avatar, Grid } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateProfile, setStep } from '../store/onboardingSlice';

const Profile: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const profile = useAppSelector((s) => s.onboarding.profile);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState<number | ''>(profile.age as number | '');
  const [email, setEmail] = useState(profile.email);
  const [picture, setPicture] = useState(profile.picture || '');

  const submit = () => {
    dispatch(updateProfile({ name, age, email, picture }));
    dispatch(setStep(2));
    onNext();
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPicture(String(reader.result));
    reader.readAsDataURL(f);
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar src={picture} sx={{ width: 72, height: 72 }} />
        </Grid>
        <Grid item xs>
          <Button variant="outlined" component="label">
            Upload Picture
            <input hidden accept="image/*" type="file" onChange={onFile} />
          </Button>
        </Grid>
      </Grid>

      <Box mt={2}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Age"
          value={age}
          onChange={(e) =>
            setAge(e.target.value === '' ? '' : Number(e.target.value))
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
      </Box>

      <Box mt={2}>
        <Button variant="contained" onClick={submit}>
          Save & Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
