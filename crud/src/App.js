import './App.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import {
  Routes,
  Route,
} from "react-router-dom";
import RegisterPage from './components/RegisterPage/RegisterPage';
import Login from './components/Login/Login';
import Protected from './components/protection/Protected';

function App() {
  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<Protected Component={Table}/>} />
      </Routes>
    </>
  );
}

export default App;
