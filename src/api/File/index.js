import axiosClient from "../axiosClient";

const fileApi = {
	getAllFile: () => {
		const url = "/tds/file/files";
		return axiosClient.get(url);
	},
	getFileInfo: (filePath) => {
		const url = `/tds/file/files/${filePath}`;
		return axiosClient.get(url);
	},
	saveFile: (data) => {
		const url = "/tds/file/save-file";
		return axiosClient.post(url, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
	deleteFile: (filePath) => {
		const url = `/tds/file/delete-file`;
		return axiosClient.delete(url, { params: { filePath: filePath } });
	},
};

export default fileApi;
