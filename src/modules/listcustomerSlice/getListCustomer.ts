import { createSlice } from "@reduxjs/toolkit";

interface customerType {
    customers: any
    page: number
    totalpage: any
    results: any
    res: any
    isLoading: boolean
    isSuccess: boolean
}
const initialState: customerType = {
    customers: [],
    page: 1,
    totalpage: null,
    results: [],
    res: '',
    isLoading: false,
    isSuccess: false
}

const getCustomerSlice = createSlice({
    name: 'getCustomer',
    initialState,
    reducers: {
        // getListCustomerStart: (state, action) =>{
        //     state.isLoading = action.payload
        // },
        getListcustomer: (state, action) => {
            state.customers = action.payload.data
            state.isSuccess = true
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        gettotalPage: (state, action) => {
            state.totalpage = action.payload
        },
        getResult: (state, action) => {
            state.results = action.payload
        },
        getRes: (state, action) => {
            state.res = action.payload
        },
   


    }
})

export const { getListcustomer, setPage, gettotalPage, getRes,  } = getCustomerSlice.actions
export default getCustomerSlice.reducer