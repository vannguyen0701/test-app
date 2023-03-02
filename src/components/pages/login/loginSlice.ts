import { createSlice } from "@reduxjs/toolkit";

interface loginType{
    login: any
    isLogged: any
}
const initialState:loginType = {
    login: [],
    isLogged: false
}
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers:{
        login : (state,action) =>{
            state.login = action.payload
        },
        setLogin: (state,action)=>{
            state.isLogged = action .payload
        }

    }
})

export const {login, setLogin} = loginSlice.actions 
export default loginSlice.reducer