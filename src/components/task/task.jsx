import React from 'react'
import Status from '../status/status.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { taskStatusChange, taskStarStatusChange } from '../../store/tasksSlice.js';
import { setTaskIndex } from '../../store/taskIndexSlice.js';

function Task(props) {
	function chooseTask(e) {
		let targetParent = e.target.closest('.task');

		if (!e.target.closest('.status') && !e.target.closest('.task__star') && !targetParent.classList.contains('active')) {
			dispatch(setTaskIndex(props.index));
			//props.setTaskIndex(targetParent.getAttribute('index'));

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

	const dispatch = useDispatch();
	const taskStatus = useSelector((state) => state.tasks[props.index].status);
	const taskImportance = useSelector((state) => state.tasks[props.index].isImportant);
	const taskTitle = useSelector((state) => state.tasks[props.index].title);

	return (
		<div className='task' onClick={chooseTask} index={props.index}>
			<Status pc={25} mb={20} status={taskStatus}
				statusChangeHandler={() => dispatch(taskStatusChange(props.index))} />

			<div className={taskStatus ? "task__title done" : "task__title"}> {taskTitle} </div>

			<div
				onClick={() => dispatch(taskStarStatusChange(props.index))}
				className={
					taskImportance ? "task__star ico-star active" : "task__star ico-star"
				}
			>

			</div>
		</div>
	)
}

export default Task;