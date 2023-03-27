import React from 'react'

export default function Notes(props) {
	return (
		<div className='sidebar-notes'
			data-text="Add notes"
			contentEditable="true"
			tabIndex={-1}
			suppressContentEditableWarning="true"
			onBlur={props.saveNote}
		>
			{props.noteText}
		</div>
	)
}
