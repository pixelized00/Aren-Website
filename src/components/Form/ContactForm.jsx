import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/config";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";
import { useLangContext } from "../../context/LangContext";

function ContactForm() {
  const initialFormData = {
    firstName: "",
    phoneNumber: "",
    email: "",
    subject: "",
    message: "",
    privacyPolicy: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const { lang } = useLangContext();

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

    const errors = {};
    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = `${field} boş bırakılamaz`;
      }
    }

    if (!formData.privacyPolicy) {
      errors.privacyPolicy = "Gizlilik politikasını kabul etmelisiniz.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("email", formData.email);
    data.append("subject", formData.subject);
    data.append("message", formData.message);
    data.append("privacyPolicy", formData.privacyPolicy);
    try {
      await axios.post(`${API_BASE_URL}/addContact.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        firstName: "",
        phoneNumber: "",
        email: "",
        subject: "",
        message: "",
        privacyPolicy: "",
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
      setFormData(initialFormData);
    } catch (error) {
      console.error("Veri yüklenirken hata oluştu:", error);
    }
  };

  return (
    <div className="p-6 rounded-md  ">
      <h1 className="text-[#6A6969] font-bold text-xl">
        {lang === "tr" ? jsonTr.İletişimFormu : jsonEn.İletişimFormu}
      </h1>
      <p className="text-[#707070]">
        {lang === "tr" ? jsonTr.iletisimtext : jsonEn.iletisimtext}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-2 mt-2">
          <label className="mb-1 text-[#6A6969] text-md   font-bold">
            {lang === "tr" ? jsonTr.AdSoyad : jsonEn.AdSoyad}
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-1 border-2 border-[#37A6B4] rounded-md bg-[#FDF9EE]"
          />
          {formErrors.firstName && (
            <p className="text-red-500 text-sm">
              {lang === "tr"
                ? jsonTr.İsimboşbırakılamaz
                : jsonEn.İsimboşbırakılamaz}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-[#6A6969] text-md  font-bold bg-[#FDF9EE]">
            {lang === "tr" ? jsonTr.Telefon : jsonEn.Telefon}
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-1 border-2 border-[#37A6B4] rounded-md  bg-[#FDF9EE]"
          />
          {formErrors.phoneNumber && (
            <p className="text-red-500 text-sm">
              {" "}
              {lang === "tr"
                ? jsonTr.Telefonnumarasıboşbırakılamaz
                : jsonEn.Telefonnumarasıboşbırakılamaz}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-[#6A6969] text-md  font-bold  ">
            {lang === "tr" ? jsonTr.Eposta : jsonEn.Eposta}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-1 border-2 border-[#37A6B4] rounded-md bg-[#FDF9EE]"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">
              {" "}
              {lang === "tr"
                ? jsonTr.Emailboşbırakılamaz
                : jsonEn.Emailboşbırakılamaz}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-[#6A6969] text-md font-bold">
            {lang === "tr" ? jsonTr.Konu : jsonEn.Konu}
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-3 py-1 border-2 border-[#37A6B4] rounded-md bg-[#FDF9EE]"
          />
          {formErrors.subject && (
            <p className="text-red-500 text-sm">
              {" "}
              {lang === "tr"
                ? jsonTr.Konuboşbırakılamaz
                : jsonEn.Konuboşbırakılamaz}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-[#6A6969] text-md font-bold bg-[#FDF9EE]">
            {lang === "tr" ? jsonTr.Mesaj : jsonEn.Mesaj}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-3 py-4 border-2 border-[#37A6B4] rounded-md bg-[#FDF9EE]"
          />
          {formErrors.message && (
            <p className="text-red-500 text-sm">
              {lang === "tr"
                ? jsonTr.Mesajboşbırakılamaz
                : jsonEn.Mesajboşbırakılamaz}
            </p>
          )}
        </div>
        <div className="">
          <div className=" flex justify-center items-center">
            <input
              type="checkbox"
              name="privacyPolicy"
              checked={formData.privacyPolicy}
              onChange={handleInputChange}
              className="mr-2"
            />
            <p className="text-[12px]">
              <a
                href="/kvkk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[]"
              >
                {" "}
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
        </div>

        <div>
          {" "}
          {formErrors.privacyPolicy && (
            <p className="text-red-500 text-sm">
              {" "}
              {lang === "tr" ? jsonTr.SozlesmeOnay : jsonEn.SozlesmeOnay}
            </p>
          )}
        </div>

        <div className=" flex justify-center items-center mt-6 md:mt-2">
          <button
            type="submit"
            className="bg-[#018EA0] text-white px-8 py-2 rounded-2xl"
          >
            {lang === "tr" ? jsonTr.Gönder : jsonEn.Gönder}
          </button>{" "}
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
