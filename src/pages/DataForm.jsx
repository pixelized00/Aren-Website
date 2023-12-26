import React, { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { useLangContext } from "../context/LangContext";
import jsonTr from "../translations/tr/common.json";
import jsonEn from "../translations/en/common.json";
import { API_ENDPOINTS } from "../config/config";

const DataForm = () => {
  const { lang } = useLangContext();
  const [contractData, setContractData] = useState(null);

  useEffect(() => {
    const apiURL =
      lang === "tr"
        ? API_ENDPOINTS.JSON_CONTRACT
        : API_ENDPOINTS.JSON_CONTRACTEN;

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        const privacyPolicyContract = data.find(
          (contract) => contract.contractCategory === "Veri Sahibi Talep Formu"
        );

        if (privacyPolicyContract) {
          setContractData(privacyPolicyContract);
        }
      })
      .catch((error) => {
        console.error("API isteği sırasında bir hata oluştu: ", error);
      });
  }, [lang]);

  const pdfUrl =
    lang === "tr"
      ? "https://static.ticimax.cloud/32584/uploads/dosyalar/aren-la-veri-sahibi-talep-formu.pdf"
      : "https://static.ticimax.cloud/32584/uploads/dosyalar/aren-la-veri-sahibi-talep-formu-en.pdf";

  return (
    <PublicLayout>
      <div className="px-6 mt-32 md:mt-40 mb-10   w-screen overflow-hidden">
        {contractData && (
          <div>
            <h1 className="font-bold text-3xl text-center">
              {contractData.contractCategoryTitle}
            </h1>
            <p
              className="text-[#333] mt-12 text-[14px] lg:text-[16px]"
              dangerouslySetInnerHTML={{ __html: contractData.contractContent }}
            />
          </div>
        )}
        <div className="mt-16 mb-6 flex justify-center items-center">
          <a
            target="_blank"
            href={pdfUrl}
            rel="noopener noreferrer"
            className="cursor-pointer block relative z-10 px-2 lg:w-[25%] text-center rounded-2xl py-3 font-bold border-white border-2 bg-[#018EA0] text-white transition hover:bg-[#2F3D57] "
          >
            {lang === "tr"
              ? jsonTr.Formuindirmekiçintıklayınız
              : jsonEn.Formuindirmekiçintıklayınız}
          </a>
        </div>
      </div>
    </PublicLayout>
  );
};

export default DataForm;
