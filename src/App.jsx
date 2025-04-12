import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layouts
import MainLayout from '@/layouts/MainLayout';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import Home from '@/pages/home/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import CompanyDetail from '@/pages/company/CompanyDetail';
import Companies from '@/pages/company/Companies';
import JobDetail from '@/pages/job/JobDetail';
import Jobs from '@/pages/job/Jobs';
import Dashboard from '@/pages/admin/Dashboard';
import AdminCompanies from '@/pages/admin/Companies';
import AdminLayout from '@/layouts/AdminLayout';
import AdminJobs from '@/pages/admin/Jobs';
import AdminResumes from '@/pages/admin/Resumes';
import AdminRoles from '@/pages/admin/Roles';
import AdminPermissions from '@/pages/admin/Permissions';
import AdminUsers from '@/pages/admin/Users';

import PersonalProfile from '@/pages/profile/PersonalProfile';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          {/* Các trang sử dụng MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<PersonalProfile />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/jobs" element={<Jobs />} />
          </Route>

          {/* Các trang auth không sử dụng MainLayout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          

          {/* Các trang admin sử dụng AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="companies" element={<AdminCompanies />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="resumes" element={<AdminResumes />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="permissions" element={<AdminPermissions />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
