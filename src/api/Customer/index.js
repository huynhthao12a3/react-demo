import axiosClient from "../axiosClient";

const customerApi = {
	getAllCustomer: () => {
		const url = "/tds/customer/get-all-customer";
		return axiosClient.get(url);
	},
	getCustomerById: (customerId) => {
		const url = "/tds/customer/get-by-id";
		return axiosClient.get(url, customerId);
	},
	getCustomerByName: (customerName) => {
		const url = "/tds/customer/get-by-name";
		return axiosClient.get(url, { params: { customerName: customerName } });
	},
	deleteCustomerById: (customerId) => {
		const url = "/tds/customer/delete-by-id";
		return axiosClient.delete(url, { params: { customerId: customerId } });
	},
	createCustomer: (customer) => {
		const url = "/tds/customer/create-customer";
		return axiosClient.post(url, customer);
	},
};

export default customerApi;
