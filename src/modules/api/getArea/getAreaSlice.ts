import { createSlice } from "@reduxjs/toolkit";

interface nationsType {
    nations: any
    provinces: any
    districts: any
    wards: any
}

const initialState: nationsType = {
    nations: [], 
    provinces: [],
    districts: [],
    wards: []
}
const getAreaSlice = createSlice({
    name: 'Area',
    initialState,
    reducers: {
        getNations: (state, action) => {
            state.nations = action.payload
        },
        getProvinces: (state, action) => {
            state.provinces = action.payload
        },
        getDistricts: (state, action) => {
            state.districts = action.payload
        },
        getWards: (state, action) => {
            state.wards = action.payload
        },

    }
})

export const { getNations, getProvinces, getDistricts,getWards } = getAreaSlice.actions
export default getAreaSlice.reducer