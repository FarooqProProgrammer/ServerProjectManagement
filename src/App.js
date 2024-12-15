import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "./utils/supabase";

import Layout from "./layout/Index";
import Error404Classic from "./pages/error/404-classic";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Error504Classic from "./pages/error/504-classic";
import Faq from "./pages/others/Faq";
import Terms from "./pages/others/Terms";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Success from "./pages/auth/Success";
import InvoicePrint from "./pages/pre-built/invoice/InvoicePrint";
import { RedirectAs404 } from "./utils/Utils";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  return (
    <Routes>
      {/* Auth Pages */}
      <Route path={`${process.env.PUBLIC_URL}/auth-success`} element={<Success />} />
      <Route path={`${process.env.PUBLIC_URL}/auth-reset`} element={<ForgotPassword />} />
      <Route path={`${process.env.PUBLIC_URL}/auth-register`} element={<Register />} />
      <Route path={`${process.env.PUBLIC_URL}/auth-login`} element={<Login />} />

      {/* Print Pages */}
      <Route path={`${process.env.PUBLIC_URL}/invoice-print/:id`} element={<InvoicePrint />} />

      {/* Helper Pages */}
      <Route path={`${process.env.PUBLIC_URL}/auths/terms`} element={<Terms />} />
      <Route path={`${process.env.PUBLIC_URL}/auths/faq`} element={<Faq />} />
      <Route path={`${process.env.PUBLIC_URL}/invoice-print`} element={<InvoicePrint />} />

      {/* Error Pages */}
      <Route path={`${process.env.PUBLIC_URL}/errors/404-classic`} element={<Error404Classic />} />
      <Route path={`${process.env.PUBLIC_URL}/errors/504-modern`} element={<Error504Modern />} />
      <Route path={`${process.env.PUBLIC_URL}/errors/404-modern`} element={<Error404Modern />} />
      <Route path={`${process.env.PUBLIC_URL}/errors/504-classic`} element={<Error504Classic />} />

      {/* Main Routes */}
      <Route path="/" element={<Layout />} />

      {/* Catch-all Route */}
      <Route path="*" element={<RedirectAs404 />} />
    </Routes>
  );
};

export default App;
