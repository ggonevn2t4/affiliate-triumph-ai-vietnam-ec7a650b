
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AiCoaching from "./pages/AiCoaching";
import AiTools from "./pages/AiTools";
import CreateCampaign from "./pages/CreateCampaign";
import Analytics from "./pages/Analytics";
import Earnings from "./pages/Earnings";
import MobileAppPage from "./pages/MobileAppPage";
import CompetitorAnalysis from "./pages/CompetitorAnalysis";
import AudienceTargeting from "./pages/AudienceTargeting";

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You could render a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Handle redirect from sessionStorage
const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  React.useEffect(() => {
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

const AppRoutes = () => {
  return (
    <>
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/ai-coaching" element={
          <ProtectedRoute>
            <AiCoaching />
          </ProtectedRoute>
        } />
        <Route path="/ai-tools" element={
          <ProtectedRoute>
            <AiTools />
          </ProtectedRoute>
        } />
        <Route path="/create-campaign" element={
          <ProtectedRoute>
            <CreateCampaign />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/earnings" element={
          <ProtectedRoute>
            <Earnings />
          </ProtectedRoute>
        } />
        <Route path="/mobile-app" element={
          <ProtectedRoute>
            <MobileAppPage />
          </ProtectedRoute>
        } />
        <Route path="/competitor-analysis" element={
          <ProtectedRoute>
            <CompetitorAnalysis />
          </ProtectedRoute>
        } />
        <Route path="/audience-targeting" element={
          <ProtectedRoute>
            <AudienceTargeting />
          </ProtectedRoute>
        } />
        
        {/* Nested routes - if you add any, add them here */}
        <Route path="/ai-coaching/history" element={
          <ProtectedRoute>
            <Navigate to="/ai-coaching" />
          </ProtectedRoute>
        } />
        <Route path="/ai-coaching/resources" element={
          <ProtectedRoute>
            <Navigate to="/ai-coaching" />
          </ProtectedRoute>
        } />
        <Route path="/ai-coaching/tips" element={
          <ProtectedRoute>
            <Navigate to="/ai-coaching" />
          </ProtectedRoute>
        } />
        <Route path="/ai-coaching/success-stories" element={
          <ProtectedRoute>
            <Navigate to="/ai-coaching" />
          </ProtectedRoute>
        } />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
