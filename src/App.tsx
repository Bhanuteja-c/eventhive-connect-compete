
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/layout/Layout";
import NotFound from "./pages/NotFound";

// Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import EventDetail from "./pages/EventDetail";
import PendingEvents from "./pages/PendingEvents";
import SubmitEvent from "./pages/SubmitEvent";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AttendanceManagement from "./pages/AttendanceManagement";
import Users from "./pages/Admin/Users";
import Attendance from "./pages/Host/Attendance";
import Certificates from "./pages/Host/Certificates";
import MarkAttendance from "./pages/Host/MarkAttendance";
import Reports from "./pages/Admin/Reports";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Protected route component
interface ProtectedRouteProps {
  allowedRoles: string[];
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  // While checking auth status, show nothing
  if (loading) return null;
  
  // If not authenticated or role not allowed, redirect to sign in
  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/events" element={<Layout><Events /></Layout>} />
      <Route path="/events/:id" element={<Layout><EventDetail /></Layout>} />
      <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
      
      {/* Protected Routes */}
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={['admin', 'host', 'user']}>
          <Layout><Profile /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Host Routes */}
      <Route path="/submit-event" element={
        <ProtectedRoute allowedRoles={['host']}>
          <Layout><SubmitEvent /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/manage-events" element={
        <ProtectedRoute allowedRoles={['host', 'admin']}>
          <Layout><ManageEvents /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/manage-attendance/:eventId" element={
        <ProtectedRoute allowedRoles={['host', 'admin']}>
          <Layout><AttendanceManagement /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/attendance" element={
        <ProtectedRoute allowedRoles={['host']}>
          <Layout><Attendance /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/certificates" element={
        <ProtectedRoute allowedRoles={['host']}>
          <Layout><Certificates /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/mark-attendance" element={
        <ProtectedRoute allowedRoles={['host']}>
          <Layout><MarkAttendance /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><Dashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><AdminDashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/pending-events" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><PendingEvents /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><Users /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout><Reports /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Common Protected Routes */}
      <Route path="/messages" element={
        <ProtectedRoute allowedRoles={['admin', 'host', 'user']}>
          <Layout><Messages /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute allowedRoles={['admin', 'host', 'user']}>
          <Layout><Settings /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
