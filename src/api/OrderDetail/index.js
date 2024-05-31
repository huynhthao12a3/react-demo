import axiosClient from "../axiosClient";

const orderDetailApi = {
	getAllOrderDetail: () => {
		const url = "/tds/order-detail/get-all-order-detail";
		return axiosClient.get(url);
	},
	getOrderDetailById: (orderDetailId) => {
		const url = "/tds/order-detail/get-by-id";
		return axiosClient.get(url, orderDetailId);
	},
	deleteOrderDetailById: (orderDetailId) => {
		const url = "/tds/order-detail/delete-by-id";
		return axiosClient.delete(url, { params: { orderDetailId: orderDetailId } });
	},
	createOrderDetail: (orderDetail) => {
		const url = "/tds/order-detail/create-order-detail";
		return axiosClient.post(url, orderDetail);
	},
};

export default orderDetailApi;
