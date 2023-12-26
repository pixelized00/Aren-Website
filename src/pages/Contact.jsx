import React, { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { MapPin, PhoneCall, EnvelopeSimple } from "@phosphor-icons/react";
import ContactForm from "../components/Form/ContactForm";
import JobApplicationModal from "../components/Form/JobApplicationModal";
import Dealership from "../components/Form/Dealership";
import { API_ENDPOINTS } from "../config/config";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import { useLangContext } from "../context/LangContext";
import { Helmet } from "react-helmet";
import Wave from "react-wavify";

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const { lang } = useLangContext();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [showModal1, setShowModal1] = useState(false);

  const openModal1 = () => setShowModal1(true);
  const closeModal1 = () => setShowModal1(false);

  const handleJobApplicationSubmit = (formData) => {
    closeModal();
  };
  const handleDealershipSubmit = (formData) => {
    closeModal();
  };

  useEffect(() => {
    fetch(`${API_ENDPOINTS.JSON_CONTACT}`)
      .then((response) => response.json())
      .then((data) => {
        setContactInfo(data[0]);
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  }, []);

  return (
    <PublicLayout>
      <Helmet>
        <title>İletişim</title>
        <meta name="keywords" content="iletişim" />
      </Helmet>

      <div className="w-screen overflow-hidden bg-[#FDF9EE]">
        <div className="lg:px-20 lg:flex justify-center items-center mt-28">
          <div className=" lg:w-[55%]  px-3">
            <h1 className="text-xl text-[#707070]  font-bold">
              {lang === "tr"
                ? jsonTr.İletişimBilgileri
                : jsonEn.İletişimBilgileri}
            </h1>
            <div className="lg:flex lg:space-x-8 mt-2 ">
              <div className="flex flex-col ">
                <div className="flex flex-col  ">
                  <div className="flex  bg-[#7EBB32] justify-center  items-center text-center  rounded-2xl py-3 px-4 space-x-2 ">
                    <MapPin size={32} color="white" weight="fill" />
                    <p className="text-white text-md text-start">
                      {contactInfo?.contactAddress &&
                        contactInfo.contactAddress
                          .split("\n")
                          .map((line, index) => <p key={index}>{line}</p>)}
                    </p>
                  </div>{" "}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex bg-[#7EBB32] lg:justify-center lg:items-center  lg:mt-3 mt-2 rounded-2xl py-2 px-7 space-x-8 ">
                  <EnvelopeSimple size={28} color="white" weight="fill" />
                  <p className="text-white text-md">
                    {contactInfo?.contactAddressEmail}
                  </p>{" "}
                </div>{" "}
                <div className="flex bg-[#7EBB32] lg:justify-center lg:items-center    mt-2  rounded-2xl py-2  px-7 space-x-8 ">
                  <PhoneCall size={28} color="white" weight="fill" />
                  <p className="text-white text-md">
                    {contactInfo?.contactAddressPhone}
                  </p>{" "}
                </div>{" "}
              </div>
            </div>

            <div className=" mb-2 mt-4 lg:w-[100%] px-2 ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12225.990341284569!2d32.7513658!3d39.9973317!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d348837b330003%3A0x13cc049f07983966!2zQVJFTiDEsGxhw6cgdmUgVMSxYmJpIEJlc2lubGVyIMOccmV0aW0gRmFicmlrYXPEsQ!5e0!3m2!1str!2str!4v1693851484684!5m2!1str!2str"
                width="100%"
                height="440"
                allowFullScreen
                title="Adres"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>{" "}
            </div>
          </div>{" "}
          <div>
            <ContactForm />
          </div>
        </div>
        <div className="relative  lg:mt-24">
          <div className="waveAnimation hidden md:block ">
            {" "}
            <Wave
              mask="url(#mask)"
              fill="#F1E9D6"
              className="waveAnimation "
              options={{ points: 10, speed: 0.2, amplitude: 45 }}
            >
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(80)">
                  <stop offset="0.4" stopColor="white" />
                  <stop offset="0.7" stopColor="black" />
                </linearGradient>
                <mask id="mask">
                  <rect
                    x="0"
                    y="0"
                    width="2000"
                    height="700"
                    fill="url(#gradient)"
                  />
                </mask>
              </defs>
            </Wave>{" "}
          </div>
          <div className="lg:px-0 px-4 lg:absolute top-1/3 left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 flex flex-col lg:flex-row justify-center items-center lg:space-y-0 lg:space-x-20 space-y-4  mb-10">
            <div>
              <p className="text-[#707070] text-center font-bold">
                {lang === "tr"
                  ? jsonTr.BizimleÇalışmakİsterMisiniz
                  : jsonEn.BizimleÇalışmakİsterMisiniz}
              </p>
              <button
                className=" mt-4 font-bold  bg-[#7EBB32] text-white lg:px-12 lg:py-8  px-16 py-4 rounded-3xl lg:mt-4 w-[100%] "
                onClick={openModal}
              >
                {lang === "tr"
                  ? jsonTr.İşBaşvuruDetayları
                  : jsonEn.İşBaşvuruDetayları}
              </button>

              <JobApplicationModal
                show={showModal}
                onClose={closeModal}
                onSubmit={handleJobApplicationSubmit}
              />
            </div>
            <div className="  ">
              <p className="text-[#707070]   font-bold text-center ">
                {lang === "tr"
                  ? jsonTr.DistribütörBayilik
                  : jsonEn.DistribütörBayilik}
              </p>
              <button
                className="bg-[#7EBB32] text-white lg:py-8 font-bold py-4 px-12 rounded-3xl mt-4  w-[100%] "
                onClick={openModal1}
              >
                {lang === "tr"
                  ? jsonTr.BayilikBaşvuruDetayları
                  : jsonEn.BayilikBaşvuruDetayları}
              </button>

              <Dealership
                show={showModal1}
                onClose={closeModal1}
                onSubmit={handleDealershipSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contact;
