import React from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import WebPage from "./pages/WebPage";
import { Routes, Route, Navigate } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import CharacterEditorPage from "./pages/CharacterEditorPage";
import StoryEditorPage from "./pages/StoryEditorPage";
import SettingsPage from "./pages/SettingsPage";


const App = () => {

  const { authUser } = useAuthStore();

  return (
    <>
      <div>
     
        <Routes>

        <Route path="/" element={!authUser ? <WebPage /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/home" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/characters" element={authUser ? <CharacterEditorPage /> : <Navigate to="/login" />} />
        <Route path="/characters/:id" element={authUser ? <CharacterEditorPage /> : <Navigate to="/login" />} />
        <Route path="/story-editor" element={authUser ? <StoryEditorPage /> : <Navigate to="/login" />} />
        <Route path="/story-editor/:id" element={authUser ? <StoryEditorPage /> : <Navigate to="/login" />} />

        </Routes>
       
      </div>

      <ButtonGradient />
    </>  
  );
};

export default App;
