import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice.js'
import tasksReducer from "./tasksSlice.js";

export default configureStore({
	reducer: {
		counter: counterReducer,
		tasks: tasksReducer,
	},
})