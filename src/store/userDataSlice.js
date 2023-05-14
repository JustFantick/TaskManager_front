import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
	name: 'userData',
	initialState: {
		userName: '',
		userId: null,
	},
	reducers: {
		setUserName: (state, name) => {
			state.userName = name.payload;
		},
		setUserId: (state, id) => {
			state.userId = id.payload;
		}
	},
});

// Action creators are generated for each case reducer function
export const { setUserName, setUserId } = userDataSlice.actions;

export default userDataSlice.reducer;