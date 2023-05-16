import { createSlice } from '@reduxjs/toolkit';

function updateEditTime(state, taskIndex) {
	state[taskIndex].lastEdit = new Date().toLocaleString('ru', {
		hour: 'numeric',
		minute: 'numeric',
	});
}

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: [],
	reducers: {
		setTasks: (state, tasksArray) => {
			return tasksArray.payload;
		},

		refreshTasks: (state) => {
			return [
				{
					title: 'Test task',
					status: false,
					isImportant: false,
					steps: [{ status: false, title: '1' }, { status: false, title: '2' }],
					note: '',
					lastEdit: new Date().toLocaleString('ru', {
						hour: 'numeric',
						minute: 'numeric',
					}),
				},
				{
					title: 'Second test task',
					status: false,
					isImportant: false,
					steps: [],
					note: '',
					lastEdit: new Date().toLocaleString('ru', {
						hour: 'numeric',
						minute: 'numeric',
					}),
				}
			];
		},

		taskStatusChange: (state, taskIndex) => {
			state[taskIndex.payload].status = !state[taskIndex.payload].status;
			updateEditTime(state, taskIndex.payload);
		},

		//"action" require String value
		addTask: (state, action) => {
			state.push(
				{
					title: action.payload,
					status: false,
					isImportant: false,
					steps: [],
					note: '',
					lastEdit: new Date().toLocaleString('ru', {
						hour: 'numeric',
						minute: 'numeric',
					}),
				}
			);
		},

		removeTask: (state, taskIndex) => {
			state.splice(taskIndex, 1);
		},

		taskTitleChange: (state, action) => {
			state[action.payload.taskIndex].title = action.payload.newTaskTitle;
			updateEditTime(state, action.payload.taskIndex);
		},

		taskStarStatusChange: (state, taskIndex) => {
			state[taskIndex.payload].isImportant = !state[taskIndex.payload].isImportant;
			updateEditTime(state, taskIndex.payload);
		},

		saveNote: (state, action) => {
			state[action.payload.taskIndex].note = action.payload.noteText;
			updateEditTime(state, action.payload.taskIndex);
		},

		addStep: (state, action) => {
			state[action.payload.taskIndex].steps.push(
				{
					status: false,
					title: action.payload.newStepTitle,
				}
			);
			updateEditTime(state, action.payload.taskIndex);
		},

		stepStatusChange: (state, action) => {
			state[action.payload.taskIndex].steps[action.payload.stepIndex].status = !state[action.payload.taskIndex].steps[action.payload.stepIndex].status;

			updateEditTime(state, action.payload.taskIndex);
		},

		stepTitleChange: (state, action) => {
			state[action.payload.taskIndex].steps[action.payload.stepIndex].title = action.payload.newStepTitle;
			updateEditTime(state, action.payload.taskIndex);
		},

		removeStep: (state, action) => {
			state[action.payload.taskIndex].steps.splice(action.payload.stepIndex, 1);
			updateEditTime(state, action.payload.taskIndex);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setTasks,
	refreshTasks,
	taskStatusChange,
	addTask,
	removeTask,
	taskTitleChange,
	taskStarStatusChange,
	saveNote,
	addStep,
	stepStatusChange,
	stepTitleChange,
	removeStep,
} = tasksSlice.actions;

export default tasksSlice.reducer;