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
import { Navigation } from "./webpage/common/components";
import Footer from "./webpage/Footer.jsx";
import ProductView from "./webpage/ProductView.jsx";
import NewProduct from "./webpage/NewProduct.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import FileView from "./webpage/FileView.jsx";
import { Container } from "react-bootstrap";

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
					<Route path="/app" element={hasToken ? <App /> : <Login />}></Route>
					{/* <Route path="/contact-us" element={hasToken ? <ContactUs /> : <Login />}></Route> */}
					{/* <Route path="/" element={<Login />}></Route> */}
					{/* <Route path="/about" element={<About />}></Route> */}
					<Route path="/" element={<Login />}></Route>
					<Route path="/product" element={<ProductView />}></Route>
					<Route path="/file" element={<FileView />}></Route>
					<Route path="/new-product" element={<NewProduct />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
