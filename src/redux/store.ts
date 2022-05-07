import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from './reducers/app'
import { userReducer } from './reducers/user'
// ...

export const store = configureStore({
  reducer: {
     app: appReducer,
     user: userReducer
  },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
