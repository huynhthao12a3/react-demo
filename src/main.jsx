import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Outlet, Route, Router, Routes } from "react-router-dom";
import "./index.css";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container } from "react-bootstrap";

// Component
import { Footer, Navigation } from "./webpage/common/components";
import { About, Contact, Home, Login } from "./webpage/components";
import { FileView, ProductView } from "./webpage/views";

const hasToken = !!localStorage.getItem("token");

function BasicLayout() {
	return (
		<div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
			<Navigation />
			<Container fluid className="flex-grow-1 py-5">
				<Outlet />
			</Container>
			<Footer />
		</div>
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
					<Route path="/app" element={hasToken ? <Home /> : <Login />}></Route>
					{/* <Route path="/contact-us" element={hasToken ? <ContactUs /> : <Login />}></Route> */}
					{/* <Route path="/" element={<Login />}></Route> */}
					{/* <Route path="/about" element={<About />}></Route> */}
					<Route path="/" element={<Login />}></Route>
					<Route path="/product" element={<ProductView />}></Route>
					<Route path="/file" element={<FileView />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
