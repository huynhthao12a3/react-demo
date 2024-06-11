import React from "react";
import { CronJob } from "cron";
import { employeeApi } from "./src/api";

const cronJob = new CronJob("0 */10 * * * *", async function () {
	const date = new Date();
	const response = await employeeApi.getAllEmployee();
	console.group(" =====> Cron Job");
	console.log("At Ten Minutes: ", date);
	console.log("Data: ", response);
	console.groupEnd();
});

export default cronJob;
