import React from 'react';
import background from "../img/bg1.webp"
import Main from "./main/main.jsx";
import Sidebar from "./sidebar/sidebar.jsx";

export default function App() {
	return (
		<div className="wrapper" style={{ backgroundImage: `url(${background})` }}>
			<Main />

			<Sidebar />

		</div>
	)
}
