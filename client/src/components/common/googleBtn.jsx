import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleLogin } from "@/store/auth-slice";
import "../styles/style.css";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  return (
    <GoogleOAuthProvider clientId="1040292650955-tjgtlftvdmudgj1qdh3el6sab9c9gnj8.apps.googleusercontent.com">
      <div className="google-btn-container w-full text-white">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("googleBtn", credentialResponse.credential);
            dispatch(googleLogin(credentialResponse.credential)).then(
              (data) => {
                if (data?.payload?.success) {
                  console.log("Successs login");
                } else {
                  console.log("failed login");
                }
              }
            );
          }}
          onError={() => {
            console.log("Google Login Failed");
          }}
          theme="outline"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
