import {configureStore} from "@reduxjs/toolkit";

import resumeReducer from "./slices/ResumeSlice";
import experienceReducer from "./slices/experienceSlice";

export const store = configureStore({
    reducer: {
        resumes:
            resumeReducer,
        experience:
            experienceReducer
    }
});