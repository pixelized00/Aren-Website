import React, { useEffect } from "react";
import Home from "../src/pages/Home";
import SampleForm from "../src/pages/SampleForm";
import Blogs from "../src/pages/Blogs";

import {
  BrowserRouter as Router,
  Route,
  useLocation,
  Routes,
} from "react-router-dom";
import BlogDetails from "./pages/BlogDetails";
import Recipes from "./pages/Recipes";
import RecipesDetails from "./pages/RecipesDetails";
import Institutional from "../src/pages/Institutional";
import Contact from "../src/pages/Contact";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import Certificate from "./pages/Certificate";
import Kvkk from "../src/pages/kvkk";
import PrivacyPolicy from "../src/pages/PrivacyPolicy";
import DistanceSalesAgreement from "./pages/DistanceSalesAgreement";
import CookiePolicy from "./pages/CookiePolicy";
import Pku from "./pages/Pku";
import PatientDemand from "./pages/PatientDemand";
import MedicalDemand from "./pages/MedicalDemand";
import DataForm from "./pages/DataForm";
import LanguageContextProvider from "./context/LangContext";
import EmployeeCandidate from "./pages/EmployeeCandidate";
import Catalog from "./pages/Catalog";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <LanguageContextProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sampleform" element={<SampleForm />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogdetails/:blogId" element={<BlogDetails />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route
            path="/recipesdetails/:recipesId"
            element={<RecipesDetails />}
          />
          <Route path="/institutional" element={<Institutional />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/productsdetails/:productId"
            element={<ProductsDetails />}
          />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/kvkk" element={<Kvkk />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route
            path="/distancesalesagreement"
            element={<DistanceSalesAgreement />}
          />
          <Route path="/employeecandidate" element={<EmployeeCandidate />} />
          <Route path="/catalog" element={<Catalog />} />

          <Route path="/cookiepolicy" element={<CookiePolicy />} />
          <Route path="/dataform" element={<DataForm />} />
          <Route path="/patientrights" element={<Pku />} />
          <Route path="/patientdemand" element={<PatientDemand />} />
          <Route path="/medicaldemand" element={<MedicalDemand />} />
        </Routes>
      </Router>
    </LanguageContextProvider>
  );
}
