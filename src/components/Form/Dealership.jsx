import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/config";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";
import { useLangContext } from "../../context/LangContext";

const Dealership = ({ show, onClose, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const { lang } = useLangContext();

  const [formData, setFormData] = useState({
    firstName: "",
    phoneNumber: "",
    email: "",
    city: "",
    unvan: "",
    taxoffice: "",
    taxno: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = `${field} boş bırakılamaz`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("email", formData.email);
    data.append("city", formData.city);
    data.append("unvan", formData.unvan);
    data.append("taxoffice", formData.taxoffice);
    data.append("taxno", formData.taxno);
    data.append("message", formData.message);

    try {
      await axios.post(`${API_BASE_URL}/addFranchiseForm.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData({
        firstName: "",
        phoneNumber: "",
        email: "",
        city: "",
        unvan: "",
        taxoffice: "",
        taxno: "",
        message: "",
      });
      toast.success(
        "Formunuz başarıyla alınmıştır ve en kısa sürede incelenecektir",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error) {
      console.error("Veri yüklenirken hata oluştu:", error);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${"assets/img/job.png"})`,
    backgroundSize: "cover",
    maxHeight: "80vh",
    overflowY: "auto",
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdropClassName="bg-[#FDF9EE]"
    >
      <Modal.Body
        style={backgroundStyle}
        className="rounded-[40px] border-none"
      >
        <button className="absolute top-2 right-4" onClick={onClose}>
          <AiFillCloseCircle size={32} color="#2F3D57" />
        </button>

        <Form onSubmit={handleSubmit} className="px-6 pb-6 mt-6">
          <Form.Group controlId="firstName">
            <Form.Label className="text-[#6A6969] text-sm  font-bold">
              {lang === "tr" ? jsonTr.İsimSoyisim : jsonEn.İsimSoyisim}
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              className="border-2 border-[#37A6B4]"
              value={formData.firstName}
              onChange={handleInputChange}
            />{" "}
            {errors.firstName && (
              <p className="text-red-500 text-sm">
                {lang === "tr"
                  ? jsonTr.İsimSoyisimboşbırakılamaz
                  : jsonEn.İsimSoyisimboşbırakılamaz}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label className="text-[#6A6969] text-sm font-bold mt-2">
              {lang === "tr" ? jsonTr.Telefon : jsonEn.Telefon}
            </Form.Label>
            <Form.Control
              type="text"
              className="border-2 border-[#37A6B4]"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />{" "}
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {lang === "tr"
                  ? jsonTr.Telefonnumarasıboşbırakılamaz
                  : jsonEn.Telefonnumarasıboşbırakılamaz}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label className="text-[#6A6969] text-sm font-bold mt-2">
              {lang === "tr" ? jsonTr.Email : jsonEn.Email}
            </Form.Label>
            <Form.Control
              type="text"
              className="border-2 border-[#37A6B4]"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />{" "}
            {errors.email && (
              <p className="text-red-500 text-sm">
                {" "}
                {lang === "tr"
                  ? jsonTr.Emailboşbırakılamaz
                  : jsonEn.Emailboşbırakılamaz}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label className="text-[#6A6969] text-sm font-bold mt-2">
              {lang === "tr"
                ? jsonTr.BayilikDüşünülenİl
                : jsonEn.BayilikDüşünülenİl}
            </Form.Label>
            <Form.Control
              type="text"
              className="border-2 border-[#37A6B4]"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />{" "}
            {errors.city && (
              <p className="text-red-500 text-sm">
                {lang === "tr"
                  ? jsonTr.Bayilikdüşünülenilboşbırakılamaz
                  : jsonEn.Bayilikdüşünülenilboşbırakılamaz}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="unvan">
            <Form.Label className="text-[#6A6969]  text-sm font-bold mt-2">
              {lang === "tr" ? jsonTr.TicariUnvan : jsonEn.TicariUnvan}
            </Form.Label>
            <Form.Control
              type="text"
              className="border-2 border-[#37A6B4]"
              name="unvan"
              value={formData.unvan}
              onChange={handleInputChange}
            />{" "}
            {errors.unvan && (
              <p className="text-red-500 text-sm">
                {lang === "tr"
                  ? jsonTr.Ticariünvanboşbırakılamaz
                  : jsonEn.Ticariünvanboşbırakılamaz}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="taxoffice">
            <Form.Label className="text-[#6A6969] text-sm font-bold mt-2">
              {lang === "tr" ? jsonTr.Vergidairesi : jsonEn.Vergidairesi}
            </Form.Label>
            <Form.Control
              type="text"
              name="taxoffice"
              className="border-2 border-[#37A6B4]"
              value={formData.taxoffice}
              onChange={handleInputChange}
            />
            {errors.taxoffice && (
              <p className="text-red-500 text-sm">
                {lang === "tr"
                  ? jsonTr.Vergidairesiboşbırakılamaz
                  : jsonEn.Vergidairesiboşbırakılamaz}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="taxno">
            <Form.Label className="text-[#6A6969] text-sm font-bold mt-2">
              {lang === "tr" ? jsonTr.VergiNo : jsonEn.VergiNo}
            </Form.Label>
            <Form.Control
              type="text"
              name="taxno"
              className="border-2 border-[#37A6B4]"
              value={formData.taxno}
              onChange={handleInputChange}
            />{" "}
            {errors.unvan && (
              <p className="text-red-500 text-sm">
                {lang === "tr"
                  ? jsonTr.Verginumarasıboşbırakılamaz
                  : jsonEn.Verginumarasıboşbırakılamaz}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="message">
            <Form.Label className="text-[#6A6969] text-sm font-bold mt-2">
              {lang === "tr" ? jsonTr.Mesaj : jsonEn.Mesaj}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              className="border-2 border-[#37A6B4]"
              value={formData.message}
              onChange={handleInputChange}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">
                {" "}
                {lang === "tr"
                  ? jsonTr.Mesajboşbırakılamaz
                  : jsonEn.Mesajboşbırakılamaz}
              </p>
            )}
          </Form.Group>
          <button
            type="submit"
            className="bg-[#018EA0] py-1 px-8 text-white rounded-xl mt-4"
          >
            {lang === "tr" ? jsonTr.Gönder : jsonEn.Gönder}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Dealership;
