import React, { useState, useRef } from 'react';
import { port } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setTasks } from '../../store/tasksSlice';
import { setAuthorized, setUserId, setUserName } from '../../store/authorizationDataSlice';
import Popup from '../popup/popup.jsx';
import Button from '../button/button.jsx';
import arrow from '../../img/side-arrow.svg';

export default function LoginForm({ setShowLoader, setAuthorizationInAnim }) {
	const dispatch = useDispatch();
	const [loginValidStatus, setLoginValidStatus] = useState('');
	const [passwordValidStatus, setPasswordValidStatus] = useState('');

	const [loginLabelText, setLoginLabelText] = useState('Enter your login');
	const [passwordLabelText, setPasswordLabelText] = useState('Enter your password');

	const [loginlInput, passwordInput, loginlLabel, passwordLabel, checkboxInput, checkboxLabel] = [
		useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null),
	];

	function validateLogin(currentInputValue) {
		if (currentInputValue === '') {
			setLoginLabelText('Enter your login');
			setLoginValidStatus('non-valid');
		} else if (/^\d+$/.test(currentInputValue)) {
			setLoginLabelText('Login shouldn`t consist only digits');
			setLoginValidStatus('non-valid');
		} else {
			setLoginLabelText('Login validated');
			setLoginValidStatus('valid');
		}
	}

	function validatePassword(currentInputValue) {
		if (currentInputValue === '') {
			setPasswordLabelText('Enter your password');
			setPasswordValidStatus('non-valid');
		} else if (currentInputValue.length < 4) {
			setPasswordLabelText('Password must be at least 4 symbols long');
			setPasswordValidStatus('non-valid');
		} else {
			setPasswordLabelText('Password validated');
			setPasswordValidStatus('valid');
		}
	}

	async function loginClickHandler(e) {
		e.preventDefault();

		if (loginValidStatus === 'valid' && passwordValidStatus === 'valid') {
			setShowLoader(true);

			const response = await fetch(
				`${port}/authorize?login=${loginlInput.current.value}&password=${passwordInput.current.value}`,
				{ method: 'POST' }
			);
			const data = await response.json();
			console.log(data);

			if (data.status === 0) {
				switch (data.errorType) {
					case 'user not found':
						setLoginLabelText('User doesn`t exist');
						setLoginValidStatus('non-valid');
						break;
					case 'invalid password':
						setPasswordLabelText('Invalid password');
						setPasswordValidStatus('non-valid');
						break;
				}
			} else if (data.status === 1) {
				//500ms for close-anim of this component
				setTimeout(() => dispatch(setAuthorized()), 500);//unmount Authorize component
				setAuthorizationInAnim(false);//starts close-anim for Authorize component

				dispatch(setUserName(data.userLogin));
				dispatch(setUserId(data.userId));

				const requestJSON = await fetch(`${port}/getTasks?userId=${data.response.userId}`, { method: 'GET' });
				const result = await requestJSON.json();
				dispatch(setTasks(result));
			} else {
				console.log("Unexpected error");
			}

			setShowLoader(false);
		} else {
			validateLogin(loginlInput.current.value);
			validatePassword(passwordInput.current.value);
		}
	}

	async function forgotPasswordOnClick() {
		setIsPopupOpen(false);
		const response = await fetch(
			`${port}/forgotPassword?login=${loginlInput.current.value}`,
			{ method: 'POST' }
		);
	}

	const [isPopupOpen, setIsPopupOpen] = useState(false);

	return (
		<React.Fragment>
			<form className='form-wrapper'>
				<div className="form-wrapper__inputs">
					<div className="input-group">
						<label htmlFor='login-input' ref={loginlLabel} className="input-group__label">
							{loginLabelText}
						</label>
						<input placeholder='User login' type='text' required
							ref={loginlInput}
							onBlur={(e) => validateLogin(e.target.value)}
							id='login-input' className={`input-group__input ${loginValidStatus}`} />
					</div>

					<div className="input-group">
						<label htmlFor='password-input' ref={passwordLabel} className="input-group__label">{passwordLabelText}</label>
						<input type='password' placeholder='_____' required
							ref={passwordInput}
							onBlur={(e) => validatePassword(e.target.value)}
							id='password-input' className={`input-group__input ${passwordValidStatus}`} />
					</div>

					<div className="input-group checkbox-input">
						<label htmlFor='checkbox-input' ref={checkboxLabel} className="input-group__label">Remember me</label>
						<input type='checkbox'
							ref={checkboxInput}
							id='checkbox-input' className={`input-group__checkbox ${passwordValidStatus}`} />
					</div>

					<div className="form-link" onClick={() => setIsPopupOpen(true)}>Forgot password?</div>

				</div>

				<div className="form-wrapper__buttons">
					<Button type={'submit'} onClickHandler={loginClickHandler}>
						Login <img src={arrow} alt="arrow" />
					</Button>

				</div>
			</form>

			<Popup isPopupOpen={isPopupOpen} hidePopup={() => setIsPopupOpen(false)}>
				<div className='popup__question'>
					We can send password on email this user was registered on. Do you accept it?
				</div>
				<button onClick={forgotPasswordOnClick} className='popup__cancel-btn'>Send password</button>
				<button onClick={() => setIsPopupOpen(false)} className='popup__right-btn'>Cancel</button>
			</Popup>

		</React.Fragment>
	)
}
