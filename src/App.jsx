import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Menu from "./webpage/Menu";
import ProductView from "./webpage/ProductView";
import EmployeeView from "./webpage/EmployeeView";
import Footer from "./webpage/Footer";

function App() {
	const [value, setValue] = useState(0);
	const increment = () => {
		setValue(value + 1);
	};
	return (
		<>
			<Menu value={value} />
			{/* <Content contentFromParent="Message from parent." /> */}
			{/* <FormInputDemo /> */}
			<h1>Product List</h1>
			<ProductView />

			<h1>Employee List</h1>
			<EmployeeView />
			<Footer />
			<button onClick={increment}>Increment</button>
			{/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
		</>
	);
}

export default App;
