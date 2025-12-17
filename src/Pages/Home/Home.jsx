import React from "react";
import ThemeSwitcher from "../../ThemeSwitcher/SwitchTheme";
import Navbar from "../../Components/Home/Navbar/Navbar";
import Banner from "../../Components/Home/Banner/Banner";
import OurProducts from "../../Components/Home/OurProducts/OurProducts";
import HowItWorks from "../../Components/Home/HowItWorks/HowItWorks";
import FeedBack from "../../Components/Home/FeedBack/FeedBack";
import WhyChooseUs from "../../Components/Home/WhyChooseUs/WhyChooseUs";
import SecurityFeatures from "../../Components/Home/SecurityFeatures/SecurityFeatures";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../Loading/Loading";

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-11/12 mx-auto px-6">
      <Banner></Banner>
      <OurProducts></OurProducts>
      <HowItWorks></HowItWorks>
      <FeedBack></FeedBack>
      <WhyChooseUs></WhyChooseUs>
      <SecurityFeatures></SecurityFeatures>
    </div>
  );
};

export default Home;
