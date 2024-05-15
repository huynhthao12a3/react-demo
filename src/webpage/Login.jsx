import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "../App";

function Login(props) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};
	const handleSubmitFrom = (event) => {
		event.preventDefault();
		console.group("Form data: ");
		console.log(formData);
		console.groupEnd();
		fetchData();
	};
	const fetchData = async () => {
		await axios
			.post("https://fakestoreapi.com/auth/login", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(function (response) {
				// if (response.ok) {
				console.log(response);
				if (response.data.token) {
					console.log("Login success.");
					localStorage.setItem("token", response.data.token);
					navigate("/app");
				}
				// }
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
		<div className="container login-container loginmagin">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-header">
							<h3 className="text-center">Login</h3>
						</div>
						<div className="card-body">
							<form>
								<div className="form-group">
									<label htmlFor="username">Username:</label>
									<input type="text" onChange={handleInputChange} className="form-control" id="username" name="username" placeholder="Enter your username" />
								</div>
								<div className="form-group">
									<label htmlFor="password">Password:</label>
									<input type="password" onChange={handleInputChange} className="form-control" id="password" name="password" placeholder="Enter your password" />
								</div>
								<button onClick={handleSubmitFrom} type="submit" className="btn btn-primary btn-block">
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
