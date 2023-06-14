import React, { useEffect, useRef, useState } from 'react';
import Button from '../button/button.jsx';
import arrow from '../../img/side-arrow.svg';
import Preloader from '../preloader/preloader.jsx';

import { useDispatch } from 'react-redux';
import { setAuthorized } from '../../store/authorizationDataSlice.js';
import { setUserId, setUserName } from '../../store/authorizationDataSlice.js';
import { setTasks } from '../../store/tasksSlice.js';
import { CSSTransition } from 'react-transition-group';

export default function Authorization() {
	const dispatch = useDispatch();

	async function downloadUserData(userId) {
		const requestJSON = await fetch(`http://localhost:2210/getTasks?userId=${userId}`, { method: 'GET' });
		const result = await requestJSON.json();
		dispatch(setTasks(result));
	}

	const [authorizationInAnim, setAuthorizationInAnim] = useState(false);
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		setAuthorizationInAnim(true);
	}, []);

	const [emailValidStatus, setEmailValidStatus] = useState('');
	const [passwordValidStatus, setPasswordValidStatus] = useState('');

	const [emailLabelText, setEmailLabeltext] = useState('Enter your login');
	const [passwordLabelText, setPasswordLabeltext] = useState('Enter your password');

	const [loginlInput, passwordInput, loginlLabel, passwordLabel] = [
		useRef(null), useRef(null), useRef(null), useRef(null),
	];

	function validateLogin(currentInputValue) {
		if (currentInputValue === '') {
			setEmailLabeltext('Enter your login');
			setEmailValidStatus('non-valid');
		} else if (/\s/.test(currentInputValue)) {
			setEmailLabeltext('Input shouldn`t got any white spaces');
			setEmailValidStatus('non-valid');
		} else if (/^\d+$/.test(currentInputValue)) {
			setEmailLabeltext('Login shouldn`t consist only of digits');
			setEmailValidStatus('non-valid');
		} else {
			setEmailLabeltext('Login validated');
			setEmailValidStatus('valid');
		}
	}

	function validatePassword(currentInputValue) {
		if (currentInputValue === '') {
			setPasswordLabeltext('Enter your password');
			setPasswordValidStatus('non-valid');
		} else if (currentInputValue.length < 4) {
			setPasswordLabeltext('Password must be at least 4 symbols long');
			setPasswordValidStatus('non-valid');
		} else {
			setPasswordLabeltext('Password validated');
			setPasswordValidStatus('valid');
		}
	}

	async function authorizeClickHandler() {
		if (emailValidStatus === 'valid' && passwordValidStatus === 'valid') {
			setShowLoader(true);

			const response = await fetch(`http://localhost:2210/authorizeTry?login=${loginlInput.current.value}&password=${passwordInput.current.value}`, { method: 'GET' });
			const data = await response.json();

			if (data.status === 0) {
				switch (data.errorType) {
					case 'user not found':
						setEmailLabeltext('User doesn`t exist');
						break;
					case 'invalid password':
						setPasswordLabeltext('Invalid password');
						break;
				}
			} else if (data.status === 1) {
				//500ms for close-anim of this component
				setTimeout(() => dispatch(setAuthorized()), 500);
				setAuthorizationInAnim(false);

				dispatch(setUserName(data.userLogin));
				dispatch(setUserId(data.userId));

				downloadUserData(data.userId);
			} else {
				console.log("Unexpected error");
			}

			setShowLoader(false);

		} else {
			validateLogin(loginlInput.current.value);
			validatePassword(passwordInput.current.value);
		}
	}

	async function registerClickHandler() {
		if (emailValidStatus === 'valid' && passwordValidStatus === 'valid') {
			setShowLoader(true);

			const response = await fetch(`http://localhost:2210/registerNewUser?login=${loginlInput.current.value}&password=${passwordInput.current.value}`, { method: 'POST' });
			const data = await response.json();

			if (data.status === 0) {
				setEmailLabeltext('User already exist');
			} else if (data.status === 1) {
				//500ms for close-anim of this component
				setTimeout(() => dispatch(setAuthorized()), 500);
				setAuthorizationInAnim(false);

				dispatch(setUserName(data.userLogin));
				dispatch(setUserId(data.userId));

				downloadUserData(data.userId);
			} else {
				console.log("Unexpected error");
			}

			setShowLoader(false);

		} else {
			validateLogin(loginlInput.current.value);
			validatePassword(passwordInput.current.value);
		}
	}

	return (
		<React.Fragment>
			<CSSTransition
				in={authorizationInAnim}
				timeout={500}
				classNames='authorization'
				mountOnEnter unmountOnExit
			>
				<div className='authorization'>
					<div className="authorization__body">
						<div className="authorization__title">Authorization</div>
						<div className="authorization__line"></div>


						<div className="authorization__inputs">
							<div className="input-group">
								<label htmlFor='email-input' ref={loginlLabel} className="input-group__label">{emailLabelText}</label>
								<input placeholder='email@gmail.com' type='email'
									ref={loginlInput}
									onBlur={(e) => validateLogin(e.target.value)}
									id='email-input' className={`input-group__input ${emailValidStatus}`} />
							</div>

							<div className="input-group">
								<label htmlFor='password-input' ref={passwordLabel} className="input-group__label">{passwordLabelText}</label>
								<input type='password' placeholder='_____'
									ref={passwordInput}
									onBlur={(e) => validatePassword(e.target.value)}
									id='password-input' className={`input-group__input ${passwordValidStatus}`} />
							</div>

						</div>

						<div className="authorization__buttons">
							<Button onClickHandler={registerClickHandler}>
								Register & log in
							</Button>

							<Button onClickHandler={authorizeClickHandler}>
								Authorize <img src={arrow} alt="arrow" />
							</Button>

						</div>

					</div>

				</div>
			</CSSTransition>

			<Preloader inAnim={showLoader} />
		</React.Fragment>
	)
}
