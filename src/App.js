import './App.css';
import Amplify, { Auth, Hub } from "aws-amplify";
import faunadb from "faunadb";
import {AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import { useEffect, useState } from 'react';


const q = faunadb.query;

Amplify.configure(awsconfig);


function App() {
  const [tokens, setTokens] = useState({
    fauna_access_token: null,
    fauna_refresh_token: null,
  });


  const listener = (data) => {
    switch (data.payload.event) {
        case 'signIn':
            setUpToken();
            break;
        case 'signUp':
            break;
        case 'signOut':
          setTokens({
            fauna_access_token: null,
            fauna_refresh_token: null,
          })
          break;
        default:
          break;
    }
  }

  Hub.listen('auth', listener);

  useEffect(() => {
    setUpToken();
  }, [])

  const setUpToken = async () => {
    const idTokens = await (await Auth.currentSession()).getIdToken();
    const { fauna_access_token,  fauna_refresh_token } = idTokens.payload;
    setTokens({
      fauna_access_token,
      fauna_refresh_token,
    })
  }

  const queryDB = async () => {
    const serverClient = new faunadb.Client({ secret: tokens.fauna_access_token });
    serverClient.query(
      q.Get(q.Ref(q.Collection('starships'), '308547647900222021'))
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error('Error: %s', err))
  }

  const logoutAction = async () => {
    await Auth.signOut();
  }

  return (
    <AmplifyAuthenticator>
      <div className="App">
        <h1>Fauna App</h1>
        <div>
          <h3>Do Some Query</h3>
          <button onClick={queryDB}>Query Something</button>
        </div>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  );
}


export default App;
