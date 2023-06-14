import React, { useState } from 'react';
import background from "../img/bg1.webp"
import Main from "./main/main.jsx";
import Sidebar from "./sidebar/sidebar.jsx";
import Authorization from './authorization/authorization.jsx';
import { useSelector } from 'react-redux';

export default function App() {
	const authorizedStatus = useSelector((state) => state.authorizationData.status);

	const tasksBlock =
		<React.Fragment>
			<Main />
			<Sidebar />
		</React.Fragment>;

	return (
		<div className="wrapper" style={{ backgroundImage: `url(${background})` }}>

			{authorizedStatus === 'non-authorized' ? <Authorization /> : tasksBlock}

		</div>
	)
}