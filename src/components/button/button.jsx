import React from 'react'

export default function Button(props) {
	return (
		<button className='button' onClick={props.onClickHandler}>
			{props.children}
		</button>
	)
}
