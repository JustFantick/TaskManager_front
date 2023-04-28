import React from 'react';
import Button from '../button/button.jsx';
import arrow from '../../img/side-arrow.svg';

export default function Authorization() {
	return (
		<div className='authorization'>
			<div className="authorization__body">
				<div className="authorization__title">Authorization</div>
				<div className="authorization__line"></div>


				<div className="authorization__inputs">
					<div className="input-group">
						<label htmlFor='email-input' className="input-group__label">Enter your login</label>
						<input placeholder='email@gmail.com' type='email' id='email-input' className="input-group__input" />
					</div>

					<div className="input-group">
						<label htmlFor='password-input' className="input-group__label">Enter your password</label>
						<input type='password' id='password-input' className="input-group__input" />
					</div>

				</div>

				<div className="authorization__buttons">
					<Button onClickHandler={() => console.log('Register')}>
						Register & log in
					</Button>

					<Button onClickHandler={() => console.log('Authorize')}>
						Authorize <img src={arrow} alt="arrow" />
					</Button>

				</div>

			</div>

		</div>
	)
}
