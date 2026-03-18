import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  color: {
    textColor: '#ffffff',
    btnBg: '#7B6AA8',
  }
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColor: (state, action) =>{
      state.color = action.payload;

      const {textColor, btnBg} = action.payload;
      document.documentElement.style.setProperty('--text-light', textColor);
      document.documentElement.style.setProperty('--btn-primary', btnBg);
    }
  }
})

export const {setColor} = themeSlice.actions;
export default themeSlice.reducer;