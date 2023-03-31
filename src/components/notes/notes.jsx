import React, { useContext } from 'react';

import { TasksContext } from '../App.jsx';
import { TaskIndexContext } from '../App.jsx';


export default function Notes(props) {
	const tasksFromContext = useContext(TasksContext);
	const taskIndexFromContext = useContext(TaskIndexContext);

	return (
		<div className='sidebar-notes'
			data-text="Add notes"
			contentEditable="true"
			tabIndex={-1}
			suppressContentEditableWarning="true"
			onBlur={props.saveNote}
		>
			{
				tasksFromContext[taskIndexFromContext] ?
					tasksFromContext[taskIndexFromContext].note : ''
			}
		</div>
	)
}
