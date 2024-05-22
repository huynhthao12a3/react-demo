import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Menu from "./webpage/Menu";
import ProductView from "./webpage/ProductView";
import EmployeeView from "./webpage/EmployeeView";
import Footer from "./webpage/Footer";
import TableView from "./webpage/TableView";
import NewProduct from "./webpage/NewProduct";
import "./webpage/common/css/bootstrap.min.css";
import "./webpage/common/bootstrap/jquery.slim.min.js";
import "./webpage/common/bootstrap/bootstrap.min.js";
import Navigation from "./webpage/common/components/Navigation";

function App() {
	const [value, setValue] = useState(0);
	const increment = () => {
		setValue(value + 1);
	};
	return (
		<>
			{/* <Menu value={value} /> */}
			{/* <Navigation /> */}
			<NewProduct />
			{/* <Footer /> */}
		</>
	);
}

export default App;
