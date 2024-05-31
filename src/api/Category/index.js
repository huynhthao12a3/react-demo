import axiosClient from "../axiosClient";

const categoryApi = {
	getAllCategory: () => {
		const url = "/tds/category/get-all-category";
		return axiosClient.get(url);
	},
	getCategoryById: (categoryId) => {
		const url = "/tds/category/get-by-id";
		return axiosClient.get(url, categoryId);
	},
	getCategoryByName: (categoryName) => {
		const url = "/tds/category/get-by-name";
		return axiosClient.get(url, { params: { categoryName: categoryName } });
	},
	deleteCategoryById: (categoryId) => {
		const url = "/tds/category/delete-by-id";
		return axiosClient.delete(url, { params: { categoryId: categoryId } });
	},
	createCategory: (category) => {
		const url = "/tds/category/create-category";
		return axiosClient.post(url, category);
	},
};

export default categoryApi;
