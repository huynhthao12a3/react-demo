import axiosClient from "../axiosClient";

const productApi = {
	getAllProduct: () => {
		const url = "/tds/product/getAllProduct";
		return axiosClient.get(url);
	},
	getProductById: (productId) => {
		const url = "/tds/product/getProductById";
		return axiosClient.get(url, productId);
	},
	getProductByName: (productName) => {
		const url = "/tds/product/getProductByName";
		return axiosClient.get(url, { params: { productName: productName } });
	},
	deleteProductById: (productId) => {
		const url = "/tds/product/deleteProductById";
		return axiosClient.delete(url, { params: { productId: productId } });
	},
	createProduct: (product) => {
		const url = "/tds/product/createProduct";
		return axiosClient.post(url, product);
	},
};

export default productApi;
