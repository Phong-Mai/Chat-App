import { createSlice } from "@reduxjs/toolkit";
import { getLocalUser, removeLocalUser, setLocalUser } from '../services/localstorage';

const initialState = {
    loading: false,
    user: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        getUser: (state) => {
            state.user = JSON.parse(getLocalUser("user"));
        },
        removeUser: (state) => {
            state.user = removeLocalUser("user")
        },
        login: (state, action) => {
            state.user = action.payload.user;
            setLocalUser(state.user);
            state.loading = false
        },
        setLoading:(state,action) => {
            state.loading = action.payload.loading
        }
    }
})

export const { setLoading,getUser, removeUser, login} = userSlice.actions

export const selectLoading = (state) => state.user.loading;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;