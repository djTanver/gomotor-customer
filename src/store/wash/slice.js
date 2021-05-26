import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    past_wash:[],
    active_wash:{},
    is_wash_active:false,
};

const washSlice = createSlice({
    name:"wash",
    initialState:initialState,
    reducers:{
        setActiveWash: (state,action) =>{
            state.is_wash_active = true;
            state.active_wash = action.payload;
        },
        clearActiveWash: (state,action) =>{
            state.active_wash = {};
            state.is_wash_active = false;
            state.past_wash = [action.payload].concat(state.past_wash);
        },
    },
});

export default washSlice;