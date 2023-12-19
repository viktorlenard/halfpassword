import './App.css';
import Header from './components/header'; 
import PasswordsPage from './pages/PasswordsPage';

function App() {
  return (
    <div className="App">
      <Header /> 
      <h1>½Password</h1>
      <PasswordsPage />
    </div>
  ); 
}

export default App;
