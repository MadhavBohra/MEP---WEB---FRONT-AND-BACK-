'use client';

import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "./firebase";
import UserDetailsForm from "./UserDetailEditForm/page";
// Uncomment these imports if you want to use them
// import UserDashboard from "./UserDashboard/page";
// import LandingPage from "./LandingPage/page";
// import LoginForm from "./LoginPage/page";
// import OurServices from "./OurServices/page";
// import Blogs from "./Blogs/page";

const IndexPage: React.FC = () => {
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/UserDashboard');
      }
    });
  }, [auth, router]);

  return (
    <main>
      <UserDetailsForm />
    </main>
  );
  // Uncomment the component you want to render
  // return <UserDashboard />;
  // return <LandingPage />;
  // return <LoginForm />;
  // return <Blogs />;
  // return <OurServices />;
};

export default IndexPage;
