import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import tkg_logo from "../common/images/tkg_logo.webp";
import "../common/css/login.css";
import swal from "sweetalert";
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
	const handleSubmitFromRegister = (event) => {
		event.preventDefault();
		swal("Info", "Server maintenance... Please login", "info");
	};
	const toggleForm = () => {
		const container = document.querySelector(".container");
		container.classList.toggle("active");
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
					navigate("/home");
				}
				// }
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
		<section className="login-form-client">
			<div className="container">
				<div className="user signinBx">
					<div className="imgBx d-flex flex-column align-items-center justify-content-center">
						<Link to="./home" className="py-5">
							<img src={tkg_logo} alt="TDS" width={200} />
						</Link>
						<p className="fs-5 fw-bold">Xin chào!</p>
						<p>Nếu chưa có tài khoản, vui lòng đăng ký tại đây.</p>
						<button onClick={toggleForm} className="px-4 py-2 rounded-3">
							Đăng ký
						</button>
					</div>
					<div className="formBx">
						<form onSubmit={handleSubmitFrom}>
							<h2>Đăng nhập hệ thống</h2>
							<input type="text" placeholder="Tên tài khoản / email" name="username" onChange={handleInputChange} />
							<input type="password" placeholder="Mật khẩu" name="password" onChange={handleInputChange} />
							<button type="submit" className="px-4 py-2 rounded-3 text-light mt-2">
								Đăng nhập <i className="bi bi-box-arrow-in-right"></i>
							</button>
						</form>
					</div>
				</div>
				<div className="user signupBx">
					<div className="formBx">
						<form onSubmit={handleSubmitFromRegister}>
							<h2>Đăng ký tài khoản</h2>
							<div className="w-100 position-relative">
								<img src={tkg_logo} className=" mx-auto d-block img-fluid rounded-pill" alt="Preview Register " style={{ width: "100px" }} />
								<input type="file" className="w-100 h-100 position-absolute start-0 end-0 top-0 bottom-0" style={{ opacity: 0 }} />
							</div>
							<input type="text" placeholder="Họ và tên" />
							<input type="number" placeholder="Số điện thoại" />

							<input type="text" placeholder="Địa chỉ" />
							<input type="text" placeholder="Tên đăng nhập" />

							<input type="password" placeholder="Mật khẩu (> 6 kí tự)" />
							<input type="password" placeholder="Nhập lại mật khẩu" />

							<button type="submit" className="d-block px-4 py-2 rounded-3 text-light mt-2">
								Đăng ký <i className="bi bi-box-arrow-in-right"></i>
							</button>
						</form>
					</div>
					<div className="imgBx d-flex flex-column align-items-center justify-content-center">
						<Link to="./home" className="py-5">
							<img src={tkg_logo} alt="TDS" width={200} />
						</Link>
						<p className="fs-5 fw-bold">Xin chào!</p>
						<p>Nếu đã có tài khoản, vui lòng đăng nhập tại đây.</p>
						<button type="submit" onClick={toggleForm} className="px-4 py-2 rounded-3">
							Đăng nhập
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;
