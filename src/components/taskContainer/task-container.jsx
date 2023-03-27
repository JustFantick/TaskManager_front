import React, { useEffect } from 'react';
import Task from '../task/task.jsx';

export default function TaskContainer(props) {
	function scrollHandler() {
		let header = document.querySelector('.header');
		let main = document.querySelector('.main');

		if (taskContainerBody.scrollTop > main.clientTop) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	}

	useEffect(() => {
		let headerHeight = document.querySelector('.header').offsetHeight;

		var taskContainerBody = document.querySelector('.tasks-container__body');
		taskContainerBody.style.paddingTop = headerHeight + 'px';
	}, []);

	return (
		<div className="tasks-container">
			<div
				className='tasks-container__body'
				onScroll={scrollHandler}
			>
				{
					props.tasks.map((task, index) => (
						<Task key={index} index={index} title={task.title} chooseTask={props.chooseTask}
							isImportant={task.isImportant}
							starStatusChange={props.starStatusChange}
							taskStatusChangeHandler={props.taskStatusChangeHandler}
							taskStatus={props.tasks[index].taskStatusDone} />
					))
				}
			</div>
		</div>
	)
}
