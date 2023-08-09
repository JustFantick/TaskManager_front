import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../../store/tasksSlice.js';
import { CSSTransition } from 'react-transition-group';

export default function Popup({ isPopupOpen, hidePopup, children }) {
	function outBodyClickHandler(e) {
		if (!e.target.closest('.popup__body')) hidePopup();
	}

	return (
		<CSSTransition
			in={isPopupOpen} timeout={300} classNames={'popup'}
			mountOnEnter unmountOnExit>
			<div className='popup' onClick={outBodyClickHandler}>
				<div className="popup__body">
					{children}
				</div>
			</div>
		</CSSTransition>
	)
}

export function DeleteTaskPopup({ isPopupOpen, hidePopup }) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authorizationData.userId);
	const currentTaskIndex = useSelector((state) => state.taskIndex.value);
	const currentTask = useSelector((state) => state.tasks[currentTaskIndex]);

	function deleteBtnClickHandler() {
		hidePopup();

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
		<Popup isPopupOpen={isPopupOpen} hidePopup={hidePopup}>
			<div className='popup__question'>
				You want to delete the '{currentTask && currentTask.title}', right?
			</div>
			<button onClick={hidePopup} className='popup__cancel-btn'>Cancel</button>
			<button onClick={deleteBtnClickHandler} className='popup__right-btn'>Delete</button>
		</Popup>
	)
}
