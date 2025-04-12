
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AiCoaching from "./pages/AiCoaching";
import AiTools from "./pages/AiTools";
import CreateCampaign from "./pages/CreateCampaign";

// Handle redirect from sessionStorage
const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Only run on the root path
    if (location.pathname === '/') {
      const redirectPath = sessionStorage.getItem('redirect_path');
      if (redirectPath) {
        sessionStorage.removeItem('redirect_path');
        navigate(redirectPath, { replace: true });
      }
    }
  }, [navigate, location]);
  
  return null;
};

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RedirectHandler />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/ai-coaching" element={<AiCoaching />} />
              <Route path="/ai-tools" element={<AiTools />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              
              {/* Nested routes - if you add any, add them here */}
              <Route path="/ai-coaching/history" element={<Navigate to="/ai-coaching" />} />
              <Route path="/ai-coaching/resources" element={<Navigate to="/ai-coaching" />} />
              <Route path="/ai-coaching/tips" element={<Navigate to="/ai-coaching" />} />
              <Route path="/ai-coaching/success-stories" element={<Navigate to="/ai-coaching" />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
