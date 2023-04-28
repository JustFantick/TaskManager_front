import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Preloader(props) {
	return (
		<CSSTransition in={props.inAnim} timeout={500} classNames='preloader'>
			<div className='preloader'>
				<div className="preloader__circle">loading</div>
			</div>
		</CSSTransition>
	)
}
