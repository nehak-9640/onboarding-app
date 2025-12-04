import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState, saveState } from '../utils/localStorage';

export type Profile = {
  name: string;
  age: number | '';
  email: string;
  picture?: string;
};
export type Payment = { cardNumber: string; expiry: string; cvv: string };

export type OnboardingState = {
  step: number;
  completed: boolean;
  profile: Profile;
  songs: string[];
  payment: Payment;
};

const persisted = loadState();

const initialState: OnboardingState = persisted || {
  step: 1,
  completed: false,
  profile: { name: '', age: '', email: '', picture: '' },
  songs: [''],
  payment: { cardNumber: '', expiry: '', cvv: '' },
};

const slice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
      saveState(state);
    },
    updateProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
      saveState(state);
    },
    updateSongs(state, action: PayloadAction<string[]>) {
      state.songs = action.payload;
      saveState(state);
    },
    updatePayment(state, action: PayloadAction<Payment>) {
      state.payment = action.payload;
      saveState(state);
    },
    completeOnboarding(state) {
      state.completed = true;
      state.step = 4;
      saveState(state);
    },
    resetOnboarding(state) {
      state.step = 1;
      state.completed = false;
      state.profile = { name: '', age: '', email: '', picture: '' };
      state.songs = [''];
      state.payment = { cardNumber: '', expiry: '', cvv: '' };
      saveState(state);
    },
  },
});

export const {
  setStep,
  updateProfile,
  updateSongs,
  updatePayment,
  completeOnboarding,
  resetOnboarding,
} = slice.actions;
export default slice.reducer;
