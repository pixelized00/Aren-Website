import React, { useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRadio,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/config";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";

const PatientDemand = () => {
  const [errors, setErrors] = useState({});
  const { lang } = useLangContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    birthday: "",
    doctorname: "",
    hospitalname: "",
    hospitalcity: "",
    cargocity: "",
    cargodistrict: "",
    cargostreet: "",
    cargoaddress: "",
    formulaexample: "",
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
    data.append("lastName", formData.lastName);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("email", formData.email);
    data.append("birthday", formData.birthday);
    data.append("doctorname", formData.doctorname);
    data.append("hospitalname", formData.hospitalname);
    data.append("hospitalcity", formData.hospitalcity);
    data.append("cargocity", formData.cargocity);
    data.append("cargodistrict", formData.cargodistrict);
    data.append("cargostreet", formData.cargostreet);
    data.append("cargoaddress", formData.cargoaddress);
    data.append("formulaexample", formData.formulaexample);

    try {
      await axios.post(`${API_BASE_URL}/addPatientSampleForm.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        doctorname: "",
        hospitalname: "",
        hospitalcity: "",
        cargocity: "",
        cargodistrict: "",
        cargostreet: "",
        cargoaddress: "",
        formulaexample: "",
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
  const handleFormulaexampleChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      formulaexample: value,
    });
  };
  return (
    <PublicLayout>
      <div className="w-screen relative overflow-hidden  bg-white mt-32  mb-20">
        <img src={"assets/img/line.png"} alt="" className="w-full mt-8" />
        <p className="font-lemongrassscript absolute top-0 mt-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold lg:text-6xl text-3xl text-center  text-[#018EA0]">
          {lang === "tr"
            ? jsonTr.HastaNumuneSetiTalepFormu
            : jsonEn.HastaNumuneSetiTalepFormu}{" "}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="lg:mt-12 mt-28">
            <MDBContainer className="my-5 py-5 bg-[#F9F3E3] shadow drop-shadow-md rounded-3xl  w-[80%] ">
              <section>
                <MDBRow>
                  <MDBCol md="12" className="">
                    <MDBCard className="bg-[#F9F3E3]  border-none">
                      <MDBCardBody className="drop-bg-[#F9F3E3]  w-[100%] ">
                        <MDBRow className="flex flex-col lg:flex-row">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57] ">
                              {" "}
                              {lang === "tr" ? jsonTr.Adı : jsonEn.Adı}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              className="mt-2"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                            {errors.firstName && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.İsimboşbırakılamaz
                                  : jsonEn.İsimboşbırakılamaz}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]   mt-0 lg:mt-2">
                              {lang === "tr" ? jsonTr.Soyisim : jsonEn.Soyisim}
                            </p>
                            <MDBInput
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="mt-2"
                            />
                            {errors.lastName && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.Soyisimboşbırakılamaz
                                  : jsonEn.Soyisimboşbırakılamaz}
                              </p>
                            )}
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="flex flex-col lg:flex-row">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57] mt-2">
                              {lang === "tr"
                                ? jsonTr.DoğumTarihi
                                : jsonEn.DoğumTarihi}
                            </p>
                            <MDBInput
                              type="text"
                              name="birthday"
                              value={formData.birthday}
                              onChange={handleInputChange}
                              className="mt-2"
                            />
                            {errors.birthday && (
                              <p className="text-red-500 text-sm">
                                {" "}
                                {lang === "tr"
                                  ? jsonTr.Doğumtarihiboşbırakılamaz
                                  : jsonEn.Doğumtarihiboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]  mt-2">
                              {lang === "tr"
                                ? jsonTr.TelefonNumarası
                                : jsonEn.TelefonNumarası}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              className="mt-2"
                            />
                            {errors.phoneNumber && (
                              <p className="text-red-500 text-sm">
                                {" "}
                                {lang === "tr"
                                  ? jsonTr.Telefonnumarasıboşbırakılamaz
                                  : jsonEn.Telefonnumarasıboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="flex flex-col lg:flex-row mt-2">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]  ">
                              {lang === "tr" ? jsonTr.Eposta : jsonEn.Eposta}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="mt-2"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.Epostaboşbırakılamaz
                                  : jsonEn.Epostaboşbırakılamaz}{" "}
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

            <MDBContainer className="my-5 py-5 bg-[#F9F3E3] shadow drop-shadow-md rounded-3xl  w-[80%]">
              <h1 className="lg:text-4xl  text-2xl  lg:h-15 font-lemongrassscript text-[#2F3D57] text-center underline decoration-2">
                {lang === "tr" ? jsonTr.TıbbiBilgi : jsonEn.TıbbiBilgi}
              </h1>
              <section>
                <MDBRow>
                  <MDBCol md="12" className="">
                    <MDBCard className=" border-none">
                      <MDBCardBody className="bg-[#F9F3E3]  w-[100%] ">
                        <MDBRow className="flex flex-col lg:flex-row mt-2">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]  ">
                              {lang === "tr"
                                ? jsonTr.DoktorAdı
                                : jsonEn.DoktorAdı}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              name="doctorname"
                              value={formData.doctorname}
                              onChange={handleInputChange}
                              className="mt-2"
                            />
                            {errors.doctorname && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.Doktoradıboşbırakılamaz
                                  : jsonEn.Doktoradıboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]  lg:mt-0 mt-2">
                              {lang === "tr"
                                ? jsonTr.HastaneAdı
                                : jsonEn.HastaneAdı}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              name="hospitalname"
                              value={formData.hospitalname}
                              onChange={handleInputChange}
                              className=""
                            />
                            {errors.hospitalname && (
                              <p className="text-red-500 text-sm">
                                {lang === "tr"
                                  ? jsonTr.Hastaneadıboşbırakılamaz
                                  : jsonEn.Hastaneadıboşbırakılamaz}
                              </p>
                            )}
                          </MDBCol>

                          <MDBCol>
                            <p className="font-bold text-[#2F3D57] lg:mt-0  mt-2">
                              {" "}
                              {lang === "tr"
                                ? jsonTr.HastanenizHangiİlde
                                : jsonEn.HastanenizHangiİlde}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              name="hospitalcity"
                              value={formData.hospitalcity}
                              onChange={handleInputChange}
                              className=""
                            />
                            {errors.hospitalcity && (
                              <p className="text-red-500 text-sm">
                                {" "}
                                {lang === "tr"
                                  ? jsonTr.Bualanboşbırakılamaz
                                  : jsonEn.Bualanboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                        </MDBRow>{" "}
                        <MDBRow className=" flex flex-col lg:grid lg:grid-cols-3 mt-2"></MDBRow>{" "}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </section>
            </MDBContainer>
            <MDBContainer className="my-5 py-5 bg-[#F9F3E3] shadow drop-shadow-md rounded-3xl  w-[80%]">
              <h1 className="lg:text-4xl  text-2xl  lg:h-15 font-lemongrassscript text-[#2F3D57] text-center underline decoration-2">
                {lang === "tr" ? jsonTr.KargoBilgisi : jsonEn.KargoBilgisi}
              </h1>
              <section>
                <MDBRow>
                  <MDBCol md="12" className="">
                    <MDBCard className=" border-none">
                      <MDBCardBody className="bg-[#F9F3E3]  w-[100%] ">
                        <MDBRow className=" flex flex-col lg:grid lg:grid-cols-3">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]  ">
                              {" "}
                              {lang === "tr" ? jsonTr.İl : jsonEn.İl}
                            </p>
                            <MDBInput
                              type="text"
                              name="cargocity"
                              value={formData.cargocity}
                              onChange={handleInputChange}
                              className="mt-2"
                            />
                            {errors.cargocity && (
                              <p className="text-red-500 text-sm">
                                {" "}
                                {lang === "tr"
                                  ? jsonTr.İlboşbırakılamaz
                                  : jsonEn.İlboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57] lg:mt-0 mt-2">
                              {lang === "tr" ? jsonTr.İlçe : jsonEn.İlçe}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              name="cargodistrict"
                              value={formData.cargodistrict}
                              onChange={handleInputChange}
                              className=""
                            />
                            {errors.cargodistrict && (
                              <p className="text-red-500 text-sm">
                                {" "}
                                {lang === "tr"
                                  ? jsonTr.İlçeboşbırakılamaz
                                  : jsonEn.İlçeboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57]  mt-2 ">
                              {lang === "tr" ? jsonTr.Sokak : jsonEn.Sokak}{" "}
                            </p>
                            <MDBInput
                              type="text"
                              name="cargostreet"
                              value={formData.cargostreet}
                              onChange={handleInputChange}
                              className=""
                            />
                            {errors.cargostreet && (
                              <p className="text-red-500 text-sm">
                                {" "}
                                {lang === "tr"
                                  ? jsonTr.Sokakboşbırakılamaz
                                  : jsonEn.Sokakboşbırakılamaz}{" "}
                              </p>
                            )}
                          </MDBCol>
                        </MDBRow>

                        <MDBRow className="mt-2">
                          <MDBCol>
                            <p className="font-bold text-[#2F3D57] ">
                              {" "}
                              {lang === "tr" ? jsonTr.Adres : jsonEn.Adres}
                            </p>
                            <MDBTextArea
                              rows={4}
                              name="cargoaddress"
                              value={formData.cargoaddress}
                              onChange={handleInputChange}
                              className="mt-2"
                            />
                            {errors.cargoaddress && (
                              <p className="text-red-500 text-sm">
                                {" "}
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
            <MDBContainer className="my-5 py-5 bg-[#F9F3E3] shadow drop-shadow-md   rounded-3xl  w-[80%]">
              <h1 className="lg:text-4xl  text-xl  lg:h-15 font-lemongrassscript text-[#2F3D57] text-center underline decoration-2">
                {lang === "tr"
                  ? jsonTr.FirmamızıNasılÖğrendiniz
                  : jsonEn.FirmamızıNasılÖğrendiniz}{" "}
              </h1>
              <section>
                <MDBRow>
                  <MDBCol md="12" className="">
                    <MDBCard className="bg-[#F9F3E3] border-none">
                      <MDBCardBody className="  w-[100%] rounded-3xl">
                        <MDBRow>
                          <MDBCol className=" lg:flex  mt-4 lg:space-x-32  md:grid grid-cols-3">
                            <MDBRadio
                              name="formulaexample"
                              label={
                                lang === "tr"
                                  ? jsonTr.SosyalMedya
                                  : jsonEn.SosyalMedya
                              }
                              value="Sosyal Medya"
                              onChange={handleFormulaexampleChange}
                              checked={
                                formData.formulaexample === "Sosyal Medya"
                              }
                            />

                            <MDBRadio
                              name="formulaexample"
                              label={
                                lang === "tr"
                                  ? jsonTr.ETicaret
                                  : jsonEn.ETicaret
                              }
                              value="E-Ticaret"
                              onChange={handleFormulaexampleChange}
                              checked={formData.formulaexample === "E-Ticaret"}
                              className=""
                            />

                            <MDBRadio
                              name="formulaexample"
                              label={
                                lang === "tr"
                                  ? jsonTr.DoktorDiyetisyen
                                  : jsonEn.DoktorDiyetisyen
                              }
                              value="Doktor/Diyetisyen"
                              onChange={handleFormulaexampleChange}
                              checked={
                                formData.formulaexample === "Doktor/Diyetisyen"
                              }
                            />

                            <MDBRadio
                              name="formulaexample"
                              label={
                                lang === "tr" ? jsonTr.Arkadaş : jsonEn.Arkadaş
                              }
                              value="Arkadaş"
                              onChange={handleFormulaexampleChange}
                              checked={formData.formulaexample === "Arkadaş"}
                            />

                            <MDBRadio
                              name="formulaexample"
                              label={
                                lang === "tr" ? jsonTr.Diğer : jsonEn.Diğer
                              }
                              value="Diğer"
                              onChange={handleFormulaexampleChange}
                              checked={formData.formulaexample === "Diğer"}
                            />
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
              {lang === "tr" ? jsonTr.Gönder : jsonEn.Gönder}{" "}
            </button>
          </div>
        </form>
      </div>
    </PublicLayout>
  );
};

export default PatientDemand;
