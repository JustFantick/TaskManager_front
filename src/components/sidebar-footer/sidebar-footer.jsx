import React, { useContext } from 'react';

import { TasksContext } from '../App.jsx';
import { TaskIndexContext } from '../App.jsx';

export default function SidebarFooter(props) {
	function openPopup() {
		document.querySelector('.popup').classList.add('active');
		if (props.isPc) {
			window.addEventListener("keyup", (e) => {
				if (e.code === 'Escape') document.querySelector('.popup').classList.remove('active');
			}, { once: true });
		}
	}

	function hideSidebar() {
		document.querySelector('.wrapper').classList.remove('active');
		document.querySelectorAll('.task').forEach((task) => {
			task.classList.remove('active');
		});
	}

	const tasksFromContext = useContext(TasksContext);
	const taskIndexFromContext = useContext(TaskIndexContext);

	return (
		<div className='sidebar__bottom'>
			<div className='ico-back-Btn' onClick={hideSidebar}></div>
			<div className='edditing-time'>
				Last edit: {
					tasksFromContext[taskIndexFromContext] ?
						tasksFromContext[taskIndexFromContext].lastEdit : ''
				}
			</div>
			<div onClick={openPopup} className='delete ico-bin'></div>
		</div>
	)
}
