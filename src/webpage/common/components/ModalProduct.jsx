import { useState } from "react";
import { Col, FloatingLabel, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { fileApi, productApi } from "../../../api";
import { put } from "@vercel/blob";

function ModalProduct(props) {
	// console.log(process.env.VITE_READ_WRITE_TOKEN);
	console.log(import.meta.env.VITE_READ_WRITE_TOKEN);
	console.log(props);
	if (!props.modalProps) {
		props.modalProps = {
			status: "",
			show: "",
			productInformation: "",
			handleHideModal: "",
			fetchData: "",
		};
	}
	const { show, status, handleHideModal, productInformation, fetchData } = { ...props.modalProps };
	const [formData, setFormData] = useState(productInformation);

	// Check status: Info _ Add _ Update
	const disabledCondition = ["Add", "Update"].includes(status) ? false : true;

	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleImageChange = async (event) => {
		console.log(event.target.files[0]);
		// const reader = new FileReader();
		// const encoder = new TextEncoder();
		// reader.readAsDataURL(event.target.files[0]);
		// reader.onloadend = (progressEvent) => {
		// 	console.log(encoder.encode(progressEvent.target.result));
		// 	setFormData({
		// 		...formData,
		// 		[event.target.name]: encoder.encode(progressEvent.target.result),
		// 	});
		// 	console.log(formData);
		// };
		const formDataImage = new FormData();
		formDataImage.append("file", event.target.files[0]);
		const response = await fileApi.saveFile(formDataImage);
		if (response.isSuccess) {
			setFormData({
				...formData,
				[event.target.name]: response.data.filePath,
			});
		}
		console.log("handleImageChange: ", response);
		// console.log(reader.result);
		// setTimeout(() => console.log(reader.result), 1000);
		// setFormData({
		// 	...formData,
		// 	[event.target.name]: reader.result,
		// });
	};

	const handleImageChangeVercel = async (event) => {
		const formDataImage = new FormData();
		formDataImage.append("file", event.target.files[0]);
		const blob = await put(event.target.files[0].name, event.target.files[0], { access: "public" });
		console.log("=> vercel image: ", blob);
	};

	const handleSubmit = async () => {
		console.log("formData", formData);
		const response = await productApi.createProduct(formData);
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
					<Modal.Title>Product Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<FloatingLabel label="Product Name" controlId="floatingInput" className="mb-3">
								<Form.Control
									type="text"
									placeholder="Product Name"
									name="productName"
									onChange={handleInputChange}
									value={formData.productName}
									disabled={disabledCondition}
									autoFocus={true}
								/>
							</FloatingLabel>
						</Form.Group>
						<Form.Group className="mb-3">
							<FloatingLabel label="Remark" controlId="floatingRemark">
								<Form.Control
									className="h-25"
									as="textarea"
									placeholder="Remark"
									name="remark"
									onChange={handleInputChange}
									value={formData.remark}
									rows={5}
									disabled={disabledCondition}
								/>
							</FloatingLabel>
						</Form.Group>
						<Row>
							<Form.Group as={Col} className="mb-3">
								<InputGroup>
									<FloatingLabel label="Input Price" controlId="floatingInputPrice">
										<Form.Control type="number" placeholder="Input Price" name="inputPrice" onChange={handleInputChange} value={formData.inputPrice} disabled={disabledCondition} />
									</FloatingLabel>
									<InputGroup.Text>$</InputGroup.Text>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} className="mb-3">
								<InputGroup>
									<FloatingLabel label="Output Price" controlId="floatingOutputPrice">
										<Form.Control
											type="number"
											placeholder="Output Price"
											name="outputPrice"
											onChange={handleInputChange}
											value={formData.outputPrice}
											disabled={disabledCondition}
										/>
									</FloatingLabel>
									<InputGroup.Text>$</InputGroup.Text>
								</InputGroup>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group as={Col} className="mb-3">
								<FloatingLabel label="Input Date" controlId="floatingInputDate">
									<Form.Control
										type="Date"
										placeholder="Input Date"
										name="inputDate"
										onChange={handleInputChange}
										value={formData.inputDate ? new Date(formData.inputDate).toISOString().substring(0, 10) : new Date("1970-01-01").toISOString().substring(0, 10)}
										disabled={disabledCondition}
									/>
								</FloatingLabel>
							</Form.Group>
							<Form.Group as={Col} className="mb-3">
								<FloatingLabel label="Expired Date" controlId="floatingExpiredDate">
									<Form.Control
										type="Date"
										placeholder="Expired Date"
										name="expiredDate"
										onChange={handleInputChange}
										value={formData.expiredDate ? new Date(formData.expiredDate).toISOString().substring(0, 10) : new Date("1970-01-01").toISOString().substring(0, 10)}
										disabled={disabledCondition}
									/>
								</FloatingLabel>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group as={Col} className="mb-3">
								<FloatingLabel label="Quantity" controlId="floatingQuantity">
									<Form.Control type="number" placeholder="Quantity" name="quantity" onChange={handleInputChange} value={formData.quantity} disabled={disabledCondition} />
								</FloatingLabel>
							</Form.Group>
							<Form.Group as={Col} className="mb-3">
								<FloatingLabel label="Image" controlId="floatingImage">
									<Form.Control type="file" accept="image/*" name="image" onChange={handleImageChange} disabled={disabledCondition} />
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

export default ModalProduct;
