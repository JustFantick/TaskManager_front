import React, { useEffect, useState } from 'react';
import SidebarHeader from '../sidebar-header/sidebar-header.jsx';
import Notes from '../notes/notes.jsx';
import SidebarFooter from '../sidebar-footer/sidebar-footer.jsx';
import DeleteTaskPopup from '../popup/popup.jsx';

export default function Sidebar(props) {
	const [isPc, setIsPc] = useState(true);
	const [popupOpen, setPopupOpen] = useState(false);


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
				<SidebarHeader />

				<Notes />

			</div>

			<SidebarFooter isPc={isPc} activatePopup={() => setPopupOpen(true)} />

			<DeleteTaskPopup popupOpen={popupOpen} disactivatePopup={() => setPopupOpen(false)} />
		</aside>
	)
}
