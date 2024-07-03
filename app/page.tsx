'use client';

import React from "react";
import UserDashboard from "./UserDashboard/page";
import LandingPage from "./LandingPage/page";
import LoginForm from "./LoginPage/page";
import OurServices from "./OurServices/page";
import Blogs from "./Blogs/page";

const IndexPage: React.FC = () => {

  // Uncomment the component you want to render

 // return <UserDashboard email={email} />;

  //return <UserDashboard email={email} />;
  // return <LandingPage/>;
  // return <SignupForm/>;
  //return <UserDashboard email={email} />;
  //return <Blogs />;

  return <LandingPage/>;

};

export default IndexPage;