import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user.provider'
import settingReducer from './user/setting.provide'
import loadingReducer from './loading.provider'
import commentsReducer from './comments.provider'
//! Логика для кеширования всего через локал сторедж combineReducer..

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    themeStore : settingReducer,
    loadingStore: loadingReducer,
    commentsStore: commentsReducer,
  },
})