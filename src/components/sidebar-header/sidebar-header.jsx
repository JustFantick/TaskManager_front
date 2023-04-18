import React from 'react';
import Status from '../status/status.jsx';
import Step from '../step/step.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { addStep, taskTitleChange, taskStatusChange } from '../../store/tasksSlice.js';

export default function SidebarHeader() {
	const dispatch = useDispatch();
	const taskIndex = useSelector((state) => state.taskIndex.value);
	const task = useSelector((state) => state.tasks[taskIndex]);

	function interactInput(e) {
		let target = e.target;
		let plus = document.querySelector('.add-step__plus');
		let input = document.querySelector('.add-step__title');
		let parent = document.querySelector('.add-step');

		if (target === input || target === plus && !parent.classList.contains('focused')) {
			parent.classList.add('focused');
			input.focus();

			document.querySelector('.wrapper').addEventListener('click', function (e) {
				if (!e.target.closest('.add-step'))
					parent.classList.remove('focused');
			}, { 'once': true });
		} else if (target === plus && parent.classList.contains('focused')) {
			parent.classList.remove('focused');
			input.value = '';
		}
	}

	function enterHandler(e) {
		if (e.code === 'Enter') e.target.blur();
	}

	function onAddStepKeyDownHandler(e) {
		if (e.code === 'Enter' && document.querySelector('.add-step__title').value !== '') {
			dispatch(addStep({
				taskIndex: taskIndex,
				newStepTitle: e.target.value,
			}))

			//empty the input
			e.target.value = '';
		}
	}

	function taskTitleChangeHandler(e) {
		dispatch(taskTitleChange({
			taskIndex: taskIndex,
			newTaskTitle: e.target.textContent,
		}))
	}

	return (
		<div className='sidebar-header'>
			<div className="sidebar-task">
				<Status mb={20} pc={25}
					status={task ? task.taskStatus : false}
					statusChangeHandler={() => dispatch(taskStatusChange(taskIndex))}
				/>
				<div
					className={
						task ?
							task.taskStatus ?
								"sidebar-task__title done" :
								"sidebar-task__title" : "sidebar-task__title"
					}
					contentEditable="true"
					tabIndex={-1}
					suppressContentEditableWarning="true"
					onBlur={taskTitleChangeHandler}
					onKeyDown={enterHandler}
				>
					{task ? task.title : ''}
				</div>
			</div>
			<ul className='steps-list'>
				{
					task ?
						task.steps.map((step, index) => (
							<Step
								key={index}
								stepIndex={index}
								taskIndex={taskIndex}
								enterHandler={enterHandler}
							/>
						)) : ''
				}
			</ul>

			<div className='add-step' onClick={interactInput}>
				<div className="add-step__plus"></div>

				<input type={'text'} name='stepName'
					placeholder='Enter next step`s title'
					className="add-step__title" onKeyDown={(e) => onAddStepKeyDownHandler(e)}
				/>
			</div>
		</div >
	)
}
