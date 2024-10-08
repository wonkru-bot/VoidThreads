// import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Chat from './components/Chat';
import Register from './components/Register';
import ResetPassNow from "./components/ResetPassword";
import SignInLine from './components/SignInLine';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Chat />} />

        <Route path="register" element={<Register />} />
        <Route path="login" element={<SignInLine />} />
        <Route path="reset_password" element={<ResetPassNow />} />

      </Route>
    </Routes>
  )

}

export default App;
