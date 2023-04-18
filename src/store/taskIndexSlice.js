import { createSlice } from '@reduxjs/toolkit';

export const taskIndexSlice = createSlice({
	name: 'taskIndex',
	initialState: {
		value: 0,
	},
	reducers: {
		setTaskIndex: (state, newIndex) => {
			state.value = newIndex.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setTaskIndex } = taskIndexSlice.actions;

export default taskIndexSlice.reducer;