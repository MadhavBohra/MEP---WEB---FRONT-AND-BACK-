//page.tsx
import type { Metadata } from "next";
import UserDashboard from "./UserDashboard/page";
import LandingPage from "./LandingPage/page";

const IndexPage: React.FC = () => {
  const email='xyz@gmail.com'; // Ensure this matches the type expected by UserDashboard

 // return <UserDashboard email={email} />;
    return <LandingPage/>;

};

export default IndexPage;

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
