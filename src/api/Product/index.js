import axiosClient from "../axiosClient";

const productApi = {
	getAllProduct: () => {
		const url = "/tds/product/get-all-product";
		return axiosClient.get(url);
	},
	getProductById: (productId) => {
		const url = "/tds/product/get-product-by-id";
		return axiosClient.get(url, productId);
	},
	getProductByName: (productName) => {
		const url = "/tds/product/get-product-by-name";
		return axiosClient.get(url, { params: { productName: productName } });
	},
	deleteProductById: (productId) => {
		const url = "/tds/product/delete-product-by-id";
		return axiosClient.delete(url, { params: { productId: productId } });
	},
	createProduct: (product) => {
		const url = "/tds/product/create-product";
		return axiosClient.post(url, product);
	},
};

export default productApi;
