import { createSlice } from '@reduxjs/toolkit';

export const MemberSlice = createSlice({
  name: 'member',
  initialState: {
    value: {}
  },
  reducers: {
    saveToken: (state, action) => {
      state.value = {
        ...action.payload
      }
      console.log('saveToken', state.value);
    },
    clearToken: (state) => {
      state.value = {}
      console.log('clearToken', state.value);
    }
  }
});

export const { saveToken, clearToken } = MemberSlice.actions;
export default MemberSlice.reducer;
