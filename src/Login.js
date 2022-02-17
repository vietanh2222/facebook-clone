import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { auth, provider } from "./pages/home/firebase";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useStateValue } from "./store/StateProvider";
import { actionTypes } from "./store/reducer";
import logoFacebook from "../src/assets/images/logo-facebook.png"
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import FacebookIcon from '@mui/icons-material/Facebook';

function Login() {
  const [, dispatch] = useStateValue();
  const signInWithGmail = () => {
    //sign in ...
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('isSignIn', 'signIn');
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signInWithFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        localStorage.setItem('isSignIn', 'signIn');
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__logo">
          <img
            src={logoFacebook}
            alt=""
          />
          <h1>FACE BOOK</h1>
        </div>
        <div className="login__button">
          <Button type="submit" onClick={signInWithGmail}>
            <MailOutlineRoundedIcon />
            <p> GMAIL LOGIN</p>
          </Button>
          <div id="button__divider">
            
          </div>
          <Button type="submit" onClick={signInWithFacebook}>
            <FacebookIcon />
            <p> FACEBOOK LOGIN</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
