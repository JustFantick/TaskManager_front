import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/tasksSlice';

export default function AddTask() {
	const dispatch = useDispatch();

	const parent = document.querySelector('.add-task');
	const input = document.querySelector('.add-task__title');
	const plus = document.querySelector('.add-task__plus');

	function interactBlock(e) {
		let target = e.target;

		if (target === input || target === plus && !parent.classList.contains('focused')) {
			parent.classList.add('focused');
			input.focus();

			document.querySelector('.wrapper').addEventListener('click', function (e) {
				if (!e.target.closest('.add-task'))
					parent.classList.remove('focused');
			}, { 'once': true })
		} else if (target === plus && parent.classList.contains('focused')) {
			parent.classList.remove('focused');
			input.value = '';
		}
	}

	function onInputKeyDownHandler(e) {
		if (e.code === 'Enter' && e.target.value !== '') {
			dispatch(addTask(e.target.value));
			e.target.value = '';
		};
	}

	function onIconClickHandler() {
		if (input.value !== '') {
			dispatch(addTask(input.value));
			input.value = '';
		}
	}

	return (
		<footer className='add-task' onClick={interactBlock}>
			<div className="add-task__plus"></div>
			<input className="add-task__title" type={'text'}
				name='taskName' onKeyDown={onInputKeyDownHandler}
				placeholder='Enter next task`s title'
			/>
			<div className='add-task__send-icon ico-send' onClick={onIconClickHandler}></div>

		</footer>
	)
}
