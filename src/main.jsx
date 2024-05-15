import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ContactUs from "./webpage/ContactUs.jsx";
import Login from "./webpage/Login.jsx";
import About from "./webpage/About";

const hasToken = !!localStorage.getItem("token");

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/app" element={hasToken ? <App /> : <Login />}></Route>
				<Route path="/contact-us" element={hasToken ? <ContactUs /> : <Login />}></Route>
				<Route path="/" element={<Login />}></Route>
				<Route path="/about" element={<About />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
