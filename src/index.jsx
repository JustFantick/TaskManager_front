import "./styles.less";
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./components/App.jsx";

import store from "./store/store.js";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
