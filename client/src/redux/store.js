import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertsSlice } from "./alertsSlice";
import { userSlice } from "./userSlice";
// combine & call all reducers here
// slicing all reducers into separate files and calling them here in rootReducer

const rootReducer = combineReducers({
    alerts: alertsSlice.reducer,
    user: userSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;