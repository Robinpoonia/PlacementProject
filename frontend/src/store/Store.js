import {configureStore} from "@reduxjs/toolkit";

import resumeReducer from "./slices/ResumeSlice";
import experienceReducer from "./slices/experienceSlice";
import dashboarReducer from "./slices/dashboardSlice"
import userReducer from "./slices/userSlice"
import seniorReducer from "./slices/seniorSlice";
export const store = configureStore({
    reducer: {
        resumes:
            resumeReducer,
        experience:
            experienceReducer,
        dashboard:
            dashboarReducer,
        user:
            userReducer,
        seniors: 
            seniorReducer,
    }
});