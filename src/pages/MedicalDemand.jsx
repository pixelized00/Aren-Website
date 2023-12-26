import React, { useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/config";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";

const MedicalDemand = () => {
  const [errors, setErrors] = useState({});
  const { lang } = useLangContext();

  const [formData, setFormData] = useState({
    firstName: "",
    phoneNumber: "",
    email: "",
    hospitalcity: "",
    hospitalname: "",
    cargocity: "",
    cargodistrict: "",
    cargostreet: "",
    cargoaddress: "",
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
    data.append("hospitalcity", formData.hospitalcity);
    data.append("hospitalname", formData.hospitalname);
    data.append("cargocity", formData.cargocity);
    data.append("cargodistrict", formData.cargodistrict);
    data.append("cargostreet", formData.cargostreet);
    data.append("cargoaddress", formData.cargoaddress);
    try {
      await axios.post(`${API_BASE_URL}/addMedicalExpertForm.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        firstName: "",
        phoneNumber: "",
        email: "",
        hospitalcity: "",
        hospitalname: "",
        cargocity: "",
        cargodistrict: "",
        cargostreet: "",
        cargoaddress: "",
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

  return (
    <PublicLayout>
      <div className="w-screen relative overflow-hidden bg-white mt-32 mb-20">
        <img src={"assets/img/line.png"} alt="" className="w-full mt-8" />
        <p className="font-lemongrassscript absolute top-0 mt-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold lg:text-6xl text-2xl text-center text-[#018EA0]">
          {lang === "tr"
            ? jsonTr.TıbbiUzmanıNumuneSetiTalepFormu
            : jsonEn.TıbbiUzmanıNumuneSetiTalepFormu}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-20">
            <MDBContainer className="my-5 py-5 bg-[#F9F3E3] shadow drop-shadow-md rounded-3xl w-[80%]">
              <section>
                <MDBRow>
                  <MDBCol md="12" className="">
                    <MDBCard className="bg-[#F9F3E3] border-none">
                      <MDBCardBody className="w-[100%] ">
                        <MDBRow className="flex flex-col lg:flex-row">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]">
                              {lang === "tr"
                                ? jsonTr.TıpUzmanınınAdı
                                : jsonEn.TıpUzmanınınAdı}
                            </p>
                            <MDBInput
                              type="text"
                              className="mt-2"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />{" "}
                            {errors.firstName && (
                              <p className="text-red-500 text-sm">
                                {" "}
                                {lang === "tr"
                                  ? jsonTr.Tıpuzmanınınadıboşbırakılamaz
                                  : jsonEn.Tıpuzmanınınadıboşbırakılamaz}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57] mt-2">
                              {lang === "tr"
                                ? jsonTr.TıpUzmanınınEpostası
                                : jsonEn.TıpUzmanınınEpostası}
                            </p>
                            <MDBInput
                              type="text"
                              className="mt-2"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />{" "}
                            {errors.email && (
                              <p className="text-red-500 text-sm">
                                {" "}
                                {lang === "tr"
                                  ? jsonTr.Tıpuzmanınınepostasıboşbırakılamaz
                                  : jsonEn.Tıpuzmanınınepostasıboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4 flex flex-col lg:flex-row">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57] mt-2">
                              {lang === "tr"
                                ? jsonTr.TıpUzmanınınTelefonu
                                : jsonEn.TıpUzmanınınTelefonu}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              className="mt-2"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                            />{" "}
                            {errors.phoneNumber && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.Tıpuzmanınıntelefonuboşbırakılamaz
                                  : jsonEn.Tıpuzmanınıntelefonuboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57] mt-2">
                              {lang === "tr"
                                ? jsonTr.HastanenizHangiİlde
                                : jsonEn.HastanenizHangiİlde}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              className="mt-2"
                              name="hospitalcity"
                              value={formData.hospitalcity}
                              onChange={handleInputChange}
                            />{" "}
                            {errors.hospitalcity && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.Hastaneadıboşbırakılamaz
                                  : jsonEn.Hastaneadıboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                        </MDBRow>
                        <p className="font-bold text-[#2F3D57]">
                          {" "}
                          {lang === "tr"
                            ? jsonTr.HastaneAdı
                            : jsonEn.HastaneAdı}
                        </p>
                        <MDBInput
                          type="text"
                          className=""
                          name="hospitalname"
                          value={formData.hospitalname}
                          onChange={handleInputChange}
                        />
                        {errors.hospitalname && (
                          <p className="text-red-500 text-sm">
                            {lang === "tr"
                              ? jsonTr.Hastaneadıboşbırakılamaz
                              : jsonEn.Hastaneadıboşbırakılamaz}{" "}
                          </p>
                        )}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </section>
            </MDBContainer>

            <MDBContainer className="my-5 py-5 bg-[#F9F3E3] shadow drop-shadow-md rounded-3xl w-[80%]">
              <h1 className="lg:text-4xl text-3xl lg:h-15 font-lemongrassscript text-[#2F3D57] text-center underline decoration-2">
                {lang === "tr" ? jsonTr.KargoBilgisi : jsonEn.KargoBilgisi}{" "}
              </h1>
              <section>
                <MDBRow>
                  <MDBCol md="12" className="">
                    <MDBCard className=" border-none">
                      <MDBCardBody className="bg-[#F9F3E3] w-[100%] ">
                        <MDBRow className=" flex flex-col lg:grid lg:grid-cols-3">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]">
                              {" "}
                              {lang === "tr" ? jsonTr.İl : jsonEn.İl}
                            </p>
                            <MDBInput
                              type="text"
                              className="mt-2"
                              name="cargocity"
                              value={formData.cargocity}
                              onChange={handleInputChange}
                            />{" "}
                            {errors.cargocity && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.İlboşbırakılamaz
                                  : jsonEn.İlboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]">
                              {" "}
                              {lang === "tr" ? jsonTr.İlçe : jsonEn.İlçe}
                            </p>
                            <MDBInput
                              type="text"
                              className="mt-2"
                              name="cargodistrict"
                              value={formData.cargodistrict}
                              onChange={handleInputChange}
                            />{" "}
                            {errors.cargodistrict && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.İlçeboşbırakılamaz
                                  : jsonEn.İlçeboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]">
                              {" "}
                              {lang === "tr" ? jsonTr.Sokak : jsonEn.Sokak}
                            </p>
                            <MDBInput
                              type="text"
                              className="mt-2"
                              name="cargostreet"
                              value={formData.cargostreet}
                              onChange={handleInputChange}
                            />{" "}
                            {errors.cargostreet && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.Sokakboşbırakılamaz
                                  : jsonEn.Sokakboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                        </MDBRow>

                        <MDBRow className="">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]">
                              {" "}
                              {lang === "tr" ? jsonTr.Adres : jsonEn.Adres}
                            </p>
                            <MDBTextArea
                              rows={4}
                              className="mt-2"
                              name="cargoaddress"
                              value={formData.cargoaddress}
                              onChange={handleInputChange}
                            />{" "}
                            {errors.cargoaddress && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.Adresboşbırakılamaz
                                  : jsonEn.Adresboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </section>
            </MDBContainer>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#018EA0] py-2 px-12 text-white text-xl rounded-3xl mt-4"
              onClick={handleSubmit}
            >
              {lang === "tr" ? jsonTr.Gönder : jsonEn.Gönder}
            </button>
          </div>
        </form>
      </div>
    </PublicLayout>
  );
};

export default MedicalDemand;
