import React, { useEffect, useState } from 'react';
import background from "../img/bg1.webp"
import Main from "./main/main.jsx";
import Sidebar from "./sidebar/sidebar.jsx";
import DeleteTaskPopup from './popup/popup.jsx';

export default function App() {
	function updateEditingTime() {
		setTasks(tasks.map((task, i) => {
			if (taskIndex == i) {
				task.lastEdit = new Date().toLocaleString('ru', {
					hour: 'numeric',
					minute: 'numeric',
				});
			}
			return task;
		}));
	}

	return (
		<div className="wrapper" style={{ backgroundImage: `url(${background})` }}>
			<Main />

			<Sidebar />

			<DeleteTaskPopup />


		</div>
	)
}
