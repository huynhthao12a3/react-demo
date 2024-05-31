import axiosClient from "../axiosClient";

const orderApi = {
	getAllOrder: () => {
		const url = "/tds/order/get-all-order";
		return axiosClient.get(url);
	},
	getOrderById: (orderId) => {
		const url = "/tds/order/get-by-id";
		return axiosClient.get(url, orderId);
	},
	deleteOrderById: (orderId) => {
		const url = "/tds/order/delete-by-id";
		return axiosClient.delete(url, { params: { orderId: orderId } });
	},
	createOrder: (order) => {
		const url = "/tds/order/create-order";
		return axiosClient.post(url, order);
	},
};

export default orderApi;
