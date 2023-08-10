import React from 'react';

export default function Button({ onClickHandler, children, type }) {
	return (
		<button className='button' type={type} onClick={onClickHandler}>
			{children}
		</button>
	)
}
