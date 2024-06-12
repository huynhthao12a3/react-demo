import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter, Outlet, Route, Router, Routes } from "react-router-dom";
import "./index.css";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container } from "react-bootstrap";

// Component
import { Footer, Navigation, ImageItem } from "./webpage/common/components";
import { About, Contact, Home, Login, NotFound } from "./webpage/components";
import { EmployeeView, FileView, ProductView, CategoryView, CustomerView } from "./webpage/views";

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
				<Route path="" element={<BasicLayout />}>
					<Route path="/" element={<Home />}></Route>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/contact" element={<Contact />}></Route>
					<Route path="/product" element={<ProductView />}></Route>
					<Route path="/employee" element={<EmployeeView />}></Route>
					<Route path="/file" element={<FileView />}></Route>
					<Route path="/category" element={<CategoryView />}></Route>
					<Route path="/customer" element={<CustomerView />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Route>
				<Route path="/login" element={<Login />}></Route>

				<Route path="/file/:filePath" element={<ImageItem />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
