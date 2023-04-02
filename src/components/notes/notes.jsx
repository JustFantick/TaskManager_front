import React, { useContext } from 'react';

import { TasksContext } from '../App.jsx';
import { TaskIndexContext } from '../App.jsx';


export default function Notes(props) {
	function onNotesBlur(e) {
		props.saveNote(e.target.innerText);
	}

	const tasksFromContext = useContext(TasksContext);
	const taskIndexFromContext = useContext(TaskIndexContext);

	return (
		<div className='sidebar-notes'
			data-text="Add notes"
			contentEditable="true"
			tabIndex={-1}
			suppressContentEditableWarning="true"
			onBlur={onNotesBlur}
		>
			{
				tasksFromContext[taskIndexFromContext] ?
					tasksFromContext[taskIndexFromContext].note : ''
			}
		</div>
	)
}
