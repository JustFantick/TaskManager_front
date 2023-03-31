import React, { useState } from 'react';
import background from "../img/bg1.webp"
import Main from "./main/main.jsx";
import Sidebar from "./sidebar/sidebar.jsx";
import DeleteTaskPopup from './popup/popup.jsx';

export const TasksContext = React.createContext({});
export const TaskIndexContext = React.createContext(0);

export default function App() {
	const [tasks, setTasks] = useState([
		{
			title: 'Test task',
			taskStatusDone: false,
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
			taskStatusDone: false,
			isImportant: false,
			steps: [],
			note: 'note_2',
			lastEdit: new Date().toLocaleString('ru', {
				hour: 'numeric',
				minute: 'numeric',
			}),
		}
	]);
	const [taskIndex, setTaskIndex] = useState(0);

	function refreshTasks() {
		setTasks([
			{
				title: 'Test task',
				taskStatusDone: false,
				isImportant: false,
				steps: [{ stepDone: false, title: '1' }, { stepDone: false, title: '2' }],
				note: '',
				lastEdit: new Date().toLocaleString('ru', {
					hour: 'numeric',
					minute: 'numeric',
				}),
			},
			{
				title: 'Second test task',
				taskStatusDone: false,
				isImportant: false,
				steps: [],
				note: '',
				lastEdit: new Date().toLocaleString('ru', {
					hour: 'numeric',
					minute: 'numeric',
				}),
			}
		]);
	}

	function taskStatusChangeHandler(e) {
		let index = e.target.closest('.task') ?
			e.target.closest('.task').getAttribute('index') : taskIndex;

		setTasks(tasks.map((task, i) => {
			if (index == i) {
				task.taskStatusDone = !task.taskStatusDone;
			}
			return task;
		}));

		updateEditingTime();
	}

	function stepStatusChangeHandler(e) {
		setTasks(tasks.map((task, i) => {
			if (i == taskIndex) {
				task.steps = task.steps.map((step, i) => {
					if (i == e.target.closest('.step').getAttribute('index')) {
						step.stepDone = !step.stepDone;
					}
					return step;
				});
			}
			return task;
		}));

		updateEditingTime();
	}

	function addStep(newStepTitle) {
		setTasks(tasks.map((task, i) => {
			if (i == taskIndex) {
				task.steps = [
					...task.steps,
					{
						stepDone: false,
						title: newStepTitle
					}
				]
			}
			return task;
		}));

		updateEditingTime();
	}

	function onStepChange(stepIndex, newText) {
		setTasks(tasks.map((task, i) => {
			if (i == taskIndex) {
				task.steps = task.steps.map((step, i) => {
					if (i == stepIndex) {
						step.title = newText;
					}
					return step;
				});
			}
			return task;
		}));

		updateEditingTime();
	}

	function deleteStep(stepIndex) {
		setTasks(tasks.map((task, i) => {
			if (i == taskIndex) {
				task.steps = task.steps.filter((_, i) => i != stepIndex);
			}
			return task;
		}));

		updateEditingTime();
	}

	function addTask(newTaskTitle) {
		setTasks([
			...tasks,
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
		]);
	}

	function onTaskTitleChange(newTaskTitle) {
		setTasks(tasks.map((task, i) => {
			if (taskIndex == i) {
				task.title = newTaskTitle;
			}
			return task;
		}));

		updateEditingTime();
	}

	function removeTask() {
		setTasks(tasks.filter((_, i) => i != taskIndex));
	}

	function saveNote(noteText) {
		setTasks(tasks.map((task, i) => {
			if (taskIndex == i) {
				task.note = noteText;
			}
			return task;
		}));

		updateEditingTime();
	}

	function starStatusChange(index) {
		setTasks(
			tasks.map((task, i) => {
				if (index === i) {
					task.isImportant = !task.isImportant;
				}
				return task;
			})
		);

		updateEditingTime();
	}

	function updateEditingTime() {
		setTasks(tasks.map((task, i) => {
			if (taskIndex == i) {
				task.lastEdit = new Date().toLocaleString('ru', {
					hour: 'numeric',
					minute: 'numeric',
				});
			}
			return task;
		}));
	}

	return (
		<div className="wrapper" style={{ backgroundImage: `url(${background})` }}>
			<TasksContext.Provider value={tasks}>
				<Main
					addTask={addTask}
					setTaskIndex={setTaskIndex}
					taskStatusChangeHandler={taskStatusChangeHandler}
					refreshTasks={refreshTasks}
					starStatusChange={starStatusChange}
				/>

				<TaskIndexContext.Provider value={taskIndex}>
					<Sidebar
						onTaskTitleChange={onTaskTitleChange}
						onStepChange={onStepChange}

						taskStatusChangeHandler={taskStatusChangeHandler}

						addStep={addStep}
						deleteStep={deleteStep}
						stepStatusChangeHandler={stepStatusChangeHandler}

						saveNote={saveNote}
					/>

					<DeleteTaskPopup removeTask={removeTask} />

				</TaskIndexContext.Provider>
			</TasksContext.Provider>
		</div>
	)
}
