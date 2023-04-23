import React, { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { refreshTasks } from '../../store/tasksSlice.js';

import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';

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

	const [animStart, setAnimStart] = useState(false);
	const nodeRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			setAnimStart(!animStart);
		}, 500);
	}, []);

	const options = {
		month: 'long',
		day: 'numeric',
		weekday: 'short',
	};

	return (
		<CSSTransition ref={nodeRef} in={animStart} timeout={700} classNames={'header'}>
			<header className="header">
				<div className="header__title">
					<h1>Your`s day</h1>
					<p>{new Date().toLocaleString('en-EU', options)}</p>
				</div>
				<div className="ico-refresh" onClick={interactRefreshButton}></div>
			</header>
		</CSSTransition>
	)
}
