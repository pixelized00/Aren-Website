import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLangContext } from "../../context/LangContext";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";
import { API_FILE_URL, API_BASE_URL } from "../../config/config";

const Footer = () => {
  const { lang } = useLangContext();
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    phoneNumber: "",
    privacyPolicy: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.privacyPolicy) {
      setFormErrors({
        ...formErrors,
        privacyPolicy: "You must accept the privacy policy to submit the form.",
      });
      return;
    }

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("privacyPolicy", formData.privacyPolicy);

    try {
      await axios.post(`${API_BASE_URL}/addFooterContact.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData({
        firstName: "",
        phoneNumber: "",
        privacyPolicy: "",
      });
      toast.success(
        "Talebiniz alınmıştır ve en kısa sürede dönüş yapılacaktır.",
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
    <footer className="bg-[#2F3D57] page-footer font-small blue pt-12 pb-12  w-screen overflow-hidden ">
      <div className="container-fluid lg:text-center text-md-left">
        <div className="row lg:space-x-8 lg:mx-44 mx-1 ">
          <div className="col-md-3 mt-md-0 ">
            <h5 className="text-white  text-xl lg:text-2xl hover:text-white underline ">
              {lang === "tr" ? jsonTr.BiziTakipEdin : jsonEn.BiziTakipEdin}
            </h5>
            <p className="text-white mt-4 hover:text-white text-sm lg:text-[16px] ">
              {lang === "tr"
                ? jsonTr.BusitedekitümiçeriklerAreneaittirİzinsizkopyalanamazveyaçoğaltılamaz
                : jsonEn.BusitedekitümiçeriklerAreneaittirİzinsizkopyalanamazveyaçoğaltılamaz}
            </p>
            <div className="social-icons flex space-x-4 lg:justify-center mt-4 text-sm lg:text-[16px] ">
              <a
                href="https://www.instagram.com/mayalihane/?hl=tr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${API_FILE_URL}/icons/socialsIcon/instagram.svg`}
                  alt="Instagram"
                />
              </a>
              <a
                href="https://www.facebook.com/mayalihane"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${API_FILE_URL}/icons/socialsIcon/facebook.svg`}
                  alt="Facebook"
                />
              </a>
              <a
                href="https://twitter.com/mayalihane"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${API_FILE_URL}/icons/socialsIcon/twitter.svg`}
                  alt="Twitter"
                />
              </a>
              <a
                href="https://tr.linkedin.com/company/aren-i%CC%87la%C3%A7-ve-t%C4%B1bbi-besinler-%C3%BCretim-i%CC%87%C3%A7-ve-d%C4%B1%C5%9F-ticaret?trk=public_profile_topcard-current-company"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${API_FILE_URL}/icons/socialsIcon/linkedin.svg`}
                  alt="LinkedIn"
                />
              </a>
            </div>
          </div>
          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-white text-xl lg:text-2xl lg:mt-0 mt-10 hover:text-white underline  ">
              {lang === "tr" ? jsonTr.BizeUlaşın : jsonEn.BizeUlaşın}
            </h5>
            <ul className=" text-start text-white contact-info mt-4 text-sm lg:text-[16px] ">
              <li>
                <a
                  href="mailto:info@arenilac.com "
                  className="flex hover:text-white "
                >
                  <img
                    src="/assets/svg/mail.svg"
                    alt="E-posta"
                    className="contact-icon mr-4 "
                  />{" "}
                  info@arenilac.com
                </a>
              </li>
              <li className="mt-3">
                <a href="tel:08508885805" className="flex hover:text-white ">
                  <img
                    src="/assets/svg/phone.svg"
                    alt="Telefon"
                    className="contact-icon mr-4 "
                  />{" "}
                  0850 888 5805
                </a>
              </li>
              <li className="mt-3">
                <a href="/" className="flex hover:text-white">
                  <img
                    src="/assets/svg/location.svg"
                    alt="Konum"
                    className="contact-icon mr-4 "
                  />{" "}
                  İvedik OSB, 2271 Sokak No:14 Yenimahalle ANKARA/TÜRKİYE
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-white  text-xl lg:text-2xl  text-start   lg:mt-0 mt-10 hover:text-white underline">
              {lang === "tr" ? jsonTr.Kurumsal : jsonEn.Kurumsal}
            </h5>

            <ul className=" text-center text-white text-sm lg:text-[16px] mt-4">
              <li>
                <a href="/privacypolicy" className="flex hover:text-white">
                  {lang === "tr"
                    ? jsonTr.GizlilikPolitikası
                    : jsonEn.GizlilikPolitikası}
                </a>
              </li>
              <li className="mt-3">
                <a href="/kvkk" className="flex hover:text-white">
                  {lang === "tr" ? jsonTr.kvkkbaslik : jsonEn.kvkkbaslik}
                </a>
              </li>
              <li className="mt-3">
                <a href="/cookiepolicy" className="flex hover:text-white">
                  {lang === "tr"
                    ? jsonTr.ÇerezPolitikası
                    : jsonEn.ÇerezPolitikası}
                </a>
              </li>
              <li className="mt-3">
                <a
                  href="/distancesalesagreement "
                  className="flex hover:text-white"
                >
                  {lang === "tr"
                    ? jsonTr.MesafeliSatışSözleşmesi
                    : jsonEn.MesafeliSatışSözleşmesi}
                </a>
              </li>{" "}
              <li className="mt-3">
                <a href="/certificate" className="flex hover:text-white">
                  {lang === "tr" ? jsonTr.Sertifikalar : jsonEn.Sertifikalar}
                </a>
              </li>
              <li className="mt-3">
                <a href="/dataform" className="flex hover:text-white">
                  {lang === "tr"
                    ? jsonTr.VeriSahibiBaşvuruFormu
                    : jsonEn.VeriSahibiBaşvuruFormu}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 mb-md-0 mb-3">
            <h5 className="text-start text-white  text-xl lg:text-2xl lg:mt-0 mt-6 hover:text-white underline">
              {lang === "tr" ? jsonTr.BizSiziArayalım : jsonEn.BizSiziArayalım}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-4 ">
                <input
                  type="text"
                  placeholder={lang === "tr" ? jsonTr.AdSoyad : jsonEn.AdSoyad}
                  className="form-control placeholder-white rounded-xl border-white bg-[#2F3D57] text-sm lg:text-[16px] "
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder={lang === "tr" ? jsonTr.Telefon : jsonEn.Telefon}
                  className="form-control  placeholder-white rounded-xl border-white bg-[#2F3D57] text-sm lg:text-[16px] "
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>{" "}
              <div className="mb-2  text-white ">
                <div className=" flex justify-center items-center">
                  <input
                    type="checkbox"
                    name="privacyPolicy"
                    checked={formData.privacyPolicy}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <p className="text-[12px]">
                    <a href="/kvkk" target="_blank" rel="noopener noreferrer">
                      <span className="font-bold">
                        {lang === "tr" ? jsonTr.cf1 : jsonEn.cf1}
                      </span>{" "}
                    </a>{" "}
                    {lang === "tr" ? jsonTr.cf3 : jsonEn.cf3}{" "}
                    <a
                      href="/privacypolicy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="font-bold">
                        {" "}
                        {lang === "tr" ? jsonTr.cf4 : jsonEn.cf4}{" "}
                      </span>
                    </a>{" "}
                    {lang === "tr" ? jsonTr.cf5 : jsonEn.cf5}{" "}
                  </p>{" "}
                </div>
                <div>
                  {" "}
                  {formErrors.privacyPolicy && (
                    <p className="text-red-500 text-sm">
                      {" "}
                      {lang === "tr"
                        ? jsonTr.SozlesmeOnay
                        : jsonEn.SozlesmeOnay}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="py-1 px-4 rounded-3xl bg-[#FFFFFF] text-[#2F3D57] border border-[#2F3D57] hover:bg-[#2F3D57] hover:text-white"
              >
                {lang === "tr" ? jsonTr.Gönder : jsonEn.Gönder}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
