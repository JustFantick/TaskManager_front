import React, { useState, useRef } from 'react';
import './registerForm.less';
import { port } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setAuthorized, setUserId, setUserName } from '../../store/authorizationDataSlice';
import Button from '../button/button.jsx';

export default function RegisterForm() {
	const dispatch = useDispatch();

	const [loginValidStatus, setLoginValidStatus] = useState('');
	const [emailValidStatus, setEmailValidStatus] = useState('');
	const [passwordValidStatus, setPasswordValidStatus] = useState('');

	const [loginLabelText, setLoginLabelText] = useState('Create your login');
	const [emailLabelText, setEmailLabelText] = useState('Enter email');
	const [passwordLabelText, setPasswordLabelText] = useState('Create your password');

	const [loginlInput, emailInput, passwordInput, checkboxInput] =
		[useRef(null), useRef(null), useRef(null), useRef(null),];

	function validateLogin(login) {
		if (login === '') {
			setLoginLabelText('Enter your login');
			setLoginValidStatus('non-valid');
		} else if (/^\d+$/.test(login)) {
			setLoginLabelText('Login shouldn`t consist only digits');
			setLoginValidStatus('non-valid');
		} else {
			setLoginLabelText('Login validated');
			setLoginValidStatus('valid');
		}
	}

	function validateEmail(email) {
		if (/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
			setEmailLabelText('Email validated successfully');
			setEmailValidStatus('valid');
		} else {
			setEmailLabelText('Incorrect email');
			setEmailValidStatus('non-valid');
		}
	}

	function validatePassword(password) {
		if (password === '') {
			setPasswordLabelText('Enter your password');
			setPasswordValidStatus('non-valid');
		} else if (password.length < 4) {
			setPasswordLabelText('Password must be at least 4 symbols long');
			setPasswordValidStatus('non-valid');
		} else {
			setPasswordLabelText('Password validated');
			setPasswordValidStatus('valid');
		}
	}

	async function registerClickHandler() {
		if (emailValidStatus === 'valid' && passwordValidStatus === 'valid') {
			//setShowLoader(true);

			const response = await fetch(`${port}/registerNewUser?login=${loginlInput.current.value}&password=${passwordInput.current.value}`, { method: 'POST' });
			const data = await response.json();

			if (data.status === 0) {
				setLoginLabelText('User already exist');
				loginValidStatus('non-valid');
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
			validateEmail(emailInput.current.value);
			validatePassword(passwordInput.current.value);
		}
	}

	return (
		<form className='form-wrapper'>
			<div className="form-wrapper__inputs">

				<div className="input-group">
					<label htmlFor='login-input' className="input-group__label">{loginLabelText}</label>
					<input placeholder='User login' type='text'
						ref={loginlInput}
						onBlur={(e) => validateLogin(e.target.value)}
						id='login-input' className={`input-group__input ${loginValidStatus}`}
					/>
				</div>

				<div className="input-group">
					<label htmlFor='email-input' className="input-group__label">{emailLabelText}</label>
					<input placeholder='Email@gmail.com' type='email'
						ref={emailInput}
						onBlur={(e) => validateEmail(e.target.value)}
						id='email-input'
						className={`input-group__input ${emailValidStatus}`}
					/>
				</div>

				<div className="input-group">
					<label htmlFor='password-input' className="input-group__label">{passwordLabelText}</label>
					<input type='password' placeholder='_____'
						ref={passwordInput}
						onBlur={(e) => validatePassword(e.target.value)}
						id='password-input'
						className={`input-group__input ${passwordValidStatus}`}
					/>
				</div>

				<div className="input-group checkbox-input">
					<label htmlFor='checkbox-input' className="input-group__label">Remember me</label>
					<input type='checkbox'
						ref={checkboxInput}
						id='checkbox-input'
						className={`input-group__checkbox ${passwordValidStatus}`}
					/>
				</div>

			</div>

			<div className="form-wrapper__buttons">
				<Button onClickHandler={registerClickHandler}>Register</Button>
			</div>

		</form>
	);
}
