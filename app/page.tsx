//page.tsx
import type { Metadata } from "next";
import UserDashboard from "./UserDashboard/page";

export default function IndexPage() {
  return  <UserDashboard/>;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
