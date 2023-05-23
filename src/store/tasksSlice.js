import { createSlice } from '@reduxjs/toolkit';

function updateEditTime(state, taskIndex, userId) {
	const lastEdit = new Date().toLocaleString('ru', {
		hour: 'numeric',
		minute: 'numeric',
	});

	fetch(`http://localhost:2210/setLastEdit?userId=${userId}&taskTitle=${state[taskIndex].title}&lastEdit=${lastEdit}`, { method: 'PATCH' });

	state[taskIndex].lastEdit = lastEdit;
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

		taskStatusChange: (state, action) => {
			//Update server`s data
			fetch(`http://localhost:2210/setTaskStatus?userId=${action.payload.userId}&taskTitle=${state[action.payload.taskIndex].title}&newStatus=${!state[action.payload.taskIndex].status}`, { method: 'PATCH' });

			state[action.payload.taskIndex].status = !state[action.payload.taskIndex].status;
			updateEditTime(state, action.payload.taskIndex, action.payload.userId);
		},

		//"action" require String value
		addTask: (state, action) => {
			const editTime = new Date().toLocaleString('ru', {
				hour: 'numeric',
				minute: 'numeric',
			});

			//Update server`s data
			fetch(`http://localhost:2210/addTask?userId=${action.payload.userId}&taskTitle=${action.payload.title}&editTime=${editTime}`, { method: 'POST' });

			state.push(
				{
					title: action.payload.title,
					status: false,
					isImportant: false,
					steps: [],
					note: '',
					lastEdit: editTime,
				}
			);
		},

		removeTask: (state, action) => {
			//Update server`s data
			fetch(`http://localhost:2210/deleteTask?userId=${action.payload.userId}&taskTitle=${state[action.payload.taskIndex].title}`, { method: 'DELETE' });

			state.splice(action.payload.taskIndex, 1);
		},

		taskTitleChange: (state, action) => {
			//Update server`s data
			fetch(`http://localhost:2210/setTaskTitle?userId=${action.payload.userId}&newTaskTitle=${action.payload.newTaskTitle}&oldTaskTitle=${state[action.payload.taskIndex].title}`, { method: 'PATCH' });

			//Update state
			state[action.payload.taskIndex].title = action.payload.newTaskTitle;
			updateEditTime(state, action.payload.taskIndex, action.payload.userId);
		},

		taskStarStatusChange: (state, action) => {
			fetch(`http://localhost:2210/setTaskIsImportant?userId=${action.payload.userId}&taskTitle=${state[action.payload.taskIndex].title}&isImportant=${!state[action.payload.taskIndex].isImportant}`, { method: 'PATCH' });

			state[action.payload.taskIndex].isImportant = !state[action.payload.taskIndex].isImportant;
			updateEditTime(state, action.payload.taskIndex, action.payload.userId);
		},

		saveNote: (state, action) => {
			fetch(`http://localhost:2210/setTaskNote?userId=${action.payload.userId}&taskTitle=${state[action.payload.taskIndex].title}&note=${action.payload.noteText}`, { method: 'PATCH' });

			state[action.payload.taskIndex].note = action.payload.noteText;
			updateEditTime(state, action.payload.taskIndex, action.payload.userId);
		},

		addStep: (state, action) => {
			fetch(`http://localhost:2210/addStep?userId=${action.payload.userId}&taskTitle=${state[action.payload.taskIndex].title}&stepTitle=${action.payload.newStepTitle}`, { method: 'POST' });

			state[action.payload.taskIndex].steps.push(
				{
					status: false,
					title: action.payload.newStepTitle,
				}
			);
			updateEditTime(state, action.payload.taskIndex, action.payload.userId);
		},

		stepStatusChange: (state, action) => {
			const [userId, taskTitle, stepTitle, stepStatus] = [
				action.payload.userId,
				state[action.payload.taskIndex].title,
				state[action.payload.taskIndex].steps[action.payload.stepIndex].title,
				Number(!state[action.payload.taskIndex].steps[action.payload.stepIndex].status),
			]


			fetch(`http://localhost:2210/setStepStatus?userId=${userId}&taskTitle=${taskTitle}&stepTitle=${stepTitle}&stepStatus=${stepStatus}`, { method: 'PATCH' });

			state[action.payload.taskIndex].steps[action.payload.stepIndex].status = !state[action.payload.taskIndex].steps[action.payload.stepIndex].status;

			updateEditTime(state, action.payload.taskIndex, action.payload.userId);
		},

		stepTitleChange: (state, action) => {
			const [userId, taskTitle, oldStepTitle, newStepTitle] = [
				action.payload.userId,
				state[action.payload.taskIndex].title,
				state[action.payload.taskIndex].steps[action.payload.stepIndex].title,
				action.payload.newStepTitle,
			]

			fetch(`http://localhost:2210/setStepTitle?userId=${userId}&taskTitle=${taskTitle}&oldStepTitle=${oldStepTitle}&newStepTitle=${newStepTitle}`, { method: 'PATCH' });

			state[action.payload.taskIndex].steps[action.payload.stepIndex].title = newStepTitle;
			updateEditTime(state, action.payload.taskIndex, userId);
		},

		removeStep: (state, action) => {
			fetch(`http://localhost:2210/deleteStep?userId=${action.payload.userId}&taskTitle=${state[action.payload.taskIndex].title}&stepTitle=${state[action.payload.taskIndex].steps[action.payload.stepIndex].title}`, { method: 'DELETE' });

			state[action.payload.taskIndex].steps.splice(action.payload.stepIndex, 1);
			updateEditTime(state, action.payload.taskIndex, action.payload.userId);
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