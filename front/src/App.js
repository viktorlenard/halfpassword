import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Header from './components/header'; 
import PasswordsPage from './pages/PasswordsPage';
import PasswordPage from './pages/PasswordPage';
import CreatePassword from './components/createpassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> 
        {/* When visiting http://localhost:3000/, the page below will render. */}
        <Routes>
          <Route path='/create/' element={<CreatePassword />} />
        </Routes>
        <Routes> 
          <Route path='/' element={<PasswordsPage />} />
        </Routes>       
        {/* When visiting http://localhost:3000/password/:id, the page with the corresponding id int will render */}
        <Routes>
          <Route path='/passwords/:id' element={<PasswordPage />} />
        </Routes>
      </div>
    </Router>
  ); 
}

export default App;
