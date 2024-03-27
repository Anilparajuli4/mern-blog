import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentuser:null,
    error:null,
    loading:false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) =>{
            state.currentuser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInfalse:(state, action)=>{
            state.loading = false,
            state.error = action.payload
        },
        updateStart:(state, ) =>{
            state.loading = true;
            state.error = null;
        },
        updateSucess:(state, action) =>{
            state.currentuser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure:(state, action) =>{
            state.loading = false,
            state.error = action.payload
        },
        signOutSuccess: (state, action) => {
            state.currentuser = null;
            state.error = null;
            state.loading = false
        },

    }
})

export const {signInStart, signInSuccess, signInfalse, updateStart, updateSucess, updateFailure, signOutSuccess} = userSlice.actions
export default userSlice.reducer