//page.tsx
import type { Metadata } from "next";
import UserDashboard from "./components/UserDashboard";
import UserdetailsForm from './components/UserDetails'

export default function IndexPage() {
  return <UserDashboard/>;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
