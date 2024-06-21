//page.tsx
import type { Metadata } from "next";
import UserDashboard from "./UserDashboard/page";

const IndexPage: React.FC = () => {
  const email='xyz@gmail.com'; // Ensure this matches the type expected by UserDashboard

  return <UserDashboard email={email} />;
};

export default IndexPage;

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
