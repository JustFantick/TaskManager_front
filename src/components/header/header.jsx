import React from 'react'

export default function Header(props) {
	let options = {
		month: 'long',
		day: 'numeric',
		weekday: 'short',
	};

	function interactRefreshButton() {
		let button = document.querySelector('.ico-refresh');
		button.classList.add('active');

		setTimeout(function () {
			props.refreshTasks();
			button.classList.remove('active');
		}, 700);
	}

	return (
		<header className="header">
			<div className="header__title">
				<h1>Your`s day</h1>
				<p>{new Date().toLocaleString('en-EU', options)}</p>
			</div>
			<div className="ico-refresh" onClick={interactRefreshButton}>
			</div>
		</header>
	)
}
