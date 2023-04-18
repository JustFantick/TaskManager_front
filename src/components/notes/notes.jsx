import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { saveNote } from '../../store/tasksSlice.js';

export default function Notes() {
	const dispatch = useDispatch();
	const taskIndex = useSelector((state) => state.taskIndex.value);
	const task = useSelector((state) => state.tasks[taskIndex]);

	function onNotesBlur(e) {
		dispatch(saveNote({
			taskIndex: taskIndex,
			noteText: e.target.innerText,
		}));
	}

	return (
		<div className='sidebar-notes'
			data-text="Add notes"
			contentEditable="true"
			tabIndex={-1}
			suppressContentEditableWarning="true"
			onBlur={onNotesBlur}
		>
			{task ? task.note : ''}
		</div>
	)
}
