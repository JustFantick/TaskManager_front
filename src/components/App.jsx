import React, { useState } from 'react';
import background from "../img/bg1.webp"
import Main from "./main/main.jsx";
import Sidebar from "./sidebar/sidebar.jsx";
import DeleteTaskPopup from './popup/popup.jsx';

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

	function chooseTask(e) {
		let targetParent = e.target.closest('.task');

		if (!e.target.closest('.status') && !e.target.closest('.task__star') && !targetParent.classList.contains('active')) {
			setTaskIndex(targetParent.getAttribute('index'))

			document.querySelectorAll('.task').forEach((task) => {
				task.classList.remove('active');
			});

			targetParent.classList.toggle('active');
			document.querySelector('.wrapper').classList.add('active');

			document.querySelector('.main').addEventListener('click', function (e) {
				if (!e.target.closest('.task')) {
					document.querySelector('.wrapper').classList.remove('active');
					document.querySelectorAll('.task').forEach((task) => {
						task.classList.remove('active');
					});
					document.querySelector('.main').removeEventListener('click', function (e) { })
				}
			});
		} else if (targetParent.classList.contains('active')) {
			document.querySelector('.wrapper').classList.remove('active');
			document.querySelectorAll('.task').forEach((task) => {
				task.classList.remove('active');
			});
		}
	}

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

	function addStep(e) {
		if (e.which === 13 && document.querySelector('.add-step__title').value !== '') {
			setTasks(tasks.map((task, i) => {
				if (i == taskIndex) {
					task.steps = [
						...task.steps,
						{
							stepDone: false,
							title: document.querySelector('.add-step__title').value
						}
					]
				}
				return task;
			}));

			updateEditingTime();
			document.querySelector('.add-step__title').value = '';
		}
	}

	function onStepChange(e) {
		setTasks(tasks.map((task, i) => {
			if (i == taskIndex) {
				task.steps = task.steps.map((step, i) => {
					if (i == e.target.closest('.step').getAttribute('index')) {
						step.title = e.target.textContent;
					}
					return step;
				});
			}
			return task;
		}));

		updateEditingTime();
	}

	function deleteStep(e) {
		if (e.target.classList.contains('delete-step')) {
			setTasks(tasks.map((task, i) => {
				if (i == taskIndex) {
					task.steps = task.steps.filter((_, i) => i != e.target.closest('.step').getAttribute('index'));
				}
				return task;
			}));

			updateEditingTime();
		}
	}

	function addTask() {
		if (document.querySelector('.add-task__title').value !== '') {
			setTasks([
				...tasks,
				{
					title: document.querySelector('.add-task__title').value,
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

			document.querySelector('.add-task__title').value = '';
		}
	}

	function onTaskTitleChange(e) {
		setTasks(tasks.map((task, i) => {
			if (taskIndex == i) {
				task.title = e.target.textContent;
			}
			return task;
		}));

		updateEditingTime();
	}

	function removeTask() {
		document.querySelector('.wrapper').classList.remove('active');
		document.querySelector('.popup').classList.remove('active');
		document.querySelectorAll('.task').forEach((task) => {
			task.classList.remove('active');
		});

		setTasks(tasks.filter((_, i) => i != taskIndex));
	}

	function saveNote(e) {
		setTasks(tasks.map((task, i) => {
			if (taskIndex == i) {
				task.note = e.target.textContent;
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
			if (taskIndex === i) {
				return {
					...task,
					lastEdit: new Date().toLocaleString('ru', {
						hour: 'numeric',
						minute: 'numeric',
					}),
				}
			}
			return task;
		}));
	}

	return (
		<div className="wrapper" style={{ backgroundImage: `url(${background})` }}>
			<Main tasksList={tasks}
				addTask={addTask}
				chooseTask={chooseTask}
				taskStatusChangeHandler={taskStatusChangeHandler}
				refreshTasks={refreshTasks}
				starStatusChange={starStatusChange}
			/>

			<Sidebar
				tasksList={tasks}
				currentTask={taskIndex}
				onTitleChange={onTaskTitleChange}
				onStepChange={onStepChange}

				taskStatusChangeHandler={taskStatusChangeHandler}

				addStep={addStep}
				deleteStep={deleteStep}
				stepStatusChangeHandler={stepStatusChangeHandler}

				saveNote={saveNote}
			/>

			<DeleteTaskPopup
				tasksList={tasks}
				currentTask={taskIndex}
				removeTask={removeTask}
			/>
		</div>)
}
