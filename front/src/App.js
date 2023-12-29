import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PasswordsPage from './pages/PasswordsPage';
import PasswordPage from './pages/PasswordPage';

import Header from './components/header'; 
import CreatePassword from './components/createpassword';
import PrivateRoute from './utils/PrivateRoute';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Header /> 
          <Routes>
            <Route path='/register/' element={<RegisterPage />} />
            <Route path='/login/' element={<LoginPage />} />
            <Route path='/create/' element={<PrivateRoute><CreatePassword /></PrivateRoute>} />
            <Route path='/' element={<PrivateRoute><PasswordsPage /></PrivateRoute>} />
            <Route path='/passwords/:id' element={<PrivateRoute><PasswordPage /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  ); 
}

export default App;