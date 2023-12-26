import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../input.css";
import "./Navbar.css";
import { API_FILE_URL } from "../../config/config";
import { useLangContext } from "../../context/LangContext";
import jsonTr from "../../translations/tr/common.json";
import jsonEn from "../../translations/en/common.json";

const Navbar = () => {
  const { lang, updateLang } = useLangContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLanguageChange = (event) => {
    updateLang(event.target.value);
  };

  return (
    <div
      className={`fixed z-50 left-0 top-0 w-screen bg-[#FEFCF8] ${
        menuOpen ? "open" : ""
      }`}
    >
      <div className="flex justify-between items-center bg-[#FEFCF8] shadow-md ">
        <div className="ml-8 relative">
          <Link className="navbar-brand" to="/">
            <img
              src={`${API_FILE_URL}/logo/logo.png`}
              alt="Logo"
              className="h-16"
            />
          </Link>
        </div>
        <div className="hidden lg:flex w-[80%] items-center justify-center text-[#707070] font-medium space-x-8 rounded-tl-full bg-[#FDF9EE] border-[#707070] flex h-24 border pl-32">
          <Link to="/" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.Anasayfa : jsonEn.Anasayfa}
          </Link>
          <Link to="/institutional" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.Kurumsal : jsonEn.Kurumsal}
          </Link>
          <Link to="/products" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.Ürünlerimiz : jsonEn.Ürünlerimiz}
          </Link>
          <Link to="/recipes" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.Tarifler : jsonEn.Tarifler}
          </Link>
          <Link to="/blogs" className="no-hover-color-change">
            Blog
          </Link>
          <Link to="/patientrights" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.HastaHakları : jsonEn.HastaHakları}
          </Link>
          <Link to="/catalog" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.catalog : jsonEn.catalog}
          </Link>

          <Link to="/contact" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.İletişim : jsonEn.İletişim}
          </Link>

          <div className="flex text-md text-[#247781] font-sans font-bold">
            <select
              value={lang}
              onChange={(e) => handleLanguageChange(e)}
              className="border-2 border-gray-300 text-[28px] rounded-md"
            >
              <option value="tr">🇹🇷</option>
              <option value="en">🇺🇸</option>
            </select>
          </div>
        </div>
        <button
          className="lg:hidden px-4 py-3 text-[#247781]"
          onClick={handleMenuToggle}
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-12 w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-[#FDF9EE] shadow-md p-4 flex flex-col space-y-3 text-[#707070] font-medium ">
          <Link to="/" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.Anasayfa : jsonEn.Anasayfa}
          </Link>
          <Link to="/institutional" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.Kurumsal : jsonEn.Kurumsal}
          </Link>
          <Link to="/products" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.Ürünlerimiz : jsonEn.Ürünlerimiz}
          </Link>
          <Link to="/recipes" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.Tarifler : jsonEn.Tarifler}
          </Link>
          <Link to="/blogs" className="no-hover-color-change">
            Blog
          </Link>
          <Link to="/patientrights" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.HastaHakları : jsonEn.HastaHakları}
          </Link>
          <Link to="/catalog" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.catalog : jsonEn.catalog}
          </Link>

          <Link to="/contact" className="no-hover-color-change">
            {lang === "tr" ? jsonTr.İletişim : jsonEn.İletişim}
          </Link>
          <div className="flex text-md text-[#247781] font-sans font-bold ">
            <select
              value={lang}
              onChange={(e) => handleLanguageChange(e)}
              className="border-2 border-gray-300 rounded-md text-[26px] "
            >
              <option value="tr">🇹🇷</option>
              <option value="en">🇺🇸</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
