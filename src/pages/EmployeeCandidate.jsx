import React, { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { useLangContext } from "../context/LangContext";
import { API_ENDPOINTS } from "../config/config";

const EmployeeCandidate = () => {
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
            contract.contractCategory === "Çalışan Adayı Aydınlatma Formu"
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
      <div className="px-6 mt-32 md:mt-40 mb-10   w-screen overflow-hidden">
        {contractData && (
          <div>
            <h1 className="font-bold text-3xl text-center">
              {contractData.contractCategoryTitle}
            </h1>
            <p
              className="text-[#333] mt-12"
              dangerouslySetInnerHTML={{ __html: contractData.contractContent }}
            />
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default EmployeeCandidate;
