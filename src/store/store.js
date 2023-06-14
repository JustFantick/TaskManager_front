import { configureStore } from "@reduxjs/toolkit";

import taskIndexReducer from './taskIndexSlice.js'
import tasksReducer from "./tasksSlice.js";
import authorizationDataReducer from "./authorizationDataSlice.js";

export default configureStore({
	reducer: {
		authorizationData: authorizationDataReducer,
		tasks: tasksReducer,
		taskIndex: taskIndexReducer,
	},
})