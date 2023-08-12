import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setNonAuthorized, setUserName, setUserId } from '../../store/authorizationDataSlice.js';

import { CSSTransition } from 'react-transition-group';

export default function Header() {
	const dispatch = useDispatch();

	const userName = useSelector((state) => state.authorizationData.userName);

	const logOutBtn = useRef(null);

	function logOutClickHandler() {
		dispatch(setNonAuthorized());
		dispatch(setUserName(''));
		dispatch(setUserId(null));

		//clean LocalStorage variable needed for saving user's acound data
		localStorage.removeItem('authorizationData');
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
				<div className="log-out-btn" ref={logOutBtn} onClick={logOutClickHandler}>Log out</div>
			</header>
		</CSSTransition>
	)
}
