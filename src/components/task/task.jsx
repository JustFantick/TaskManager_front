import React from 'react'
import Status from '../status/status.jsx';

function Task(props) {
	let starChange = (e) => e.target.classList.toggle('active');

	return (
		<div className='task' onClick={props.chooseTask} index={props.index}>
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