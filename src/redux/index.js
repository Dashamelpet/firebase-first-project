import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user.provider'
import settingReducer from './user/setting.provide'
//! Логика для кеширования всего через локал сторедж combineReducer..

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    themeStore : settingReducer
  },
})