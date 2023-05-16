import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { refreshTasks } from '../../store/tasksSlice.js';

import { CSSTransition } from 'react-transition-group';

export default function Header() {
	const dispatch = useDispatch();

	const userName = useSelector((state) => state.userData.userName);

	const iconRefresh = useRef(null);

	function interactRefreshButton() {
		iconRefresh.current.classList.add('active');

		setTimeout(function () {
			dispatch(refreshTasks());
			iconRefresh.current.classList.remove('active');
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
					<h1>Hello, {userName}!</h1>
					<p>{new Date().toLocaleString('en-EU', options)}</p>
				</div>
				<div className="ico-refresh" ref={iconRefresh} onClick={interactRefreshButton}></div>
			</header>
		</CSSTransition>
	)
}
