import './App.css';
import Amplify, { Auth } from "aws-amplify";

import {AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);


function App() {
  Auth.configure({
    authenticationFlowType: 'CUSTOM_AUTH'
  });
  const loginHere = async () => {
    const user = await Auth.signIn(
      'pigis34147@macauvpn.com', 
      'pigis34147@macauvpn.com'
    );
    console.log('user', user);
  }

  const logoutHere = async () => {
    await Auth.signOut();
  }

  return (
    // <AmplifyAuthenticator>
      <div className="App">
        <h1>Fauna App</h1>
        <button onClick={loginHere}>
          Login
        </button>
        <button onClick={logoutHere}>
          Logout
        </button>
        {/* <AmplifySignOut /> */}
      </div>
    // </AmplifyAuthenticator>
  );
}

export default App;
