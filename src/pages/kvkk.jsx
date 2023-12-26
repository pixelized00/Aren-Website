import React, { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { useLangContext } from "../context/LangContext";

import { API_ENDPOINTS } from "../config/config";

const Kvkk = () => {
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
          (contract) =>
            contract.contractCategory === "Kişisel Verilerin Korunması Kanunu"
        );

        if (privacyPolicyContract) {
          setContractData(privacyPolicyContract);
        }
      })
      .catch((error) => {
        console.error("API isteği sırasında bir hata oluştu: ", error);
      });
  }, [lang]);

  return (
    <PublicLayout>
      <div className="md:px-20 mt-32 md:mt-40 mb-10 px-6  w-screen ">
        {contractData && (
          <div>
            <h1 className="font-bold text-2xl lg:text-3xl text-center">
              {contractData.contractCategoryTitle}
            </h1>
            <p
              className="text-[#333] mt-12 text-[14px] lg:text-[16px]"
              dangerouslySetInnerHTML={{ __html: contractData.contractContent }}
            />
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default Kvkk;
