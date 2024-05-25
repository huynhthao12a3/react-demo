import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { productApi } from "../../../api";

function ModalProduct(props) {
	const { show, handleShowModal, handleHideModal, productInformation } = props;
	const [formData, setFormData] = useState(productInformation);
	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};
	const handleSubmit = async () => {
		console.log("formData", formData);
		const response = await productApi.createProduct(formData);
		if (response.isSuccess) {
			swal("Created", response.message, "success");
			handleHideModal();
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
						<Form.Group className="mb-3" controlId="productForm.ControlInput1">
							<Form.Label>Product Name</Form.Label>
							<Form.Control type="text" name="productName" onChange={handleInputChange} value={formData.productName} autoFocus />
						</Form.Group>
						<Form.Group className="mb-3" controlId="productForm.ControlTextarea1">
							<Form.Label>Remark</Form.Label>
							<Form.Control as="textarea" name="remark" onChange={handleInputChange} value={formData.remark} rows={3} />
						</Form.Group>
						<Row>
							<Form.Group as={Col} className="mb-3" controlId="productForm.ControlTextarea1">
								<Form.Label>Input Price</Form.Label>
								<Form.Control type="number" name="inputPrice" onChange={handleInputChange} value={formData.inputPrice} />
							</Form.Group>
							<Form.Group as={Col} className="mb-3" controlId="productForm.ControlTextarea1">
								<Form.Label>Output Price</Form.Label>
								<Form.Control type="number" name="outputPrice" onChange={handleInputChange} value={formData.outputPrice} />
							</Form.Group>
						</Row>
						<Row>
							<Form.Group as={Col} className="mb-3" controlId="productForm.ControlTextarea1">
								<Form.Label>Input Date</Form.Label>
								<Form.Control type="Date" name="inputDate" onChange={handleInputChange} value={formData.inputDate} />
							</Form.Group>
							<Form.Group as={Col} className="mb-3" controlId="productForm.ControlTextarea1">
								<Form.Label>Expired Date</Form.Label>
								<Form.Control type="Date" name="expiredData" onChange={handleInputChange} value={formData.expiredDate} />
							</Form.Group>
						</Row>
						<Row>
							<Form.Group as={Col} className="mb-3" controlId="productForm.ControlTextarea1">
								<Form.Label>Quantity</Form.Label>
								<Form.Control type="number" name="quantity" onChange={handleInputChange} value={formData.quantity} />
							</Form.Group>
							<Form.Group as={Col} className="mb-3" controlId="productForm.ControlTextarea1">
								<Form.Label>Image</Form.Label>
								<Form.Control type="file" accept="image/*" name="image" onChange={handleInputChange} value={formData.image} />
							</Form.Group>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleHideModal}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalProduct;
