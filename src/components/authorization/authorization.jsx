import React, { useState } from 'react';
import Button from '../button/button.jsx';
import arrow from '../../img/side-arrow.svg';
import Preloader from '../preloader/preloader.jsx';

export default function Authorization() {
	const [showLoader, setShowLoader] = useState(false);

	function authorizeClickhandler() {
		setShowLoader(true);

		setTimeout(() => {
			setShowLoader(false);
		}, 3000);
	}

	return (
		<React.Fragment>
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

						<Button onClickHandler={authorizeClickhandler}>
							Authorize <img src={arrow} alt="arrow" />
						</Button>

					</div>

				</div>

			</div>

			<Preloader inAnim={showLoader} />
		</React.Fragment>
	)
}
