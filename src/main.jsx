import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Outlet, Route, Router, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ContactUs from "./webpage/ContactUs.jsx";
import Login from "./webpage/Login.jsx";
// import About from "./webpage/About";
import Home from "./webpage/components/Home";
import About from "./webpage/components/About";
import Contact from "./webpage/components/Contact";
import Navigation from "./webpage/common/components/Navigation";
import Footer from "./webpage/Footer.jsx";

const hasToken = !!localStorage.getItem("token");

function BasicLayout() {
	return (
		<>
			<Navigation />
			<Outlet />
			<Footer />
		</>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<BasicLayout />}>
					<Route path="/home" element={hasToken ? <Home /> : <Login />}></Route>
					<Route path="/about" element={hasToken ? <About /> : <Login />}></Route>
					<Route path="/contact" element={hasToken ? <Contact /> : <Login />}></Route>
					<Route path="/app" element={hasToken ? <App /> : <Login />}></Route>
					{/* <Route path="/contact-us" element={hasToken ? <ContactUs /> : <Login />}></Route> */}
					{/* <Route path="/" element={<Login />}></Route> */}
					{/* <Route path="/about" element={<About />}></Route> */}
					<Route path="/" element={<Login />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
