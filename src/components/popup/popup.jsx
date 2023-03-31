import React, { useContext } from 'react';

import { TasksContext } from '../App.jsx';
import { TaskIndexContext } from '../App.jsx';

export default function DeleteTaskPopup(props) {
	function hidePopup() {
		document.querySelector('.popup').classList.remove('active');
	}
	function outBodyClick(e) {
		if (!e.target.closest('.popup__body')) hidePopup();
	}

	const tasksFromContext = useContext(TasksContext);
	const taskIndexFromContext = useContext(TaskIndexContext);

	return (
		<div className='popup' onClick={outBodyClick}>
			<div className="popup__body">
				<div className='popup__question'>
					You want to delete the '{
						tasksFromContext[taskIndexFromContext] ?
							tasksFromContext[taskIndexFromContext].title : ''
					}', right?
				</div>
				<button onClick={hidePopup} className='popup__cancel-btn'>Cancel</button>
				<button onClick={props.removeTask} className='popup__right-btn'>Delete</button>
			</div>
		</div>)
}
