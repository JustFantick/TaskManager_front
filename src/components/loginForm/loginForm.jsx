import React, { useState, useRef } from 'react';
import './loginForm.less';
import { port } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setAuthorized, setUserId, setUserName } from '../../store/authorizationDataSlice';
import Button from '../button/button.jsx';
import arrow from '../../img/side-arrow.svg';

export default function LoginForm() {
	const dispatch = useDispatch();
	const [emailValidStatus, setEmailValidStatus] = useState('');
	const [passwordValidStatus, setPasswordValidStatus] = useState('');

	const [emailLabelText, setEmailLabelText] = useState('Enter your login');
	const [passwordLabelText, setPasswordLabelText] = useState('Enter your password');

	const [loginlInput, passwordInput, loginlLabel, passwordLabel, checkboxInput, checkboxLabel] = [
		useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null),
	];

	function validateLogin(currentInputValue) {
		if (currentInputValue === '') {
			setEmailLabelText('Enter your login');
			setEmailValidStatus('non-valid');
		} else if (/^\d+$/.test(currentInputValue)) {
			setEmailLabelText('Login shouldn`t consist only digits');
			setEmailValidStatus('non-valid');
		} else {
			setEmailLabelText('Login validated');
			setEmailValidStatus('valid');
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

	async function loginClickHandler() {
		if (emailValidStatus === 'valid' && passwordValidStatus === 'valid') {
			//setShowLoader(true);

			const response = await fetch(
				`${port}/authorizeTry?login=${loginlInput.current.value}&password=${passwordInput.current.value}`,
				{ method: 'GET' }
			);
			const data = await response.json();

			if (data.status === 0) {
				switch (data.errorType) {
					case 'user not found':
						setEmailLabelText('User doesn`t exist');
						break;
					case 'invalid password':
						setPasswordLabelText('Invalid password');
						break;
				}
			} else if (data.status === 1) {
				//500ms for close-anim of this component
				//setTimeout(() => dispatch(setAuthorized()), 500);
				//setAuthorizationInAnim(false);

				dispatch(setAuthorized());
				dispatch(setUserName(data.userLogin));
				dispatch(setUserId(data.userId));

				//downloadUserData(data.userId);
			} else {
				console.log("Unexpected error");
			}

			//setShowLoader(false);
		} else {
			validateLogin(loginlInput.current.value);
			validatePassword(passwordInput.current.value);
		}
	}
	return (
		<form className='form-wrapper'>
			<div className="form-wrapper__inputs">
				<div className="input-group">
					<label htmlFor='email-input' ref={loginlLabel} className="input-group__label">
						{emailLabelText}
					</label>
					<input placeholder='User login' type='text'
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

				<div className="input-group checkbox-input">
					<label htmlFor='checkbox-input' ref={checkboxLabel} className="input-group__label">Remember me</label>
					<input type='checkbox'
						ref={checkboxInput}
						id='checkbox-input' className={`input-group__checkbox ${passwordValidStatus}`} />
				</div>

				<div className="form-link">Forgot password?</div>

			</div>

			<div className="form-wrapper__buttons">
				<Button onClickHandler={loginClickHandler}>
					Login <img src={arrow} alt="arrow" />
				</Button>

			</div>
		</form>
	)
}
