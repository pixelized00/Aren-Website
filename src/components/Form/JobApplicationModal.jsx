import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/config";
import { useLangContext } from "../../context/LangContext";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";

const JobApplicationModal = ({ show, onClose }) => {
  const [errors, setErrors] = useState({});
  const { lang } = useLangContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    birthday: "",
    tc: "",
    militaryservice: "",
    city: "",
    district: "",
    education: "",
    school: "",
    schoolstartdate: "",
    schoolenddate: "",
    companyname: "",
    companyposition: "",
    companystartdate: "",
    companyenddate: "",
    file: null,
    dataConsent: false,
    kvkkConsent: false,
  });
  const handleMilitaryServiceChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      militaryservice: value,
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      file: file,
    });
  };
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

  const modalBodyStyle = {
    maxHeight: "80vh",
    overflowY: "auto",
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
    data.append("lastName", formData.lastName);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("email", formData.email);
    data.append("birthday", formData.birthday);
    data.append("tc", formData.tc);
    data.append("militaryservice", formData.militaryservice);
    data.append("city", formData.city);
    data.append("district", formData.district);
    data.append("education", formData.education);
    data.append("school", formData.school);
    data.append("schoolstartdate", formData.schoolstartdate);
    data.append("schoolenddate", formData.schoolenddate);
    data.append("companyname", formData.companyname);
    data.append("companyposition", formData.companyposition);
    data.append("companystartdate", formData.companystartdate);
    data.append("companyenddate", formData.companyenddate);
    data.append("file", formData.file);
    data.append("dataConsent", formData.dataConsent);
    data.append("kvkkConsent", formData.kvkkConsent);
    try {
      await axios.post(`${API_BASE_URL}/addJobApplication.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        subject: "",
        birthday: "",
        tc: "",
        militaryservice: "",
        city: "",
        district: "",
        education: "",
        school: "",
        schoolstartdate: "",
        schoolenddate: "",
        companyname: "",
        companyposition: "",
        companystartdate: "",
        companyenddate: "",
        file: null,
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

  let combinedLabel = "";
  let combinedLabel2 = "";

  for (let i = 1; i <= 5; i++) {
    const labelText =
      lang === "tr"
        ? jsonTr[`isbasvurusozlesme${i}`]
        : jsonEn[`isbasvurusozlesme${i}`];

    if (i === 2) {
      combinedLabel += `<a href="/kvkk" target="_blank" style="text-decoration: underline; >${labelText}</a> `;
    } else if (i === 4) {
      combinedLabel += `<a href="/employeecandidate" target="_blank" style="text-decoration: underline;">${labelText}</a> `;
    } else {
      combinedLabel += labelText + " ";
    }
  }

  for (let i = 6; i <= 7; i++) {
    const labelText =
      lang === "tr"
        ? jsonTr[`isbasvurusozlesme${i}`]
        : jsonEn[`isbasvurusozlesme${i}`];

    if (i === 6 && lang === "tr") {
      combinedLabel2 += `<a href="/employeecandidate" target="_blank" style="text-decoration: underline;">${labelText}</a> `;
    } else if (i === 7 && lang === "en") {
      combinedLabel2 += `<a href="/employeecandidate" target="_blank" style="text-decoration: underline;">${labelText}</a> `;
    } else {
      combinedLabel2 += labelText + " ";
    }
  }

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
      contentClassName="bg-[#FDF9EE]"
    >
      <Modal.Body style={backgroundStyle} className=" border-none">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <AiFillCloseCircle size={32} color="#2F3D57" />
        </button>

        <Form onSubmit={handleSubmit} className=" pb-12 mt-12">
          <p className="font-medium text-xl text-[#6A6969]">
            {" "}
            {lang === "tr" ? jsonTr.KişiselBilgiler : jsonEn.KişiselBilgiler}
          </p>
          <div className="flex space-x-10 mt-6">
            <Form.Group controlId="firstName">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.İsim : jsonEn.İsim}
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
                  {" "}
                  {lang === "tr"
                    ? jsonTr.İsimboşbırakılamaz
                    : jsonEn.İsimboşbırakılamaz}
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.Soyisim : jsonEn.Soyisim}
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                className="border-2 border-[#37A6B4]"
                value={formData.lastName}
                onChange={handleInputChange}
              />{" "}
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {" "}
                  {lang === "tr"
                    ? jsonTr.Soyisimboşbırakılamaz
                    : jsonEn.Soyisimboşbırakılamaz}
                </p>
              )}
            </Form.Group>
          </div>

          <div className="flex space-x-10">
            <Form.Group controlId="birthday">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.DoğumTarihi : jsonEn.DoğumTarihi}
              </Form.Label>
              <Form.Control
                type="text"
                name="birthday"
                className="border-2 border-[#37A6B4]"
                value={formData.birthday}
                onChange={handleInputChange}
              />{" "}
              {errors.birthday && (
                <p className="text-red-500 text-sm">
                  {lang === "tr"
                    ? jsonTr.Doğumtarihiboşbırakılamaz
                    : jsonEn.Doğumtarihiboşbırakılamaz}
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="tc">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.TcNo : jsonEn.TcNo}
              </Form.Label>
              <Form.Control
                type="text"
                name="tc"
                className="border-2 border-[#37A6B4]"
                value={formData.tc}
                onChange={handleInputChange}
              />
              {errors.tc && (
                <p className="text-red-500 text-sm">
                  {lang === "tr"
                    ? jsonTr.TCkimliknumarasıboşbırakılamaz
                    : jsonEn.TCkimliknumarasıboşbırakılamaz}
                </p>
              )}
            </Form.Group>
          </div>
          <Form.Group controlId="militaryservice">
            <fieldset>
              <legend className="text-[#6A6969] text-sm font-bold mt-2">
                {lang === "tr" ? jsonTr.AskerlikDurumu : jsonEn.AskerlikDurumu}
              </legend>
              <div className="flex space-x-4">
                <Form.Check
                  type="radio"
                  label={lang === "tr" ? jsonTr.Yapıldı : jsonEn.Yapıldı}
                  name="militaryservice"
                  value="Yapıldı"
                  checked={formData.militaryservice === "Yapıldı"}
                  onChange={handleMilitaryServiceChange}
                />
                <Form.Check
                  type="radio"
                  label={lang === "tr" ? jsonTr.Yapılmadı : jsonEn.Yapılmadı}
                  name="militaryservice"
                  value="Yapılmadı"
                  checked={formData.militaryservice === "Yapılmadı"}
                  onChange={handleMilitaryServiceChange}
                />{" "}
              </div>
              {errors.militaryservice && (
                <p className="text-red-500 text-sm">
                  {" "}
                  {lang === "tr"
                    ? jsonTr.Askerlikdurumuseçiniz
                    : jsonEn.Askerlikdurumuseçiniz}
                </p>
              )}
            </fieldset>
          </Form.Group>

          <Form.Group controlId="file">
            <Form.Label className="text-[#6A6969] mt-3 text-sm font-bold">
              {lang === "tr" ? jsonTr.CVSeçiniz : jsonEn.CVSeçiniz}
            </Form.Label>
            <Form.Control type="file" name="file" onChange={handleFileChange} />{" "}
            {errors.file && (
              <p className="text-red-500 text-sm">
                {" "}
                {lang === "tr"
                  ? jsonTr.Cvalanıboşbırakılamaz
                  : jsonEn.Cvalanıboşbırakılamaz}
              </p>
            )}
          </Form.Group>
          <p className="font-medium text-xl text-[#6A6969] mt-6">
            {lang === "tr"
              ? jsonTr.İletişimBilgileri
              : jsonEn.İletişimBilgileri}
          </p>
          <div className="flex space-x-10 mt-6">
            <Form.Group controlId="email">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.Eposta : jsonEn.Eposta}
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                className="border-2 border-[#37A6B4]"
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
            <Form.Group controlId="phoneNumber">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.Telefon : jsonEn.Telefon}
              </Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                className="border-2 border-[#37A6B4]"
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
          </div>

          <div className="flex space-x-10">
            <Form.Group controlId="city">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.Şehir : jsonEn.Şehir}
              </Form.Label>
              <Form.Control
                type="text"
                name="city"
                className="border-2 border-[#37A6B4]"
                value={formData.city}
                onChange={handleInputChange}
              />{" "}
              {errors.city && (
                <p className="text-red-500 text-sm">
                  {" "}
                  {lang === "tr"
                    ? jsonTr.Şehirboşbırakılamaz
                    : jsonEn.Şehirboşbırakılamaz}
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="district">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.İlçe : jsonEn.İlçe}
              </Form.Label>
              <Form.Control
                type="text"
                name="district"
                className="border-2 border-[#37A6B4]"
                value={formData.district}
                onChange={handleInputChange}
              />{" "}
              {errors.district && (
                <p className="text-red-500 text-sm">
                  {" "}
                  {lang === "tr"
                    ? jsonTr.İlçeboşbırakılamaz
                    : jsonEn.İlçeboşbırakılamaz}
                </p>
              )}
            </Form.Group>
          </div>

          <p className="font-medium text-xl text-[#6A6969] mt-6">
            {lang === "tr" ? jsonTr.ÖğrenimBilgileri : jsonEn.ÖğrenimBilgileri}
          </p>
          <div className="flex space-x-10 mt-6">
            <Form.Group controlId="education">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.EğitimSeviyesi : jsonEn.EğitimSeviyesi}
              </Form.Label>
              <Form.Control
                type="text"
                name="education"
                className="border-2 border-[#37A6B4]"
                value={formData.education}
                onChange={handleInputChange}
              />{" "}
              {errors.education && (
                <p className="text-red-500 text-sm">
                  {lang === "tr"
                    ? jsonTr.Eğitimseviyesiboşbırakılamaz
                    : jsonEn.Eğitimseviyesiboşbırakılamaz}
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="school">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.Okul : jsonEn.Okul}
              </Form.Label>
              <Form.Control
                type="text"
                name="school"
                className="border-2 border-[#37A6B4]"
                value={formData.school}
                onChange={handleInputChange}
              />{" "}
              {errors.school && (
                <p className="text-red-500 text-sm">
                  {" "}
                  {lang === "tr"
                    ? jsonTr.Okulboşbırakılamaz
                    : jsonEn.Okulboşbırakılamaz}
                </p>
              )}
            </Form.Group>
          </div>

          <div className="flex space-x-10">
            <Form.Group controlId="schoolstartdate">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr"
                  ? jsonTr.BaşlangıçTarihi
                  : jsonEn.BaşlangıçTarihi}
              </Form.Label>
              <Form.Control
                type="text"
                name="schoolstartdate"
                className="border-2 border-[#37A6B4]"
                value={formData.schoolstartdate}
                onChange={handleInputChange}
              />{" "}
              {errors.schoolstartdate && (
                <p className="text-red-500 text-sm">
                  {lang === "tr"
                    ? jsonTr.Başlangıçtarihiboşbırakılamaz
                    : jsonEn.Başlangıçtarihiboşbırakılamaz}
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="schoolenddate">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.BitişTarihi : jsonEn.BitişTarihi}
              </Form.Label>
              <Form.Control
                type="text"
                name="schoolenddate"
                className="border-2 border-[#37A6B4]"
                value={formData.schoolenddate}
                onChange={handleInputChange}
              />{" "}
              {errors.schoolenddate && (
                <p className="text-red-500 text-sm">
                  {lang === "tr"
                    ? jsonTr.Bitiştarihiboşbırakılamaz
                    : jsonEn.Bitiştarihiboşbırakılamaz}
                </p>
              )}
            </Form.Group>
          </div>

          <p className="font-medium text-xl text-[#6A6969] mt-6">
            {lang === "tr" ? jsonTr.İşTecrübesi : jsonEn.İşTecrübesi}
          </p>
          <div className="flex space-x-10 mt-6">
            <Form.Group controlId="companyname">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.ŞirketAdı : jsonEn.ŞirketAdı}
              </Form.Label>
              <Form.Control
                type="text"
                name="companyname"
                className="border-2 border-[#37A6B4]"
                value={formData.companyname}
                onChange={handleInputChange}
              />{" "}
              {errors.companyname && (
                <p className="text-red-500 text-sm">
                  {lang === "tr"
                    ? jsonTr.Şirketadıboşbırakılamaz
                    : jsonEn.Şirketadıboşbırakılamaz}
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="companyposition">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.Pozisyon : jsonEn.Pozisyon}
              </Form.Label>
              <Form.Control
                type="text"
                name="companyposition"
                className="border-2 border-[#37A6B4]"
                value={formData.companyposition}
                onChange={handleInputChange}
              />{" "}
              {errors.companyposition && (
                <p className="text-red-500 text-sm">
                  {lang === "tr"
                    ? jsonTr.Pozisyonboşbırakılamaz
                    : jsonEn.Pozisyonboşbırakılamaz}
                </p>
              )}
            </Form.Group>
          </div>

          <div className="flex space-x-10">
            <Form.Group controlId="companystartdate">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr"
                  ? jsonTr.BaşlangıçTarihi
                  : jsonEn.BaşlangıçTarihi}
              </Form.Label>
              <Form.Control
                type="text"
                name="companystartdate"
                className="border-2 border-[#37A6B4]"
                value={formData.companystartdate}
                onChange={handleInputChange}
              />
              {errors.companystartdate && (
                <p className="text-red-500 text-sm">
                  {lang === "tr"
                    ? jsonTr.Başlangıçtarihiboşbırakılamaz
                    : jsonEn.Başlangıçtarihiboşbırakılamaz}
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="companyenddate">
              <Form.Label className="text-[#6A6969] text-sm font-bold">
                {lang === "tr" ? jsonTr.BitişTarihi : jsonEn.BitişTarihi}
              </Form.Label>
              <Form.Control
                type="text"
                name="companyenddate"
                className="border-2 border-[#37A6B4]"
                value={formData.companyenddate}
                onChange={handleInputChange}
              />{" "}
              {errors.companyenddate && (
                <p className="text-red-500 text-sm">
                  {lang === "tr"
                    ? jsonTr.Bitiştarihiboşbırakılamaz
                    : jsonEn.Bitiştarihiboşbırakılamaz}
                </p>
              )}
            </Form.Group>
          </div>
          <div className="text-[#6A6969] mt-6 text-sm">
            <Form.Group controlId="agreements">
              <fieldset>
                <legend className="text-[#6A6969] text-sm font-bold">
                  {lang === "tr"
                    ? jsonTr.SözleşmeveOnaylar
                    : jsonEn.SözleşmeveOnaylar}
                </legend>
                <div className="text-[#6A6969] mt-3 text-sm">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span
                        dangerouslySetInnerHTML={{ __html: combinedLabel }}
                      />
                    }
                    name="dataConsent"
                    checked={formData.dataConsent}
                    onChange={handleInputChange}
                  />{" "}
                  {errors.dataConsent && (
                    <p className="text-red-500 text-sm">
                      {lang === "tr"
                        ? jsonTr.Sözleşmemetninionaylayınız
                        : jsonEn.Sözleşmemetninionaylayınız}
                    </p>
                  )}
                  <Form.Check
                    type="checkbox"
                    label={
                      <span
                        dangerouslySetInnerHTML={{ __html: combinedLabel2 }}
                      />
                    }
                    name="kvkkConsent"
                    checked={formData.kvkkConsent}
                    onChange={handleInputChange}
                  />{" "}
                  {errors.kvkkConsent && (
                    <p className="text-red-500 text-sm">
                      {lang === "tr"
                        ? jsonTr.Sözleşmemetninionaylayınız
                        : jsonEn.Sözleşmemetninionaylayınız}
                    </p>
                  )}
                </div>
              </fieldset>
            </Form.Group>
          </div>
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

export default JobApplicationModal;
