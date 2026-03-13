import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  textColor: '#ffffff',
  btnBg: '#7B6AA8',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorText: (state, action) => {
      state.textColor = action.payload
    },
    setColorBtnBg: (state, action) => {
      state.btnBg = action.payload
    },
    
  },
})

export const { setColorText,setColorBtnBg} = themeSlice.actions;
export default themeSlice.reducer;