import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../../store/tasksSlice.js';

import { CSSTransition } from 'react-transition-group';

export default function DeleteTaskPopup(props) {
	const dispatch = useDispatch();
	const currentTask = useSelector((state) => state.tasks[currentTaskIndex]);
	const currentTaskIndex = useSelector((state) => state.taskIndex.value);

	function hidePopup() {
		props.disactivatePopup();
	}

	function outBodyClickHandler(e) {
		if (!e.target.closest('.popup__body')) hidePopup();
	}

	const userId = useSelector((state) => state.userData.userId);
	function deleteBtnClickHandler() {
		props.disactivatePopup();

		document.querySelector('.wrapper').classList.remove('active');
		document.querySelectorAll('.task').forEach((task) => {
			task.classList.remove('active');
		});

		dispatch(removeTask({
			userId: userId,
			taskIndex: currentTaskIndex,
		}
		));
	}

	return (
		<CSSTransition
			in={props.popupOpen} timeout={300} classNames={'popup'}
			mountOnEnter unmountOnExit>
			<div className='popup' onClick={outBodyClickHandler}>
				<div className="popup__body">
					<div className='popup__question'>
						You want to delete the '{currentTask ? currentTask.title : ''}'a, right?
					</div>
					<button onClick={hidePopup} className='popup__cancel-btn'>Cancel</button>
					<button onClick={deleteBtnClickHandler} className='popup__right-btn'>Delete</button>
				</div>
			</div>
		</CSSTransition>
	)
}
