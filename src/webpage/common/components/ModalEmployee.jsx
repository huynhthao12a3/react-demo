import { useState } from "react";
import { Col, FloatingLabel, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { fileApi, employeeApi } from "../../../api";
import { put } from "@vercel/blob";

function ModalEmployee(props) {
	console.log(process.env.BLOB_READ_WRITE_TOKEN);
	console.log(import.meta.env.BLOB_READ_WRITE_TOKEN);
	console.log(props);
	if (!props.modalProps) {
		props.modalProps = {
			status: "",
			show: "",
			employeeInformation: "",
			handleHideModal: "",
			fetchData: "",
		};
	}
	const { show, status, handleHideModal, employeeInformation, fetchData } = { ...props.modalProps };
	const [formData, setFormData] = useState(employeeInformation);

	// Check status: Info _ Add _ Update
	const disabledCondition = ["Add", "Update"].includes(status) ? false : true;

	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async () => {
		console.log("formData", formData);
		const response = await employeeApi.createEmployee(formData);
		if (response.isSuccess) {
			swal("Created", response.message, "success");
			handleHideModal();
			fetchData();
		} else {
			swal("Warning", response.message, "warning");
		}
	};
	return (
		<>
			<Modal show={show} onHide={handleHideModal}>
				<Modal.Header closeButton>
					<Modal.Title>Employee Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<FloatingLabel label="Employee Name" controlId="floatingInput" className="mb-3">
								<Form.Control
									type="text"
									placeholder="Employee Name"
									name="employeeName"
									onChange={handleInputChange}
									value={formData.employeeName}
									disabled={disabledCondition}
									autoFocus={true}
								/>
							</FloatingLabel>
						</Form.Group>
						<Form.Group className="mb-3">
							<FloatingLabel label="Phone" controlId="floatingPhone">
								<Form.Control
									className="h-25"
									placeholder="employeePhone"
									name="employeePhone"
									onChange={handleInputChange}
									value={formData.employeePhone}
									rows={5}
									disabled={disabledCondition}
								/>
							</FloatingLabel>
						</Form.Group>
						<Row>
							<Form.Group className="mb-3">
								<InputGroup>
									<FloatingLabel label="Email" controlId="floatingEmail">
										<Form.Control
											type="text"
											placeholder="Email"
											name="employeeEmail"
											onChange={handleInputChange}
											value={formData.employeeEmail}
											disabled={disabledCondition}
										/>
									</FloatingLabel>
								</InputGroup>
							</Form.Group>
						</Row>
						<Form.Group className="mb-3">
							<InputGroup>
								<FloatingLabel label="Adress" controlId="floatingAdress">
									<Form.Control
										className="h-25"
										as="textarea"
										placeholder="Adress"
										name="employeeAddress"
										onChange={handleInputChange}
										value={formData.employeeAddress}
										rows={5}
										disabled={disabledCondition}
									/>
								</FloatingLabel>
							</InputGroup>
						</Form.Group>
						<Row>
							<Form.Group as={Col} className="mb-3">
								<FloatingLabel label="Input Date" controlId="floatingInputDate">
									<Form.Control
										type="Date"
										placeholder="Input Date"
										name="employeeHireDate"
										onChange={handleInputChange}
										value={
											formData.employeeHireDate
												? new Date(formData.employeeHireDate).toISOString().substring(0, 10)
												: new Date("1970-01-01").toISOString().substring(0, 10)
										}
										disabled={disabledCondition}
									/>
								</FloatingLabel>
							</Form.Group>
							<Form.Group as={Col} className="mb-3">
								<FloatingLabel label="Expired Date" controlId="floatingExpiredDate">
									<Form.Control
										type="Date"
										placeholder="Expired Date"
										name="employeeEndDate"
										onChange={handleInputChange}
										value={
											formData.employeeEndDate
												? new Date(formData.employeeEndDate).toISOString().substring(0, 10)
												: new Date("1970-01-01").toISOString().substring(0, 10)
										}
										disabled={disabledCondition}
									/>
								</FloatingLabel>
							</Form.Group>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleHideModal}>
						Close
					</Button>
					{!disabledCondition && (
						<Button variant="primary" onClick={handleSubmit}>
							Save Changes
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalEmployee;
