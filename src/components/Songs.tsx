import React from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { FieldArray, Formik, Form, Field } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateSongs, setStep } from '../store/onboardingSlice';

const Songs: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const songs = useAppSelector((s) => s.onboarding.songs);
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ songs }}
      onSubmit={(values) => {
        dispatch(updateSongs(values.songs.filter(Boolean)));
        dispatch(setStep(3));
        onNext();
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="songs">
            {(arrayHelpers) => (
              <Box>
                {values.songs && values.songs.length > 0 ? (
                  values.songs.map((_: any, index: number) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      gap={1}
                      mt={1}
                    >
                      <Field
                        name={`songs.${index}`}
                        as={TextField}
                        label={`Song ${index + 1}`}
                        fullWidth
                      />
                      <IconButton
                        onClick={() => arrayHelpers.remove(index)}
                        size="small"
                        aria-label="remove"
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  ))
                ) : (
                  <Button onClick={() => arrayHelpers.push('')}>
                    Add a song
                  </Button>
                )}

                <Box mt={2} display="flex" gap={1}>
                  <Button
                    type="button"
                    startIcon={<AddIcon />}
                    onClick={() => arrayHelpers.push('')}
                  >
                    Add another
                  </Button>
                  <Button type="submit" variant="contained">
                    Save & Continue
                  </Button>
                </Box>
              </Box>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default Songs;
