import axiosClient from "../axiosClient";

const employeeApi = {
	getAllEmployee: () => {
		const url = "/tds/employee/get-all-employee";
		return axiosClient.get(url);
	},
	getEmployeeById: (employeeId) => {
		const url = "/tds/employee/get-employee-by-id";
		return axiosClient.get(url, employeeId);
	},
	getEmployeeByName: (employeeName) => {
		const url = "/tds/employee/get-employee-by-name";
		return axiosClient.get(url, { params: { employeeName: employeeName } });
	},
	deleteEmployeeById: (employeeId) => {
		const url = "/tds/employee/delete-employee-by-id";
		return axiosClient.delete(url, { params: { employeeId: employeeId } });
	},
	createEmployee: (employee) => {
		const url = "/tds/employee/create-employee";
		return axiosClient.post(url, employee);
	},
};

export default employeeApi;
