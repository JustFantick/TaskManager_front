import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../../store/tasksSlice';
import { port } from '../App.jsx';

import Main from "../main/main.jsx";
import Sidebar from "../sidebar/sidebar.jsx";

export default function TasksPage() {
	const dispatch = useDispatch();

	const userId = useSelector((state) => state.authorizationData.userId);

	useEffect(() => {
		async function getTasks() {
			const requestJSON = await fetch(`${port}/getTasks?userId=${userId}`, { method: 'GET' });
			const result = await requestJSON.json();
			dispatch(setTasks(result));
		}
		getTasks();
	}, []);

	return (
		<React.Fragment>
			<Main />
			<Sidebar />
		</React.Fragment>
	)
}
