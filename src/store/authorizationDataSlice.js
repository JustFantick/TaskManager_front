import { createSlice } from '@reduxjs/toolkit';

export const authorizationDataSlice = createSlice({
	name: 'authorizationData',
	initialState: {
		status: 'non-authorized',
		userName: '',
		userId: null,
	},
	reducers: {
		setAuthorized: (state) => {
			state.status = 'authorized';
		},
		setNonAuthorized: (state) => {
			state.status = 'non-authorized';
		},
		setUserName: (state, name) => {
			state.userName = name.payload;
		},
		setUserId: (state, id) => {
			state.userId = id.payload;
		}
	},
});

// Action creators are generated for each case reducer function
export const { setAuthorized, setNonAuthorized, setUserName, setUserId } = authorizationDataSlice.actions;

export default authorizationDataSlice.reducer;