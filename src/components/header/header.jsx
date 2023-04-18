import React from 'react';

import { useDispatch } from 'react-redux';
import { refreshTasks } from '../../store/tasksSlice.js';


export default function Header() {
	const dispatch = useDispatch();

	function interactRefreshButton() {
		let button = document.querySelector('.ico-refresh');
		button.classList.add('active');

		setTimeout(function () {
			dispatch(refreshTasks());
			button.classList.remove('active');
		}, 700);
	}

	let options = {
		month: 'long',
		day: 'numeric',
		weekday: 'short',
	};

	return (
		<header className="header">
			<div className="header__title">
				<h1>Your`s day</h1>
				<p>{new Date().toLocaleString('en-EU', options)}</p>
			</div>
			<div className="ico-refresh" onClick={interactRefreshButton}>
			</div>
		</header>
	)
}
