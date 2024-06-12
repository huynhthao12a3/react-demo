import { employeeApi } from "./src/api";

const cronJob = async () => {
	const date = new Date();
	const response = await employeeApi.getAllEmployee();
	console.group(" =====> Cron Job");
	console.log("At Twelve Minutes: ", date);
	console.log("Data: ", response);
	console.groupEnd();
};

export default cronJob;
