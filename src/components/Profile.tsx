import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Avatar, Grid } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateProfile, setStep } from '../store/onboardingSlice';

const Profile: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const profile = useAppSelector((s) => s.onboarding.profile);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(profile.name || '');
  const [age, setAge] = useState<number | ''>(profile.age || '');
  const [email, setEmail] = useState(profile.email || '');
  const [picture, setPicture] = useState(profile.picture || '');

  const [touched, setTouched] = useState({
    name: false,
    age: false,
    email: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    email: '',
  });

  // -------- VALIDATION --------
  const validate = () => {
    const newErrors = { name: '', age: '', email: '' };

    // Name must be at least 3 characters
    if (name && name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Age must be between 18 and 100
    if (age !== '' && (Number(age) < 18 || Number(age) > 100)) {
      newErrors.age = 'Age must be between 18 and 100';
    }

    // Email must be valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    validate();
  }, [name, age, email]);

  const isFormValid =
    name &&
    age &&
    email &&
    !errors.name &&
    !errors.age &&
    !errors.email;

  const submit = () => {
    if (!isFormValid) return;

    dispatch(updateProfile({ name, age, email, picture }));
    dispatch(setStep(2));
    onNext();
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPicture(String(reader.result));
    reader.readAsDataURL(file);
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

      {/* Name */}
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => setTouched({ ...touched, name: true })}
        margin="normal"
        error={touched.name && !!errors.name}
        helperText={touched.name ? errors.name : ''}
      />

      {/* Age */}
      <TextField
        fullWidth
        label="Age"
        value={age}
        onChange={(e) =>
          setAge(e.target.value === '' ? '' : Number(e.target.value))
        }
        onBlur={() => setTouched({ ...touched, age: true })}
        margin="normal"
        error={touched.age && !!errors.age}
        helperText={touched.age ? errors.age : ''}
      />

      {/* Email */}
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched({ ...touched, email: true })}
        margin="normal"
        error={touched.email && !!errors.email}
        helperText={touched.email ? errors.email : ''}
      />

      <Box mt={2}>
        <Button variant="contained" onClick={submit} disabled={!isFormValid}>
          Save & Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
