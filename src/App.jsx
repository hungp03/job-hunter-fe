import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import CompanyDetail from './pages/company/CompanyDetail';
import Companies from './pages/company/Companies';

// Hàm bọc component với MainLayout
const withMainLayout = (Component) => {
  return (
    <MainLayout>
      <Component />
    </MainLayout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Các trang sử dụng MainLayout */}
        <Route path="/" element={withMainLayout(Home)} />
        <Route path="/company/:id" element={withMainLayout(CompanyDetail)} />
        <Route path="/companies" element={withMainLayout(Companies)} />
        {/* Các trang auth không sử dụng MainLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
      </Routes>
    </Router>
  );
}

export default App;
