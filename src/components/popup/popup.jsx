import React from 'react';

export default function DeleteTaskPopup(props) {
	function hidePopup() {
		document.querySelector('.popup').classList.remove('active');
	}
	function outBodyClick(e) {
		if (!e.target.closest('.popup__body')) hidePopup();
	}

	return (
		<div className='popup' onClick={outBodyClick}>
			<div className="popup__body">
				<div className='popup__question'>
					You want to delete the '{
						props.tasksList[props.currentTask] ?
							props.tasksList[props.currentTask].title : ''
					}', right?
				</div>
				<button onClick={hidePopup} className='popup__cancel-btn'>Cancel</button>
				<button onClick={props.removeTask} className='popup__right-btn'>Delete</button>
			</div>
		</div>)
}
