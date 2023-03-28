import React, { useEffect, useState } from 'react';
import SidebarHeader from '../sidebar-header/sidebar-header.jsx';
import Notes from '../notes/notes.jsx';

export default function Sidebar(props) {
	const [isPc, setIsPc] = useState(true);

	function openPopup() {
		document.querySelector('.popup').classList.add('active');
		if (isPc) {
			window.addEventListener("keyup", (e) => {
				if (e.keyCode == 27) document.querySelector('.popup').classList.remove('active');
			}, { once: true });
		}
	}

	function hideSidebar() {
		document.querySelector('.wrapper').classList.remove('active');
		document.querySelectorAll('.task').forEach((task) => {
			task.classList.remove('active');
		});
	}

	useEffect(() => {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
			.test(navigator.userAgent)) {
			setIsPc(false);

			document.querySelector('.sidebar').addEventListener('touchstart', handleTouchStart);
			document.querySelector('.sidebar').addEventListener('touchmove', handleTouchMove);

			let x1, y1;
			function handleTouchStart(e) {
				const firstTouch = e.touches[0];
				x1 = firstTouch.clientX;
				y1 = firstTouch.clientY;
			}

			function handleTouchMove(e) {
				let x2 = e.touches[0].clientX,
					y2 = e.touches[0].clientY,
					xDiff = x2 - x1,
					yDiff = y2 - y1;

				if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) {
					document.querySelector('.wrapper').classList.remove('active');
					document.querySelectorAll('.task').forEach((task) => {
						task.classList.remove('active');
					});
				}
			}
		}
	}, [])

	return (
		<aside className="sidebar">
			<div className='sidebar__header'>
				<SidebarHeader
					tasksList={props.tasksList}
					currentTask={props.currentTask}
					addStep={props.addStep}
					deleteStep={props.deleteStep}
					onTitleChange={props.onTitleChange}
					onStepChange={props.onStepChange}

					taskStatusChangeHandler={props.taskStatusChangeHandler}
					stepStatusChangeHandler={props.stepStatusChangeHandler}
				/>

				<Notes
					saveNote={props.saveNote}
					noteText={
						props.tasksList[props.currentTask] ?
							props.tasksList[props.currentTask].note : ''
					}
				/>

			</div>

			<div className='sidebar__bottom'>
				<div className='ico-back-Btn' onClick={hideSidebar}></div>
				<div className='edditing-time'>
					Last edit: {
						props.tasksList[props.currentTask] ?
							props.tasksList[props.currentTask].lastEdit : ''
					}
				</div>
				<div onClick={openPopup} className='delete ico-bin'></div>
			</div>

		</aside>
	)
}
