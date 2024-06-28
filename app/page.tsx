import LoginForm from "./LoginPage/page";
<<<<<<< HEAD
export default function Home() {
  return (
    <main >
      <LoginForm/>
    </main>
  );
}
=======
import OurServices from "./OurServices/page";
import { GoogleOAuthProvider } from "@react-oauth/google";

const IndexPage: React.FC = () => {

  const email='xyz@gmail.com'; // Ensure this matches the type expected by UserDashboard

// return <UserDashboard email={email} />;
//    return <LandingPage/>;
<<<<<<< HEAD
    return <LandingPage/>;
=======
    return <LoginForm/>;
>>>>>>> 78279c2a4652c9440e23a23eb227f32ff71bc08d

};

export default IndexPage;

//export const metadata: Metadata = {
  //title: "Redux Toolkit",
//};
>>>>>>> ebff057c99dc76b6c07b4791067bc0ed777e4352
