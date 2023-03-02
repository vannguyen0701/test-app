import { configureStore } from '@reduxjs/toolkit';
import getCustomerSlice from  '../modules/listcustomerSlice/getListCustomer'
import getAreaSlice from '../modules/api/getArea/getAreaSlice';
import loginSlice from '../components/pages/login/loginSlice';
export const store = configureStore({
    reducer:{
        login: loginSlice,
        customers: getCustomerSlice ,
        area: getAreaSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>
// // Infeirred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch