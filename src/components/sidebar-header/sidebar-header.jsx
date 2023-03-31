import React, { useContext } from 'react';
import Status from '../status/status.jsx';
import Step from '../step/step.jsx';

import { TasksContext } from '../App.jsx';
import { TaskIndexContext } from '../App.jsx';

export default function SidebarHeader(props) {
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
			props.addStep(e.target.value);

			//empty the input
			e.target.value = '';
		}
	}

	function taskTitleChangeHandler(e) {
		props.onTaskTitleChange(e.target.textContent);
	}

	const tasksFromContext = useContext(TasksContext);
	const taskIndexFromContext = useContext(TaskIndexContext);

	return (
		<div className='sidebar-header'>
			<div className="sidebar-task">
				<Status mb={20} pc={25}
					status={tasksFromContext[taskIndexFromContext] ? tasksFromContext[taskIndexFromContext].taskStatusDone : false}
					statusChangeHandler={props.taskStatusChangeHandler}
				/>
				<div
					className={
						tasksFromContext[taskIndexFromContext] ?
							tasksFromContext[taskIndexFromContext].taskStatusDone ?
								"sidebar-task__title done" : "sidebar-task__title" : "sidebar-task__title"
					}
					contentEditable="true"
					tabIndex={-1}
					suppressContentEditableWarning="true"
					onBlur={taskTitleChangeHandler}
					onKeyDown={enterHandler}
				>
					{
						tasksFromContext[taskIndexFromContext] ?
							tasksFromContext[taskIndexFromContext].title : ''
					}
				</div>
			</div>
			<ul className='steps-list'>
				{
					tasksFromContext[taskIndexFromContext] ?
						tasksFromContext[taskIndexFromContext].steps.map((step, index) => (
							<Step
								key={index}
								text={step.title}
								index={index}
								stepStatus={step.stepDone}
								stepStatusChangeHandler={props.stepStatusChangeHandler}
								deleteStep={props.deleteStep}
								onStepChange={props.onStepChange}
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
