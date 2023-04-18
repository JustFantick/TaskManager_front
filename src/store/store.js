import { configureStore } from "@reduxjs/toolkit";
import taskIndexReducer from './taskIndexSlice.js'
import tasksReducer from "./tasksSlice.js";

export default configureStore({
	reducer: {
		tasks: tasksReducer,
		taskIndex: taskIndexReducer,
	},
})