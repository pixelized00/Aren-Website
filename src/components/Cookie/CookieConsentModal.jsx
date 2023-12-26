import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLangContext } from "../../context/LangContext";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";

const CookieConsentModal = () => {
  const { lang } = useLangContext();
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = Cookies.get("cookieConsent") === "accepted";
    const hasAcceptedKVKK = Cookies.get("kvkkConsent") === "accepted";

    if (!hasAcceptedCookies) {
      setShowModal(true);
      setLoader(true);
    }
    if (hasAcceptedCookies && !hasAcceptedKVKK) {
      Cookies.set("kvkkConsent", "accepted", { expires: 365 });
    }
  }, [lang]);

  const handleAcceptCookies = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });

    if (Cookies.get("kvkkConsent") !== "accepted") {
      Cookies.set("kvkkConsent", "accepted", { expires: 365 });
    }
    setShowModal(false);
  };
  if (!loader) {
    return null;
  }

  if (!showModal) {
    return null;
  }

  return (
    <div
      className={`cookie-consent-modal  ${showModal ? "show" : ""}`}
      style={{
        position: "fixed  ",
        bottom: "0%",
        width: "100%",
        color: "white",
        padding: "12px 2px",
        backgroundColor: "rgba(47, 61, 87, 0.9)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="cookie-consent-content lg:text-sm text-[12px]">
        <p className="mt-2">
          {lang === "tr" ? jsonTr.cookie1 : jsonEn.cookie1}
          <a
            href="CookiePolicy"
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            {" "}
            {lang === "tr" ? jsonTr.cookie2 : jsonEn.cookie2}
          </a>{" "}
          {lang === "tr" ? jsonTr.cookie3 : jsonEn.cookie3}
          <a
            href="../privacypolicy"
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            {" "}
            {lang === "tr" ? jsonTr.cookie4 : jsonEn.cookie4}
          </a>{" "}
          {lang === "tr" ? jsonTr.ve : jsonEn.ve}{" "}
          <a
            href="../kvkk"
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            {lang === "tr" ? jsonTr.cookie5 : jsonEn.cookie5}
          </a>{" "}
          {lang === "tr" ? jsonTr.cookie6 : jsonEn.cookie6}
        </p>
        <button
          onClick={handleAcceptCookies}
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "6px",
            marginTop: "2vh",
            borderRadius: "20px",
          }}
        >
          {lang === "tr" ? jsonTr.cookie7 : jsonEn.cookie7}
        </button>
      </div>
    </div>
  );
};

export default CookieConsentModal;
