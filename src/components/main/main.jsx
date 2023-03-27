import React from 'react';
import Header from '../header/header.jsx';
import AddTask from '../add-task/add-task.jsx'
import TaskContainer from '../taskContainer/task-container.jsx';

export default function Main(props) {
	return (
		<main className="main">
			<Header refreshTasks={props.refreshTasks} />

			<TaskContainer tasks={props.tasksList}
				chooseTask={props.chooseTask}
				starStatusChange={props.starStatusChange}
				taskStatusChangeHandler={props.taskStatusChangeHandler} />

			<AddTask addTask={props.addTask} />
		</main>
	)
}
