import { configureStore, Reducer, UnknownAction } from "@reduxjs/toolkit";
import initialState from "./reducers/index";
import menuReducer from "./reducers/menuReducer";
import themeReducer from "./reducers/themeReducer";
import latestNewsReducer from "./reducers/latestNewsReducer";
const store = configureStore({
    reducer: {
        menu: menuReducer as Reducer<any, UnknownAction>,
        theme: themeReducer as Reducer<any, UnknownAction>,
        latestNews: latestNewsReducer as Reducer<any, UnknownAction>,
    },
    preloadedState: initialState,
});

export default store;