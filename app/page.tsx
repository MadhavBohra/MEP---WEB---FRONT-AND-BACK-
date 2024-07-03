'use client';

import React from "react";
import UserDashboard from "./UserDashboard/page";
import LandingPage from "./LandingPage/page";
import LoginForm from "./LoginPage/page";
import OurServices from "./OurServices/page";
import Blogs from "./Blogs/page";
import ContactUs from "./ContactUs/page";

const IndexPage: React.FC = () => {
  const email = 'xyz@gmail.com'; // Ensure this matches the type expected by UserDashboard

  // Uncomment the component you want to render
<<<<<<< HEAD
 // return <UserDashboard email={email} />;
=======
  //return <UserDashboard email={email} />;
>>>>>>> 1db6ed7c71c8a3c9f77a84bf7bfb35ddf42f7d04
  // return <LandingPage/>;
  // return <SignupForm/>;
  //return <UserDashboard email={email} />;
  //return <Blogs />;
<<<<<<< HEAD
   return <LandingPage/>;
=======
  // return <LandingPage/>;
>>>>>>> 1db6ed7c71c8a3c9f77a84bf7bfb35ddf42f7d04
  // return <OurServices/>;
  return <ContactUs />;
};

export default IndexPage;