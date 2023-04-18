import React from 'react';
import Header from '../header/header.jsx';
import AddTask from '../add-task/add-task.jsx'
import TaskContainer from '../taskContainer/task-container.jsx';

export default function Main(props) {
	return (
		<main className="main">
			<Header />

			<TaskContainer />

			<AddTask />
		</main>
	)
}
