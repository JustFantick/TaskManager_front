import { createSlice } from '@reduxjs/toolkit';

export const authorizationStatusSlice = createSlice({
	name: 'authorizationStatus',
	initialState: {
		status: 'non-authorized',
	},
	reducers: {
		setAuthorized: (state) => {
			state.status = 'authorized';
		},
		setNonAuthorized: (state) => {
			state.status = 'non-authorized';
		}
	},
});

// Action creators are generated for each case reducer function
export const { setAuthorized, setNonAuthorized } = authorizationStatusSlice.actions;

export default authorizationStatusSlice.reducer;