import React, { useEffect, useState } from 'react';
import Preloader from '../preloader/preloader.jsx';
import LoginForm from '../loginForm/loginForm.jsx';
import RegisterForm from '../registerForm/registerForm.jsx';

import { useDispatch } from 'react-redux';
import { setTasks } from '../../store/tasksSlice.js';
import { CSSTransition } from 'react-transition-group';

import { port } from '../App.jsx';
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Authorization() {
	// const dispatch = useDispatch();

	// async function downloadUserData(userId) {
	// 	const requestJSON = await fetch(`${port}/getTasks?userId=${userId}`, { method: 'GET' });
	// 	const result = await requestJSON.json();
	// 	dispatch(setTasks(result));
	// }

	const [showLoginSection, setShowLoginSection] = useState(true);

	const [authorizationInAnim, setAuthorizationInAnim] = useState(false);
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		setAuthorizationInAnim(true);
	}, []);

	const [listRef] = useAutoAnimate();//auto-animate adding/removing tasks

	return (
		<React.Fragment>
			<CSSTransition
				in={authorizationInAnim}
				timeout={500}
				classNames='authorization'
				mountOnEnter unmountOnExit
			>
				<section className='authorization'>
					<div className="authorization__body">
						<div className="authorization__mode-switch authorize-mode-switch">
							<div className={`authorize-mode-switch__log-in ${showLoginSection ? 'selected' : ''}`}
								onClick={() => setShowLoginSection(true)}
							>
								Login
							</div>
							<div className={`authorize-mode-switch__sign-up ${!showLoginSection ? 'selected' : ''}`}
								onClick={() => setShowLoginSection(false)}
							>
								Register
							</div>

						</div>
						<div className="authorization__line"></div>

						<div ref={listRef} className="authorization__form-wrapper">
							{
								showLoginSection ?
									<LoginForm setShowLoader={setShowLoader}
										setAuthorizationInAnim={setAuthorizationInAnim} /> :
									<RegisterForm setShowLoader={setShowLoader}
										setAuthorizationInAnim={setAuthorizationInAnim} />
							}
						</div>

					</div>

				</section>

			</CSSTransition>

			<Preloader inAnim={showLoader} />
		</React.Fragment >
	)
}
