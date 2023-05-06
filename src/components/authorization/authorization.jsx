import React, { useEffect, useRef, useState } from 'react';
import Button from '../button/button.jsx';
import arrow from '../../img/side-arrow.svg';
import Preloader from '../preloader/preloader.jsx';

import { useDispatch } from 'react-redux';
import { setAuthorized } from '../../store/authorizationStatus.js';
import { CSSTransition } from 'react-transition-group';

export default function Authorization() {
	const dispatch = useDispatch();

	const [authorizationInAnim, setAuthorizationInAnim] = useState(false);
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		setAuthorizationInAnim(true);
	}, []);

	const [emailValidStatus, setEmailValidStatus] = useState('');
	const [passwordValidStatus, setPasswordValidStatus] = useState('');

	const [loginlInput, passwordInput, loginlLabel, passwordLabel] = [
		useRef(null), useRef(null), useRef(null), useRef(null),
	];

	function validateLogin(currentInputValue) {
		if (currentInputValue === '') {
			console.log('empty');
			setEmailValidStatus('non-valid');
		} else if (/\s/.test(currentInputValue)) {
			console.log('input shouldn`t got any white spaces');
			setEmailValidStatus('non-valid');
		} else if (/^\d+$/.test(currentInputValue)) {
			console.log('str contains only numbers');
			setEmailValidStatus('non-valid');
		} else {
			setEmailValidStatus('valid');
			console.log('valid');
		}
	}

	function validatePassword(currentInputValue) {
		if (currentInputValue === '') {
			setPasswordValidStatus('non-valid');
		} else if (currentInputValue.length < 4) {
			setPasswordValidStatus('non-valid');
		} else {
			setPasswordValidStatus('valid');
		}
	}

	async function authorizeClickhandler() {
		if (emailValidStatus === 'valid' && passwordValidStatus === 'valid') {
			setShowLoader(true);

			await fetch(`http://localhost:2210/login?login=${loginlInput.current.value}&password=${passwordInput.current.value}`)
				.then(response => response.json())
				.then(data => {
					if (data.hasOwnProperty('errorMessage')) {
						switch (data.errorMessage) {
							case 'user not found':
								console.log("user is not exist in DataBase");
								break;
							case 'invalid password':
								console.log("invalid password");
								break;
						}
					} else {
						console.log(data);
					}

					setShowLoader(false);
					setAuthorizationInAnim(false);

					//500ms for close-anim of this component
					setTimeout(() => dispatch(setAuthorized()), 500);
				});
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
								<label htmlFor='email-input' ref={loginlLabel} className="input-group__label">Enter your login</label>
								<input placeholder='email@gmail.com' type='email'
									ref={loginlInput}
									onBlur={(e) => validateLogin(e.target.value)}
									id='email-input' className={`input-group__input ${emailValidStatus}`} />
							</div>

							<div className="input-group">
								<label htmlFor='password-input' ref={passwordLabel} className="input-group__label">Enter your password</label>
								<input type='password' placeholder='_____'
									ref={passwordInput}
									onBlur={(e) => validatePassword(e.target.value)}
									id='password-input' className={`input-group__input ${passwordValidStatus}`} />
							</div>

						</div>

						<div className="authorization__buttons">
							<Button onClickHandler={() => console.log('Register')}>
								Register & log in
							</Button>

							<Button onClickHandler={authorizeClickhandler}>
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
