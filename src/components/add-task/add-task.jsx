import React from 'react';

export default function AddTask(props) {
	function interactBlock(e) {
		let target = e.target;
		let plus = document.querySelector('.add-task__plus');
		let input = document.querySelector('.add-task__title');
		let parent = document.querySelector('.add-task');

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

	function inputEnterHandler(e) {
		if (e.which === 13) props.addTask();
	}

	return (
		<footer className='add-task' onClick={interactBlock}>
			<div className="add-task__plus"></div>
			<input className="add-task__title" type={'text'}
				name='taskName' onKeyDown={inputEnterHandler}
				placeholder='Enter next task`s title'
			/>
			<div className='add-task__send-icon ico-send' onClick={props.addTask}></div>

		</footer>
	)
}
