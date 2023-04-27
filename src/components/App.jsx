import React, { useState } from 'react';
import background from "../img/bg1.webp"
import Main from "./main/main.jsx";
import Sidebar from "./sidebar/sidebar.jsx";
import Authorization from './authorization/authorization.jsx';

export default function App() {
	const [authorized, setAuthorized] = useState(false);

	const tasksBlock =
		<React.Fragment>
			<Main />
			<Sidebar />
		</React.Fragment>;


	return (
		<div className="wrapper" style={{ backgroundImage: `url(${background})` }}>

			{authorized ? tasksBlock : <Authorization />}

		</div>
	)
}