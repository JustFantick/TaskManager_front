import React from 'react'
import './delete-step.less';

export default function DeleteStep(props) {
	let btnSize = {
		width: 'calc(' + props.mb + 'px' + ' + (' + props.pc + ' - ' + props.mb + ') * ((100vw - 320px) / (1280 - 320)))',
		height: 'calc(' + props.mb + 'px' + ' + (' + props.pc + ' - ' + props.mb + ') * ((100vw - 320px) / (1280 - 320)))'
	}
	return <div className="delete-step" style={btnSize}></div>
}