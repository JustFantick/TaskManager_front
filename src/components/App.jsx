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
			stepsNote: '',
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
			stepsNote: '',
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
				stepsNote: '',
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
				stepsNote: '',
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
			if (index === i) {
				return {
					...task,
					taskStatusDone: !taskStatusDone,
				}
			}

			return task;
		}));

		updateEditingTime();
	}

	//shit here!!!
	function stepStatusChangeHandler(e) {
		let index = e.target.closest('.step').getAttribute('index');

		setTasks(tasks.map((task, i) => {
			if (index === i) {
				return {
					...obj,
					taskStatusDone: !taskStatusDone,
				}
			}

			return obj;
		}));

		//old statusChange()
		//let prevStatus = temp[this.state.taskIndex].steps[index].stepDone;
		//temp[this.state.taskIndex].steps[index].stepDone = !prevStatus;
		//this.setState({ tasks: temp });

		updateEditingTime();
	}

	function updateEditingTime() {
		setTasks(tasks.map((task, i) => {
			if (taskIndex === i) {
				return {
					...obj,
					lastEdit: new Date().toLocaleString('ru', {
						hour: 'numeric',
						minute: 'numeric',
					}),
				}
			}
			return obj;
		}));
	}

	//shit here!!!
	function addStep(e) {
		if (e.which === 13 && document.querySelector('.add-step__title').value !== '') {
			// let temp = this.state.tasks;
			// let newSteps = this.state.tasks[this.state.taskIndex].steps;

			// newSteps.push({
			// 	stepDone: false,
			// 	title: document.querySelector('.add-step__title').value
			// });
			// temp[this.state.taskIndex].steps = newSteps;

			//this.setState({ tasks: temp });
			//setTasks([...tasks]);

			updateEditingTime();
			document.querySelector('.add-step__title').value = '';
		}
	}

	//shit here!!!
	function deleteStep(e) {
		if (e.target.classList.contains('delete-step')) {
			// let temp = this.state.tasks;

			// let newSteps = this.state.tasks[this.state.taskIndex].steps;
			// let index = e.target.closest('.step').getAttribute('index');

			// newSteps.splice(index, 1);

			// temp[this.state.taskIndex].steps = newSteps;

			// this.setState({ tasks: temp });
			setTasks(tasks.map((task, i) => {
				if (index === i) {
					return obj;
				}

				return obj;
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
					stepsNote: '',
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
			if (taskIndex === i) {
				return {
					...obj,
					title: e.target.textContent,
				}
			}

			return obj;
		}));

		updateEditingTime();
	}

	//shit here!!!
	function onTaskStepChange(e) {
		// let temp = this.state.tasks;
		// let currentStepIndex = e.target.closest('.step').getAttribute('index');
		// temp[this.state.taskIndex].steps[currentStepIndex].title = e.target.textContent;
		// this.setState({ tasks: temp });
		// this.updateEditingTime();
	}

	//shit here!!!
	function chooseTask(e) {
		let targetParent = e.target.closest('.task');

		if (!e.target.closest('.status') && !e.target.closest('.task__star') && !targetParent.classList.contains('active')) {
			//let targetIndex = targetParent.getAttribute('index');

			//this.setState({ taskIndex: targetIndex })

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

	function removeTask() {
		document.querySelector('.wrapper').classList.remove('active');
		document.querySelector('.popup').classList.remove('active');
		document.querySelectorAll('.task').forEach((task) => {
			task.classList.remove('active');
		});

		setTasks(tasks.filter((_, i) => i === taskIndex));
	}

	function saveNote(e) {
		setTasks(tasks.map((task, i) => {
			if (taskIndex === i) {
				return {
					...task,
					stepsNote: e.target.textContent,
				}
			}
			return task;
		}));

		updateEditingTime();
	}

	function starStatusChange(index) {
		setTasks(tasks.map((task, i) => {
			if (index === i) {
				return {
					...task,
					isImportant: !isImportant,
				}
			}
			return task;
		}));

		updateEditingTime();
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
				onTaskStepChange={onTaskStepChange}

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
