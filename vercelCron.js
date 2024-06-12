import { employeeApi } from "./src/api";

export default async function handler(request, response) {
	const date = new Date();
	const res = await employeeApi.getAllEmployee();
	console.group(" =====> Cron Job");
	console.log("At Twelve Minutes: ", date);
	console.log("Data: ", res);
	console.groupEnd();
	return response.json(...res);
}
