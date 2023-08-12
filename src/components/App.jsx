import React, { useEffect } from 'react';
import background from "../img/bg1.webp"
import Authorization from './authorization/authorization.jsx';
import TasksPage from './tasksPage/tasksPage.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthorized, setUserName, setUserId } from '../store/authorizationDataSlice';

//export const port = "http://taskmanager.cx.ua";
export const port = "http://localhost:3002";

export default function App() {
	const dispatch = useDispatch();
	const authorizedStatus = useSelector((state) => state.authorizationData.status);

	useEffect(() => {
		const authorizationData = localStorage.getItem('authorizationData');
		if (authorizationData) {
			let parsedStore = JSON.parse(authorizationData);
			dispatch(setAuthorized());
			dispatch(setUserName(parsedStore.userName));
			dispatch(setUserId(parsedStore.userId));
		}
	}, []);

	return (
		<div className="wrapper" style={{ backgroundImage: `url(${background})` }}>

			{authorizedStatus === 'non-authorized' ? <Authorization /> : <TasksPage />}

		</div>
	)
}