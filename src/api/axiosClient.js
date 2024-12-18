import axios from "axios";
import queryString from "query-string";

// Set config defaults when creating the instance
const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_SPRING_BOOT_API_URL,
	headers: { "Content-Type": "application/json" },
	paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		console.group("=====> Request:");
		console.log("Url: ", config.url);
		console.log("Params: ", config.params);
		console.log("Data: ", config.data);
		console.groupEnd();
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		console.group("==========> Response:");
		console.log("Data: ", response.data);
		console.groupEnd();
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		console.group("===> Axios Response:");
		console.log("error: ", error);
		console.groupEnd();
		return Promise.reject(error);
	}
);

export default axiosClient;
