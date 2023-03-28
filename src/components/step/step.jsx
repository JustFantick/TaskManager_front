import React from 'react';
import Status from '../status/status.jsx';
import DeleteStep from '../delete-step/delete-step.jsx';

export default function Step(props) {
	return (
		<li className='step' onClick={props.func} index={props.index}>
			<Status status={props.stepStatus} pc={21} mb={17}
				statusChangeHandler={props.stepStatusChangeHandler} />

			<div
				className={props.stepStatus ? "step__title done" : "step__title"}
				contentEditable="true"
				suppressContentEditableWarning="true"
				onBlur={props.onStepChange}
				onKeyDown={props.enterHandler}
			>
				{props.text}
			</div>

			<DeleteStep pc={23} mb={19} />
		</li>
	)
}
