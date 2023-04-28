import { configureStore } from "@reduxjs/toolkit";
import taskIndexReducer from './taskIndexSlice.js'
import tasksReducer from "./tasksSlice.js";
import authorizationStatusReducer from "./authorizationStatus.js";

export default configureStore({
	reducer: {
		authorizationStatus: authorizationStatusReducer,
		tasks: tasksReducer,
		taskIndex: taskIndexReducer,
	},
})