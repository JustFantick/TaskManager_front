import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: [
		{
			title: 'Test task',
			taskStatus: false,
			isImportant: true,
			steps: [{ stepDone: false, title: '1' }, { stepDone: false, title: '2' }],
			note: 'note_1',
			lastEdit: new Date().toLocaleString('ru', {
				hour: 'numeric',
				minute: 'numeric',
			}),
		},
		{
			title: 'Second test task',
			taskStatus: false,
			isImportant: false,
			steps: [],
			note: 'note_2',
			lastEdit: new Date().toLocaleString('ru', {
				hour: 'numeric',
				minute: 'numeric',
			}),
		}
	],
	reducers: {
		taskStatusChange: (state, taskIndex) => {
			state[taskIndex].taskStatus = !state[taskIndex].taskStatus;
		},

		addTask: (state, newTaskTitle) => {
			state.push(
				{
					title: newTaskTitle,
					taskStatusDone: false,
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

		taskTitleChange: (state, newTaskTitle, taskIndex) => {
			state[taskIndex].title = newTaskTitle;
		},

		taskStarStatusChange: (state, taskIndex) => {
			state[taskIndex].isImportant = !state[taskIndex].isImportant;
		},

		saveNote: (state, noteText, taskIndex) => {
			state[taskIndex].note = noteText;
		},

		addStep: (state, newStepTitle, taskIndex) => {
			state[taskIndex].steps.push(
				{
					stepDone: false,
					title: newStepTitle,
				}
			)
		},

		stepStatusChange: (state, stepIndex, taskIndex) => {
			state[taskIndex].steps[stepIndex] = !state[taskIndex].steps[stepIndex];
		},

		stepTitleChange: (state, newStepTitle, stepIndex, taskIndex) => {
			state[taskIndex].steps[stepIndex] = newStepTitle;
		},

		removeStep: (state, stepIndex, taskIndex) => {
			state[taskIndex].steps.splice(stepIndex, 1);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
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