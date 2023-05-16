import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/tasksSlice';

import { CSSTransition } from 'react-transition-group';

export default function AddTask() {
	const dispatch = useDispatch();

	const [inStart, setinStart] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setinStart(true);
		}, 500);
	}, []);

	const parent = useRef(null);
	const input = useRef(null);
	const plus = useRef(null);

	function interactBlock(e) {
		let target = e.target;

		if (target === input.current || target === plus.current && !parent.current.classList.contains('focused')) {
			parent.current.classList.add('focused');
			input.current.focus();

			document.querySelector('.wrapper').addEventListener('click', function (e) {
				if (!e.target.closest('.add-task'))
					parent.current.classList.remove('focused');
			}, { 'once': true })
		} else if (target === plus.current && parent.current.classList.contains('focused')) {
			parent.current.classList.remove('focused');
			input.current.value = '';
		}
	}

	function onInputKeyDownHandler(e) {
		if (e.code === 'Enter' && e.target.value !== '') {
			dispatch(addTask(e.target.value));
			e.target.value = '';
		};
	}

	function onIconClickHandler() {
		if (input.current.value !== '') {
			dispatch(addTask(input.current.value));
			input.current.value = '';
		}
	}

	return (
		<CSSTransition in={inStart} timeout={500} classNames={'add-task'}>
			<footer className='add-task' ref={parent} onClick={interactBlock}>
				<div className="add-task__plus" ref={plus}></div>
				<input className="add-task__title" ref={input} type={'text'}
					name='taskName' onKeyDown={onInputKeyDownHandler}
					placeholder='Enter next task`s title'
				/>
				<div className='add-task__send-icon ico-send' onClick={onIconClickHandler}></div>

			</footer>
		</CSSTransition>
	)
}
