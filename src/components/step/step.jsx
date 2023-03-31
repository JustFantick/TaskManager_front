import React from 'react';
import Status from '../status/status.jsx';
import DeleteStep from '../delete-step/delete-step.jsx';

export default function Step(props) {
	function onStepClickHandler(e) {
		if (e.target.classList.contains('delete-step')) {
			props.deleteStep(e.target.closest('.step').getAttribute('index'));
		}
	}

	function onBlurHandler(e) {
		let stepTitleBlock = e.target;
		props.onStepChange(stepTitleBlock.closest('.step').getAttribute('index'), stepTitleBlock.textContent)
	}

	return (
		<li className='step' onClick={(e) => onStepClickHandler(e)} index={props.index}>
			<Status status={props.stepStatus} pc={21} mb={17}
				statusChangeHandler={props.stepStatusChangeHandler} />

			<div
				className={props.stepStatus ? "step__title done" : "step__title"}
				contentEditable="true"
				suppressContentEditableWarning="true"
				onBlur={(e) => onBlurHandler(e)}
				onKeyDown={props.enterHandler}
			>
				{props.text}
			</div>

			<DeleteStep pc={23} mb={19} />
		</li>
	)
}
