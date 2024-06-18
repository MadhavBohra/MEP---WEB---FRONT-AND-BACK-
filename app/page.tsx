//page.tsx
import type { Metadata } from "next";
import UserDashboard from "./components/UserDashboard";
import UserdetailsForm from './components/UserDetails'
import UserDetailsForm from "./components/UserDetails";

export default function IndexPage() {
  return <UserDetailsForm/>;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
