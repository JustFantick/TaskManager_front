import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Preloader(props) {
	return (
		<CSSTransition
			in={props.inAnim}
			timeout={300}
			classNames='preloader'
			mountOnEnter unmountOnExit
		>
			<div className='preloader'>
				<div className="preloader__body">
					<div className="preloader__circle"></div>
				</div>
			</div>
		</CSSTransition>
	)
}
