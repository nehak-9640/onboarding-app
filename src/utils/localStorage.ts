import type { OnboardingState } from '../store/onboardingSlice';

const KEY = 'onboarding_state_v1';

export function loadState(): OnboardingState | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as OnboardingState;
  } catch (e) {
    console.error('Failed to load state', e);
    return undefined;
  }
}

export function saveState(state: OnboardingState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state', e);
  }
}
