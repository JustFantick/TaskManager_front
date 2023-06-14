import React, { useRef } from 'react';
import Status from '../status/status.jsx';
import Step from '../step/step.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { addStep, taskTitleChange, taskStatusChange } from '../../store/tasksSlice.js';

import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function SidebarHeader() {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authorizationData.userId);
	const taskIndex = useSelector((state) => state.taskIndex.value);
	const task = useSelector((state) => state.tasks[taskIndex]);

	const addStepPlus = useRef(null);
	const addStepInput = useRef(null);
	const addStepParent = useRef(null);

	function interactInput(e) {
		let target = e.target;

		if (target === addStepInput.current || target === addStepPlus.current && !addStepParent.current.classList.contains('focused')) {
			addStepParent.current.classList.add('focused');
			addStepInput.current.focus();

			document.querySelector('.wrapper').addEventListener('click', function (e) {
				if (!e.target.closest('.add-step'))
					addStepParent.current.classList.remove('focused');
			}, { 'once': true });
		} else if (target === addStepPlus.current && addStepParent.current.classList.contains('focused')) {
			addStepParent.current.classList.remove('focused');
			addStepInput.current.value = '';
		}
	}

	function enterHandler(e) {
		if (e.code === 'Enter') e.target.blur();
	}

	function onAddStepKeyDownHandler(e) {
		if (e.code === 'Enter' && addStepInput.current.value !== '') {
			dispatch(addStep({
				userId: userId,
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
			userId: userId,
		}))
	}

	const [listRef] = useAutoAnimate();//auto-animate adding/removing tasks

	return (
		<div className='sidebar-header'>
			<div className="sidebar-task">
				<Status mb={20} pc={25}
					status={task ? task.status : false}
					statusChangeHandler={() => dispatch(taskStatusChange({
						taskIndex: taskIndex,
						userId: userId,
					}))}
				/>
				<div
					className={
						task ?
							task.status ?
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
			<ul className='steps-list' ref={listRef}>
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

			<div className='add-step' ref={addStepParent} onClick={interactInput}>
				<div className="add-step__plus" ref={addStepPlus}></div>

				<input type={'text'} name='stepName' ref={addStepInput}
					placeholder='Enter next step`s title'
					className="add-step__title" onKeyDown={(e) => onAddStepKeyDownHandler(e)}
				/>
			</div>
		</div >
	)
}
