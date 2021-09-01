import './App.css';
import Amplify, { Auth } from "aws-amplify";

import {AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);


function App() {
  // Auth.configure({
  //   authenticationFlowType: 'CUSTOM_AUTH'
  // });
  const loginHere = async () => {
    const user = await Auth.signIn(
      'shadid', 
      'pigis34147@macauvpn.com'
    );
    const ss = await Auth.userSession(user);
    console.log('user', ss.getIdToken());
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
