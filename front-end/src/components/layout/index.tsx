import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "../../pages/SignIn/SignIn";

function RootRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RootRouters;