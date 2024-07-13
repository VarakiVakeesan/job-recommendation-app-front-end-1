import React from "react";
import NavBarComponent from "../Components/NavigationBar";
import SignUpJobProviderComponent from "../Components/SignupJobProvider";
const SignupJobProvider = () => {
  return (
    <div>
        <NavBarComponent/>
        <SignUpJobProviderComponent/>
    </div>
  );
};

export default SignupJobProvider;