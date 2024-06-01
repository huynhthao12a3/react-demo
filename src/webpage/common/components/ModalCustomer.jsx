import { useState } from "react";
import { Col, FloatingLabel, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { fileApi, customerApi } from "../../../api";

function ModalCustomer(props) {
	console.log(props);
	if (!props.modalProps) {
		props.modalProps = {
			status: "",
			show: "",
			customerInformation: "",
			handleHideModal: "",
			fetchData: "",
		};
	}
	const { show, status, handleHideModal, customerInformation, fetchData } = { ...props.modalProps };
	const [formData, setFormData] = useState(customerInformation);

	console.log("formData: ", formData);
	// Check status: Info _ Add _ Update
	const disabledCondition = ["Add", "Update"].includes(status) ? false : true;

	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};
	const handleRadioInputChange = (event) => {
		console.log("handleRadioInputChange: ", event.target);
		setFormData({
			...formData,
			[event.target.name]: event.target.checked,
		});
	};

	const handleSubmit = async () => {
		console.log("formData", formData);
		const response = await customerApi.createCustomer(formData);
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
					<Modal.Title>Customer Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<FloatingLabel label="Customer Name" controlId="floatingInput" className="mb-3">
								<Form.Control
									type="text"
									placeholder="Customer Name"
									name="customerName"
									onChange={handleInputChange}
									value={formData.customerName}
									disabled={disabledCondition}
									autoFocus={true}
								/>
							</FloatingLabel>
						</Form.Group>
						<Form.Group className="mb-3">
							<FloatingLabel label="Address" controlId="floatingAddress">
								<Form.Control
									className="h-25"
									as="textarea"
									placeholder="Address"
									name="customerAddress"
									onChange={handleInputChange}
									value={formData.customerAddress}
									rows={5}
									disabled={disabledCondition}
								/>
							</FloatingLabel>
						</Form.Group>
						<Form.Group className="mb-3">
							<FloatingLabel label="Phone" controlId="floatingPhone">
								<Form.Control type="number" placeholder="customerPhone" name="customerPhone" onChange={handleInputChange} value={formData.customerPhone} disabled={disabledCondition} />
							</FloatingLabel>
						</Form.Group>
						<Form.Group className="mb-3">
							<InputGroup>
								<FloatingLabel label="Email" controlId="floatingEmail">
									<Form.Control type="text" placeholder="Email" name="customerEmail" onChange={handleInputChange} value={formData.customerEmail} disabled={disabledCondition} />
								</FloatingLabel>
							</InputGroup>
						</Form.Group>
						<Form.Group className="mb-3">
							<FloatingLabel label="Point" controlId="floatingPoint">
								<Form.Control type="number" placeholder="customerPoint" name="customerPoint" onChange={handleInputChange} value={formData.customerPoint} disabled={disabledCondition} />
							</FloatingLabel>
						</Form.Group>
						<Form.Check // prettier-ignore
							type="switch"
							id="custom-flag"
							label="Blacklist Flag"
							name="customerBackListFlag"
							onClick={handleRadioInputChange}
							defaultChecked={formData.customerBackListFlag}
						/>
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

export default ModalCustomer;
