import React from 'react'
import Status from '../status/status.jsx';

function Task(props) {
	function chooseTask(e) {
		let targetParent = e.target.closest('.task');

		if (!e.target.closest('.status') && !e.target.closest('.task__star') && !targetParent.classList.contains('active')) {
			props.setTaskIndex(targetParent.getAttribute('index'));

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

	return (
		<div className='task' onClick={chooseTask} index={props.index}>
			<Status pc={25} mb={20} status={props.taskStatus}
				statusChangeHandler={props.taskStatusChangeHandler} />

			<div className={props.taskStatus ? "task__title done" : "task__title"}> {props.title} </div>

			<div
				onClick={() => props.starStatusChange(props.index)}
				className={
					props.isImportant
						? "task__star ico-star active"
						: "task__star ico-star"
				}
			>

			</div>
		</div>
	)
}

export default Task;