import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { auth, provider } from "./pages/home/firebase";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useStateValue } from "./store/StateProvider";
import { actionTypes } from "./store/reducer";

function Login() {
  const [, dispatch] = useStateValue();
  const signInWithGmail = () => {
    //sign in ...
    signInWithPopup(auth, provider)
      .then((result) => {
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
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signInAnonymous = () => {
    const anonymousUser = {
      displayName:'Anonymous',
      photoURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAvVBMVEX1vgsFBQUAAAQAAAAAAAb4wAr7wwsAAAn3vwr0vwsBAwUAAAsFBQTs1IXzvwv1vQ3r1Y7LoRewihijgBVbSQ7crRnt1H7t1Ir5xA3ntRO0jRXuuxHWqRrQoxRtWBMJBAk0Kg+RdhaIahcsIxAVEQp3YBIjGg/AlxcSDg1VQxKohxZtUxRBNBCeexaAaRePcBJaRxtNPRCMchlaSBEYEA4jHgwbGAstJw6MaxLvxjfv0nTvz2jwzFXv0G/u05EBxVovAAAEGUlEQVR4nO3cfVeiTBgH4BiYYTDDUEFe1NSWsAxda6vnsbXv/7F2BrVUDPWPtW34XWUeOM45zH3mDea2szMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQEaeMUXpMCVGAUf63rucfQv3AqTdCt+YfWMBiUbveqHcipnx4WKd7pROh1w/YQQWCwbX8PPkRuwcV+LY4G5uEaBIhNwmz95Zg4fC9gNFXufFw63ZZ00Vt7/Y2BdYn5Oq9gD5SODq0+xEaWVkj2RMdVieV9RLGQNWexVlobFRVI0O7sCVYgUk2C5iOXzvV9Z6Wdb9ZVa1C0sKWwMZbBTTyeNQa4Pugjq5t1/W6aELn0XA7OBXiWie74FNik+2qim7SLmgJ1NnqhrJEQ81Rh3VzwdFIUhAcMRznCyg6JPs/c91K08Oi4DR2BCdWMziseWzL2RWcsZrB8Qe5ulbMTtGYk+wITvH89m2xMD8gD6OChQ4PznMldEfNuZwHQ3Or4ejd4nXObW6d8xKd6nJPi+fm8orhFrYD6mwHR2+oenfFo95mZfX+vnureHOCM6aWorERLcEVg0h1WdGqRkbFt1YynLcf0REFngM1R5wMdW8MYzV8GPHZ3mZgR833hxyG0VM5NiI69sOv7EEgMXrJAcNHTdzKXxvy44Z+0z/uyfP3w1kQxs3maOLYBy5YmO0Mms1mHJbgIbLcfPCP202Qmw8l2X4AAAAAAAAAAPhHccYOTpawLFaCp1wfaDC9qx1YY86COOZq5p3sZE8JuU4Dtv+RMGXBxNT1kc8VTejKYXLTXObOOr6Iz6eNgovO1x78Iob48Igr/mx9hYaLLEhCzl8eOj7b2YBkmntUnxqrPNsuL8W4Y0XErK62g0WAunduJBP+uWBZ4kXlUdROpzohq00ujUxYKToW7a/niGbJ6Y/jNGm7QcZtJ43xo+hN61m2+lNRropKmNMjlaq2GSCdnA+fn56ef5hGtuu3kVtBRmrvda6j1oNJ8rmQcmNzKyzZef0q9K393wRQBWfuYz4KOxFiDiI1s7k+xVkiBlytui80uhm7pVogL1Ce3O7oRGsqxDgfuAcsFdVTsyhzY1PEJzf6aItZntzflSF54DPUt5NRlmKy3oKyFJXhNHXLdceZJ1bCUSft3pu6nM2zOV03X5r/JYFfyv60Td4p1AI3qafpJE3rSTuIxBK5PFP3fpwusnDkF4fL3ZcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4Avw5f/es87s5fvam7V8leJ/p+Xx/y82eV7298JbHsjj5dHFV1/sqfHZ22zuzb2ZJ6LwKt7mr97v2fx19tubi7PifX45F2e913nr8qsv9tS493Z5cSm0xM9Sq5UdL84ufltv8ugPUbE9rS7Fq10AAAAASUVORK5CYII=',
      email: 'Anonymous',
    }
    dispatch({
      type: actionTypes.SET_USER,
      user: anonymousUser,
    });
  }

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
          alt=""
        />
        <img
          src="https://cellphones.com.vn/sforum/wp-content/uploads/2019/11/facebook-co-logo-moi-face.gif"
          alt=""
        />
      </div>

      <Button type="submit" onClick={signInWithGmail}>
        SIGN IN WITH GMAIL
      </Button>

      <span>OR</span>
      <Button type="submit" onClick={signInWithFacebook}>
        SIGN IN WITH FACEBOOK
      </Button>
      <Button type="submit" onClick={signInAnonymous}>
        JUST SIGN IN
      </Button>
    </div>
  );
}

export default Login;
