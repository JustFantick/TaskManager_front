import React from 'react';
import Status from '../status/status.jsx';
import Step from '../step/step.jsx';

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
		if (e.which == 13) e.target.blur();
	}

	return (
		<div className='sidebar-header'>
			<div className="sidebar-task">
				<Status mb={20} pc={25}
					status={props.tasksList[props.currentTask] ? props.tasksList[props.currentTask].taskStatusDone : false}
					statusChangeHandler={props.taskStatusChangeHandler}
				/>
				<div
					className={
						props.tasksList[props.currentTask] ?
							props.tasksList[props.currentTask].taskStatusDone ?
								"sidebar-task__title done" : "sidebar-task__title" : "sidebar-task__title"
					}
					contentEditable="true"
					tabIndex={-1}
					suppressContentEditableWarning="true"
					onBlur={props.onTitleChange}
					onKeyDown={enterHandler}
				>
					{
						props.tasksList[props.currentTask] ?
							props.tasksList[props.currentTask].title : ''
					}
				</div>
			</div>
			<ul className='steps-list'>
				{
					props.tasksList[props.currentTask] ?
						props.tasksList[props.currentTask].steps.map((step, index) => (
							<Step
								key={index}
								text={step.title}
								index={index}
								stepStatus={step.stepDone}
								stepStatusChangeHandler={props.stepStatusChangeHandler}
								func={props.deleteStep}
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
					className="add-step__title" onKeyDown={props.addStep}
				/>
			</div>
		</div >
	)
}
