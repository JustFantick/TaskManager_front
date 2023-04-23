import React, { useEffect } from 'react';
import Task from '../task/task.jsx';

import { useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function TaskContainer() {
	useEffect(() => {
		let headerHeight = document.querySelector('.header').offsetHeight;

		var taskContainerBody = document.querySelector('.tasks-container__body');
		taskContainerBody.style.paddingTop = headerHeight + 'px';
	}, []);

	const header = document.querySelector('.header');
	const main = document.querySelector('.main');
	const taskContainerBody = document.querySelector('.tasks-container__body');

	function scrollHandler() {
		if (taskContainerBody.scrollTop > main.clientTop) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	}

	const tasksfromState = useSelector((state) => state.tasks);

	const [listRef] = useAutoAnimate();//auto-animate adding/removing tasks

	return (
		<div className="tasks-container">
			<div className='tasks-container__body' onScroll={scrollHandler} ref={listRef}>
				{
					tasksfromState.map((task, index) => (
						<Task key={index} index={index} />
					))
				}
			</div>
		</div>
	)
}
