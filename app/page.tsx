//page.tsx
'use client';
import type { Metadata } from "next";
import UserDashboard from "./UserDashboard/page";
import LandingPage from "./LandingPage/page";
import SignupForm from "./SignUp/page";
import LoginForm from "./LoginPage/page";
import OurServices from "./OurServices/page";

const IndexPage: React.FC = () => {
  const email='xyz@gmail.com'; // Ensure this matches the type expected by UserDashboard

// return <UserDashboard email={email} />;
//    return <LandingPage/>;
    return <OurServices/>;

};

export default IndexPage;

//export const metadata: Metadata = {
  //title: "Redux Toolkit",
//};
