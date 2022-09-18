// we need not to call the reducer we have to create slice and export reducer from that slice
import {createSlice} from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state,action) => {
            state.user = action.payload;
        }
    }
    });

    export const { setUser } = userSlice.actions;

    // main use is in the protected route, where after we get success data of user from backend from api call,
    // we then dispatch the user to the redux store of user
