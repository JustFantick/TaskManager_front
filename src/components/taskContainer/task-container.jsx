import React, { useEffect } from 'react';
import Task from '../task/task.jsx';

import { useSelector } from 'react-redux';

export default function TaskContainer() {
	useEffect(() => {
		let headerHeight = document.querySelector('.header').offsetHeight;

		var taskContainerBody = document.querySelector('.tasks-container__body');
		taskContainerBody.style.paddingTop = headerHeight + 'px';
	}, []);

	function scrollHandler() {
		let header = document.querySelector('.header');
		let main = document.querySelector('.main');

		if (taskContainerBody.scrollTop > main.clientTop) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	}

	const tasksfromState = useSelector((state) => state.tasks);

	return (
		<div className="tasks-container">
			<div
				className='tasks-container__body'
				onScroll={scrollHandler}
			>
				{
					tasksfromState.map((task, index) => (
						<Task key={index} index={index} />
					))
				}
			</div>
		</div>
	)
}
