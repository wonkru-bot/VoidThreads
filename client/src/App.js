import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Chat from './components/Chat';
import Register from './components/Register';
import Login from './components/Login';
import ResetPassNow from "./components/ResetPassword";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Chat />} />

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="reset_password" element={<ResetPassNow />} />

      </Route>
    </Routes>
  )

}

export default App;
