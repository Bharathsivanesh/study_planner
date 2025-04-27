import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import subjectRouter from "./subject-slice";

const store = configureStore({
    reducer : {
        auth : authReducer,
        subject : subjectRouter
    }
})

export default store