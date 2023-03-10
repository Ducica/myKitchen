import { createSlice } from "@reduxjs/toolkit";
export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}
const initialState: CounterState = {
  value: 0,
  status: 'idle',
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      console.log('increment')
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`

  },})
