import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isGetUser : false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.value = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer;