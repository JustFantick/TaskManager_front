import React from 'react';
import Status from '../status/status.jsx';
import DeleteStep from '../delete-step/delete-step.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { removeStep, stepTitleChange, stepStatusChange } from '../../store/tasksSlice.js';

export default function Step(props) {
	const dispatch = useDispatch();
	const task = useSelector((state) => state.tasks[props.taskIndex]);

	function onStepClickHandler(e) {
		if (e.target.classList.contains('delete-step')) {
			dispatch(removeStep({
				taskIndex: props.taskIndex,
				stepIndex: props.stepIndex,
			}))
		}
	}

	function onBlurHandler(e) {
		dispatch(stepTitleChange({
			taskIndex: props.taskIndex,
			stepIndex: props.stepIndex,
			newStepTitle: e.target.textContent,
		}))
	}

	return (
		<li className='step' onClick={(e) => onStepClickHandler(e)} index={props.stepIndex}>
			<Status status={task.steps[props.stepIndex].stepStatus} pc={21} mb={17}
				statusChangeHandler={() => dispatch(stepStatusChange({
					taskIndex: props.taskIndex,
					stepIndex: props.stepIndex,
				}))} />

			<div
				className={task.steps[props.stepIndex].stepDone ? "step__title done" : "step__title"}
				contentEditable="true"
				suppressContentEditableWarning="true"
				onBlur={(e) => onBlurHandler(e)}
				onKeyDown={props.enterHandler}
			>
				{task.steps[props.stepIndex].title}
			</div>

			<DeleteStep pc={23} mb={19} />
		</li>
	)
}
