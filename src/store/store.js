import { configureStore } from "@reduxjs/toolkit";

import taskIndexReducer from './taskIndexSlice.js'
import tasksReducer from "./tasksSlice.js";
import authorizationStatusReducer from "./authorizationStatus.js";
import userDataReducer from "./userDataSlice.js";

export default configureStore({
	reducer: {
		authorizationStatus: authorizationStatusReducer,
		userData: userDataReducer,
		tasks: tasksReducer,
		taskIndex: taskIndexReducer,
	},
})