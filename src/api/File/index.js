import axiosClient from "../axiosClient";

const fileApi = {
	getAllFile: () => {
		const url = "/tds/file/files";
		return axiosClient.get(url);
	},
};

export default fileApi;
