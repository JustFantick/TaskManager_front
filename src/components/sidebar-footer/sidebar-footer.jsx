import React from 'react'

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
	return (
		<div className='sidebar__bottom'>
			<div className='ico-back-Btn' onClick={hideSidebar}></div>
			<div className='edditing-time'>
				Last edit: {props.editingTime}
			</div>
			<div onClick={openPopup} className='delete ico-bin'></div>
		</div>
	)
}
