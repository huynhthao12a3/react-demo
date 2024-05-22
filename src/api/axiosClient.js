import axios from "axios";
import queryString from "query-string";

// Add a request interceptor
axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		console.group("===> Axios Request:");
		console.log("Url: ", config.url);
		console.log("Params: ", config.params);
		console.groupEnd();
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		console.group("===> Axios Response:");
		console.log("Data: ", response.data);
		console.groupEnd();
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

// Set config defaults when creating the instance
const axiosClient = axios.create({
	baseURL: "http://localhost:9999",
	headers: { "Content-Type": "application/json" },
	paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;
