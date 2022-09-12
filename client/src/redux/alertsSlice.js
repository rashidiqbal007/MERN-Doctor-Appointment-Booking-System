// we need not to call the reducer we have to create slice and export reducer from that slice
import {createSlice} from '@reduxjs/toolkit';
export const alertsSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        }
    }
    });

    export const { showLoading, hideLoading } = alertsSlice.actions;
    // initially loader is set to false when show loading is called it loads