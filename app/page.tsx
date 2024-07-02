'use client';

import React from "react";
import UserDashboard from "./UserDashboard/page";
import LandingPage from "./LandingPage/page";
import LoginForm from "./LoginPage/page";
import OurServices from "./OurServices/page";
import Blogs from "./Blogs/page";

const IndexPage: React.FC = () => {
  const email = 'xyz@gmail.com'; // Ensure this matches the type expected by UserDashboard

  // Uncomment the component you want to render
 // return <UserDashboard email={email} />;
  // return <LandingPage/>;
  // return <SignupForm/>;
  //return <UserDashboard email={email} />;
  //return <Blogs />;
   return <LandingPage/>;
  // return <OurServices/>;
};

export default IndexPage;