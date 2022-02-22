import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import "../styles/home.scss";
import googleIcon from "../assets/google-icon.svg";
import { Button } from "../components/Button";
import { Toaster } from "react-hot-toast";

export function Home() {
  let navigate = useNavigate();
  const { singIn } = useAuth();

  async function signInWithGoogle() {
    await singIn();
    navigate("/forall");
  }

  return (
    <div id="page-home">
      <div className="content">
        <h1>Chat for everyone</h1>
        <p>Come meet new people</p>
        <Button onClick={signInWithGoogle}>
          <img src={googleIcon} alt="Google Icon" />
          Login with google
        </Button>
      </div>
      <div><Toaster/></div>
    </div>
  );
}
